"use client";

import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { FilterSidebar } from "./__components/Filtersidebar";
import { Search } from "lucide-react";
import AthleteNavbar from "@/components/AthleteNavbar";
import { useForceLightMode } from "@/hooks/useForcedLightTheme";
import { OpportunityCard } from "@/components/OpportunityCard";
import { useOpportunity } from "@/context/OpportunityContext";
import { useUser } from "@/context/UserContext";
import Chatbot from "@/components/Chatbot";
// import { OpportunityType } from "@/types/OpportunityType";
import { OpportunityType } from "@/context/OpportunityContext";

export default function OpportunitiesPage() {
  useForceLightMode();
  const { opportunities, loading, getOpenOpportunities } = useOpportunity();
  const { athlete } = useUser();
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredOpportunities, setFilteredOpportunities] = useState<OpportunityType[]>([]);
  
  // Fetch opportunities only once when component mounts
  useEffect(() => {
    const fetchOpportunities = async () => {
      try {
        const openOpportunities = await getOpenOpportunities();
        setFilteredOpportunities(openOpportunities);
      } catch (error) {
        console.error("Error fetching opportunities:", error);
      }
    };
    
    fetchOpportunities();
  }, []);

  // Apply search filter whenever searchTerm changes
  useEffect(() => {
    if (searchTerm === "") {
      // If search is empty, show all opportunities from context or from our initial fetch
      const allOpps = opportunities.length > 0 ? opportunities : filteredOpportunities;
      setFilteredOpportunities(allOpps);
    } else {
      // Get the source data to filter - either from context or our current filtered list
      const sourceData = opportunities.length > 0 ? opportunities : filteredOpportunities;
      
      const filtered = sourceData.filter(opp => 
        opp.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (opp.brand_name?.toLowerCase() ?? "").includes(searchTerm.toLowerCase()) ||
        opp.location.city.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredOpportunities(filtered);
    }
  }, [searchTerm, opportunities]);

  const handleApply = async (opportunityId: string) => {
    try {
      // Add application logic here
      // Example: await applyToOpportunity(opportunityId, athlete.id);
      console.log(`Applied to opportunity ${opportunityId}`);
    } catch (error) {
      console.error('Failed to apply:', error);
    }
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      <AthleteNavbar />
      <div className="container mx-auto flex gap-6 p-6">
        <FilterSidebar />
        <div className="flex-1 space-y-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input 
              className="pl-9" 
              placeholder="Search opportunities..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          <div className="space-y-4">
            {loading && filteredOpportunities.length === 0 ? (
              <div className="text-center py-8">Loading opportunities...</div>
            ) : filteredOpportunities.length === 0 ? (
              <div className="text-center py-8">
                <h3 className="text-xl font-medium text-gray-900 mb-2">
                  No opportunities found
                </h3>
                <p className="text-gray-500">
                  Try adjusting your filters or search terms
                </p>
              </div>
            ) : (
              filteredOpportunities.map((opportunity) => (
                <OpportunityCard
                  key={opportunity.id}
                  opportunity={opportunity}
                  onApply={handleApply}
                />
              ))
            )}
          </div>
        </div>
      </div>
      <Chatbot/>
    </div>
  );
}