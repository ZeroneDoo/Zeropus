import React, { useEffect, useState } from 'react'
import { fetchBasic, fetchWithToken } from '../helper/Api.tsx'
import Header from '../components/Header.tsx'
import Loader from '../components/Loader.tsx'
import { Icon } from '@iconify-icon/react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify'

const Rent = () => {
    const [onFetching, setOnFetching] = useState(true)
    const [onRent, setOnRent] = useState(false)
    const [isLoad, setIsLoad] = useState(false)
    const [increment, setIncrement] = useState(1)
    const [rent, setRent] = useState([])

    useEffect(() => {
        fetchData()
    }, [])
    
    const fetchData = async () => {
        try {
            setOnFetching(true)

            const response = await fetchWithToken("/transaction?limit=8")
            setRent(response.data)

            setOnFetching(false)
        } catch (error) {
            setOnFetching(false)
            console.log(error)
        }
    }
    
    const deleteRent = async (id) => {
        try {
            setOnRent(true)

            // deleted
            await fetchWithToken(`/transaction/delete/${id}`, "DELETE")
    
            // load again
            const response = await fetchWithToken("/transaction?limit=8")
            setRent(response.data)
    
            setOnRent(false)
        } catch (error) {
            setOnRent(false)
            console.log(error)
        }
    }

    // load data updated when scroll end reach
    const loadHandler = async (page) => {
        try {
            setIsLoad(true)

            const response = await fetchBasic(`/transaction?limit=8&page=${page}`)

            if(!response.data.length) {
                toast.info("All data has been loaded")
                setIsLoad(false)
                return
            }

            setRent(prev => [...prev, ...response.data])
            setIncrement(prev => prev + 1)
            
            setIsLoad(false)
        } catch (error) {
            setIsLoad(false)
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
                    {onRent ? (
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

                            <p className="text-5xl font-bold text-left mt-[10vh]">Rent</p>
                        </div>
                    </div>

                    {/* content */}
                    <div className="gap-4 px-[10vw] my-[4vh]">
                        {/* list */}
                        {rent.map((item) => (
                            <div className="flex justify-between p-[1vw]">
                                {/* left */}
                                <Link to={`/book/${item.book.id}`} className="flex items center gap-2">
                                    <img src={item.book.photo} className="rounded-lg w-[100px]" alt="" style={{ aspectRatio: 4/6 }} />
                                    <div className='text-left flex flex-col justify-between'>
                                        <div>
                                            <p className="sm:text-xl text-lg font-bold truncate">{item.book.title}</p>
                                            <div className="text-left flex items-center gap-1 my-[1vh]">
                                                <Icon icon={"tabler:coin-filled"}  style={{color: '#ffc700'}} width={24} height={24} />
                                                <p className="truncate font-semibold sm:text-base text-sm">{(item.freezed_credit).toLocaleString('id', {minimumFractionDigits: 0})} Credit</p>
                                            </div> 
                                            <div className="flex items-center gap-2 text-left mb-[1vh]">
                                                <Icon icon={"noto:star"} width={24} height={24} />
                                                <p className="sm:text-base text-sm font-semibold">{parseFloat(item.book.rate).toFixed(1)}</p>
                                            </div>
                                            <div className='text-left'>
                                                <p className="text-sm">Stock {(item.book.stock).toLocaleString('id', {minimumFractionDigits: 0})}</p>
                                            </div>
                                        </div>
                                        <div className='text-left'>
                                            <p className="text-sm">Quantity {(item.stock).toLocaleString('id', {minimumFractionDigits: 0})}</p>
                                        </div>
                                    </div>
                                </Link>

                                {/* right */}
                                <div className="flex flex-col justify-between items-end">
                                    <div>
                                        <p className={`py-1 px-2 sm:text-sm text-xs rounded-lg font-bold ${item.status === "WAITING" ? 'bg-yellow-100 text-yellow-600' : (item.status === "ACCEPTED" ? "bg-green-100 text-green-600" : (item.status === "REJECTED" ? "bg-red-100 text-red-600" : (item.status === "RETURN" ? "bg-blue-100 text-blue-600" : "")))}`}>{item.status}</p>
                                    </div>
                                        {item.status === "WAITING" ? (
                                            <button type='button' onClick={()=>deleteRent(item.id)}>
                                                <Icon icon={"ion:trash-outline"}  style={{color: '#CD0C0D'}} width={24} height={24} />
                                            </button>
                                        ) : (
                                            item.status === "ACCEPTED" ? (
                                                <p className="text-sm">Ends on </p>
                                            ) : (
                                                <></>
                                            )
                                        )}
                                </div>
                            </div>
                        ))}
                        {rent.length > 8 ? (
                            <div className="w-full flex justify-end">
                                {/* see other */}
                                {isLoad ? (
                                    <Loader fill2={"#CD0C0D"} fill1={"white"} width={24} height={24} />
                                ) : (
                                    <button className="flex items-center gap-1 text-primary active:opacity-70" onClick={() => loadHandler(increment + 1)}>
                                        <p className="font-semibold">Load More</p>
                                        <Icon icon={"mingcute:down-line"} style={{color: '#CD0C0D'}}  width={24} height={24}/>
                                    </button>
                                )}
                            </div>
                        ) : (<></>)}
                    </div>
                </div>
            )}
        </div>
    )
}

export default Rent