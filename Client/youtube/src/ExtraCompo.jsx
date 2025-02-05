import Header from '../components/Header.jsx';
import Footer from '../components/Footer.jsx';
import MobileOnly from '../components/MobileOnly.jsx';
import { Outlet } from 'react-router-dom';
import { useCart } from './context/CartContext.jsx';
import { Suspense } from 'react';
import { Spinner } from 'react-bootstrap';

export default function Layout() {
    const { LightMode } = useCart();
    
    return (
        <div className={`${LightMode ? "bg-slate-900 text-white" : "bg-white text-black"} min-h-screen`}>
            <Header />
            <Suspense fallback={
                <div className="h-screen flex flex-col justify-center items-center">
                    <Spinner animation="border" role="status" variant={LightMode ? "light" : "dark"} />
                    <p className="mt-4 text-lg font-medium">Loading...</p>
                </div>
            }>
                <Outlet />
            </Suspense>
            <Footer />
            <MobileOnly />
        </div>
    );
}
