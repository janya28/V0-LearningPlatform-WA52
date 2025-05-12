import Link from "next/link"
import Image from "next/image"
import { Clock, Star, Users } from "lucide-react"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import type { Course } from "@/lib/types"

interface CourseCardProps {
  course: Course
}

export function CourseCard({ course }: CourseCardProps) {
  return (
    <div className="group relative overflow-hidden rounded-lg border bg-background shadow-sm transition-all hover:shadow-md">
      <Link href={`/courses/${course.id}`} className="absolute inset-0 z-10">
        <span className="sr-only">View Course</span>
      </Link>
      <div className="relative aspect-video overflow-hidden">
        <Image
          src={course.thumbnail || `/placeholder.svg?height=225&width=400`}
          alt={course.title}
          width={400}
          height={225}
          className="object-cover transition-transform group-hover:scale-105"
        />
        {course.featured && <Badge className="absolute left-2 top-2 z-20">Featured</Badge>}
      </div>
      <div className="p-4">
        <div className="space-y-2">
          <h3 className="font-semibold line-clamp-1">{course.title}</h3>
          <p className="text-sm text-muted-foreground line-clamp-2">{course.description}</p>
        </div>
        <div className="mt-4 flex items-center justify-between text-sm">
          <div className="flex items-center gap-1">
            <Star className="h-4 w-4 fill-primary text-primary" />
            <span>{course.rating}</span>
            <span className="text-muted-foreground">({course.reviewCount})</span>
          </div>
          <div className="flex items-center gap-1 text-muted-foreground">
            <Users className="h-4 w-4" />
            <span>{course.enrolledCount} students</span>
          </div>
        </div>
        <div className="mt-4 flex items-center justify-between">
          <div className="flex items-center gap-1 text-sm text-muted-foreground">
            <Clock className="h-4 w-4" />
            <span>{course.duration}</span>
          </div>
          <div className="font-semibold">
            {course.price === 0 ? <span>Free</span> : <span>${course.price.toFixed(2)}</span>}
          </div>
        </div>
        {course.progress !== undefined && course.progress > 0 && (
          <div className="mt-4 space-y-1">
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">{course.progress}% complete</span>
            </div>
            <Progress value={course.progress} className="h-1" />
          </div>
        )}
      </div>
    </div>
  )
}
