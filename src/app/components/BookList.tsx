import React, { useState } from 'react'
import { Icon } from '@iconify-icon/react';
import { Link } from 'react-router-dom';
import Loader from './Loader';

type Props = {
    data: any[],
    lg?: any,
    md?: any,
    sm?: any
}

const BookList = ({
    data,
    lg = 4,
    md = 3,
    sm = 2
}: Props) => {
    return (
        <div className={`grid lg:grid-cols-${lg} md:grid-cols-${md} grid-cols-${sm} z-30`}>
            {data.map((book) => (
            <div className='flex justify-center items-center'>
                <div className='w-full p-2'>
                    <Link to={`/book/${book.id}`}>
                        <img src={book.photo} alt="" style={{ aspectRatio: 4/6,width:'100%' }} className="rounded-lg"/>
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
                        <div className='text-left'>
                            <p className="font-bold text-xl truncate">{book.title}</p>
                            <p className="truncate">{book.description}</p>
                        </div>
                        <div className="text-left flex items-center gap-1 my-[1vh]">
                            <Icon icon={"tabler:coin-filled"}  style={{color: '#ffc700'}} width={24} height={24} />
                            <p className="truncate font-semibold">{(book.amount).toLocaleString('id', {minimumFractionDigits: 0})} Credit</p>
                        </div>
                        <div className='text-left'>
                            <p className="text-sm">Stock {book.stock.toLocaleString('id', {minimumFractionDigits: 0})}</p>
                        </div>
                    </Link>
                </div>
            </div>
            ))}
        </div>
    )
}

export default BookList