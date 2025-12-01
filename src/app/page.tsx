import Link from 'next/link';
import { Scale, ArrowRight } from 'lucide-react';

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-blue-900 text-white">
      <div className="container mx-auto px-4 py-12 md:py-16">
        <div className="text-center mb-12">
          <div className="flex justify-center mb-6">
            <Scale className="w-16 h-16 md:w-20 md:h-20 text-blue-400" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Интерактивный квест по теме:</h1>
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-red-400">"Преступления и Правонарушения"</h1>
          <p className="text-lg md:text-xl text-blue-200 mb-8 max-w-2xl mx-auto px-4">
            Интерактивный квест по правовой грамотности. Расследуйте дела, принимайте решения и изучайте законы в увлекательной форме!
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
            <Link
              href="/game"
              className="inline-flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white text-lg font-semibold px-8 py-4 rounded-xl transition transform hover:scale-105"
            >
              Начать квест
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
          
          <div className="mt-12 text-gray-300">
            <p className="text-lg">Выполнил студент группы ПрИ-33</p>
            <p className="text-xl font-semibold">Анищенко Иван</p>
          </div>
        </div>
      </div>
    </div>
  );
}