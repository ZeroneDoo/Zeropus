import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { fetchWithToken } from '../helper/Api.tsx'
import Header from '../components/Header.tsx'
import icon from '../../utils/icon.tsx'
import Loader from '../components/Loader.tsx'
import { useLogin } from '../context/AuthProvider.tsx'
import { toast } from 'react-toastify'
import { Rating } from 'react-simple-star-rating'
import { Icon } from '@iconify-icon/react';
import Modal from '../components/Modal.tsx'
import { getData, storeData } from '../helper/LocalStorage.tsx'

const DetailBook = () => {
    const { isLogin, updateUser } = useLogin()
    const { id } = useParams()
    const [onFetching, setOnFetching] = useState(true)
    const [onPostReview, setOnPostReview] = useState(false)
    const [onSaveBook, setOnSaveBook] = useState(false)
    const [isSaveBook, setIsSaveBook] = useState(false)
    const [onRent, setOnRent] = useState(false)
    const [ratingValue, setRatingValue] = useState(0)
    const [book, setBook] = useState({})
    const [showModal, setShowModal] = useState(false)
    const [stock, setStock] = useState(1)
    const navigate = useNavigate();

    useEffect(() => {
      fetchData()
    }, [id])

    const fetchData = async () => {
        try {
            setOnFetching(true)

            const response = await fetchWithToken(`/book/${id}`)
            setBook(response)
            setRatingValue(response?.hasUlasan?.rate ?? 0)
            setIsSaveBook(response?.is_save)

            if(response) {
                initFlipBook(response.source)
            }

            setOnFetching(false)
        } catch (error) {
            console.log(error)
        }
    } 
    
    const initFlipBook = async (url) => {
        try {
            const res = await fetch(`http://localhost:3001/fetch-pdf?source=${url}`);
            const pdfbook = await res.json()
            
            $("#read").flipBook({
                //Layout Setting
                pdfUrl: pdfbook.source,
                lightBox:true,
                layout:3,
                currentPage:{vAlign:"bottom", hAlign:"left"},
                // BTN SETTING
                btnShare : {enabled:false},
                btnPrint : {
                    hideOnMobile:true
                },
                btnColor:'#CD0C0D',
                sideBtnColor:'#CD0C0D',
                sideBtnSize:50,
                sideBtnBackground:"transparent",
                sideBtnRadius:20,
                btnSound:{vAlign:"top", hAlign:"left"},
                btnAutoplay:{vAlign:"top", hAlign:"left"},
                // SHARING
            });
        } catch (error) {
            console.log(error)
        }
    }

    const saveBookmark = async (id) => {
        try {
            setOnSaveBook(true)

            if(isLogin()) {
                const data = {
                    book_id: id
                }
                const response = await fetchWithToken("/bookmark/create", "POST", {}, JSON.stringify(data))
                setIsSaveBook((prev) => !prev)
                
                const responseNew = await fetchWithToken(`/book/${id}`)
                setBook(responseNew)

                toast.success("Success to save book");
            }else{
                navigate("/login")
            }
            
            setOnSaveBook(false)
        } catch (error) {
            setOnSaveBook(false)
            toast.error("Failed to save book");
            console.log(error)
        }
    }

    const handleRating = (rate) => {
        setRatingValue(rate)
    }

    const handlerReview = async (e) => {
        try {
            setOnPostReview(true)
            e.preventDefault()
        
            const data = {
                book_id: book.id,
                rate: ratingValue,
                description: e.target.review.value
            }
            
            if(book?.hasUlasan) {
                const response = await fetchWithToken(`/ulasan/update/${book.hasUlasan.id}`, "POST", {}, JSON.stringify(data))
                toast.success("Success to update review");
            }else{
                const response = await fetchWithToken("/ulasan/create", "POST", {}, JSON.stringify(data))
                toast.success("Success to create review");
            }

            const responseNew = await fetchWithToken(`/book/${id}`)
            setBook(responseNew)
        
            setOnPostReview(false)
        } catch (error) {
            console.log(error)
            toast.error("Failed to create review!");
            setOnPostReview(false)
        }
    }

    const rentHandler = async (e) => {
        try {
            e.preventDefault()
            const user = getData("user")
            setOnRent(true)

            const data = {
                book_id: book.id,
                stock: stock
            }

            const res = await fetchWithToken("/transaction/create", "POST", {}, JSON.stringify(data))

            const responseNew = await fetchWithToken(`/book/${id}`)
            setBook(responseNew)

            // send notif
            toast.success("Success create transaction")
            
            // change display credit
            user.credit -= book.amount * stock
            storeData("user", JSON.stringify(user))
            
            // close modal
            setShowModal(false)    
            setOnRent(false)
        } catch (error) {
            setOnRent(false)
            const json = await error.json()
            toast.error(json.message)
            console.log(error)
        }
    }

    return (
        <div className='font-nunito text-dark'>
            {/* navbar */}
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
                <div className='px-[10vw] py-[17vh]'>
                    {/* element */}
                    <div className='rounded-tl-full w-[20vh] h-[30vh] bg-red-200 absolute bottom-0 right-0 -z-10'></div>
                    <div className='rounded-bl-full w-[20vh] h-[30vh] bg-blue-100 absolute -bottom-[30vh] right-0 -z-10'></div>
                    <div className='rounded-full w-6 h-6 bg-blue-600 absolute -bottom-[38vh] right-[7vh] -z-10'></div>
                    <div className='rounded-full w-6 h-6 bg-red-700 absolute bottom-[35vh] right-[5vh] -z-10'></div>
                    <div className='sm:w-[15vw] sm:h-[15vw] w-[30vw] h-[30vw] bg-yellow-100 absolute top-0 -left-10 rotate-45 -z-10'></div>
                    <div className='sm:top-[20vw] w-6 h-6 top-[40vw] bg-yellow-300 absolute left-[20vh] -z-10'></div>
                    <div className="flex sm:flex-row flex-col justify-center">
                        {/* left */}
                        <div className="sm:w-[25%] w-[100%]">
                            <img src={book.photo} alt="" style={{ aspectRatio: 4/6, width:"100%" }} className="rounded-lg" />
                            {/* icon */}
                            <div className="flex items-center justify-between my-[2vh]">
                                <div className="flex items-center gap-3">
                                    <div className="flex items-center gap-2">
                                        <p className="text-base">{book.bookmark_count}</p>
                                        <Icon icon={"material-symbols:bookmark-outline"} width={24} height={24} />
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <p className="text-base">{book.ulasan_count}</p>
                                        <Icon icon={"jam:message-alt"} width={24} height={24} />
                                    </div>
                                </div>

                                <div>
                                    <div className="flex items-center gap-2">
                                        <Icon icon={"noto:star"} width={24} height={24} />
                                        <p className="text-base">{parseFloat(book.rate).toFixed(1)}</p>
                                    </div>
                                </div>
                            </div>
                            {/* detail */}
                            <div className="grid grid-cols-2 text-left mb-[2vh]">
                                <div>
                                    Penulis
                                </div>
                                <div>
                                    : {book.penulis}
                                </div>
                                <div>
                                    Penerbit
                                </div>
                                <div>
                                    : {book.penerbit}
                                </div>
                                <div>
                                    Tahun Terbit
                                </div>
                                <div>
                                    : {book.tahun_terbit}
                                </div>
                                <div>
                                    Stok
                                </div>
                                <div>
                                    : {book.stock}
                                </div>
                            </div>
                            {/* credit */}
                            <div className="text-left flex items-center gap-1 mb-[2vh]">
                                <Icon icon={"tabler:coin-filled"}  style={{color: '#ffc700'}} width={24} height={24} />
                                <p className="truncate font-semibold">{(book.amount * stock).toLocaleString('id', {minimumFractionDigits: 0})} Credit</p>
                            </div>
                        </div>

                        {/* right */}
                        <div className="sm:w-[75%] w-full text-left sm:px-[3vw] px-0">
                            <p className="font-bold text-3xl mb-[5vh]">{book.title}</p>
                            <p className="text-lg mb-[2vh]">{book.description}</p>
                            <div className="flex flex-wrap gap-2 w-full mb-[5vh]">
                                {book.categories.map((category) => (
                                    <p className="px-3 py-1 rounded-md border border-primary text-primary">{category.name}</p>
                                ))}
                            </div>
                            {/* action */}
                            <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-4">
                                {!book.is_rent ? (
                                    <button id='read' className={`active:opacity-70 w-full bg-primary py-3 rounded-lg text-white text-center flex  items-center justify-center gap-3`}><Icon icon={"ion:book-outline"} width={24} height={24} />Read Now</button>
                                ) : (
                                    <button onClick={() => setShowModal(true)} className={`active:opacity-70 w-full  py-3 rounded-lg  text-center flex  items-center justify-center gap-3 ${book.hasRent ? "text-primary bg-white border border-primary" : "bg-primary text-white"}`}><Icon icon={"ion:book-outline"} width={24} height={24} />{book.hasRent ? "Rent again" : "Rent"}</button>
                                )}
                                <button onClick={() => saveBookmark(book.id)} className={`active:opacity-70 w-full ${isSaveBook ? "text-primary bg-white border border-primary" : "bg-primary text-white"} py-3 rounded-lg text-center flex  items-center justify-center gap-3`} disabled={onSaveBook}>{
                                onSaveBook ? (
                                    <Loader fill1={"#CD0C0D"} fill2={"white"} width={"20px"} height={"20px"} />
                                ): (
                                    <>
                                    <Icon icon={isSaveBook ? "material-symbols:bookmark" : "material-symbols:bookmark-outline"} width={24} height={24} />
                                    {isSaveBook ? "Remove" : "Save"}
                                    </>
                                )}
                                </button>
                            </div>
                        </div>

                        {/* modal */}
                        <Modal
                            showModal={showModal}
                            setShowModal={setShowModal} 
                            title={'Rent Book'}
                            submitHandler={rentHandler}
                            onFetching={onRent}
                            labelBtn='Rent'
                            body={
                                <>
                                    <div className="flex justify-center">
                                        <img src={book.photo} alt="" style={{ aspectRatio: 4/6,width:'50%' }} className="rounded-lg"/>
                                    </div>
                                    <div className="grid grid-cols-4 text-left my-3 gap-2">
                                        <div>
                                            Judul
                                        </div>
                                        <div className="col-span-3">
                                            : {book.title}
                                        </div>
                                        <div>
                                            Tahun Terbit
                                        </div>
                                        <div className="col-span-3">
                                            : {book.tahun_terbit}
                                        </div>
                                        <div>
                                            Stok
                                        </div>
                                        <div className="col-span-3">
                                            : {book.stock}
                                        </div>
                                    </div>
                                    <div className="flex justify-between items-center mt-3">
                                        <div className="text-left flex items-center gap-1 my-[1vh]">
                                            <Icon icon={"tabler:coin-filled"}  style={{color: '#ffc700'}} width={24} height={24} />
                                            <p className="truncate font-semibold">{(book.amount * stock).toLocaleString('id', {minimumFractionDigits: 0})} Credit</p>
                                        </div>
                                        <div className="text-left flex items-center justify-end gap-1 my-[1vh]">
                                            <p className="font-semibold">Qty:</p>
                                            <input type="text" name="email" id="email" className="bg-gray-50 border border-[#e3e6f0] text-gray-900 text-base rounded-lg focus:ring-primary focus:border-primary block w-[20%] p-2.5" onChange={(e) => {
                                                if(book.stock > e.target.value) {
                                                    setStock(e.target.value)
                                                }else if(e.target.stock <= 0) {
                                                    setStock(1)
                                                }else{
                                                    setStock(book.stock)
                                                }
                                            }} value={stock} />
                                        </div>
                                    </div>
                                </>
                            }
                        />
                    </div>
                    {/* ulasan */}
                    <div className="py-[5vh] text-left">
                        <p className='font-bold text-2xl'>Review :</p>
                        {(isLogin() && !book.is_rent) || (isLogin() && book.rent.length) ? (
                            <div
                            className="mt-[3vh]"
                            style={{
                                direction: 'ltr',
                                touchAction: 'none'
                            }}
                            >
                                <Rating
                                    initialValue={ratingValue}
                                    onClick={handleRating}
                                    transition
                                />
                                
                                {/* review */}
                                <form onSubmit={handlerReview}>
                                    <div className="w-full my-4 border border-[#BABABA] rounded-lg bg-gray-50">
                                        <div className="px-4 py-2 bg-white rounded-t-lg">
                                            <label for="review" className="sr-only">Your review</label>
                                            <textarea id="review" rows="4" className="w-full px-0 text-base text-gray-900 bg-white border-0 focus:ring-0" placeholder="Write a review..." required name="review" >{book?.hasUlasan ? book.hasUlasan.description : ""}</textarea>
                                        </div>
                                        <div className="flex items-center justify-between px-3 py-2 border-t border-[#BABABA]">
                                            <button type="submit" disabled={onPostReview} className="flex justify-center items-center py-2.5 px-4 text-base text-center text-white bg-primary rounded-lg focus:ring-4 focus:ring-primary/20 hover:opcaity-70 gap-2">
                                            {onPostReview ? (
                                                <>
                                                    <Loader fill1={"#CD0C0D"} fill2={"white"} width={"20px"} height={"20px"} /> {book?.hasUlasan ? "Update review" : "Post review"}
                                                </>
                                            ): (
                                                book?.hasUlasan ? "Update review" : "Post review"
                                            )}
                                            </button>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        ): (<></>)}

                        {book.ulasan.map((ulasan) => (
                            <div className="p-5 border-t border-[#BABABA] mt-[3vh]">
                                {/* user & rate */}
                                <div className="flex items-center gap-6">
                                    <div className="flex items-center gap-4">
                                        <img src={ulasan.user.profile} alt="" className="circle-avatar ring-1 ring-[#BABABA]"/>
                                        <p className="font-bold text-md">{ulasan.user.username}</p>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <Icon icon={"noto:star"} width={24} height={24} />
                                        <p className="font-bold text-md">{parseFloat(ulasan.rate).toFixed(1)}</p>
                                    </div>
                                </div>
                                {/* comment */}
                                <p className="font-semibold text-base my-[2vh]">{ulasan.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            )}

        </div>
    )
}

export default DetailBook