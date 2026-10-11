"use client";

import Image from "next/image";

export const servicesData = [
    {
        id: 1,
        title: "Mobile App Development",
        shortTitle: "Mobile Apps",
        category: "iOS & Android",
        description: "We build high-performance iOS and Android apps that deliver seamless user experiences.",
        image: "/services/1.jpeg",
        icon: "fa-mobile-alt",
        link: "/services/mobile-app-development",
        color: "#ED7D31",
        subItems: [
            "iOS Native",
            "Android Native",
            "React Native",
            "App Store Launch",
        ],
    },
    {
        id: 2,
        title: "Web Development",
        shortTitle: "Web Platforms",
        category: "Full Stack",
        description: "Professional web development services to create fast, secure, and scalable websites.",
        image: "/services/2.jpeg",
        icon: "fa-laptop-code",
        link: "/services/web-development",
        color: "#2E74B5",
        subItems: [
            "Next.js & React",
            "Headless CMS",
            "Cloud Hosting",
            "API Architecture",
        ],
    },
    {
        id: 3,
        title: "UI/UX Design",
        shortTitle: "UI/UX Systems",
        category: "Product Design",
        description: "Stunning and user-centric interface designs that enhance user engagement.",
        image: "/services/3.jpeg",
        icon: "fa-paint-brush",
        link: "/services/ui-ux-design",
        color: "#813B6B",
        subItems: [
            "Design Systems",
            "User Research",
            "Wireframing",
            "Motion & 3D",
        ],
    },
    {
        id: 4,
        title: "Software Development",
        shortTitle: "Software Engine",
        category: "Custom Systems",
        description: "Custom software development services to meet your business needs.",
        image: "/services/4.jpeg",
        icon: "fa-code",
        link: "/services/software-development",
        color: "#1B4F72",
        subItems: [
            "Custom Backends",
            "Microservices",
            "Database Design",
            "DevOps Automation",
        ],
    },
    {
        id: 5,
        title: "Tech & Hosting Support",
        shortTitle: "Cloud & Support",
        category: "24/7 Operations",
        description: "Reliable technical and hosting support to keep your business running smoothly.",
        image: "/services/5.jpeg",
        icon: "fa-headset",
        link: "/services/tech-support",
        color: "#F3722C",
        subItems: [
            "24/7 Monitoring",
            "Server Hardening",
            "Disaster Recovery",
            "Performance Audits",
        ],
    },
];

export function ServiceCard({ item, index, total, isExpanded, onToggle }) {
    return (
        <article
            className="relative flex flex-row md:flex-col w-full min-w-full h-[52vh] min-h-[350px] max-h-[440px] md:h-[100dvh] md:min-h-0 md:max-h-none md:w-[45vw] md:min-w-[45vw] overflow-hidden border-b md:border-b-0 md:border-r border-black/30 select-none shrink-0 shadow-2xl cursor-pointer md:cursor-default"
            onClick={onToggle}
        >
            {/* ================= 1. MOBILE: LEFT (~60%) / DESKTOP: BOTTOM SECTION ================= */}
            <div
                style={{
                    backgroundColor: item.color,
                }}
                className={`order-1 md:order-2 flex flex-col justify-between p-5 sm:p-6 md:p-8 lg:p-10 text-white w-[60%] sm:w-[58%] md:w-full overflow-hidden transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                    isExpanded ? "md:h-[32vh]" : "md:h-[60vh]"
                }`}
            >
                {/* ---------- MOBILE VIEW CONTENT (Matches Screenshot) ---------- */}
                <div className="flex md:hidden flex-col justify-between h-full w-full">
                    {/* Top: Title */}
                    <div>
                        <h3 className="text-xl sm:text-2xl font-bold tracking-tight text-white leading-tight">
                            {item.title}
                        </h3>
                    </div>

                    {/* Middle: Expanded Sub-Services List vs Collapsed Preview */}
                    {isExpanded ? (
                        <div className="flex flex-col gap-2 my-auto py-2">
                            {item.subItems.map((sub, i) => (
                                <div
                                    key={i}
                                    className="flex items-center justify-between border-b border-white/20 pb-1 text-xs font-medium text-white/95"
                                >
                                    <span className="truncate pr-1">{sub}</span>
                                    <span className="text-white/70 font-mono text-xs shrink-0">
                                        &gt;
                                    </span>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="mt-auto flex items-end justify-between gap-2 pt-2">
                            <div className="flex flex-col gap-0.5 max-w-[65%]">
                                <p className="text-xs font-medium text-white/90 leading-snug line-clamp-2">
                                    {item.category || item.shortTitle}
                                </p>
                            </div>
                            {/* Inset thumbnail preview matching screenshot */}
                            <div className="relative h-12 w-16 sm:h-14 sm:w-20 shrink-0 overflow-hidden rounded shadow-md border border-white/20">
                                <Image
                                    src={item.image}
                                    alt={item.title}
                                    fill
                                    sizes="80px"
                                    className="object-cover"
                                />
                            </div>
                        </div>
                    )}

                    {/* Bottom: Index 1/5 */}
                    <div className="text-xs font-mono tracking-widest text-white/70 pt-2">
                        {index + 1} / {total}
                    </div>
                </div>

                {/* ---------- DESKTOP VIEW CONTENT (Original Untouched Experience) ---------- */}
                <div className="hidden md:flex md:flex-col md:justify-between md:h-full">
                    {/* Detailed Content (Reveals when isExpanded is true) */}
                    <div
                        className={`transition-all duration-500 ease-out ${
                            isExpanded
                                ? "opacity-100 translate-y-0 pointer-events-auto"
                                : "opacity-0 -translate-y-4 pointer-events-none max-h-0 overflow-hidden"
                        }`}
                    >
                        <div className="flex items-start justify-between gap-4">
                            {/* 2x2 Sub-Services Grid */}
                            <div className="grid grid-cols-2 gap-x-6 gap-y-3 flex-1 max-w-[85%]">
                                {item.subItems.map((sub, i) => (
                                    <div
                                        key={i}
                                        className="flex items-center justify-between border-b border-white/25 pb-1.5 text-xs sm:text-sm font-medium tracking-wide text-white/95 hover:border-white transition-colors cursor-pointer group"
                                    >
                                        <span className="truncate">{sub}</span>
                                        <span className="text-white/60 group-hover:translate-x-0.5 transition-transform text-xs ml-1 font-mono">
                                            &gt;
                                        </span>
                                    </div>
                                ))}
                            </div>

                            {/* Circular Plus Action Button */}
                            <button
                                type="button"
                                onClick={(e) => {
                                    e.stopPropagation();
                                    if (onToggle) onToggle();
                                }}
                                aria-label={`${isExpanded ? "Collapse" : "Explore"} ${item.title}`}
                                className="flex h-10 w-10 sm:h-11 sm:w-11 shrink-0 items-center justify-center rounded-full bg-white text-black shadow-lg transition-transform hover:scale-110 active:scale-95 cursor-pointer"
                            >
                                <svg
                                    width="14"
                                    height="14"
                                    viewBox="0 0 14 14"
                                    fill="none"
                                    className={`transition-transform duration-300 ${
                                        isExpanded ? "rotate-45" : "hover:rotate-90"
                                    }`}
                                >
                                    <path
                                        d="M7 1V13M1 7H13"
                                        stroke="currentColor"
                                        strokeWidth="2"
                                        strokeLinecap="round"
                                    />
                                </svg>
                            </button>
                        </div>
                    </div>

                    {/* Footer: Title, Category & Index */}
                    <div className="mt-auto pt-4">
                        <div className="flex items-baseline justify-between gap-3">
                            <h3 className="text-2xl sm:text-3xl md:text-4xl lg:text-[2.75rem] font-bold tracking-tight text-white leading-[1.05]">
                                {item.title}
                            </h3>
                            <span className="text-xs sm:text-sm font-medium text-white/75 shrink-0 text-right">
                                {item.category}
                            </span>
                        </div>

                        <div className="mt-2 text-xs sm:text-sm font-mono tracking-widest text-white/65">
                            {index + 1}/{total}
                        </div>
                    </div>
                </div>
            </div>

            {/* ================= 2. MOBILE: RIGHT (~40%) / DESKTOP: TOP SECTION (IMAGE) ================= */}
            <div className="order-2 md:order-1 relative w-[40%] sm:w-[42%] md:w-full h-full md:flex-1 overflow-hidden bg-black/40">
                <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    priority={index === 0}
                    sizes="(max-width: 768px) 45vw, 45vw"
                    className="object-cover transition-transform duration-1000 ease-out hover:scale-105"
                />
                {/* Subtle top/bottom vignette */}
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-black/20" />
            </div>
        </article>
    );
}

export default function Services({ expandedCards = [], onToggleCard }) {
    return (
        <div className="flex h-full flex-col md:flex-row w-full">
            {servicesData.map((service, index) => (
                <ServiceCard
                    key={service.id}
                    item={service}
                    index={index}
                    total={servicesData.length}
                    isExpanded={Boolean(expandedCards[index])}
                    onToggle={onToggleCard ? () => onToggleCard(index) : undefined}
                />
            ))}
        </div>
    );
}