import React, { useState, useEffect } from 'react';
import { BadgeDollarSign as Badge } from 'lucide-react';
import Product_forms from './Product_forms';
import { api } from '@/utils/api';
import { getCookie } from 'cookies-next';
import { Order, OrderItem } from '@/types/orders';

export default function Product({ screens }) {
  const [boolforms, setBoolForms] = useState(false);
  const [widthlist, setwidthlist] = useState('');
  const [orders, setOrders] = useState<Order[]>([]);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await api.get('/orders', {
          headers: {
            'Authorization': `Token ${getCookie('token')}`,
          },
        });
        setOrders(response.data);

      } catch (error) {
        console.error('Error fetching orders:', error);
      }
    };
    fetchOrders();
  }, []);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      if (screens.isLargeScreen) {
        setwidthlist("w-56");
      } else if (screens.isMediumScreen) {
        setwidthlist("w-44 self-center items-center");
      } else if (screens.isSmallScreen) {
        setwidthlist("w-28  flex flex-col text-xs break-all self-center items-center");
      } else if (screens.isNanoScreen) {
        setwidthlist(" w-[70px] flex flex-col text-xs break-all justif  self-center items-center ");


      } else if (screens.isSmallNanoScreen) {
        setwidthlist(" w-[44px] flex flex-col  text-xs break-all justif  self-center items-center ");


      } else {
        setwidthlist(" w-[33px] flex flex-col  text-xs break-all justif  self-center items-center ");
      }
    }
  }, [screens.isLargeScreen, screens.isMediumScreen, screens.isSmallScreen, screens.isNanoScreen, screens.isSmallNanoScreen]);

  const handleformClick = () => {
    if (typeof window !== 'undefined') {
      setBoolForms(true)
    }

  }


  return (
    <div className={` select-none `}>
      {boolforms ? (
        <>
          <Product_forms screens={screens} boolforms={boolforms} setBoolForms={setBoolForms} />
        </>
      ) : (
        <div className='mx-2'>
          <table className=" w-full border-collapse rounded-lg overflow-hidden ">
            <thead>
              <tr className="bg-[#ffffff] shadow-xl">
                <th className="p-2 border-e-2 text-center 2xl:w-[165px] xl:w-[150px] lg:w-[130px] md:w-[100px] break-all">Id</th>
                <th className="p-2 border-e-2 text-center 2xl:w-[165px] xl:w-[150px] lg:w-[130px] md:w-[100px] break-all">Nome do Produto</th>
                <th className="p-2 border-e-2 text-center 2xl:w-[165px] xl:w-[150px] lg:w-[130px] md:w-[100px] break-all">Quantidade</th>
                <th className="p-2 border-e-2 text-center 2xl:w-[165px] xl:w-[150px] lg:w-[130px] md:w-[100px] break-all">CNPJ</th>
                <th className="p-2 border-e-2 text-center 2xl:w-[165px] xl:w-[150px] lg:w-[130px] md:w-[100px] break-all">Envio</th>
                <th className="p-2 border-e-2 text-center 2xl:w-[165px] xl:w-[150px] lg:w-[130px] md:w-[100px] break-all">Data</th>
                <th className="p-2 border-e-2 text-center 2xl:w-[165px] xl:w-[150px] lg:w-[130px] md:w-[100px] break-all">Action</th>
              </tr>
            </thead>
            <br />
            <tbody>
              {/* Replace the existing map function with the orders map */}
              {orders.map((order) => (
                <React.Fragment key={order.id}>
                  {order.order_items.map((orderItem) => (
                    <tr
                      key={orderItem.id}
                      className={`${order.id % 2 === 0 ? 'bg-[#F5F6F7]' : 'bg-[#b8b8b8] shadow-xl b-1'} `}
                    >
                      <td className="p-2 border-e-2 text-center 2xl:w-[165px] xl:w-[150px] lg:w-[130px] md:w-[100px] break-all">{orderItem.id}</td>
                      <td className="p-2 border-e-2 text-center 2xl:w-[165px] xl:w-[150px] lg:w-[130px] md:w-[100px] break-all">{orderItem.name.length > 15 ? `${orderItem.name.substring(0, 15)}...` : orderItem.name}</td>
                      <td className="p-2 border-e-2 text-center 2xl:w-[165px] xl:w-[150px] lg:w-[130px] md:w-[100px] break-all">{orderItem.quantity}</td>
                      <td className="p-2 border-e-2 text-center 2xl:w-[165px] xl:w-[150px] lg:w-[130px] md:w-[100px] break-all">{order.company}</td>
                      <td className="p-2 border-e-2 text-center 2xl:w-[165px] xl:w-[150px] lg:w-[130px] md:w-[100px] break-all">
                        {order.status === "pending" && <p className="font-bold text-rose-600">{order.status}</p>}
                        {order.status === "processing" && <p className="font-bold text-yellow-500">{order.status}</p>}
                        {order.status === "shipped" && <p className="font-bold text-blue-500">{order.status}</p>}
                        {order.status === "delivered" && <p className="font-bold text-green-500">{order.status}</p>}
                        {order.status === "returned" && <p className="font-bold text-red-500">{order.status}</p>}
                        {order.status === "canceled" && <p className="font-bold text-gray-500">{order.status}</p>}
                      </td>
                      <td className="p-2 border-e-2 text-center 2xl:w-[165px] xl:w-[150px] lg:w-[130px] md:w-[100px] break-all">{order.created_at}</td>
                      <td className="p-2 border-e-2 text-center 2xl:pl-16 2xl:w-[165px] xl:pl-14 xl:w-[150px] lg:pl-12 lg:w-[130px] md:pl-8 md:w-[100px] pl-4 break-all items-center cursor-pointer " onClick={() => handleformClick(orderItem)}>
                        <Badge
                          size={24}
                          className="w-max self-center h-8 bg-[#FEBD2F] hover:stroke-amber-950 cursor-pointer rounded-3xl shadow-md shadow-black hover:shadow-amber-400 active:bg-[#f7aa02] active:bg-[#9e7620]"
                        />
                      </td>
                    </tr>
                  ))}
                </React.Fragment>
              ))}
            </tbody>
          </table>
        </div>
      )}
      {/* {Array.from({ length: items }).map((_, index) => (
          <div key={order.id}>

            <div className={`flex flex-row m-2 p-2 ${index % 2 == 0 ? ("bg-[#F5F6F7]") : "bg-[#b8b8b8]"} justify-between items-start rounded-md  shadow-lg shadow-orange-200 hover:shadow-3xl hover:shadow-orange-500  transition-all`}>
              <div className={`flex self-center justify-self-center 2xl:w-96 justify-center  border-e-2 `}><p>{index}</p></div>
              <div className={`flex self-center justify-self-center 2xl:w-96 justify-center  border-e-2 `}><p>Name...</p></div>
              <div className={`flex self-center justify-self-center 2xl:w-96 justify-center  border-e-2 `}><p>X</p></div>
              <div className={`flex self-center justify-self-center 2xl:w-96 justify-center  border-e-2 `}><p>xxxxxxxxxxxxxx</p></div>
              <div className={`flex self-center justify-self-center 2xl:w-96 justify-center  border-e-2 `}><p className="font-bold">Send</p></div>
              <div className={`flex self-center justify-self-center 2xl:w-96 justify-center    cursor-pointer `}>

                <div className='flex flex-col justify-center items-center '>
                  <Badge onClick={handleformClick} size={24} className='w-max   h-8  bg-[#FEBD2F] hover:stroke-amber-950 cursor-pointer rounded-3xl shadow-md shadow-black hover:shadow-amber-400 active:bg-[#f7aa02] active:bg-[#9e7620]' />
                </div>

              </div>
            </div>
          </div>
        ))}

      </>} */}
    </div >
  )


}


