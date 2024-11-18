import React, { useEffect, useState } from 'react'
import Header from './Header.jsx';
import Footer from './Footer.jsx';
import { useNavigate } from 'react-router-dom';
export const Register = () => {
    const [registerData, setRegisterData] = useState("")
    const navigate = useNavigate()
    const setFormValues = (item) => {
        item.name == "username" ? setRegisterData({ ...registerData, username: item.value }) :
            item.name == "password" ? setRegisterData({ ...registerData, password: item.value }) : ""
        item.name == "repeatPassword" ? setRegisterData({ ...registerData, repeatPassword: item.value }) : ""
    }

    const registerSubmit = async (item) => {
        item.preventDefault()
        registerData.password != registerData.repeatPassword ? alert("Pasword are diferent, fix it") : ""
        const url = "http://localhost:8001/api/register"
        const registerFetch = await fetch(url, {
            method: "POST",
            body: JSON.stringify(registerData),
            headers: {
                "Content-type": "application/json; charsset=UTF-8",
            },
        })
            .then(async res => {
                if (res.ok) {
                    alert("Usuario Registrado con exito")
                    navigate("/login")
                } else {
                    const response = await res.json()
                    response.error.code == 11000 ? alert("La cuenta ya existe, elige otra") : ""
                }
            })
    }

    return (
        <>

            <Header />
            <form onSubmit={e => registerSubmit(e)} className='registerForm'>
                <p>Nombre de usuario</p>
                <input type="text" name="username" id="username" placeholder='Nombre' onChange={e => setFormValues(e.target)} /><br />
                <p>Contraseña</p>
                <input type="password" name="password" id="password" placeholder="Contraseña" onChange={e => setFormValues(e.target)} /><br />
                <p>Repite tu contraseña</p>
                <input type="password" name="repeatPassword" id="repeatPassword" onChange={e => setFormValues(e.target)} /><br />
                <input type='submit' value="Registrarse" /><br />
                <a href="/login">Ya tienes una cuenta? Ingresa aquí</a>
            </form>
            <Footer />
        </>
    )
}
