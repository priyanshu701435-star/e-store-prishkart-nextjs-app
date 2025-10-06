"use client"; 

import React, { useState, useEffect } from 'react';
import Link from 'next/link';

function loadCart() {
    return JSON.parse(localStorage.getItem('shoppingCart')) || [];
}

export default function CartPage() {
    const [cart, setCart] = useState(loadCart);

    const cartTotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

    return (
        <main>
            <div className="products-section" style={{ padding: '40px', maxWidth: '800px', margin: '0 auto' }}>
                <h2>Your Shopping Cart</h2>
                {cart.length === 0 ? (
                    <p>Your cart is empty. <Link href="/shop">Start shopping!</Link></p>
                ) : (
                    <div>
                        <ul style={{ listStyle: 'none', padding: 0 }}>
                            {cart.map(item => (
                                <li key={item.id} style={{ display: 'flex', justifyContent: 'space-between', padding: '10px 0', borderBottom: '1px solid #eee' }}>
                                    <span>{item.name} (Qty: {item.quantity})</span>
                                    <span>${(item.price * item.quantity).toFixed(2)}</span>
                                </li>
                            ))}
                        </ul>
                        <p className="cart-summary-total">Total: ${cartTotal.toFixed(2)}</p>
                        <Link href="/checkout" passHref>
                            <button className="cta-button checkout-btn" style={{ width: '100%' }}>Proceed to Checkout</button>
                        </Link>
                    </div>
                )}
            </div>
        </main>
    );
}