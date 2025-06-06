import { useAuth0 } from "@auth0/auth0-react";
import Link from "next/link";

export function FeatureCard({
  icon: Icon,
  title,
  description,
  route,
}: {
  icon: any;
  title: string;
  description: string;
  route: string;
}) {
  const {isAuthenticated} = useAuth0();

  return (
    <Link href={route}>
      <div className={`p-6 bg-card rounded-lg border shadow-sm hover:scale-105 ease-in-out duration-300 cursor-pointer ${!isAuthenticated ? "pointer-events-none relative opacity-30 blur-md" : ""}`}>
        <Icon className="h-12 w-12 text-primary mb-4" />
        <h3 className="text-xl font-semibold mb-2">{title}</h3>
        <p className="text-muted-foreground">{description}</p>
      </div>
    </Link>
  );
}
