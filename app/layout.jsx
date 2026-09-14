import '../src/portfolio.css'

const title = 'Валерий Паршин — маркетинг, сайты и запуск'
const description = 'Соединяю маркетинг, дизайн и разработку. Реальные проекты, понятный процесс и прямая связь.'

export const metadata = {
  metadataBase: new URL('https://valeriy-parshin-portfolio.valeraparshin02.chatgpt.site'),
  title,
  description,
  icons: { icon: '/favicon.svg' },
  openGraph: {
    title,
    description,
    type: 'website',
    images: [
      {
        url: '/og.png',
        width: 1200,
        height: 630,
        alt: 'Валерий Паршин — сайты под задачу бизнеса',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title,
    description,
    images: ['/og.png'],
  },
}

export default function RootLayout({ children }) {
  return (
    <html lang="ru">
      <body>{children}</body>
    </html>
  )
}
