import Header from './Header'
import Footer from './Footer'
import React, { useEffect, useState } from 'react'
import Button from "react-bootstrap/Button"
import { useNavigate } from 'react-router-dom'
import { FaShoppingCart } from "react-icons/fa"
import { filter } from './filter'
export const Tienda = () => {
    const [data, setData] = useState([])
    const [cartState, setCartState] = useState(0)
    const [filterSelected, setFilterSelected] = useState("")
    const [filterStatus, setFilterStatus] = useState(Boolean)
    const navigate = useNavigate()
    var headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Accept', 'application/json');
    let filterList = document.querySelectorAll("#filterTag")
    let filtersWords = []
    let productListToCart = []
    let productSelected = ""

    useEffect(() => {
        if (!document.cookie.includes("access_token")) {
            alert("Debes ingresar a tu cuenta para acceder a la tienda online!")
            navigate("/")
        } else
            fetchData()

    }, [])

    const fetchData = async (filter) => {
        const response = await fetch(import.meta.env.VITE_API_KEY + "/products", {
            mode: 'cors',
            redirect: 'follow',
            credentials: 'include', // Don't forget to specify this if you need cookies
            headers: headers,
        })
        const dataParsed = await response.json()


        if (dataParsed.hasOwnProperty("error")) {
            alert("Tiempo caducado, reingresa de nuevo a tu cuenta")
        } else {
            setData(dataParsed)
        }

    }

    const addProductToCart = async (item) => {
        let amountCounters = document.querySelectorAll(".amountCounter")
        let itemAproved = true

        for (const i in productListToCart) {
            if (productListToCart[i].amount <= 0) {
                itemAproved = false
                console.log(itemAproved)
            }
        }
        try {
            if (productListToCart.length == 0 || !itemAproved) {
                alert("Debes seleccionar una cantidad!")
            } else {
                let confirm = window.confirm("Confirm Buy this product?");
                if (confirm) {
                    fetch(`${import.meta.env.VITE_API_KEY}/cart`, {
                        method: "POST",
                        body: JSON.stringify(productListToCart),
                        mode: 'cors',
                        redirect: 'follow',
                        credentials: 'include',
                        headers: headers
                    })
                        .then(() => {
                            alert("Added to cart successfully")
                            setCartState(cartState + 1)
                            for (let i = 0; i < amountCounters.length; i++) {
                                amountCounters[i].value = null
                            }
                        })
                } else {
                    alert("Action Denied!")
                }
            }
        } catch (e) {
            console.log("error: " + e)
        }
    }

    for (let i = 0; i < filterList.length; i++) {
        filtersWords.push(filterList[i].textContent)
    }

    // const filter = param => {
    //     if (param.textContent == "all") {
    //         setFilterSelected("")
    //         setFilterStatus(false)
    //     } else {
    //         setFilterSelected(param.textContent)
    //         setFilterStatus(true)
    //     }
    //     if (param.className == "") {
    //         for (const i of filterList) {
    //             i.className = ""
    //         }
    //         param.className = "active"
    //     }
    // }

    const setAmounut = (amount, data) => {
        let repeated = false
        if (amount.target.value <= 0) {
            amount.target.value = null
        }
        productSelected = data
        productSelected.id = data["_id"]
        productSelected.amount = amount.target.value
        for (let i = 0; i < productListToCart.length; i++) {
            if (productListToCart[i]["_id"].includes(data["_id"])) {
                productListToCart[i].amount = data.amount
                repeated = true
            }
            if (productListToCart[i].amount == "") {
                productListToCart.splice(i, 1)
            }
        }

        if (!repeated && productSelected.amount != "") {
            productListToCart.push(productSelected)
            repeated = false
        }
    }
    
    const productStructure = ( index, data) => {
        return (
                <div className="productContainer" id={index} key={index} >
                    <img src={data.img} alt={data.img} />
                    <p>{data.name}</p>
                    <p>Precio: {data.price}$</p>
                    <div className="actions">
                        <div className="amountBuySection">
                            <input type='number' className='amountCounter' placeholder='Cantidad' onChange={(e) => setAmounut(e, data, index)} />
                            <Button variant='success' className='buyButton' onClick={() => addProductToCart(data)}> <FaShoppingCart /></Button>
                        </div>
                    </div>
                </div >
        )
    }
    return (
        <>
            <Header state={cartState} />
            <h1>HACÉ TUS COMPRAS ONLINE Y RETIRALO EN LA SUCURSAL CENTRAL</h1>
            <ul className="filterContainer">
                <li>VER POR:  </li>
                <li id='filterTag' className='active' onClick={(e) => filter(e.target, setFilterStatus, setFilterSelected, filterList)}>Todo</li>
                <li id='filterTag' onClick={(e) => filter(e.target, setFilterStatus, setFilterSelected, filterList) }>macaron</li>
                <li id='filterTag' onClick={(e) => filter(e.target, setFilterStatus, setFilterSelected, filterList) }>pan</li>
                <li id='filterTag' onClick={(e) => filter(e.target, setFilterStatus, setFilterSelected, filterList) }>entremet</li>
                <li id='filterTag' onClick={(e) => filter(e.target, setFilterStatus, setFilterSelected, filterList) }>tarta</li>
                <li id='filterTag' onClick={(e) => filter(e.target, setFilterStatus, setFilterSelected, filterList) }>pale</li>
            </ul>
            <div className="productsContainer">
                {
                    filterStatus
                        ? data.map((data, index) => {
                            return data.category == filterSelected && productStructure(index, data)
                        })
                        : data.map((data, index) => {
                            return  productStructure(index, data)
                        })

                }
            </div>
            <Footer></Footer>
        </>
    )
}