import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Calendar, MapPin, Clock, Users, DollarSign } from "lucide-react"

interface OpportunityCardProps {
  opportunity: {
    id: string
    title: string
    brand_name: string
    type: string
    description: string
    requirements: string[]
    budget: string
    duration: string
    location: {
      city: string
      country: string
    }
    campaign_type: string
    perks: string[]
    application_deadline: string
    spots_available: number
  }
  onApply: () => void
  brandId: string
}

export function AthleteOpportunityCard({ opportunity, onApply, brandId}: OpportunityCardProps) {
  return (
    <Card className="overflow-hidden">
      <CardContent className="p-6">
        <div className="space-y-4">
          <div className="flex items-start justify-between">
            <div>
              <h3 className="font-semibold text-xl">{brandId.split("%20")[0]+" "+opportunity.title}</h3>
            </div>
            <Badge variant="secondary" className="bg-blue-100 text-blue-800">
              {opportunity.type}
            </Badge>
          </div>

          <p className="text-sm text-gray-600">{opportunity.description}</p>

          <div className="grid grid-cols-2 gap-4 text-sm">
            <div className="flex items-center gap-2 text-muted-foreground">
              <DollarSign className="h-4 w-4" />₹{Number.parseInt(opportunity.budget).toLocaleString()} budget
            </div>
            <div className="flex items-center gap-2 text-muted-foreground">
              <Clock className="h-4 w-4" />
              {opportunity.duration} duration
            </div>
            <div className="flex items-center gap-2 text-muted-foreground">
              <MapPin className="h-4 w-4" />
              {opportunity.location.city}, {opportunity.location.country}
            </div>
            <div className="flex items-center gap-2 text-muted-foreground">
              <Users className="h-4 w-4" />
              {opportunity.spots_available} spots available
            </div>
          </div>

          <div className="space-y-2">
            <h4 className="font-medium text-sm">Requirements:</h4>
            <ul className="list-disc list-inside text-sm text-gray-600 space-y-1">
              {opportunity.requirements.map((req, index) => (
                <li key={index}>{req}</li>
              ))}
            </ul>
          </div>

          <div className="space-y-2">
            <h4 className="font-medium text-sm">Perks:</h4>
            <ul className="list-disc list-inside text-sm text-gray-600 space-y-1">
              {opportunity.perks.map((perk, index) => (
                <li key={index}>{perk}</li>
              ))}
            </ul>
          </div>

          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center gap-2 text-muted-foreground">
              <Calendar className="h-4 w-4" />
              Application Deadline: {new Date(opportunity.application_deadline).toLocaleDateString()}
            </div>
            <Badge variant="outline" className="text-purple-600 border-purple-200 bg-purple-50">
              {opportunity.campaign_type}
            </Badge>
          </div>
        </div>
      </CardContent>
      <CardFooter className="border-t bg-muted/50 p-4">
        <Button className="w-full bg-indigo-600 hover:bg-indigo-700" onClick={onApply}>
          Apply Now
        </Button>
      </CardFooter>
    </Card>
  )
}

