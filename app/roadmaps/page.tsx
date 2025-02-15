"use client"

import { Navbar } from "@/components/navbar"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Code2, Database, Globe, LineChart, Lock, Server, Smartphone } from "lucide-react"
import Link from "next/link"

const roadmaps = [
  {
    title: "Web Development",
    description: "Frontend, Backend, and Full Stack Development",
    icon: Globe,
    progress: 0,
    paths: ["HTML/CSS", "JavaScript", "React", "Node.js", "Databases"],
    color: "text-blue-500"
  },
  {
    title: "Data Structures and Algorithms",
    description: "Master programming and problem solving",
    icon: Code2,
    progress: 0,
    paths: ["Arrays", "Linked Lists", "Trees", "Graphs", "Dynamic Programming"],
    color: "text-green-500"
  },
  {
    title: "Machine Learning",
    description: "AI, Deep Learning, and Data Science",
    icon: LineChart,
    progress: 0,
    paths: ["Python", "Statistics", "Neural Networks", "Computer Vision", "NLP"],
    color: "text-purple-500"
  },
  {
    title: "Mobile Development",
    description: "iOS, Android, and Cross-platform development",
    icon: Smartphone,
    progress: 0,
    paths: ["React Native", "Flutter", "iOS", "Android", "Mobile Design"],
    color: "text-orange-500"
  },
  {
    title: "Backend Development",
    description: "Server-side programming and architecture",
    icon: Server,
    progress: 0,
    paths: ["APIs", "Databases", "Authentication", "Cloud", "DevOps"],
    color: "text-red-500"
  },
  {
    title: "Database Engineering",
    description: "Database design, optimization, and management",
    icon: Database,
    progress: 0,
    paths: ["SQL", "NoSQL", "Data Modeling", "Performance", "Security"],
    color: "text-yellow-500"
  }
]

export default function RoadmapsPage() {
  return (
    <main className="min-h-screen bg-background">
      <Navbar />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">Learning Roadmaps</h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Choose your path and follow our structured learning roadmaps to master your desired skills.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {roadmaps.map((roadmap, index) => (
            <Link href={`/roadmaps/${roadmap.title.toLowerCase().replace(/\s+/g, '-')}`} key={index}>
              <Card className="hover:shadow-lg transition-shadow duration-300">
                <CardHeader>
                  <div className="flex items-center justify-between mb-2">
                    <roadmap.icon className={`h-8 w-8 ${roadmap.color}`} />
                    {roadmap.progress < 100 && <Lock className="h-5 w-5 text-muted-foreground" />}
                  </div>
                  <CardTitle>{roadmap.title}</CardTitle>
                  <CardDescription>{roadmap.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <Progress value={roadmap.progress} className="h-2" />
                    <div className="grid grid-cols-2 gap-2">
                      {roadmap.paths.slice(0, 4).map((path, pathIndex) => (
                        <span
                          key={pathIndex}
                          className="text-sm text-muted-foreground bg-muted px-2 py-1 rounded-md"
                        >
                          {path}
                        </span>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </main>
  )
}