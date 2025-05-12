import { CourseCard } from "@/components/course-card"
import { CourseFilters } from "@/components/course-filters"
import { courses } from "@/lib/data"

export default function CoursesPage() {
  return (
    <div className="container px-4 md:px-6 py-8">
      <div className="flex flex-col space-y-4 md:space-y-8">
        <div className="space-y-2">
          <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Courses</h1>
          <p className="text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
            Browse our collection of courses and start learning today.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-[250px_1fr] gap-6">
          <CourseFilters />
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {courses.map((course) => (
              <CourseCard key={course.id} course={course} />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
