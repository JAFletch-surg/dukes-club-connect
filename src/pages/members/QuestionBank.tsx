import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Check, X, ChevronLeft, ChevronRight } from "lucide-react";
import { mockQuestions } from "@/data/mockMembersData";

const QuestionBank = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showExplanation, setShowExplanation] = useState(false);

  const question = mockQuestions[currentIndex];
  const totalQuestions = mockQuestions.length;

  const handleAnswer = (index: number) => {
    if (selectedAnswer !== null) return;
    setSelectedAnswer(index);
    setShowExplanation(true);
  };

  const handleNext = () => {
    if (currentIndex < totalQuestions - 1) {
      setCurrentIndex(currentIndex + 1);
      setSelectedAnswer(null);
      setShowExplanation(false);
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
      setSelectedAnswer(null);
      setShowExplanation(false);
    }
  };

  const getOptionStyle = (index: number) => {
    if (selectedAnswer === null) return "border-border hover:bg-muted/30 cursor-pointer";
    if (index === question.correctAnswerIndex) return "border-emerald-500 bg-emerald-50 dark:bg-emerald-950/30";
    if (index === selectedAnswer && index !== question.correctAnswerIndex) return "border-destructive bg-destructive/5";
    return "border-border opacity-50";
  };

  const optionLabels = ["A", "B", "C", "D"];

  return (
    <div className="space-y-6 max-w-3xl mx-auto">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Question Bank</h1>
        <p className="text-muted-foreground mt-1">Practice colorectal surgery exam questions</p>
      </div>

      <Card className="border">
        <CardContent className="p-6">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <Badge variant="secondary">Question {currentIndex + 1} of {totalQuestions}</Badge>
            <Badge variant="outline" className="capitalize">{question.difficulty}</Badge>
          </div>

          {/* Question */}
          <p className="text-base font-semibold text-foreground leading-relaxed mb-6">
            {question.question}
          </p>

          {/* Options */}
          <div className="space-y-3">
            {question.options.map((option, index) => (
              <button
                key={index}
                onClick={() => handleAnswer(index)}
                className={`w-full text-left p-4 rounded-lg border-2 transition-colors flex items-start gap-3 ${getOptionStyle(index)}`}
                disabled={selectedAnswer !== null}
              >
                <span className="font-bold text-sm text-muted-foreground shrink-0 mt-0.5">
                  {optionLabels[index]}.
                </span>
                <span className="text-sm text-foreground flex-1">{option}</span>
                {selectedAnswer !== null && index === question.correctAnswerIndex && (
                  <Check size={18} className="text-emerald-600 shrink-0 mt-0.5" />
                )}
                {selectedAnswer === index && index !== question.correctAnswerIndex && (
                  <X size={18} className="text-destructive shrink-0 mt-0.5" />
                )}
              </button>
            ))}
          </div>

          {/* Explanation */}
          {showExplanation && (
            <div className="mt-6 p-4 rounded-lg bg-navy/5 border-l-4 border-navy">
              <p className="text-sm font-semibold text-foreground mb-1">Explanation</p>
              <p className="text-sm text-muted-foreground leading-relaxed">{question.explanation}</p>
            </div>
          )}

          {/* Navigation */}
          <div className="flex items-center justify-between mt-6 pt-4 border-t border-border">
            <Button
              variant="outline"
              size="sm"
              onClick={handlePrev}
              disabled={currentIndex === 0}
            >
              <ChevronLeft size={16} className="mr-1" /> Previous
            </Button>
            <span className="text-xs text-muted-foreground">
              {currentIndex + 1} / {totalQuestions}
            </span>
            <Button
              variant="outline"
              size="sm"
              onClick={handleNext}
              disabled={currentIndex === totalQuestions - 1}
            >
              Next <ChevronRight size={16} className="ml-1" />
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default QuestionBank;
