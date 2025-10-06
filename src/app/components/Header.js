"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { PRODUCTS } from '../lib/data';
import LoginBtn from './LoginBtn';

function loadCartFromStorage() {
    if (typeof window !== 'undefined') {
        return JSON.parse(localStorage.getItem('shoppingCart')) || [];
    }
    return []; 
}

export default function Header() {
    const [cart, setCart] = useState([]); 
    const [isCartModalOpen, setIsCartModalOpen] = useState(false);
    useEffect(() => {
        setCart(loadCartFromStorage());

        const updateCartFromStorage = () => {
            setCart(loadCartFromStorage());
        };

        window.addEventListener('storage', updateCartFromStorage);
        window.addEventListener('storage', updateCartFromStorage);

        const intervalId = setInterval(updateCartFromStorage, 500);

        return () => {
            clearInterval(intervalId);
            window.removeEventListener('storage', updateCartFromStorage);
        };
    }, []);
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    const cartTotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
    const CartModal = () => (
        <div className={`modal-overlay ${isCartModalOpen ? 'show' : ''}`}>
             <div className="modal-content cart-content">
                <h3>Shopping Cart</h3>
                <ul id="cart-items-list">
                    {cart.length === 0 ? (
                        <li>Your cart is empty.</li>
                    ) : (
                        cart.map(item => (
                            <li key={item.id}>
                                <span>{item.name} ({item.quantity}x)</span>
                                <span>${(item.price * item.quantity).toFixed(2)}</span>
                            </li>
                        ))
                    )}
                </ul>
                <p className="cart-summary-total">Total: $<span id="cart-total">{cartTotal.toFixed(2)}</span></p>
                <Link href="/cart" passHref>
                    <button className="cta-button checkout-btn" onClick={() => setIsCartModalOpen(false)}>
                        View Cart & Checkout
                    </button>
                </Link>
                <button className="close-button" onClick={() => setIsCartModalOpen(false)}>
                    Continue Shopping
                </button>
            </div>
        </div>
    );

    return (
        <>
            <header className="site-header">
                <div className="logo">Prish-Store</div>
                <nav className="main-nav">
                    <Link href="/">Home</Link>
                    <Link href="/shop">Shop</Link>
                    <Link href="/account">Account</Link>
                </nav>
                <div className="search-bar-container">
                    <input type="search" id="search-input" placeholder="Search products..." list="suggestions" />
                    <datalist id="suggestions">
                         {PRODUCTS.map(p => <option key={p.id} value={p.name} />)}
                    </datalist>
                </div>
                <div className="header-controls">
                  <div className="cart-icon" onClick={() => setIsCartModalOpen(true)}>
                    🛒 Cart (<span id="cart-count">{totalItems}</span>)
                  </div>
                  <div className="user-actions"> 
                    <LoginBtn/>
                    </div>
                </div>
            </header>
            <CartModal />
        </>
    );
}