export default function AccountPage() {
  return (
    <main>
      <div className="products-section" style={{ padding: '40px', maxWidth: '800px', margin: '0 auto' }}>
        <h2>My Account</h2>
        <p>Welcome to your personal dashboard.</p>
        <ul>
          <li>Order History</li>
          <li>Manage Addresses</li>
          <li>Payment Methods</li>
        </ul>
      </div>
    </main>
  );
}