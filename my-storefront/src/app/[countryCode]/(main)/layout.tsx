import { Metadata } from "next"
import { listRegions } from "@lib/data/regions"
import { getBaseURL } from "@lib/util/env"
import Footer from "@modules/layout/templates/footer"
import Nav from "@modules/layout/templates/nav"
import { listCategories } from "@lib/data/categories"

export const metadata: Metadata = {
  metadataBase: new URL(getBaseURL()),
}

export default async function PageLayout({
  children,
  params: { countryCode },
}: {
  children: React.ReactNode
  params: { countryCode: string }
}) {
  // Загружаем все данные здесь, на сервере
  const regions = await listRegions()
  const productCategories = await listCategories()

  return (
    <>
      {/* Передаем загруженные данные как пропсы в Nav */}
      <Nav
        countryCode={countryCode}
        regions={regions}
        productCategories={productCategories}
      />
      {children}
      <Footer />
    </>
  )
}