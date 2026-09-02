import '../src/styles.css'

const title = 'Валерий Паршин — сайты под задачу бизнеса'
const description = 'Портфолио Валерия Паршина: разработка, дизайн и запуск сайтов.'

export const metadata = {
  metadataBase: new URL('https://valeriy-parshin-portfolio.valeraparshin02.chatgpt.site'),
  title,
  description,
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
