import Link from 'next/link';
import {
  ArrowRight,
  BarChart3,
  BookOpen,
  Calendar,
  Clock,
  Heart,
  Smile,
} from 'lucide-react';

import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import MoodTracker from '@/components/mood-tracker';
import QuickResourceCard from '@/components/quick-resource-card';
import Nav from '@/components/navbar';

export default function Home() {
  return (
    <div className='flex min-h-screen flex-col'>
      <Nav />
      <main className='flex-1'>
        <section className='w-full py-12 md:py-24 lg:py-32 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-gray-900 dark:to-gray-800 back'>
          <div className='container px-4 md:px-6'>
            <div className='grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]'>
              <div className='flex flex-col justify-center space-y-4'>
                <div className='space-y-2'>
                  <h1
                    className='text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none '
                    style={{
                      textShadow:
                        '1px 1px 0 white, -1px -1px 0 white, 1px -1px 0 white, -1px 1px 0 white',
                    }}>
                    Track your mental health journey
                  </h1>
                  <p className='max-w-[600px] text-white md:text-xl dark:text-gray-400'>
                    Take control of your well-being with personalized mood
                    tracking, journaling, and treatment resources.
                  </p>
                </div>
                <div className='flex flex-col gap-2 min-[400px]:flex-row'>
                  <Button
                    size='lg'
                    asChild
                    className='bg-green-700 hover:bg-green-800'>
                    <Link href='/mentalform'>
                      Get Started
                      <ArrowRight className='ml-2 h-4 w-4' />
                    </Link>
                  </Button>
                  <Button size='lg' variant='outline' asChild>
                    <Link href='/moodtracker'>
                      Mood Tracker
                      <Smile className='bg-yellow-500 rounded-3xl transform scale-130' />
                    </Link>
                  </Button>
                </div>
              </div>
              <div className='mx-auto flex w-full items-center justify-center'>
                <Card className='w-full'>
                  <CardHeader>
                    <CardTitle>Todays Mood Check-in</CardTitle>
                    <CardDescription>
                      How are you feeling right now?
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <MoodTracker />
                  </CardContent>
                  <CardFooter>
                    <Button className='w-full'>Save Check-in</Button>
                  </CardFooter>
                </Card>
              </div>
            </div>
          </div>
        </section>

        <section className='w-full py-12 md:py-24 lg:py-32'>
          <div className='container px-4 md:px-6'>
            <div className='flex flex-col items-center justify-center space-y-4 text-center'>
              <div className='space-y-2'>
                <h2 className='text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl'>
                  Key Features
                </h2>
                <p className='max-w-[900px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400'>
                  Tools designed to help you understand and improve your mental
                  well-being
                </p>
              </div>
            </div>
            <div className='mx-auto grid max-w-5xl gap-6 py-12 md:grid-cols-2 lg:grid-cols-3'>
              <Card>
                <CardHeader className='flex flex-row items-center gap-4'>
                  <BarChart3 className='h-8 w-8 text-primary' />
                  <div className='grid gap-1'>
                    <CardTitle>Mood Tracking</CardTitle>
                    <CardDescription>
                      Track your daily moods to identify patterns
                    </CardDescription>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className='text-sm text-gray-500 dark:text-gray-400'>
                    Log your emotions throughout the day and visualize your mood
                    changes over time.
                  </p>
                </CardContent>
                <CardFooter>
                  <Button variant='ghost' size='sm' asChild>
                    <Link href='/moodtracker'>
                      Track Mood <ArrowRight className='ml-2 h-4 w-4' />
                    </Link>
                  </Button>
                </CardFooter>
              </Card>
              <Card>
                <CardHeader className='flex flex-row items-center gap-4'>
                  <BookOpen className='h-8 w-8 text-primary' />
                  <div className='grid gap-1'>
                    <CardTitle>Journaling</CardTitle>
                    <CardDescription>
                      Express your thoughts and feelings
                    </CardDescription>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className='text-sm text-gray-500 dark:text-gray-400'>
                    Record your experiences, thoughts, and emotions in a
                    private, secure journal.
                  </p>
                </CardContent>
                <CardFooter>
                  <Button variant='ghost' size='sm' asChild>
                    <Link href='/journal'>
                      Start Writing <ArrowRight className='ml-2 h-4 w-4' />
                    </Link>
                  </Button>
                </CardFooter>
              </Card>
              <Card>
                <CardHeader className='flex flex-row items-center gap-4'>
                  <Calendar className='h-8 w-8 text-primary' />
                  <div className='grid gap-1'>
                    <CardTitle>Treatment Tracking</CardTitle>
                    <CardDescription>
                      Monitor your treatment progress
                    </CardDescription>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className='text-sm text-gray-500 dark:text-gray-400'>
                    Keep track of medications, therapy sessions, and other
                    treatment activities.
                  </p>
                </CardContent>
                <CardFooter>
                  <Button variant='ghost' size='sm' asChild>
                    <Link href='/treatment'>
                      View Treatment <ArrowRight className='ml-2 h-4 w-4' />
                    </Link>
                  </Button>
                </CardFooter>
              </Card>
            </div>
          </div>
        </section>

        <section className='w-full py-12 md:py-24 lg:py-32 quka'>
          <div className='container px-4 md:px-6'>
            <div className='grid gap-6 lg:grid-cols-2 lg:gap-12'>
              <div className='flex flex-col justify-center space-y-4'>
                <div className='space-y-2'>
                  <h2
                    className='text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl'
                    style={{
                      textShadow:
                        '1px 1px 0 white, -1px -1px 0 white, 1px -1px 0 white, -1px 1px 0 white',
                    }}>
                    Quick Access Resources
                  </h2>
                  <p className='max-w-[600px] text-white md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed '>
                    Helpful resources for when you need immediate support or
                    information
                  </p>
                </div>
              </div>
              <div className='grid gap-4 md:grid-cols-2'>
                <QuickResourceCard
                  title='Crisis Hotlines'
                  description='Immediate support when you need it most'
                  icon={<Clock className='h-8 w-8' />}
                  href='/crisis'
                />
                <QuickResourceCard
                  title='Self-Help Tools'
                  description='Techniques to manage symptoms'
                  icon={<Heart className='h-8 w-8' />}
                  href='/selfhelp'
                />
                <QuickResourceCard
                  title='Find Therapists'
                  description='Connect with mental health professionals'
                  icon={<Calendar className='h-8 w-8' />}
                  href='/resources/therapists'
                />
                <QuickResourceCard
                  title='Community Support'
                  description='Connect with others who understand'
                  icon={<BarChart3 className='h-8 w-8' />}
                  href='/resources/community'
                />
              </div>
            </div>
          </div>
        </section>
      </main>
      <footer className='w-full flex flex-col pt-7'>
        <div className='flex flex-row items-start justify-center gap-10'>
          <div className='flex flex-col w-[400px] mr-10'>
            <div className='flex items-center space-x-2 text-2xl font-bold mb-3'>
              <Heart color='green' className='h-6 w-6 text-primary' />
              <span>MindTrack</span>
            </div>
            <p
              className='text-gray-700 dark:text-white'
              style={{ fontWeight: '600' }}>
              Support our team and explore MindTrack’s features.
            </p>
            <p className='text-gray-500 dark:text-gray-400'>
              Watch our demo for tips and guides.
            </p>
            <Button
              variant='outline'
              className='mt-2 text-xl w-[150px] h-[50px]'>
              Watch Demo
            </Button>
          </div>
          <div className='flex flex-col gap-2 text-gray-700 dark:text-white mr-5'>
            <div className='font-bold text-black dark:text-white'>Features</div>
            <Link href='/AI'>Dr.AI</Link>
            <Link href='/dashboard'>Dashboard</Link>
            <Link href='/journal'>Journal</Link>
            <Link href='/resources'>Resources</Link>
          </div>
          <div className='flex flex-col gap-1 text-gray-700 dark:text-white'>
            <div className='font-bold text-black dark:text-white'>Team</div>
            <div>Biprodeep Bose</div>
            <div className='mb-2 font-light'>Email: bipbose123@gmail.com</div>
            <div>Bismay Dey</div>
            <div className='font-light'>Email: bipbose123@gmail.com</div>
          </div>
        </div>
        <div
          className='text-sm text-gray-500 dark:text-gray-400 bg-gray-100 mt-5
        h-[50px] flex justify-center items-center'>
          © 2025 MindTrack. All rights reserved.
        </div>
      </footer>
    </div>
  );
}
