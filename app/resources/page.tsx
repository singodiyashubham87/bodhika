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