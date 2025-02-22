"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { Badge } from "@/components/ui/badge"
import { MapPin, DollarSign, Clock } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

const applicationSchema = z.object({
  coverLetter: z.string().min(100, "Cover letter must be at least 100 characters"),
  portfolioLink: z.string().url("Please enter a valid URL").optional(),
  expectedRate: z.string().min(1, "Please enter your expected rate"),
  availability: z.string().min(1, "Please confirm your availability"),
})

interface ApplySponsorshipModalProps {
  isOpen: boolean
  onClose: () => void
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
  }
}

export function ApplySponsorshipModal({ isOpen, onClose, opportunity }: ApplySponsorshipModalProps) {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { toast } = useToast()

  const form = useForm<z.infer<typeof applicationSchema>>({
    resolver: zodResolver(applicationSchema),
    defaultValues: {
      coverLetter: "",
      portfolioLink: "",
      expectedRate: "",
      availability: "",
    },
  })

  async function onSubmit(values: z.infer<typeof applicationSchema>) {
    try {
      setIsSubmitting(true)
      // Here you would typically make an API call to submit the application
      await new Promise((resolve) => setTimeout(resolve, 1500))

      toast({
        title: "Application Submitted!",
        description: "Your application has been successfully submitted. We'll review it and get back to you soon.",
      })

      onClose()
    } catch (error) {
      toast({
        title: "Error",
        description: "There was an error submitting your application. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{opportunity.title}</DialogTitle>
          <DialogDescription>
            <div className="mt-2 space-y-4">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <MapPin className="h-4 w-4" />
                {opportunity.location.city}, {opportunity.location.country}
                <span className="mx-2">•</span>
                <DollarSign className="h-4 w-4" />₹{Number.parseInt(opportunity.budget).toLocaleString()}
                <span className="mx-2">•</span>
                <Clock className="h-4 w-4" />
                {opportunity.duration}
              </div>

              <div className="flex flex-wrap gap-2">
                <Badge variant="secondary">{opportunity.type}</Badge>
                <Badge variant="outline">{opportunity.campaign_type}</Badge>
              </div>

              <div className="space-y-2 text-sm">
                <h4 className="font-medium">About the Opportunity</h4>
                <p className="text-muted-foreground">{opportunity.description}</p>
              </div>

              <div className="space-y-2">
                <h4 className="text-sm font-medium">Requirements</h4>
                <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1">
                  {opportunity.requirements.map((req, index) => (
                    <li key={index}>{req}</li>
                  ))}
                </ul>
              </div>

              <div className="space-y-2">
                <h4 className="text-sm font-medium">Perks</h4>
                <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1">
                  {opportunity.perks.map((perk, index) => (
                    <li key={index}>{perk}</li>
                  ))}
                </ul>
              </div>
            </div>
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="coverLetter"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Why are you interested in this opportunity?</FormLabel>
                  <FormControl>
                    <Textarea placeholder="Tell us why you'd be a great fit..." className="min-h-[100px]" {...field} />
                  </FormControl>
                  <FormDescription>
                    Include relevant experience and what you can bring to this opportunity.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="portfolioLink"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Portfolio or Social Media Link (Optional)</FormLabel>
                  <FormControl>
                    <Input placeholder="https://..." {...field} />
                  </FormControl>
                  <FormDescription>Share your work or social media presence.</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="expectedRate"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Expected Rate</FormLabel>
                    <FormControl>
                      <Input placeholder="₹ per post/event" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="availability"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Availability</FormLabel>
                    <FormControl>
                      <Input placeholder="When can you start?" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <DialogFooter>
              <Button variant="outline" onClick={onClose}>
                Cancel
              </Button>
              <Button type="submit" disabled={isSubmitting} className="bg-indigo-600 hover:bg-indigo-700">
                {isSubmitting ? "Submitting..." : "Submit Application"}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}

