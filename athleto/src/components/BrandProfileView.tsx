import { Edit2, Users, MapPin, Globe, Building } from 'lucide-react';
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

interface BrandProfileViewProps {
  onEdit: () => void;
  profileData: {
    status: string;
    companyName: string;
    industry: string;
    location: string;
    about: string;
  };
}

export const BrandProfileView: React.FC<BrandProfileViewProps> = ({
  onEdit,
  profileData
}) => {
  return (
    <Card className="w-full bg-white border-none box-shadow-md">
      <CardContent className="p-6">
        <div className="flex justify-between items-start mb-6">
          <div className="space-y-3">
            <h1 className="text-2xl font-semibold text-gray-900">
              {profileData.companyName || 'Company Name'}
            </h1>
            <div className="flex items-center space-x-2 text-black">
              <Badge variant={profileData.status === 'verified' ? 'default' : 'secondary'}>
                {profileData.status || 'Status'}
              </Badge>
              {/* <Badge variant="secondary">Private</Badge> */}
            </div>
          </div>
          <Button
            onClick={onEdit}
            className="flex items-center space-x-2 bg-indigo-600 text-white hover:bg-indigo-700"
          >
            <Edit2 className="w-4 h-4" />
            <span>Edit Profile</span>
          </Button>
        </div>

        <div className="grid grid-cols-2 gap-6 mb-8">
          <div className="flex items-center space-x-3 text-gray-600">
            <Building className="w-5 h-5" />
            <span>{profileData.industry || 'Industry not specified'}</span>
          </div>
          <div className="flex items-center space-x-3 text-gray-600">
            <MapPin className="w-5 h-5" />
            <span>{profileData.location || 'Location not specified'}</span>
          </div>
        </div>

        <div className="border-t pt-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">About</h3>
          <p className="text-gray-600 leading-relaxed">
            {profileData.about || 'No company description available'}
          </p>
        </div>
      </CardContent>
    </Card>
  );
};