// services/tnplService.ts
import { supabase } from '@/lib/supabase';
import { TNPLApplication } from '@/types/types';
import { TNPLFunding } from '@/types/types';
import { TNPLRepayment } from '@/types/types';


// Athlete Services
export const createTNPLApplication = async (application: Omit<TNPLApplication, 'id' | 'status' | 'funding_progress' | 'created_at' | 'updated_at'>) => {
  const { data, error } = await supabase
    .from('tnpl')
    .insert([{
      ...application,
      status: 'Pending Review',
      funding_progress: 0
    }])
    .select();

  if (error) throw error;
  return data[0];
};

export const getAthleteApplications = async () => {
  const { data, error } = await supabase
    .from('tnpl')
    .select('*')
    //.eq('athlete_id', athleteId);

  if (error) throw error;
  return data as TNPLApplication[];
};

export const getApplicationDetails = async (id: string) => {
  const { data, error } = await supabase
    .from('tnpl')
    .select(`
      *,
      athlete:athlete_id(*)
    `)
    .eq('id', id)
    .single();

  if (error) throw error;
  return data as TNPLApplication & { athlete: any };
};

// Brand Services
export const getApprovedApplications = async () => {
  const { data, error } = await supabase
    .from('tnpl')
    .select(`
      *,
      athlete:athlete_id(*)
    `)
    .eq('status', 'Approved');

  if (error) throw error;
  return data as (TNPLApplication & { athlete: any })[];
};

export const fundApplication = async (funding: Omit<TNPLFunding, 'id' | 'created_at'>) => {
  // Start a transaction
  const { data: fundingData, error: fundingError } = await supabase
    .from('tnpl_funding')
    .insert([funding])
    .select();

  if (fundingError) throw fundingError;

  // Get current application to update funding progress
  const { data: application, error: applicationError } = await supabase
    .from('tnpl')
    .select('funding_progress, loan_amount')
    .eq('id', funding.tnpl_id)
    .single();

  if (applicationError) throw applicationError;

  // Update the funding progress
  const newFundingProgress = (application.funding_progress || funding.amount as unknown as number);
  const newStatus = newFundingProgress >= (application.loan_amount as number) ? 'Funded' : 'Approved';

  const { data: updatedApplication, error: updateError } = await supabase
    .from('tnpl')
    .update({
      funding_progress: newFundingProgress,
      status: newStatus,
    })
    .eq('id', funding.tnpl_id)
    .select();

  if (updateError) throw updateError;

  // If fully funded, create repayment schedule
  if (newStatus === 'Funded') {
    await createRepaymentSchedule(funding.tnpl_id);
  }

  return { funding: fundingData[0], application: updatedApplication[0] };
};

// Admin Services
export const updateApplicationStatus = async (id: string, status: string) => {
  const { data, error } = await supabase
    .from('tnpl')
    .update({ status })
    .eq('id', id)
    .select();

  if (error) throw error;
  return data[0];
};

// Repayment Services
export const createRepaymentSchedule = async (tnplId: string) => {
  // Get application details
  const { data: application, error: applicationError } = await supabase
    .from('tnpl')
    .select('*')
    .eq('id', tnplId)
    .single();

  if (applicationError) throw applicationError;

  // Create repayment schedule based on repayment plan
  if (application.repayment_plan === 'Installments') {
    // For simplicity, creating 3 installments
    const installmentAmount = application.loan_amount / 3;
    
    const today = new Date();
    const firstDueDate = new Date(today.setMonth(today.getMonth() + 1));
    const secondDueDate = new Date(today.setMonth(today.getMonth() + 1));
    const thirdDueDate = new Date(today.setMonth(today.getMonth() + 1));
    
    const repayments = [
      {
        tnpl_id: tnplId,
        athlete_id: application.athlete_id,
        amount: installmentAmount,
        payment_method: application.repayment_method,
        status: 'Pending',
        due_date: firstDueDate.toISOString(),
      },
      {
        tnpl_id: tnplId,
        athlete_id: application.athlete_id,
        amount: installmentAmount,
        payment_method: application.repayment_method,
        status: 'Pending',
        due_date: secondDueDate.toISOString(),
      },
      {
        tnpl_id: tnplId,
        athlete_id: application.athlete_id,
        amount: installmentAmount,
        payment_method: application.repayment_method,
        status: 'Pending',
        due_date: thirdDueDate.toISOString(),
      }
    ];
    
    const { data, error } = await supabase
      .from('tnpl_repayment')
      .insert(repayments);
      
    if (error) throw error;
    
  } else if (application.repayment_plan === 'Lump Sum') {
    // Lump sum payment due in 6 months
    const today = new Date();
    const dueDate = new Date(today.setMonth(today.getMonth() + 6));
    
    const { data, error } = await supabase
      .from('tnpl_repayment')
      .insert([{
        tnpl_id: tnplId,
        athlete_id: application.athlete_id,
        amount: application.loan_amount,
        payment_method: application.repayment_method,
        status: 'Pending',
        due_date: dueDate.toISOString(),
      }]);
      
    if (error) throw error;
    
  } else if (application.repayment_plan === 'Percentage of Future Earnings') {
    // For percentage of future earnings, we'll create a placeholder record
    // The actual repayments will be created as earnings come in
    const { data, error } = await supabase
      .from('tnpl_repayment')
      .insert([{
        tnpl_id: tnplId,
        athlete_id: application.athlete_id,
        amount: 0, // Will be updated as earnings come in
        payment_method: application.repayment_method,
        status: 'Percentage-Based',
      }]);
      
    if (error) throw error;
  }
  
  // Update the application status to 'Repayment Active'
  const { data, error } = await supabase
    .from('tnpl')
    .update({ status: 'Repayment Active' })
    .eq('id', tnplId);
    
  if (error) throw error;
};

export const getRepaymentSchedule = async (tnplId: string) => {
  const { data, error } = await supabase
    .from('tnpl_repayment')
    .select('*')
    .eq('tnpl_id', tnplId);
    
  if (error) throw error;
  return data as TNPLRepayment[];
};

export const makeRepayment = async (repaymentId: string, transactionId: string) => {
  const { data, error } = await supabase
    .from('tnpl_repayment')
    .update({
      status: 'Completed',
      paid_date: new Date().toISOString(),
      transaction_id: transactionId
    })
    .eq('id', repaymentId)
    .select();
    
  if (error) throw error;
  
  // Check if all repayments for this TNPL are completed
  const repayment = data[0] as TNPLRepayment;
  
  const { data: repayments, error: repaymentError } = await supabase
    .from('tnpl_repayment')
    .select('status')
    .eq('tnpl_id', repayment.tnpl_id);
    
  if (repaymentError) throw repaymentError;
  
  const allCompleted = repayments.every(r => r.status === 'Completed');
  
  if (allCompleted) {
    // Update TNPL status to 'Completed'
    const { error: updateError } = await supabase
      .from('tnpl')
      .update({ status: 'Completed' })
      .eq('id', repayment.tnpl_id);
      
    if (updateError) throw updateError;
  }
  
  return data[0];
};