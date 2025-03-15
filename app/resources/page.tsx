import Link from "next/link";
import {
  ArrowRight,
  BookOpen,
  Calendar,
  Globe,
  Heart,
  Info,
  LifeBuoy,
  Phone,
  Users,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function ResourcesPage() {
  return (
    <>
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center space-x-4 sm:justify-between sm:space-x-0">
          <div className="flex gap-2 items-center">
            <Heart className="h-6 w-6 text-primary" />
            <h1 className="text-xl font-bold">MindTrack</h1>
          </div>
          <div className="flex flex-1 items-center justify-end space-x-4">
            <nav className="flex items-center space-x-2">
              <Button asChild variant="ghost" size="sm">
                <Link href="/AI">Dr.AI</Link>
              </Button>
              <Button asChild variant="ghost" size="sm">
                <Link href="/dashboard">Dashboard</Link>
              </Button>
              <Button asChild variant="ghost" size="sm">
                <Link href="/journal">Journal</Link>
              </Button>
              <Button asChild variant="ghost" size="sm">
                <Link href="/resources">Resources</Link>
              </Button>
              <Button asChild size="sm">
                <Link href="/profile">Profile</Link>
              </Button>
            </nav>
          </div>
        </div>
      </header>
      <div className="container py-10">
        <div className="mb-8">
          <h1 className="text-3xl font-bold">Resources</h1>
          <p className="text-muted-foreground mt-1">
            Information and support for your mental health journey
          </p>
        </div>

        <div className="mb-8 p-6 bg-primary/5 rounded-lg border">
          <div className="flex flex-col md:flex-row gap-6 items-start">
            <div className="rounded-full bg-primary/10 p-3 text-primary">
              <Info className="h-8 w-8" />
            </div>
            <div className="space-y-2">
              <h2 className="text-2xl font-semibold">Crisis Support</h2>
              <p className="text-muted-foreground">
                If you are experiencing a mental health emergency or having
                thoughts of suicide, please reach out for immediate help:
              </p>
              <div className="grid gap-3 mt-4 md:grid-cols-2">
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg flex items-center gap-2">
                      <Phone className="h-4 w-4" /> National Suicide Prevention
                      Lifeline
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="font-semibold text-lg">988</p>
                    <p className="text-sm text-muted-foreground">
                      Available 24/7
                    </p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg flex items-center gap-2">
                      <LifeBuoy className="h-4 w-4" /> Crisis Text Line
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="font-semibold">Text HOME to 741741</p>
                    <p className="text-sm text-muted-foreground">
                      Available 24/7
                    </p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>

        <Tabs defaultValue="find-help" className="mb-8">
          <TabsList className="grid grid-cols-4 w-full">
            <TabsTrigger value="find-help">Find Help</TabsTrigger>
            <TabsTrigger value="self-help">Self-Help Tools</TabsTrigger>
            <TabsTrigger value="learn">Learn</TabsTrigger>
            <TabsTrigger value="community">Community</TabsTrigger>
          </TabsList>

          <TabsContent value="find-help" className="mt-6">
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Calendar className="h-5 w-5 text-primary" /> Find a
                    Therapist
                  </CardTitle>
                  <CardDescription>
                    Connect with mental health professionals in your area
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    Search for therapists, psychologists, and psychiatrists who
                    specialize in depression and related conditions.
                  </p>
                </CardContent>
                <CardFooter>
                  <Button className="w-full" asChild>
                    <Link href="/resources/therapists">
                      Search Providers <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </CardFooter>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Heart className="h-5 w-5 text-primary" /> Treatment Options
                  </CardTitle>
                  <CardDescription>
                    Learn about different treatment approaches
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    Explore information about therapy types, medication options,
                    and alternative treatments for depression.
                  </p>
                </CardContent>
                <CardFooter>
                  <Button className="w-full" asChild>
                    <Link href="/resources/treatments">
                      View Treatments <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </CardFooter>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Globe className="h-5 w-5 text-primary" /> Insurance Guide
                  </CardTitle>
                  <CardDescription>
                    Understand your mental health coverage
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    Navigate insurance options and learn how to maximize your
                    benefits for mental health services.
                  </p>
                </CardContent>
                <CardFooter>
                  <Button className="w-full" asChild>
                    <Link href="/resources/insurance">
                      Insurance Help <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </CardFooter>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="self-help" className="mt-6">
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <BookOpen className="h-5 w-5 text-primary" /> Guided
                    Practices
                  </CardTitle>
                  <CardDescription>
                    Meditation, mindfulness, and relaxation techniques
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    Access guided audio sessions designed to help reduce stress,
                    improve mood, and build resilience.
                  </p>
                </CardContent>
                <CardFooter>
                  <Button className="w-full" asChild>
                    <Link href="/resources/practices">
                      Start Practice <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </CardFooter>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Calendar className="h-5 w-5 text-primary" /> Mood
                    Worksheets
                  </CardTitle>
                  <CardDescription>
                    Printable CBT and DBT worksheets
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    Download evidence-based worksheets to help identify thought
                    patterns and develop coping strategies.
                  </p>
                </CardContent>
                <CardFooter>
                  <Button className="w-full" asChild>
                    <Link href="/resources/worksheets">
                      View Worksheets <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </CardFooter>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Heart className="h-5 w-5 text-primary" /> Self-Care
                    Activities
                  </CardTitle>
                  <CardDescription>
                    Daily practices to improve well-being
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    Explore activities to incorporate into your routine that
                    support your mental health journey.
                  </p>
                </CardContent>
                <CardFooter>
                  <Button className="w-full" asChild>
                    <Link href="/resources/self-care">
                      View Activities <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </CardFooter>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="learn" className="mt-6">
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <BookOpen className="h-5 w-5 text-primary" /> Understanding
                    Depression
                  </CardTitle>
                  <CardDescription>
                    Learn about causes, symptoms, and types
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    Educational resources about depression, its effects on the
                    brain, and how it impacts daily life.
                  </p>
                </CardContent>
                <CardFooter>
                  <Button className="w-full" asChild>
                    <Link href="/resources/learn/depression">
                      Learn More <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </CardFooter>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Info className="h-5 w-5 text-primary" /> Research &
                    Articles
                  </CardTitle>
                  <CardDescription>
                    Stay updated on mental health news
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    Access the latest research findings, studies, and articles
                    about depression treatments and breakthroughs.
                  </p>
                </CardContent>
                <CardFooter>
                  <Button className="w-full" asChild>
                    <Link href="/resources/research">
                      View Research <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </CardFooter>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Users className="h-5 w-5 text-primary" /> For Friends &
                    Family
                  </CardTitle>
                  <CardDescription>
                    Supporting loved ones with depression
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    Resources for understanding how to help and support someone
                    experiencing depression.
                  </p>
                </CardContent>
                <CardFooter>
                  <Button className="w-full" asChild>
                    <Link href="/resources/supporting-others">
                      Learn How to Help <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </CardFooter>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="community" className="mt-6">
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Users className="h-5 w-5 text-primary" /> Support Groups
                  </CardTitle>
                  <CardDescription>
                    Connect with others on similar journeys
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    Find in-person and online support groups where you can share
                    experiences and get support.
                  </p>
                </CardContent>
                <CardFooter>
                  <Button className="w-full" asChild>
                    <Link href="/resources/support-groups">
                      Find Groups <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </CardFooter>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Globe className="h-5 w-5 text-primary" /> Community Forums
                  </CardTitle>
                  <CardDescription>
                    Join discussions with our community
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    Participate in moderated forums to ask questions, share
                    insights, and connect with peers.
                  </p>
                </CardContent>
                <CardFooter>
                  <Button className="w-full" asChild>
                    <Link href="/community/forums">
                      Join Forums <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </CardFooter>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Calendar className="h-5 w-5 text-primary" /> Events &
                    Webinars
                  </CardTitle>
                  <CardDescription>
                    Participate in educational events
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    Attend virtual and local events focused on mental health
                    education and community building.
                  </p>
                </CardContent>
                <CardFooter>
                  <Button className="w-full" asChild>
                    <Link href="/community/events">
                      View Calendar <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </CardFooter>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </>
  );
}
