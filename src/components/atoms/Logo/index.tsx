import Image from 'next/image'
import bigstoreLogo from '@/assets/bigstore-logo.png'
import Link from 'next/link'

export function Logo() {
  return (
    <Link href={'/'} className="shrink-0">
      <Image src={bigstoreLogo} alt="Bigstore" height={60} priority={true} />
    </Link>
  )
}
