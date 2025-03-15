"use client";
import { useState } from "react";
import {
  Brain,
  SmileIcon as Breath,
  Clock,
  Footprints,
  Heart,
  Lightbulb,
  ListChecks,
  MessageSquare,
  Pencil,
  Smile,
} from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Nav from "@/components/navbar";

export default function SelfHelpTools() {
  const [activeTimer, setActiveTimer] = useState<number | null>(null);
  const [timeRemaining, setTimeRemaining] = useState(0);

  const startTimer = (seconds: number) => {
    // Clear any existing timer
    if (activeTimer !== null) {
      clearInterval(activeTimer);
    }

    // Set initial time
    setTimeRemaining(seconds);

    // Start new timer
    const timerId = window.setInterval(() => {
      setTimeRemaining((prev) => {
        if (prev <= 1) {
          clearInterval(timerId);
          setActiveTimer(null);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    setActiveTimer(timerId);
  };

  return (
    <>
      <Nav />
      <Card className="w-full max-w-4xl mx-auto">
        <CardHeader className="text-center">
          <CardTitle className="text-3xl">Self-Help Techniques</CardTitle>
          <CardDescription>
            Evidence-based tools to manage symptoms and improve wellbeing
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="anxiety" className="w-full">
            <TabsList className="grid grid-cols-3 mb-6">
              <TabsTrigger value="anxiety">Anxiety</TabsTrigger>
              <TabsTrigger value="mood">Mood</TabsTrigger>
              <TabsTrigger value="general">General Wellbeing</TabsTrigger>
            </TabsList>

            <TabsContent value="anxiety" className="space-y-4">
              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="deep-breathing">
                  <AccordionTrigger className="flex items-center gap-2 text-lg font-medium">
                    <Breath className="h-5 w-5" />
                    Deep Breathing
                  </AccordionTrigger>
                  <AccordionContent className="px-4 pt-2">
                    <p className="mb-3">
                      Deep breathing activates your parasympathetic nervous
                      system, which controls your relaxation response.
                    </p>

                    <h4 className="font-medium mb-2">How to practice:</h4>
                    <ol className="list-decimal pl-5 mb-4 space-y-1">
                      <li>Find a comfortable position sitting or lying down</li>
                      <li>
                        Place one hand on your chest and the other on your
                        abdomen
                      </li>
                      <li>
                        Breathe in slowly through your nose for 4 seconds,
                        feeling your abdomen expand
                      </li>
                      <li>Hold for 2 seconds</li>
                      <li>Exhale slowly through your mouth for 6 seconds</li>
                      <li>Repeat for 5-10 minutes</li>
                    </ol>

                    <div className="flex flex-col items-center mt-4">
                      {activeTimer !== null ? (
                        <div className="text-center">
                          <div className="text-3xl font-bold mb-2">
                            {timeRemaining}
                          </div>
                          <Button
                            variant="destructive"
                            onClick={() => {
                              clearInterval(activeTimer);
                              setActiveTimer(null);
                            }}
                          >
                            Stop Timer
                          </Button>
                        </div>
                      ) : (
                        <Button onClick={() => startTimer(300)}>
                          Start 5-Minute Practice
                        </Button>
                      )}
                    </div>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="progressive-relaxation">
                  <AccordionTrigger className="flex items-center gap-2 text-lg font-medium">
                    <Footprints className="h-5 w-5" />
                    Progressive Muscle Relaxation
                  </AccordionTrigger>
                  <AccordionContent className="px-4 pt-2">
                    <p className="mb-3">
                      This technique involves tensing and then releasing
                      different muscle groups to reduce physical tension and
                      anxiety.
                    </p>

                    <h4 className="font-medium mb-2">How to practice:</h4>
                    <ol className="list-decimal pl-5 mb-4 space-y-1">
                      <li>
                        Find a quiet place and sit or lie down comfortably
                      </li>
                      <li>
                        Begin with your feet: tense the muscles for 5 seconds
                      </li>
                      <li>Release and notice the difference for 10 seconds</li>
                      <li>
                        Move up to your calves, then thighs, and continue upward
                      </li>
                      <li>
                        Work through each muscle group: abdomen, chest, hands,
                        arms, shoulders, neck, and face
                      </li>
                      <li>
                        Focus on the sensation of relaxation after each release
                      </li>
                    </ol>

                    <div className="flex flex-col items-center mt-4">
                      {activeTimer !== null ? (
                        <div className="text-center">
                          <div className="text-3xl font-bold mb-2">
                            {timeRemaining}
                          </div>
                          <Button
                            variant="destructive"
                            onClick={() => {
                              clearInterval(activeTimer);
                              setActiveTimer(null);
                            }}
                          >
                            Stop Timer
                          </Button>
                        </div>
                      ) : (
                        <Button onClick={() => startTimer(900)}>
                          Start 15-Minute Practice
                        </Button>
                      )}
                    </div>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="grounding">
                  <AccordionTrigger className="flex items-center gap-2 text-lg font-medium">
                    <Lightbulb className="h-5 w-5" />
                    5-4-3-2-1 Grounding Technique
                  </AccordionTrigger>
                  <AccordionContent className="px-4 pt-2">
                    <p className="mb-3">
                      This sensory awareness exercise helps bring you back to
                      the present moment during anxiety or panic.
                    </p>

                    <h4 className="font-medium mb-2">How to practice:</h4>
                    <ul className="space-y-2 mb-4">
                      <li>
                        <strong>5:</strong> Identify FIVE things you can see
                        around you
                      </li>
                      <li>
                        <strong>4:</strong> Identify FOUR things you can touch
                        or feel
                      </li>
                      <li>
                        <strong>3:</strong> Identify THREE things you can hear
                      </li>
                      <li>
                        <strong>2:</strong> Identify TWO things you can smell
                      </li>
                      <li>
                        <strong>1:</strong> Identify ONE thing you can taste
                      </li>
                    </ul>

                    <p className="italic text-muted-foreground">
                      This technique works by focusing your attention on your
                      senses, which can help interrupt anxious thoughts.
                    </p>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </TabsContent>

            <TabsContent value="mood" className="space-y-4">
              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="behavioral-activation">
                  <AccordionTrigger className="flex items-center gap-2 text-lg font-medium">
                    <ListChecks className="h-5 w-5" />
                    Behavioral Activation
                  </AccordionTrigger>
                  <AccordionContent className="px-4 pt-2">
                    <p className="mb-3">
                      Behavioral activation helps break the cycle of depression
                      by gradually increasing engagement in rewarding
                      activities.
                    </p>

                    <h4 className="font-medium mb-2">How to practice:</h4>
                    <ol className="list-decimal pl-5 mb-4 space-y-1">
                      <li>Make a list of activities you used to enjoy</li>
                      <li>Rate each activity by difficulty (1-10)</li>
                      <li>Start with easier activities (1-3 rating)</li>
                      <li>Schedule these activities into your week</li>
                      <li>Track your mood before and after each activity</li>
                      <li>Gradually incorporate more challenging activities</li>
                    </ol>

                    <div className="bg-muted p-3 rounded-md mt-2">
                      <h5 className="font-medium mb-1">Activity Ideas:</h5>
                      <ul className="grid grid-cols-2 gap-2">
                        <li>• Taking a short walk</li>
                        <li>• Calling a friend</li>
                        <li>• Cooking a simple meal</li>
                        <li>• Listening to music</li>
                        <li>• Reading for 10 minutes</li>
                        <li>• Light stretching</li>
                      </ul>
                    </div>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="thought-challenging">
                  <AccordionTrigger className="flex items-center gap-2 text-lg font-medium">
                    <Brain className="h-5 w-5" />
                    Thought Challenging
                  </AccordionTrigger>
                  <AccordionContent className="px-4 pt-2">
                    <p className="mb-3">
                      This cognitive technique helps identify and reframe
                      negative thought patterns that contribute to low mood.
                    </p>

                    <h4 className="font-medium mb-2">How to practice:</h4>
                    <ol className="list-decimal pl-5 mb-4 space-y-1">
                      <li>Identify a negative thought</li>
                      <li>
                        Identify the cognitive distortion (e.g., all-or-nothing
                        thinking, catastrophizing)
                      </li>
                      <li>Find evidence that contradicts the thought</li>
                      <li>Create a more balanced alternative thought</li>
                    </ol>

                    <div className="bg-muted p-3 rounded-md mt-2">
                      <h5 className="font-medium mb-1">Example:</h5>
                      <p>
                        <strong>Negative thought:</strong> I made a mistake at
                        work, so I am a complete failure.
                      </p>
                      <p>
                        <strong>Distortion:</strong> All-or-nothing thinking
                      </p>
                      <p>
                        <strong>Evidence against:</strong> I have succeeded at
                        many tasks; everyone makes mistakes
                      </p>
                      <p>
                        <strong>Balanced thought:</strong> I made a mistake,
                        which is normal. It doesnot define my overall
                        performance.
                      </p>
                    </div>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="gratitude">
                  <AccordionTrigger className="flex items-center gap-2 text-lg font-medium">
                    <Heart className="h-5 w-5" />
                    Gratitude Practice
                  </AccordionTrigger>
                  <AccordionContent className="px-4 pt-2">
                    <p className="mb-3">
                      Regularly practicing gratitude can shift attention from
                      negative to positive aspects of life, improving mood and
                      outlook.
                    </p>

                    <h4 className="font-medium mb-2">How to practice:</h4>
                    <ol className="list-decimal pl-5 mb-4 space-y-1">
                      <li>
                        Set aside 5 minutes daily, preferably at the same time
                      </li>
                      <li>Write down 3-5 things you are grateful for</li>
                      <li>
                        Include small details (e.g., the warm sunlight through
                        my window)
                      </li>
                      <li>Reflect on why each item matters to you</li>
                      <li>Notice how you feel after the practice</li>
                    </ol>

                    <div className="bg-muted p-3 rounded-md mt-2">
                      <h5 className="font-medium mb-1">
                        Prompts to get started:
                      </h5>
                      <ul className="space-y-1">
                        <li>• What made you smile today?</li>
                        <li>• What is something you are looking forward to?</li>
                        <li>
                          • What is a challenge you have overcome recently?
                        </li>
                        <li>• Who has positively impacted your life lately?</li>
                      </ul>
                    </div>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </TabsContent>

            <TabsContent value="general" className="space-y-4">
              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="mindfulness">
                  <AccordionTrigger className="flex items-center gap-2 text-lg font-medium">
                    <Clock className="h-5 w-5" />
                    Mindfulness Meditation
                  </AccordionTrigger>
                  <AccordionContent className="px-4 pt-2">
                    <p className="mb-3">
                      Mindfulness involves paying attention to the present
                      moment without judgment, reducing stress and improving
                      focus.
                    </p>

                    <h4 className="font-medium mb-2">How to practice:</h4>
                    <ol className="list-decimal pl-5 mb-4 space-y-1">
                      <li>Find a quiet place and sit comfortably</li>
                      <li>Set a timer for 5-10 minutes</li>
                      <li>Focus your attention on your breath</li>
                      <li>
                        When your mind wanders, gently bring attention back to
                        your breath
                      </li>
                      <li>
                        Notice sensations, thoughts, and feelings without
                        judgment
                      </li>
                      <li>Practice regularly, ideally daily</li>
                    </ol>

                    <div className="flex flex-col items-center mt-4">
                      {activeTimer !== null ? (
                        <div className="text-center">
                          <div className="text-3xl font-bold mb-2">
                            {timeRemaining}
                          </div>
                          <Button
                            variant="destructive"
                            onClick={() => {
                              clearInterval(activeTimer);
                              setActiveTimer(null);
                            }}
                          >
                            Stop Timer
                          </Button>
                        </div>
                      ) : (
                        <Button onClick={() => startTimer(600)}>
                          Start 10-Minute Practice
                        </Button>
                      )}
                    </div>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="journaling">
                  <AccordionTrigger className="flex items-center gap-2 text-lg font-medium">
                    <Pencil className="h-5 w-5" />
                    Therapeutic Journaling
                  </AccordionTrigger>
                  <AccordionContent className="px-4 pt-2">
                    <p className="mb-3">
                      Writing about thoughts and feelings can help process
                      emotions, gain insights, and reduce stress.
                    </p>

                    <h4 className="font-medium mb-2">How to practice:</h4>
                    <ol className="list-decimal pl-5 mb-4 space-y-1">
                      <li>Set aside 15-20 minutes in a quiet space</li>
                      <li>
                        Write continuously without worrying about grammar or
                        structure
                      </li>
                      <li>
                        Focus on expressing your honest thoughts and feelings
                      </li>
                      <li>
                        Consider using prompts if you are not sure where to
                        start
                      </li>
                      <li>Reflect on what you have written afterward</li>
                    </ol>

                    <div className="bg-muted p-3 rounded-md mt-2">
                      <h5 className="font-medium mb-1">Journal Prompts:</h5>
                      <ul className="space-y-1">
                        <li>
                          • What is currently causing me stress, and what can I
                          control about it?
                        </li>
                        <li>
                          • When did I last feel truly content, and what
                          contributed to that feeling?
                        </li>
                        <li>
                          • What would I tell a friend facing my current
                          challenges?
                        </li>
                        <li>
                          • What are three things I have learned from recent
                          difficulties?
                        </li>
                      </ul>
                    </div>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="social-connection">
                  <AccordionTrigger className="flex items-center gap-2 text-lg font-medium">
                    <MessageSquare className="h-5 w-5" />
                    Social Connection
                  </AccordionTrigger>
                  <AccordionContent className="px-4 pt-2">
                    <p className="mb-3">
                      Maintaining meaningful social connections is vital for
                      mental health and resilience.
                    </p>

                    <h4 className="font-medium mb-2">How to practice:</h4>
                    <ol className="list-decimal pl-5 mb-4 space-y-1">
                      <li>Identify supportive people in your life</li>
                      <li>Schedule regular check-ins with friends or family</li>
                      <li>Practice active listening during conversations</li>
                      <li>Share your feelings and experiences honestly</li>
                      <li>
                        Join groups or activities aligned with your interests
                      </li>
                    </ol>

                    <div className="bg-muted p-3 rounded-md mt-2">
                      <h5 className="font-medium mb-1">Connection Ideas:</h5>
                      <ul className="grid grid-cols-2 gap-2">
                        <li>• Video call with a friend</li>
                        <li>• Join a community class</li>
                        <li>• Attend a support group</li>
                        <li>• Volunteer locally</li>
                        <li>• Write a letter to someone</li>
                        <li>• Plan a coffee meetup</li>
                      </ul>
                    </div>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="self-compassion">
                  <AccordionTrigger className="flex items-center gap-2 text-lg font-medium">
                    <Smile className="h-5 w-5" />
                    Self-Compassion Practice
                  </AccordionTrigger>
                  <AccordionContent className="px-4 pt-2">
                    <p className="mb-3">
                      Self-compassion involves treating yourself with the same
                      kindness you would offer to a good friend.
                    </p>

                    <h4 className="font-medium mb-2">How to practice:</h4>
                    <ol className="list-decimal pl-5 mb-4 space-y-1">
                      <li>Notice when you are being self-critical</li>
                      <li>
                        Pause and acknowledge your suffering (This is a moment
                        of difficulty)
                      </li>
                      <li>
                        Remember that imperfection is part of shared human
                        experience
                      </li>
                      <li>
                        Ask: What would I say to a friend in this situation?
                      </li>
                      <li>Offer yourself that same kindness</li>
                    </ol>

                    <div className="bg-muted p-3 rounded-md mt-2">
                      <h5 className="font-medium mb-1">
                        Self-Compassion Phrases:
                      </h5>
                      <ul className="space-y-1">
                        <li>
                          • This is difficult right now, and that is okay.
                        </li>
                        <li>• I am doing the best I can with what I have.</li>
                        <li>
                          • Everyone struggles sometimes; I am not alone in
                          this.
                        </li>
                        <li>• May I be kind to myself in this moment.</li>
                      </ul>
                    </div>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </>
  );
}
