"use client"

import { useState } from "react"
import { ChevronDown } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"

export function CourseFilters() {
  const [priceRange, setPriceRange] = useState([0, 100])
  const [isLevelOpen, setIsLevelOpen] = useState(true)
  const [isCategoryOpen, setIsCategoryOpen] = useState(true)
  const [isRatingOpen, setIsRatingOpen] = useState(true)
  const [isPriceOpen, setIsPriceOpen] = useState(true)

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h3 className="font-semibold">Filters</h3>
        <Button variant="outline" size="sm" className="w-full justify-start">
          Clear All Filters
        </Button>
      </div>
      <Collapsible open={isCategoryOpen} onOpenChange={setIsCategoryOpen}>
        <CollapsibleTrigger className="flex w-full items-center justify-between py-2 font-medium">
          Categories
          <ChevronDown className={`h-4 w-4 transition-transform ${isCategoryOpen ? "rotate-180" : ""}`} />
        </CollapsibleTrigger>
        <CollapsibleContent className="space-y-2 pt-2">
          {["Programming", "Design", "Business", "Marketing", "Photography"].map((category) => (
            <div key={category} className="flex items-center space-x-2">
              <Checkbox id={`category-${category.toLowerCase()}`} />
              <Label htmlFor={`category-${category.toLowerCase()}`} className="text-sm font-normal">
                {category}
              </Label>
            </div>
          ))}
        </CollapsibleContent>
      </Collapsible>
      <Collapsible open={isLevelOpen} onOpenChange={setIsLevelOpen}>
        <CollapsibleTrigger className="flex w-full items-center justify-between py-2 font-medium">
          Level
          <ChevronDown className={`h-4 w-4 transition-transform ${isLevelOpen ? "rotate-180" : ""}`} />
        </CollapsibleTrigger>
        <CollapsibleContent className="space-y-2 pt-2">
          {["Beginner", "Intermediate", "Advanced", "All Levels"].map((level) => (
            <div key={level} className="flex items-center space-x-2">
              <Checkbox id={`level-${level.toLowerCase()}`} />
              <Label htmlFor={`level-${level.toLowerCase()}`} className="text-sm font-normal">
                {level}
              </Label>
            </div>
          ))}
        </CollapsibleContent>
      </Collapsible>
      <Collapsible open={isRatingOpen} onOpenChange={setIsRatingOpen}>
        <CollapsibleTrigger className="flex w-full items-center justify-between py-2 font-medium">
          Rating
          <ChevronDown className={`h-4 w-4 transition-transform ${isRatingOpen ? "rotate-180" : ""}`} />
        </CollapsibleTrigger>
        <CollapsibleContent className="space-y-2 pt-2">
          {[4, 3, 2, 1].map((rating) => (
            <div key={rating} className="flex items-center space-x-2">
              <Checkbox id={`rating-${rating}`} />
              <Label htmlFor={`rating-${rating}`} className="text-sm font-normal flex items-center">
                {Array(rating)
                  .fill(0)
                  .map((_, i) => (
                    <span key={i} className="text-yellow-400">
                      ★
                    </span>
                  ))}
                {Array(5 - rating)
                  .fill(0)
                  .map((_, i) => (
                    <span key={i} className="text-gray-300">
                      ★
                    </span>
                  ))}
                <span className="ml-1">& up</span>
              </Label>
            </div>
          ))}
        </CollapsibleContent>
      </Collapsible>
      <Collapsible open={isPriceOpen} onOpenChange={setIsPriceOpen}>
        <CollapsibleTrigger className="flex w-full items-center justify-between py-2 font-medium">
          Price
          <ChevronDown className={`h-4 w-4 transition-transform ${isPriceOpen ? "rotate-180" : ""}`} />
        </CollapsibleTrigger>
        <CollapsibleContent className="space-y-4 pt-2">
          <div className="flex items-center space-x-2">
            <Checkbox id="price-free" />
            <Label htmlFor="price-free" className="text-sm font-normal">
              Free
            </Label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox id="price-paid" />
            <Label htmlFor="price-paid" className="text-sm font-normal">
              Paid
            </Label>
          </div>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-sm">${priceRange[0]}</span>
              <span className="text-sm">${priceRange[1]}</span>
            </div>
            <Slider defaultValue={[0, 100]} max={100} step={1} value={priceRange} onValueChange={setPriceRange} />
          </div>
        </CollapsibleContent>
      </Collapsible>
      <Button className="w-full">Apply Filters</Button>
    </div>
  )
}
