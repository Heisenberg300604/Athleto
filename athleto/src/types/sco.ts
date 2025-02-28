// types/index.ts

export type ScholarshipType = "education" | "training";
export type GrantType = "sponsorship" | "financial_aid" | "equipment" | "travel";
export type ApplicationStatus = "pending" | "approved" | "rejected" | "completed";
export type FundingSource = "government" | "brand" | "ngo";
export type PaymentMethod = "upi" | "bank_transfer";

export interface User {
  id: string;
  name: string;
  email: string;
  profileImage?: string;
  role: "athlete" | "brand" | "ngo" | "admin";
}

export interface Scholarship {
  id: string;
  name: string;
  provider: string;
  providerType: FundingSource;
  providerLogo?: string;
  type: ScholarshipType | GrantType;
  amount: number;
  description: string;
  eligibilityCriteria: EligibilityCriteria;
  deadline: Date;
  applicationCount: number;
  availablePositions: number;
  createdAt: Date;
  updatedAt: Date;
  isVerified: boolean;
}

export interface EligibilityCriteria {
  ageRange?: {
    min?: number;
    max?: number;
  };
  level: "beginner" | "intermediate" | "state" | "national" | "international";
  sportTypes?: string[];
  academicRequirements?: string;
  incomeRequirements?: string;
  otherRequirements?: string;
}

export interface Application {
  id: string;
  scholarshipId: string;
  athleteId: string;
  status: ApplicationStatus;
  appliedAt: Date;
  documents: Document[];
  notes?: string;
  reviewedAt?: Date;
  reviewedBy?: string;
}

export interface Document {
  id: string;
  name: string;
  url: string;
  type: "certificate" | "id_proof" | "income_proof" | "performance_record" | "other";
  uploadedAt: Date;
}

export interface PaymentMilestone {
  id: string;
  applicationId: string;
  amount: number;
  description: string;
  dueDate?: Date;
  status: "pending" | "released" | "completed";
  releaseDate?: Date;
  paymentMethod?: PaymentMethod;
  transactionId?: string;
}
export interface FilterOptions {
    type?: string[];
    providerType?: string[];
    sport?: string[];
    level?: string[];
    amountRange?: {
      min?: number;
      max?: number;
    };
    deadline?: string;
    applicationType?: string;
    dateApplied?: string;
    status?: string; // Added status property
  }