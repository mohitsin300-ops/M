import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import './globals.css';

export const metadata = {
    title: 'MJ Tech Global | Professional IT Services',
    description: 'MJ Tech Global provides premium Web Development, App Development, and AI Solutions.',
    icons: {
        icon: '/logo.png'
    }
}

export default function RootLayout({ children }) {
    return (
        <html lang="en">
            <body>
                <Navbar />
                {children}
                <Footer />
            </body>
        </html>
    );
}
