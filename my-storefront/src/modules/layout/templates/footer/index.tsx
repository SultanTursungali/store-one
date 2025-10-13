import { listCategories } from "@lib/data/categories"
import { listCollections } from "@lib/data/collections"
import { Button, Input, Text, clx } from "@medusajs/ui"
import LocalizedClientLink from "@modules/common/components/localized-client-link"

// Простые SVG иконки для социальных сетей
const InstagramIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 16 16">
    <path d="M8 0C5.829 0 5.556.01 4.703.048 3.85.088 3.269.222 2.76.42a3.9 3.9 0 0 0-1.417 1.417c-.198.507-.333 1.09-.372 1.942C.01 5.556 0 5.829 0 8s.01 2.444.048 3.297c.04.852.174 1.435.372 1.942.272.692.648 1.258 1.417 1.417.507.198 1.09.333 1.942.372C5.556 15.99 5.829 16 8 16s2.444-.01 3.297-.048c.852-.04 1.435-.174 1.942-.372.692-.272 1.258-.648 1.417-1.417.198-.507.333-1.09.372-1.942C15.99 10.444 16 10.171 16 8s-.01-2.444-.048-3.297c-.04-.852-.174-1.435-.372-1.942a3.9 3.9 0 0 0-1.417-1.417c-.507-.198-1.09-.333-1.942-.372C10.444.01 10.171 0 8 0zm0 1.44c2.136 0 2.389.007 3.232.046.78.035 1.204.166 1.486.275.373.145.64.319.92.599s.453.546.599.92c.11.282.24.705.275 1.486.039.843.047 1.096.047 3.232s-.008 2.389-.047 3.232c-.035.78-.166 1.204-.275 1.486a2.48 2.48 0 0 1-.599.92c-.28.28-.546.453-.92.599-.282.11-.705.24-1.486.275-.843.039-1.096.047-3.232.047s-2.389-.008-3.232-.047c-.78-.035-1.204-.166-1.486-.275a2.48 2.48 0 0 1-.92-.599c-.28-.28-.453-.546-.599-.92-.11-.282-.24-.705-.275-1.486-.039-.843-.047-1.096-.047-3.232s.008-2.389.047-3.232c.035-.78.166-1.204.275-1.486.146-.373.319-.64.599-.92s.546-.453.92-.599c.282-.11.705.24 1.486.275.843-.039 1.096.047 3.232-.047zM8 4a4 4 0 1 0 0 8 4 4 0 0 0 0-8zm0 6.4a2.4 2.4 0 1 1 0-4.8 2.4 2.4 0 0 1 0 4.8zM12.72 2.38a.96.96 0 1 0 0 1.92.96.96 0 0 0 0-1.92z"/>
  </svg>
)

const FacebookIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 16 16">
    <path d="M16 8.049c0-4.446-3.582-8.05-8-8.05S0 3.603 0 8.049c0 4.021 2.926 7.347 6.75 7.951v-5.625h-2.03V8.05H6.75V6.275c0-2.017 1.195-3.131 3.022-3.131.876 0 1.791.157 1.791.157v1.98h-1.009c-.993 0-1.303.621-1.303 1.258v1.51h2.218l-.354 2.326H11.25V16c3.824-.604 6.75-3.93 6.75-7.951z"/>
  </svg>
)

const TwitterIcon = () => (
 <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 16 16">
    <path d="M5.026 15c6.038 0 9.341-5.003 9.341-9.334q.002-.211-.006-.422A6.7 6.7 0 0 0 16 3.542a6.7 6.7 0 0 1-1.889.518 3.3 3.3 0 0 0 1.447-1.817 6.5 6.5 0 0 1-2.087.793A3.286 3.286 0 0 0 7.875 6.03a9.32 9.32 0 0 1-6.767-3.429 3.29 3.29 0 0 0 1.018 4.382A3.3 3.3 0 0 1 .64 6.575v.045a3.29 3.29 0 0 0 2.632 3.218 3.2 3.2 0 0 1-.865.115 3.29 3.29 0 0 0 3.067 2.277A6.6 6.6 0 0 1 .78 13.58a6.3 6.3 0 0 1-.78-.045A9.34 9.34 0 0 0 5.026 15z"/>
  </svg>
)

export default async function Footer() {
  const { collections } = await listCollections({
    fields: "*products",
  })
  const productCategories = await listCategories()

  return (
    <footer className="w-full bg-[#1A371F] text-white">
      <div className="content-container flex flex-col w-full">
        {/* === БЛОК ПОДПИСКИ === */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-8 py-12 border-b border-white/20">
            <div className="text-center md:text-left">
                <h3 className="text-2xl font-semibold">Subscribe to our newsletter</h3>
                <p className="text-sm text-gray-300 mt-1">Get the latest updates on new products and upcoming sales.</p>
            </div>
            <div className="flex w-full max-w-md items-center gap-x-2">
                <Input type="email" placeholder="Enter your email" className="bg-white/10 border-white/20 placeholder-gray-400 text-white focus:ring-white"/>
                <Button className="bg-white text-[#1A371F] hover:bg-gray-200">Subscribe</Button>
            </div>
        </div>
        
        <div className="flex flex-col gap-y-6 xsmall:flex-row items-start justify-between py-24">
          <div>
            <LocalizedClientLink
              href="/"
              className="txt-compact-xlarge-plus hover:text-gray-300 uppercase"
            >
              StoreOne
            </LocalizedClientLink>
            <div className="flex gap-x-4 mt-6 text-gray-300">
                <a href="#" aria-label="Instagram" className="hover:text-white"><InstagramIcon /></a>
                <a href="#" aria-label="Facebook" className="hover:text-white"><FacebookIcon /></a>
                <a href="#" aria-label="Twitter" className="hover:text-white"><TwitterIcon /></a>
            </div>
          </div>

          {/* ИЗМЕНЕНИЯ ЗДЕСЬ: Увеличили сетку и добавили новые колонки */}
          <div className="text-sm gap-10 md:gap-x-16 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5">

            {/* === НОВАЯ КОЛОНКА: SUPPORT === */}
            <div className="flex flex-col gap-y-2">
                <span className="font-semibold text-base">Support</span>
                <ul className="grid grid-cols-1 gap-2 text-gray-300">
                    <li><a href="#" className="hover:text-white">FAQ</a></li>
                    <li><a href="#" className="hover:text-white">Shipping & Returns</a></li>
                    <li><a href="#" className="hover:text-white">Care Guide</a></li>
                    <li><a href="#" className="hover:text-white">Warranty</a></li>
                </ul>
            </div>

            {/* === НОВАЯ КОЛОНКА: LEGAL === */}
             <div className="flex flex-col gap-y-2">
                <span className="font-semibold text-base">Legal</span>
                <ul className="grid grid-cols-1 gap-2 text-gray-300">
                    <li><a href="#" className="hover:text-white">Terms of Service</a></li>
                    <li><a href="#" className="hover:text-white">Privacy Policy</a></li>
                </ul>
            </div>

            {/* === НОВАЯ КОЛОНКА: CONTACT === */}
            <div className="flex flex-col gap-y-2">
                <span className="font-semibold text-base">Contact</span>
                <ul className="grid grid-cols-1 gap-2 text-gray-300">
                    <li><a href="#" className="hover:text-white">info@storeone.com</a></li>
                    <li><a href="#" className="hover:text-white">+7 (700) 000-00-00</a></li>
                </ul>
            </div>

            {productCategories && productCategories?.length > 0 && (
              <div className="flex flex-col gap-y-2">
                <span className="font-semibold text-base">Categories</span>
                <ul
                  className="grid grid-cols-1 gap-2"
                  data-testid="footer-categories"
                >
                  {productCategories?.slice(0, 6).map((c) => {
                    if (c.parent_category) {
                      return null
                    }
                    const children =
                      c.category_children?.map((child) => ({
                        name: child.name,
                        handle: child.handle,
                        id: child.id,
                      })) || null
                    return (
                      <li
                        className="flex flex-col gap-2 text-gray-300"
                        key={c.id}
                      >
                        <LocalizedClientLink
                          className={clx(
                            "hover:text-white",
                            children && "font-semibold"
                          )}
                          href={`/categories/${c.handle}`}
                          data-testid="category-link"
                        >
                          {c.name}
                        </LocalizedClientLink>
                        {children && (
                          <ul className="grid grid-cols-1 ml-3 gap-2">
                            {children.map((child) => (
                              <li key={child.id}>
                                <LocalizedClientLink
                                  className="hover:text-white"
                                  href={`/categories/${child.handle}`}
                                  data-testid="category-link"
                                >
                                  {child.name}
                                </LocalizedClientLink>
                              </li>
                            ))}
                          </ul>
                        )}
                      </li>
                    )
                  })}
                </ul>
              </div>
            )}
            {collections && collections.length > 0 && (
              <div className="flex flex-col gap-y-2">
                <span className="font-semibold text-base">Collections</span>
                <ul
                  className={clx(
                    "grid grid-cols-1 gap-2 text-gray-300",
                    {
                      "grid-cols-2": (collections?.length || 0) > 3,
                    }
                  )}
                >
                  {collections?.slice(0, 6).map((c) => (
                    <li key={c.id}>
                      <LocalizedClientLink
                        className="hover:text-white"
                        href={`/collections/${c.handle}`}
                      >
                        {c.title}
                      </LocalizedClientLink>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
        <div className="flex w-full mb-8 justify-center">
          <Text className="text-xs text-gray-400">
            © {new Date().getFullYear()} StoreOne. All rights reserved.
          </Text>
        </div>
      </div>
    </footer>
  )
}