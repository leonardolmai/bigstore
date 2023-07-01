import { Logo } from '@/components/atoms/Logo'
import { LuFacebook, LuInstagram, LuLinkedin } from 'react-icons/lu'

export function Footer() {
  return (
    <footer className="flex flex-col justify-between bg-gray-200 p-6">
      <div className="flex flex-col items-center justify-center gap-3 pb-4 lg:flex-row lg:items-start lg:justify-around">
        <Logo />
        <div className="text-center lg:text-left">
          <h2 className="pb-2 font-bold">Contato</h2>
          <p>
            <span className="text-sm font-semibold">Telefone:</span> (00)
            000000000
          </p>
          <p>
            <span className="text-sm font-semibold">Email:</span>{' '}
            bigstore@example.com
          </p>
        </div>

        <div>
          <div className="pb-4 text-center lg:text-left">
            <h2 className="pb-2 font-bold">Documentação da API</h2>
            <a
              href=""
              className="text-sm font-semibold text-primary hover:text-primary-dark"
            >
              Referencia da API
            </a>
          </div>
          <div className="text-center lg:text-left">
            <h2 className="pb-2 font-bold">Torne-se uma empresa</h2>
            <a
              href=""
              className="text-sm font-semibold text-primary hover:text-primary-dark"
            >
              Junte-se à nossa rede
            </a>
          </div>
        </div>
        <div>
          <h2 className="pb-2 text-center font-bold lg:text-left">
            Redes sociais
          </h2>
          <div className="flex justify-around">
            <a href="">
              <LuFacebook
                className="cursor-pointer stroke-primary hover:stroke-primary-dark"
                size={24}
              />
            </a>
            <a href="">
              <LuInstagram
                className="cursor-pointer stroke-primary hover:stroke-primary-dark"
                size={24}
              />
            </a>
            <a href="">
              <LuLinkedin
                className="cursor-pointer stroke-primary hover:stroke-primary-dark"
                size={24}
              />
            </a>
          </div>
        </div>
      </div>
      <div className="self-center text-center text-xs">
        <span>Copyright © 2023 | Todos os direitos reservados.</span>
      </div>
    </footer>
  )
}
