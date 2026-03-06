'use client'

import { motion } from 'framer-motion';

export default function Portfolio() {
    const projects = [
        {
            title: "CashOrbit",
            category: "Rewards & Earning App",
            imgUrl: "https://play-lh.googleusercontent.com/9dK1oypJD3gYgjnXGnuT_qp4Z3K5M94pN5pjxDL9SSp4HFsMqDIMrhGyJo6YUqdPRA=w480-h960-rw",
            playStoreUrl: "https://play.google.com/store/apps/details?id=com.mjearningking.mjapp",
            desc: "A rewarding app where users play mini-games and earn rewards with no investment required."
        },
        {
            title: "Balloon Pathshala Kids Learn",
            category: "Educational Kids App",
            imgUrl: "https://play-lh.googleusercontent.com/WkwqZhn2YITElQod6ZMp0nGmS8racxosVCOuQln9c2Co4WY3K-EGznscduk7sI-g4Cxuu6I9B9nEuEIdNUvLzw=w1052-h592-rw",
            playStoreUrl: "https://play.google.com/store/apps/details?id=com.mjtech.balloonpop.game&hl=en-IN",
            desc: "An engaging kids learning game featuring alphabets, numbers, Hindi swar, colors & animals."
        },
        {
            title: "Resume Pro - CV Builder",
            category: "Productivity AI App",
            imgUrl: "https://play-lh.googleusercontent.com/QlDeXvNgHysMOqVzlHYP-iLuAzk7aO-8pp9B54yhTbohzE8Z0HZv3vfOycTtCrqIzx9Iwcy8bcw6hOiNahUf5w=w1052-h592-rw",
            playStoreUrl: "https://play.google.com/store/apps/details?id=com.mjtech.resumebuilder&pcampaignid=web_share",
            desc: "AI-powered resume builder assisting freshers & professionals to create an ATS-friendly CV in 1 minute."
        },
        {
            title: "Path IQ – One Line Puzzle Game",
            category: "Mind & Puzzle Game",
            imgUrl: "https://play-lh.googleusercontent.com/cDpHf3ig60jCc9fmFYhCHtAmm57D94jzjhVEmgogOw7cVj583XwZQY81I4kxO_GOma9EKsfjxWXaatIw4tL6-to=w832-h470-rw",
            playStoreUrl: "https://play.google.com/store/apps/details?id=com.mjtech.mindline&pcampaignid=web_share",
            desc: "A challenging single-line drawing puzzle game designed to sharpen logic and brain power."
        },
        {
            title: "Radhe Radhe: Jaap Counter",
            category: "Devotional & Utility",
            imgUrl: "https://play-lh.googleusercontent.com/qrUhOFA-8cPcZauUsMHOog7BPJWAJEDYCXhiYVgPWjj28Oqf6EPQ590Re8hsxq0FDWmSEVegeO5cH7NbLggjHg=w832-h470-rw",
            playStoreUrl: "https://play.google.com/store/apps/details?id=com.mjtech.radhe&hl=en-IN",
            desc: "A spiritual mala counter application helping devotees keep track of their daily Jaap prayers."
        },
        {
            title: "E-Commerce Enterprise App",
            category: "Web & Mobile",
            imgUrl: "https://via.placeholder.com/480x960/0070f3/ffffff?text=E-Commerce+App", // Added a placeholder image URL
            imgColor: "linear-gradient(135deg, #0070f3, #7000ff)", // Kept imgColor for background if imgUrl fails or for specific styling
            desc: "A scalable global e-commerce platform handling 1M+ active users."
        }
    ];

    return (
        <main className="main-content">
            <section className="page-header" style={{ padding: '6rem 2rem 4rem', textAlign: 'center' }}>
                <motion.h1
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-gradient"
                    style={{ fontSize: '3.5rem', marginBottom: '1rem' }}
                >
                    Our Portfolio
                </motion.h1>
                <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.2 }}
                    style={{ color: 'var(--text-muted)', fontSize: '1.2rem', maxWidth: '700px', margin: '0 auto' }}
                >
                    A selection of robust applications and platforms we have built.
                </motion.p>
            </section>

            <section style={{ padding: '2rem 2rem 8rem', maxWidth: '1200px', margin: '0 auto' }}>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '3rem' }}>
                    {projects.map((item, idx) => (
                        <motion.div
                            key={idx}
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: idx * 0.1, duration: 0.5 }}
                            style={{
                                borderRadius: '16px',
                                overflow: 'hidden',
                                background: 'var(--glass-bg)',
                                border: '1px solid var(--glass-border)',
                            }}
                        >
                            <div style={{ height: '220px', width: '100%', background: item.imgColor || '#111', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden' }}>
                                {item.imgUrl ? (
                                    <img src={item.imgUrl} alt={item.title} referrerPolicy="no-referrer" style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.85 }} />
                                ) : (
                                    <div style={{ background: item.imgColor, width: '100%', height: '100%' }}></div>
                                )}
                            </div>
                            <div style={{ padding: '2rem' }}>
                                <span style={{ color: 'var(--accent)', fontSize: '0.9rem', fontWeight: 'bold' }}>{item.category}</span>
                                <h3 style={{ fontSize: '1.4rem', margin: '0.5rem 0 1rem' }}>{item.title}</h3>
                                <p style={{ color: 'var(--text-muted)' }}>{item.desc}</p>
                                {item.playStoreUrl && (
                                    <a href={item.playStoreUrl} target="_blank" rel="noopener noreferrer" style={{ display: 'inline-block', marginTop: '1.5rem', color: '#00d2ff', fontWeight: 'bold', textDecoration: 'none' }}>
                                        View on Play Store &rarr;
                                    </a>
                                )}
                            </div>
                        </motion.div>
                    ))}
                </div>
            </section>
        </main>
    );
}
