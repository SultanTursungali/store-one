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
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="22"
    height="22"
    fill="currentColor"
    viewBox="0 0 16 16"
  >
    <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001q.044.06.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1 1 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0" />
  </svg>
)
const UserIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="22"
    height="22"
    fill="currentColor"
    viewBox="0 0 16 16"
  >
    <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6m2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0m4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4m-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10s-3.516.68-4.168 1.332c-.678.678-.83 1.418-.832 1.664z" />
  </svg>
)
const HeartIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="22"
    height="22"
    fill="currentColor"
    viewBox="0 0 16 16"
  >
    <path d="m8 2.748-.717-.737C5.6.281 2.514.878 1.4 3.053c-1.113 2.175-.239 5.39.982 7.152L8 14.153l5.618-4.053c1.22-1.76 2.095-4.977.982-7.152C13.486.878 10.4.28 8.717 2.01zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143c.06.055.119.112.176.171a3 3 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15" />
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
      <header className="relative h-20 px-8 mx-auto duration-200 bg-white border-b border-gray-200">
        <nav className="content-container flex items-center justify-between w-full h-full">
          {/* Left section with side menu and logo */}
          <div className="flex items-center gap-x-4">
            <SideMenu regions={regions} />
            <LocalizedClientLink
              href="/"
              className="text-2xl font-bold hover:text-gray-700 flex items-center gap-2"
              data-testid="nav-store-link"
            >
              <img src="/favicon.svg" alt="StoreOne Logo" className="w-8 h-8" />
              <span>StoreOne</span>
            </LocalizedClientLink>
          </div>

          {/* Center navigation */}
          <div className="hidden md:flex items-center gap-x-12 h-full text-base">
            <LocalizedClientLink className="hover:text-gray-700 text-green-600 font-medium" href="/">
              Home
            </LocalizedClientLink>
            {productCategories && (
              <NavDropdown categories={productCategories} label="Category" />
            )}
            <LocalizedClientLink className="hover:text-gray-700" href="/#promo">
              Promo
            </LocalizedClientLink>
          </div>

          {/* Right section with search and icons */}
          <div className="flex items-center gap-x-3 lg:gap-x-6 h-full">
            {/* Search bar */}
            <div className="hidden lg:flex items-center bg-gray-100 rounded-full px-4 xl:px-6 py-2.5 w-64 xl:w-96">
              <SearchIcon />
              <input 
                type="text" 
                placeholder="Search" 
                className="bg-transparent border-none outline-none ml-3 w-full text-gray-600 placeholder-gray-500"
              />
            </div>

            {/* Search icon for mobile/tablet */}
            <button className="lg:hidden p-2 hover:bg-gray-100 rounded-full transition-colors">
              <SearchIcon />
            </button>

            {/* Wishlist */}
            <button className="hidden sm:flex items-center p-2 hover:bg-gray-100 rounded-full transition-colors relative">
              <HeartIcon />
              <span className="absolute -top-1 -right-1 bg-green-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-semibold">11</span>
            </button>

            {/* Account */}
            <LocalizedClientLink
              className="hidden sm:block p-2 hover:bg-gray-100 rounded-full transition-colors"
              href="/account"
              data-testid="nav-account-link"
            >
              <UserIcon />
            </LocalizedClientLink>

            {/* Cart */}
            <Suspense
              fallback={
                <LocalizedClientLink
                  className="flex items-center justify-center bg-black text-white rounded-full w-12 h-12 sm:w-14 sm:h-14 relative hover:bg-gray-800 transition-colors"
                  href="/cart"
                  data-testid="nav-cart-link"
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="sm:w-6 sm:h-6">
                    <path d="M9 2L7 4H3C1.89543 4 1 4.89543 1 6V20C1 21.1046 1.89543 22 3 22H21C22.1046 22 23 21.1046 23 20V6C23 4.89543 22.1046 4 21 4H17L15 2H9Z"/>
                  </svg>
                  <span className="absolute -top-1 -right-1 bg-green-500 text-white text-xs rounded-full w-5 h-5 sm:w-6 sm:h-6 flex items-center justify-center font-bold">0</span>
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