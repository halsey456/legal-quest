"use client";

import { useEffect, useState } from 'react';
import { GameEngine } from '@/lib/game-engine';
import { gameScenarios } from '../game/scenario';
import { Trophy, Book, Home, CheckCircle, XCircle } from 'lucide-react';
import Link from 'next/link';

export default function ResultsPage() {
  const [result, setResult] = useState<any>(null);
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const [totalAnswers, setTotalAnswers] = useState(0);
  const [userChoices, setUserChoices] = useState<Record<string, string>>({});
  const [allScenesData, setAllScenesData] = useState<any[]>([]);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    const engine = new GameEngine();
    
    // Загружаем сохранённый прогресс
    const savedProgress = localStorage.getItem('legalQuestProgress');
    if (savedProgress) {
      try {
        const data = JSON.parse(savedProgress);
        setUserChoices(data.userChoices || {});
        
        // Собираем данные по всем сценам
        const scenesData = gameScenarios
          .filter(scene => scene.id !== 'end') // Исключаем финальную сцену
          .map(scene => {
            const userChoiceId = data.userChoices?.[scene.id];
            const userChoice = userChoiceId ? scene.choices.find(c => c.id === userChoiceId) : null;
            const isCorrect = userChoice?.legalCorrect || false;
            
            return {
              sceneId: scene.id,
              title: scene.title,
              userChoice: userChoice?.text || 'Не отвечено',
              isCorrect,
              explanation: scene.legalExplanation
            };
          });
        
        setAllScenesData(scenesData);
        
        // Считаем правильные ответы
        const correctCount = scenesData.filter(scene => scene.isCorrect).length;
        const answeredCount = scenesData.filter(scene => scene.userChoice !== 'Не отвечено').length;
        
        setCorrectAnswers(correctCount);
        setTotalAnswers(answeredCount);
        
        // Определяем результат
        const percentage = answeredCount > 0 ? (correctCount / answeredCount) * 100 : 0;
        
        if (percentage >= 80) {
          setResult({
            title: "Отличный результат!",
            description: "Вы хорошо разбираетесь в различиях преступлений и правонарушений.",
            rank: "Эксперт"
          });
        } else if (percentage >= 60) {
          setResult({
            title: "Хороший результат",
            description: "Есть понимание, но можно улучшить знания в области права.",
            rank: "Продвинутый"
          });
        } else if (percentage >= 40) {
          setResult({
            title: "Средний результат",
            description: "Базовые знания есть, нужно больше практики в правовых вопросах.",
            rank: "Новичок"
          });
        } else {
          setResult({
            title: "Нужно учиться",
            description: "Рекомендуем изучить основы уголовного и административного права.",
            rank: "Начинающий"
          });
        }
      } catch (error) {
        console.error('Error parsing saved progress:', error);
      }
    }
  }, []);

  if (!result || !isClient) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-100 p-4 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-600 mx-auto mb-4"></div>
          <p className="text-gray-700">Загрузка результатов...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-100 p-4">
      <div className="max-w-4xl mx-auto">
        {/* Основные результаты */}
        <div className="bg-white rounded-2xl shadow-2xl p-6 md:p-8 mt-4 md:mt-8 mb-6">
          <div className="text-center">
            <Trophy className="w-16 h-16 md:w-20 md:h-20 text-yellow-500 mx-auto mb-4" />
            <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">{result.title}</h1>
            <p className="text-lg md:text-xl text-gray-600 mb-8">{result.description}</p>
            
            {/* Статистика - правильные/всего */}
            <div className="grid grid-cols-2 gap-4 md:gap-6 mb-8">
              <div className="bg-gradient-to-r from-green-50 to-green-100 p-4 md:p-6 rounded-xl border border-green-200">
                <div className="text-2xl md:text-3xl font-bold text-green-700">{correctAnswers}</div>
                <div className="text-green-600 text-sm md:text-base">правильных ответов</div>
              </div>
              <div className="bg-gradient-to-r from-blue-50 to-blue-100 p-4 md:p-6 rounded-xl border border-blue-200">
                <div className="text-2xl md:text-3xl font-bold text-blue-700">{totalAnswers}</div>
                <div className="text-blue-600 text-sm md:text-base">всего ответов</div>
              </div>
            </div>

            {/* Кнопки - ТОЛЬКО "На главную" */}
            <div className="flex justify-center mb-8">
              <Link
                href="/"
                className="flex items-center justify-center gap-2 bg-gray-600 text-white px-8 py-3 rounded-lg hover:bg-gray-700 transition font-medium"
                onClick={() => {
                  // Сбрасываем прогресс при переходе на главную
                  const engine = new GameEngine();
                  engine.resetGame();
                }}
              >
                <Home className="w-5 h-5" />
                На главную
              </Link>
            </div>
          </div>
        </div>

        {/* Детальный разбор по всем вопросам */}
        <div className="bg-white rounded-2xl shadow-lg p-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">📋 Детальный разбор ответов</h2>
          
          <div className="space-y-6">
            {allScenesData.map((scene, index) => {
              if (scene.userChoice === 'Не отвечено') return null;
              
              const isCorrect = scene.isCorrect;
              
              return (
                <div 
                  key={scene.sceneId} 
                  className={`p-4 rounded-xl border ${
                    isCorrect 
                      ? 'border-green-200 bg-green-50' 
                      : 'border-red-200 bg-red-50'
                  }`}
                >
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h3 className="font-bold text-gray-800 mb-1">
                        Вопрос {index + 1}: {scene.title}
                      </h3>
                    </div>
                    
                    <div className={`flex items-center gap-1 px-3 py-1 rounded-full text-sm font-semibold ${
                      isCorrect 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-red-100 text-red-800'
                    }`}>
                      {isCorrect ? (
                        <>
                          <CheckCircle className="w-4 h-4" />
                          Верно
                        </>
                      ) : (
                        <>
                          <XCircle className="w-4 h-4" />
                          Ошибка
                        </>
                      )}
                    </div>
                  </div>
                  
                  {/* Ваш ответ */}
                  <div className="mb-3">
                    <h4 className="font-medium text-gray-700 mb-2">Ваш ответ:</h4>
                    <div className={`p-3 rounded-lg ${
                      isCorrect ? 'bg-green-100' : 'bg-red-100'
                    }`}>
                      <div className="flex items-start gap-2">
                        <span className={isCorrect ? 'text-green-800' : 'text-red-800'}>
                          {scene.userChoice}
                        </span>
                      </div>
                    </div>
                  </div>
                  
                  {/* Объяснение */}
                  {scene.explanation && (
                    <div className="p-3 bg-blue-50 rounded-lg border border-blue-200">
                      <h4 className="font-bold text-blue-800 mb-1 flex items-center gap-2">
                        <Book className="w-4 h-4" />
                        Правовая справка:
                      </h4>
                      <p className="text-blue-700">{scene.explanation}</p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}