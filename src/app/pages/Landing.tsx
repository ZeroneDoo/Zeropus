import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Slider from "react-slick";
import { fetchBasic } from '../helper/Api.tsx';
import Header from '../components/Header.tsx';
import Loader from '../components/Loader.tsx'
import { Icon } from '@iconify-icon/react';
import Footer from '../components/Footer.tsx';
import BookList from '../components/BookList.tsx';
import { toast } from 'react-toastify'

const Landing = () => {
  const [onFetching, setOnFetching] = useState(true)
  const [populars, setPopulars] = useState([])
  const [books, setBooks] = useState([])
  const [increment, setIncrement] = useState(1)
  const [isLoad, setIsLoad] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = async () => {
    try {
      setOnFetching(true)
      const popular = await fetchBasic(`/book/popular`)
      const data = await fetchBasic(`/book?limit=8`)
      setPopulars(popular.data)
      setPopulars(popular.data)
      setBooks(data.data)
      
      setOnFetching(false)
    } catch(error) {
      console.log(error)
      setOnFetching(false)
    }
  }

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
  
  const settingCar = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 4,
    initialSlide: 0,
    autoplay: true,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
    ]
  }
  return (
    <div className='font-nunito text-dark'>
      {/* navabr */}
      <Header />
      {/* hero image */}
      <div className='flex justify-between py-[10vh] px-[10vw] items-center sm:h-[80vh] h-[80vh] overflow-hidden relative'>
          {/* element 1 */}
          <div className='rounded-tl-full w-32 h-[30vh] bg-red-200 absolute bottom-0 right-0'></div>
          <div className='sm:w-[20vw] sm:h-[20vw] w-[30vw] h-[30vw] bg-blue-200 absolute bottom-0 left-0 rotate-45'></div>

          {/* left */}
          <div className='text-left font-bold sm:w-[50%] w-[100%] relative px-[5vw]'>
            <p className='text-4xl mb-2'><span className='text-5xl font-bold'>Z</span>ero<span className='text-primary text-4xl'><span className='text-5xl'>P
            </span>us</span></p>
            <p className='text-4xl mb-6'><span className='text-5xl'>P</span>erpustakaan <span className='text-5xl'>D</span>igital</p>
            <p className='mb-6 text-sm font-bold'>"Orang yang memiliki pemikiran lebih cerdas adalah orang yang gemar membaca". Kami meneyediakan bermacam macam buku dengan genre yang bervariasi, mari baca buku disini untuk meningkatkan kemampuan membaca
            </p>
            <Link to={"/books"} className='btn-primary-rounded'>Jelajahi Sekarang</Link>
            {/* <img src="./hero_book.png" alt="" className='absolute top-0 right-0 -z-10 sm:hidden block'/> */}
          </div>
          
          {/* right */}
          <div className='w-[50%] sm:block hidden overflow-hidden  h-[100%]'>
            <img src="./hero_book.png" alt="" className='' />
          </div>
      </div>
      {/* content */}
      <div>
        {/* popular container */}
        <div className='relative h-fit w-full'>
          {/* element */}
          <div className='rounded-bl-[4vw] w-32 h-[20vh] bg-yellow-200 absolute top-0 right-0 -z-10'></div>
          <div className='rounded-tr-full w-[30vw] h-[30vw] bg-gray/20 absolute bottom-0 left-0 -z-10'></div>

          {/* popular */}
          <div className="py-[10vw] px-[10vw]">
            <p className='font-bold text-2xl mb-[5vh]'><span className="text-3xl">P</span>opular <span className='text-3xl'>B</span>ook</p>

            {/* slider */}
            {onFetching ? (
              <div className="flex items-center justify-center p-8 h-[50vh]">
                <Loader fill2={"#CD0C0D"} fill1={"white"} width={"60px"} height={"60px"} />
              </div>
            ) : (
              <Slider {...settingCar}>
                {populars.map((book) => (
                  <div className='flex justify-center items-center'>
                    <div className='w-full p-2'>
                      <Link to={`book/${book.id}`}>
                        <img src={book.photo} alt="" style={{ aspectRatio: 4/6,width:'100%' }} className="rounded-lg"/>
                        
                        <div className='text-left'>
                          <p className="font-bold text-xl truncate">{book.title}</p>
                          <p className="truncate">{book.description}</p>
                        </div>
                      </Link>
                    </div>
                  </div>
                ))}
              </Slider>
            )}
          </div>
        </div>

        {/* other book container */}
        <div className='relative h-fit w-full'>
          {/* element */}
          <div className='rounded-br-full w-[30vw] h-[30vw] bg-blue-200 absolute top-0 left-0 -z-20'></div>

          {/* other book */}
          <div className="py-[10vw] px-[10vw]">
            <p className='font-bold text-2xl mb-[5vh]'><span className="text-3xl">O</span>ther <span className='text-3xl'>B</span>ook</p>
            
            {/* content book */}
            {onFetching ? (
              <div className="flex items-center justify-center p-8 h-[50vh]">
                <Loader fill2={"#CD0C0D"} fill1={"white"} width={"60px"} height={"60px"} />
              </div>
            ) : (
              <>
              <div className="w-full flex justify-end">
                  {/* see other */}
                  <button className="flex items-center gap-1 text-primary active:opacity-70" onClick={() => navigate("/book")}>
                      <p className="font-semibold">See More</p>
                      {/* <Icon icon={"mingcute:down-line"} style={{color: '#CD0C0D'}}  width={24} height={24}/> */}
                      <Icon icon={"mingcute:right-line"} style={{color: '#CD0C0D'}}  width={24} height={24}/>
                  </button>
              </div>

              <BookList data={books} lg={4} md={3} sm={1}/>
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
              </>
            )}
          </div>
        </div>
      </div>
      {/* footer */}
      <Footer />
    </div>
  )
}

export default Landing