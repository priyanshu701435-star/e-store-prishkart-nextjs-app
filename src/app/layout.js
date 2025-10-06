import Link from 'next/link';
import './globals.css';
import './styles/styles.css';
import Header from './components/Header';
import AuthProvider from './components/AuthProvider'; 

export const metadata = {
  title: 'PRISHKART',
  description: 'E-commerce Internship Practice Project',
};

export default function RootLayout({ children }) {
  return (
    <html>
      <head></head>
      <body>
        <AuthProvider>
          <Header />
          {children}
          <footer className="site-footer">
            <div className="footer-links">
              <Link href="#">About Us</Link>
              <Link href="#">Contact</Link>
              <Link href="#">Returns & Refunds</Link>
            </div>
            <div>
              <p>&copy; 2025 E-Shop. Internship Practice Project.</p>
            </div>
          </footer>
          
        </AuthProvider>
      </body>
    </html>
  );
}
