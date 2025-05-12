import Link from "next/link"
import { notFound } from "next/navigation"
import { ArrowLeft, ArrowRight, CheckCircle } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { VideoPlayer } from "@/components/video-player"
import { Quiz } from "@/components/quiz"
import { courses } from "@/lib/data"

export default function LessonPage({
  params,
}: {
  params: {
    id: string
    moduleId: string
    lessonId: string
  }
}) {
  const courseId = params.id
  const moduleId = Number.parseInt(params.moduleId)
  const lessonId = Number.parseInt(params.lessonId)

  const course = courses.find((course) => course.id === courseId)

  if (!course || !course.modules[moduleId] || !course.modules[moduleId].lessons[lessonId]) {
    return notFound()
  }

  const module = course.modules[moduleId]
  const lesson = module.lessons[lessonId]
  const totalLessons = course.modules.reduce((acc, module) => acc + module.lessons.length, 0)
  const completedLessons = Math.round(totalLessons * (course.progress / 100))

  // Calculate next and previous lessons
  const nextLesson = {
    moduleId,
    lessonId: lessonId + 1,
    exists: lessonId + 1 < module.lessons.length,
  }

  if (!nextLesson.exists) {
    nextLesson.moduleId = moduleId + 1
    nextLesson.lessonId = 0
    nextLesson.exists = moduleId + 1 < course.modules.length
  }

  const prevLesson = {
    moduleId,
    lessonId: lessonId - 1,
    exists: lessonId - 1 >= 0,
  }

  if (!prevLesson.exists) {
    prevLesson.moduleId = moduleId - 1
    prevLesson.lessonId = moduleId - 1 >= 0 ? course.modules[moduleId - 1].lessons.length - 1 : -1
    prevLesson.exists = moduleId - 1 >= 0
  }

  return (
    <div className="container px-4 md:px-6 py-8">
      <div className="flex flex-col space-y-6">
        <div className="flex items-center justify-between">
          <Link href={`/courses/${courseId}`}>
            <Button variant="ghost" size="sm">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Course
            </Button>
          </Link>
          <div className="flex items-center space-x-2">
            <span className="text-sm text-gray-500 dark:text-gray-400">
              {completedLessons}/{totalLessons} lessons completed
            </span>
            <Progress value={course.progress} className="w-24 h-2" />
          </div>
        </div>
        <div className="grid gap-6 md:grid-cols-[3fr_1fr]">
          <div className="space-y-6">
            <div className="space-y-2">
              <h1 className="text-2xl font-bold tracking-tighter">{lesson.title}</h1>
              <p className="text-gray-500 dark:text-gray-400">Module: {module.title}</p>
            </div>
            {lesson.type === "video" ? (
              <div className="space-y-4">
                <VideoPlayer videoId={lesson.videoId} />
                <div className="prose dark:prose-invert max-w-none">
                  <h3>Lesson Notes</h3>
                  <p>{lesson.content}</p>
                </div>
              </div>
            ) : lesson.type === "quiz" ? (
              <Quiz questions={lesson.questions} />
            ) : (
              <div className="prose dark:prose-invert max-w-none">
                <p>{lesson.content}</p>
              </div>
            )}
          </div>
          <div className="space-y-6">
            <div className="rounded-lg border bg-card text-card-foreground shadow-sm">
              <div className="p-6 space-y-4">
                <div className="space-y-2">
                  <h3 className="text-xl font-bold">Module Progress</h3>
                  <div className="space-y-4">
                    {module.lessons.map((moduleLesson, index) => (
                      <Link
                        key={index}
                        href={`/courses/${courseId}/lessons/${moduleId}/${index}`}
                        className={`flex items-center justify-between p-3 rounded-lg border ${
                          index === Number.parseInt(lessonId)
                            ? "bg-primary/10 border-primary"
                            : "bg-card hover:bg-accent hover:text-accent-foreground"
                        }`}
                      >
                        <div className="flex items-center space-x-2">
                          <span className="text-sm">
                            {index + 1}. {moduleLesson.title}
                          </span>
                        </div>
                        {index < lessonId || course.progress === 100 ? (
                          <CheckCircle className="h-4 w-4 text-green-500" />
                        ) : null}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="flex items-center justify-between pt-4">
          {prevLesson.exists ? (
            <Link href={`/courses/${courseId}/lessons/${prevLesson.moduleId}/${prevLesson.lessonId}`}>
              <Button variant="outline">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Previous Lesson
              </Button>
            </Link>
          ) : (
            <div></div>
          )}
          {nextLesson.exists ? (
            <Link href={`/courses/${courseId}/lessons/${nextLesson.moduleId}/${nextLesson.lessonId}`}>
              <Button>
                Next Lesson
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          ) : (
            <Link href={`/courses/${courseId}`}>
              <Button>
                Complete Course
                <CheckCircle className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          )}
        </div>
      </div>
    </div>
  )
}
