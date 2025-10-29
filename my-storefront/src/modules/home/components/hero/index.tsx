"use client"

import { Button } from "@medusajs/ui"
import Image from "next/image"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import Thumbnail from "@modules/products/components/thumbnail"
import { listProducts } from "@lib/data/products"
import { HttpTypes } from "@medusajs/types"
import { useEffect, useState } from "react"
import { getProductPrice } from "@lib/util/get-product-price"
import PreviewPrice from "@modules/products/components/product-preview/price"

// Иконки
const TruckIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" fill="currentColor" viewBox="0 0 16 16">
    <path d="M0 3.5A1.5 1.5 0 0 1 1.5 2h9A1.5 1.5 0 0 1 12 3.5V5h1.02a1.5 1.5 0 0 1 1.17.563l1.481 1.85a1.5 1.5 0 0 1 .329.938V10.5a1.5 1.5 0 0 1-1.5 1.5H14a2 2 0 1 1-4 0H5a2 2 0 1 1-3.998-.085A1.5 1.5 0 0 1 0 10.5zm1.294 7.456A2 2 0 0 1 4.732 11h5.536a2 2 0 0 1 .732-.732V3.5a.5.5 0 0 0-.5-.5h-9a.5.5 0 0 0-.5.5v7a.5.5 0 0 0 .294.456M12 10a2 2 0 0 1 1.732 1h.768a.5.5 0 0 0 .5-.5V8.35a.5.5 0 0 0-.11-.312l-1.48-1.85A.5.5 0 0 0 13.02 6H12zm-9 1a1 1 0 1 0 0 2 1 1 0 0 0 0-2m9 0a1 1 0 1 0 0 2 1 1 0 0 0 0-2"/>
  </svg>
)

const ShieldIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" fill="currentColor" viewBox="0 0 16 16">
    <path d="M5.338 1.59a61 61 0 0 0-2.837.856.48.48 0 0 0-.328.39c-.554 4.157.726 7.19 2.253 9.188a10.7 10.7 0 0 0 2.287 2.233c.346.244.652.42.893.533q.18.085.293.118a1 1 0 0 0 .101.025 1 1 0 0 0 .1-.025q.114-.034.294-.118c.24-.113.547-.29.893-.533a10.7 10.7 0 0 0 2.287-2.233c1.527-1.997 2.807-5.031 2.253-9.188a.48.48 0 0 0-.328-.39c-.651-.213-1.75-.56-2.837-.855C9.552 1.29 8.531 1.067 8 1.067c-.53 0-1.552.223-2.662.524zM5.072.56C6.157.265 7.31 0 8 0s1.843.265 2.928.56c1.11.3 2.229.655 2.887.87a1.54 1.54 0 0 1 1.044 1.262c.596 4.477-.787 7.795-2.465 9.99a11.8 11.8 0 0 1-2.517 2.453 7 7 0 0 1-1.048.625c-.28.132-.581.24-.829.24s-.548-.108-.829-.24a7 7 0 0 1-1.048-.625 11.8 11.8 0 0 1-2.517-2.453C1.928 10.487.545 7.169 1.141 2.692A1.54 1.54 0 0 1 2.185 1.43 63 63 0 0 1 5.072.56"/>
    <path d="M10.854 5.146a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.708 0l-1.5-1.5a.5.5 0 1 1 .708-.708L7.5 7.793l2.646-2.647a.5.5 0 0 1 .708 0"/>
  </svg>
)

const CreditCardIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" fill="currentColor" viewBox="0 0 16 16">
    <path d="M0 4a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2zm2-1a1 1 0 0 0-1 1v1h14V4a1 1 0 0 0-1-1zm13 4H1v5a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1z"/>
  </svg>
)

const AwardIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" fill="currentColor" viewBox="0 0 16 16">
    <path d="M9.669.864 8 0 6.331.864l-1.858.282-.842 1.68-1.337 1.32L2.6 6l-.306 1.854 1.337 1.32.842 1.68 1.858.282L8 12l1.669-.864 1.858-.282.842-1.68 1.337-1.32L13.4 6l.306-1.854-1.337-1.32-.842-1.68zm1.196 1.193.684 1.365 1.086 1.072L12.387 6l.248 1.506-1.086 1.072-.684 1.365-1.51.229L8 10.874l-1.355-.702-1.51-.229-.684-1.365-1.086-1.072L3.614 6l-.25-1.506 1.087-1.072.684-1.365 1.51-.229L8 1.126l1.356.702z"/>
    <path d="M4 11.794V16l4-1 4 1v-4.206l-2.018.306L8 13.126 6.018 12.1z"/>
  </svg>
)

const HeartIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 16 16">
    <path d="m8 2.748-.717-.737C5.6.281 2.514.878 1.4 3.053c-.113 2.175-.239 5.39.982 7.152L8 14.153l5.618-4.053c1.22-1.76 2.095-4.977.982-7.152C13.486.878 10.4.28 8.717 2.01zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143c.06.055.119.112.176.171a3 3 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15"/>
  </svg>
)

// Компонент карточки товара
const ProductCard = ({ product, showBadge = false }: { product: HttpTypes.StoreProduct, showBadge?: boolean }) => {
  const { cheapestPrice } = getProductPrice({ product })

  return (
    <LocalizedClientLink href={`/products/${product.handle}`} className="group">
      <div className="relative" data-testid="product-wrapper">
        {showBadge && (
          <div className="absolute top-3 left-3 bg-yellow-400 text-black text-xs font-bold px-3 py-1 rounded-full z-10">
            Flash Sale
          </div>
        )}
        <button className="absolute top-3 right-3 w-9 h-9 bg-white rounded-full flex items-center justify-center hover:bg-gray-100 z-10 shadow-md transition-colors">
          <HeartIcon />
        </button>
        <div className="aspect-square overflow-hidden rounded-2xl bg-gray-100 mb-3">
          <Thumbnail thumbnail={product.thumbnail} size="full" isFeatured />
        </div>
        <div className="flex flex-col">
          <h3 className="text-sm font-semibold text-gray-900 line-clamp-1" data-testid="product-title">
            {product.title}
          </h3>
          <div className="flex items-center gap-1 mt-1">
            <div className="flex text-yellow-400 text-xs">★★★★★</div>
            <span className="text-xs text-gray-500">(4.5/5)</span>
          </div>
          <div className="mt-1">
            {cheapestPrice && <PreviewPrice price={cheapestPrice} />}
          </div>
        </div>
      </div>
    </LocalizedClientLink>
  )
}

// Основной компонент
const Hero = () => {
  const [newArrivals, setNewArrivals] = useState<HttpTypes.StoreProduct[]>([])
  const [popularProducts, setPopularProducts] = useState<HttpTypes.StoreProduct[]>([])
  const [currentHeroSlide, setCurrentHeroSlide] = useState(0)
  const [currentSaleSlide, setCurrentSaleSlide] = useState(0)

  // Слайды для главного баннера
  const heroSlides = [
    {
      image: "https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?w=2000&h=600&fit=crop",
      title: "50% off for",
      subtitle: "clothing and shoes",
    },
    {
      image: "https://images.unsplash.com/photo-1445205170230-053b83016050?w=2000&h=600&fit=crop",
      title: "New Summer",
      subtitle: "Collection 2024",
    },
    {
      image: "https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=2000&h=600&fit=crop",
      title: "Exclusive Sale",
      subtitle: "Up to 70% off",
    },
    {
      image: "https://images.unsplash.com/photo-1483985988355-763728e1935b?w=2000&h=600&fit=crop",
      title: "Fresh Arrivals",
      subtitle: "Shop the latest trends",
    },
  ]

  // Слайды для баннера распродажи
  const saleSlides = [
    {
      image: "https://images.unsplash.com/photo-1607083206968-13611e3d76db?w=2000&h=600&fit=crop",
      title: "MEGA SALE",
      discount: "UP TO 70% OFF",
    },
    {
      image: "https://images.unsplash.com/photo-1472851294608-062f824d29cc?w=2000&h=600&fit=crop",
      title: "FLASH SALE",
      discount: "LIMITED TIME ONLY",
    },
    {
      image: "https://images.unsplash.com/photo-1523381294911-8d3cead13475?w=2000&h=600&fit=crop",
      title: "CLEARANCE SALE",
      discount: "SAVE BIG TODAY",
    },
  ]

  useEffect(() => {
    listProducts({ queryParams: { limit: 4 } }).then(({ response }) => {
      setNewArrivals(response.products)
    })
    
    listProducts({ queryParams: { limit: 8, offset: 4 } }).then(({ response }) => {
      setPopularProducts(response.products)
    })
  }, [])

  // Автопролистывание главного баннера
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentHeroSlide((prev) => (prev + 1) % heroSlides.length)
    }, 5000)
    return () => clearInterval(timer)
  }, [])

  // Автопролистывание баннера распродажи
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSaleSlide((prev) => (prev + 1) % saleSlides.length)
    }, 5000)
    return () => clearInterval(timer)
  }, [])

  const categories = [
    { name: "Clothing", image: "https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?w=600&h=600&fit=crop" },
    { name: "Hoodie", image: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=600&h=600&fit=crop" },
    { name: "Jacket", image: "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=600&h=600&fit=crop" },
    { name: "Pants", image: "https://images.unsplash.com/photo-1473966968600-fa801b869a1a?w=600&h=600&fit=crop" },
    { name: "Accessories", image: "https://images.unsplash.com/photo-1523380677598-64d85d015339?w=600&h=600&fit=crop" },
    { name: "Sports Wear", image: "https://images.unsplash.com/photo-1517438322307-e67111335449?w=600&h=600&fit=crop" },
  ]

  return (
    <div className="w-full">
      {/* Hero Banner with Swiper */}
      <div className="content-container py-6">
        <div className="relative w-full h-64 rounded-2xl overflow-hidden">
          {heroSlides.map((slide, index) => (
            <div
              key={index}
              className={`absolute inset-0 transition-opacity duration-1000 ${
                index === currentHeroSlide ? "opacity-100" : "opacity-0"
              }`}
            >
              <Image
                src={slide.image}
                alt={`Hero banner ${index + 1}`}
                fill
                priority={index === 0}
                className="object-cover"
              />
              <div className="absolute inset-0 bg-black/30" />
              <div className="absolute inset-0 flex flex-col justify-center px-8 lg:px-12">
                <h2 className="text-3xl lg:text-5xl font-bold text-white mb-1">{slide.title}</h2>
                <h2 className="text-3xl lg:text-5xl font-bold text-white mb-6">{slide.subtitle}</h2>
                <LocalizedClientLink href="/store">
                  <Button className="bg-green-500 hover:bg-green-600 text-white w-fit rounded-lg px-8 h-12 font-semibold">
                    Shop Now
                  </Button>
                </LocalizedClientLink>
              </div>
            </div>
          ))}
          {/* Dots */}
          <div className="absolute bottom-4 left-8 flex gap-2 z-10">
            {heroSlides.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentHeroSlide(index)}
                className={`w-2 h-2 rounded-full transition-colors ${
                  index === currentHeroSlide ? "bg-white" : "bg-white/50"
                }`}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Browse By Category */}
      <div className="content-container py-12">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl lg:text-3xl font-bold">Browse By Category</h2>
          <div className="flex gap-2">
            <button className="w-10 h-10 rounded-lg bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-colors">
              <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
                <path d="M12 4l-8 8 8 8" stroke="currentColor" strokeWidth="2" fill="none"/>
              </svg>
            </button>
            <button className="w-10 h-10 rounded-lg bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-colors">
              <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
                <path d="M8 4l8 8-8 8" stroke="currentColor" strokeWidth="2" fill="none"/>
              </svg>
            </button>
          </div>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 lg:gap-6">
          {categories.map((category, idx) => (
            <LocalizedClientLink key={idx} href="/store" className="group">
              <div className="aspect-square rounded-2xl overflow-hidden mb-3 relative bg-gray-100">
                <Image
                  src={category.image}
                  alt={category.name}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <p className="text-center font-semibold text-sm lg:text-base">{category.name}</p>
            </LocalizedClientLink>
          ))}
        </div>
      </div>

      {/* New Arrival */}
      <div className="content-container py-12">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl lg:text-3xl font-bold">New Arrival</h2>
          <LocalizedClientLink href="/store" className="text-gray-600 hover:text-gray-900 font-medium flex items-center gap-2 transition-colors group">
            <span>View All</span>
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" className="group-hover:translate-x-1 transition-transform">
              <path d="M8 4l6 6-6 6" stroke="currentColor" strokeWidth="2"/>
            </svg>
          </LocalizedClientLink>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 lg:gap-6">
          {newArrivals.map((product, idx) => (
            <ProductCard key={product.id} product={product} showBadge={idx % 2 === 0} />
          ))}
        </div>
      </div>

      {/* Sale Banner with Swiper */}
      <div className="content-container py-12">
        <LocalizedClientLink href="/store" className="block">
          <div className="relative w-full h-48 lg:h-64 rounded-2xl overflow-hidden bg-gray-100 cursor-pointer group">
            {saleSlides.map((slide, index) => (
              <div
                key={index}
                className={`absolute inset-0 transition-opacity duration-1000 ${
                  index === currentSaleSlide ? "opacity-100" : "opacity-0"
                }`}
              >
                <Image
                  src={slide.image}
                  alt={`Sale banner ${index + 1}`}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-black/40" />
                <div className="absolute inset-0 flex flex-col items-center justify-center text-white">
                  <h3 className="text-4xl lg:text-6xl font-bold mb-2">{slide.title}</h3>
                  <p className="text-xl lg:text-3xl font-semibold">{slide.discount}</p>
                </div>
              </div>
            ))}
            {/* Dots */}
            <div className="absolute bottom-4 left-6 flex gap-2 z-10">
              {saleSlides.map((_, index) => (
                <button
                  key={index}
                  onClick={(e) => {
                    e.preventDefault()
                    setCurrentSaleSlide(index)
                  }}
                  className={`w-2 h-2 rounded-full transition-colors ${
                    index === currentSaleSlide ? "bg-white" : "bg-white/50"
                  }`}
                />
              ))}
            </div>
          </div>
        </LocalizedClientLink>
      </div>

      {/* Most Popular */}
      <div className="content-container py-12">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl lg:text-3xl font-bold">Most Popular</h2>
          <LocalizedClientLink href="/store" className="text-gray-600 hover:text-gray-900 font-medium flex items-center gap-2 transition-colors group">
            <span>See More</span>
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" className="group-hover:translate-x-1 transition-transform">
              <path d="M8 4l6 6-6 6" stroke="currentColor" strokeWidth="2"/>
            </svg>
          </LocalizedClientLink>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 lg:gap-6">
          {popularProducts.map((product, idx) => (
            <ProductCard key={product.id} product={product} showBadge={idx % 3 === 0} />
          ))}
        </div>
      </div>

      {/* Features */}
      <div className="bg-gray-50 py-16">
        <div className="content-container">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
            <div className="flex flex-col items-center text-center gap-4">
              <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center shadow-sm">
                <TruckIcon />
              </div>
              <div>
                <h3 className="font-bold text-lg mb-1">Secure & Swift Delivery</h3>
                <p className="text-sm text-gray-600">Fast and Reliable Shipping</p>
              </div>
            </div>
            <div className="flex flex-col items-center text-center gap-4">
              <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center shadow-sm">
                <CreditCardIcon />
              </div>
              <div>
                <h3 className="font-bold text-lg mb-1">Safe Transactions</h3>
                <p className="text-sm text-gray-600">Various Reliable Payment Options</p>
              </div>
            </div>
            <div className="flex flex-col items-center text-center gap-4">
              <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center shadow-sm">
                <ShieldIcon />
              </div>
              <div>
                <h3 className="font-bold text-lg mb-1">Premium Quality Guaranteed</h3>
                <p className="text-sm text-gray-600">Top-Notch Craftsmanship</p>
              </div>
            </div>
            <div className="flex flex-col items-center text-center gap-4">
              <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center shadow-sm">
                <AwardIcon />
              </div>
              <div>
                <h3 className="font-bold text-lg mb-1">Professional Service</h3>
                <p className="text-sm text-gray-600">Efficient customer from passionate team</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Hero