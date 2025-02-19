import { Card, CardContent } from "@/components/ui/card"
import { Trophy, Users, BarChart } from "lucide-react"
export function MultipliersInfo() {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
      <Card className="border-0 shadow-md">
        <CardContent className="p-6">
          <div className="flex items-center gap-4">
            <div className="rounded-lg bg-yellow-50 p-3">
              <Trophy className="h-6 w-6 text-yellow-600" />
            </div>
            <div className="space-y-1">
              <p className="text-sm font-medium text-muted-foreground">Past Performance</p>
              <p className="text-2xl font-bold">0.40</p>
            </div>
          </div>
        </CardContent>
      </Card>
      <Card className="border-0 shadow-md">
        <CardContent className="p-6">
          <div className="flex items-center gap-4">
            <div className="rounded-lg bg-blue-50 p-3">
              <Users className="h-6 w-6 text-blue-600" />
            </div>
            <div className="space-y-1">
              <p className="text-sm font-medium text-muted-foreground">Sponsorship Interest</p>
              <p className="text-2xl font-bold">0.35</p>
            </div>
          </div>
        </CardContent>
      </Card>
      <Card className="border-0 shadow-md">
        <CardContent className="p-6">
          <div className="flex items-center gap-4">
            <div className="rounded-lg bg-green-50 p-3">
              <BarChart className="h-6 w-6 text-green-600" />
            </div>
            <div className="space-y-1">
              <p className="text-sm font-medium text-muted-foreground">Athlete Engagement</p>
              <p className="text-2xl font-bold">0.25</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}