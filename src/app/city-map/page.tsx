// app/city-map/page.tsx
// Главная страница с интерактивной картой города и зданиями-блоками

'use client';

import { useState } from 'react';
import Building from '../components/Building';
import Modal from '../components/Modal';
import { blocksData } from '../data/blocks';
import styles from './city-map.module.css';

export default function CityMapPage() {
  // СОСТОЯНИЯ ДЛЯ УПРАВЛЕНИЯ МОДАЛЬНЫМ ОКНОМ
  const [selectedBlock, setSelectedBlock] = useState<any>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // ОБРАБОТЧИК КЛИКА ПО ЗДАНИЮ
  const handleBuildingClick = (block: any) => {
    setSelectedBlock(block);
    setIsModalOpen(true);
  };

  // РЕНДЕРИНГ СТРАНИЦЫ
  return (
    <>
      <div className={styles.container}>
        {/* ЗАГОЛОВОЧНАЯ СЕКЦИЯ (СКРЫТА) */}
        <header className={styles.header}>
          {/* Короткий заголовок */}
        </header>

        {/* ОСНОВНАЯ СЕКЦИЯ С КАРТОЙ ГОРОДА */}
        <main className={styles.main}>
          <div className={styles.cityMapContainer}>
            <div className={styles.cityMapLarge}>
              {/* РЕНДЕРИНГ ВСЕХ ЗДАНИЙ-БЛОКОВ */}
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

      {/* МОДАЛЬНОЕ ОКНО ДЛЯ ВЫБРАННОГО БЛОКА */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        block={selectedBlock}
      />
    </>
  );
}