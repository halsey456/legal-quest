// app/menu/page.tsx
// Страница с полным меню всех разделов программы

'use client';

import Link from 'next/link';
import styles from './menu.module.css';

export default function MenuPage() {
  // МАССИВ ПУНКТОВ МЕНЮ
  const menuItems = [
    { 
      title: 'Главная (Карта города)', 
      href: '/city-map', 
      description: 'Интерактивная карта для выбора темы изучения',
      icon: '🗺️'
    },
    { 
      title: 'Теория / Лекции', 
      href: '/theory', 
      description: 'Все учебные материалы по темам квеста',
      icon: '📚'
    },
    { 
      title: 'Пройти квест', 
      href: '/', 
      description: 'Начать интерактивный квест с тестами',
      icon: '🎮'
    },
    { 
      title: 'Тесты по блокам', 
      href: '/#blocks', 
      description: 'Все тесты для проверки знаний по блокам',
      icon: '🧪'
    },
    { 
      title: 'Инструкция по работе', 
      href: '/instruction', 
      description: 'Как пользоваться программой',
      icon: '📖'
    },
    { 
      title: 'Список источников', 
      href: '/sources', 
      description: 'Литература и нормативные акты',
      icon: '📚'
    },
    { 
      title: 'О программе', 
      href: '/about', 
      description: 'Информация о разработке квеста',
      icon: 'ℹ️'
    },
  ];

  return (
    <div className={styles.container}>
      {/* ЗАГОЛОВОЧНАЯ СЕКЦИЯ */}
      <header className={styles.header}>
        <h1>Меню программы</h1>
        <p>Интерактивный квест: "Преступления и Правонарушения"</p>
      </header>

      {/* ОСНОВНАЯ СЕКЦИЯ */}
      <main className={styles.main}>
        {/* ГРИД КАРТОЧЕК МЕНЮ */}
        <div className={styles.menuGrid}>
          {menuItems.map((item, index) => (
            <Link href={item.href} key={index} className={styles.menuCard}>
              <div className={styles.cardIcon}>{item.icon}</div>
              <div className={styles.cardContent}>
                <div className={styles.cardNumber}>0{index + 1}</div>
                <h3>{item.title}</h3>
                <p>{item.description}</p>
                <div className={styles.cardArrow}>→</div>
              </div>
            </Link>
          ))}
        </div>
        
        {/* БЛОК СТАТИСТИКИ */}
        <div className={styles.quickStats}>
          <div className={styles.statCard}>
            <h4>7</h4>
            <p>Учебных блоков</p>
          </div>
          <div className={styles.statCard}>
            <h4>22</h4>
            <p>Тестовых вопроса</p>
          </div>
          <div className={styles.statCard}>
            <h4>100%</h4>
            <p>Бесплатно</p>
          </div>
          <div className={styles.statCard}>
            <h4>∞</h4>
            <p>Попыток тестирования</p>
          </div>
        </div>
      </main>
    </div>
  );
}