"use client"
import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {supabase} from "@/lib/supabase";
import LoginModal from './Loginmodal';


interface AthleteSignupModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const AthleteSignupModal = ({ isOpen, onClose }: AthleteSignupModalProps) => {
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | ArrayBuffer | null>(null);
  const handleLogin = async () => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
    });
    if (error) console.error(error);
  };

  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
const [isBrandSignupOpen, setIsBrandSignupOpen] = useState(false);
const [isAthleteSignupOpen, setIsAthleteSignupOpen] = useState(false);
  
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px] bg-black border-2 border-blue-500/30 p-8  rounded-xl shadow-xl backdrop-blur-sm ">
        {/* Decorative elements */}
        <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-xl pointer-events-none" />
        <div className="absolute -inset-[1px] border border-blue-500/20 rounded-xl pointer-events-none blur-sm" />
        
        <DialogHeader className="mb-6 space-y-2">
          <DialogTitle className="text-4xl font-bold text-white text-center bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text text-transparent">
            Athlete Sign Up
          </DialogTitle>
          <p className="text-blue-300/80 text-center text-sm font-medium">
            Transform your game, elevate your potential
          </p>
        </DialogHeader>
        
        <div className="grid gap-4">
          <div className="flex gap-4">
            <div className="grid w-full gap-1.5">
              <Label htmlFor="firstName" className="text-gray-300 font-medium">First Name *</Label>
              <Input 
                id="firstName" 
                className="bg-[#1A2233]/50 border-gray-700/30 text-white h-12 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all hover:bg-[#1A2233]/70" 
                placeholder="Enter your first name"
              />
            </div>
            <div className="grid w-full gap-1.5">
              <Label htmlFor="lastName" className="text-gray-300 font-medium">Last Name *</Label>
              <Input 
                id="lastName" 
                className="bg-[#1A2233]/50 border-gray-700/30 text-white h-12 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all hover:bg-[#1A2233]/70" 
                placeholder="Enter your last name"
              />
            </div>
          </div>

          <div className="grid gap-1.5">
            <Label htmlFor="email" className="text-gray-300 font-medium">Email Address *</Label>
            <Input 
              id="email" 
              type="email" 
              className="bg-[#1A2233]/50 border-gray-700/30 text-white h-12 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all hover:bg-[#1A2233]/70" 
              placeholder="Enter your email address"
            />
          </div>

          <div className="grid gap-1.5">
            <Label htmlFor="password" className="text-gray-300 font-medium">Password *</Label>
            <Input 
              id="password" 
              type="password" 
              className="bg-[#1A2233]/50 border-gray-700/30 text-white h-12 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all hover:bg-[#1A2233]/70" 
              placeholder='Enter your password'
            />
          </div>

          <div className="grid gap-1.5">
            <Label htmlFor="confirmPassword" className="text-gray-300 font-medium">Confirm Password *</Label>
            <Input 
              id="confirmPassword" 
              type="password" 
              className="bg-[#1A2233]/50 border-gray-700/30 text-white h-12 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all hover:bg-[#1A2233]/70" 
              placeholder='Confirm your password'
            />
          </div>

          <Button 
                    onClick={handleLogin}
            className="w-full h-12 flex items-center justify-center gap-2 bg-white/10 text-white hover:bg-white/20 rounded-xl transition-all backdrop-blur-sm border border-white/10"
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
            By creating an account, you agree to Athleto's{" "}
            <a href="#" className="text-blue-400 hover:underline">Terms of Use</a> and{" "}
            <a href="#" className="text-blue-400 hover:underline">Privacy Policy</a>
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
  onOpenBrandSignup={() => setIsBrandSignupOpen(true)}
  onOpenAthleteSignup={() => setIsAthleteSignupOpen(true)}
/>
          <Button 
            type="submit" 
            className="w-full h-12 bg-gradient-to-r from-blue-500 to-blue-600 text-white hover:from-blue-600 hover:to-blue-700 rounded-xl transition-all font-medium shadow-lg shadow-blue-500/25"
          >
            Create Account
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AthleteSignupModal;