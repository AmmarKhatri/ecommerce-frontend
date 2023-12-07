import HomePageHeader from '@/components/header/homeHeader'
export default function Home() {
  return (
    <div>
      <HomePageHeader/>
      <div className="justify-center h-screen">
        <div className="w-full min-h-[20] bg-white p-4 mt-20 rounded shadow-md">
          {/* Your product content goes here */}
          <h2 className="text-2xl font-semibold mb-2">Latest Products</h2>
          <p className="text-gray-700 text-center py-32">No products to show</p>
        </div>
        <div className="w-full min-h-[20] bg-white p-4 mt-20 rounded shadow-md">
          {/* Your product content goes here */}
          <h2 className="text-2xl font-semibold mb-2">Trending Products</h2>
          <p className="text-gray-700 text-center py-32">No products to show</p>
        </div>
      </div>
    </div>
  )
}
