import Link from "next/link"
import { ArrowRight, BarChart, BookOpen, CheckCircle, Clock } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { courses, enrolledCourses } from "@/lib/data"

export default function DashboardPage() {
  return (
    <div className="container px-4 md:px-6 py-8">
      <div className="flex flex-col space-y-6">
        <div className="space-y-2">
          <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Dashboard</h1>
          <p className="text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
            Track your progress and continue learning.
          </p>
        </div>
        <div className="grid gap-6 md:grid-cols-3">
          <div className="rounded-lg border bg-card text-card-foreground shadow-sm p-6">
            <div className="flex flex-col space-y-2">
              <div className="flex items-center space-x-2">
                <BookOpen className="h-5 w-5 text-primary" />
                <h3 className="font-semibold">Enrolled Courses</h3>
              </div>
              <p className="text-3xl font-bold">{enrolledCourses.length}</p>
            </div>
          </div>
          <div className="rounded-lg border bg-card text-card-foreground shadow-sm p-6">
            <div className="flex flex-col space-y-2">
              <div className="flex items-center space-x-2">
                <CheckCircle className="h-5 w-5 text-primary" />
                <h3 className="font-semibold">Completed Courses</h3>
              </div>
              <p className="text-3xl font-bold">
                {
                  enrolledCourses.filter((id) => {
                    const course = courses.find((c) => c.id === id)
                    return course && course.progress === 100
                  }).length
                }
              </p>
            </div>
          </div>
          <div className="rounded-lg border bg-card text-card-foreground shadow-sm p-6">
            <div className="flex flex-col space-y-2">
              <div className="flex items-center space-x-2">
                <Clock className="h-5 w-5 text-primary" />
                <h3 className="font-semibold">Learning Hours</h3>
              </div>
              <p className="text-3xl font-bold">24.5</p>
            </div>
          </div>
        </div>
        <Tabs defaultValue="in-progress">
          <TabsList>
            <TabsTrigger value="in-progress">In Progress</TabsTrigger>
            <TabsTrigger value="completed">Completed</TabsTrigger>
          </TabsList>
          <TabsContent value="in-progress" className="space-y-4">
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {courses
                .filter((course) => enrolledCourses.includes(course.id) && course.progress < 100)
                .map((course) => (
                  <div key={course.id} className="rounded-lg border bg-card text-card-foreground shadow-sm">
                    <div className="p-6 space-y-4">
                      <div className="space-y-2">
                        <h3 className="font-bold text-xl">{course.title}</h3>
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-gray-500 dark:text-gray-400">{course.progress}% Complete</span>
                        </div>
                        <Progress value={course.progress} className="h-2" />
                      </div>
                      <div className="space-y-2">
                        <h4 className="font-medium">Continue Learning</h4>
                        <Link
                          href={`/courses/${course.id}/lessons/${course.currentModule}/${course.currentLesson}`}
                          className="flex items-center justify-between p-3 rounded-lg border bg-card text-card-foreground shadow-sm hover:bg-accent hover:text-accent-foreground"
                        >
                          <div className="flex items-center space-x-2">
                            <span className="text-sm">
                              {course.modules[course.currentModule].lessons[course.currentLesson].title}
                            </span>
                          </div>
                        </Link>
                      </div>
                      <Link href={`/courses/${course.id}`}>
                        <Button className="w-full">
                          Continue
                          <ArrowRight className="ml-2 h-4 w-4" />
                        </Button>
                      </Link>
                    </div>
                  </div>
                ))}
            </div>
          </TabsContent>
          <TabsContent value="completed" className="space-y-4">
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {courses
                .filter((course) => enrolledCourses.includes(course.id) && course.progress === 100)
                .map((course) => (
                  <div key={course.id} className="rounded-lg border bg-card text-card-foreground shadow-sm">
                    <div className="p-6 space-y-4">
                      <div className="space-y-2">
                        <h3 className="font-bold text-xl">{course.title}</h3>
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-gray-500 dark:text-gray-400">Completed</span>
                          <CheckCircle className="h-5 w-5 text-green-500" />
                        </div>
                        <Progress value={100} className="h-2" />
                      </div>
                      <Link href={`/courses/${course.id}`}>
                        <Button variant="outline" className="w-full">
                          Review Course
                        </Button>
                      </Link>
                    </div>
                  </div>
                ))}
            </div>
          </TabsContent>
        </Tabs>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold tracking-tighter">Learning Statistics</h2>
          </div>
          <div className="rounded-lg border bg-card text-card-foreground shadow-sm p-6">
            <div className="h-[300px] flex items-center justify-center">
              <BarChart className="h-16 w-16 text-gray-300" />
              <span className="ml-4 text-gray-500">Learning statistics visualization would go here</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
