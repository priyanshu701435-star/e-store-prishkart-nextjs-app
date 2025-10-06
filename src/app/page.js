import Link from 'next/link';

export default function HomePage() {
  return (
    <main>
       
        <section className="hero-banner">
            <h1>Flash Sale: Up To 50% Off!</h1>
            <p>Limited time only on selected electronics and apparel.</p>
            <Link href="/shop" passHref>
                <button className="cta-button">Shop Now </button>
            </Link>
        </section>

        <section className="products-section" style={{textAlign: 'center', margin: '40px auto'}}>
            <h2>Explore All Collections</h2>
            <div className="product-grid">
                <div className="product-card" style={{border: '1px solid #ddd', padding: '20px'}}>Electronics</div>
                <div className="product-card" style={{border: '1px solid #ddd', padding: '20px'}}>Apparel</div>
                <div className="product-card" style={{border: '1px solid #ddd', padding: '20px'}}>Home Goods</div>
            </div>
        </section>
    </main>
  );
}