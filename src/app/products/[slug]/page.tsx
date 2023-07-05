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
          <div className="flex flex-row p-24 justify-between flew-wrap">
            <div className="bg-[#F1F1F4] w-11/12 rounded-xl">
              <CarouselComponent product={fetchedProduct} />
              <p>Descrição Geral:</p>
              {fetchedProduct && <p>{fetchedProduct.description}</p>}
            </div>
            <div className="bg-[#F1F1F4] w-10/12 basis-40 ml-14 rounded-xl items-center">
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