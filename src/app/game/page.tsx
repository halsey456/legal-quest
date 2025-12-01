"use client";

import { useState, useEffect, useMemo } from 'react';
import { gameScenarios } from './scenario';
import { GameEngine } from '@/lib/game-engine';
import { Scale, Home, ArrowLeft, ArrowRight, Trophy } from 'lucide-react';
import Link from 'next/link';

// Функция для перемешивания массива
const shuffleArray = <T,>(array: T[]): T[] => {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
};

export default function GamePage() {
  const [currentSceneId, setCurrentSceneId] = useState('start');
  const [gameEngine, setGameEngine] = useState<GameEngine | null>(null);
  const [history, setHistory] = useState<string[]>(['start']);
  const [selectedChoices, setSelectedChoices] = useState<Record<string, string>>({});
  const [gameCompleted, setGameCompleted] = useState(false);

  useEffect(() => {
    const engine = new GameEngine();
    setGameEngine(engine);
    
    // Восстанавливаем сделанные выборы из localStorage
    const savedProgress = localStorage.getItem('legalQuestProgress');
    if (savedProgress) {
      try {
        const data = JSON.parse(savedProgress);
        setSelectedChoices(data.userChoices || {});
        // Проверяем, завершена ли игра
        if (data.path && data.path.includes('end')) {
          setGameCompleted(true);
        }
      } catch (error) {
        console.error('Error loading progress:', error);
      }
    }
  }, []);

  const currentScene = gameScenarios.find(s => s.id === currentSceneId);

  // Перемешиваем варианты ответов для текущей сцены
  const shuffledChoices = useMemo(() => {
    if (!currentScene) return [];
    return shuffleArray([...currentScene.choices]);
  }, [currentScene]);

  const handleChoice = (choice: any) => {
    if (!gameEngine || !currentScene) return;
    
    // Сохраняем выбранный ответ
    setSelectedChoices(prev => ({
      ...prev,
      [currentSceneId]: choice.id
    }));
    
    const nextSceneId = gameEngine.makeChoice(choice, currentSceneId);
    
    // Добавляем в историю
    setHistory(prev => [...prev, nextSceneId]);
    
    // Если это конец, отмечаем завершение игры
    if (nextSceneId === 'end') {
      setGameCompleted(true);
      setTimeout(() => {
        window.location.href = '/results';
      }, 1000);
    } else {
      // Переходим к следующему вопросу
      setTimeout(() => {
        setCurrentSceneId(nextSceneId);
      }, 300);
    }
  };

  const goBack = () => {
    if (history.length > 1) {
      const newHistory = [...history];
      newHistory.pop();
      const prevSceneId = newHistory[newHistory.length - 1];
      setHistory(newHistory);
      setCurrentSceneId(prevSceneId);
      setGameCompleted(false);
    }
  };

  const goToResults = () => {
    window.location.href = '/results';
  };

  // Если игра завершена, показываем экран завершения
  if (gameCompleted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 p-4">
        <div className="max-w-4xl mx-auto text-center py-12">
          <Trophy className="w-20 h-20 text-yellow-500 mx-auto mb-6" />
          <h1 className="text-4xl font-bold text-gray-800 mb-4">Квест завершён!</h1>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Вы ответили на все вопросы. Перейдите к результатам, чтобы увидеть детальный разбор ваших ответов.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={goToResults}
              className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition font-semibold text-lg"
            >
              Посмотреть результаты
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (!currentScene) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-gray-100 p-4">
        <div className="max-w-4xl mx-auto text-center py-12">
          <h1 className="text-3xl font-bold text-gray-800 mb-4">Сценарий не найден</h1>
          <p className="text-gray-600 mb-6">Текущая сцена: {currentSceneId}</p>
          <Link 
            href="/"
            className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition inline-block"
          >
            На главную
          </Link>
        </div>
      </div>
    );
  }

  const selectedChoiceId = selectedChoices[currentSceneId];
  const currentQuestionIndex = gameScenarios.findIndex(s => s.id === currentSceneId);
  const totalQuestions = gameScenarios.filter(s => s.id !== 'end').length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-gray-100 p-4">
      <div className="max-w-4xl mx-auto">
        {/* Хедер */}
        <header className="mb-6">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white rounded-xl shadow-lg p-4">
            <div className="flex items-center gap-3">
              <Link 
                href="/" 
                className="text-gray-600 hover:text-blue-600"
                onClick={() => {
                  // Сбрасываем прогресс при переходе на главную
                  if (gameEngine) {
                    gameEngine.resetGame();
                  }
                }}
              >
                <Home className="w-6 h-6" />
              </Link>
              <div className="flex items-center gap-2">
                <Scale className="w-7 h-7 text-blue-600" />
                <h1 className="text-2xl font-bold text-gray-800">Интерактивный квест: "Преступления и Правонарушения"</h1>
              </div>
            </div>
            
            <div className="flex gap-2">
              <button
                onClick={goBack}
                disabled={history.length <= 1}
                className={`flex items-center gap-1 px-3 py-2 rounded-lg transition ${
                  history.length <= 1 
                    ? 'bg-gray-100 text-gray-400 cursor-not-allowed' 
                    : 'bg-blue-100 text-blue-700 hover:bg-blue-200'
                }`}
              >
                <ArrowLeft className="w-4 h-4" />
                Назад
              </button>
            </div>
          </div>
        </header>

        {/* Прогресс бар */}
        <div className="mb-4">
          <div className="flex justify-between text-sm text-gray-600 mb-1">
            <span>Вопрос {currentQuestionIndex + 1} из {totalQuestions}</span>
            <span>{Math.round(((currentQuestionIndex + 1) / totalQuestions) * 100)}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2.5">
            <div 
              className="bg-blue-600 h-2.5 rounded-full transition-all duration-500"
              style={{ 
                width: `${((currentQuestionIndex + 1) / totalQuestions) * 100}%` 
              }}
            ></div>
          </div>
        </div>

        {/* Основной контент */}
        <main className="bg-white rounded-xl shadow-lg p-6 mb-4">
          <div className="mb-6">
            <h2 className="text-3xl font-bold text-gray-800 mb-3">{currentScene.title}</h2>
            <p className="text-lg text-gray-700 leading-relaxed mb-4">{currentScene.description}</p>
            
            {/* КАРТИНКА С РАСТЯГИВАНИЕМ (object-fit: fill) */}
            {currentScene.image && (
              <div className="mt-4 mb-4 flex justify-center">
                <div className="relative w-[450px] h-[220px] rounded-xl overflow-hidden border-3 border-gray-400 shadow-lg bg-white">
                  <img 
                    src={currentScene.image} 
                    alt={currentScene.title}
                    className="absolute inset-0 w-full h-full"
                    style={{ 
                      objectFit: 'fill', // РАСТЯГИВАНИЕ
                      width: '100%',
                      height: '100%'
                    }}
                  />
                </div>
              </div>
            )}
          </div>

          {/* Выборы */}
          <div className="space-y-3">
            <h3 className="text-xl font-semibold text-gray-800 mb-3">Выберите ваш ответ:</h3>
            {shuffledChoices.map((choice, index) => {
              const isSelected = selectedChoiceId === choice.id;
              
              return (
                <button
                  key={choice.id}
                  onClick={() => handleChoice(choice)}
                  className={`w-full text-left p-4 rounded-xl border-2 transition-all duration-200 ${
                    isSelected
                      ? 'border-blue-500 bg-blue-50'
                      : 'border-gray-300 hover:border-blue-300 hover:bg-blue-50/50'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                      isSelected ? 'bg-blue-500 text-white' : 'bg-gray-100 text-gray-600'
                    }`}>
                      {String.fromCharCode(65 + index)}
                    </div>
                    <span className="font-medium text-gray-800">
                      {choice.text}
                    </span>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Индикатор выбора */}
          {selectedChoiceId && (
            <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-lg text-center">
              <p className="text-blue-700 font-medium">
                Ответ выбран. Переходим к следующему вопросу...
              </p>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}