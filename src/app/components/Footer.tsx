import React, { useEffect, useState } from 'react'
import { Icon } from '@iconify-icon/react';

const Footer = () => {
    return (
        <div className="bg-primary sm:h-[15vh] h-full w-full flex items-center justify-between sm:flex-row flex-col gap-[3vh] px-[10vw] sm:py-5 py-[5vw]">
            {/* left */}
            <div className="flex items-center gap-3">
              <Icon icon={"subway:book"} style={{color: 'white'}} width={32} height={32} />
              <p className="font-bold text-xl text-white">ZeroPus</p>
            </div>
            {/* right */}
            <div className="flex items-center gap-[4vw] text-white sm:flex-row flex-col">
              {/* copyright */}
              <div className="flex items-center gap-1">
                &copy;
                <p className="font-bold text-sm text-white">Copyright 2024. Powered by ZeroneDoo</p>
              </div>
              {/* terms */}
              <div className="flex items-center">
                <p className="font-bold text-sm text-white">Terms of Services</p>
              </div>
              {/* social media */}
              <div className="flex items-center gap-5">
                <Icon icon={"ic:baseline-facebook"} style={{color: 'white'}} width={24} height={24} />
                <Icon icon={"mdi:twitter"} style={{color: 'white'}} width={24} height={24} />
                <Icon icon={"mdi:youtube"} style={{color: 'white'}} width={24} height={24} />
              </div>
            </div>
      </div>
    )
}

export default Footer