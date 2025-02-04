import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { EyeIcon, EyeOffIcon } from "lucide-react";
import { useState } from "react";

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenBrandSignup: () => void;
  onOpenAthleteSignup: () => void;
}

const LoginModal = ({ isOpen, onClose, onOpenBrandSignup, onOpenAthleteSignup }: LoginModalProps) => {
  const [showPassword, setShowPassword] = useState(false);

  const handleBrandSignupClick = () => {
    onClose();
    onOpenBrandSignup();
  };

  const handleAthleteSignupClick = () => {
    onClose();
    onOpenAthleteSignup();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px] bg-black border-2 border-blue-500/30 p-8 rounded-xl shadow-xl backdrop-blur-sm">
        {/* Decorative elements */}
        <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-xl pointer-events-none" />
        <div className="absolute -inset-[1px] border border-blue-500/20 rounded-xl pointer-events-none blur-sm" />

        {/* Key icon image */}
        <div className="flex justify-center mb-4">
          <div className="w-24 h-24 bg-gray-200/10 rounded-full flex items-center justify-center">
            <svg
              className="w-12 h-12 text-blue-400"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z" />
            </svg>
          </div>
        </div>

        <DialogHeader className="mb-6 space-y-2">
          <DialogTitle className="text-4xl font-bold text-white text-center bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text text-transparent">
            Welcome Back
          </DialogTitle>
          <p className="text-blue-300/80 text-center text-sm font-medium">
            Sign in to continue your journey
          </p>
        </DialogHeader>

        <div className="grid gap-4">
          <div className="grid gap-1.5">
            <Label htmlFor="email" className="text-gray-300 font-medium">Email</Label>
            <Input
              id="email"
              type="email"
              className="bg-[#1A2233]/50 border-gray-700/30 text-white h-12 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all hover:bg-[#1A2233]/70"
              placeholder="Enter your email address"
            />
          </div>

          <div className="grid gap-1.5">
            <Label htmlFor="password" className="text-gray-300 font-medium">Password</Label>
            <div className="relative">
              <Input
                id="password"
                type={showPassword ? "text" : "password"}
                className="bg-[#1A2233]/50 border-gray-700/30 text-white h-12 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all hover:bg-[#1A2233]/70 pr-10"
                placeholder="Enter your password"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-300"
              >
                {showPassword ? (
                  <EyeOffIcon className="h-5 w-5" />
                ) : (
                  <EyeIcon className="h-5 w-5" />
                )}
              </button>
            </div>
          </div>

          <div className="text-right">
            <a href="#" className="text-sm text-blue-400 hover:underline">
              Forgot password?
            </a>
          </div>

          <Button
            type="submit"
            className="w-full h-12 bg-gradient-to-r from-blue-500 to-blue-600 text-white hover:from-blue-600 hover:to-blue-700 rounded-xl transition-all font-medium shadow-lg shadow-blue-500/25"
          >
            Log In
          </Button>

          <div className="relative my-2">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-700"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 text-gray-400 bg-black">Don't have an account?</span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <Button
              onClick={handleBrandSignupClick}
              className="h-12 bg-white/10 text-white hover:bg-white/20 rounded-xl transition-all backdrop-blur-sm border border-white/10"
            >
              Sign Up as Brand
            </Button>
            <Button
              onClick={handleAthleteSignupClick}
              className="h-12 bg-white/10 text-white hover:bg-white/20 rounded-xl transition-all backdrop-blur-sm border border-white/10"
            >
              Sign Up as Talent
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default LoginModal;