import { PlusIcon, ShoppingCartIcon } from 'lucide-react'

export function AddToCart() {
  return (
    <button
      className="relative rounded-full bg-primary p-2 text-white transition-colors duration-300 hover:bg-primary-dark focus:outline-none"
      title="Adicionar ao Carrinho"
    >
      <div className="absolute right-2 top-0.5 flex items-center justify-center">
        <PlusIcon className="h-3 w-3" />
      </div>
      <ShoppingCartIcon className="h-5 w-5" />
    </button>
  )
}
