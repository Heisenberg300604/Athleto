export interface BrandProfile {
    id: string;
    first_name: string;
    last_name: string;
    brand_name: string;
    brand_category: string;
    business_email: string;
    status: 'pending' | 'verified' | 'declined';
    industry?: string;
    country?: string;
    city?: string;
    about?: string;
    street?: string;
    postal_code?: string;
    vat_number?: string;
    iban?: string;
    bank_account_number?: string;
    phone?: string;
  }
  