"use client"

import {
  Popover,
  PopoverButton,
  PopoverPanel,
  Transition,
} from "@headlessui/react"
import { HttpTypes } from "@medusajs/types"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import { Fragment } from "react"

const ChevronDown = ({ className }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="16"
    height="16"
    fill="currentColor"
    viewBox="0 0 16 16"
    className={className}
  >
    <path
      fillRule="evenodd"
      d="M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z"
    />
  </svg>
)

const NavDropdown = ({
  categories,
  label = "Shop",
}: {
  categories: HttpTypes.StoreCategory[]
  label?: string
}) => {
  return (
    <Popover className="relative h-full flex items-center">
      {({ open }) => (
        <>
          <PopoverButton className="flex items-center gap-x-1 hover:text-gray-700 transition-colors outline-none">
            {label}
            <ChevronDown
              className={`transition-transform duration-200 ${
                open ? "rotate-180" : ""
              }`}
            />
          </PopoverButton>

          <Transition
            as={Fragment}
            enter="transition ease-out duration-200"
            enterFrom="opacity-0 translate-y-1"
            enterTo="opacity-100 translate-y-0"
            leave="transition ease-in duration-150"
            leaveFrom="opacity-100 translate-y-0"
            leaveTo="opacity-0 translate-y-1"
          >
            <PopoverPanel className="absolute top-full -left-4 z-20 mt-3 w-screen max-w-xs sm:max-w-sm">
              <div className="overflow-hidden rounded-lg shadow-lg ring-1 ring-black ring-opacity-5">
                <div className="relative grid gap-6 bg-white p-7">
                  {categories.map((category) => {
                    if (category.parent_category) {
                      return null
                    }
                    return (
                      <LocalizedClientLink
                        key={category.id}
                        href={`/categories/${category.handle}`}
                        className="-m-3 flex items-start rounded-lg p-3 hover:bg-gray-50"
                      >
                        <div className="ml-4">
                          <p className="text-base font-medium text-gray-900">
                            {category.name}
                          </p>
                          <p className="mt-1 text-sm text-gray-500">
                            {category.description}
                          </p>
                        </div>
                      </LocalizedClientLink>
                    )
                  })}
                </div>
              </div>
            </PopoverPanel>
          </Transition>
        </>
      )}
    </Popover>
  )
}

export default NavDropdown