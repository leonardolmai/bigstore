'use client'
import { CategorySelect } from '@/components/molecules/CategorySelect'
import { SearchBar } from '@/components/molecules/SearchBar'
import Link from 'next/link'
import { LuShoppingCart, LuMenu } from 'react-icons/lu'
import { useEffect, useState } from 'react'
import { Logo } from '@/components/atoms/Logo'
import { usePathname, useSearchParams } from 'next/navigation'

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  useEffect(() => {
    setIsMenuOpen(false)
  }, [pathname, searchParams])

  return (
    <header className="flex h-16 items-center justify-between gap-6 bg-white shadow">
      <Logo className="ml-4" />
      <nav
        className={`absolute top-16 z-10 w-full flex-col items-stretch justify-between gap-6 bg-gray-300 p-2 text-center shadow lg:static lg:flex lg:flex-row lg:items-center lg:bg-transparent lg:p-0 lg:shadow-none  
        ${isMenuOpen ? 'flex' : 'hidden'}`}
      >
        <CategorySelect />
        <SearchBar />
        <Link href={'/signup'} className="font-bold hover:text-primary-dark">
          Cadastrar
        </Link>
        <Link
          href={'/login'}
          className="rounded-md bg-primary px-4 py-2 font-bold text-white hover:bg-primary-dark"
        >
          Login
        </Link>
        <Link href={'/cart'} className="self-center lg:pr-6">
          <LuShoppingCart
            className="cursor-pointer hover:stroke-primary-dark"
            size={24}
          />
        </Link>
      </nav>
      <LuMenu
        className="m-auto mr-6 shrink-0 cursor-pointer hover:stroke-primary-dark lg:hidden"
        size={24}
        onClick={toggleMenu}
      />
    </header>
  )
}
