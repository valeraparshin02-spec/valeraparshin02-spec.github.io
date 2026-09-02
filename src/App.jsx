import { useState } from 'react'
import { cases } from './data/cases.js'
import { TELEGRAM_URL } from './config.js'

const services = [
  {
    number: '01',
    title: 'Сайт с нуля',
    text: 'Помогаю собрать структуру, визуальную подачу и рабочую версию — от первого экрана до форм.',
  },
  {
    number: '02',
    title: 'Доработка сайта',
    text: 'Привожу в порядок мобильную версию, логику блоков, страницы, квизы и пользовательский путь.',
  },
  {
    number: '03',
    title: 'Запуск и связки',
    text: 'Подключаю домен, формы, базовую аналитику и проверяю основные сценарии перед запуском.',
  },
]

const process = [
  ['01', 'Задача', 'Разбираю продукт, аудиторию и действие, к которому должен вести сайт.'],
  ['02', 'Структура', 'Собираю логику страницы и согласовываю направление без лишних экранов.'],
  ['03', 'Сборка', 'Делаю адаптивный интерфейс, формы и необходимые интеграции.'],
  ['04', 'Проверка', 'Прохожу ключевые сценарии на телефоне и компьютере перед передачей.'],
]

function ArrowIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 20 20" width="20" height="20">
      <path d="M4 10h11M11 5l5 5-5 5" fill="none" stroke="currentColor" strokeWidth="1.7" />
    </svg>
  )
}

function TelegramLink({ className = '', children }) {
  if (!TELEGRAM_URL) {
    return (
      <span className={`${className} is-disabled`} aria-disabled="true" title="Контакт будет добавлен перед публикацией">
        {children}
      </span>
    )
  }

  return (
    <a className={className} href={TELEGRAM_URL} target="_blank" rel="noreferrer">
      {children}
    </a>
  )
}

function CaseGallery({ item }) {
  const [activeIndex, setActiveIndex] = useState(0)
  const activeImage = item.images[activeIndex]

  const showPrevious = () => setActiveIndex((index) => (index - 1 + item.images.length) % item.images.length)
  const showNext = () => setActiveIndex((index) => (index + 1) % item.images.length)

  return (
    <div className="case-gallery">
      <a className="browser" href={item.url} target="_blank" rel="noreferrer" aria-label={`Открыть сайт ${item.name} в новой вкладке`}>
        <div className="browser-bar" aria-hidden="true">
          <span className="browser-dots"><i /><i /><i /></span>
          <span className="browser-address">{item.displayUrl}</span>
          <span className="browser-open">↗</span>
        </div>
        <div className="browser-viewport">
          <img key={activeImage.src} src={activeImage.src} alt={activeImage.alt} loading="lazy" />
          <span className="browser-visit">Открыть сайт <ArrowIcon /></span>
        </div>
      </a>
      <div className="gallery-controls" aria-label={`Галерея проекта ${item.name}`}>
        <button className="gallery-arrow" type="button" onClick={showPrevious} aria-label="Предыдущий экран">←</button>
        <div className="gallery-thumbs" role="tablist" aria-label="Скриншоты проекта">
          {item.images.map((image, index) => (
            <button
              className={`gallery-thumb${index === activeIndex ? ' is-active' : ''}`}
              key={image.src}
              type="button"
              role="tab"
              aria-selected={index === activeIndex}
              aria-label={`Показать экран ${index + 1}`}
              onClick={() => setActiveIndex(index)}
            >
              <img src={image.src} alt="" loading="lazy" />
            </button>
          ))}
        </div>
        <button className="gallery-arrow" type="button" onClick={showNext} aria-label="Следующий экран">→</button>
      </div>
      <p className="gallery-caption" aria-live="polite">Экран {activeIndex + 1} из {item.images.length} · нажмите на большой кадр, чтобы открыть сайт</p>
    </div>
  )
}

function App() {
  return (
    <div className="site-shell">
      <a className="skip-link" href="#main">К содержанию</a>

      <header className="header">
        <a className="wordmark" href="#top" aria-label="Наверх">
          <span>Валерий Паршин</span>
          <small>сайты / digital</small>
        </a>
        <nav className="nav" aria-label="Основная навигация">
          <a href="#cases">Кейсы</a>
          <a href="#services">Услуги</a>
          <a href="#process">Процесс</a>
        </nav>
        <a className="header-contact" href="#contact">Обсудить задачу <ArrowIcon /></a>
      </header>

      <main id="main">
        <section className="hero" id="top">
          <div className="hero-index" aria-hidden="true">Портфолио · 2026</div>
          <div className="hero-copy">
            <p className="eyebrow">Разработка · дизайн · запуск</p>
            <h1>Сайты под задачу бизнеса — <em>от идеи</em> до работающего запуска</h1>
          </div>
          <div className="hero-aside">
            <figure className="hero-portrait">
              <img src="/valeriy-parshin.jpg" alt="Валерий Паршин" />
              <figcaption>
                <strong>Валерий Паршин</strong>
                <span>Казань · удалённо</span>
              </figcaption>
            </figure>
            <p>Я Валерий. Собираю структуру, дизайн и техническую часть и веду задачу без лишних посредников.</p>
            <a className="text-link" href="#cases">Смотреть работы <ArrowIcon /></a>
          </div>
          <div className="hero-note">
            <span>Подхожу, если нужен не просто экран,</span>
            <strong>а понятный рабочий инструмент.</strong>
          </div>
        </section>

        <section className="cases section" id="cases" aria-labelledby="cases-title">
          <div className="section-heading">
            <p className="eyebrow">Выбранные работы</p>
            <h2 id="cases-title">Живые сайты, которые можно открыть</h2>
            <p>Каждый кейс ведёт на опубликованный проект. Ниже — только то, что действительно было реализовано.</p>
          </div>

          <div className="case-list">
            {cases.map((item) => (
              <article className="case" key={item.id}>
                <CaseGallery item={item} />
                <div className="case-copy">
                  <div className="case-meta">
                    <span>{item.number}</span>
                    <span>{item.type}</span>
                  </div>
                  <h3>{item.name}</h3>
                  <p className="case-summary">{item.summary}</p>
                  {item.contribution && <p className="case-contribution">{item.contribution}</p>}
                  <div className="delivered">
                    <h4>Что реализовано</h4>
                    <ul>
                      {item.delivered.map((point) => <li key={point}>{point}</li>)}
                    </ul>
                  </div>
                  <div className="case-actions">
                    <a className="text-link" href={item.url} target="_blank" rel="noreferrer">Открыть сайт <ArrowIcon /></a>
                    {item.secondaryUrl && (
                      <a className="quiet-link" href={item.secondaryUrl} target="_blank" rel="noreferrer">
                        {item.secondaryLabel} ↗
                      </a>
                    )}
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="services section" id="services" aria-labelledby="services-title">
          <div className="section-heading compact">
            <p className="eyebrow">Чем могу помочь</p>
            <h2 id="services-title">Собрать, улучшить или довести до запуска</h2>
          </div>
          <div className="service-list">
            {services.map((service) => (
              <article className="service" key={service.number}>
                <span>{service.number}</span>
                <h3>{service.title}</h3>
                <p>{service.text}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="process section" id="process" aria-labelledby="process-title">
          <div className="section-heading compact">
            <p className="eyebrow">Как строится работа</p>
            <h2 id="process-title">Один человек, один контекст, четыре понятных этапа</h2>
          </div>
          <ol className="process-list">
            {process.map(([number, title, text]) => (
              <li key={number}>
                <span>{number}</span>
                <div><h3>{title}</h3><p>{text}</p></div>
              </li>
            ))}
          </ol>
        </section>

        <section className="contact section" id="contact" aria-labelledby="contact-title">
          <p className="eyebrow">Есть задача?</p>
          <h2 id="contact-title">Покажите, что нужно сделать. Я предложу понятный следующий шаг.</h2>
          <p className="contact-copy">Можно прислать ссылку на текущий сайт, короткое ТЗ или просто описать задачу своими словами.</p>
          <TelegramLink className="contact-button">Написать в Telegram <ArrowIcon /></TelegramLink>
          {!TELEGRAM_URL && <small className="contact-todo">Точная ссылка на Telegram будет добавлена перед публикацией.</small>}
        </section>
      </main>

      <footer className="footer">
        <span>Валерий · сайты и digital</span>
        <a href="#top">Наверх ↑</a>
      </footer>
    </div>
  )
}

export default App
