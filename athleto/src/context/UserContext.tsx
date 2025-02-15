"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { supabase } from "@/lib/supabase"; 
import { Session } from "@supabase/supabase-js";

interface Athlete {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  about: string;
  video_link: string;
  is_verified: boolean;
  skills: string;
  location: string;
  gender: string;
  date_of_birth: string;
  status: string;
  social_links: any;
  talent_level: string;
  affiliations: string;
  achievements: string;
  sponsorship_status: string;
  funding_request_status: string;
  sponsorship_needs: string;
  created_at: string;
  updated_at: string;
  phone?: string;
  bank_account_name?: string;
  iban?: string;
  currency?: string;
}

interface Brand {
  id: string;
  first_name: string;
  last_name: string;
  brand_name: string;
  brand_category: string;
  business_email: string;
  status: 'pending' | 'verified' | 'declined';
  industry: string;
  country: string;
  city: string;
  about: string;
  street: string;
  postal_code: string;
  vat_number: string;
  iban: string;
  bank_account_number: string;
  phone: string;
  website: string;
  instagram: string;
  linkedin: string;
  facebook: string;
  available_sponsorships: string;
  eligibility_requirements: string;
  created_at: string;
  updated_at: string;
}

interface UserContextType {
  session: Session | null;
  user: any;
  athlete: Athlete | null;
  brand: Brand | null;
  loading: boolean;
  userType: 'athlete' | 'brand' | null;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const [session, setSession] = useState<Session | null>(null);
  const [user, setUser] = useState<any>(null);
  const [athlete, setAthlete] = useState<Athlete | null>(null);
  const [brand, setBrand] = useState<Brand | null>(null);
  const [loading, setLoading] = useState(true);
  const [userType, setUserType] = useState<'athlete' | 'brand' | null>(null);

  useEffect(() => {
    const fetchSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      setSession(session);
      setUser(session?.user || null);
      if (session?.user?.email) {
        await fetchUserData(session.user.email);
      }
      setLoading(false);
    };

    const fetchUserData = async (email: string) => {
      // Try to fetch athlete data
      const { data: athleteData, error: athleteError } = await supabase
        .from("athletes")
        .select("*")
        .eq("email", email)
        .single();

      if (athleteData) {
        setAthlete(athleteData);
        setBrand(null);
        setUserType('athlete');
        return;
      }

      // If no athlete found, try to fetch brand data
      const { data: brandData, error: brandError } = await supabase
        .from("brands")
        .select("*")
        .eq("business_email", email)
        .single();

      if (brandData) {
        setBrand(brandData);
        setAthlete(null);
        setUserType('brand');
      } else {
        setAthlete(null);
        setBrand(null);
        setUserType(null);
      }
    };

    fetchSession();

    const { data: authListener } = supabase.auth.onAuthStateChange(
      async (_event, session) => {
        setSession(session);
        setUser(session?.user || null);
        if (session?.user?.email) {
          await fetchUserData(session.user.email);
        } else {
          setAthlete(null);
          setBrand(null);
          setUserType(null);
        }
      }
    );

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, []);

  return (
    <UserContext.Provider value={{ 
      session, 
      user, 
      athlete, 
      brand,
      loading,
      userType
    }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
};
