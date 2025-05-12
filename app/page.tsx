import Link from "next/link"
import { ArrowRight } from "lucide-react"

import { Button } from "@/components/ui/button"
import { FeaturedCourses } from "@/components/featured-courses"
import { HeroSection } from "@/components/hero-section"
import { Categories } from "@/components/categories"

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-1">
        <HeroSection />
        <div className="container px-4 md:px-6 py-8">
          <Categories />
          <FeaturedCourses />
          <section className="py-12 md:py-16 lg:py-20">
            <div className="container px-4 md:px-6">
              <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 xl:grid-cols-3">
                <div className="flex flex-col justify-center space-y-4">
                  <div className="space-y-2">
                    <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Why Choose Us?</h2>
                    <p className="text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
                      Our platform offers a unique learning experience with expert instructors and interactive content.
                    </p>
                  </div>
                  <div className="flex flex-col gap-2 min-[400px]:flex-row">
                    <Link href="/courses">
                      <Button className="inline-flex h-10 items-center justify-center rounded-md bg-primary px-8 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50">
                        Browse Courses
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    </Link>
                  </div>
                </div>
                <div className="flex flex-col justify-center space-y-4">
                  <div className="flex h-20 w-20 items-center justify-center rounded-full bg-primary/10 text-primary">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="h-10 w-10"
                    >
                      <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z"></path>
                      <path d="m9 12 2 2 4-4"></path>
                    </svg>
                  </div>
                  <div className="space-y-2">
                    <h3 className="text-xl font-bold">Interactive Quizzes</h3>
                    <p className="text-gray-500 dark:text-gray-400">
                      Test your knowledge with our interactive quizzes and get instant feedback on your progress.
                    </p>
                  </div>
                </div>
                <div className="flex flex-col justify-center space-y-4">
                  <div className="flex h-20 w-20 items-center justify-center rounded-full bg-primary/10 text-primary">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="h-10 w-10"
                    >
                      <path d="M2 3h20"></path>
                      <path d="M21 3v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V3"></path>
                      <path d="m7 21 5-5 5 5"></path>
                    </svg>
                  </div>
                  <div className="space-y-2">
                    <h3 className="text-xl font-bold">Video Lessons</h3>
                    <p className="text-gray-500 dark:text-gray-400">
                      Learn from high-quality video lessons integrated with YouTube for seamless streaming.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      </main>
    </div>
  )
}
