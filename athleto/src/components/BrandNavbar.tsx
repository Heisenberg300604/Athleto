import React, { useState } from 'react';
import { Bell, User, HelpCircle, MessageSquare, X } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';

const BrandNavbar = () => {
  const router = useRouter();
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);
  const [isFeedbackOpen, setIsFeedbackOpen] = useState(false);
  const [isHelpOpen, setIsHelpOpen] = useState(false);
  const [feedbackSubmitted, setFeedbackSubmitted] = useState(false);
  const [feedbackText, setFeedbackText] = useState('');

  const handleProfileClick = () => {
    router.push('/brand-profile');
  };

  const handleFeedbackSubmit = () => {
    if (feedbackText.trim()) {
      // Here you would typically send the feedback to a backend
      setFeedbackSubmitted(true);
      setTimeout(() => {
        setFeedbackSubmitted(false);
        setIsFeedbackOpen(false);
        setFeedbackText('');
      }, 2000);
    }
  };

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center">
            <Link 
              href="/brand-dashboard" 
              className="text-indigo-600 text-2xl font-bold font-['Orbitron'] tracking-wider transition-all duration-300 hover:text-indigo-800"
            >
              ATHLETO
            </Link>

          {/* Navigation Links */}
          <div className="hidden md:block ml-10">
  <div className="flex items-center space-x-8">
    <Link 
      href="/brand-dashboard" 
      className="text-gray-600 hover:text-indigo-600 font-medium transition-colors duration-300 relative group"
    >
      OPPORTUNITIES
      <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-indigo-600 transition-all duration-300 group-hover:w-full"></span>
    </Link>

    <Link 
      href="/brand-talent" 
      className="text-gray-600 hover:text-indigo-600 font-medium transition-colors duration-300 relative group"
    >
      TALENT
      <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-indigo-600 transition-all duration-300 group-hover:w-full"></span>
    </Link>

    <Link 
      href="/brand-dashboard/newsfeed" 
      className="text-gray-600 hover:text-indigo-600 font-medium transition-colors duration-300 relative group"
    >
      NEWS FEED
      <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-indigo-600 transition-all duration-300 group-hover:w-full"></span>
    </Link>
  </div>
</div>

        </div>

        {/* Right Side Icons */}
        <div className="flex items-center space-x-6">
          {/* Notification Icon */}
          <div className="relative">
            <button 
              onClick={() => {
                setIsNotificationOpen(!isNotificationOpen);
                setIsFeedbackOpen(false);
                setIsHelpOpen(false);
              }} 
              className="text-gray-600 hover:text-indigo-600 transition-colors duration-300 relative group"
              title="Notifications"
            >
               <Bell className="h-6 w-6 text-grey-900" />
                            <span className="absolute top-0 right-0 h-3 w-3 bg-red-500 rounded-full border-2 border-white"></span>
                          </button>
                          {isNotificationOpen && (
                            <Card className="absolute right-0 top-full mt-2 w-80 shadow-lg bg-gray-100 border-none">
                              <CardHeader>
                                <CardTitle className="text-center text-black p-4 border-b border-gray-400 bg-gray-100">Notifications</CardTitle>
                              </CardHeader>
                              <CardContent className="text-center text-black bg-gray-100 p-4">
                                No notifications yet
                              </CardContent>
                            </Card>
            )}
          </div>

          {/* Feedback Icon */}
          <div className="relative">
            <button 
              onClick={() => {
                setIsFeedbackOpen(!isFeedbackOpen);
                setIsNotificationOpen(false);
                setIsHelpOpen(false);
              }} 
              className="text-gray-600 hover:text-indigo-600 transition-colors duration-300"
              title="Provide Feedback"
            >
              <MessageSquare className="h-6 w-6" />
            </button>

            {isFeedbackOpen && (
              <Card className="absolute right-0 top-full mt-2 w-96 shadow-lg p-4">
                <CardHeader className="flex flex-row justify-between items-center">
                  <CardTitle>Provide Feedback</CardTitle>
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    onClick={() => setIsFeedbackOpen(false)}
                  >
                    <X className="h-5 w-5" />
                  </Button>
                </CardHeader>
                <CardContent>
                  {!feedbackSubmitted ? (
                    <>
                      <Textarea 
                        placeholder="Share your thoughts..."
                        value={feedbackText}
                        onChange={(e) => setFeedbackText(e.target.value)}
                        className="mb-4"
                      />
                      <Button 
                        variant="outline" 
                        className="w-full bg-indigo-600 text-white hover:bg-indigo-800"
                        onClick={handleFeedbackSubmit}
                      >
                        Submit Feedback
                      </Button>
                    </>
                  ) : (
                    <div className="text-green-600 text-center">
                      Your feedback has been submitted
                    </div>
                  )}
                </CardContent>
              </Card>
            )}
          </div>

          {/* Help Icon */}
          <div className="relative">
            <button 
              onClick={() => {
                setIsHelpOpen(!isHelpOpen);
                setIsNotificationOpen(false);
                setIsFeedbackOpen(false);
              }} 
              className="text-gray-600 hover:text-indigo-600 transition-colors duration-300"
              title="Help"
            >
              <HelpCircle className="h-6 w-6" />
            </button>

            {isHelpOpen && (
              <Card className="absolute right-0 top-full mt-2 w-80 shadow-lg">
                <CardHeader>
                  <CardTitle>Help Center</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <Link href="/brand-faq" className="block hover:text-indigo-600">
                      Frequently Asked Questions
                    </Link>
                    <Link href="/brand-support" className="block hover:text-indigo-600">
                      Contact Support
                    </Link>
                    <Link href="/brand-guide" className="block hover:text-indigo-600">
                      User Guide
                    </Link>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Profile Icon */}
          <button 
            onClick={handleProfileClick}
            className="text-gray-600 hover:text-indigo-600 transition-colors duration-300"
            title="User Profile"
          >
            <User className="h-6 w-6" />
          </button>
        </div>
      </div>
    </div>
  </nav>
  );
};

export default BrandNavbar;