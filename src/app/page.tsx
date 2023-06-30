import { ProductList } from '@/components/organisms/ProductList'

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col p-2 sm:p-10">
      {/* @ts-expect-error Server Component */}
      <ProductList />
    </main>
  )
}
