import React, { useState } from 'react';
import { 
  Download, 
  Filter,
  CheckCircle2 
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';
import { Card } from '@/components/ui/card';
import { useForceLightMode } from '@/hooks/useForcedLightTheme';

export const PaymentHistoryPanel: React.FC = () => {
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const handleExportToCSV = () => {
    // Implement CSV export logic
    console.log('Exporting to CSV');
  };
  useForceLightMode()
  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">Payment History</h2>
        <div className="flex items-center space-x-2">
          <Button 
            variant="outline" 
            size="sm"
            onClick={handleExportToCSV}
          >
            <Download className="mr-2 h-4 w-4" />
            EXPORT TO CSV
          </Button>
          <Button 
            variant="outline" 
            size="sm"
            className="p-2"
          >
            <Filter className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Payment History Card */}
      <Card className="w-full h-[400px] flex flex-col items-center justify-center text-center">
        <div className="bg-gray-100 rounded-full p-6 mb-4">
          <div className="relative">
            <CheckCircle2 
              className="h-16 w-16 text-primary/50 mx-auto" 
              strokeWidth={1.5}
            />
            <div className="absolute inset-0 flex items-center justify-center">
              {[1, 2, 3].map((item) => (
                <div 
                  key={item}
                  className="absolute w-full h-px bg-primary/20 opacity-50 rotate-0"
                  style={{ 
                    transform: `rotate(${item * 45}deg)` 
                  }}
                />
              ))}
            </div>
          </div>
        </div>
        
        <p className="text-lg font-medium text-muted-foreground mb-2">
          You will see your payment history here soon
        </p>
      </Card>

      {/* Pagination */}
      <div className="flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <span className="text-sm text-muted-foreground">Rows per page:</span>
          <Select 
            value={rowsPerPage.toString()}
            onValueChange={(value) => setRowsPerPage(Number(value))}
          >
            <SelectTrigger className="w-[70px]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {[10, 20, 50, 100].map((num) => (
                <SelectItem key={num} value={num.toString()}>
                  {num}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="text-sm text-muted-foreground">
          0-0 of 0
        </div>
        <div className="flex space-x-2">
          <Button 
            variant="outline" 
            size="sm" 
            disabled
          >
            {'<'}
          </Button>
          <Button 
            variant="outline" 
            size="sm" 
            disabled
          >
            {'>'}
          </Button>
        </div>
      </div>
    </div>
  );
};