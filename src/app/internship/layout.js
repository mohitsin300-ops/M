export const metadata = {
    title: 'Free Online IT Internships | MJ Tech Global',
    description: 'Apply for free online IT internships at MJ Tech Global. Get practical experience with real tasks, earn completion certificates & LORs for Frontend, Backend, UI/UX, and more.',
    keywords: 'free online internships, IT internships for students, react js internship, web development internship, app development internship, MJ Tech Global internship, remote internship, certificate internship, best internship online',
    openGraph: {
        title: 'Free Online IT Internships | MJ Tech Global',
        description: 'Apply for free online IT internships at MJ Tech Global. Get practical experience with real tasks, earn completion certificates & LORs.',
        url: 'https://mjtechglobal.in/internship',
        siteName: 'MJ Tech Global',
        images: [
            {
                url: '/logo.png',
                width: 800,
                height: 600,
            },
        ],
        locale: 'en_IN',
        type: 'website',
    },
};

export default function InternshipLayout({ children }) {
    return <>{children}</>;
}
