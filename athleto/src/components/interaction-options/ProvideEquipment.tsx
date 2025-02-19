"use client"

import type React from "react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"

interface ProvideEquipmentProps {
  talent: any
}

const ProvideEquipment: React.FC<ProvideEquipmentProps> = ({ talent }) => {
  const [selectedItems, setSelectedItems] = useState<string[]>([])
  const [customItem, setCustomItem] = useState("")

  const equipmentList = ["Sports Shoes", "Training Kit", "Performance Gear", "Protective Equipment", "Sports Bag"]

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle the equipment provision submission here
    console.log("Equipment provision submitted:", { selectedItems, customItem })
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <Label>Select Equipment</Label>
        {equipmentList.map((item) => (
          <div key={item} className="flex items-center space-x-2">
            <Checkbox
              id={item}
              checked={selectedItems.includes(item)}
              onCheckedChange={(checked) => {
                setSelectedItems(checked ? [...selectedItems, item] : selectedItems.filter((i) => i !== item))
              }}
            />
            <Label htmlFor={item}>{item}</Label>
          </div>
        ))}
      </div>
      <div>
        <Label htmlFor="custom-item">Custom Item</Label>
        <Input
          type="text"
          id="custom-item"
          value={customItem}
          onChange={(e) => setCustomItem(e.target.value)}
          placeholder="Enter custom equipment item"
        />
      </div>
      <Button type="submit">Submit Equipment Provision</Button>
    </form>
  )
}

export default ProvideEquipment

