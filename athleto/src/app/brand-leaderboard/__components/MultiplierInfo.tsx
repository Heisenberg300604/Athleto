import { Card, CardContent } from "@/components/ui/card"
import { TrendingUp, Users, Target } from "lucide-react"

export function MultipliersInfo() {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
      <Card className="border-0 shadow-md">
        <CardContent className="p-6">
          <div className="flex items-center gap-4">
            <div className="rounded-lg bg-orange-50 p-3">
              <TrendingUp className="h-6 w-6 text-orange-600" />
            </div>
            <div className="space-y-1">
              <p className="text-sm font-medium text-muted-foreground">Market Presence</p>
              <p className="text-2xl font-bold">0.75</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="border-0 shadow-md">
        <CardContent className="p-6">
          <div className="flex items-center gap-4">
            <div className="rounded-lg bg-purple-50 p-3">
              <Users className="h-6 w-6 text-purple-600" />
            </div>
            <div className="space-y-1">
              <p className="text-sm font-medium text-muted-foreground">Athletes Chosen</p>
              <p className="text-2xl font-bold">0.50</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="border-0 shadow-md">
        <CardContent className="p-6">
          <div className="flex items-center gap-4">
            <div className="rounded-lg bg-red-50 p-3">
              <Target className="h-6 w-6 text-red-600" />
            </div>
            <div className="space-y-1">
              <p className="text-sm font-medium text-muted-foreground">Campaign Success</p>
              <p className="text-2xl font-bold">0.85</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
