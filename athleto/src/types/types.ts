// types.ts
export interface Athlete {
    id: string;
    first_name: string;
    last_name: string;
    email: string;
    about: string;
    video_link?: string;
    is_verified: boolean;
    skills?: string[];
    location?: string;
    gender?: string;
    date_of_birth?: string;
    status: string;
    social_links?: Record<string, string>;
    talent_level?: string;
    affiliations?: string[];
    achievements?: string[];
    sponsorship_status?: string;
    funding_target_status?: string;
    sponsorship_needs?: string[];
    created_at: string;
    updated_at: string;
    phone?: string;
    bank_account_name?: string;
  }
  
  export interface Brand {
    id: string;
    first_name: string;
    last_name: string;
    brand_name: string;
    brand_category: string;
    business_email: string;
    status: string;
    industry: string;
    country: string;
    about: string;
    street?: string;
    postal_code?: string;
    vat_number?: string;
    iban?: string;
    bank_account_number?: string;
    phone?: string;
    website?: string;
    instagram?: string;
    linkedin?: string;
    facebook?: string;
    available_sponsorships?: string[];
    eligibility_requirements?: string[];
    created_at: string;
    updated_at: string;
  }
  
  export interface TNPLApplication {
    id: string;
    athlete_id: string;
    loan_amount: number;
    loan_purpose: string;
    repayment_plan: string;
    training_duration: string;
    training_institution: string;
    existing_sponsors?: string;
    proof_of_performance?: string[];
    repayment_method: string;
    status: string;
    funding_progress: number;
    created_at: string;
    updated_at: string;
    athlete?: Athlete;
  }
  
  export interface TNPLFunding {
    id: string;
    tnpl_id: string;
    brand_id: string;
    amount: number;
    payment_method: string;
    transaction_id?: string;
    created_at: string;
    brand?: Brand;
  }
  
  export interface TNPLRepayment {
    id: string;
    tnpl_id: string;
    athlete_id: string;
    amount: number;
    payment_method: string;
    transaction_id?: string;
    status: string;
    due_date?: string;
    paid_date?: string;
    created_at: string;
  }
  
  export type RepaymentPlan = 'Lump Sum' | 'Installments' | 'Percentage of Future Earnings';
  
  export type LoanStatus = 'Pending Review' | 'Approved' | 'Funded' | 'Repayment Active' | 'Completed' | 'Rejected';
  
  export type PaymentMethod = 'Bank Transfer' | 'UPI' | 'PayPal' | 'Crypto';