"use client"

import { useState } from "react"
import { Check, X } from "lucide-react"

import { Button } from "@/components/ui/button"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import type { QuizQuestion } from "@/lib/types"

interface QuizProps {
  questions: QuizQuestion[]
}

export function Quiz({ questions }: QuizProps) {
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [selectedAnswers, setSelectedAnswers] = useState<string[]>(Array(questions.length).fill(""))
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [score, setScore] = useState(0)

  const handleAnswerSelect = (value: string) => {
    const newAnswers = [...selectedAnswers]
    newAnswers[currentQuestion] = value
    setSelectedAnswers(newAnswers)
  }

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1)
    }
  }

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1)
    }
  }

  const handleSubmit = () => {
    let newScore = 0
    questions.forEach((question, index) => {
      if (selectedAnswers[index] === question.correctAnswer) {
        newScore++
      }
    })
    setScore(newScore)
    setIsSubmitted(true)
  }

  const question = questions[currentQuestion]

  return (
    <div className="space-y-6">
      {!isSubmitted ? (
        <>
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <h3 className="font-semibold">
                Question {currentQuestion + 1} of {questions.length}
              </h3>
              <span className="text-sm text-muted-foreground">
                {selectedAnswers.filter((a) => a !== "").length} of {questions.length} answered
              </span>
            </div>
            <div className="h-2 w-full rounded-full bg-muted">
              <div
                className="h-2 rounded-full bg-primary"
                style={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}
              ></div>
            </div>
          </div>
          <div className="space-y-4">
            <h3 className="text-xl font-medium">{question.question}</h3>
            <RadioGroup value={selectedAnswers[currentQuestion]} onValueChange={handleAnswerSelect}>
              {question.options.map((option, index) => (
                <div key={index} className="flex items-center space-x-2 rounded-lg border p-3 hover:bg-accent">
                  <RadioGroupItem value={option} id={`option-${index}`} />
                  <Label htmlFor={`option-${index}`} className="flex-1 cursor-pointer">
                    {option}
                  </Label>
                </div>
              ))}
            </RadioGroup>
          </div>
          <div className="flex justify-between">
            <Button variant="outline" onClick={handlePrevious} disabled={currentQuestion === 0}>
              Previous
            </Button>
            {currentQuestion < questions.length - 1 ? (
              <Button onClick={handleNext} disabled={!selectedAnswers[currentQuestion]}>
                Next
              </Button>
            ) : (
              <Button onClick={handleSubmit} disabled={selectedAnswers.some((answer) => answer === "")}>
                Submit Quiz
              </Button>
            )}
          </div>
        </>
      ) : (
        <div className="space-y-6">
          <div className="rounded-lg border bg-card p-6 text-card-foreground shadow-sm">
            <div className="space-y-4">
              <h3 className="text-2xl font-bold">Quiz Results</h3>
              <div className="text-center">
                <div className="text-5xl font-bold">
                  {score}/{questions.length}
                </div>
                <p className="text-muted-foreground">
                  {score === questions.length
                    ? "Perfect score! Excellent work!"
                    : score >= questions.length / 2
                      ? "Good job! You passed the quiz."
                      : "Keep studying and try again."}
                </p>
              </div>
            </div>
          </div>
          <div className="space-y-4">
            <h3 className="font-semibold">Review Your Answers</h3>
            {questions.map((question, index) => (
              <div key={index} className="rounded-lg border p-4">
                <div className="flex items-start justify-between">
                  <div>
                    <h4 className="font-medium">
                      {index + 1}. {question.question}
                    </h4>
                    <div className="mt-2 space-y-1">
                      <div className="flex items-center">
                        <div className="mr-2 text-sm font-medium">Your answer:</div>
                        <div className="flex items-center">
                          {selectedAnswers[index] === question.correctAnswer ? (
                            <Check className="mr-1 h-4 w-4 text-green-500" />
                          ) : (
                            <X className="mr-1 h-4 w-4 text-red-500" />
                          )}
                          <span>{selectedAnswers[index]}</span>
                        </div>
                      </div>
                      {selectedAnswers[index] !== question.correctAnswer && (
                        <div className="flex items-center">
                          <div className="mr-2 text-sm font-medium">Correct answer:</div>
                          <div className="flex items-center">
                            <Check className="mr-1 h-4 w-4 text-green-500" />
                            <span>{question.correctAnswer}</span>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <Button onClick={() => window.location.reload()}>Retake Quiz</Button>
        </div>
      )}
    </div>
  )
}
