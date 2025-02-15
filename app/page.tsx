import { Button } from "@/components/ui/button"
import { Navbar } from "@/components/navbar"
import { ArrowRight, BookOpen, Briefcase, GraduationCap, Users } from "lucide-react"
import Link from "next/link"
import { FeatureCard } from "./feature_card"

export default function Home() {
  return (
    <main className="min-h-screen bg-background">
      <Navbar />
      
      {/* Hero Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-4xl sm:text-6xl font-bold tracking-tight">
            Your Path to Career Success Starts Here
          </h1>
          <p className="mt-6 text-xl text-muted-foreground max-w-2xl mx-auto">
            Access curated resources, structured roadmaps, and expert guidance to excel in your professional journey.
          </p>
          <div className="mt-10 flex justify-center gap-4">
            <Button asChild size="lg">
              <Link href="/roadmaps">
                Get Started
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button variant="outline" size="lg" asChild>
              <Link href="/resources">
                Browse Resources
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-muted">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-16">Everything You Need to Succeed</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <FeatureCard
              icon={BookOpen}
              title="Study Roadmaps"
              description="Well-structured learning paths for various tech domains"
            />
            <FeatureCard
              icon={Briefcase}
              title="Job Preparation"
              description="Comprehensive resources for placement preparation"
            />
            <FeatureCard
              icon={GraduationCap}
              title="Online Courses"
              description="Access to top-rated courses across multiple domains"
            />
            <FeatureCard
              icon={Users}
              title="Interview Prep"
              description="Expert guidance on technical and behavioral interviews"
            />
          </div>
        </div>
      </section>
    </main>
  )
}

