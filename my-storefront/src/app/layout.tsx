import { getBaseURL } from "@lib/util/env"
import { Metadata } from "next"
import "styles/globals.css"

export const metadata: Metadata = {
  metadataBase: new URL(getBaseURL()),
}

// 1. ИЗМЕНЯЕМ ПАРАМЕТРЫ, ЧТОБЫ ПРИНИМАТЬ `children` И `params`
export default function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: { countryCode: string }
}) {
  return (
    // 2. УКАЗЫВАЕМ ЯЗЫК ДИНАМИЧЕСКИ
    <html lang={params.countryCode} data-mode="light">
      <body>
        <main className="relative">{children}</main>
      </body>
    </html>
  )
}