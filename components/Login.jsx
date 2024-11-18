import React, { useContext, useEffect } from 'react'
import Header from './Header.jsx';
import Footer from './Footer.jsx';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export const Login = () => {
  const [loginData, setloginData] = useState(undefined)
  const navigate = useNavigate()

  const setFormValues = (item) => {
    item.name == "username" ? setloginData({ ...loginData, username: item.value }) :
      item.name == "password" ? setloginData({ ...loginData, password: item.value }) : ""
  }
  var headers = new Headers();
  headers.append('Content-Type', 'application/json');
  headers.append('Accept', 'application/json');

  const loginSubmit = async (item) => {
    item.preventDefault()
    const url = `${import.meta.env.VITE_API_KEY}/login`
    const loginFetch = await fetch(url, {
      body: JSON.stringify(loginData),
      method: 'POST',
      mode: 'cors',
      redirect: 'follow',
      credentials: 'include', // Don't forget to specify this if you need cookies
      headers: headers,
    })
    // .then(async res => {const loginResult = await res.json()      })
    if (loginFetch.ok) {
      let result = await loginFetch.json()
      document.cookie = `access_token=${result.token}`
      alert("Usuario Conectado \nLa sesion se mantendrá activa por 1 hs a menos que cierres sesión")
      navigate("/")
    } else {
      alert("Error de inicio de sesión de la cuenta")
    }
  }

  return (
    <>
      <Header />
      <form onSubmit={e => loginSubmit(e)} method="post" className='loginForm'><br />
        <p>Nombre usuario o telefono</p>
        <input onChange={e => setFormValues(e.target)} type="text" name="username" id="username" /><br />

        <p>Contraseña</p>
        <input onChange={e => setFormValues(e.target)}  type="password" name="password" id="password" /><br />
        <input type='submit' value="Acceder" /><br />
        <a href="/register">No tiene una cuenta? Cree una aquí</a>
      </form>
      <Footer />
    </>
  )
}
