import React, { useEffect, useState } from 'react'
import Header from '../components/Header.tsx'
import Loader from '../components/Loader.tsx'
import { fetchBasic, fetchWithToken } from '../helper/Api.tsx'
import { Icon } from '@iconify-icon/react';
import { useNavigate } from 'react-router-dom';

import { useLogin } from '../context/AuthProvider.tsx';

const Credit = () => {
    const { isLogin } = useLogin()
    const [onFetching, setOnFetching] = useState(true)
    const [credit, setCredit] = useState([])
    const [onPayment, setOnPayment] = useState(false)
    const navigate = useNavigate()

    useEffect(() => {
        fetchData()
    }, [])
    
    const fetchData = async () => {
        try {
            setOnFetching(true)

            const response = await fetchBasic("/credit")
            setCredit(response)

            setOnFetching(false)
        } catch (error) {
            setOnFetching(false)
            console.log(error)
        }
    }

    const paymentHandler = async (id, amount) => {
        try {
            if(isLogin()){
                setOnPayment(true)

                const data = {
                    description : `Zeropus ${amount.toLocaleString('id', {minimumFractionDigits: 0})} Credit`,
                    credit_id : id,
                    invoice_duration : 3600,
                    success_url: window.location.href
                }
            
                const response = await fetchWithToken("/payment/create", "POST", {}, JSON.stringify(data))
                window.location.href = response.checkout_link
                setOnPayment(false)
            }else{
                navigate("/login")
            }
        } catch (error) {
            setOnPayment(false)
            console.log(error)
        }
    }
  return (
    <div className="font-nunito text-dark">
        <Header />

        {onFetching ? (
            <div className="flex items-center justify-center h-screen flex-1">
                <Loader 
                    fill1={"white"} 
                    fill2={"#CD0C0D"} 
                    width={"70px"} 
                    height={"70px"} 
                />
            </div>
        ) : (
            <div>
                {onPayment ? (
                    <div className="bg-black/50 absolute w-screen h-screen flex items-center justify-center z-10">
                        <Loader fill1={"#CD0C0D"} fill2={"black"} width={"20px"} height={"20px"} />
                    </div>
                ) : (<></>)}
                <div className='w-full relative h-[50vh] flex items-center overflow-hidden'>
                    {/* hero content */}
                    <div className='w-full px-[10vw]'>
                        {/* element */}
                        <div className='rounded-tl-full w-[20vh] h-[30vh] bg-red-200 absolute bottom-0 right-0 -z-10'></div>
                        <div className='rounded-full w-6 h-6 bg-red-700 absolute bottom-[35vh] right-[5vh] -z-10'></div>
                        <div className='sm:w-[15vw] sm:h-[15vw] w-[30vw] h-[30vw] bg-blue-100 absolute top-0 -left-[8vw] -z-10'></div>
                        <div className='w-6 h-6 top-[40vh] bg-blue-600 absolute left-[5vh] -z-10'></div>

                        <p className="text-5xl font-bold text-left mt-[10vh]">Credit</p>
                    </div>
                </div>

                {/* content */}
                <div className="grid lg:grid-cols-4 md:grid-cols-3 grid-cols-2 gap-4 px-[10vw] my-[4vh]">
                    {credit.map((item) => (
                        <button onClick={()=>paymentHandler(item.id, item.amount)} disabled={onPayment} className="p-5 rounded-lg text-left bg-[#F2F4F6] flex gap-3 focus:ring-4 focus:outline-none focus:ring-[#f2f4f667]">
                            <Icon icon={"tabler:coin-filled"}  style={{color: '#ffc700'}} width={24} height={24} />
                            <div>
                                <p className="text-md font-bold">{item.amount.toLocaleString('id', {minimumFractionDigits: 0})} Credit</p>
                                <p className="text-sm font-bold">Rp.{item.price.toLocaleString('id', {minimumFractionDigits: 0})}</p>
                            </div>
                        </button>
                    ))}
                </div>
            </div>
        )}
    </div>
  )
}

export default Credit