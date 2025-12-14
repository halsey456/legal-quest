// app/components/Navigation.tsx
// Навигационное меню сайта

'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import styles from './Navigation.module.css';

export default function Navigation() {
  const pathname = usePathname();
  
  // Элементы навигации
  const navItems = [
    { href: '/', label: 'Главная' },
    { href: '/city-map', label: 'Карта города' },
    { href: '/theory', label: 'Теория' },
    { href: '/sources', label: 'Литература' },
    { href: '/instruction', label: 'Инструкция' },
  ];

  return (
    <nav className={styles.nav}>
      <div className={styles.container}>
        {/* Логотип */}
        <div className={styles.logo}>
          <Link href="/">⚖️ Правовой квест</Link>
        </div>
        
        {/* Навигационное меню */}
        <ul className={styles.menu}>
          {navItems.map((item) => (
            <li key={item.href}>
              <Link 
                href={item.href}
                className={`${styles.link} ${pathname === item.href ? styles.active : ''}`}
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}