"use client"

import { Navbar } from "@/components/navbar"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { BookOpen, Code, Youtube, Globe, Star } from "lucide-react"
import Link from "next/link"

const resources = {
  websites: [
    {
      title: "freeCodeCamp",
      description: "Learn to code with free interactive tutorials",
      url: "https://www.freecodecamp.org",
      tags: ["Programming", "Web Development", "Free"],
      rating: 4.8
    },
    {
      title: "LeetCode",
      description: "Practice coding problems and prepare for interviews",
      url: "https://leetcode.com",
      tags: ["DSA", "Interview Prep", "Coding"],
      rating: 4.9
    },
    {
      title: "MDN Web Docs",
      description: "Comprehensive web development documentation",
      url: "https://developer.mozilla.org",
      tags: ["Web Development", "Documentation", "Reference"],
      rating: 4.9
    },
    {
      title: "Codecademy",
      description: "Interactive coding lessons in various programming languages",
      url: "https://www.codecademy.com",
      tags: ["Programming", "Interactive", "Multiple Languages"],
      rating: 4.7
    },
    {
      title: "GitHub",
      description: "Version control and collaboration platform for developers",
      url: "https://github.com",
      tags: ["Git", "Open Source", "Collaboration"],
      rating: 4.9
    },
    {
      title: "Stack Overflow",
      description: "Q&A community for programmers",
      url: "https://stackoverflow.com",
      tags: ["Programming", "Community", "Problem Solving"],
      rating: 4.8
    },
    {
      title: "Dev.to",
      description: "Community of software developers sharing knowledge",
      url: "https://dev.to",
      tags: ["Blog", "Community", "Programming"],
      rating: 4.7
    },
    {
      title: "CSS-Tricks",
      description: "Tips, tricks, and techniques for web developers",
      url: "https://css-tricks.com",
      tags: ["CSS", "Web Development", "Frontend"],
      rating: 4.8
    },
    {
      title: "Kaggle",
      description: "Platform for data science and machine learning",
      url: "https://www.kaggle.com",
      tags: ["Data Science", "Machine Learning", "Competitions"],
      rating: 4.8
    },
    {
      title: "HackerRank",
      description: "Coding challenges and competitions",
      url: "https://www.hackerrank.com",
      tags: ["Programming", "Practice", "Interviews"],
      rating: 4.7
    }
  ],
  youtube: [
    {
      title: "Traversy Media",
      description: "Web development tutorials and crash courses",
      url: "https://www.youtube.com/@TraversyMedia",
      tags: ["Web Development", "Tutorials", "Programming"],
      rating: 4.8
    },
    {
      title: "freeCodeCamp",
      description: "In-depth programming courses and tutorials",
      url: "https://www.youtube.com/@freecodecamp",
      tags: ["Programming", "Courses", "Free"],
      rating: 4.9
    },
    {
      title: "Tech With Tim",
      description: "Python programming and machine learning tutorials",
      url: "https://www.youtube.com/@TechWithTim",
      tags: ["Python", "Machine Learning", "Tutorials"],
      rating: 4.7
    },
    {
      title: "Fireship",
      description: "Quick, practical web development tutorials",
      url: "https://www.youtube.com/@Fireship",
      tags: ["Web Development", "Quick Tips", "Modern Tech"],
      rating: 4.9
    },
    {
      title: "The Net Ninja",
      description: "Full stack web development tutorials",
      url: "https://www.youtube.com/@NetNinja",
      tags: ["Web Development", "Full Stack", "Tutorials"],
      rating: 4.8
    },
    {
      title: "Academind",
      description: "In-depth programming courses and tutorials",
      url: "https://www.youtube.com/@academind",
      tags: ["Programming", "Web Development", "Courses"],
      rating: 4.8
    },
    {
      title: "Coding Train",
      description: "Creative coding tutorials and challenges",
      url: "https://www.youtube.com/@TheCodingTrain",
      tags: ["Creative Coding", "JavaScript", "P5.js"],
      rating: 4.9
    },
    {
      title: "Programming with Mosh",
      description: "Professional programming tutorials",
      url: "https://www.youtube.com/@programmingwithmosh",
      tags: ["Programming", "Software Development", "Tutorials"],
      rating: 4.8
    },
    {
      title: "Sentdex",
      description: "Python programming and machine learning",
      url: "https://www.youtube.com/@sentdex",
      tags: ["Python", "Machine Learning", "Data Science"],
      rating: 4.7
    },
    {
      title: "Web Dev Simplified",
      description: "Web development concepts explained simply",
      url: "https://www.youtube.com/@WebDevSimplified",
      tags: ["Web Development", "JavaScript", "Tutorials"],
      rating: 4.8
    }
  ],
  books: [
    {
      title: "Clean Code",
      description: "A Handbook of Agile Software Craftsmanship",
      author: "Robert C. Martin",
      tags: ["Programming", "Best Practices", "Software Development"],
      rating: 4.7
    },
    {
      title: "Cracking the Coding Interview",
      description: "189 Programming Questions & Solutions",
      author: "Gayle Laakmann McDowell",
      tags: ["Interview Prep", "DSA", "Career"],
      rating: 4.8
    },
    {
      title: "You Don't Know JS",
      description: "Deep dive into JavaScript",
      author: "Kyle Simpson",
      tags: ["JavaScript", "Web Development", "Programming"],
      rating: 4.8
    },
    {
      title: "Design Patterns",
      description: "Elements of Reusable Object-Oriented Software",
      author: "Gang of Four",
      tags: ["Design Patterns", "Software Architecture", "OOP"],
      rating: 4.7
    },
    {
      title: "The Pragmatic Programmer",
      description: "Your Journey to Mastery",
      author: "Andrew Hunt, David Thomas",
      tags: ["Programming", "Best Practices", "Career"],
      rating: 4.8
    },
    {
      title: "Introduction to Algorithms",
      description: "Comprehensive guide to algorithms",
      author: "Thomas H. Cormen",
      tags: ["Algorithms", "Computer Science", "DSA"],
      rating: 4.9
    },
    {
      title: "Head First Design Patterns",
      description: "A Brain-Friendly Guide",
      author: "Eric Freeman, Elisabeth Robson",
      tags: ["Design Patterns", "Programming", "OOP"],
      rating: 4.7
    },
    {
      title: "Eloquent JavaScript",
      description: "Modern Introduction to Programming",
      author: "Marijn Haverbeke",
      tags: ["JavaScript", "Programming", "Web Development"],
      rating: 4.8
    },
    {
      title: "Code Complete",
      description: "A Practical Handbook of Software Construction",
      author: "Steve McConnell",
      tags: ["Programming", "Software Development", "Best Practices"],
      rating: 4.8
    },
    {
      title: "Python Crash Course",
      description: "A Hands-On, Project-Based Introduction to Programming",
      author: "Eric Matthes",
      tags: ["Python", "Programming", "Beginners"],
      rating: 4.7
    }
  ]
}

export default function ResourcesPage() {
  return (
    <main className="min-h-screen bg-background">
      <Navbar />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">Learning Resources</h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Curated collection of the best learning resources to help you excel in your journey.
          </p>
        </div>

        <Tabs defaultValue="websites" className="space-y-8">
          <TabsList className="grid w-full grid-cols-3 max-w-[400px] mx-auto">
            <TabsTrigger value="websites">Websites</TabsTrigger>
            <TabsTrigger value="youtube">YouTube</TabsTrigger>
            <TabsTrigger value="books">Books</TabsTrigger>
          </TabsList>

          <TabsContent value="websites" className="space-y-6">
            {resources.websites.map((resource, index) => (
              <ResourceCard
                key={index}
                resource={resource}
                icon={Globe}
                type="website"
              />
            ))}
          </TabsContent>

          <TabsContent value="youtube" className="space-y-6">
            {resources.youtube.map((resource, index) => (
              <ResourceCard
                key={index}
                resource={resource}
                icon={Youtube}
                type="youtube"
              />
            ))}
          </TabsContent>

          <TabsContent value="books" className="space-y-6">
            {resources.books.map((resource, index) => (
              <ResourceCard
                key={index}
                resource={resource}
                icon={BookOpen}
                type="book"
              />
            ))}
          </TabsContent>
        </Tabs>
      </div>
    </main>
  )
}

function ResourceCard({ resource, icon: Icon, type }: any) {
  return (
    <Card className="hover:shadow-lg transition-shadow duration-300">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Icon className="h-6 w-6 text-primary" />
            <div>
              <CardTitle>{resource.title}</CardTitle>
              {type === "book" && (
                <CardDescription>by {resource.author}</CardDescription>
              )}
            </div>
          </div>
          <div className="flex items-center">
            <Star className="h-4 w-4 text-yellow-500 mr-1" />
            <span className="text-sm font-medium">{resource.rating}</span>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-muted-foreground mb-4">{resource.description}</p>
        <div className="flex flex-wrap gap-2">
          {resource.tags.map((tag: string, index: number) => (
            <Badge key={index} variant="secondary">
              {tag}
            </Badge>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}