import CarouselComponent from '@/components/organisms/carousel';
import Detail_sale from '@/components/organisms/detail_sale';
import { Product } from '@/types/product';
import { api } from '@/utils/api';

export default function Products({ params }: { params: { slug: string } }) {
  const fetchProduct = async () => {
    try {
      const response = await api.get<Product>(`/products/${params.slug}/`);
      const fetchedProduct = response.data;
      // Renderizar o componente com os dados do produto
      return (
        <div className="flex flex-row  h-auto md:px-8 md:py-8 gap-6 justify-center  md:justify-between flex-wrap md:flex-nowrap">
          <div className="bg-[#F1F1F4] w-11/12 rounded-xl">
            <div className="max-w-[1400px] md:h-[780px] w-full m-auto py-4 px-4 relative">

              <CarouselComponent product={fetchedProduct} />
            </div>
            <p>Descrição Geral:</p>
            {fetchedProduct && <p>{fetchedProduct.description}</p>}
          </div>
          <div className="bg-[#F1F1F4] w-10/12 basis-40 md:px-6 px-4 max-md:mb-8 max-md:items-center ml-0 md:ml-14 rounded-xl pb-2 items-center">
            <Detail_sale product={fetchedProduct} />
          </div>
        </div>
      );
    } catch (error) {
      console.error('Error fetching product:', error);
      return null;
    }
  };

  // Chamar a função fetchProduct diretamente para obter o resultado
  return fetchProduct();
}
