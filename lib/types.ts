export interface Course {
  id: string
  title: string
  description: string
  longDescription?: string
  thumbnail?: string
  price: number
  rating: number
  reviewCount: number
  enrolledCount: number
  duration: string
  level: string
  featured?: boolean
  progress?: number
  currentModule?: number
  currentLesson?: number
  modules: Module[]
  learningOutcomes: string[]
}

export interface Module {
  id: number
  title: string
  lessons: Lesson[]
}

export interface Lesson {
  title: string
  type: "video" | "text" | "quiz"
  duration: string
  content?: string
  videoId?: string
  questions?: QuizQuestion[]
}

export interface QuizQuestion {
  question: string
  options: string[]
  correctAnswer: string
}
