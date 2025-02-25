import React, { useState } from 'react';
import { Calendar, ChevronDown, TrendingUp, XCircle, DollarSign, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { useForceLightMode } from '@/hooks/useForcedLightTheme';

interface AnalyticItem {
  title: string;
  amount: string;
  details?: {
    date: string;
    value: number;
  }[];
}

export const AnalyticsPanel = () => {
  const [openItems, setOpenItems] = useState<Record<number, boolean>>({});
  
  const analyticItems: AnalyticItem[] = [
    {
      title: "Revenue done opportunities",
      amount: "₹45,680",
      details: [
        { date: "2024-01-01", value: 15000 },
        { date: "2024-01-15", value: 30680 }
      ]
    },
    {
      title: "Revenue of cancelled opportunities",
      amount: "₹12,350",
      details: [
        { date: "2024-01-03", value: 5350 },
        { date: "2024-01-20", value: 7000 }
      ]
    },
    {
      title: "Revenue / opportunity average",
      amount: "₹29,015",
      details: []
    }
  ];

  const toggleItem = (index: number) => {
    setOpenItems(prev => ({ ...prev, [index]: !prev[index] }));
  };

  useForceLightMode();

  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
        <CardTitle className="text-2xl font-bold">Analytics</CardTitle>
        {/* <Button variant="outline" className="flex items-center gap-2">
          <Calendar className="h-4 w-4" />
          <span>Select Date Range</span>
        </Button> */}
      </CardHeader>

      <CardContent className="space-y-6">
        <div className="rounded-lg border">
          <div className="px-4 py-3 bg-gray-50 border-b">
            <h3 className="font-semibold text-gray-700">GENERAL</h3>
          </div>
          
          <div className="divide-y">
            <div className="px-4 py-3 flex justify-between text-sm text-gray-500 bg-gray-50">
              <span>Metric</span>
              <span>Value</span>
            </div>
            
            {analyticItems.map((item, index) => (
              <Collapsible
                key={index}
                open={openItems[index]}
                onOpenChange={() => toggleItem(index)}
              >
                <CollapsibleTrigger className="w-full">
                  <div className="px-4 py-3 flex justify-between items-center hover:bg-gray-50 cursor-pointer">
                    <div className="flex items-center gap-2">
                      {index === 0 ? <TrendingUp className="h-4 w-4 text-green-500" /> :
                       index === 1 ? <XCircle className="h-4 w-4 text-red-500" /> :
                       <DollarSign className="h-4 w-4 text-blue-500" />}
                      <span className="text-gray-700">{item.title}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="font-medium">{item.amount}</span>
                      <ChevronDown className={`h-4 w-4 transition-transform ${openItems[index] ? 'rotate-180' : ''}`} />
                    </div>
                  </div>
                </CollapsibleTrigger>
                
                <CollapsibleContent>
                  <div className="px-6 py-4 bg-slate-50">
                    {item.details && item.details.length > 0 ? (
                      <div className="space-y-4">
                        <div className="text-sm font-medium text-gray-500 mb-2">Transaction History</div>
                        {item.details.map((detail, idx) => (
                          <div key={idx} className="bg-white rounded-lg p-3 shadow-sm flex items-center justify-between hover:bg-gray-50 transition-colors">
                            <div className="flex items-center gap-3">
                              <ArrowRight className="h-4 w-4 text-gray-400" />
                              <div className="flex flex-col">
                                <span className="text-sm font-medium text-gray-700">{new Date(detail.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
                                <span className="text-xs text-gray-500">Transaction Date</span>
                              </div>
                            </div>
                            <div className="flex items-center gap-2">
                              <span className="text-sm font-semibold">₹{detail.value.toLocaleString()}</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="flex items-center justify-center py-6">
                        <p className="text-sm text-gray-500">No transaction history available</p>
                      </div>
                    )}
                  </div>
                </CollapsibleContent>
              </Collapsible>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default AnalyticsPanel;