// app/page.tsx
// Главная страница с меню навигации по разделам квеста

'use client';

import Link from 'next/link';
import styles from './page.module.css';

export default function HomePage() {
  // Данные для карточек навигации
  const menuItems = [
    { 
      title: 'Карта города', 
      href: '/city-map', 
      description: 'Исследуйте юридический город',
      icon: '🗺️',
      color: '#3b82f6'
    },
    { 
      title: 'Теория', 
      href: '/theory', 
      description: 'Все учебные материалы',
      icon: '📚',
      color: '#10b981'
    },
    { 
      title: 'Литература', 
      href: '/sources', 
      description: 'Источники и нормативные акты',
      icon: '📖',
      color: '#8b5cf6'
    },
    { 
      title: 'Инструкция', 
      href: '/instruction', 
      description: 'Как пользоваться программой',
      icon: '📋',
      color: '#f59e0b'
    },
  ];

  return (
    // Основной контейнер страницы
    <div className={styles.container}>
      {/* СЕКЦИЯ ЗАГОЛОВКА */}
      <header className={styles.header}>
        <h1 className={styles.mainTitle}>
          Интерактивный квест:
          <span className={styles.redLine}> "Преступления и Правонарушения"</span>
        </h1>
        <p className={styles.description}>
          Исследуйте юридический город. Кликайте на здания, чтобы изучать темы, 
          проходить тесты и принимать решения в роли следователя.
        </p>
      </header>

      {/* ОСНОВНАЯ СЕКЦИЯ С КАРТОЧКАМИ НАВИГАЦИИ */}
      <main className={styles.main}>
        <div className={styles.menuGrid}>
          {/* МАППИНГ КАРТОЧЕК МЕНЮ */}
          {menuItems.map((item, index) => (
            <Link href={item.href} key={index} className={styles.menuCard}>
              {/* ИКОНКА КАРТОЧКИ С ПРОЗРАЧНЫМ ФОНОМ */}
              <div 
                className={styles.cardIcon}
                style={{ backgroundColor: `${item.color}15` }}
              >
                <span style={{ fontSize: '2.3rem' }}>{item.icon}</span>
              </div>
              {/* КОНТЕНТ КАРТОЧКИ */}
              <div className={styles.cardContent}>
                <div className={styles.cardNumber}>0{index + 1}</div>
                <h3 style={{ color: item.color }}>{item.title}</h3>
                <p>{item.description}</p>
                <div className={styles.cardArrow}>→</div>
              </div>
            </Link>
          ))}
        </div>
      </main>
    </div>
  );
}