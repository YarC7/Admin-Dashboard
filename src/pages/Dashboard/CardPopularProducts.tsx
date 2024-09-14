import Rating from '../../components/Rating';
import { useGetDashboardMetricsQuery } from '../../lib/apiSlice'
import { ShoppingBag } from 'lucide-react';
import { useSelector, useDispatch } from "react-redux";

import React from 'react'


const CardPopularProducts = () => {
  const isSidebarCollapsed = useSelector((state)=> state.global.isSidebarCollapsed);

  const { data: dashboardMetrics, isLoading } = useGetDashboardMetricsQuery();
  return (
    <div className="row-span-3 xl:row-span-6 bg-white shadow-md rounded-2xl pb-16">
        {isLoading ? (
            <div className='m-5'>Loading</div>
        ) : (
            <>
                <h3 className="text-lg font-semibold px-7 pt-5 pb-2">
                    Popular Products
                </h3>
                <hr />
                <div className='overflow-y-auto h-full'>
                    {dashboardMetrics?.popularProducts.map((product) => (
                        <div 
                            key={product.productId}
                            className='flex items-center justify-between gap-3 px-5 py-5 border-b'
                            >
                                <div className='flex items-center gap-3'>  
                                {isSidebarCollapsed && (
                                    <img
                                    src={product.image!}
                                    alt={product.title!}
                                    width={150}
                                    height={200}
                                    className="mb-2 rounded-2xl w-32 h-48"
                                    />
                                )}
                                    <div className='flex flex-col justify-between gap-1'>
                                        <div className='font-bold text-gray-700'>{product.title}</div>
                                        <div className='flex text-sm items-center'>
                                            <span className='font-bold text-blue-500 text-xs'>
                                                ${product.price}
                                            </span>
                                            <span className='mx-2'>|</span>
                                            <Rating rating={product.rating || 0}/>
                                        </div>
                                    </div>
                                </div>

                                <div className='text-xs flex items-center'>
                                    <button className='p-2 rounded-full bg-blue-100 text-blue-600 mr-2'>
                                        <ShoppingBag className='w-4 h-4'/>
                                    </button>
                                    {Math.round(product.sold / 1000)}k Sold
                                </div>

                        </div>
                    ))}
                </div>
            </>
        )}
    </div>
  )
}

export default CardPopularProducts