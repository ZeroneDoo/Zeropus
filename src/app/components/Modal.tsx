import React from 'react'
import {
    TERipple,
    TEModal,
    TEModalDialog,
    TEModalContent,
    TEModalHeader,
    TEModalBody,
    TEModalFooter,
} from "tw-elements-react";
import Loader from './Loader.tsx';

type Props = {
    showModal: boolean,
    setShowModal: any,
    title: string,
    body: any,
    submitHandler: any,
    onFetching:boolean,
    labelBtn: string
}

const Modal = ({
    showModal,
    setShowModal,
    title,
    body,
    submitHandler,
    onFetching,
    labelBtn
} : Props) => {
  return (
    <TEModal show={showModal} setShow={setShowModal}>
        <TEModalDialog>
        <TEModalContent>
            <TEModalHeader>
            {/* <!--Modal title--> */}
            <h5 className="text-xl font-medium leading-normal text-neutral-800 dark:text-neutral-200">
                {title}
            </h5>
            {/* <!--Close button--> */}
            <button
                type="button"
                className="box-content rounded-none border-none hover:no-underline hover:opacity-75 focus:opacity-100 focus:shadow-none focus:outline-none"
                onClick={() => setShowModal(false)}
                aria-label="Close"
            >
                <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="h-6 w-6"
                >
                <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                />
                </svg>
            </button>
            </TEModalHeader>
            {/* form */}
            <form action="" onSubmit={submitHandler}>
                {/* <!--Modal body--> */}
                <TEModalBody>{body}</TEModalBody>
                <TEModalFooter>
                <TERipple rippleColor="light">
                    <button
                    type="button"
                    className="inline-block rounded bg-primary-100 px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-primary-700 transition duration-150 ease-in-out hover:bg-primary-accent-100 focus:bg-primary-accent-100 focus:outline-none focus:ring-0 active:bg-primary-accent-200"
                    onClick={() => setShowModal(false)}
                    >
                    Close
                    </button>
                </TERipple>
                <TERipple rippleColor="light">
                    <button
                    disabled={onFetching}
                    className="ml-1 flex items-center gap-2 rounded bg-primary px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)]"
                    >{onFetching ? (
                        <>
                            <Loader fill1={"#CD0C0D"} fill2={"white"} width={"20px"} height={"20px"} />{labelBtn}
                        </>
                    ) : (
                        labelBtn
                    )}
                    </button>
                </TERipple>
                </TEModalFooter>
            </form>
        </TEModalContent>
        </TEModalDialog>
    </TEModal>
  )
}

export default Modal