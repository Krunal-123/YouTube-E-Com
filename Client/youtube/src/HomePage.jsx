import React, { useEffect } from 'react';
import { useCookies } from 'react-cookie';
import { Outlet, useNavigate } from 'react-router-dom';
import "../src/App.css"
import { CartProvider } from '../src/context/CartContext.jsx'
import ExtraCompo from './ExtraCompo.jsx';


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