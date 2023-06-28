
import Carousel from '@/components/organism/carousel';
import Detail_sale from '@/components/organism/detail_sale';


export default function Products({params}:{ params:{slug:string}}){

    return(
        <>
        <Carousel/>
        <Detail_sale/>
        {params.slug}
        </>
        )
}