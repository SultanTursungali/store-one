import { Container, clx } from "@medusajs/ui"
import Image from "next/image"
import React from "react"
import PlaceholderImage from "@modules/common/icons/placeholder-image"

// Иконки
const HeartIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 16 16">
    <path d="m8 2.748-.717-.737C5.6.281 2.514.878 1.4 3.053c-1.113 2.175-.239 5.39.982 7.152L8 14.153l5.618-4.053c1.22-1.76 2.095-4.977.982-7.152C13.486.878 10.4.28 8.717 2.01zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143c.06.055.119.112.176.171a3 3 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15"/>
  </svg>
)

const SearchIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 16 16">
    <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001q.044.06.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1 1 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0"/>
  </svg>
)


type ThumbnailProps = {
  thumbnail?: string | null
  images?: any[] | null
  size?: "small" | "medium" | "large" | "full" | "square"
  isFeatured?: boolean
  className?: string
  "data-testid"?: string
}

const Thumbnail: React.FC<ThumbnailProps> = ({
  thumbnail,
  images,
  size = "small",
  isFeatured,
  className,
  "data-testid": dataTestid,
}) => {
  const initialImage = thumbnail || images?.[0]?.url

  return (
    <Container
      className={clx(
        "relative w-full overflow-hidden bg-gray-100 rounded-lg",
        className,
        {
          "aspect-[11/14]": isFeatured,
          "aspect-[9/12]": !isFeatured && size !== "square",
          "aspect-[1/1]": size === "square",
          "w-full": size === "full",
        }
      )}
      data-testid={dataTestid}
    >
      {/* === КНОПКА "ИЗБРАННОЕ" === */}
      <button
        aria-label="Add to wishlist"
        className="absolute top-3 right-3 z-10 bg-white/70 backdrop-blur-sm rounded-full p-2 text-gray-800 hover:text-red-500 hover:scale-110 transition-all duration-200"
      >
        <HeartIcon />
      </button>
      {/* ========================== */}

      <ImageOrPlaceholder image={initialImage} size={size} />

      <div className="absolute inset-0 z-10 flex items-center justify-center gap-x-3 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
           <button className="bg-white text-black rounded-full p-3 shadow-md hover:scale-110 transition-transform">
              <SearchIcon />
          </button>
      </div>

    </Container>
  )
}

const ImageOrPlaceholder = ({
  image,
  size,
}: Pick<ThumbnailProps, "size"> & { image?: string }) => {
  return image ? (
    <Image
      src={image}
      alt="Thumbnail"
      className="absolute inset-0 object-cover object-center group-hover:scale-105 transition-transform duration-300 ease-in-out"
      draggable={false}
      quality={50}
      sizes="(max-width: 576px) 280px, (max-width: 768px) 360px, (max-width: 992px) 480px, 800px"
      fill
    />
  ) : (
    <div className="w-full h-full absolute inset-0 flex items-center justify-center">
      <PlaceholderImage size={size === "small" ? 16 : 24} />
    </div>
  )
}

export default Thumbnail