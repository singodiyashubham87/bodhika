import { Navbar } from "@/components/navbar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import {
  Code2,
  Database,
  Globe,
  LineChart,
  Server,
  Smartphone,
} from "lucide-react";

import { LucideIcon } from "lucide-react";

type Roadmap = {
  title: string;
  description: string;
  icon: LucideIcon;
  progress: number;
  paths: string[];
  color: string;
};

const roadmaps: { [key: string]: Roadmap } = {
  "web-development": {
    title: "Web Development",
    description: "Frontend, Backend, and Full Stack Development",
    icon: Globe,
    progress: 0,
    paths: ["HTML/CSS", "JavaScript", "React", "Node.js", "Databases"],
    color: "text-blue-500",
  },
  "data-structures-and-algorithms": {
    title: "Data Structures & Algorithms",
    description: "Master programming and problem solving",
    icon: Code2,
    progress: 0,
    paths: ["Arrays", "Linked Lists", "Trees", "Graphs", "Dynamic Programming"],
    color: "text-green-500",
  },
  "machine-learning": {
    title: "Machine Learning",
    description: "AI, Deep Learning, and Data Science",
    icon: LineChart,
    progress: 0,
    paths: [
      "Python",
      "Statistics",
      "Neural Networks",
      "Computer Vision",
      "NLP",
    ],
    color: "text-purple-500",
  },
  "mobile-development": {
    title: "Mobile Development",
    description: "iOS, Android, and Cross-platform development",
    icon: Smartphone,
    progress: 0,
    paths: ["React Native", "Flutter", "iOS", "Android", "Mobile Design"],
    color: "text-orange-500",
  },
  "backend-development": {
    title: "Backend Development",
    description: "Server-side programming and architecture",
    icon: Server,
    progress: 0,
    paths: ["APIs", "Databases", "Authentication", "Cloud", "DevOps"],
    color: "text-red-500",
  },
  "database-engineering": {
    title: "Database Engineering",
    description: "Database design, optimization, and management",
    icon: Database,
    progress: 0,
    paths: ["SQL", "NoSQL", "Data Modeling", "Performance", "Security"],
    color: "text-yellow-500",
  },
};

export function generateStaticParams() {
  return Object.keys(roadmaps).map((roadmap) => ({
    "roadmap-name": roadmap,
  }));
}

export default function RoadmapPage({
  params,
}: {
  params: { "roadmap-name": string };
}) {
  if (!params) {
    return (
      <div className="text-center mt-10">
        <h1 className="text-2xl font-bold">Roadmap Not Found</h1>
      </div>
    );
  }

  const roadmapData: Roadmap | undefined = roadmaps[params["roadmap-name"]];

  if (!roadmapData) {
    return (
      <div className="text-center mt-10">
        <h1 className="text-2xl font-bold">Roadmap Not Found</h1>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-background">
      <Navbar />
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <Card>
          <CardHeader>
            <div className="flex items-center gap-4">
              <roadmapData.icon className={`h-10 w-10 ${roadmapData.color}`} />
              <div>
                <CardTitle>{roadmapData.title}</CardTitle>
                <p className="text-muted-foreground">
                  {roadmapData.description}
                </p>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <Progress value={roadmapData.progress} className="h-3 mb-4" />
            <h2 className="text-xl font-semibold mb-3">Topics Covered:</h2>
            <ul className="list-disc list-inside text-muted-foreground">
              {roadmapData.paths.map((path: string, index: number) => (
                <li key={index} className="mb-2">
                  {path}
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </div>
    </main>
  );
}
