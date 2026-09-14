# Портфолио Валерия

Одностраничное портфолио Валерия Паршина: маркетинг, сайты и запуск.

Актуальный интерфейс: `src/Portfolio.jsx` и `src/portfolio.css`. Данные кейсов: `src/data/cases.js`, контакт: `src/config.js`. Предыдущая реализация сохранена в `src/App.jsx` и `src/styles.css`.

## Запуск

```bash
npm install
npx vite --config vite.github.config.js
```

## Перед публикацией

1. Проверить актуальность Telegram-ссылки в `src/config.js`.
2. Проверить формулировки по кейсам в `src/data/cases.js`.
3. Собрать версию для GitHub Pages: `npm run build:github`. Сборка предварительно рендерит страницу в HTML, затем подключает интерактивность React. Готовая папка: `dist-github`.

Публикация GitHub Pages идёт из ветки `gh-pages`, рабочая копия этой ветки — соседняя папка `portfolio-gh-pages`. Основной адрес: https://valeraparshin02-spec.github.io/.

Шрифты хранятся локально в `public/fonts`, лицензия — `public/fonts/OFL.txt`. Для нового интерфейса используются оптимизированные WebP; исходные PNG сохранены.

Проверка браузером: `node scripts/qa-portfolio.cjs` (нужны Playwright и Edge; по умолчанию URL http://127.0.0.1:4173/, можно задать QA_URL). Проверяет 320–1440 px, якоря, меню, галереи, раскрытие кейсов, изображения и ошибки исполнения. Результаты и скриншоты — в игнорируемой `.qa`.
