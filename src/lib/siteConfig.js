// Centralized Configuration for MJ Tech Global
export const siteConfig = {
    name: "MJ Tech Global",
    legalName: "MJ Tech Global",
    tagline: "Building Smarter Digital Products for Everyday Problems",
    description: "MJ Tech Global develops modern mobile applications, productivity tools, and business automation solutions that simplify digital experiences.",
    canonicalUrl: "https://www.mjtechglobal.in",
    founder: {
        name: "Mohit Singh",
        role: "Founder & CEO",
        bio: "Visionary founder focusing on building accessible mobile products, business automation workflows, and practical AI applications."
    },
    technicalHead: {
        name: "Mr. Rohit",
        role: "Technical Head"
    },
    registration: {
        country: "India",
        type: "MSME Certified",
        urn: "udyam-up-13-0023373"
    },
    emails: {
        // Official founder communication & startup programs
        founder: "founder@mjtechglobal.in",
        // General business communication
        business: "contact@mjtechglobal.in",
        businessSupplied: "contact@mjtechglobal.in",
        businessRecommended: "contact@mjtechglobal.in",
        // App and customer support
        support: "mjtechbharat@gmail.com",
        zoho: "mjtechglobal@zohomail.in"
    },
    phones: {
        whatsapp: "+91 9628416516",
        whatsappUrl: "https://wa.me/919628416516"
    },
    products: [
        {
            id: "nexa-reply",
            name: "Nexa Reply",
            fullName: "Nexa Reply: Instagram Auto DM",
            category: "Business Automation / Creator Productivity",
            shortDesc: "Automate Instagram direct message workflows, keyword responses, and comment engagement safely and effortlessly.",
            fullDesc: "Nexa Reply helps creators, solopreneurs, and growing businesses manage messaging workflows and customer engagement through automated communication tools.",
            slug: "/products/nexa-reply",
            playStoreUrl: "https://play.google.com/store/apps/details?id=com.antigravity.automationdm.automationdm",
            badge: "Flagship Automation",
            icon: "💬",
            highlights: [
                "Keyword-triggered direct message replies",
                "Comment-to-DM automated engagement sequences",
                "Customizable message templates with dynamic placeholders",
                "Streamlined creator & business workflow management"
            ],
            capabilities: [
                {
                    title: "Keyword Triggers",
                    desc: "Send tailored replies when users message specific trigger words like 'PRICE', 'LINK', or 'HELP'."
                },
                {
                    title: "Comment Automation",
                    desc: "Automatically DM users who comment on your posts or reels to send resource links instantly."
                },
                {
                    title: "Message Templates",
                    desc: "Create structured multi-variant responses to maintain high responsiveness and authentic connection."
                },
                {
                    title: "Engagement Management",
                    desc: "Track incoming engagement flows and ensure no customer or follower query goes unanswered."
                }
            ],
            complianceNote: "Nexa Reply operates as a productivity client and relies on user-authorized connection protocols. We do not make unsupported claims regarding official Meta partnerships or algorithmic follower guarantees.",
            futureRoadmap: [
                { feature: "AI-Assisted Reply Drafting", status: "Planned", desc: "Using LLM APIs to draft context-aware response variations." },
                { feature: "Customer Intent Classification", status: "In Development", desc: "Automatically categorizing messages by sales inquiries, support, or feedback." },
                { feature: "Multilingual Response Suggestions", status: "Research", desc: "Providing multi-language draft suggestions for international audiences." }
            ]
        },
        {
            id: "resume-pro",
            name: "Resume Pro",
            fullName: "Resume Pro – CV Builder",
            category: "Professional Productivity / Career Tools",
            shortDesc: "Build professional, ATS-friendly resumes and CVs with modern design templates and instant PDF export.",
            fullDesc: "Resume Pro assists students, freshers, and experienced professionals in drafting elegant, structured resumes formatted for modern recruitment systems.",
            slug: "/products/resume-pro",
            playStoreUrl: "https://play.google.com/store/apps/details?id=com.mjtech.resumebuilder",
            badge: "Productivity",
            icon: "📄",
            highlights: [
                "ATS-friendly clean typography layouts",
                "Modular section editor (Experience, Skills, Education, Projects)",
                "Instant single-tap PDF generation on device",
                "Privacy-conscious local document handling"
            ],
            capabilities: [
                {
                    title: "Structured CV Sections",
                    desc: "Standardized templates tailored for recruiter readability and ATS algorithmic parsing."
                },
                {
                    title: "Instant PDF Export",
                    desc: "Generate high-resolution vector PDFs formatted cleanly for job applications worldwide."
                },
                {
                    title: "Multiple Layout Themes",
                    desc: "Choose between minimalist, classic corporate, and modern technical CV themes."
                },
                {
                    title: "Device-First Privacy",
                    desc: "Resume content is drafted and stored locally on your device without unnecessary cloud exposure."
                }
            ],
            complianceNote: "Templates and layouts are strictly standardized for industry compliance. Current versions use rule-based formatting; AI features are clearly labeled in the future roadmap.",
            futureRoadmap: [
                { feature: "AI Bullet Point Enhancer", status: "In Development", desc: "Refining resume descriptions into high-impact action-oriented sentences." },
                { feature: "Job Description Match Score", status: "Planned", desc: "Comparing CV keyword density against specific job postings." },
                { feature: "Cover Letter Assistant", status: "Research", desc: "Drafting tailored cover letters matching selected resume templates." }
            ]
        },
        {
            id: "prompt-copy",
            name: "Prompt Copy",
            fullName: "Prompt Copy: AI Image & Video",
            category: "Creative AI Workflows / Prompt Engineering",
            shortDesc: "Discover, organize, and reuse curated prompts for generative AI image and video creation pipelines.",
            fullDesc: "Prompt Copy empowers designers, marketers, and creators with a structured library of high-quality prompts optimized for Midjourney, DALL-E, Stable Diffusion, Sora, and Runway.",
            slug: "/products/prompt-copy",
            playStoreUrl: "https://play.google.com/store/apps/details?id=com.mjtech.prompt",
            badge: "AI Workflow",
            icon: "✨",
            highlights: [
                "Curated prompt library across visual genres",
                "Single-tap copy with keyword variable tags",
                "Categorized for image & video generation models",
                "Bookmarking and personal collection curation"
            ],
            capabilities: [
                {
                    title: "Curated Visual Library",
                    desc: "Tested prompts spanning photorealism, cinematic lighting, 3D render styles, and anime aesthetics."
                },
                {
                    title: "One-Tap Copy & Use",
                    desc: "Instant clipboard integration to paste directly into AI tools without reformatting."
                },
                {
                    title: "Categorized Workflows",
                    desc: "Filter by style, aspect ratio hints, lighting keywords, camera lens parameters, and mood."
                },
                {
                    title: "Personal Library",
                    desc: "Save your favorite prompts and building blocks for recurring creative projects."
                }
            ],
            complianceNote: "Prompt Copy is a discovery and productivity tool for prompt engineering. It does not generate images directly on-device or claim unverified third-party endorsements.",
            futureRoadmap: [
                { feature: "Prompt Variation Mixer", status: "Planned", desc: "Algorithmic parameter swapping for aspect ratio, lighting, and style." },
                { feature: "Claude API Prompt Refiner", status: "Research", desc: "Intelligent expansion of simple ideas into rich, structured multi-clause prompts." },
                { feature: "Community Sharing & Sync", status: "Planned", desc: "Cloud backup and sharing of custom prompt collections." }
            ]
        }
    ],
    technologies: [
        { name: "React & Next.js", category: "Web Frontend & Full-Stack", desc: "High-performance server-rendered web applications and interactive client portals.", icon: "⚡" },
        { name: "Flutter", category: "Mobile Applications", desc: "Native-quality cross-platform Android and iOS application engineering with high FPS.", icon: "📱" },
        { name: "Node.js & Express", category: "Backend & Microservices", desc: "Scalable REST APIs, authentication services, and automation workers.", icon: "⚙️" },
        { name: "Firebase & Firestore", category: "Cloud & Realtime Data", desc: "Secure document storage, real-time sync, and managed cloud functions.", icon: "🔥" },
        { name: "Amazon Web Services (AWS)", category: "Cloud Compute & S3 Storage", desc: "Scalable cloud hosting, S3 storage buckets, and secure infrastructure pipelines.", icon: "☁️" },
        { name: "Cloudflare", category: "Edge CDN & Security", desc: "Global edge caching, DNS routing, SSL/TLS encryption, and DDoS mitigation.", icon: "🛡️" },
        { name: "REST & Webhook APIs", category: "Integrations & Automation", desc: "Robust data exchange pipelines and webhook triggers for third-party platforms.", icon: "🔗" }
    ],
    services: [
        {
            id: "mobile-dev",
            icon: "📱",
            title: "Mobile App Development",
            desc: "Native and cross-platform mobile solutions developed with Flutter and React Native. We build intuitive, responsive, and Play Store-compliant applications designed for real-world user engagement.",
            features: ["Cross-platform iOS & Android", "High-performance UI rendering", "Offline-first architectures", "Play Store compliance & deployment"]
        },
        {
            id: "web-dev",
            icon: "🌐",
            title: "Modern Web Engineering",
            desc: "Full-stack web applications and SaaS platforms powered by Next.js and React. Built with fluid responsiveness, robust security practices, and clean SEO architecture.",
            features: ["Server-rendered Next.js apps", "SEO & Core Web Vitals optimization", "Responsive modern UI/UX", "Enterprise API integrations"]
        },
        {
            id: "automation",
            icon: "⚡",
            title: "Business Automation & Tools",
            desc: "Custom automation systems that reduce manual operational burden. From social engagement workflows to document processing and workflow pipelines.",
            features: ["Messaging & DM workflows", "Automated document generation", "Webhook & REST integrations", "Process optimization"]
        },
        {
            id: "ai-integration",
            icon: "🤖",
            title: "Pragmatic AI Integration",
            desc: "Carefully planned, value-driven AI implementations. We help businesses integrate language models, prompt engineering, and intelligent processing into existing apps.",
            features: ["LLM API integration architectures", "Prompt design & testing", "Text classification & summarization", "Responsible AI compliance"]
        }
    ],
    blogPosts: [
        {
            slug: "building-automation-workflows-for-instagram",
            title: "Architecting Safe & Reliable Messaging Automation for Social Workflows",
            date: "January 14, 2026",
            category: "Automation",
            readTime: "5 min read",
            summary: "How modern creators and businesses scale customer communications while maintaining conversational quality and platform compliance.",
            content: "As digital commerce shifts directly onto social channels, creators and small business owners face unprecedented communication volume. Handling hundreds of inquiries about pricing, links, and product details manually leads to slow response times and lost opportunities. In this article, we explore the principles behind Nexa Reply's workflow engine, focusing on keyword triggers, structured templating, and why non-invasive, user-authorized automation outperforms intrusive scrapers."
        },
        {
            slug: "ats-friendly-resume-design-principles",
            title: "Why Modern ATS Systems Demand Minimalist, Structured Typography",
            date: "February 22, 2026",
            category: "Productivity",
            readTime: "4 min read",
            summary: "An engineering perspective on applicant tracking systems and how clean document hierarchies improve readability.",
            content: "Applicant Tracking Systems (ATS) process millions of candidate documents each month. Despite flashy resume designs popular online, complex tables, multi-column floating boxes, and raster graphics frequently cause parsing errors. We break down the technical rationale behind Resume Pro's clean vector layout generation and how structured typography ensures that applicant credentials parse accurately."
        },
        {
            slug: "prompt-engineering-workflows-generative-media",
            title: "From Raw Prompts to Repeatable Creative Workflows: A Systematic Approach",
            date: "March 18, 2026",
            category: "AI Innovation",
            readTime: "6 min read",
            summary: "A practical guide to structuring generative image and video prompts for consistent brand and creative output.",
            content: "Generative media models have advanced rapidly, yet creative teams often struggle with output reproducibility. Building reliable visual assets requires more than guessing keywords—it requires disciplined prompt structure including subject definition, stylistic modifiers, camera perspective, and lighting parameters. This article explores how prompt taxonomy transforms chaotic generation into repeatable design pipelines."
        }
    ]
};
