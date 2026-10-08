export default function robots() {
    return {
        rules: {
            userAgent: '*',
            allow: '/',
            disallow: ['/api/', '/admin', '/admingo'],
        },
        sitemap: 'https://www.mjtechglobal.in/sitemap.xml',
    }
}
