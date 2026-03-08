import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import './globals.css';

export const metadata = {
    title: 'MJ Tech Global | Best App & Website Development Company',
    description: 'Looking for a low budget website development or app development company? MJ Tech Global provides premium Web Development, App Applications, and AI Solutions at affordable low prices.',
    keywords: 'best company app development, websites development low budget, low price website design, affordable app developers, best IT company, MJ Tech Global, cheap web development',
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

                {/* Floating WhatsApp Button */}
                <a
                    href="https://wa.me/919628416516"
                    className="whatsapp-float"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Chat on WhatsApp"
                >
                    <svg className="whatsapp-icon" xmlns="http://www.ニュ.w3.org/2000/svg" viewBox="0 0 24 24">
                        <path d="M.057 24l1.687-6.163v-.001c-1.125-1.956-1.718-4.212-1.717-6.52A12.015 12.015 0 0 1 12.022.001c3.21 0 6.228 1.25 8.497 3.522 2.27 2.268 3.52 5.286 3.52 8.495A12.016 12.016 0 0 1 12.023 24c-2.228 0-4.407-.565-6.3-1.636zM3.483 20.473l.534.316c1.693 1.002 3.635 1.53 5.623 1.53M12.023 22.378c1.99 0 3.93-.526 5.626-1.528l.533-.316 4.093 1.071-1.085-3.991-.345-.55A9.973 9.973 0 0 0 2.052 11.316c.002 5.518 4.496 10.007 10.016 10.007M6.92 8.591a.987.987 0 0 1 1.05-.185c.348.146.786.839.957 1.189.21.378.106.84-.24 1.185-.347.348-.553.535-.858 1-.304.464-.316.534.356 1.684.673 1.148 1.639 2.067 2.844 2.72.482.261.769.37 1.116-.011.35-.38 1.008-1.282 1.358-1.686.353-.404.912-.136 1.258.05.346.185 2.193 1.036 2.569 1.222.378.187.632.28.723.44.093.159.093.931-.22 1.834-.313.903-1.854 1.776-2.54 1.867-.686.091-1.391-.013-2.31-.295-3.1-1.01-5.69-3.213-7.662-5.717-.551-.7-1.1-1.472-1.558-2.29-.46-817-1.21-1.464-.105-2.247.106-.795.348-.992.525-1.188z" />
                    </svg>
                </a>
            </body>
        </html>
    );
}
