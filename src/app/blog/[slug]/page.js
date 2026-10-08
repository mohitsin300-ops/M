import { siteConfig } from '@/lib/siteConfig';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, Clock, Calendar, BookOpen, Share2 } from 'lucide-react';

export async function generateStaticParams() {
    return siteConfig.blogPosts.map((post) => ({
        slug: post.slug,
    }));
}

export async function generateMetadata({ params }) {
    const { slug } = await params;
    const post = siteConfig.blogPosts.find((p) => p.slug === slug);
    if (!post) return { title: 'Article Not Found' };

    return {
        title: post.title,
        description: post.summary,
        alternates: {
            canonical: `https://www.mjtechglobal.in/blog/${post.slug}`,
        },
        openGraph: {
            title: post.title,
            description: post.summary,
            type: 'article',
            publishedTime: post.date,
            url: `https://www.mjtechglobal.in/blog/${post.slug}`,
        }
    };
}

export default async function BlogPostPage({ params }) {
    const { slug } = await params;
    const post = siteConfig.blogPosts.find((p) => p.slug === slug);

    if (!post) {
        notFound();
    }

    return (
        <main style={{ paddingTop: '80px', minHeight: '100vh', background: 'var(--light-bg)' }}>
            <article style={{ padding: '4rem 1.5rem 6rem' }}>
                <div className="container" style={{ maxWidth: '800px' }}>
                    <Link
                        href="/blog"
                        style={{
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '6px',
                            color: 'var(--primary-blue)',
                            fontWeight: 600,
                            fontSize: '0.9rem',
                            marginBottom: '2rem'
                        }}
                    >
                        <ArrowLeft size={16} /> Back to Blog
                    </Link>

                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '1.25rem' }}>
                        <span className="badge badge-primary">{post.category}</span>
                        <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '4px' }}>
                            <Calendar size={14} /> {post.date}
                        </span>
                        <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '4px' }}>
                            <Clock size={14} /> {post.readTime}
                        </span>
                    </div>

                    <h1 style={{ fontSize: '2.75rem', fontWeight: 800, lineHeight: 1.25, letterSpacing: '-0.02em', color: 'var(--text-main)', marginBottom: '1.5rem' }}>
                        {post.title}
                    </h1>

                    <p style={{ fontSize: '1.2rem', color: 'var(--text-secondary)', lineHeight: 1.6, fontStyle: 'italic', marginBottom: '2.5rem', borderLeft: '3px solid var(--primary-blue)', paddingLeft: '1.25rem' }}>
                        {post.summary}
                    </p>

                    <div style={{
                        background: '#FFFFFF',
                        border: '1px solid var(--border-color)',
                        borderRadius: '20px',
                        padding: '3rem',
                        boxShadow: 'var(--shadow-sm)',
                        fontSize: '1.1rem',
                        lineHeight: 1.8,
                        color: 'var(--text-main)'
                    }}>
                        <p style={{ marginBottom: '1.5rem' }}>
                            {post.content}
                        </p>

                        <h2 style={{ fontSize: '1.5rem', fontWeight: 800, marginTop: '2.5rem', marginBottom: '1rem' }}>
                            Engineering Practicality in Every Product
                        </h2>
                        <p style={{ marginBottom: '1.5rem', color: 'var(--text-secondary)' }}>
                            At MJ Tech Global, our development philosophy revolves around clean interfaces, low-latency execution, and non-intrusive software design. We believe great tools speak for themselves through uptime, battery efficiency, and verifiable utility.
                        </p>

                        <div style={{
                            marginTop: '3rem',
                            paddingTop: '2rem',
                            borderTop: '1px solid var(--border-color)',
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            flexWrap: 'wrap',
                            gap: '1rem',
                            fontSize: '0.88rem'
                        }}>
                            <div>
                                <strong style={{ display: 'block', color: 'var(--text-main)' }}>MJ Tech Global Engineering</strong>
                                <span style={{ color: 'var(--text-muted)' }}>Software Products Lab</span>
                            </div>
                            <Link href="/products" className="btn btn-primary" style={{ padding: '0.5rem 1rem', fontSize: '0.85rem' }}>
                                Explore Products &rarr;
                            </Link>
                        </div>
                    </div>
                </div>
            </article>
        </main>
    );
}
