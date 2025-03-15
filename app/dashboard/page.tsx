import Link from 'next/link';
import { ArrowRight, Calendar, Clock, Plus } from 'lucide-react';

import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import MoodChart from '@/components/mood-chart';
import TreatmentProgress from '@/components/treatment-progress';
import DailySuggestions from '@/components/daily-suggestions';
import Nav from '@/components/navbar';

export default function DashboardPage() {
  return (
    <>
      <Nav />

      <div className='container py-10'>
        <div className='mb-8 flex items-center justify-between'>
          <h1 className='text-3xl font-bold'>Your Dashboard</h1>
          <div className='flex items-center gap-2'>
            <Button asChild variant='outline'>
              <Link href='/journal/new'>
                <Plus className='mr-2 h-4 w-4' />
                New Journal Entry
              </Link>
            </Button>
            <Button asChild>
              <Link href='/track'>
                <Plus className='mr-2 h-4 w-4' />
                New Mood Entry
              </Link>
            </Button>
          </div>
        </div>

        <div className='grid gap-6 md:grid-cols-2 lg:grid-cols-3'>
          <Card>
            <CardHeader>
              <CardTitle>Current Streak</CardTitle>
              <CardDescription>Your consistency matters</CardDescription>
            </CardHeader>
            <CardContent className='flex flex-col items-center justify-center space-y-4'>
              <div className='flex flex-col items-center space-y-2'>
                <div className='text-5xl font-bold text-primary'>7</div>
                <p className='text-sm text-muted-foreground'>
                  Days of consistent tracking
                </p>
              </div>
            </CardContent>
            <CardFooter>
              <Button
                variant='ghost'
                className='w-full justify-between'
                asChild>
                <Link href='/insights'>
                  View Insights <ArrowRight className='h-4 w-4' />
                </Link>
              </Button>
            </CardFooter>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Todays Tasks</CardTitle>
              <CardDescription>Scheduled activities</CardDescription>
            </CardHeader>
            <CardContent>
              <div className='space-y-4'>
                <div className='flex items-start space-x-3'>
                  <div className='rounded-full bg-blue-100 p-2 dark:bg-blue-900/20'>
                    <Clock className='h-4 w-4 text-blue-700 dark:text-blue-400' />
                  </div>
                  <div className='space-y-1'>
                    <div className='font-medium'>Medication Reminder</div>
                    <div className='text-sm text-muted-foreground'>9:00 AM</div>
                  </div>
                </div>
                <div className='flex items-start space-x-3'>
                  <div className='rounded-full bg-green-100 p-2 dark:bg-green-900/20'>
                    <Calendar className='h-4 w-4 text-green-700 dark:text-green-400' />
                  </div>
                  <div className='space-y-1'>
                    <div className='font-medium'>Therapy Appointment</div>
                    <div className='text-sm text-muted-foreground'>3:00 PM</div>
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button
                variant='ghost'
                className='w-full justify-between'
                asChild>
                <Link href='/calendar'>
                  View Calendar <ArrowRight className='h-4 w-4' />
                </Link>
              </Button>
            </CardFooter>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Quick Check-in</CardTitle>
              <CardDescription>How are you feeling now?</CardDescription>
            </CardHeader>
            <CardContent>
              <DailySuggestions />
            </CardContent>
            <CardFooter>
              <Button className='w-full'>Log Mood</Button>
            </CardFooter>
          </Card>
        </div>

        <div className='mt-8'>
          <Tabs defaultValue='mood'>
            <TabsList className='grid w-full grid-cols-2'>
              <TabsTrigger value='mood'>Mood History</TabsTrigger>
              <TabsTrigger value='treatment'>Treatment Progress</TabsTrigger>
            </TabsList>
            <TabsContent value='mood' className='mt-6'>
              <Card>
                <CardHeader>
                  <CardTitle>Mood Trends</CardTitle>
                  <CardDescription>
                    Your mood patterns over the past 30 days
                  </CardDescription>
                </CardHeader>
                <CardContent className='h-[300px]'>
                  <MoodChart />
                </CardContent>
                <CardFooter>
                  <Button variant='outline' className='w-full' asChild>
                    <Link href='/insights/mood'>View Detailed Analysis</Link>
                  </Button>
                </CardFooter>
              </Card>
            </TabsContent>
            <TabsContent value='treatment' className='mt-6'>
              <Card>
                <CardHeader>
                  <CardTitle>Treatment Journey</CardTitle>
                  <CardDescription>
                    Track your progress and milestones
                  </CardDescription>
                </CardHeader>
                <CardContent className='h-[300px]'>
                  <TreatmentProgress />
                </CardContent>
                <CardFooter>
                  <Button variant='outline' className='w-full' asChild>
                    <Link href='/treatment/progress'>View All Treatments</Link>
                  </Button>
                </CardFooter>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </>
  );
}
