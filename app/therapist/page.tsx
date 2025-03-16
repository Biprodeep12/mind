'use client';

import type React from 'react';

import { useState, useEffect } from 'react';
import {
  Search,
  MapPin,
  Filter,
  Star,
  Calendar,
  User,
  Mail,
  Phone,
  CheckCircle2,
  X,
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
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/silder';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Textarea } from '@/components/ui/Textarea';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

// Mock data for therapists with international representation and diverse specialties
const allTherapists = [
  {
    id: 1,
    name: 'Dr. Sarah Johnson',
    title: 'Psychologist',
    specialties: ['Depression', 'Anxiety', 'Trauma'],
    location: 'New York, NY',
    country: 'United States',
    distance: 0.8,
    accepting: true,
    insurance: ['Blue Cross', 'Aetna', 'Cigna'],
    rating: 4.9,
    languages: ['English'],
    providerType: 'Psychologist',
    image: 'https://randomuser.me/api/portraits/women/44.jpg',
    bio: 'Dr. Johnson is a licensed clinical psychologist with over 15 years of experience treating individuals with depression, anxiety, and trauma-related disorders. She uses evidence-based approaches including Cognitive Behavioral Therapy (CBT) and mindfulness techniques.',
    education: [
      'Ph.D. in Clinical Psychology, Columbia University',
      'B.A. in Psychology, Yale University',
    ],
    approach:
      "I believe in a collaborative, personalized approach to therapy. My practice integrates cognitive-behavioral, mindfulness, and psychodynamic techniques tailored to each client's unique needs.",
    officeHours: 'Monday-Friday: 9am-5pm',
    sessionFee: '$150-200',
    testimonials: [
      'Dr. Johnson helped me overcome my anxiety when nothing else worked. Her approach is compassionate and effective.',
      'Working with Sarah has been transformative. She provides practical tools that have made a real difference in my life.',
    ],
  },
  {
    id: 2,
    name: 'Dr. Michael Chen',
    title: 'Psychiatrist',
    specialties: ['Depression', 'Bipolar Disorder', 'ADHD'],
    location: 'San Francisco, CA',
    country: 'United States',
    distance: 1.2,
    accepting: true,
    insurance: ['Medicare', 'Cigna'],
    rating: 4.7,
    languages: ['English', 'Mandarin'],
    providerType: 'Psychiatrist',
    image: 'https://randomuser.me/api/portraits/men/22.jpg',
    bio: 'Dr. Chen is a board-certified psychiatrist specializing in mood disorders and ADHD. He combines medication management with therapeutic approaches to provide comprehensive care for his patients.',
    education: [
      'M.D., Stanford University School of Medicine',
      'Residency in Psychiatry, UCSF',
    ],
    approach:
      'I take a holistic approach to mental health, considering biological, psychological, and social factors. I believe in using medication judiciously alongside other therapeutic interventions.',
    officeHours: 'Monday-Thursday: 8am-6pm',
    sessionFee: '$200-250',
    testimonials: [
      'Dr. Chen is incredibly knowledgeable and caring. He took the time to find the right medication for me with minimal side effects.',
      "Michael's expertise in ADHD treatment has been life-changing. He listens carefully and adjusts treatment based on my feedback.",
    ],
  },
  {
    id: 3,
    name: 'Jennifer Williams',
    title: 'Licensed Marriage & Family Therapist',
    specialties: ['Depression', 'Relationships', 'Grief'],
    location: 'Chicago, IL',
    country: 'United States',
    distance: 2.5,
    accepting: false,
    insurance: ['Aetna', 'United Healthcare'],
    rating: 4.5,
    languages: ['English', 'Spanish'],
    providerType: 'Therapist',
    image: 'https://randomuser.me/api/portraits/women/33.jpg',
    bio: 'Jennifer Williams is a Licensed Marriage and Family Therapist with extensive experience helping individuals and couples navigate relationship challenges, grief, and depression. She creates a safe, supportive environment for clients to explore their feelings and develop healthier patterns.',
    education: [
      'M.A. in Marriage and Family Therapy, Northwestern University',
      'B.S. in Psychology, University of Illinois',
    ],
    approach:
      'I use an integrative approach drawing from emotionally-focused therapy, narrative therapy, and attachment theory. I believe in the healing power of relationships and work to help clients build stronger connections.',
    officeHours: 'Tuesday-Saturday: 10am-7pm',
    sessionFee: '$130-180',
    testimonials: [
      'Jennifer helped save our marriage. Her insights and guidance gave us the tools to communicate effectively.',
      "After losing my spouse, Jennifer's grief counseling was my lifeline. She helped me find meaning and move forward.",
    ],
  },
  {
    id: 4,
    name: 'Dr. Robert Garcia',
    title: 'Clinical Psychologist',
    specialties: ['Depression', 'Anxiety', 'PTSD'],
    location: 'Miami, FL',
    country: 'United States',
    distance: 3.1,
    accepting: true,
    insurance: ['Blue Cross', 'Cigna', 'Humana'],
    rating: 4.8,
    languages: ['English', 'Spanish'],
    providerType: 'Psychologist',
    image: 'https://randomuser.me/api/portraits/men/42.jpg',
    bio: 'Dr. Garcia specializes in treating trauma, PTSD, anxiety, and depression. With over 20 years of experience, he has helped hundreds of clients recover from traumatic experiences and build resilience.',
    education: [
      'Psy.D. in Clinical Psychology, University of Miami',
      'Specialized training in EMDR and Trauma-Focused CBT',
    ],
    approach:
      'I utilize evidence-based approaches including EMDR, Cognitive Processing Therapy, and mindfulness practices. My trauma-informed approach emphasizes safety, choice, and empowerment.',
    officeHours: 'Monday-Friday: 8am-7pm',
    sessionFee: '$175-225',
    testimonials: [
      "Dr. Garcia helped me process childhood trauma I'd been carrying for decades. His expertise in PTSD treatment is exceptional.",
      'Robert created a safe space for me to work through my anxiety. His techniques have given me tools I use every day.',
    ],
  },
  {
    id: 5,
    name: 'Lisa Thompson',
    title: 'Licensed Clinical Social Worker',
    specialties: ['Depression', 'Family Issues', 'Stress'],
    location: 'Boston, MA',
    country: 'United States',
    distance: 3.8,
    accepting: true,
    insurance: ['Medicare', 'Blue Cross'],
    rating: 4.6,
    languages: ['English'],
    providerType: 'Counselor',
    image: 'https://randomuser.me/api/portraits/women/28.jpg',
    bio: 'Lisa Thompson is a Licensed Clinical Social Worker who specializes in helping clients manage stress, depression, and family conflicts. She has particular expertise in working with parents and families navigating challenging transitions.',
    education: [
      'MSW, Boston University',
      'B.A. in Sociology, Tufts University',
    ],
    approach:
      "I take a strengths-based, solution-focused approach to therapy. I help clients identify their internal resources and develop practical strategies for managing life's challenges.",
    officeHours: 'Monday, Wednesday, Friday: 9am-5pm',
    sessionFee: '$120-160',
    testimonials: [
      'Lisa helped our family through a difficult transition with practical advice and compassionate support.',
      "Working with Lisa gave me the tools to manage my stress and depression. She's practical, kind, and insightful.",
    ],
  },
  {
    id: 6,
    name: 'Dr. James Wilson',
    title: 'Psychiatrist',
    specialties: ['Depression', 'Medication Management', 'Anxiety'],
    location: 'Seattle, WA',
    country: 'United States',
    distance: 4.2,
    accepting: true,
    insurance: ['Cigna', 'Aetna'],
    rating: 4.9,
    languages: ['English'],
    providerType: 'Psychiatrist',
    image: 'https://randomuser.me/api/portraits/men/32.jpg',
  },
  {
    id: 7,
    name: 'Dr. Emma Clarke',
    title: 'Clinical Psychologist',
    specialties: [
      'Depression',
      'Cognitive Behavioral Therapy',
      'Eating Disorders',
    ],
    location: 'London',
    country: 'United Kingdom',
    distance: 5000,
    accepting: true,
    insurance: ['BUPA', 'AXA'],
    rating: 4.8,
    languages: ['English'],
    providerType: 'Psychologist',
    image: 'https://randomuser.me/api/portraits/women/17.jpg',
  },
  {
    id: 8,
    name: 'Dr. Olivia Bennett',
    title: 'Psychiatrist',
    specialties: ['Depression', 'Anxiety', 'Schizophrenia'],
    location: 'Manchester',
    country: 'United Kingdom',
    distance: 5200,
    accepting: true,
    insurance: ['NHS', 'BUPA'],
    rating: 4.7,
    languages: ['English', 'French'],
    providerType: 'Psychiatrist',
    image: 'https://randomuser.me/api/portraits/women/57.jpg',
  },
  {
    id: 9,
    name: 'Dr. Jean-Pierre Dubois',
    title: 'Psychotherapist',
    specialties: ['Depression', 'Existential Therapy', 'Trauma'],
    location: 'Paris',
    country: 'France',
    distance: 5800,
    accepting: true,
    insurance: ['MGEN', 'Harmonie Mutuelle'],
    rating: 4.9,
    languages: ['French', 'English'],
    providerType: 'Therapist',
    image: 'https://randomuser.me/api/portraits/men/52.jpg',
  },
  {
    id: 10,
    name: 'Dr. Sophie Müller',
    title: 'Clinical Psychologist',
    specialties: ['Depression', 'Anxiety', 'Work-Life Balance'],
    location: 'Berlin',
    country: 'Germany',
    distance: 6200,
    accepting: true,
    insurance: ['TK', 'Barmer'],
    rating: 4.6,
    languages: ['German', 'English'],
    providerType: 'Psychologist',
    image: 'https://randomuser.me/api/portraits/women/63.jpg',
  },
  {
    id: 11,
    name: 'Dr. Marco Rossi',
    title: 'Psychiatrist',
    specialties: ['Depression', 'Bipolar Disorder', 'Anxiety'],
    location: 'Rome',
    country: 'Italy',
    distance: 6500,
    accepting: false,
    insurance: ['SSN', 'UniSalute'],
    rating: 4.8,
    languages: ['Italian', 'English'],
    providerType: 'Psychiatrist',
    image: 'https://randomuser.me/api/portraits/men/67.jpg',
  },
  {
    id: 12,
    name: 'Dr. Raj Patel',
    title: 'Clinical Psychologist',
    specialties: ['Depression', 'Cultural Adjustment', 'Family Therapy'],
    location: 'Mumbai',
    country: 'India',
    distance: 8700,
    accepting: true,
    insurance: ['Star Health', 'Apollo Munich'],
    rating: 4.7,
    languages: ['Hindi', 'English', 'Gujarati'],
    providerType: 'Psychologist',
    image: 'https://randomuser.me/api/portraits/men/82.jpg',
  },
  {
    id: 13,
    name: 'Dr. Aisha Khan',
    title: 'Psychiatrist',
    specialties: ['Depression', "Women's Mental Health", 'Anxiety'],
    location: 'Delhi',
    country: 'India',
    distance: 8800,
    accepting: true,
    insurance: ['ICICI Lombard', 'Bajaj Allianz'],
    rating: 4.9,
    languages: ['Hindi', 'English', 'Urdu'],
    providerType: 'Psychiatrist',
    image: 'https://randomuser.me/api/portraits/women/74.jpg',
  },
  {
    id: 14,
    name: 'Dr. Hiroshi Tanaka',
    title: 'Psychotherapist',
    specialties: ['Depression', 'Stress Management', 'Cross-Cultural Issues'],
    location: 'Tokyo',
    country: 'Japan',
    distance: 10500,
    accepting: true,
    insurance: ['JNHI', 'Sompo Japan'],
    rating: 4.8,
    languages: ['Japanese', 'English'],
    providerType: 'Therapist',
    image: 'https://randomuser.me/api/portraits/men/92.jpg',
  },
  {
    id: 15,
    name: 'Dr. Maria Rodriguez',
    title: 'Clinical Psychologist',
    specialties: ['Depression', 'Trauma', 'LGBTQ+ Issues'],
    location: 'Mexico City',
    country: 'Mexico',
    distance: 2300,
    accepting: true,
    insurance: ['AXA', 'MetLife'],
    rating: 4.7,
    languages: ['Spanish', 'English'],
    providerType: 'Psychologist',
    image: 'https://randomuser.me/api/portraits/women/89.jpg',
  },
  {
    id: 16,
    name: 'Dr. Carlos Mendoza',
    title: 'Psychiatrist',
    specialties: ['Depression', 'Addiction', 'Anxiety'],
    location: 'Buenos Aires',
    country: 'Argentina',
    distance: 5600,
    accepting: true,
    insurance: ['OSDE', 'Swiss Medical'],
    rating: 4.6,
    languages: ['Spanish', 'English', 'Portuguese'],
    providerType: 'Psychiatrist',
    image: 'https://randomuser.me/api/portraits/men/72.jpg',
  },
  {
    id: 17,
    name: 'Dr. Emily Wong',
    title: 'Clinical Psychologist',
    specialties: ['Depression', 'Anxiety', 'Relationship Issues'],
    location: 'Sydney',
    country: 'Australia',
    distance: 9800,
    accepting: true,
    insurance: ['Medibank', 'Bupa Australia'],
    rating: 4.9,
    languages: ['English', 'Cantonese'],
    providerType: 'Psychologist',
    image: 'https://randomuser.me/api/portraits/women/39.jpg',
  },
  {
    id: 18,
    name: 'Dr. David Miller',
    title: 'Psychiatrist',
    specialties: ['Depression', 'PTSD', 'Anxiety Disorders'],
    location: 'Toronto',
    country: 'Canada',
    distance: 550,
    accepting: true,
    insurance: ['OHIP', 'Sun Life'],
    rating: 4.8,
    languages: ['English', 'French'],
    providerType: 'Psychiatrist',
    image: 'https://randomuser.me/api/portraits/men/12.jpg',
  },
  {
    id: 19,
    name: 'Dr. Fatima Al-Mansour',
    title: 'Clinical Psychologist',
    specialties: ['Depression', 'Cultural Identity', "Women's Issues"],
    location: 'Dubai',
    country: 'UAE',
    distance: 7300,
    accepting: true,
    insurance: ['Daman', 'AXA Gulf'],
    rating: 4.7,
    languages: ['Arabic', 'English'],
    providerType: 'Psychologist',
    image: 'https://randomuser.me/api/portraits/women/94.jpg',
  },
  {
    id: 20,
    name: 'Dr. Lukas Novak',
    title: 'Psychotherapist',
    specialties: ['Depression', 'Existential Issues', 'Anxiety'],
    location: 'Prague',
    country: 'Czech Republic',
    distance: 6800,
    accepting: true,
    insurance: ['VZP', 'OZP'],
    rating: 4.6,
    languages: ['Czech', 'English', 'German'],
    providerType: 'Therapist',
    image: 'https://randomuser.me/api/portraits/men/29.jpg',
  },
];

// Available appointment time slots
const timeSlots = [
  '9:00 AM',
  '10:00 AM',
  '11:00 AM',
  '12:00 PM',
  '1:00 PM',
  '2:00 PM',
  '3:00 PM',
  '4:00 PM',
  '5:00 PM',
];

// Available appointment types
const appointmentTypes = [
  'Initial Consultation',
  'Therapy Session',
  'Medication Management',
  'Follow-up Session',
];

export default function FindTherapist() {
  const [searchQuery, setSearchQuery] = useState('');
  const [location, setLocation] = useState('');
  const [providerType, setProviderType] = useState('all');
  const [specialty, setSpecialty] = useState('any');
  const [insurance, setInsurance] = useState('any');
  const [maxDistance, setMaxDistance] = useState(10000);
  const [acceptingOnly, setAcceptingOnly] = useState(false);
  const [sortBy, setSortBy] = useState('distance');
  const [filteredTherapists, setFilteredTherapists] = useState(allTherapists);
  const [selectedCountry, setSelectedCountry] = useState('any');
  const [selectedLanguage, setSelectedLanguage] = useState('any');

  // Profile and booking states
  const [selectedTherapist, setSelectedTherapist] = useState<
    (typeof allTherapists)[0] | null
  >(null);
  const [profileOpen, setProfileOpen] = useState(false);
  const [bookingOpen, setBookingOpen] = useState(false);

  // Booking form states
  const [appointmentDate, setAppointmentDate] = useState('');
  const [appointmentTime, setAppointmentTime] = useState('');
  const [appointmentType, setAppointmentType] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [notes, setNotes] = useState('');
  const [bookingStep, setBookingStep] = useState(1);
  const [bookingComplete, setBookingComplete] = useState(false);

  // Get unique countries for filter
  const countries = [...new Set(allTherapists.map((t) => t.country))].sort();

  // Get unique languages for filter
  const languages = [
    ...new Set(allTherapists.flatMap((t) => t.languages)),
  ].sort();

  // Apply filters whenever any filter changes
  useEffect(() => {
    applyFilters();
  }, [
    searchQuery,
    location,
    providerType,
    specialty,
    insurance,
    maxDistance,
    acceptingOnly,
    sortBy,
    selectedCountry,
    selectedLanguage,
  ]);

  const applyFilters = () => {
    let filtered = [...allTherapists];

    // Text search
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (therapist) =>
          therapist.name.toLowerCase().includes(query) ||
          therapist.specialties.some((s) => s.toLowerCase().includes(query)) ||
          therapist.location.toLowerCase().includes(query) ||
          therapist.country.toLowerCase().includes(query),
      );
    }

    // Location filter
    if (location) {
      filtered = filtered.filter(
        (therapist) =>
          therapist.location.toLowerCase().includes(location.toLowerCase()) ||
          therapist.country.toLowerCase().includes(location.toLowerCase()),
      );
    }

    // Provider type filter
    if (providerType !== 'all') {
      filtered = filtered.filter(
        (therapist) => therapist.providerType === providerType,
      );
    }

    // Specialty filter
    if (specialty !== 'any') {
      filtered = filtered.filter((therapist) =>
        therapist.specialties.includes(specialty),
      );
    }

    // Insurance filter
    if (insurance !== 'any') {
      filtered = filtered.filter((therapist) =>
        therapist.insurance.includes(insurance),
      );
    }

    // Distance filter
    filtered = filtered.filter(
      (therapist) => therapist.distance <= maxDistance,
    );

    // Accepting new patients filter
    if (acceptingOnly) {
      filtered = filtered.filter((therapist) => therapist.accepting);
    }

    // Country filter
    if (selectedCountry !== 'any') {
      filtered = filtered.filter(
        (therapist) => therapist.country === selectedCountry,
      );
    }

    // Language filter
    if (selectedLanguage !== 'any') {
      filtered = filtered.filter((therapist) =>
        therapist.languages.includes(selectedLanguage),
      );
    }

    // Sorting
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'distance':
          return a.distance - b.distance;
        case 'rating':
          return b.rating - a.rating;
        case 'name':
          return a.name.localeCompare(b.name);
        default:
          return 0;
      }
    });

    setFilteredTherapists(filtered);
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    applyFilters();
  };

  const formatDistance = (distance: number) => {
    if (distance < 100) {
      return `${distance.toFixed(1)} miles away`;
    } else {
      return `${(distance / 1000).toFixed(1)} thousand miles away`;
    }
  };

  const openProfile = (therapist: (typeof allTherapists)[0]) => {
    setSelectedTherapist(therapist);
    setProfileOpen(true);
  };

  const openBooking = (therapist: (typeof allTherapists)[0]) => {
    setSelectedTherapist(therapist);
    setBookingOpen(true);
    setBookingStep(1);
    setBookingComplete(false);
  };

  const handleBookingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (bookingStep === 1) {
      setBookingStep(2);
    } else {
      // In a real app, this would submit the booking to an API
      setBookingComplete(true);
    }
  };

  const resetBookingForm = () => {
    setAppointmentDate('');
    setAppointmentTime('');
    setAppointmentType('');
    setName('');
    setEmail('');
    setPhone('');
    setNotes('');
    setBookingStep(1);
    setBookingComplete(false);
  };

  return (
    <div className='min-h-screen bg-gradient-to-b from-purple-50 to-blue-50 dark:from-gray-900 dark:to-gray-800 py-8 px-4'>
      <button className='absolute top-6 right-20 text-black'>
        <a href='../'>
          <X size={50} />
        </a>
      </button>
      <div className='container mx-auto px-4 py-8 max-w-6xl'>
        <div className='text-center mb-12'>
          <h1 className='text-4xl font-bold mb-4'>Find a Therapist</h1>
          <p className='text-xl text-muted-foreground max-w-2xl mx-auto'>
            Connect with mental health professionals worldwide. Search for
            therapists, psychologists, and psychiatrists who specialize in
            depression and related conditions.
          </p>
        </div>

        <Card className='mb-12'>
          <CardContent className='pt-6'>
            <form onSubmit={handleSearch} className='space-y-6'>
              <div className='flex flex-col md:flex-row gap-4'>
                <div className='flex-1 relative'>
                  <Search className='absolute left-3 top-3 h-5 w-5 text-muted-foreground' />
                  <Input
                    placeholder='Search by name, specialty, or keyword'
                    className='pl-10'
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
                <div className='flex-1 relative'>
                  <MapPin className='absolute left-3 top-3 h-5 w-5 text-muted-foreground' />
                  <Input
                    placeholder='Location (City, State, or Country)'
                    className='pl-10'
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                  />
                </div>
              </div>

              <div className='flex flex-col md:flex-row gap-4'>
                <div className='flex-1'>
                  <Select value={providerType} onValueChange={setProviderType}>
                    <SelectTrigger>
                      <SelectValue placeholder='Provider Type' />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value='all'>All Providers</SelectItem>
                      <SelectItem value='Psychiatrist'>Psychiatrist</SelectItem>
                      <SelectItem value='Psychologist'>Psychologist</SelectItem>
                      <SelectItem value='Therapist'>Therapist</SelectItem>
                      <SelectItem value='Counselor'>Counselor</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className='flex-1'>
                  <Select value={specialty} onValueChange={setSpecialty}>
                    <SelectTrigger>
                      <SelectValue placeholder='Specialty' />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value='any'>Any Specialty</SelectItem>
                      <SelectItem value='Depression'>Depression</SelectItem>
                      <SelectItem value='Anxiety'>Anxiety</SelectItem>
                      <SelectItem value='Trauma'>Trauma</SelectItem>
                      <SelectItem value='PTSD'>PTSD</SelectItem>
                      <SelectItem value='Bipolar Disorder'>
                        Bipolar Disorder
                      </SelectItem>
                      <SelectItem value='Relationships'>
                        Relationships
                      </SelectItem>
                      <SelectItem value='LGBTQ+ Issues'>
                        LGBTQ+ Issues
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className='flex-1'>
                  <Select value={insurance} onValueChange={setInsurance}>
                    <SelectTrigger>
                      <SelectValue placeholder='Insurance' />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value='any'>Any Insurance</SelectItem>
                      <SelectItem value='Blue Cross'>Blue Cross</SelectItem>
                      <SelectItem value='Aetna'>Aetna</SelectItem>
                      <SelectItem value='Cigna'>Cigna</SelectItem>
                      <SelectItem value='Medicare'>Medicare</SelectItem>
                      <SelectItem value='BUPA'>BUPA</SelectItem>
                      <SelectItem value='AXA'>AXA</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className='flex justify-between items-center'>
                <Sheet>
                  <SheetTrigger asChild>
                    <Button
                      type='button'
                      variant='outline'
                      className='flex items-center gap-2'>
                      <Filter className='h-4 w-4' />
                      More Filters
                    </Button>
                  </SheetTrigger>
                  <SheetContent>
                    <SheetHeader>
                      <SheetTitle>Advanced Filters</SheetTitle>
                      <SheetDescription>
                        Refine your search with additional filters
                      </SheetDescription>
                    </SheetHeader>
                    <div className='py-6 space-y-6'>
                      <div className='space-y-2'>
                        <h3 className='text-sm font-medium'>
                          Maximum Distance
                        </h3>
                        <div className='pt-4'>
                          <Slider
                            defaultValue={[maxDistance]}
                            max={10000}
                            step={100}
                            onValueChange={(value) => setMaxDistance(value[0])}
                          />
                          <div className='flex justify-between mt-2 text-sm text-muted-foreground'>
                            <span>Local</span>
                            <span>
                              {maxDistance < 1000
                                ? `${maxDistance} miles`
                                : `${maxDistance / 1000}k miles`}
                            </span>
                            <span>Worldwide</span>
                          </div>
                        </div>
                      </div>

                      <div className='space-y-2'>
                        <h3 className='text-sm font-medium'>Country</h3>
                        <Select
                          value={selectedCountry}
                          onValueChange={setSelectedCountry}>
                          <SelectTrigger>
                            <SelectValue placeholder='Any Country' />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value='any'>Any Country</SelectItem>
                            {countries.map((country) => (
                              <SelectItem key={country} value={country}>
                                {country}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>

                      <div className='space-y-2'>
                        <h3 className='text-sm font-medium'>Language</h3>
                        <Select
                          value={selectedLanguage}
                          onValueChange={setSelectedLanguage}>
                          <SelectTrigger>
                            <SelectValue placeholder='Any Language' />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value='any'>Any Language</SelectItem>
                            {languages.map((language) => (
                              <SelectItem key={language} value={language}>
                                {language}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>

                      <div className='flex items-center space-x-2'>
                        <Checkbox
                          id='accepting'
                          checked={acceptingOnly}
                          onChange={(e) => setAcceptingOnly(e.target.checked)}
                        />
                        <Label htmlFor='accepting'>
                          Only show providers accepting new patients
                        </Label>
                      </div>
                    </div>
                  </SheetContent>
                </Sheet>
                <Button type='submit'>Search Providers</Button>
              </div>
            </form>
          </CardContent>
        </Card>

        <div className='mb-6 flex justify-between items-center'>
          <h2 className='text-2xl font-semibold'>
            {filteredTherapists.length} providers found
          </h2>
          <Select value={sortBy} onValueChange={setSortBy}>
            <SelectTrigger className='w-[180px]'>
              <SelectValue placeholder='Sort by' />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value='distance'>Distance</SelectItem>
              <SelectItem value='rating'>Rating</SelectItem>
              <SelectItem value='name'>Name</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
          {filteredTherapists.map((therapist) => (
            <Card key={therapist.id} className='overflow-hidden'>
              <CardHeader className='flex flex-row items-start gap-4 pb-2'>
                <img
                  src={therapist.image || '/placeholder.svg'}
                  alt={therapist.name}
                  className='rounded-full w-16 h-16 object-cover border'
                />
                <div>
                  <CardTitle className='text-lg'>{therapist.name}</CardTitle>
                  <CardDescription>{therapist.title}</CardDescription>
                </div>
              </CardHeader>
              <CardContent>
                <div className='flex items-center text-sm text-muted-foreground mb-3'>
                  <MapPin className='h-4 w-4 mr-1' />
                  <span>
                    {therapist.location}, {therapist.country} •{' '}
                    {formatDistance(therapist.distance)}
                  </span>
                </div>
                <div className='flex items-center text-sm text-muted-foreground mb-3'>
                  <Star className='h-4 w-4 mr-1 text-yellow-500' />
                  <span>
                    {therapist.rating} • Languages:{' '}
                    {therapist.languages.join(', ')}
                  </span>
                </div>
                <div className='flex flex-wrap gap-2 mb-3'>
                  {therapist.specialties.map((specialty, index) => (
                    <Badge key={index} variant='secondary'>
                      {specialty}
                    </Badge>
                  ))}
                </div>
                <div className='text-sm'>
                  {therapist.accepting ? (
                    <span className='text-green-600 font-medium'>
                      ✓ Accepting new patients
                    </span>
                  ) : (
                    <span className='text-muted-foreground'>
                      Not accepting new patients
                    </span>
                  )}
                </div>
              </CardContent>
              <CardFooter className='flex justify-between border-t pt-4'>
                <Button
                  variant='outline'
                  onClick={() => openProfile(therapist)}>
                  View Profile
                </Button>
                <Button
                  disabled={!therapist.accepting}
                  onClick={() => therapist.accepting && openBooking(therapist)}>
                  Book Appointment
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>

        {filteredTherapists.length === 0 && (
          <div className='text-center py-12'>
            <h3 className='text-xl font-medium mb-2'>
              No therapists match your search criteria
            </h3>
            <p className='text-muted-foreground'>
              Try adjusting your filters or search terms
            </p>
            <Button
              className='mt-4'
              onClick={() => {
                setSearchQuery('');
                setLocation('');
                setProviderType('all');
                setSpecialty('any');
                setInsurance('any');
                setMaxDistance(10000);
                setAcceptingOnly(false);
                setSelectedCountry('any');
                setSelectedLanguage('any');
                setSortBy('distance');
              }}>
              Reset All Filters
            </Button>
          </div>
        )}
        <Dialog open={profileOpen} onOpenChange={setProfileOpen}>
          <DialogContent className='max-w-3xl max-h-[90vh] overflow-y-auto'>
            {!selectedTherapist ? (
              <p>Loading...</p>
            ) : (
              <>
                <DialogHeader>
                  <DialogTitle className='text-2xl'>
                    {selectedTherapist.name}
                  </DialogTitle>
                  <DialogDescription>
                    {selectedTherapist.title}
                  </DialogDescription>
                </DialogHeader>

                <div className='grid md:grid-cols-3 gap-6 py-4'>
                  {/* Left Section - Therapist Info */}
                  <div className='md:col-span-1'>
                    <div className='flex flex-col items-center'>
                      <img
                        src={selectedTherapist.image || '/placeholder.svg'}
                        alt={selectedTherapist.name}
                        className='rounded-lg w-full max-w-[200px] object-cover mb-4'
                      />
                      <div className='flex items-center mb-2'>
                        <Star className='h-5 w-5 text-yellow-500 mr-1' />
                        <span className='font-medium'>
                          {selectedTherapist.rating}/5.0
                        </span>
                      </div>
                      <div className='text-sm text-muted-foreground mb-4'>
                        <div className='flex items-center mb-1'>
                          <MapPin className='h-4 w-4 mr-1' />
                          <span>
                            {selectedTherapist.location},{' '}
                            {selectedTherapist.country}
                          </span>
                        </div>
                        <div>
                          Languages: {selectedTherapist.languages.join(', ')}
                        </div>
                      </div>

                      <div className='w-full'>
                        <h3 className='font-medium mb-2'>Specialties</h3>
                        <div className='flex flex-wrap gap-2 mb-4'>
                          {selectedTherapist.specialties.map(
                            (specialty, index) => (
                              <Badge key={index} variant='secondary'>
                                {specialty}
                              </Badge>
                            ),
                          )}
                        </div>

                        <h3 className='font-medium mb-2'>Insurance Accepted</h3>
                        <ul className='list-disc list-inside text-sm mb-4'>
                          {selectedTherapist.insurance.map((ins, index) => (
                            <li key={index}>{ins}</li>
                          ))}
                        </ul>

                        <h3 className='font-medium mb-2'>Office Hours</h3>
                        <p className='text-sm mb-4'>
                          {selectedTherapist.officeHours}
                        </p>

                        <h3 className='font-medium mb-2'>Session Fee</h3>
                        <p className='text-sm'>
                          {selectedTherapist.sessionFee}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Right Section - Tabs */}
                  <div className='md:col-span-2'>
                    <Tabs defaultValue='about'>
                      <TabsList className='grid grid-cols-3 mb-4'>
                        <TabsTrigger value='about'>About</TabsTrigger>
                        <TabsTrigger value='education'>
                          Education & Approach
                        </TabsTrigger>
                        <TabsTrigger value='testimonials'>
                          Testimonials
                        </TabsTrigger>
                      </TabsList>

                      <TabsContent value='about' className='space-y-4'>
                        <h3 className='text-lg font-medium'>
                          About {selectedTherapist.name}
                        </h3>
                        <p>{selectedTherapist.bio}</p>
                      </TabsContent>

                      <TabsContent value='education' className='space-y-4'>
                        <div>
                          <h3 className='text-lg font-medium mb-2'>
                            Education & Credentials
                          </h3>
                          <ul className='list-disc list-inside space-y-1'>
                            {selectedTherapist.education?.map((edu, index) => (
                              <li key={index}>{edu}</li>
                            )) || <li>No education details available.</li>}
                          </ul>
                        </div>

                        <div>
                          <h3 className='text-lg font-medium mb-2'>
                            Treatment Approach
                          </h3>
                          <p>{selectedTherapist.approach}</p>
                        </div>
                      </TabsContent>

                      <TabsContent value='testimonials' className='space-y-4'>
                        <h3 className='text-lg font-medium mb-2'>
                          Patient Testimonials
                        </h3>
                        {selectedTherapist.testimonials?.map(
                          (testimonial, index) => (
                            <div
                              key={index}
                              className='bg-muted p-4 rounded-lg mb-3'>
                              <div className='italic'>{testimonial}</div>{' '}
                              {/* Changed `p` to `div` */}
                            </div>
                          ),
                        ) || <div>No testimonials available.</div>}{' '}
                        {/* Changed `p` to `div` */}
                      </TabsContent>
                    </Tabs>

                    {/* Appointment Button */}
                    <div className='mt-6 flex justify-end'>
                      {selectedTherapist.accepting ? (
                        <Button
                          onClick={() => {
                            setProfileOpen(false);
                            openBooking(selectedTherapist);
                          }}>
                          Book Appointment
                        </Button>
                      ) : (
                        <Button disabled>Not Accepting New Patients</Button>
                      )}
                    </div>
                  </div>
                </div>
              </>
            )}
          </DialogContent>
        </Dialog>

        {/* Booking Appointment Dialog */}
        <Dialog
          open={bookingOpen}
          onOpenChange={(open) => {
            setBookingOpen(open);
            if (!open) resetBookingForm();
          }}>
          <DialogContent className='max-w-2xl'>
            {selectedTherapist && !bookingComplete && (
              <>
                <DialogHeader>
                  <DialogTitle>
                    Book Appointment with {selectedTherapist.name}
                  </DialogTitle>
                  <DialogDescription>
                    {bookingStep === 1
                      ? 'Select your preferred date and time'
                      : 'Please provide your contact information'}
                  </DialogDescription>
                </DialogHeader>

                <form onSubmit={handleBookingSubmit}>
                  {bookingStep === 1 ? (
                    <div className='space-y-4 py-4'>
                      <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                        <div className='space-y-2'>
                          <Label htmlFor='date'>Appointment Date</Label>
                          <div className='relative'>
                            <Calendar className='absolute left-3 top-3 h-4 w-4 text-muted-foreground' />
                            <Input
                              id='date'
                              type='date'
                              className='pl-10'
                              value={appointmentDate}
                              onChange={(e) =>
                                setAppointmentDate(e.target.value)
                              }
                              required
                            />
                          </div>
                        </div>

                        <div className='space-y-2'>
                          <Label htmlFor='time'>Appointment Time</Label>
                          <Select
                            value={appointmentTime}
                            onValueChange={setAppointmentTime}
                            required>
                            <SelectTrigger id='time'>
                              <SelectValue placeholder='Select time' />
                            </SelectTrigger>
                            <SelectContent>
                              {timeSlots.map((time) => (
                                <SelectItem key={time} value={time}>
                                  {time}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                      </div>

                      <div className='space-y-2'>
                        <Label htmlFor='type'>Appointment Type</Label>
                        <Select
                          value={appointmentType}
                          onValueChange={setAppointmentType}
                          required>
                          <SelectTrigger id='type'>
                            <SelectValue placeholder='Select appointment type' />
                          </SelectTrigger>
                          <SelectContent>
                            {appointmentTypes.map((type) => (
                              <SelectItem key={type} value={type}>
                                {type}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>

                      <div className='pt-4'>
                        <Button type='submit' className='w-full'>
                          Continue
                        </Button>
                      </div>
                    </div>
                  ) : (
                    <div className='space-y-4 py-4'>
                      <div className='space-y-2'>
                        <Label htmlFor='name'>Your Name</Label>
                        <div className='relative'>
                          <User className='absolute left-3 top-3 h-4 w-4 text-muted-foreground' />
                          <Input
                            id='name'
                            className='pl-10'
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                          />
                        </div>
                      </div>

                      <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                        <div className='space-y-2'>
                          <Label htmlFor='email'>Email</Label>
                          <div className='relative'>
                            <Mail className='absolute left-3 top-3 h-4 w-4 text-muted-foreground' />
                            <Input
                              id='email'
                              type='email'
                              className='pl-10'
                              value={email}
                              onChange={(e) => setEmail(e.target.value)}
                              required
                            />
                          </div>
                        </div>

                        <div className='space-y-2'>
                          <Label htmlFor='phone'>Phone Number</Label>
                          <div className='relative'>
                            <Phone className='absolute left-3 top-3 h-4 w-4 text-muted-foreground' />
                            <Input
                              id='phone'
                              className='pl-10'
                              value={phone}
                              onChange={(e) => setPhone(e.target.value)}
                              required
                            />
                          </div>
                        </div>
                      </div>

                      <div className='space-y-2'>
                        <Label htmlFor='notes'>
                          Additional Notes (Optional)
                        </Label>
                        <Textarea
                          id='notes'
                          placeholder='Please share any information that might be helpful for your provider'
                          value={notes}
                          onChange={(e) => setNotes(e.target.value)}
                        />
                      </div>

                      <div className='bg-muted p-4 rounded-lg space-y-2'>
                        <h3 className='font-medium'>Appointment Summary</h3>
                        <p className='text-sm'>
                          <span className='font-medium'>Provider:</span>{' '}
                          {selectedTherapist.name}
                        </p>
                        <p className='text-sm'>
                          <span className='font-medium'>Date & Time:</span>{' '}
                          {appointmentDate} at {appointmentTime}
                        </p>
                        <p className='text-sm'>
                          <span className='font-medium'>Type:</span>{' '}
                          {appointmentType}
                        </p>
                      </div>

                      <div className='pt-4 flex gap-4'>
                        <Button
                          type='button'
                          variant='outline'
                          className='w-full'
                          onClick={() => setBookingStep(1)}>
                          Back
                        </Button>
                        <Button type='submit' className='w-full'>
                          Confirm Booking
                        </Button>
                      </div>
                    </div>
                  )}
                </form>
              </>
            )}

            {selectedTherapist && bookingComplete && (
              <div className='py-6 text-center space-y-4'>
                <div className='flex justify-center'>
                  <CheckCircle2 className='h-16 w-16 text-green-500' />
                </div>
                <h2 className='text-2xl font-bold'>Appointment Confirmed!</h2>
                <p>
                  Your appointment with {selectedTherapist.name} has been
                  scheduled for {appointmentDate} at {appointmentTime}.
                </p>
                <div className='bg-muted p-4 rounded-lg text-left space-y-2 mt-4'>
                  <h3 className='font-medium'>Appointment Details</h3>
                  <p className='text-sm'>
                    <span className='font-medium'>Provider:</span>{' '}
                    {selectedTherapist.name}
                  </p>
                  <p className='text-sm'>
                    <span className='font-medium'>Date & Time:</span>{' '}
                    {appointmentDate} at {appointmentTime}
                  </p>
                  <p className='text-sm'>
                    <span className='font-medium'>Type:</span> {appointmentType}
                  </p>
                  <p className='text-sm'>
                    <span className='font-medium'>Location:</span>{' '}
                    {selectedTherapist.location}
                  </p>
                </div>
                <p className='text-sm text-muted-foreground mt-4'>
                  A confirmation email has been sent to {email}. You will
                  receive a reminder 24 hours before your appointment.
                </p>
                <Button
                  onClick={() => {
                    setBookingOpen(false);
                    resetBookingForm();
                  }}
                  className='mt-4'>
                  Close
                </Button>
              </div>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}
