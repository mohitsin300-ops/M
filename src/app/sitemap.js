import { siteConfig } from '@/lib/siteConfig';

export default function sitemap() {
    const baseUrl = 'https://www.mjtechglobal.in';

    const staticRoutes = [
        '',
        '/products',
        '/products/nexa-reply',
        '/products/resume-pro',
        '/products/prompt-copy',
        '/about',
        '/services',
        '/technology',
        '/ai-innovation',
        '/startup-overview',
        '/portfolio',
        '/careers',
        '/internship',
        '/blog',
        '/contact',
        '/verify',
        '/privacy-policy',
        '/terms',
        '/refund-policy'
    ];

    const blogRoutes = siteConfig.blogPosts.map((post) => `/blog/${post.slug}`);

    const allRoutes = [...staticRoutes, ...blogRoutes];

    return allRoutes.map((route) => ({
        url: `${baseUrl}${route}`,
        lastModified: new Date().toISOString(),
        changeFrequency: route === '' || route === '/products' ? 'weekly' : 'monthly',
        priority: route === '' ? 1.0 : route.startsWith('/products') ? 0.9 : 0.8,
    }));
}
