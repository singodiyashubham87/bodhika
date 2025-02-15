export function FeatureCard({
    icon: Icon,
    title,
    description
  }: {
    icon: any
    title: string
    description: string
  }) {
    return (
      <div className="p-6 bg-card rounded-lg border shadow-sm">
        <Icon className="h-12 w-12 text-primary mb-4" />
        <h3 className="text-xl font-semibold mb-2">{title}</h3>
        <p className="text-muted-foreground">{description}</p>
      </div>
    )
  }