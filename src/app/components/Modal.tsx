'use client';

import { useEffect } from 'react';
import styles from './Modal.module.css';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  block: any;
}

export default function Modal({ isOpen, onClose, block }: ModalProps) {
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    
    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    }
    
    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'auto';
    };
  }, [isOpen, onClose]);

  if (!isOpen || !block) return null;

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <button className={styles.closeButton} onClick={onClose} aria-label="Закрыть">
          ×
        </button>
        
        <div className={styles.modalHeader}>
          <div className={styles.blockIcon} style={{ backgroundColor: block.color }}>
            {block.icon}
          </div>
          <div>
            <h2 className={styles.title}>БЛОК #{block.id}</h2>
            <h3 className={styles.subtitle}>{block.title}</h3>
          </div>
        </div>
        
        <div className={styles.modalContent}>
          <div className={styles.learningObjectives}>
            <h4>Темы для изучения:</h4>
            <ul>
              {block.id === 1 && (
                <>
                  <li>Теория термина правонарушение</li>
                  <li>Теория виды правонарушений</li>
                  <li>Теория состав правонарушений</li>
                </>
              )}
              {block.id === 2 && (
                <>
                  <li>Теория термина преступление</li>
                  <li>Теория категории преступлений</li>
                  <li>Теория состав преступлений</li>
                </>
              )}
              {block.id === 3 && (
                <>
                  <li>Административная ответственность</li>
                  <li>Гражданско-правовая ответственность</li>
                  <li>Дисциплинарная ответственность</li>
                  <li>Уголовная ответственность</li>
                </>
              )}
              {block.id === 4 && (
                <>
                  <li>Юридические последствия правонарушений</li>
                  <li>Юридические последствия преступлений</li>
                  <li>Правовые ограничения и последствия</li>
                </>
              )}
              {block.id === 5 && (
                <>
                  <li>Примеры административных правонарушений</li>
                  <li>Примеры гражданско-правовых правонарушений</li>
                  <li>Примеры дисциплинарных правонарушений</li>
                </>
              )}
              {block.id === 6 && (
                <>
                  <li>Примеры преступлений против жизни и здоровья</li>
                  <li>Примеры преступлений против собственности</li>
                  <li>Примеры экономических преступлений</li>
                </>
              )}
              {block.id === 7 && (
                <>
                  <li>Значение для граждан</li>
                  <li>Значение для правоохранительной системы</li>
                  <li>Значение для государства</li>
                </>
              )}
            </ul>
          </div>
        </div>
        
        <div className={styles.modalFooter}>
          <button onClick={onClose} className={styles.secondaryButton}>
            Изучить позже
          </button>
          <a 
            href={`/test?block=${block.id}`} 
            className={styles.primaryButton}
            onClick={(e) => {
              if (!block.id) {
                e.preventDefault();
                alert('Выберите блок для начала теста');
              }
            }}
          >
            <span>Начать расследование</span>
            <svg className={styles.buttonIcon} fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </a>
        </div>
      </div>
    </div>
  );
}