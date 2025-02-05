"use client";

import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import LoginModal from "./Loginmodal";
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";

interface BrandSignupModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: () => void; 
}

const BrandSignupModal = ({ isOpen, onClose }: BrandSignupModalProps) => {
  const brandCategories = [
    "Sportswear",
    "Nutrition",
    "Fitness Gear",
    "Sports Equipment",
    "Recovery & Wellness",
    "Athletic Footwear",
    "Athletic Accessories",
  ];

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [brandName, setBrandName] = useState("");
  const [brandCategory, setBrandCategory] = useState("");
  const [businessEmail, setBusinessEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const router = useRouter();

  const handleGoogleLogin = async () => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `${window.location.origin}/auth/callback`,
      },
    });
    if (error) {
      toast.error(error.message);
    }
  };

  const validateForm = () => {
    if (!firstName || !lastName || !brandName || !brandCategory || !businessEmail || !password || !confirmPassword) {
      toast.error("All fields are required.");
      return false;
    }
    if (password !== confirmPassword) {
      toast.error("Passwords do not match.");
      return false;
    }
    if (password.length < 8) {
      toast.error("Password must be at least 8 characters.");
      return false;
    }
    return true;
  };

  const handleBrandSignup = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    setLoading(true);

    try {
      // Sign up with Supabase
      const { data, error } = await supabase.auth.signUp({
        email: businessEmail,
        password,
        options: {
          data: {
            first_name: firstName,
            last_name: lastName,
            brand_name: brandName,
            brand_category: brandCategory,
            user_type: "brand",
          },
        },
      });

      if (error) {
        throw error;
      }

      // Create brand profile in the database
      const { error: profileError } = await supabase.from("brands").insert([
        {
          id: data.user?.id,
          first_name: firstName,
          last_name: lastName,
          brand_name: brandName,
          brand_category: brandCategory,
          business_email: businessEmail,
        },
      ]);

      if (profileError) {
        throw profileError;
      }

      toast.success("Signup successful! Please check your email to verify your account.");
      onClose();
      router.push("/brand-dashboard");
    } catch (error: any) {
      toast.error(error.message || "An error occurred during signup.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px] bg-black border-2 border-blue-500/30 p-7 rounded-xl shadow-xl">
        {/* Decorative elements */}
        <div className="absolute inset-0 bg-gradient-to-b from-blue-500/10 to-purple-500/10 rounded-xl pointer-events-none" />

        <DialogHeader className="mb-4 space-y-1.8">
          <DialogTitle className="text-4xl font-bold text-white text-center bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text text-transparent">
            Brand Partnership
          </DialogTitle>
          <p className="text-blue-300/80 text-center text-sm font-medium">
            Connect with elite athletes and amplify your brand's presence
          </p>
        </DialogHeader>

        <form onSubmit={handleBrandSignup} className="grid gap-3">
          <div className="flex gap-4">
            <div className="grid w-full gap-1.5">
              <Label htmlFor="firstName" className="text-gray-300 font-medium">
                First Name *
              </Label>
              <Input
                id="firstName"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                className="bg-[#171923] border-gray-700/30 text-white h-12 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                placeholder="Enter your first name"
              />
            </div>
            <div className="grid w-full gap-1.5">
              <Label htmlFor="lastName" className="text-gray-300 font-medium">
                Last Name *
              </Label>
              <Input
                id="lastName"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                className="bg-[#171923] border-gray-700/30 text-white h-12 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                placeholder="Enter your last name"
              />
            </div>
          </div>

          <div className="grid gap-1.5">
            <Label htmlFor="brandName" className="text-gray-300 font-medium">
              Brand Name *
            </Label>
            <Input
              id="brandName"
              value={brandName}
              onChange={(e) => setBrandName(e.target.value)}
              className="bg-[#171923] border-gray-700/30 text-white h-12 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              placeholder="Enter your brand name"
            />
          </div>

          <div className="grid gap-1.5">
            <Label htmlFor="brandType" className="text-gray-300 font-medium">
              Brand Category *
            </Label>
            <Select onValueChange={(value) => setBrandCategory(value)}>
              <SelectTrigger className="bg-[#171923] border-gray-700/30 text-white h-12 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all">
                <SelectValue placeholder="Select brand category" />
              </SelectTrigger>
              <SelectContent className="bg-[#171923] border-gray-700">
                {brandCategories.map((category) => (
                  <SelectItem key={category} value={category.toLowerCase()} className="text-white hover:bg-blue-500/20">
                    {category}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="grid gap-1.5">
            <Label htmlFor="businessEmail" className="text-gray-300 font-medium">
              Business Email *
            </Label>
            <Input
              id="businessEmail"
              type="email"
              value={businessEmail}
              onChange={(e) => setBusinessEmail(e.target.value)}
              className="bg-[#171923] border-gray-700/30 text-white h-12 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              placeholder="Enter your business email"
            />
          </div>

          <div className="grid gap-2">
            <div className="flex gap-4">
              <div className="grid w-full gap-1.5">
                <Label htmlFor="password" className="text-gray-300 font-medium">
                  Password *
                </Label>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="bg-[#171923] border-gray-700/30 text-white h-12 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  placeholder="Enter your password"
                />
              </div>
              <div className="grid w-full gap-1.5">
                <Label htmlFor="confirmPassword" className="text-gray-300 font-medium">
                  Confirm Password *
                </Label>
                <Input
                  id="confirmPassword"
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="bg-[#171923] border-gray-700/30 text-white h-12 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  placeholder="Confirm your password"
                />
              </div>
            </div>
          </div>

          <Button
            onClick={handleGoogleLogin}
            className="w-full h-12 flex items-center justify-center gap-2 bg-white/10 text-white hover:bg-white/20 rounded-lg transition-all border border-gray-700/30"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24">
              <path
                fill="currentColor"
                d="M12.545,10.239v3.821h5.445c-0.712,2.315-2.647,3.972-5.445,3.972c-3.332,0-6.033-2.701-6.033-6.032s2.701-6.032,6.033-6.032c1.498,0,2.866,0.549,3.921,1.453l2.814-2.814C17.503,2.988,15.139,2,12.545,2C7.021,2,2.543,6.477,2.543,12s4.478,10,10.002,10c8.396,0,10.249-7.85,9.426-11.748L12.545,10.239z"
              />
            </svg>
            Continue with Google
          </Button>

          <div className="text-sm text-gray-400 text-center">
            By creating an account, you agree to our{" "}
            <a href="#" className="text-blue-400 hover:underline">
              Terms of Use
            </a>{" "}
            and{" "}
            <a href="#" className="text-blue-400 hover:underline">
              Privacy Policy
            </a>
          </div>

          <div className="text-sm text-gray-400 text-center">
            Already have an account?{" "}
            <a onClick={() => setIsLoginModalOpen(true)} className="text-blue-400 hover:underline cursor-pointer">
              Log in
            </a>
          </div>

          <LoginModal
            isOpen={isLoginModalOpen}
            onClose={() => setIsLoginModalOpen(false)}
            onOpenBrandSignup={() => {}}
          onOpenAthleteSignup={() => {}}
          />

          <Button
            type="submit"
            disabled={loading}
            className="w-full h-10 bg-blue-500 text-white hover:bg-blue-600 rounded-lg transition-all font-medium"
          >
            {loading ? "Creating Account..." : "Create Brand Account"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default BrandSignupModal;