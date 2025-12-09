'use client';

import { useSearchParams, useRouter } from 'next/navigation';
import { useState } from 'react';
import TestCard from '../components/TestCard';
import { questionsData } from '../data/questions';
import { blocksData } from '../data/blocks';
import styles from './test.module.css';

export default function TestPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const blockId = parseInt(searchParams.get('block') || '1');
  
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [showResults, setShowResults] = useState(false);
  const [userAnswers, setUserAnswers] = useState<{questionId: number, answerIndex: number, isCorrect: boolean}[]>([]);
  const [currentAnswer, setCurrentAnswer] = useState<{answerIndex: number, isCorrect: boolean} | null>(null);

  // Фильтруем вопросы по блоку
  const blockQuestions = questionsData.filter(q => q.blockId === blockId);
  const blockInfo = blocksData.find(b => b.id === blockId);

  const handleAnswer = (answerIndex: number, isCorrect: boolean) => {
    setCurrentAnswer({ answerIndex, isCorrect });
  };

  const handleNextQuestion = () => {
    if (!currentAnswer) return;
    
    // Сохраняем текущий ответ
    const newUserAnswers = [...userAnswers, {
      questionId: blockQuestions[currentQuestion].id,
      answerIndex: currentAnswer.answerIndex,
      isCorrect: currentAnswer.isCorrect
    }];
    setUserAnswers(newUserAnswers);
    
    if (currentAnswer.isCorrect) {
      setScore(score + 1);
    }
    
    // Сбрасываем текущий ответ
    setCurrentAnswer(null);
    
    // Переходим к следующему вопросу или показываем результаты
    if (currentQuestion < blockQuestions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setShowResults(true);
    }
  };

  const handleRetryTest = () => {
    // Сбрасываем все данные теста
    setCurrentQuestion(0);
    setScore(0);
    setShowResults(false);
    setUserAnswers([]);
    setCurrentAnswer(null);
  };

  const calculateGrade = (percentage: number) => {
    if (percentage >= 90) return { grade: 'Отлично', emoji: '🎖️', color: '#10b981' };
    if (percentage >= 70) return { grade: 'Хорошо', emoji: '👍', color: '#3b82f6' };
    if (percentage >= 50) return { grade: 'Удовлетворительно', emoji: '😊', color: '#f59e0b' };
    return { grade: 'Нужно повторить', emoji: '📚', color: '#ef4444' };
  };

  if (!blockQuestions.length) {
    return (
      <div className={styles.errorContainer}>
        <h2>Вопросы для этого блока пока не готовы</h2>
        <button onClick={() => router.push('/')} className={styles.backButton}>
          ← Вернуться на карту
        </button>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div className={styles.headerTop}>
          <button onClick={() => router.push('/')} className={styles.backButton}>
            ← Назад к карту
          </button>
        </div>
        
        <div className={styles.headerContent}>
          <h2 className={styles.blockTitle}>БЛОК #{blockId}: {blockInfo?.title}</h2>
          <div className={styles.progress}>
            <div className={styles.progressInfo}>
              Вопрос {currentQuestion + 1} из {blockQuestions.length}
            </div>
            <div className={styles.progressBar}>
              <div 
                className={styles.progressFill}
                style={{ width: `${((currentQuestion + 1) / blockQuestions.length) * 100}%` }}
              />
            </div>
          </div>
        </div>
      </div>

      {showResults ? (
        <div className={styles.resultsContainer}>
          <div className={styles.resultsHeader}>
            <h2>Результаты теста</h2>
            <p className={styles.resultsSubtitle}>Блок #{blockId}: {blockInfo?.title}</p>
          </div>
          
          <div className={styles.scoreSection}>
            <div className={styles.scoreCard}>
              <div className={styles.scoreCircle}>
                <div className={styles.scoreContent}>
                  <div>
                    <span className={styles.scoreNumber}>{score}</span>
                    <span className={styles.scoreTotal}>/{blockQuestions.length}</span>
                  </div>
                  <div className={styles.scorePercentage}>
                    {Math.round((score / blockQuestions.length) * 100)}%
                  </div>
                </div>
              </div>
              {(() => {
                const grade = calculateGrade((score / blockQuestions.length) * 100);
                return (
                  <div className={styles.grade} style={{ color: grade.color }}>
                    {grade.emoji} {grade.grade}
                  </div>
                );
              })()}
            </div>
          </div>
          
          <div className={styles.explanationsSection}>
            <h3>Разбор вопросов:</h3>
            <div className={styles.questionsReview}>
              {blockQuestions.map((question, index) => {
                const userAnswer = userAnswers.find(a => a.questionId === question.id);
                return (
                  <div key={question.id} className={styles.questionReview}>
                    <div className={styles.questionHeader}>
                      <span className={styles.questionNumber}>Вопрос {index + 1}</span>
                      <span className={`${styles.answerStatus} ${
                        userAnswer?.isCorrect ? styles.correctStatus : styles.incorrectStatus
                      }`}>
                        {userAnswer?.isCorrect ? '✓ Верно' : '✗ Ошибка'}
                      </span>
                    </div>
                    <p className={styles.questionText}>{question.question}</p>
                    <div className={styles.answerDetails}>
                      <div>
                        <strong>Ваш ответ:</strong> {question.answers[userAnswer?.answerIndex || 0]?.text}
                      </div>
                      <div>
                        <strong>Правильный ответ:</strong> {question.answers.find(a => a.correct)?.text}
                      </div>
                      <div className={styles.explanation}>
                        <strong>Объяснение:</strong> {question.explanation}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
          
          <div className={styles.actions}>
            <button onClick={handleRetryTest} className={styles.retryButton}>
              🔄 Повторить тест
            </button>
            <button onClick={() => router.push('/')} className={styles.homeButton}>
              ← Вернуться на карту города
            </button>
          </div>
        </div>
      ) : (
        <TestCard
          question={blockQuestions[currentQuestion]}
          onAnswer={handleAnswer}
          questionNumber={currentQuestion + 1}
          totalQuestions={blockQuestions.length}
          onNextQuestion={handleNextQuestion}
          key={blockQuestions[currentQuestion].id}
        />
      )}
    </div>
  );
}