// app/layout.tsx
// Главный layout приложения с навигацией и метаданными

import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import Navigation from './components/Navigation';

// ИНИЦИАЛИЗАЦИЯ ШРИФТА INTER С ПОДДЕРЖКОЙ КИРИЛЛИЦЫ
const inter = Inter({ subsets: ['latin', 'cyrillic'] });

// МЕТАДАННЫЕ
export const metadata: Metadata = {
  title: 'Интерактивный квест: "Преступления и Правонарушения"',
  description: 'Исследуйте юридический город. Кликайте на здания, чтобы изучать темы, проходить тесты и принимать решения в роли следователя.',
  keywords: 'правовая грамотность, квест, правонарушения, преступления, тесты, образование',
};

// КОРНЕВОЙ LAYOUT КОМПОНЕНТ
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    // ОСНОВНОЙ HTML ДОКУМЕНТ С РУССКИМ ЯЗЫКОМ
    <html lang="ru">
      {/* СЕКЦИЯ HEAD С МЕТАДАННЫМИ */}
      <head>
        {/* КАСТОМНАЯ ИКОНКА */}
        <link rel="icon" href="data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>⚖️</text></svg>" />
      </head>
      
      {/* ТЕЛО ДОКУМЕНТА С ПРИМЕНЕННЫМ ШРИФТОМ INTER */}
      <body className={inter.className}>
        {/* КОМПОНЕНТ НАВИГАЦИИ (ОБЩИЙ ДЛЯ ВСЕХ СТРАНИЦ) */}
        <Navigation />
        
        {/* ОСНОВНОЕ СОДЕРЖАНИЕ СТРАНИЦ */}
        <main>{children}</main>
      </body>
    </html>
  );
}