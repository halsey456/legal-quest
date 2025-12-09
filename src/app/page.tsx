'use client';

import { useState } from 'react';
import Building from './components/Building';
import Modal from './components/Modal';
import { blocksData } from './data/blocks';
import styles from './page.module.css';

export default function HomePage() {
  const [selectedBlock, setSelectedBlock] = useState<any>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleBuildingClick = (block: any) => {
    setSelectedBlock(block);
    setIsModalOpen(true);
  };

  return (
    <>
      <div className={styles.container}>
        {/* Уменьшаем заголовок и его отступы */}
        <header className={styles.header} style={{ minHeight: '180px' }}>
          <div className={styles.titleContainer}>
            <h1 className={styles.mainTitle} style={{ fontSize: '2.2rem', marginBottom: '0.5rem' }}>
              Интерактивный квест:<br />
              <span className={styles.redLine}>"Преступления и Правонарушения"</span>
            </h1>
            <p className={styles.description} style={{ fontSize: '1rem', lineHeight: '1.4' }}>
              Исследуйте юридический город. Кликайте на здания, чтобы изучать темы, проходить тесты 
              и принимать решения в роли следователя.
            </p>
          </div>
        </header>

        <main className={styles.main}>
          <div className={styles.cityMapContainer} style={{ paddingTop: '0.5rem' }}>
            <div 
              className={styles.cityMapLarge}
              style={{
                backgroundImage: "url('/images/city-map.png')",
                backgroundSize: '95% auto',
                backgroundPosition: 'center',
                backgroundColor: '#f0f8ff',
                marginTop: '30px', // ДОБАВЛЯЕМ ОТСТУП СВЕРХУ ДЛЯ РАМКИ
                width: '85%', // Слегка увеличили ширину рамки
                height: '620px' // Слегка уменьшили высоту рамки
              }}
            >
              {/* Здания поверх картинки */}
              {blocksData.map((block) => (
                <Building
                  key={block.id}
                  block={block}
                  onClick={handleBuildingClick}
                />
              ))}
            </div>
          </div>
        </main>
      </div>

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        block={selectedBlock}
      />
    </>
  );
}