import Header from './Header'
import Footer from './Footer'
import React, { useEffect, useState } from 'react'
import Button from "react-bootstrap/Button"
import { useNavigate } from 'react-router-dom'
import { FaShoppingCart, FaTrash, FaPen, FaRegWindowClose, FaWpforms, FaCopy, FaRegAddressBook } from "react-icons/fa"
import { ProductForm } from './ProductForm'
import { BiCommentAdd, BiPaperPlane } from 'react-icons/bi'
import { AiFillFolderAdd } from 'react-icons/ai'
import { filter } from './filter'

export const Ajustes = () => {
    const [data, setData] = useState([])
    const [cartState, setCartState] = useState(0)
    const navigate = useNavigate()
    const [modal, setModal] = useState(Boolean)
    // const [updateData, setUpdateData] = useState([])
    const [filterSelected, setFilterSelected] = useState("")
    const [filterStatus, setFilterStatus] = useState(Boolean)
    var headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Accept', 'application/json');
    useEffect(() => {
        validateUser()
    }, [])
    let filterList = document.querySelectorAll(".filterTableHeader")


    const validateUser = async () => {
        const url = `${import.meta.env.VITE_API_KEY}/userData`
        const userData = await fetch(url, {
            mode: 'cors',
            redirect: 'follow',
            credentials: 'include', // Don't forget to specify this if you need cookies
            headers: headers,
        })

        const parsedData = await userData.json()
        if (parsedData.rol == "admin") {
            fetchData()
        } else {
            alert("No eres administrador")
            navigate("/")
        }
    }

    const updateProduct = async (index) => {
        let confirm = window.confirm("Quieres confirmar los nuevos cambios?")
        if (confirm) {
            const url = `${import.meta.env.VITE_API_KEY}/products/${index}`
            const userData = await fetch(url, {
                method: "PUT",
                mode: 'cors',
                body: JSON.stringify({
                    name: inputsForm[0].value,
                    price: inputsForm[1].value,
                    description: inputsForm[2].value,
                    stock: inputsForm[3].value,
                    img: inputsForm[4].value,
                    category: inputsForm[5].value
                }),
                redirect: 'follow',
                credentials: 'include', // Don't forget to specify this if you need cookies
                headers: headers,
            })
                .then(msg => {
                    alert("El producto fue actualizado exitosamente :D")
                    fetchData()
                    setModal(false)
                })
        } else {
            alert("Operacion Cancelada")
        }
    }

    const postProduct = async () => {
        let confirm = window.confirm("Estas seguro que quieres añadir este producto?")
        if (confirm) {
            const url = `${import.meta.env.VITE_API_KEY}/products`
            const userData = await fetch(url, {
                method: "POST",
                mode: 'cors',
                body: JSON.stringify({
                    name: inputsForm[0].value,
                    price: inputsForm[1].value,
                    description: inputsForm[2].value,
                    stock: inputsForm[3].value,
                    img: inputsForm[4].value,
                    category: inputsForm[5].value
                }),
                redirect: 'follow',
                credentials: 'include', // Don't forget to specify this if you need cookies
                headers: headers,
            })
                .then(msg => {
                    alert("El producto fue agregado a la base de datos con Exito :D")
                    fetchData()
                    setModal(false)
                })
        } else {
            alert("Operacion Cancelada")
        }
    }

    const fetchData = async (filter) => {
        const response = await fetch(import.meta.env.VITE_API_KEY + "/products", {
            mode: 'cors',
            redirect: 'follow',
            credentials: 'include', // Don't forget to specify this if you need cookies
            headers: headers,
        })

        const dataParsed = await response.json()
        setData(dataParsed)
        // if (data.hasOwnProperty("error")) {
        //     alert("Tiempo caducado, reingresa de nuevo a tu cuenta")
        //     await logout()
        //   } else {
        //     setData(dataParsed)
        //   }
    }

    const deleteProduct = async (id) => {
        let confirm = window.confirm("Estas seguro de eliminar este producto del la base de datos?")
        if (confirm) {
            await fetch(`${import.meta.env.VITE_API_KEY}/products/${id}`, {
                method: "DELETE"
            })
                .then(() => {
                    alert("El Producto fue eliminiado")
                    fetchData()
                })
                .catch(error => console.log(error))
        } else {
            alert("Operacion cancelada!")
        }
    }
    let inputsForm = document.querySelectorAll("input")

    const updateForm = (data) => {
        postButton.hidden = true
        updateButton.hidden = false
        setModal(!modal)
        inputsForm[0].value = data.name
        inputsForm[1].value = data.price
        inputsForm[2].value = data.description
        inputsForm[3].value = data.stock
        inputsForm[4].value = data.img
        inputsForm[5].value = data.category
        updateButton.value = data["_id"]
    }
    const postForm = () => {
        setModal(!modal)
        inputsForm[0].value = null
        inputsForm[1].value = null
        inputsForm[2].value = null
        inputsForm[3].value = null
        inputsForm[4].value = null
        inputsForm[5].value = null
        postButton.hidden = false
        updateButton.hidden = true
    }

    let updateButton = document.querySelector(".updateButton")
    let postButton = document.querySelector(".postButton")

    const tableStructure = (index, data) => {
        return (
            <tbody key={index}>
                <tr>
                    <td >{data["_id"]}</td>
                    <td>{data.name}</td>
                    <td>{data.category}</td>
                    <td>{data.stock}</td>
                    <td>${data.price}</td>
                    <td>{data.img}</td>
                    <td>{data.description}</td>
                    <td>
                        <Button variant='danger' className='deleteButton' onClick={(e) => deleteProduct(data["_id"])} > <FaTrash /></Button>
                        <Button variant='warning' className='updateButton' onClick={e => updateForm(data)} > <FaPen /></Button>
                    </td>
                </tr>
            </tbody>
        )
    }

    let filterActived = false
    let tableFiltered = data
    const filteredTable = () => {
        console.log(inputsForm.length)
        filterActived = true
        if (filterActived) {
            if (filterSelected == "Precio") {
                    tableFiltered = tableFiltered.sort((a, b) => {
                        return a.price - b.price
                    })
            }else if(filterSelected == "Stock"){
                tableFiltered = tableFiltered.sort((a, b) => {
                    return a.stock - b.stock
                })
            }else if(filterSelected == "Nombre" ){
                tableFiltered.sort(function(a, b) {
                    var textA = a.name.toUpperCase();
                    var textB = b.name.toUpperCase();
                    return (textA < textB) ? -1 : (textA > textB) ? 1 : 0;
                });
            }else if(filterSelected == "Categoria" ){
                tableFiltered.sort(function(a, b) {
                    var textA = a.category.toUpperCase();
                    var textB = b.category.toUpperCase();
                    return (textA < textB) ? -1 : (textA > textB) ? 1 : 0;
                });
            }
        }

        return tableFiltered.map((data, index) => {
            return tableStructure(index, data)
        })
    }
    return (
        <>
            <Header state={cartState} />
            {/* MODAL */}
            <div className={modal ? "backgroundModal active" : "backgroundModal"}>
                <div className="formContainer">
                    <div className="formContainerHeader">
                        <h2>Completa los campos</h2>
                        <FaRegWindowClose className='XIcon' onClick={() => setModal(!modal)} />
                    </div>
                    <div className="formContainerBody">
                        <label htmlFor="name">Nombre del producto</label>
                        <input type="text" name="" id="name" className='inputName' placeholder='name' />
                        <label htmlFor="price">Precio</label>
                        <input type="text" name="" id="price" className='inputPrice' placeholder='price' />
                        <label htmlFor="price">Descripcion</label>
                        <input type="text" name="" id="description" className='inputDescription' placeholder='Descripción' />
                        <label htmlFor="price">Stock</label>
                        <input type="text" name="" id="stock" className="inputStock" placeholder='Stock' />
                        <label htmlFor="img">Imagen URL</label>
                        <input type="text" name="" id="img" className='inputImg' placeholder='Imagen URL' />
                        <label htmlFor="category">Categoria</label>
                        <input type="text" name="" id="category" className='inputCategory' placeholder='Categoria' />
                    </div>
                    <div className="formContainerFooter">
                        <button className="updateButton" onClick={(e) => updateProduct(e.target.value)} >Actualizar</button>
                        <button className="postButton" onClick={() => postProduct()}>Añadir</button>
                        <button className="abortbutton" onClick={() => setModal(false)}>Cancelar</button>
                    </div>
                </div>
            </div>
            <Button variant="primary" className='addProductButton' onClick={() => postForm()}><AiFillFolderAdd /> Añadir producto</Button>
            <h1 className='managerTitle'>ADMINISTRE SU INVENTARIO</h1>
            <div className="productsContainer">
                <table className="maintenanceTable" >
                    <thead>
                        <tr>
                            <th className='filterTableHeader' onClick={(e) => filter(e.target, setFilterStatus, setFilterSelected, filterList)}>ID</th>
                            <th className='filterTableHeader' onClick={(e) => filter(e.target, setFilterStatus, setFilterSelected, filterList)}>Nombre</th>
                            <th className='filterTableHeader' onClick={(e) => filter(e.target, setFilterStatus, setFilterSelected, filterList)}>Categoria</th>
                            <th className='filterTableHeader' onClick={(e) => filter(e.target, setFilterStatus, setFilterSelected, filterList)}>Stock</th>
                            <th className='filterTableHeader' onClick={(e) => filter(e.target, setFilterStatus, setFilterSelected, filterList)}>Precio</th>
                            <th className='filterTableHeader'>Imagen</th>
                            <th className='filterTableHeader'>Descripcion</th>
                            <th className='filterTableHeader'>Acciones</th>
                        </tr>
                    </thead>
                    {
                        filterStatus
                            // ? filteredTable()
                            ? filteredTable()
                            : data.map((data, index) => {
                                return tableStructure(index, data)
                            })
                    }
                </table>
            </div >
            <Footer></Footer>
        </>
    )
}