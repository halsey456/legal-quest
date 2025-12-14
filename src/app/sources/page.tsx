// app/sources/page.tsx
// Страница с литературой и источниками для изучения

'use client';

import styles from './sources.module.css';

export default function SourcesPage() {
  return (
    <div className={styles.container}>
      {/* ЗАГОЛОВОЧНАЯ СЕКЦИЯ */}
      <header className={styles.header}>
        <h1>Литература</h1>
        <p>Список использованных источников</p>
      </header>

      {/* ОСНОВНАЯ СЕКЦИЯ С КАРТОЧКАМИ */}
      <main className={styles.main}>
        <div className={styles.sourcesGrid}>
          
          {/* КАРТОЧКА ОСНОВНОЙ ЛИТЕРАТУРЫ */}
          <div className={styles.categoryCard}>
            <h2>Основная литература</h2>
            <ul>
              <li>Малько А. В., Субачев В. В. Правоведение. М.: издательство ИНФРА-М, 2018. - 304 с.</li>
            </ul>
          </div>
          
          {/* КАРТОЧКА НОРМАТИВНЫХ АКТОВ */}
          <div className={styles.categoryCard}>
            <h2>Нормативные акты</h2>
            <ul>
              <li>Уголовный кодекс Российской Федерации (УК РФ)</li>
              <li>Кодекс Российской Федерации об административных правонарушениях (КоАП РФ)</li>
            </ul>
          </div>
          
        </div>
      </main>
    </div>
  );
}