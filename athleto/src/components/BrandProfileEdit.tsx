// components/BrandProfileForm.tsx
"use client"

import { useForm } from "react-hook-form";
import { Form } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { Select } from "@/components/ui/select";
import { useUser } from "@/context/UserContext";
import type { BrandProfile } from "@/types/brand";
import { useForceLightMode } from "@/hooks/useForcedLightTheme";
import { supabase } from "@/lib/supabase";
import { toast } from "react-hot-toast";
import { useState } from "react";

interface BrandProfileFormProps {
  initialData: BrandProfile;
  onSave: () => void;
  onCancel: () => void;
}

export const BrandProfileForm = ({ initialData, onSave, onCancel }: BrandProfileFormProps) => {
  useForceLightMode();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { brand } = useUser();
  console.log(brand)
  
  const { register, handleSubmit, formState: { errors } } = useForm<BrandProfile>({
    defaultValues: initialData
  });

  const onSubmit = async (data: BrandProfile) => {
    
    if (!brand?.id) {
      toast.error("Brand profile not found");
      return;
    }
    console.log(brand.id)

    try {
      setIsSubmitting(true);

      const { error: updateError } = await supabase
        .from('brands')
        .update({
          brand_name: data.brand_name,
          industry: data.industry,
          country: data.country,
          city: data.city,
          about: data.about,
          street: data.street,
          postal_code: data.postal_code,
          vat_number: data.vat_number,
          iban: data.iban,
          bank_account_number: data.bank_account_number,
          updated_at: new Date().toISOString()
        })
        .eq('id', brand.id)
        .single();

      if (updateError) {
        throw updateError;
      }

      toast.success("Profile updated successfully!");
      onSave();
    } catch (error: any) {
      console.error("Profile update error:", error);
      toast.error(error.message || "Failed to update profile");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <Card>
        <CardContent className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-sm font-medium">Company Name</label>
              <Input 
                {...register("brand_name", { required: "Brand name is required" })} 
                className={`${errors.brand_name ? 'border-red-500' : ''}`}
              />
              {errors.brand_name && (
                <p className="text-red-500 text-sm">{errors.brand_name.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Industry</label>
              <Input 
                {...register("industry", { required: "Industry is required" })}
                className={`${errors.industry ? 'border-red-500' : ''}`}
              />
              {errors.industry && (
                <p className="text-red-500 text-sm">{errors.industry.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Country</label>
              <Input 
                {...register("country", { required: "Country is required" })}
                className={`${errors.country ? 'border-red-500' : ''}`}
              />
              {errors.country && (
                <p className="text-red-500 text-sm">{errors.country.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">City</label>
              <Input 
                {...register("city", { required: "City is required" })}
                className={`${errors.city ? 'border-red-500' : ''}`}
              />
              {errors.city && (
                <p className="text-red-500 text-sm">{errors.city.message}</p>
              )}
            </div>
          </div>

          <div className="mt-6 space-y-2">
            <label className="text-sm font-medium">About</label>
            <Textarea {...register("about")} className="min-h-[100px]" />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-6">
          <h2 className="text-lg font-semibold mb-6">Private Information</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-sm font-medium">Street</label>
              <Input {...register("street")} />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Postal Code</label>
              <Input {...register("postal_code")} />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">VAT Number</label>
              <Input {...register("vat_number")} />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">IBAN</label>
              <Input {...register("iban")} />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Bank Account Number</label>
              <Input {...register("bank_account_number")} />
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="flex justify-end space-x-4">
        <Button
          type="button"
          variant="outline"
          onClick={onCancel}
          disabled={isSubmitting}
        >
          Cancel
        </Button>
        <Button
          type="submit"
          className="bg-indigo-600 text-white hover:bg-indigo-700"
          disabled={isSubmitting}
        >
          {isSubmitting ? "Saving..." : "Save Changes"}
        </Button>
      </div>
    </form>
  );
};

export default BrandProfileForm;