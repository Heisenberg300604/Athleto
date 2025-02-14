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

interface UserContextType {
  session: Session | null;
  user: any;
  athlete: Athlete | null;
  loading: boolean;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const [session, setSession] = useState<Session | null>(null);
  const [user, setUser] = useState<any>(null);
  const [athlete, setAthlete] = useState<Athlete | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      setSession(session);
      setUser(session?.user || null);
      if (session?.user?.email) {
        fetchAthleteData(session.user.email);
      }
      setLoading(false);
    };

    const fetchAthleteData = async (email: string) => {
      const { data, error } = await supabase
        .from("athletes")
        .select("*")
        .eq("email", email)
        .single();

      if (error) {
        console.error("Error fetching athlete data:", error.message);
        setAthlete(null);
      } else {
        setAthlete(data);
      }
    };

    fetchSession();

    const { data: authListener } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setSession(session);
        setUser(session?.user || null);
        if (session?.user?.email) {
          fetchAthleteData(session.user.email);
        } else {
          setAthlete(null);
        }
      }
    );

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, []);

  return (
    <UserContext.Provider value={{ session, user, athlete, loading }}>
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
