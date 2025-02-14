"use client"
import React, { createContext, useContext, useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { useRouter } from 'next/navigation';
import { toast } from 'react-hot-toast';
import { BrandProfile } from '@/types/brand';

interface BrandContextType {
  brandProfile: BrandProfile | null;
  loading: boolean;
  updateProfile: (data: Partial<BrandProfile>) => Promise<void>;
  refreshProfile: () => Promise<void>;
}

const BrandContext = createContext<BrandContextType | undefined>(undefined);

export const BrandProvider = ({ children }: { children: React.ReactNode }) => {
  const [brandProfile, setBrandProfile] = useState<BrandProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  const fetchProfile = async () => {
    try {
      const { data: { user }, error: userError } = await supabase.auth.getUser();
      
      if (userError) {
        console.error("Auth error:", userError);
        setLoading(false);
        return;
      }

      if (!user) {
        setLoading(false);
        return;
      }

      const { data, error } = await supabase
        .from('brands')
        .select('*')
        .eq('id', user.id)
        .maybeSingle(); // Use maybeSingle instead of single to handle no results without error

      if (error) {
        console.error("Profile fetch error:", error);
        throw error;
      }

      // If no profile exists but we have a user, create a basic profile
      if (!data && user.user_metadata) {
        const { first_name, last_name, brand_name, brand_category } = user.user_metadata;
        
        const { data: newProfile, error: createError } = await supabase
          .from('brands')
          .insert({
            id: user.id,
            first_name,
            last_name,
            brand_name: brand_name || '',
            brand_category: brand_category || '',
            business_email: user.email,
            status: 'pending'
          })
          .select()
          .single();

        if (createError) {
          console.error("Profile creation error:", createError);
          throw createError;
        }

        setBrandProfile(newProfile);
      } else {
        setBrandProfile(data);
      }
    } catch (error: any) {
      console.error("Profile fetch error:", error);
      toast.error('Error loading profile: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  const updateProfile = async (updates: Partial<BrandProfile>) => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        toast.error('No authenticated user found');
        return;
      }

      const { error } = await supabase
        .from('brands')
        .update(updates)
        .eq('id', user.id);

      if (error) throw error;
      
      await fetchProfile();
      toast.success('Profile updated successfully');
    } catch (error: any) {
      console.error("Profile update error:", error);
      toast.error('Error updating profile: ' + error.message);
    }
  };

  // Handle auth state changes
  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === 'SIGNED_IN') {
        fetchProfile();
      } else if (event === 'SIGNED_OUT') {
        setBrandProfile(null);
      }
    });

    fetchProfile();

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  return (
    <BrandContext.Provider value={{
      brandProfile,
      loading,
      updateProfile,
      refreshProfile: fetchProfile
    }}>
      {children}
    </BrandContext.Provider>
  );
};

export const useBrand = () => {
  const context = useContext(BrandContext);
  if (context === undefined) {
    throw new Error('useBrand must be used within a BrandProvider');
  }
  return context;
};