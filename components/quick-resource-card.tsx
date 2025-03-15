import type React from "react"
import Link from "next/link"
import { ArrowRight } from "lucide-react"

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

interface QuickResourceCardProps {
  title: string
  description: string
  icon: React.ReactNode
  href: string
}

export default function QuickResourceCard({ title, description, icon, href }: QuickResourceCardProps) {
  return (
    <Card className="flex flex-col h-full">
      <CardHeader className="flex flex-row items-center gap-4">
        <div className="rounded-full p-2 bg-primary/10 text-primary">{icon}</div>
        <div>
          <CardTitle className="text-lg">{title}</CardTitle>
          <CardDescription>{description}</CardDescription>
        </div>
      </CardHeader>
      <CardContent className="flex-1">{/* Content can be expanded based on the specific resource */}</CardContent>
      <CardFooter>
        <Button variant="ghost" className="w-full justify-between" asChild>
          <Link href={href}>
            Access Resources <ArrowRight className="h-4 w-4" />
          </Link>
        </Button>
      </CardFooter>
    </Card>
  )
}

