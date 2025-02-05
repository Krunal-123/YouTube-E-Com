import React, { useEffect } from 'react';
import { useCookies } from 'react-cookie';
import { useNavigate } from 'react-router-dom';
import { CartProvider } from './context/CartContext.jsx'
import ExtraCompo from './ExtraCompo.jsx';
import "../src/App.css"


export default function () {
    let Navigate = useNavigate()
    const [cookies] = useCookies()
    useEffect(() => {
        if (!cookies.token) {
            Navigate('/login')
        }
        else {
            Navigate('/home')
        }
    }, [])
    return (
        <>
            <CartProvider>
                <ExtraCompo />
            </CartProvider>
        </>
    )
}