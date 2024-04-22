import React, { useEffect, useState } from 'react'
import Header from '../components/Header.tsx'
import Loader from '../components/Loader.tsx'
import { fetchBasic } from '../helper/Api.tsx'
import BookList from '../components/BookList.tsx'
import { toast } from 'react-toastify'
import { Icon } from '@iconify-icon/react';
import RadioButton from '../components/RadioButton.tsx'

const Book = () => {
    const [onFetching, setOnFetching] = useState(true)
    const [onFetchBook, setOnFetchBook] = useState(false)
    const [books, setBooks] = useState([])
    const [increment, setIncrement] = useState(1)
    const [isLoad, setIsLoad] = useState(false)
    const [category, setCategory] = useState([])
    const [categoryId, setCategoryId] = useState(-1)

    useEffect(() => {
        fetchData()
    }, [])

    const fetchData = async () => {
        try {
            setOnFetching(true)

            const res = await fetchBasic(`/book?limit=8`)
            const resCategory = await fetchBasic(`/category`)
            setBooks(res.data)
            setCategory(resCategory)

            setOnFetching(false)
        } catch (error) {
            setOnFetching(false)
            console.log(error)
        }
    }

    // load data updated when scroll end reach
    const loadHandler = async (page) => {
        try {
        setIsLoad(true)

        const response = await fetchBasic(`/book?limit=8&page=${page}`)

        if(!response.data.length) {
            toast.info("All data has been loaded")
            setIsLoad(false)
            return
        }

        setBooks(prev => [...prev, ...response.data])
        setIncrement(prev => prev + 1)
        
        setIsLoad(false)
        } catch (error) {
        setIsLoad(false)
        console.log(error)
        }
    }

    const onSearch = async (e) => {
        try {
            e.preventDefault()
            const query = e.target.search.value
            setOnFetchBook(true)

            let url = `/book?limit=8&search=${query}`
            if(categoryId != -1) {
                url += `&category=${categoryId}`
            }
            const res = await fetchBasic(url)
            setBooks(res.data)

            setOnFetchBook(false)
        } catch (error) {
            setOnFetchBook(false)
            console.log(error)
        }
        
    }

    const changeHandler = async (e) => {
        try {
            const { value } = e.target
            setCategoryId(value)
            setOnFetchBook(true)

            let url = `/book?limit=8`
            if(value != -1) {
                url += `&category=${value}`
            }
            const res = await fetchBasic(url)
            setBooks(res.data)

            setOnFetchBook(false)
        } catch (error) {
            setOnFetchBook(false)
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
                    <div className='w-full relative h-[50vh] flex items-center overflow-hidden'>
                        {/* hero content */}
                        <div className='w-full px-[10vw]'>
                            {/* element */}
                            <div className='rounded-tl-full w-[20vh] h-[30vh] bg-red-200 absolute bottom-0 right-0 -z-10'></div>
                            <div className='rounded-full w-6 h-6 bg-red-700 absolute bottom-[35vh] right-[5vh] -z-10'></div>
                            <div className='sm:w-[15vw] sm:h-[15vw] w-[30vw] h-[30vw] bg-blue-100 absolute top-0 -left-[8vw] -z-10'></div>
                            <div className='w-6 h-6 top-[40vh] bg-blue-600 absolute left-[5vh] -z-10'></div>
    
                            <p className="text-5xl font-bold text-left mt-[10vh] text-dark">Library Book</p>
                        </div>
                    </div>
    
                    {/* content */}
                    <div className="px-[10vw] my-[4vh] flex sm:flex-row flex-col gap-[2vw]">
                        <div className="sm:w-1/2 w-full">
                            {/* search */}
                            <form onSubmit={onSearch} className="h-fit flex items-center">
                                <input type="text" name="search" id="search" className="bg-gray-50 border border-[#e3e6f0] text-gray-900 text-base rounded-tl-lg rounded-bl-lg focus:ring-primary focus:border-primary block w-full p-2.5" placeholder='Search book by title' />
                                <button className="p-2.5 bg-primary rounded-tr-lg rounded-br-lg flex items-center">
                                    <Icon icon={"mingcute:search-line"} style={{color: 'white'}}  width={25} height={25}/>
                                </button>
                            </form>
                            {/* category */}
                            <div className=" bg-[#F2F4F6] text-left text-dark my-4">
                                <p className='font-bold text-md py-[2vw] px-[2vw]'>Categories</p>
                                {/* list */}
                                <RadioButton
                                    id={`category`}
                                    name={"category"}
                                    onChange={changeHandler}
                                    data={{ name: "All Category" }}
                                    value={-1}
                                    checked={categoryId == -1}
                                />
                                {category.map((item) => (
                                    <RadioButton
                                        id={`category-${item.id}`}
                                        name={"category"}
                                        onChange={changeHandler}
                                        data={item}
                                        value={item.id}
                                        checked={categoryId == item.id}
                                    />
                                ))}
                            </div>
                        </div>
                        <div className="w-full">
                            {onFetchBook ? (
                                <div className="flex items-center justify-center p-8 h-[50vh]">
                                    <Loader fill2={"#CD0C0D"} fill1={"white"} width={"60px"} height={"60px"} />
                                </div>
                            ) : (
                                <>
                                    <BookList data={books} lg={3} md={2} sm={1}/>
                                    {books.length > 8 ? (
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
                                </>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </div>
      )
}

export default Book