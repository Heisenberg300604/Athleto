// components/BrandProfileForm.tsx
"use client"

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Form } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { Select } from "@/components/ui/select";
import { useBrand } from "@/context/BrandContext";
import type { BrandProfile } from "@/types/brand";

interface BrandProfileFormProps {
  initialData: BrandProfile;
  onSave: () => void;
  onCancel: () => void;
}

export const BrandProfileForm = ({ initialData, onSave, onCancel }: BrandProfileFormProps) => {
  const { updateProfile } = useBrand();
  const form = useForm<BrandProfile>({
    defaultValues: initialData
  });

  const onSubmit = async (data: BrandProfile) => {
    await updateProfile(data);
    onSave();
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <Card>
          <CardContent className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-medium">Company Name</label>
                <Input {...form.register("brand_name")} />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Industry</label>
                <Input {...form.register("industry")} />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Country</label>
                <Input {...form.register("country")} />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">City</label>
                <Input {...form.register("city")} />
              </div>
            </div>

            <div className="mt-6 space-y-2">
              <label className="text-sm font-medium">About</label>
              <Textarea {...form.register("about")} className="min-h-[100px]" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <h2 className="text-lg font-semibold mb-6">Private Information</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-medium">Street</label>
                <Input {...form.register("street")} />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Postal Code</label>
                <Input {...form.register("postal_code")} />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">VAT Number</label>
                <Input {...form.register("vat_number")} />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">IBAN</label>
                <Input {...form.register("iban")} />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Bank Account Number</label>
                <Input {...form.register("bank_account_number")} />
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="flex justify-end space-x-4">
          <Button
            type="button"
            variant="outline"
            onClick={onCancel}
          >
            Cancel
          </Button>
          <Button
            type="submit"
            className="bg-indigo-600 text-white hover:bg-indigo-700"
          >
            Save Changes
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default BrandProfileForm;