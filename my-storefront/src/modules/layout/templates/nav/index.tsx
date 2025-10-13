import { Suspense } from "react"
import { listRegions } from "@lib/data/regions"
import { StoreRegion } from "@medusajs/types"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import CartButton from "@modules/layout/components/cart-button"
import SideMenu from "@modules/layout/components/side-menu"
import NavDropdown from "./nav-dropdown"
import { listCategories } from "@lib/data/categories"
import { HttpTypes } from "@medusajs/types"



// Иконки
const SearchIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="currentColor" viewBox="0 0 16 16">
    <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001q.044.06.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1 1 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0"/>
  </svg>
)
const UserIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="currentColor" viewBox="0 0 16 16">
    <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6m2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0m4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4m-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10s-3.516.68-4.168 1.332c-.678.678-.83 1.418-.832 1.664z"/>
  </svg>
)
const HeartIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="currentColor" viewBox="0 0 16 16">
    <path d="m8 2.748-.717-.737C5.6.281 2.514.878 1.4 3.053c-1.113 2.175-.239 5.39.982 7.152L8 14.153l5.618-4.053c1.22-1.76 2.095-4.977.982-7.152C13.486.878 10.4.28 8.717 2.01zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143c.06.055.119.112.176.171a3 3 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15"/>
  </svg>
)

export default function Nav({
  countryCode,
  regions,
  productCategories,
}: {
  countryCode: string
  regions: HttpTypes.StoreRegion[] | null
  productCategories: any[] | null // Adjusted to 'any[]' due to missing 'StoreCategory' export
}) {

  return ( 
    <div className="sticky top-0 inset-x-0 z-50 group">
      <header className="relative h-20 px-8 mx-auto border-b duration-200 bg-white border-gray-200">
        <nav className="content-container flex items-center justify-between w-full h-full text-sm font-medium">
          
          {/* ИЗМЕНЕНИЯ ЗДЕСЬ: Обертка `md:hidden` убрана, добавлен отступ */}
          <div className="flex-1 basis-0 flex items-center gap-x-6">
            <SideMenu regions={regions} />
            <LocalizedClientLink
              href="/"
              className="text-xl font-semibold uppercase hover:text-gray-700 hidden md:block"
              data-testid="nav-store-link"
            >
              StoreOne
            </LocalizedClientLink>
          </div>

          <div className="hidden md:flex items-center gap-x-8 h-full">
            <LocalizedClientLink className="hover:text-gray-700" href="/">Home</LocalizedClientLink>
            {productCategories && <NavDropdown categories={productCategories} />}
            <LocalizedClientLink className="hover:text-gray-700" href="/#about">About</LocalizedClientLink>
            <LocalizedClientLink className="hover:text-gray-700" href="/#contact">Contact</LocalizedClientLink>
          </div>

          <div className="flex items-center h-full md:hidden">
            <LocalizedClientLink
              href="/"
              className="text-xl font-semibold uppercase hover:text-gray-700"
              data-testid="nav-store-link-mobile"
            >
              StoreOne
            </LocalizedClientLink>
          </div>

          <div className="flex items-center gap-x-4 h-full flex-1 basis-0 justify-end">
            <button className="hidden md:block p-2 hover:bg-gray-100 rounded-full transition-colors">
                <SearchIcon />
            </button>
            <LocalizedClientLink
              className="hidden md:block p-2 hover:bg-gray-100 rounded-full transition-colors"
              href="/account"
              data-testid="nav-account-link"
            >
              <UserIcon />
            </LocalizedClientLink>
            <button className="hidden md:block p-2 hover:bg-gray-100 rounded-full transition-colors">
                <HeartIcon />
            </button>
            <Suspense
              fallback={
                <LocalizedClientLink
                  className="hover:text-ui-fg-base flex gap-2"
                  href="/cart"
                  data-testid="nav-cart-link"
                >
                  Cart (0)
                </LocalizedClientLink>
              }
            >
              <CartButton />
            </Suspense>
          </div>
        </nav>
      </header>
    </div>
  )
}