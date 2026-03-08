export default function sitemap() {
    const baseUrl = 'https://mjtechglobal.in';

    const routes = [
        '',
        '/about',
        '/services',
        '/portfolio',
        '/careers',
        '/internship',
        '/blog',
        '/contact',
        '/auth',
        '/verify',
        '/privacy-policy',
        '/terms'
    ].map((route) => ({
        url: `${baseUrl}${route}`,
        lastModified: new Date().toISOString(),
        changeFrequency: route === '' ? 'weekly' : 'monthly',
        priority: route === '' ? 1 : 0.8,
    }));

    return routes;
}
