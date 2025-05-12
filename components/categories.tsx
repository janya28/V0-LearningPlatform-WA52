import Link from "next/link"
import { Code, Palette, PieChart } from "lucide-react"

export function Categories() {
  const categories = [
    {
      name: "Programming",
      icon: <Code className="h-6 w-6" />,
      description: "Learn to code with popular programming languages",
      href: "/courses?category=programming",
    },
    {
      name: "Design",
      icon: <Palette className="h-6 w-6" />,
      description: "Master design principles and tools",
      href: "/courses?category=design",
    },
    {
      name: "Business",
      icon: <PieChart className="h-6 w-6" />,
      description: "Develop business and entrepreneurship skills",
      href: "/courses?category=business",
    },
  ]

  return (
    <section className="py-12">
      <div className="container px-4 md:px-6">
        <div className="space-y-2">
          <h2 className="text-3xl font-bold tracking-tighter">Browse Categories</h2>
          <p className="text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
            Explore courses by category and find the perfect match for your learning goals.
          </p>
        </div>
        <div className="grid gap-6 pt-8 md:grid-cols-2 lg:grid-cols-3">
          {categories.map((category) => (
            <Link
              key={category.name}
              href={category.href}
              className="group relative overflow-hidden rounded-lg border bg-background p-6 text-foreground shadow-sm transition-colors hover:bg-accent hover:text-accent-foreground"
            >
              <div className="flex items-center gap-4">
                <div className="rounded-full bg-primary/10 p-3 text-primary">{category.icon}</div>
                <div>
                  <h3 className="font-semibold">{category.name}</h3>
                  <p className="text-sm text-muted-foreground">{category.description}</p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
