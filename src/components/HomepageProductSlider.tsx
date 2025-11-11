'use client'

import { FC } from 'react'
import Slider from '@/components/Slider'
import SliderItem from '@/components/SliderItem'
import { motion } from 'motion/react'
import { GlassButton } from '@/components/ui/glass-button'

interface ProductSlideData {
  id: string
  title: string
  image: string
  viewMoreText: string
  viewAllText: string
}

const hardcodedProducts: ProductSlideData[] = [
  {
    id: '1',
    title: 'DOWNLIGHT',
    image: '/sources/catalog-ray-banner.jpg',
    viewMoreText: 'XEM THÊM',
    viewAllText: 'TẤT CẢ',
  },
  {
    id: '2',
    title: 'LED PANEL',
    image: '/sources/catalog-ray-banner.jpg',
    viewMoreText: 'XEM THÊM',
    viewAllText: 'TẤT CẢ',
  },
  {
    id: '3',
    title: 'TRACK LIGHT',
    image: '/sources/catalog-ray-banner.jpg',
    viewMoreText: 'XEM THÊM',
    viewAllText: 'TẤT CẢ',
  },
  {
    id: '4',
    title: 'SPOTLIGHT',
    image: '/sources/catalog-ray-banner.jpg',
    viewMoreText: 'XEM THÊM',
    viewAllText: 'TẤT CẢ',
  },
]

interface ProductSlideProps {
  product: ProductSlideData
}

const ProductSlide: FC<ProductSlideProps> = ({ product }) => {
  return (
    <div className="relative h-[600px] bg-gray-100 flex flex-col items-center justify-center">
      <div
        className="absolute inset-0 bg-gradient-radial z-0 from-white/20 to-transparent"
        style={{
          backgroundImage: `url(${product.image})`,
          backgroundSize: 'cover',
        }}
      />

      <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-8 text-center z-1">
        {product.title}
      </h2>

      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.4 }}
        className="flex gap-8 z-1"
      >
        <GlassButton className="px-8 py-3">{product.viewMoreText}</GlassButton>
        <GlassButton className="px-8 py-3" variant="outline">
          {product.viewAllText}
        </GlassButton>
      </motion.div>
    </div>
  )
}

const HomepageProductSlider: FC = () => {
  return (
    <section className="w-full">
      <Slider
        autoplay={true}
        autoplayDelay={8000}
        showArrows={true}
        showIndicators={false}
        className="h-[600px]"
      >
        {hardcodedProducts.map((product) => (
          <SliderItem key={product.id} className="w-full">
            <ProductSlide product={product} />
          </SliderItem>
        ))}
      </Slider>
    </section>
  )
}

export default HomepageProductSlider
