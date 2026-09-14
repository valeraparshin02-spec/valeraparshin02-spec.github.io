'use client'

import { useEffect, useRef, useState } from 'react'
import { cases } from './data/cases.js'
import { TELEGRAM_URL } from './config.js'

const navigation = [['Кейсы', '#cases'], ['Услуги', '#services'], ['Подход', '#approach'], ['Процесс', '#process']]
const services = [
  { title: 'Маркетинг и стратегия', subtitle: 'Когда нужен понятный план роста', text: 'Разбираю продукт, аудиторию и текущую воронку. Нахожу слабые места, формулирую оффер и собираю приоритеты для запуска.', tags: ['Аудит', 'Оффер', 'Воронка', 'План действий'], result: 'На выходе — приоритеты, рекомендации и задачи для команды.' },
  { title: 'Сайты и digital-продукты', subtitle: 'Когда бизнесу нужна сильная площадка', text: 'От посадочной страницы до каталога: проектирую путь клиента, разрабатываю дизайн, собираю сайт и подключаю необходимые интеграции.', tags: ['Лендинги', 'Каталоги', 'Корпоративные сайты'], result: 'На выходе — адаптивный сайт с работающим сценарием обращения.' },
  { title: 'Запуск и доработка', subtitle: 'Когда сайт уже есть, а связки не хватает', text: 'Проверяю формы, мобильную версию и путь до обращения. Подключаю аналитику, исправляю узкие места и готовлю площадку к трафику.', tags: ['Аналитика', 'Формы и квизы', 'Интеграции', 'QA'], result: 'На выходе — проверенные сценарии и измеримые действия на сайте.' },
]
const process = [
  ['Знакомимся с задачей', 'Обсуждаем продукт, аудиторию и то, что должно измениться. Смотрим, что уже работает.'],
  ['Собираем решение', 'Фиксируем объём, этапы и стоимость. Согласовываем оффер и структуру до начала разработки.'],
  ['Делаем и сверяемся', 'Прорабатываю дизайн и реализацию. Показываю промежуточные результаты, чтобы двигаться в одном направлении.'],
  ['Проверяем и запускаем', 'Проходим путь клиента на телефоне и компьютере. Проверяем формы, ссылки и подключённую аналитику.'],
]
const orderedCases = ['altera-estate', 'twin-line', 'altera-it', 'taro-hackersha', 'dom-na-tufana', 'altera-novostroy', 'altera-vtorichka'].map(id => cases.find(item => item.id === id))

function Arrow({ diagonal = false, ...props }) {
  return <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true" {...props}><path d={diagonal ? 'M6 18 18 6M6 6h12v12' : 'M4 12h15m-6-6 6 6-6 6'} stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" /></svg>
}

function ContactLink({ children = 'Обсудить задачу', className = '', ...props }) {
  return <a className={className} href={TELEGRAM_URL} target="_blank" rel="noopener noreferrer" {...props}>{children}<Arrow diagonal /></a>
}

function CaseGallery({ item }) {
  const [index, setIndex] = useState(0)
  const image = item.images[index]
  return <div className={`case-gallery gallery-${item.id}`}>
    <div className="project-frame">
      <div className="frame-bar"><span className="frame-dots" aria-hidden="true"><i /><i /><i /></span><span>{item.displayUrl}</span><Arrow diagonal width="14" height="14" /></div>
      <a href={item.url} target="_blank" rel="noopener noreferrer" aria-label={`Открыть сайт ${item.name}`}><img src={image.src} alt={image.alt} width="1265" height="712" loading="lazy" decoding="async" /></a>
    </div>
    <div className="gallery-bottom">
      <p aria-live="polite">{String(index + 1).padStart(2, '0')} <span>/ {String(item.images.length).padStart(2, '0')} экранов</span></p>
      <div className="gallery-dots" aria-label={`Экраны ${item.name}`}>{item.images.map((img, i) => <button type="button" key={img.src} aria-label={`Показать экран ${i + 1} проекта ${item.name}`} aria-pressed={i === index} onClick={() => setIndex(i)}><span /></button>)}</div>
      <div className="gallery-arrows"><button type="button" aria-label={`Предыдущий экран ${item.name}`} onClick={() => setIndex((index + item.images.length - 1) % item.images.length)}>←</button><button type="button" aria-label={`Следующий экран ${item.name}`} onClick={() => setIndex((index + 1) % item.images.length)}>→</button></div>
    </div>
  </div>
}

function Project({ item, featured = false }) {
  return <article className={`project${featured ? ' project-featured' : ''}`}>
    <CaseGallery item={item} />
    <div className="project-copy">
      <p className="project-type">{item.type}</p>
      <div className="project-title"><h3>{item.name}</h3><a className="project-open" href={item.url} target="_blank" rel="noopener noreferrer" aria-label={`Открыть ${item.name}`}><Arrow diagonal /></a></div>
      <p className="project-summary">{item.summary}</p>
      {featured ? <div className="featured-delivery"><p className="label">Что внутри</p><ul>{item.delivered.map(point => <li key={point}>{point}</li>)}</ul>{item.contribution && <p className="contribution">{item.contribution}</p>}</div> : <details className="project-details"><summary>Что сделано <span aria-hidden="true">+</span></summary><ul>{item.delivered.map(point => <li key={point}>{point}</li>)}</ul>{item.contribution && <p className="contribution">{item.contribution}</p>}</details>}
      {item.note && <p className="project-note">* {item.note}</p>}
      {featured && <a href={item.url} className="text-link" target="_blank" rel="noopener noreferrer">Посмотреть сайт <Arrow diagonal /></a>}
      {item.secondaryUrl && <a href={item.secondaryUrl} className="secondary-link" target="_blank" rel="noopener noreferrer">{item.secondaryLabel} ↗</a>}
    </div>
  </article>
}

function Portfolio() {
  const [menuOpen, setMenuOpen] = useState(false)
  const menuButton = useRef(null)
  useEffect(() => {
    if (!menuOpen) return
    const close = event => { if (event.key === 'Escape') { setMenuOpen(false); menuButton.current?.focus() } }
    document.addEventListener('keydown', close)
    return () => document.removeEventListener('keydown', close)
  }, [menuOpen])

  return <div className="site-shell">
    <a className="skip-link" href="#main">К содержанию</a>
    <header className="header"><div className="header-inner">
      <a className="wordmark" href="#top" onClick={() => setMenuOpen(false)} aria-label="Валерий Паршин — на главную"><span className="monogram">вп<span>.</span></span><span className="wordmark-name">Валерий Паршин<small>маркетинг и сайты</small></span></a>
      <nav className={`navigation${menuOpen ? ' is-open' : ''}`} id="navigation" aria-label="Основная навигация">{navigation.map(([label, href]) => <a key={href} href={href} onClick={() => setMenuOpen(false)}>{label}</a>)}</nav>
      <div className="header-actions"><a href="#contact" className="header-contact" onClick={() => setMenuOpen(false)}>На связи <Arrow diagonal /></a><button ref={menuButton} className="menu-toggle" aria-controls="navigation" aria-expanded={menuOpen} aria-label={menuOpen ? 'Закрыть меню' : 'Открыть меню'} onClick={() => setMenuOpen(!menuOpen)}><span /><span /></button></div>
    </div></header>
    <main id="main">
      <section className="hero container" id="top" aria-labelledby="hero-title">
        <div className="hero-copy"><p className="eyebrow">Независимый маркетолог и разработчик</p><h1 id="hero-title">Из интереса —<br /><span>в заявку.</span></h1><p className="hero-description">Соединяю маркетинг, дизайн и разработку, чтобы вашему клиенту было понятно, <strong>почему выбрать вас и как сделать следующий шаг.</strong></p><div className="hero-actions"><ContactLink className="button button-blue" /><a href="#cases" className="text-link">Смотреть работы <span aria-hidden="true">↓</span></a></div><div className="hero-person"><img src="/valeriy-parshin.jpg" alt="" width="48" height="48" /><p>Валерий Паршин<span>Казань · работаю по всей России</span></p></div></div>
        <div className="hero-work" aria-label="Примеры моих работ"><div className="work-board-label"><span>От идеи до работающего сайта</span><span aria-hidden="true">↗</span></div><a className="hero-preview hero-preview-main" href="#cases" aria-label="Смотреть кейс Altera Estate"><div className="mini-bar"><span>Altera Estate</span><Arrow diagonal width="14" height="14" /></div><img src="/cases/altera-estate/01.webp" alt="Главная страница Altera Estate" width="1265" height="712" fetchPriority="high" /></a><a className="hero-preview hero-preview-secondary" href="#cases" aria-label="Смотреть кейс Твин Лайн"><div className="mini-bar"><span>Твин Лайн</span><Arrow diagonal width="14" height="14" /></div><img src="/cases/twin-line/01.webp" alt="Сайт производителя Твин Лайн" width="1265" height="712" /></a><div className="work-board-footer"><span>Стратегия</span><span aria-hidden="true">→</span><span>Сайт</span><span aria-hidden="true">→</span><span className="board-result">Заявка <Arrow diagonal width="15" height="15" /></span></div></div>
        <div className="hero-bottom"><p>Один специалист.<br /><strong>Весь путь клиента.</strong></p><div className="expertise"><span>Маркетинг</span><span>Дизайн</span><span>Разработка</span><span>Аналитика</span></div><a href="#cases" aria-label="Перейти к кейсам" className="scroll-link">Листайте дальше <span>↓</span></a></div>
      </section>
      <section className="work-section container section" id="cases" aria-labelledby="cases-title"><div className="section-heading"><div><p className="eyebrow">Портфолио / выбранные проекты</p><h2 id="cases-title">Вместо обещаний —<br /><span className="muted">работы.</span></h2></div><p className="heading-note">Недвижимость, производство, IT и образование. В каждом проекте — своя задача и свой путь клиента.</p></div><Project item={orderedCases[0]} featured /><div className="project-grid">{orderedCases.slice(1).map(item => <Project key={item.id} item={item} />)}</div></section>
      <section className="services-section section" id="services" aria-labelledby="services-title"><div className="container"><div className="section-heading"><div><p className="eyebrow">Чем могу помочь</p><h2 id="services-title">Подключусь там,<br />где нужен результат.</h2></div><p className="heading-note">Можно начать с отдельной задачи по маркетингу или собрать весь проект вместе.</p></div><div className="services-grid">{services.map((service, i) => <article className="service" key={service.title}><span className={`service-icon icon-${i}`} aria-hidden="true">{['↗', '↔', '↳'][i]}</span><p className="service-subtitle">{service.subtitle}</p><h3>{service.title}</h3><p>{service.text}</p><div className="tags">{service.tags.map(tag => <span key={tag}>{tag}</span>)}</div><p className="service-result">{service.result}</p><a className="text-link" href="#contact">Обсудить задачу <Arrow /></a></article>)}</div><div className="marketing-note" id="marketing"><strong>Маркетинг — и без нового сайта.</strong><p>Если задача в оффере, стратегии или воронке, подключусь к ней отдельно.</p><a href="#contact" aria-label="Обсудить маркетинг"><Arrow diagonal /></a></div></div></section>
      <section className="approach-section section" id="approach" aria-labelledby="approach-title"><div className="container approach-layout"><div><p className="eyebrow">Мой подход</p><h2 id="approach-title">Красивый сайт —<br />это начало.<br /><span>Дальше — бизнес.</span></h2></div><div className="approach-copy"><p className="approach-lead">Трафик — не главное.<br />Главное — заявка.</p><p>Начинаю с того, кто ваш клиент, зачем ему продукт и что мешает обратиться. Из этого складываются оффер, структура и дизайн.</p><p>Сайт должен зарабатывать, а не просто хорошо выглядеть. Поэтому на этапе запуска проверяю весь путь: от первого экрана до отправленной заявки.</p><a href="#process" className="text-link">Как это устроено <Arrow /></a></div><div className="customer-path" aria-label="Путь клиента"><div><span>Заинтересовать</span><p>Понятный оффер</p></div><i aria-hidden="true">→</i><div><span>Убедить</span><p>Смысл и доказательства</p></div><i aria-hidden="true">→</i><div><span>Привести к действию</span><p>Удобный следующий шаг</p></div></div></div></section>
      <section className="process-section container section" id="process" aria-labelledby="process-title"><div className="section-heading"><div><p className="eyebrow">Процесс</p><h2 id="process-title">Понятно на каждом этапе.</h2></div><p className="heading-note">Вы общаетесь со мной напрямую.<br />Я сохраняю контекст от задачи до запуска.</p></div><ol className="process-list">{process.map(([title, text], i) => <li key={title}><span className="step-number">0{i + 1}</span><h3>{title}</h3><p>{text}</p></li>)}</ol></section>
      <section className="about-section container" aria-labelledby="about-title"><div className="about-photo"><img src="/valeriy-parshin.webp" alt="Валерий Паршин в Казани" width="680" height="850" loading="lazy" decoding="async" /></div><div className="about-copy"><p className="eyebrow">Кто будет работать над проектом</p><h2 id="about-title">Валерий Паршин.<br /><span className="muted">Рад знакомству.</span></h2><p>Я маркетолог, который умеет довести идею до работающего сайта. Соединяю бизнес-задачу, смыслы и техническую реализацию — так решения остаются связанными между собой.</p><div className="about-facts"><div><strong>6 лет</strong><span>в маркетинге и digital</span></div><div><strong>Казань</strong><span>проекты по всей России</span></div></div><ContactLink className="text-link">Давайте знакомиться</ContactLink></div></section>
      <section className="contact-section container" id="contact" aria-labelledby="contact-title"><div className="contact-inner"><div className="contact-topline"><p className="eyebrow">Следующий шаг</p><span>Маркетинг / Сайты / Запуск</span></div><h2 id="contact-title">Что сделаем<br /><span>для вашего бизнеса?</span></h2><div className="contact-bottom"><p>Пришлите ссылку на сайт или расскажите об идее.<br />Разберёмся, с чего начать и какое решение подойдёт.</p><ContactLink className="button button-white">Написать в Telegram</ContactLink></div></div></section>
    </main>
    <footer className="footer container"><a className="footer-name" href="#top">Валерий Паршин<span>Маркетинг и сайты под задачу бизнеса</span></a><span>© {new Date().getFullYear()}</span><a className="back-top" href="#top">Наверх ↑</a></footer>
  </div>
}

export default Portfolio
