"use client";

import { Navbar } from "@/components/navbar";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Brain, Code, MessageSquare, FileText, ArrowRight } from "lucide-react";

const interviewContent = {
  technical: [
    {
      title: "Data Structures & Algorithms",
      description: "Master common DSA problems and patterns",
      topics: ["Arrays & Strings", "Trees & Graphs", "Dynamic Programming"],
      difficulty: "Medium",
      questions: 150,
    },
    {
      title: "System Design",
      description: "Learn to design scalable distributed systems",
      topics: ["Scalability", "Database Design", "Load Balancing"],
      difficulty: "Hard",
      questions: 50,
    },
    {
      title: "Web Development",
      description: "Frontend and backend interview questions",
      topics: ["React", "Node.js", "APIs", "Databases"],
      difficulty: "Medium",
      questions: 100,
    },
  ],
  behavioral: [
    {
      title: "Leadership & Teamwork",
      description: "STAR method responses for behavioral questions",
      topics: [
        "Conflict Resolution",
        "Team Collaboration",
        "Project Management",
      ],
      questions: 30,
    },
    {
      title: "Problem Solving",
      description: "Demonstrate your analytical thinking",
      topics: ["Critical Thinking", "Decision Making", "Innovation"],
      questions: 25,
    },
    {
      title: "Cultural Fit",
      description: "Show alignment with company values",
      topics: ["Company Research", "Values Alignment", "Career Goals"],
      questions: 20,
    },
  ],
  resume: [
    {
      title: "Resume Templates",
      description: "ATS-friendly templates for different roles",
      formats: ["Software Engineer", "Data Scientist", "Product Manager"],
      downloads: "10K+",
    },
    {
      title: "Resume Writing Guide",
      description: "Tips and best practices for crafting your resume",
      topics: ["Structure", "Action Words", "Achievements"],
      reads: "25K+",
    },
    {
      title: "Resume Review Checklist",
      description: "Ensure your resume stands out",
      topics: ["Format", "Content", "Keywords"],
      downloads: "15K+",
    },
  ],
};

export default function InterviewsPage() {
  return (
    <main className="min-h-screen bg-background">
      <Navbar />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">Interview Preparation</h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Comprehensive resources to help you ace your technical and
            behavioral interviews.
          </p>
        </div>

        <Tabs defaultValue="technical" className="space-y-8">
          <TabsList className="grid w-full grid-cols-3 max-w-[400px] mx-auto">
            <TabsTrigger value="technical">Technical</TabsTrigger>
            <TabsTrigger value="behavioral">Behavioral</TabsTrigger>
            <TabsTrigger value="resume">Resume</TabsTrigger>
          </TabsList>

          <TabsContent value="technical">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {interviewContent.technical.map((item, index) => (
                <Card
                  key={index}
                  className="hover:shadow-lg transition-shadow duration-300"
                >
                  <CardHeader>
                    <div className="flex items-center justify-between mb-2">
                      <Code className="h-8 w-8 text-primary" />
                      <Badge>{item.difficulty}</Badge>
                    </div>
                    <CardTitle>{item.title}</CardTitle>
                    <CardDescription>{item.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="space-y-2">
                        {item.topics.map((topic, topicIndex) => (
                          <div
                            key={topicIndex}
                            className="flex items-center text-sm"
                          >
                            <ArrowRight className="h-4 w-4 mr-2 text-primary" />
                            {topic}
                          </div>
                        ))}
                      </div>
                      <div className="flex justify-between items-center pt-4">
                        <span className="text-sm text-muted-foreground">
                          {item.questions} questions
                        </span>
                        <Button>Start Practice</Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="behavioral">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {interviewContent.behavioral.map((item, index) => (
                <Card
                  key={index}
                  className="hover:shadow-lg transition-shadow duration-300"
                >
                  <CardHeader>
                    <div className="flex items-center justify-between mb-2">
                      <Brain className="h-8 w-8 text-primary" />
                      <Badge>{item.questions} Questions</Badge>
                    </div>
                    <CardTitle>{item.title}</CardTitle>
                    <CardDescription>{item.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="space-y-2">
                        {item.topics.map((topic, topicIndex) => (
                          <div
                            key={topicIndex}
                            className="flex items-center text-sm"
                          >
                            <MessageSquare className="h-4 w-4 mr-2 text-primary" />
                            {topic}
                          </div>
                        ))}
                      </div>
                      <Button className="w-full">View Questions</Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="resume">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {interviewContent.resume.map((item, index) => (
                <Card
                  key={index}
                  className="hover:shadow-lg transition-shadow duration-300"
                >
                  <CardHeader>
                    <div className="flex items-center justify-between mb-2">
                      <FileText className="h-8 w-8 text-primary" />
                      {"downloads" in item ? (
                        <Badge>{item.downloads} Downloads</Badge>
                      ) : (
                        <Badge>{item.reads} Reads</Badge>
                      )}
                    </div>
                    <CardTitle>{item.title}</CardTitle>
                    <CardDescription>{item.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="space-y-2">
                        {("formats" in item && item.formats
                          ? item.formats
                          : item.topics || []
                        ).map((topic, topicIndex) => (
                          <div
                            key={topicIndex}
                            className="flex items-center text-sm"
                          >
                            <ArrowRight className="h-4 w-4 mr-2 text-primary" />
                            {topic}
                          </div>
                        ))}
                      </div>
                      <Button className="w-full">
                        {"downloads" in item ? "Download" : "Read More"}
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </main>
  );
}
