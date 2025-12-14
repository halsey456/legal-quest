// app/components/TestCard.tsx
// Карточка с вопросом теста и вариантами ответов

'use client';

import { useState, useEffect } from 'react';
import styles from './TestCard.module.css';

interface Answer {
  text: string;
  correct: boolean;
  explanation?: string;
}

interface Question {
  id: number;
  question: string;
  answers: Answer[];
  caseName: string;
  explanation?: string;
}

interface TestCardProps {
  question: Question;
  onAnswer: (answerIndex: number, isCorrect: boolean) => void;
  questionNumber: number;
  totalQuestions: number;
  onNextQuestion: () => void;
}

export default function TestCard({ question, onAnswer, questionNumber, totalQuestions, onNextQuestion }: TestCardProps) {
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Сброс состояния при смене вопроса
  useEffect(() => {
    setSelectedAnswer(null);
    setIsSubmitted(false);
  }, [question.id]);

  const handleAnswerClick = (index: number) => {
    setSelectedAnswer(index);
    setIsSubmitted(false);
  };

  const handleSubmitAnswer = () => {
    if (selectedAnswer === null) return;
    
    setIsSubmitted(true);
    onAnswer(selectedAnswer, question.answers[selectedAnswer].correct);
  };

  return (
    <div className={styles.container}>
      {/* Заголовок с номером вопроса */}
      <div className={styles.questionSection}>
        <div className={styles.questionNumber}>
          Вопрос {questionNumber} из {totalQuestions}
        </div>
        <h2 className={styles.questionText}>{question.question}</h2>
      </div>
      
      {/* Сетка вариантов ответов */}
      <div className={styles.answersGrid}>
        {question.answers.map((answer, index) => (
          <button
            key={index}
            className={`${styles.answerButton} ${
              selectedAnswer === index ? styles.selected : ''
            }`}
            onClick={() => handleAnswerClick(index)}
          >
            <span className={styles.answerText}>{answer.text}</span>
            {selectedAnswer === index && (
              <span className={styles.answerMarker}>✓</span>
            )}
          </button>
        ))}
      </div>
      
      {/* Кнопки действий */}
      <div className={styles.buttonContainer}>
        {selectedAnswer !== null && !isSubmitted ? (
          <button 
            onClick={handleSubmitAnswer}
            className={styles.submitButton}
          >
            Подтвердить ответ
          </button>
        ) : isSubmitted ? (
          <button 
            onClick={onNextQuestion}
            className={styles.nextButton}
          >
            {questionNumber < totalQuestions ? 'Следующий вопрос →' : 'Завершить тест'}
          </button>
        ) : (
          <div className={styles.hint}>
            <p>Выберите один из вариантов ответа</p>
          </div>
        )}
      </div>
    </div>
  );
}