import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom';

const Reader = () => {
    const location = useLocation();

    // Parse query parameters from the location search string
    const queryParams = new URLSearchParams(location.search);

    // Access individual query parameters
    const url = queryParams.get('source');

    useEffect(() => {
       fetchData()
    }, [url])
    
    const fetchData = async () => {
        try {
            const res = await fetch(`http://localhost:3001/fetch-pdf?source=${url}`);
            const response = await res.json()
            
            console.log(response)
            $(document).ready(() => {
                $("#read").flipBook({
                    //Layout Setting
                    pdfUrl: response.source,
                    lightBox:true,
                    layout:3,
                    currentPage:{vAlign:"bottom", hAlign:"left"},
                    // BTN SETTING
                    btnShare : {enabled:false},
                    btnPrint : {
                        hideOnMobile:true
                    },
                    // btnDownloadPages : {
                    // enabled: true,
                    // title: "Download pages",
                    // icon: "fa-download",
                    // icon2: "file_download",
                    // url: "images/pdf.rar",
                    // name: "allPages.zip",
                    // hideOnMobile:false
                    // },
                    btnColor:'rgb(255,120,60)',
                    sideBtnColor:'rgb(255,120,60)',
                    sideBtnSize:50,
                    sideBtnBackground:"transparent",
                    sideBtnRadius:20,
                    btnSound:{vAlign:"top", hAlign:"left"},
                    btnAutoplay:{vAlign:"top", hAlign:"left"},
                    // SHARING
                    // btnShare : {
                    // enabled: true,
                    // title: "Share",
                    // icon: "fa-share-alt"
                    // },
                    // facebook : {
                    // enabled: true,
                    // url: "ismanyan.github.io/Pdf_flipbook.demo.github.io/pdf/pdf.pdf"
                    // },
                    // google_plus : {
                    // enabled: false
                    // },
                    // email : {
                    // enabled: true,
                    // url: "https://ismanyan.github.io/Pdf_flipbook.demo.github.io/pdf/pdf.pdf",
                    // title: "PDF KPK",
                    // description: "Silahkan click link di bawah untuk melihat / mengunduf pdf"
                    // },
                    // twitter : {
                    // enabled: true,
                    // url: "https://ismanyan.github.io/Pdf_flipbook.demo.github.io/pdf/pdf.pdf"
                    // },
                    // pinterest : {
                    // enabled: true,
                    // url: "https://ismanyan.github.io/Pdf_flipbook.demo.github.io/pdf/pdf.pdf"
                    // }
                });
                $("#read").click()
            })
        } catch (error) {
            console.error('Error fetching PDF:', error);
        }
    }

    return (
        <div>
            <a id="read" hidden>read</a>
        </div>
    )
}

export default Reader