"use client";

import { Navbar } from "@/components/navbar";
import { useRouter } from 'next/navigation';
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
    {
      title: "Object-Oriented Programming",
      description: "OOP concepts and design patterns",
      topics: ["Classes & Objects", "Inheritance", "Polymorphism"],
      difficulty: "Medium",
      questions: 80,
    },
    {
      title: "Database Management",
      description: "SQL and NoSQL database concepts",
      topics: ["SQL Queries", "Indexing", "Normalization"],
      difficulty: "Medium",
      questions: 70,
    },
    {
      title: "Operating Systems",
      description: "Core OS concepts and principles",
      topics: ["Processes", "Memory Management", "File Systems"],
      difficulty: "Hard",
      questions: 60,
    },
    {
      title: "Network Programming",
      description: "Networking protocols and architecture",
      topics: ["TCP/IP", "HTTP/HTTPS", "WebSockets"],
      difficulty: "Medium",
      questions: 45,
    },
    {
      title: "Security Concepts",
      description: "Application security and best practices",
      topics: ["Authentication", "Encryption", "Web Security"],
      difficulty: "Hard",
      questions: 55,
    },
    {
      title: "Cloud Computing",
      description: "Cloud platforms and services",
      topics: ["AWS", "Azure", "Docker", "Kubernetes"],
      difficulty: "Medium",
      questions: 65,
    },
    {
      title: "Testing & Debugging",
      description: "Software testing methodologies",
      topics: ["Unit Testing", "Integration Testing", "Debugging"],
      difficulty: "Easy",
      questions: 40,
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
    {
      title: "Communication Skills",
      description: "Effective communication scenarios",
      topics: ["Presentation", "Written Communication", "Active Listening"],
      questions: 35,
    },
    {
      title: "Time Management",
      description: "Prioritization and organization",
      topics: ["Deadlines", "Multi-tasking", "Work-Life Balance"],
      questions: 28,
    },
    {
      title: "Adaptability",
      description: "Handling change and challenges",
      topics: ["Learning Agility", "Flexibility", "Growth Mindset"],
      questions: 22,
    },
    {
      title: "Initiative & Motivation",
      description: "Self-driven achievements",
      topics: ["Goal Setting", "Self-improvement", "Proactivity"],
      questions: 26,
    },
    {
      title: "Client Relations",
      description: "Customer service and stakeholder management",
      topics: ["Customer Focus", "Relationship Building", "Negotiation"],
      questions: 24,
    },
    {
      title: "Project Experience",
      description: "Discussing past projects and achievements",
      topics: ["Project Impact", "Challenges Overcome", "Lessons Learned"],
      questions: 32,
    },
    {
      title: "Career Development",
      description: "Professional growth and aspirations",
      topics: ["Career Planning", "Skill Development", "Industry Knowledge"],
      questions: 28,
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
    {
      title: "Technical Skills Section",
      description: "Showcase your technical expertise",
      topics: ["Skills Organization", "Proficiency Levels", "Keywords"],
      downloads: "12K+",
    },
    {
      title: "Project Descriptions",
      description: "How to describe your projects effectively",
      topics: ["Impact Metrics", "Technical Details", "Role Clarity"],
      reads: "18K+",
    },
    {
      title: "Work Experience Format",
      description: "Structure your work experience section",
      topics: ["Bullet Points", "Achievements", "Responsibilities"],
      downloads: "20K+",
    },
    {
      title: "Education Section Guide",
      description: "Highlight your educational background",
      topics: [
        "Degree Information",
        "Relevant Coursework",
        "Academic Achievements",
      ],
      reads: "14K+",
    },
    {
      title: "Cover Letter Templates",
      description: "Matching cover letters for your resume",
      formats: ["Entry Level", "Senior Position", "Career Change"],
      downloads: "8K+",
    },
    {
      title: "Portfolio Integration",
      description: "Link your projects and portfolio",
      topics: ["GitHub Profile", "Personal Website", "Project Showcase"],
      reads: "16K+",
    },
    {
      title: "Resume Optimization",
      description: "Optimize for ATS and human readers",
      topics: ["ATS Keywords", "Formatting", "File Types"],
      downloads: "22K+",
    },
  ],
};

export default function InterviewsPage() {
  const router = useRouter();
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
                        <Button
                            onClick={() => {
                            // Redirect only if the title includes 'dsa' (case-insensitive)
                            if (item.title.toLowerCase().includes('data structures & algorithms')) {
                              router.push('/interviews/dsa-questions');
                            } else {
                              alert('Practice page coming soon for this topic!');
                            }
                           }}
                        >Start Practice</Button>
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
                            <MessageSquare className="h-4 w-4 mr -4 mr-2 text-primary" />
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
                      {"downloads" in item && (
                        <Badge>{item.downloads} Downloads</Badge>
                      )}

                      {"reads" in item && <Badge>{item.reads} Reads</Badge>}
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
