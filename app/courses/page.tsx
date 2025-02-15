"use client"

import { Navbar } from "@/components/navbar"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Clock, Star, Users, ExternalLink } from "lucide-react"
import Image from "next/image"

const courses = [
  {
    title: "Complete Web Development Bootcamp",
    description: "Learn full-stack web development from scratch",
    image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800&auto=format&fit=crop&q=60",
    instructor: "Dr. Angela Yu",
    duration: "63 hours",
    students: "850K+",
    rating: 4.8,
    tags: ["Web Development", "Full Stack", "JavaScript"],
    platform: "Udemy",
    price: "$89.99",
    url: "https://www.udemy.com/course/the-complete-web-development-bootcamp"
  },
  {
    title: "Machine Learning Specialization",
    description: "Master machine learning concepts and practical applications",
    image: "https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=800&auto=format&fit=crop&q=60",
    instructor: "Andrew Ng",
    duration: "80 hours",
    students: "1M+",
    rating: 4.9,
    tags: ["Machine Learning", "AI", "Python"],
    platform: "Coursera",
    price: "$49/month",
    url: "https://www.coursera.org/specializations/machine-learning-introduction"
  },
  {
    title: "Data Structures and Algorithms",
    description: "Comprehensive guide to DSA with Java",
    image: "https://images.unsplash.com/photo-1516116216624-53e697fedbea?w=800&auto=format&fit=crop&q=60",
    instructor: "Tim Buchalka",
    duration: "55 hours",
    students: "450K+",
    rating: 4.7,
    tags: ["DSA", "Java", "Programming"],
    platform: "Udemy",
    price: "$79.99",
    url: "https://www.udemy.com/course/data-structures-and-algorithms-deep-dive-using-java"
  },
  {
    title: "React - The Complete Guide",
    description: "Master modern React with Redux and Next.js",
    image: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800&auto=format&fit=crop&q=60",
    instructor: "Maximilian Schwarzmüller",
    duration: "48 hours",
    students: "700K+",
    rating: 4.8,
    tags: ["React", "Web Development", "JavaScript"],
    platform: "Udemy",
    price: "$89.99",
    url: "https://www.udemy.com/course/react-the-complete-guide-incl-redux"
  },
  {
    title: "Python for Data Science",
    description: "Learn Python programming for data analysis",
    image: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=800&auto=format&fit=crop&q=60",
    instructor: "Jose Portilla",
    duration: "42 hours",
    students: "550K+",
    rating: 4.7,
    tags: ["Python", "Data Science", "Analytics"],
    platform: "Udemy",
    price: "$84.99",
    url: "https://www.udemy.com/course/python-for-data-science-and-machine-learning-bootcamp"
  },
  {
    title: "AWS Certified Solutions Architect",
    description: "Prepare for AWS certification with hands-on labs",
    image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&auto=format&fit=crop&q=60",
    instructor: "Stephane Maarek",
    duration: "35 hours",
    students: "400K+",
    rating: 4.8,
    tags: ["AWS", "Cloud", "DevOps"],
    platform: "Udemy",
    price: "$94.99",
    url: "https://www.udemy.com/course/aws-certified-solutions-architect-associate"
  },
  {
    title: "iOS & Swift - The Complete iOS App Development",
    description: "Build iOS apps with Swift and UIKit",
    image: "https://images.unsplash.com/photo-1621839673705-6617adf9e890?w=800&auto=format&fit=crop&q=60",
    instructor: "Angela Yu",
    duration: "55 hours",
    students: "200K+",
    rating: 4.8,
    tags: ["iOS", "Swift", "Mobile Development"],
    platform: "Udemy",
    price: "$89.99",
    url: "https://www.udemy.com/course/ios-13-app-development-bootcamp"
  },
  {
    title: "The Complete JavaScript Course",
    description: "Master JavaScript with modern ES6+ features",
    image: "https://images.unsplash.com/photo-1627398242454-45a1465c2479?w=800&auto=format&fit=crop&q=60",
    instructor: "Jonas Schmedtmann",
    duration: "69 hours",
    students: "600K+",
    rating: 4.8,
    tags: ["JavaScript", "Web Development", "ES6"],
    platform: "Udemy",
    price: "$89.99",
    url: "https://www.udemy.com/course/the-complete-javascript-course"
  },
  {
    title: "Flutter & Dart - The Complete Guide",
    description: "Build native mobile apps for Android and iOS",
    image: "https://images.unsplash.com/photo-1551650975-87deedd944c3?w=800&auto=format&fit=crop&q=60",
    instructor: "Maximilian Schwarzmüller",
    duration: "45 hours",
    students: "150K+",
    rating: 4.7,
    tags: ["Flutter", "Dart", "Mobile Development"],
    platform: "Udemy",
    price: "$84.99",
    url: "https://www.udemy.com/course/learn-flutter-dart-to-build-ios-android-apps"
  },
  {
    title: "Deep Learning Specialization",
    description: "Master deep learning and neural networks",
    image: "https://images.unsplash.com/photo-1509228627152-72ae9ae6848d?w=800&auto=format&fit=crop&q=60",
    instructor: "Andrew Ng",
    duration: "100 hours",
    students: "800K+",
    rating: 4.9,
    tags: ["Deep Learning", "AI", "Neural Networks"],
    platform: "Coursera",
    price: "$49/month",
    url: "https://www.coursera.org/specializations/deep-learning"
  }
]


export default function CoursesPage() {
  return (
    <main className="min-h-screen bg-background">
      <Navbar />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">Online Courses</h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Hand-picked courses from top instructors to help you master new skills.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {courses.map((course, index) => (
            <Card key={index} className="hover:shadow-lg transition-shadow duration-300">
              <div className="relative h-48 w-full">
                <Image src={course.image} alt={course.title} fill className="object-cover rounded-t-lg" />
              </div>
              <CardHeader>
                <Badge>{course.platform}</Badge>
                <CardTitle className="line-clamp-2">{course.title}</CardTitle>
                <CardDescription>{course.instructor}</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4 line-clamp-2">{course.description}</p>
                <div className="flex items-center justify-between">
                  <span className="font-bold text-lg">{course.price}</span>
                  <a href={course.url} target="_blank" rel="noopener noreferrer">
                    <Button>
                      View Course <ExternalLink className="ml-2 h-4 w-4" />
                    </Button>
                  </a>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </main>
  )
}
