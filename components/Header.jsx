import React, { useContext, useEffect, useState, createContext } from 'react'
import logo from "../src/img/logo-rosa.png"
import { useRoutes, Link, Navigate, useNavigate } from "react-router-dom"
import { BiSolidDownArrow } from "react-icons/bi";
import { FaShoppingCart, FaRegWindowClose, FaBars } from "react-icons/fa"
import Button from 'react-bootstrap/esm/Button';
import { FaTrashAlt } from "react-icons/fa";
import { FaRegCircleUser } from "react-icons/fa6";
export const cartState = createContext()

export const Header = ({ state }) => {
  // const [activateResponsiveMenu, setActivateResponsiveMenu] = useState(Boolean)
  const [activateCart, setActivateCart] = useState(Boolean)
  const [products, setProducts] = useState([])
  const [active, setActive] = useState(Boolean)
  const [total, setTotal] = useState(Number)
  const [admin, setAdmin] = useState(Boolean)
  const [userName, setUserName] = useState("")
  const [responsive, setResponsive] = useState(false)
  let cookieAvailable = document.cookie.includes("access_token")
  useEffect(() => {
    !cookieAvailable
      ? ""
      : validateUser()
    state < 0
      ? fetchCartData()
      : ""
    console.log(cookieAvailable)
  }, [state])

  const navigate = useNavigate()

  var headers = new Headers();
  headers.append('Content-Type', 'application/json');
  headers.append('Accept', 'application/json');

  const validateUser = async () => {
    const url = `${import.meta.env.VITE_API_KEY}/userData`
    const userData = await fetch(url, {
      mode: 'cors',
      redirect: 'follow',
      credentials: 'include', // Don't forget to specify this if you need cookies
      headers: headers,
    })

    const parsedData = await userData.json()
    parsedData.rol == "admin" ? setAdmin(true) : setAdmin(false)
    if (parsedData.hasOwnProperty("error")) {
      alert("Tiempo caducado, reingresa de nuevo a tu cuenta")
      await logoutAsk(false)
    } else {
      setUserName(parsedData.username)
      fetchCartData()
    }
  }

  const fetchCartData = async () => {
    const url = `${import.meta.env.VITE_API_KEY}/my-cart`
    const result = await fetch(url,
      {
        mode: 'cors',
        redirect: 'follow',
        credentials: 'include', // Don't forget to specify this if you need cookies
      }
    )

    const cartProducts = await result.json()

    if (cartProducts.hasOwnProperty("error")) {
      alert("Tiempo caducado, reingresa de nuevo a tu cuenta")
      await logoutAsk(false)
    } else {
      setProducts(cartProducts)
      let finalPrice = 0;
      for (let i = 0; i < cartProducts.length; i++) {
        if (cartProducts[i].amount >= 1) {
          let priceParsed = Number(cartProducts[i].amount * cartProducts[i].price)
          finalPrice += priceParsed
        }
      }
      setTotal(finalPrice)
    }
  }

  const logout = async (text) => {
    const url = `${import.meta.env.VITE_API_KEY}/logout`
    const logoutFetch = await fetch(url, {
      mode: "cors",
      credentials: 'include',
    })
      .then(i => {
        document.cookie = "access_token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
        navigate("/")
        alert(text)
      })
  }

  const logoutAsk = async (ask) => {
    if (ask) {
      let confirm = window.confirm("Seguro que quieres salir de tu cuenta?")
      if (confirm) {
        await logout("Has cerrado sesión")
      } else {
        alert("Operación cancelada")
      }
    } else {
      await logout("Has sido deslogeado automaticamente")
    }
  }
  const deleteCartProduct = async (id) => {
    let confirm = window.confirm("You wanna remove this element from your Cart?")
    if (confirm) {
      await fetch(`${import.meta.env.VITE_API_KEY}/cart/${id}`, {
        method: "DELETE"
      })
        .then(() => {
          alert("El Producto fue eliminiado")
          fetchCartData()
        })
        .catch(error => console.log(error))
    } else {
      alert("Action denied!")
    }
  }
  const countProducts = () => {
    let finalAmount = 0
    for (const i in products) {
      finalAmount += products[i].amount
    }
    return finalAmount
  }
  const emptyCart = async () => {
    let confirm = window.confirm("You want to Delete all from your cart?")
    if (confirm) {
      await fetch(`${import.meta.env.VITE_API_KEY}/cart_delete_all`, {
        method: "DELETE",
        mode: 'cors',
        redirect: 'follow',
        credentials: 'include',
      })
        .then(() => {
          alert("Cart empty successfully")
          fetchCartData()
        })
        .catch(error => console.log(error))
    } else {
      alert("Action denied!")
    }
  }
  return (
    <>
      <div className="headerContainer">
        <button className="logoContainer">
          <Link to="/"><img src={logo} alt="Logo" /></Link>
        </button>
        <ul>
          {cookieAvailable ? (
            <>
              <li className='cartNavBarContainer'>
                <div className="userAccountStatus">
                  <p>Hola {userName}</p>
                  <div className="cartStatusContainer">
                    <FaShoppingCart className="cartIcon" onClick={() => setActivateCart(!activateCart)} /><br />
                    <p className="cartCounter">{countProducts()}</p>
                  </div>

                  <button className="logoutButton" onClick={() => logoutAsk(true)}> Cerrar sesion </button>
                </div>
              </li>
            </>) : (
            <>
              <li>
                <a href="/register" className='loginButton'>
                  Acceder<FaRegCircleUser className='loginPageIcon' />
                </a>
              </li>
              <br />
            </>
          )
          }
        </ul>
        <div className="navBar">
          <ul>
            <li className='menuCategory' onClick={() => setActive(!active)}>Nuestros Sabores <BiSolidDownArrow className={active ? 'arrowIcon active' : 'arrowIcon'} /></li>
            <li><Link to="/tienda">Tienda</Link></li>
            <li><Link to="/catalogo">Catalogo</Link></li>
            <li><Link to="/pasteleria">Pasteleria</Link></li>
            {admin ? <li><Link to="/ajustes">Ajustes</Link></li> : ""}
          </ul>
          <div className={active ? "productCategoryContainer active" : "productCategoryContainer"}>
            <ul className="productCategoryList">
              <li><Link to="/macarons">Macarons</Link></li>
              <li><Link to="/pales">Pales</Link></li>
              <li><Link to="/entremets">Entremet</Link></li>
              <li><Link to="/tartas">Tartas</Link></li>
              <li><Link to="/panes">Panes</Link></li>
            </ul>
          </div>
        </div>
      </div >

      {/* RESPONSIVE */}

      <button className="logoContainerResponsive">
        <Link to="/"><img src={logo} alt="Logo" /></Link>
      </button>
      <div className={responsive ? "headerContainerResponsive active" : "headerContainerResponsive"}>

        <div className="navBar">
          <ul>
            {cookieAvailable ? (
              <>
                <li>Hola {userName} </li>
                <li className="cartCounter"><FaShoppingCart className="cartIcon" onClick={() => setActivateCart(!activateCart)} /> {countProducts()}</li>
                <li className="logoutButton" onClick={() => logoutAsk(true)}> Cerrar sesion </li>
              </>) : (
              <>
                <li>
                  <a href="/register" className='loginButton'> Ingresar<FaRegCircleUser className='loginPageIcon' /></a>
                </li>
              </>
            )
            }
            <li><Link to="/tienda">Tienda</Link></li>
            <li><Link to="/catalogo">Catalogo</Link></li>
            <li><Link to="/pasteleria">Pasteleria</Link></li>
            {admin ? <li><Link to="/ajustes">Ajustes</Link></li> : ""}
            <li className='menuCategory' onClick={() => setActive(!active)}>Nuestros Sabores <BiSolidDownArrow className={active ? 'arrowIcon active' : 'arrowIcon'} /></li>
          </ul>

          <div className={active ? "productCategoryContainer active" : "productCategoryContainer"}>
            <ul className="productCategoryList">
              <li><Link to="/macarons">Macarons</Link></li>
              <li><Link to="/pales">Pales</Link></li>
              <li><Link to="/entremets">Entremet</Link></li>
              <li><Link to="/tartas">Tartas</Link></li>
              <li><Link to="/panes">Panes</Link></li>
            </ul>
          </div>


        </div>
        <FaBars className="responsiveButton" onClick={() => {
          setResponsive(!responsive)
          active ? setActive(false) : ""
        }} />
      </div >

      {/* CART */}
      <div className={activateCart ? "cartContainerBackground active" : "cartContainerBackground"}>
        <div className="cartContainer">
          <div className="cartHeader">
            <h2>TU CARRITO</h2>
            <FaRegWindowClose className='XIcon' onClick={() => setActivateCart(!activateCart)} />
          </div>
          <div className="cartBody">
            <table className="cartProductsTable" >
              <thead>
                <tr>
                  <th>Imagen</th>
                  <th>Nombre</th>
                  <th>Cantidad</th>
                  <th>Sub-total</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              {
                products.map((data, index) => {
                  return (
                    <tbody key={index}>
                      <tr>
                        <td ><img src={data.img} alt={data.name} /></td>
                        <td>{data.name}</td>
                        <td>{data.amount}</td>
                        <td>${data.price * data.amount}</td>
                        <td>
                          <Button variant='danger' className='deleteButton' onClick={() => deleteCartProduct(data["_id"])} > <FaTrashAlt /></Button>
                        </td>
                      </tr>
                    </tbody>
                  )
                })
              }
            </table>
          </div>
          <div className="cartFooter">
            {products.length != 0 ? <h2>Total  a pagar: ${total}</h2> : <h2>No hay productos en el carro</h2>}
            {products.length != 0 &&
              <button className="emptyCartButton" onClick={() => emptyCart()}>Vaciar carro</button>}
          </div>
        </div>
      </div>

    </>
  )
}
export default Header
