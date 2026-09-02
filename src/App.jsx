'use client'

import { useEffect, useState } from 'react'
import { cases } from './data/cases.js'
import { TELEGRAM_URL } from './config.js'

const services = [
  {
    number: '01',
    title: 'Маркетинговая основа',
    text: 'Разбираю аудиторию, оффер и путь клиента, чтобы сайт говорил с нужными людьми и вёл к действию.',
  },
  {
    number: '02',
    title: 'Сайт под задачу',
    text: 'Собираю структуру, дизайн, адаптив, квизы и формы — от первого экрана до понятного пользовательского пути.',
  },
  {
    number: '03',
    title: 'Запуск и связки',
    text: 'Подключаю домен, формы и базовую аналитику, проверяю сценарии и помогаю встроить сайт в маркетинг.',
  },
]

const process = [
  ['01', 'Задача и маркетинг', 'Разбираю продукт, аудиторию, оффер и действие, к которому должен вести сайт.'],
  ['02', 'Структура', 'Собираю логику страницы и согласовываю направление без лишних экранов.'],
  ['03', 'Сборка', 'Делаю адаптивный интерфейс, формы и необходимые интеграции.'],
  ['04', 'Проверка', 'Прохожу ключевые сценарии на телефоне и компьютере перед передачей.'],
]

const marketingTasks = [
  ['01', 'Маркетинговый аудит', 'Разбираю текущую точку: где теряется клиент, что мешает заявке и какие шаги дадут наибольший эффект.'],
  ['02', 'Оффер и воронка', 'Помогаю сформулировать, кому и что говорить, а также выстроить путь клиента до целевого действия.'],
  ['03', 'План запуска', 'Собираю приоритеты, точки аналитики и понятное ТЗ для команды — даже если разработка сайта сейчас не нужна.'],
]

function ArrowIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 20 20" width="20" height="20">
      <path d="M4 10h11M11 5l5 5-5 5" fill="none" stroke="currentColor" strokeWidth="1.7" />
    </svg>
  )
}

function TelegramLink({ className = '', children, ...props }) {
  if (!TELEGRAM_URL) {
    return (
      <span className={`${className} is-disabled`} aria-disabled="true" title="Контакт будет добавлен перед публикацией" {...props}>
        {children}
      </span>
    )
  }

  return (
    <a className={className} href={TELEGRAM_URL} target="_blank" rel="noreferrer" {...props}>
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
  useEffect(() => {
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduceMotion) return undefined

    document.documentElement.classList.add('motion-ready')
    const targets = document.querySelectorAll('[data-reveal]')
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible')
          observer.unobserve(entry.target)
        }
      })
    }, { threshold: 0.14 })

    targets.forEach((target) => observer.observe(target))

    const hero = document.querySelector('.hero')
    const magneticTargets = document.querySelectorAll('[data-magnetic]')
    const onHeroPointerMove = (event) => {
      if (!hero) return
      const { left, top, width, height } = hero.getBoundingClientRect()
      const x = (event.clientX - left) / width
      const y = (event.clientY - top) / height
      hero.style.setProperty('--hero-pointer-x', `${Math.min(Math.max(x, 0), 1) * 100}%`)
      hero.style.setProperty('--hero-pointer-y', `${Math.min(Math.max(y, 0), 1) * 100}%`)
      hero.style.setProperty('--hero-shift-x', `${(0.5 - x) * 20}px`)
      hero.style.setProperty('--hero-shift-y', `${(0.5 - y) * 16}px`)
    }
    const resetHeroPointer = () => {
      hero?.style.removeProperty('--hero-pointer-x')
      hero?.style.removeProperty('--hero-pointer-y')
      hero?.style.removeProperty('--hero-shift-x')
      hero?.style.removeProperty('--hero-shift-y')
    }
    const magneticHandlers = Array.from(magneticTargets).map((target) => {
      const onPointerMove = (event) => {
        const { left, top, width, height } = target.getBoundingClientRect()
        target.style.setProperty('--magnetic-x', `${(event.clientX - left - width / 2) * 0.12}px`)
        target.style.setProperty('--magnetic-y', `${(event.clientY - top - height / 2) * 0.12}px`)
      }
      const resetMagnet = () => {
        target.style.removeProperty('--magnetic-x')
        target.style.removeProperty('--magnetic-y')
      }
      target.addEventListener('pointermove', onPointerMove)
      target.addEventListener('pointerleave', resetMagnet)
      return { target, onPointerMove, resetMagnet }
    })
    hero?.addEventListener('pointermove', onHeroPointerMove)
    hero?.addEventListener('pointerleave', resetHeroPointer)

    const navigationLinks = Array.from(document.querySelectorAll('.nav a[href^="#"]'))
    const getLayoutTop = (target) => {
      let top = 0
      let current = target
      while (current) {
        top += current.offsetTop || 0
        current = current.offsetParent
      }
      return top
    }
    const navigationHandlers = navigationLinks.map((link) => {
      const onNavigate = (event) => {
        const target = document.querySelector(link.getAttribute('href'))
        if (!target) return

        event.preventDefault()
        const headerHeight = document.querySelector('.header')?.offsetHeight || 0
        window.history.pushState(null, '', link.getAttribute('href'))
        window.scrollTo({ top: Math.max(0, getLayoutTop(target) - headerHeight - 18), behavior: 'smooth' })
      }
      link.addEventListener('click', onNavigate)
      return { link, onNavigate }
    })

    let sceneContext
    let sceneMedia
    let sceneDisposed = false
    const siteShell = document.querySelector('.site-shell')

    void Promise.all([import('gsap'), import('gsap/ScrollTrigger')]).then(([gsapModule, scrollTriggerModule]) => {
      if (sceneDisposed || !hero || !siteShell) return

      const gsap = gsapModule.gsap
      const ScrollTrigger = scrollTriggerModule.ScrollTrigger
      gsap.registerPlugin(ScrollTrigger)

      sceneContext = gsap.context(() => {
        sceneMedia = gsap.matchMedia()
        const createCameraDive = ({ scale, blur, skip = [] }) => {
          gsap.utils.toArray('[data-scene]').forEach((scene) => {
            if (skip.includes(scene.id)) return
            gsap.fromTo(scene, {
              autoAlpha: 0.28,
              scale,
              filter: `blur(${blur}px)`,
              transformOrigin: '50% 50%',
            }, {
              autoAlpha: 1,
              scale: 1,
              filter: 'blur(0px)',
              ease: 'none',
              scrollTrigger: {
                trigger: scene,
                start: 'top 125%',
                end: scene.id === 'contact' ? 'bottom bottom' : 'top 8%',
                scrub: scene.id === 'contact' ? 0.35 : 1.05,
                invalidateOnRefresh: true,
              },
            })
          })
        }

        sceneMedia.add('(min-width: 720px)', () => createCameraDive({ scale: 0.46, blur: 10 }))
        sceneMedia.add('(max-width: 719px)', () => createCameraDive({ scale: 0.64, blur: 6, skip: ['cases'] }))
      }, siteShell)
    })

    return () => {
      sceneDisposed = true
      sceneMedia?.revert()
      sceneContext?.revert()
      observer.disconnect()
      hero?.removeEventListener('pointermove', onHeroPointerMove)
      hero?.removeEventListener('pointerleave', resetHeroPointer)
      magneticHandlers.forEach(({ target, onPointerMove, resetMagnet }) => {
        target.removeEventListener('pointermove', onPointerMove)
        target.removeEventListener('pointerleave', resetMagnet)
      })
      navigationHandlers.forEach(({ link, onNavigate }) => link.removeEventListener('click', onNavigate))
      document.documentElement.classList.remove('motion-ready')
    }
  }, [])

  return (
    <div className="site-shell">
      <a className="skip-link" href="#main">К содержанию</a>

      <header className="header">
        <a className="wordmark" href="#top" aria-label="Наверх">
          <span><i aria-hidden="true" />Валерий Паршин</span>
          <small>маркетинг / web / digital</small>
        </a>
        <nav className="nav" aria-label="Основная навигация">
          <a href="#approach">Подход</a>
          <a href="#cases">Кейсы</a>
          <a href="#services">Услуги</a>
          <a href="#process">Процесс</a>
        </nav>
        <a className="header-contact" href="#contact" data-magnetic>Обсудить задачу <ArrowIcon /></a>
      </header>

      <main id="main">
        <section className="hero" id="top">
          <div className="hero-index" aria-hidden="true">01 / Сайт как инструмент продаж</div>
          <div className="hero-copy" data-reveal>
            <p className="eyebrow"><i aria-hidden="true" />Маркетинг, сайт и запуск в одной связке</p>
            <h1>
              <span className="hero-line"><span>Трафик —</span></span>
              <span className="hero-line"><span>не главное.</span></span>
              <span className="hero-line"><em>Главное — заявка.</em></span>
            </h1>
          </div>
          <div className="hero-aside" data-reveal>
            <p>Сначала нахожу, где клиент теряется: в оффере, структуре или пути до заявки. Потом собираю сайт и запуск, которые эту проблему решают.</p>
            <a className="text-link" href="#contact">Разобрать задачу <ArrowIcon /></a>
            <figure className="hero-portrait">
              <img src="/valeriy-parshin.png" alt="Валерий Паршин" />
              <figcaption>
                <strong>Валерий Паршин</strong>
                <span>Маркетинг + сайты · 6 лет в digital</span>
              </figcaption>
              <div className="hero-signal" aria-label="6 лет в маркетинге" data-reveal>
                <strong>6</strong>
                <span>лет<br />в маркетинге</span>
              </div>
              <div className="hero-stickers" aria-hidden="true">
                <span className="hero-sticker hero-sticker--roi">ROI</span>
                <span className="hero-sticker hero-sticker--arrow">↗</span>
                <span className="hero-sticker hero-sticker--spark">✦</span>
              </div>
            </figure>
          </div>
          <span className="hero-orbit" aria-hidden="true" />
          <div className="hero-note" data-reveal>
            <span>Красиво — не достаточно:</span>
            <strong>сайт должен зарабатывать, а не просто хорошо выглядеть.</strong>
          </div>
        </section>

        <div className="signal-strip" aria-hidden="true">
          <div className="signal-track">
            <div className="signal-group">
              <span>Стратегия</span><i>✦</i><span>Оффер</span><i>✦</i><span>Сайт</span><i>✦</i><span>Запуск</span><i>✦</i><span>Заявки</span>
            </div>
            <div className="signal-group">
              <span>Стратегия</span><i>✦</i><span>Оффер</span><i>✦</i><span>Сайт</span><i>✦</i><span>Запуск</span><i>✦</i><span>Заявки</span>
            </div>
          </div>
        </div>

        <section className="positioning section" id="approach" aria-labelledby="approach-title" data-reveal data-scene="cobalt">
          <div className="positioning-copy">
            <p className="eyebrow">Что делаю с этой проблемой</p>
            <h2 id="approach-title">Превращаю сайт из красивой страницы в понятный путь к заявке.</h2>
            <p>Не начинаю с макета. Сначала разбираю продукт, аудиторию и действие, которого ждём от человека. Потом формулирую оффер, собираю логику страницы и только после этого делаю дизайн и запуск.</p>
          </div>
          <dl className="positioning-facts">
            <div>
              <dt>01</dt>
              <dd>Находим, где теряются заявки</dd>
            </div>
            <div>
              <dt>02</dt>
              <dd>Собираем оффер и путь клиента</dd>
            </div>
            <div>
              <dt>03</dt>
              <dd>Делаем сайт и запускаем связку</dd>
            </div>
          </dl>
        </section>

        <section className="cases section" id="cases" aria-labelledby="cases-title" data-reveal data-scene="milk">
          <div className="section-heading">
            <p className="eyebrow">Выбранные работы</p>
            <h2 id="cases-title">Живые сайты, которые можно открыть</h2>
            <p>Каждый кейс ведёт на опубликованный проект. Ниже — только то, что действительно было реализовано.</p>
          </div>

          <div className="case-list">
            {cases.map((item) => (
              <article className="case" key={item.id} data-reveal>
                <CaseGallery item={item} />
                <div className="case-copy">
                  <div className="case-meta">
                    <span>{item.number}</span>
                    <span>{item.type}</span>
                  </div>
                  <h3>{item.name}</h3>
                  <p className="case-summary">{item.summary}</p>
                  {item.note && <p className="case-note">* {item.note}</p>}
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

        <section className="services section" id="services" aria-labelledby="services-title" data-reveal data-scene="paper">
          <div className="section-heading compact">
            <p className="eyebrow">Чем могу помочь</p>
            <h2 id="services-title">Соединить маркетинг, сайт и запуск в одном проекте</h2>
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

        <section className="marketing-only section" id="marketing" aria-labelledby="marketing-title" data-reveal>
          <div className="marketing-only-copy">
            <p className="eyebrow">Можно подключить без разработки</p>
            <h2 id="marketing-title">Не всегда нужно начинать с нового сайта.</h2>
            <p>Если проблема в стратегии, оффере или пути клиента, не буду предлагать разработку ради разработки. Могу подключиться к маркетинговой задаче отдельно и собрать понятный следующий шаг.</p>
          </div>
          <div className="marketing-task-list">
            {marketingTasks.map(([number, title, text]) => (
              <article className="marketing-task" key={number}>
                <span>{number}</span>
                <h3>{title}</h3>
                <p>{text}</p>
              </article>
            ))}
          </div>
          <a className="text-link marketing-only-link" href="#contact">Обсудить маркетинговую задачу <ArrowIcon /></a>
        </section>

        <section className="process section" id="process" aria-labelledby="process-title" data-reveal data-scene="paper">
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

        <section className="contact section" id="contact" aria-labelledby="contact-title" data-reveal data-scene="ink">
          <p className="eyebrow">Есть задача?</p>
          <h2 id="contact-title">Покажите, что нужно сделать. Я предложу понятный следующий шаг.</h2>
          <p className="contact-copy">Можно прислать ссылку на текущий сайт, короткое ТЗ или просто описать задачу своими словами.</p>
          <TelegramLink className="contact-button" data-magnetic>Написать в Telegram <ArrowIcon /></TelegramLink>
          {!TELEGRAM_URL && <small className="contact-todo">Точная ссылка на Telegram будет добавлена перед публикацией.</small>}
        </section>
      </main>

      <TelegramLink className="floating-contact" data-magnetic>
        <span className="floating-contact-dot" aria-hidden="true" />
        Написать мне <ArrowIcon />
      </TelegramLink>

      <footer className="footer">
        <span>Валерий · сайты и digital</span>
        <a href="#top">Наверх ↑</a>
      </footer>
    </div>
  )
}

export default App
