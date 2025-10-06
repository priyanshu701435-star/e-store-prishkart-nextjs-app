"use client";

import React, { useState, useEffect } from 'react';
import { PRODUCTS } from '../lib/data';
function saveCart(cart) {
    localStorage.setItem('shoppingCart', JSON.stringify(cart));
    window.dispatchEvent(new Event('storage')); 
}

function ProductCard({ product, onAddToCart }) {
    return (
        <div className="product-card" onClick={() => alert(`Navigating to Product Page for: ${product.name}`)}>
            <img 
                src={product.image} 
                alt={product.name} 
                onError={(e) => { e.target.onerror = null; e.target.src='https://via.placeholder.com/400x400/007bff/FFFFFF?text=Image+Missing' }}
            />
            <div className="product-info">
                <h3>{product.name}</h3>
                <p className="price">${product.price.toFixed(2)}</p>
                <button 
                    className="add-to-cart-btn" 
                    onClick={(e) => { e.stopPropagation(); onAddToCart(product.id, e.target); }}
                >
                    Add to Cart
                </button>
            </div>
        </div>
    );
}

export default function ShopPage() {
    
    const [filteredProducts, setFilteredProducts] = useState(PRODUCTS); 
    const [categoryFilter, setCategoryFilter] = useState('All'); 

    useEffect(() => {
        if (categoryFilter === 'All') {
            setFilteredProducts(PRODUCTS);
        } else {
            const filtered = PRODUCTS.filter(p => p.category === categoryFilter);
            setFilteredProducts(filtered);
        }
    }, [categoryFilter]);

    const handleAddToCart = (productId, buttonElement) => {
        const product = PRODUCTS.find(p => p.id === productId);
        if (!product) return;

        let cart = JSON.parse(localStorage.getItem('shoppingCart')) || [];
        const existingItem = cart.find(item => item.id === productId);

        if (existingItem) {
            existingItem.quantity += 1;
        } else {
            cart.push({ id: product.id, name: product.name, price: product.price, quantity: 1 });
        }

        saveCart(cart); 
        buttonElement.textContent = 'Added!';
        buttonElement.style.backgroundColor = '#007bff';
        setTimeout(() => {
            buttonElement.textContent = 'Add to Cart';
            buttonElement.style.backgroundColor = '#28a745';
        }, 800);
    };

    const handleSortChange = (event) => {
        const value = event.target.value;
        let sorted = [...filteredProducts]; 

        if (value === 'price-asc') {
            sorted.sort((a, b) => a.price - b.price);
        } else if (value === 'popularity') {
            sorted = PRODUCTS.filter(p => categoryFilter === 'All' || p.category === categoryFilter);
        }

        setFilteredProducts(sorted);
    };

    return (
        <main>
            <section className="products-section" id="products">
                <h2>All Products</h2>
                
                <div style={{ marginBottom: '20px', textAlign: 'center' }}>
                    {['All', 'Electronics', 'Apparel', 'Home Goods'].map(category => (
                        <button 
                            key={category}
                            className="cta-button" 
                            onClick={() => setCategoryFilter(category)} 
                            style={{
                                margin: '5px',
                                backgroundColor: categoryFilter === category ? 'var(--primary-color)' : 'var(--secondary-color)',
                                color: categoryFilter === category ? 'white' : 'var(--text-color)',
                                fontWeight: 'normal',
                                padding: '8px 15px',
                            }}
                        >
                            {category}
                        </button>
                    ))}
                </div>

                <div className="filters-sort">
                    <label htmlFor="sort-select">Filter:</label>
                    <select id="sort-select" onChange={handleSortChange}>
                        <option value="popularity">Popularity</option>
                        <option value="price-asc">Price: Low to High</option>
                        <option value="new">New Arrivals</option>
                    </select>
                </div>

                <div className="product-grid" id="product-list">
                    {filteredProducts.map(product => (
                        <ProductCard 
                            key={product.id} 
                            product={product} 
                            onAddToCart={handleAddToCart}
                        />
                    ))}
                </div>
            </section>
        </main>
    );
}