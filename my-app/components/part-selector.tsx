import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { HelpCircle } from 'lucide-react'

interface PartSelectorProps {
  title: string
  options: string[]
  value: string
  onChange: (value: string) => void
  helpText?: string
}

export function PartSelector({ title, options, value, onChange, helpText }: PartSelectorProps) {
  return (
    <div className="border border-gray-200 rounded-lg p-4 mb-4 bg-white shadow-sm hover:border-gray-300 transition-colors">
      <div className="flex items-center justify-between mb-2">
        <Label className="text-lg font-medium">{title}</Label>
        {helpText && (
          <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
            <HelpCircle className="h-4 w-4" />
          </Button>
        )}
      </div>
      <Select value={value} onValueChange={onChange}>
        <SelectTrigger>
          <SelectValue placeholder={`Select ${title}`} />
        </SelectTrigger>
        <SelectContent>
          {options.map((option) => (
            <SelectItem key={option} value={option}>
              {option}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  )
}

