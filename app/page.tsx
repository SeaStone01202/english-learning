import Link from "next/link"
import { ArrowRight, BookOpen, BarChart3, Settings } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default function Home() {
  const features = [
    {
      icon: BookOpen,
      title: "Practice",
      description: "Generate exercises based on your skill level and topic. Get instant feedback and explanations.",
      href: "/practice",
    },
    {
      icon: BarChart3,
      title: "History",
      description: "View your past practice sessions, track your scores, and monitor your progress over time.",
      href: "/history",
    },
    {
      icon: Settings,
      title: "Settings",
      description: "Manage your preferences, store your API key securely, and customize your learning experience.",
      href: "/settings",
    },
  ]

  return (
    <div className="space-y-16">
      {/* Hero Section */}
      <section className="space-y-6 py-12 md:py-20">
        <div className="space-y-4 text-center">
          <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl">
            Master English Through <span className="text-primary">Interactive Practice</span>
          </h1>
          <p className="mx-auto max-w-2xl text-lg text-muted-foreground md:text-xl">
            Practice grammar, vocabulary, speaking, and listening skills with our intelligent learning platform. Track your progress and improve every day.
          </p>
        </div>
        <div className="flex justify-center gap-4">
          <Button asChild size="lg">
            <Link href="/practice">
              Start Practicing
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
          <Button asChild variant="outline" size="lg">
            <Link href="/history">View History</Link>
          </Button>
        </div>
      </section>

      {/* Features Grid */}
      <section className="space-y-8">
        <div className="space-y-2 text-center">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">
            Everything You Need
          </h2>
          <p className="text-muted-foreground">
            All the tools to succeed in your English learning journey
          </p>
        </div>
        <div className="grid gap-6 md:grid-cols-3">
          {features.map((feature) => {
            const Icon = feature.icon
            return (
              <Link
                key={feature.href}
                href={feature.href}
                className="group"
              >
                <Card className="h-full transition-all duration-300 hover:shadow-lg hover:border-primary/50 group-hover:shadow-lg">
                  <CardHeader>
                    <div className="mb-4 inline-flex rounded-lg bg-primary/10 p-3 text-primary transition-colors group-hover:bg-primary/20">
                      <Icon className="h-6 w-6" />
                    </div>
                    <CardTitle>{feature.title}</CardTitle>
                    <CardDescription>{feature.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="inline-flex items-center text-sm font-medium text-primary opacity-0 transition-opacity group-hover:opacity-100">
                      Explore
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </div>
                  </CardContent>
                </Card>
              </Link>
            )
          })}
        </div>
      </section>

      {/* CTA Section */}
      <section className="space-y-6 rounded-lg border border-primary/20 bg-gradient-to-br from-primary/5 to-primary/10 p-8 text-center md:p-12">
        <div className="space-y-2">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">
            Ready to Start Learning?
          </h2>
          <p className="mx-auto max-w-xl text-muted-foreground">
            Begin your English learning journey today with our interactive exercises and personalized feedback.
          </p>
        </div>
        <Button asChild size="lg">
          <Link href="/practice">
            Start Practice Now
            <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </Button>
      </section>
    </div>
  )
}
