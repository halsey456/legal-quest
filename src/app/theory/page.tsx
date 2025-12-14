// app/theory/page.tsx
// Страница теории с лекциями и тестами по всем блокам квеста

'use client';

import { blocksData } from '../data/blocks';

export default function TheoryPage() {
  return (
    // Основной контейнер страницы с градиентным фоном
    <div style={{ 
      minHeight: '100vh', 
      background: 'linear-gradient(135deg, #f5f7fa 0%, #e4e7eb 100%)',
      padding: '2rem 1rem' 
    }}>
      {/* ЗАГОЛОВОЧНАЯ СЕКЦИЯ */}
      <header style={{
        textAlign: 'center',
        marginBottom: '3rem',
        padding: '2.5rem 2rem',
        background: 'linear-gradient(135deg, var(--primary-dark) 0%, var(--primary-blue) 100%)',
        color: 'white',
        borderRadius: '20px',
        boxShadow: 'var(--shadow-lg)',
        maxWidth: '900px',
        margin: '0 auto 3rem auto'
      }}>
        <h1 style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>Теория / Лекции</h1>
        <p style={{ fontSize: '1.2rem', opacity: 0.9 }}>Учебные материалы по всем темам квеста</p>
      </header>

      {/* ОСНОВНОЕ СОДЕРЖАНИЕ С ГРИДОМ БЛОКОВ */}
      <main style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))',
          gap: '2rem'
        }}>
          {/* МАППИНГ ВСЕХ БЛОКОВ ИЗ ДАННЫХ */}
          {blocksData.map((block) => (
            <div key={block.id} style={{
              background: 'white',
              borderRadius: '15px',
              overflow: 'hidden',
              boxShadow: 'var(--shadow-lg)',
              transition: 'transform 0.3s ease'
            }}>
              {/* ШАПКА БЛОКА С ИКОНКОЙ И ЗАГОЛОВКОМ */}
              <div style={{ 
                background: block.color, 
                color: 'white',
                padding: '1.5rem',
                display: 'flex',
                alignItems: 'center',
                gap: '1rem'
              }}>
                <div style={{
                  fontSize: '2rem',
                  width: '60px',
                  height: '60px',
                  borderRadius: '50%',
                  background: 'rgba(255, 255, 255, 0.2)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  {block.icon}
                </div>
                <div>
                  <h2 style={{ fontSize: '0.9rem', opacity: 0.9, marginBottom: '0.3rem' }}>Блок {block.id}</h2>
                  <h3 style={{ fontSize: '1.2rem', fontWeight: '600' }}>{block.title}</h3>
                </div>
              </div>
              
              {/* СОДЕРЖИМОЕ БЛОКА С УЧЕБНЫМИ МАТЕРИАЛАМИ */}
              <div style={{ padding: '1.5rem' }}>
                {/* БЛОК 1: ПРАВОНАРУШЕНИЯ */}
                {block.id === 1 && (
                  <>
                    <h4 style={{ color: 'var(--primary-dark)', marginBottom: '1rem' }}>Правонарушения и его виды</h4>
                    <p style={{ color: 'var(--text-dark)', marginBottom: '1rem' }}>
                      <strong>Правонарушение</strong> — виновное, противоправное деяние деликтоспособного лица.
                    </p>
                    <ul style={{ paddingLeft: '1.5rem', color: 'var(--text-dark)' }}>
                      <li style={{ marginBottom: '0.5rem' }}><strong>Административные:</strong> нарушение ПДД, мелкое хулиганство</li>
                      <li style={{ marginBottom: '0.5rem' }}><strong>Гражданско-правовые:</strong> неисполнение договора, причинение вреда</li>
                      <li><strong>Дисциплинарные:</strong> опоздание, прогул, нарушение инструкций</li>
                    </ul>
                  </>
                )}
                
                {/* БЛОК 2: ПРЕСТУПЛЕНИЯ */}
                {block.id === 2 && (
                  <>
                    <h4 style={{ color: 'var(--primary-dark)', marginBottom: '1rem' }}>Преступление и его категории</h4>
                    <p style={{ color: 'var(--text-dark)', marginBottom: '1rem' }}>
                      <strong>Преступление</strong> — виновно совершенное общественно опасное деяние.
                    </p>
                    <ul style={{ paddingLeft: '1.5rem', color: 'var(--text-dark)' }}>
                      <li style={{ marginBottom: '0.5rem' }}><strong>Небольшой тяжести:</strong> до 3 лет лишения свободы</li>
                      <li style={{ marginBottom: '0.5rem' }}><strong>Средней тяжести:</strong> до 5 лет</li>
                      <li style={{ marginBottom: '0.5rem' }}><strong>Тяжкие:</strong> до 10 лет</li>
                      <li><strong>Особо тяжкие:</strong> свыше 10 лет или пожизненно</li>
                    </ul>
                  </>
                )}
                
                {/* БЛОК 3: ЮРИДИЧЕСКАЯ ОТВЕТСТВЕННОСТЬ */}
                {block.id === 3 && (
                  <>
                    <h4 style={{ color: 'var(--primary-dark)', marginBottom: '1rem' }}>Виды юридической ответственности</h4>
                    <ul style={{ paddingLeft: '1.5rem', color: 'var(--text-dark)' }}>
                      <li style={{ marginBottom: '0.5rem' }}><strong>Административная:</strong> за административные правонарушения</li>
                      <li style={{ marginBottom: '0.5rem' }}><strong>Гражданско-правовая:</strong> за причинение имущественного вреда</li>
                      <li style={{ marginBottom: '0.5rem' }}><strong>Дисциплинарная:</strong> за нарушение трудовой дисциплины</li>
                      <li><strong>Уголовная:</strong> за совершение преступлений</li>
                    </ul>
                  </>
                )}
                
                {/* БЛОК 4: ЮРИДИЧЕСКИЕ ПОСЛЕДСТВИЯ */}
                {block.id === 4 && (
                  <>
                    <h4 style={{ color: 'var(--primary-dark)', marginBottom: '1rem' }}>Юридические последствия</h4>
                    <p style={{ color: 'var(--text-dark)' }}>
                      Последствия правонарушений и преступлений: штрафы, арест, лишение свободы, судимость, ограничения в правах.
                    </p>
                  </>
                )}
                
                {/* БЛОК 5: ПРИМЕРЫ ПРАВОНАРУШЕНИЙ */}
                {block.id === 5 && (
                  <>
                    <h4 style={{ color: 'var(--primary-dark)', marginBottom: '1rem' }}>Примеры правонарушений</h4>
                    <ul style={{ paddingLeft: '1.5rem', color: 'var(--text-dark)' }}>
                      <li style={{ marginBottom: '0.5rem' }}><strong>Административные:</strong> мелкое хулиганство, нарушение ПДД</li>
                      <li style={{ marginBottom: '0.5rem' }}><strong>Гражданско-правовые:</strong> неисполнение договора</li>
                      <li><strong>Дисциплинарные:</strong> прогул, опоздание</li>
                    </ul>
                  </>
                )}
                
                {/* БЛОК 6: ПРИМЕРЫ ПРЕСТУПЛЕНИЙ */}
                {block.id === 6 && (
                  <>
                    <h4 style={{ color: 'var(--primary-dark)', marginBottom: '1rem' }}>Примеры преступлений</h4>
                    <ul style={{ paddingLeft: '1.5rem', color: 'var(--text-dark)' }}>
                      <li style={{ marginBottom: '0.5rem' }}><strong>Против жизни:</strong> убийство, причинение вреда здоровью</li>
                      <li style={{ marginBottom: '0.5rem' }}><strong>Против собственности:</strong> кража, грабеж, мошенничество</li>
                      <li><strong>Экономические:</strong> легализация доходов, уклонение от налогов</li>
                    </ul>
                  </>
                )}
                
                {/* БЛОК 7: КВАЛИФИКАЦИЯ */}
                {block.id === 7 && (
                  <>
                    <h4 style={{ color: 'var(--primary-dark)', marginBottom: '1rem' }}>Значение точной квалификации</h4>
                    <ul style={{ paddingLeft: '1.5rem', color: 'var(--text-dark)' }}>
                      <li style={{ marginBottom: '0.5rem' }}><strong>Для граждан:</strong> справедливое наказание</li>
                      <li style={{ marginBottom: '0.5rem' }}><strong>Для правоохранительной системы:</strong> законность решений</li>
                      <li><strong>Для государства:</strong> верховенство права</li>
                    </ul>
                  </>
                )}
                
                {/* КНОПКА ДЛЯ ПЕРЕХОДА К ТЕСТУ */}
                <div style={{ 
                  marginTop: '1.5rem', 
                  paddingTop: '1.5rem', 
                  borderTop: '1px solid var(--light-bg)' 
                }}>
                  <a 
                    href={`/test?block=${block.id}`}
                    style={{
                      display: 'inline-block',
                      padding: '0.8rem 1.5rem',
                      background: 'linear-gradient(135deg, var(--accent-gold) 0%, #ffd700 100%)',
                      color: 'var(--primary-dark)',
                      textDecoration: 'none',
                      borderRadius: '8px',
                      fontWeight: '600',
                      fontSize: '0.9rem'
                    }}
                  >
                    Пройти тест по теме →
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}