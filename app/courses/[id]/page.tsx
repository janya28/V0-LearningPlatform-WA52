import Link from "next/link"
import { notFound } from "next/navigation"
import { ArrowLeft, Clock, FileText, Video } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { courses } from "@/lib/data"

export default function CoursePage({ params }: { params: { id: string } }) {
  const course = courses.find((course) => course.id === params.id)

  if (!course) {
    return notFound()
  }

  return (
    <div className="container px-4 md:px-6 py-8">
      <div className="flex flex-col space-y-6">
        <div className="flex items-center space-x-2">
          <Link href="/courses">
            <Button variant="ghost" size="sm">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Courses
            </Button>
          </Link>
        </div>
        <div className="grid gap-6 md:grid-cols-[2fr_1fr]">
          <div className="space-y-6">
            <div className="space-y-2">
              <h1 className="text-3xl font-bold tracking-tighter">{course.title}</h1>
              <p className="text-gray-500 dark:text-gray-400">{course.description}</p>
            </div>
            <Tabs defaultValue="content">
              <TabsList>
                <TabsTrigger value="content">Course Content</TabsTrigger>
                <TabsTrigger value="overview">Overview</TabsTrigger>
              </TabsList>
              <TabsContent value="content" className="space-y-6">
                <div className="space-y-4">
                  {course.modules.map((module, index) => (
                    <div key={index} className="space-y-2">
                      <h3 className="text-xl font-bold">{module.title}</h3>
                      <div className="grid gap-2">
                        {module.lessons.map((lesson, lessonIndex) => (
                          <Link
                            key={lessonIndex}
                            href={`/courses/${course.id}/lessons/${module.id}/${lessonIndex}`}
                            className="flex items-center justify-between p-3 rounded-lg border bg-card text-card-foreground shadow-sm hover:bg-accent hover:text-accent-foreground"
                          >
                            <div className="flex items-center space-x-2">
                              {lesson.type === "video" ? (
                                <Video className="h-4 w-4" />
                              ) : (
                                <FileText className="h-4 w-4" />
                              )}
                              <span>{lesson.title}</span>
                            </div>
                            <div className="flex items-center space-x-2 text-sm text-gray-500 dark:text-gray-400">
                              <Clock className="h-4 w-4" />
                              <span>{lesson.duration}</span>
                            </div>
                          </Link>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </TabsContent>
              <TabsContent value="overview" className="space-y-4">
                <div className="prose dark:prose-invert max-w-none">
                  <h3>About this course</h3>
                  <p>{course.longDescription}</p>
                  <h3>What you'll learn</h3>
                  <ul>
                    {course.learningOutcomes.map((outcome, index) => (
                      <li key={index}>{outcome}</li>
                    ))}
                  </ul>
                </div>
              </TabsContent>
            </Tabs>
          </div>
          <div className="space-y-6">
            <div className="rounded-lg border bg-card text-card-foreground shadow-sm">
              <div className="p-6 space-y-4">
                <div className="space-y-2">
                  <h3 className="text-xl font-bold">Your Progress</h3>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-500 dark:text-gray-400">{course.progress}% Complete</span>
                    <span className="text-sm text-gray-500 dark:text-gray-400">
                      {Math.round(
                        course.modules.reduce((acc, module) => acc + module.lessons.length, 0) *
                          (course.progress / 100),
                      )}
                      /{course.modules.reduce((acc, module) => acc + module.lessons.length, 0)} lessons
                    </span>
                  </div>
                  <Progress value={course.progress} className="h-2" />
                </div>
                <div className="space-y-2">
                  <h3 className="font-medium">Continue Learning</h3>
                  <Link
                    href={`/courses/${course.id}/lessons/${course.currentModule}/${course.currentLesson}`}
                    className="flex items-center justify-between p-3 rounded-lg border bg-card text-card-foreground shadow-sm hover:bg-accent hover:text-accent-foreground"
                  >
                    <div className="flex items-center space-x-2">
                      <Video className="h-4 w-4" />
                      <span>{course.modules[course.currentModule].lessons[course.currentLesson].title}</span>
                    </div>
                    <div className="flex items-center space-x-2 text-sm text-gray-500 dark:text-gray-400">
                      <Clock className="h-4 w-4" />
                      <span>{course.modules[course.currentModule].lessons[course.currentLesson].duration}</span>
                    </div>
                  </Link>
                </div>
                <Button className="w-full">Continue Learning</Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
