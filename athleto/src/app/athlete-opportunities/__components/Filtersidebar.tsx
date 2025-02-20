"use client"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"

export interface Filters {
  state: string
  city: string
  budgetFrom: string
  budgetTo: string
  currency: string
  opportunityType: string
}

interface FilterSidebarProps {
  filters: Filters
  onFiltersChange: (filters: Filters) => void
  onApplyFilters: () => void
}

export function FilterSidebar({ filters, onFiltersChange, onApplyFilters }: FilterSidebarProps) {
  const updateFilter = (key: keyof Filters, value: string) => {
    onFiltersChange({
      ...filters,
      [key]: value,
    })
  }

  const clearFilters = () => {
    onFiltersChange({
      state: "all",
      city: "all",
      budgetFrom: "",
      budgetTo: "",
      currency: "",
      opportunityType: "",
    })
  }

  return (
    <Card className="w-[300px] flex flex-col h-[400px] bg-white">
      <CardHeader className="border-b py-3">
        <CardTitle>FILTERS</CardTitle>
      </CardHeader>
      <div className="overflow-y-auto flex-1">
        <CardContent className="space-y-4 py-3">
          <div className="space-y-2">
            <Label>Location</Label>
            <Select value={filters.state} onValueChange={(value) => updateFilter("state", value)}>
              <SelectTrigger>
                <SelectValue placeholder="All states" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All states</SelectItem>
                <SelectItem value="delhi">Delhi</SelectItem>
                <SelectItem value="uttarpradesh">Uttar Pradesh</SelectItem>
                <SelectItem value="new delhi">New Delhi</SelectItem>
              </SelectContent>
            </Select>
            <Button
              variant="link"
              className="px-0 text-sm text-muted-foreground"
              onClick={() => {
                updateFilter("state", "all")
                updateFilter("city", "all")
              }}
            >
              Clear
            </Button>
          </div>
          <div className="space-y-2">
            <Label>Amount</Label>
            <div className="flex gap-2">
              <Input
                placeholder="From"
                type="number"
                value={filters.budgetFrom}
                onChange={(e) => updateFilter("budgetFrom", e.target.value)}
              />
              <Input
                placeholder="To"
                type="number"
                value={filters.budgetTo}
                onChange={(e) => updateFilter("budgetTo", e.target.value)}
              />
            </div>
            <Button
              variant="link"
              className="px-0 text-sm text-muted-foreground"
              onClick={() => {
                updateFilter("budgetFrom", "")
                updateFilter("budgetTo", "")
              }}
            >
              Clear
            </Button>
          </div>
        </CardContent>
      </div>
      <div className="border-t p-3 bg-white">
        <div className="flex gap-2">
          <Button variant="outline" className="w-full" onClick={clearFilters}>
            CLEAR
          </Button>
          <Button className="w-full bg-indigo-600 hover:bg-indigo-700" onClick={onApplyFilters}>
            APPLY
          </Button>
        </div>
      </div>
    </Card>
  )
}

