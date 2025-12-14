// app/instruction/page.tsx
// Страница с инструкцией по использованию программы

'use client';

export default function InstructionPage() {
  return (
    <div style={{ 
      minHeight: '100vh', 
      background: '#ffffff',
      padding: '3rem 1rem' 
    }}>
      {/* КОНТЕЙНЕР ИНСТРУКЦИИ */}
      <div style={{
        maxWidth: '800px',
        margin: '0 auto',
        background: 'white',
        padding: '2.5rem',
        borderRadius: '15px',
        boxShadow: 'var(--shadow)',
        border: '1px solid #e2e8f0'
      }}>
        
        {/* ЗАГОЛОВОЧНАЯ СЕКЦИЯ */}
        <header style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
          <h1 style={{ 
            color: 'var(--primary-dark)', 
            fontSize: '2.2rem',
            marginBottom: '1rem'
          }}>
            Инструкция по работе
          </h1>
          <p style={{ color: 'var(--text-light)', fontSize: '1.1rem' }}>
            Краткое руководство по использованию программы
          </p>
        </header>

        {/* ОСНОВНОЕ СОДЕРЖАНИЕ */}
        <main>
          {/* БЛОК С ОСНОВНЫМИ ШАГАМИ */}
          <div style={{ marginBottom: '2rem' }}>
            <h3 style={{ color: 'var(--primary-blue)', marginBottom: '1rem' }}>
              Основные шаги:
            </h3>
            <ol style={{ 
              paddingLeft: '1.5rem',
              color: 'var(--text-dark)',
              lineHeight: '1.7'
            }}>
              <li style={{ marginBottom: '1rem' }}>
                <strong>Начните с главной страницы</strong> — выберите нужный раздел в меню
              </li>
              <li style={{ marginBottom: '1rem' }}>
                <strong>Перейдите на карту города</strong> — выберите здание с интересующей темой
              </li>
              <li style={{ marginBottom: '1rem' }}>
                <strong>Изучите теорию</strong> — прочитайте материалы перед тестированием
              </li>
              <li style={{ marginBottom: '1rem' }}>
                <strong>Пройти тест</strong> — ответьте на вопросы и проверьте знания
              </li>
              <li>
                <strong>Посмотрите результаты</strong> — проанализируйте ошибки
              </li>
            </ol>
          </div>
          
        </main>
      </div>
    </div>
  );
}