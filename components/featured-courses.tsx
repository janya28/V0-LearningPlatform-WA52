import Link from "next/link"
import { ArrowRight } from "lucide-react"

import { Button } from "@/components/ui/button"
import { CourseCard } from "@/components/course-card"
import { courses } from "@/lib/data"

export function FeaturedCourses() {
  // Get the first 3 courses as featured
  const featuredCourses = courses.slice(0, 3)

  return (
    <section className="py-12">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-start justify-between gap-4 md:flex-row md:items-center">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tighter">Featured Courses</h2>
            <p className="text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
              Explore our most popular courses and start learning today.
            </p>
          </div>
          <Link href="/courses">
            <Button variant="ghost" className="gap-1">
              View All Courses
              <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
        </div>
        <div className="grid gap-6 pt-8 md:grid-cols-2 lg:grid-cols-3">
          {featuredCourses.map((course) => (
            <CourseCard key={course.id} course={course} />
          ))}
        </div>
      </div>
    </section>
  )
}
