"use client" // Необходимо, так как мы будем загружать товары на стороне клиента

import { Button, Heading } from "@medusajs/ui"
import Image from "next/image"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import Thumbnail from "@modules/products/components/thumbnail"
import { listProducts } from "@lib/data/products"
import { HttpTypes } from "@medusajs/types"
import { useEffect, useState } from "react"
import { getProductPrice } from "@lib/util/get-product-price"
import PreviewPrice from "@modules/products/components/product-preview/price"

// -- Вспомогательный компонент для карточки товара --
const ProductCard = ({ product }: { product: HttpTypes.StoreProduct }) => {
  const { cheapestPrice } = getProductPrice({ product })

  return (
    <LocalizedClientLink href={`/products/${product.handle}`} className="group">
      <div data-testid="product-wrapper">
        <Thumbnail thumbnail={product.thumbnail} size="full" />
        <div className="flex flex-col mt-4">
          <h3
            className="text-base font-semibold text-gray-800"
            data-testid="product-title"
          >
            {product.title}
          </h3>
          <div className="mt-1">
            {cheapestPrice && <PreviewPrice price={cheapestPrice} />}
          </div>
        </div>
      </div>
    </LocalizedClientLink>
  )
}


// -- Основной компонент, который теперь будет вашей главной страницей --
const Hero = () => {
  const [products, setProducts] = useState<HttpTypes.StoreProduct[]>([])

  useEffect(() => {
    // Загружаем 4 товара для секции "Featured Products"
    listProducts({ queryParams: { limit: 4 } }).then(({ response }) => {
      setProducts(response.products)
    })
  }, [])

  return (
    <div className="w-full">
      {/* ======================= Секция Hero ======================= */}
      <div className="w-full relative bg-gray-900">
        <div className="hidden lg:block absolute inset-0 z-0">
          <Image
            src="https://images.unsplash.com/photo-1483985988355-763728e1935b?q=80&w=2940&auto=format&fit=crop"
            alt="Hero background"
            fill
            priority
            className="object-cover opacity-50"
          />
        </div>
        <div className="lg:hidden w-full aspect-[3/4] relative">
          <Image
            src="https://images.unsplash.com/photo-1483985988355-763728e1935b?q=80&w=2940&auto=format&fit=crop"
            alt="Hero background"
            fill
            priority
            className="object-cover"
          />
        </div>
        <div className="relative z-10 flex flex-col items-center text-center lg:items-start lg:text-left content-container py-16 lg:min-h-[70vh] lg:justify-center">
          <Heading
            level="h1"
            className="text-4xl lg:text-7xl font-bold text-white"
          >
            COLLECTION AUTUMN-WINTER 2024
          </Heading>
          <p className="text-lg mt-4 max-w-lg text-gray-300">
            Find your style with our new collection. Unmatched quality and
            design to help you stand out.
          </p>
          <LocalizedClientLink href="/store" className="mt-8">
            <Button
              size="large"
              className="bg-white text-black rounded-md hover:bg-gray-200 transition-colors uppercase text-sm h-12 group border border-transparent"
            >
              Shop Now
              <span className="ml-2 transition-transform duration-300 group-hover:translate-x-1">
                →
              </span>
            </Button>
          </LocalizedClientLink>
        </div>
      </div>

      {/* ======================= Секция Рекомендуемых Товаров ======================= */}
      <div className="content-container py-12 md:py-24">
        <div className="text-center mb-10">
          <Heading level="h2" className="text-3xl md:text-4xl font-semibold">
            Featured Products
          </Heading>
          <p className="text-md text-gray-500 mt-2">
            Discover our most popular items
          </p>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-x-6 gap-y-10">
          {products.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
        <div className="text-center mt-12">
          <LocalizedClientLink href="/store">
            <Button
              variant="secondary"
              className="h-12 border-gray-300 hover:bg-gray-100"
            >
              View All Products
            </Button>
          </LocalizedClientLink>
        </div>
      </div>

      {/* ======================= Секция Рекламного Баннера ======================= */}
      <div className="content-container mb-12 md:mb-24">
        <div className="relative w-full h-[50vh] md:h-[60vh] bg-gray-100 rounded-lg flex flex-col items-center justify-center text-center p-8">
          <div className="absolute inset-0 z-0 rounded-lg overflow-hidden">
            <Image
              src="https://images.unsplash.com/photo-1445205170230-053b83016050?q=80&w=2940&auto=format&fit=crop"
              alt="Promotion background"
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-black/50" />
          </div>
          <div className="relative z-10 text-white">
            <p className="text-lg font-semibold uppercase tracking-wider">
              Limited Time Offer
            </p>
            <Heading level="h2" className="text-4xl md:text-6xl font-bold mt-2">
              GET 30% OFF
            </Heading>
            <p className="text-md mt-4 max-w-md">
              Use code <span className="font-bold">WINTER30</span> at checkout to
              get 30% off your entire order.
            </p>
            <LocalizedClientLink href="/store" className="mt-8 inline-block">
              <Button
                size="large"
                className="bg-white text-black rounded-md hover:bg-gray-200 transition-colors uppercase text-sm h-12"
              >
                Shop The Sale
              </Button>
            </LocalizedClientLink>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Hero