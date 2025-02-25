import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

interface PreviewData {
  title?: string;
  description?: string;
  amount?: string;
  [key: string]: any;
}

interface PreviewProps {
  data: PreviewData;
  type: "crowdfunding" | "micro-investment" | "loan";
  onSubmit: () => void;
  onBack: () => void;
  isLoading: boolean;
}

export default function FundingPreview({ data, type, onSubmit, onBack, isLoading }: PreviewProps) {
  const renderPreviewContent = () => {
    switch (type) {
      case "crowdfunding":
        return (
          <>
            <div className="space-y-2">
              <h3 className="font-medium text-gray-600">Campaign Title</h3>
              <p className="text-lg">{data.title}</p>
            </div>
            <div className="space-y-2">
              <h3 className="font-medium text-gray-600">Funding Goal</h3>
              <p className="text-lg">₹{Number(data.amount).toLocaleString()}</p>
            </div>
            <div className="space-y-2">
              <h3 className="font-medium text-gray-600">Campaign Description</h3>
              <p className="text-lg">{data.description}</p>
            </div>
          </>
        );
      case "micro-investment":
        return (
          <>
            <div className="space-y-2">
              <h3 className="font-medium text-gray-600">Funding Amount</h3>
              <p className="text-lg">₹{Number(data.amount).toLocaleString()}</p>
            </div>
            <div className="space-y-2">
              <h3 className="font-medium text-gray-600">Earnings Percentage</h3>
              <p className="text-lg">{data.percentage}%</p>
            </div>
            <div className="space-y-2">
              <h3 className="font-medium text-gray-600">Investment Duration</h3>
              <p className="text-lg">{data.duration} years</p>
            </div>
          </>
        );
      case "loan":
        return (
          <>
            <div className="space-y-2">
              <h3 className="font-medium text-gray-600">Loan Amount</h3>
              <p className="text-lg">₹{Number(data.amount).toLocaleString()}</p>
            </div>
            <div className="space-y-2">
              <h3 className="font-medium text-gray-600">Loan Purpose</h3>
              <p className="text-lg">{data.purpose}</p>
            </div>
            <div className="space-y-2">
              <h3 className="font-medium text-gray-600">Repayment Plan</h3>
              <p className="text-lg">{data.repaymentPlan}</p>
            </div>
          </>
        );
    }
  };

  return (
    <Card className="border-none shadow-md hover:shadow-lg transition-shadow">
      <CardHeader>
        <CardTitle>Preview Your Application</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">{renderPreviewContent()}</CardContent>
      <CardFooter className="flex gap-4">
        <Button variant="outline" onClick={onBack} disabled={isLoading}>
          Back to Edit
        </Button>
        <Button
          className="bg-gradient-to-r from-indigo-500 to-indigo-600 hover:from-indigo-600 hover:to-indigo-700 text-white shadow-md transition-all duration-200"
          onClick={onSubmit}
          disabled={isLoading}
        >
          {isLoading ? "Submitting..." : "Submit Application"}
        </Button>
      </CardFooter>
    </Card>
  );
}