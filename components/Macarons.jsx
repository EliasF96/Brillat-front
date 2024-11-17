import React from 'react'
import Header from './Header'
import Footer from './Footer'
import { useEffect, useState } from 'react'
export const Macarons = () => {
    const [data, setData] = useState([])
    useEffect(  () => {
         fetchData()
    }, [])
    const fetchData = async () => {
        const response = await fetch( import.meta.env.VITE_API_KEY+"/productsCatalog" )
        const dataParsed =  await response.json() 
        setData(dataParsed)
    }
    
    return (
        <>
            <Header />
            <div className="productsContainer">
                {
                    data.length == 0 ? "Not items Found" : data.map((data, index) => {
                        return (
                            data.category=="macaron" ? 
                            <div className="productContainer" key={index}>
                                <p>{data.name}</p>
                                <img src={data.img}  alt={data.img} />
                                <div className="infoContainer">
                                    <p>{data.description}</p>
                                </div>
                            </div>
                            : ""
                        )
                    })
               }
               
               
            </div>
            <Footer />
        </>
    )
}