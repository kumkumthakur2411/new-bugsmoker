"use client";

import { useEffect, useState, useRef } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { servicesData, ServiceCard } from "./services";

const funkyItems = [
    {
        line2: "we are",
        line3: "bugsmoker",
        meta: "Visual Campaign",
        image: "/home/new1.png",
    },
    {
        line2: "machine that",
        line3: "loves",
        meta: "Interactive Build",
        image: "/home/new2.png",
    },
    {
        line2: "between code ",
        line3: "& nature",
        meta: "Digital Mischief",
        image: "/home/new3.png",
    },
    {
        line2: "human behind",
        line3: "tech ",
        meta: "Editorial Worlds",
        image: "/home/new4.png",
    },
];

export default function Hero() {
    const [activeFunkyIndex, setActiveFunkyIndex] = useState(0);
    const [expandedCards, setExpandedCards] = useState(() =>
        servicesData.map((_, i) => i === 0)
    );

    const containerRef = useRef(null);
    const pinWrapperRef = useRef(null);
    const cardsTrackRef = useRef(null);

    // Automatically cycle through hero funky items every 5 seconds
    useEffect(() => {
        const timer = setInterval(() => {
            setActiveFunkyIndex((prev) => (prev + 1) % funkyItems.length);
        }, 5000);

        return () => clearInterval(timer);
    }, []);

    const handleToggleCard = (index) => {
        setExpandedCards((prev) => {
            const next = new Array(servicesData.length).fill(false);
            if (!prev[index]) {
                next[index] = true;
            }
            return next;
        });
    };

    // GSAP ScrollTrigger: Desktop Horizontal Scroll vs Mobile Natural Vertical Flow
    useEffect(() => {
        gsap.registerPlugin(ScrollTrigger);

        const container = containerRef.current;
        const pinWrapper = pinWrapperRef.current;
        const cardsTrack = cardsTrackRef.current;

        if (!container || !pinWrapper || !cardsTrack) return;

        const mm = gsap.matchMedia();

        // 1. DESKTOP VIEW (>= 768px): Horizontal Pinned Scroll Scrub
        mm.add("(min-width: 768px)", () => {
            const screenWidth = window.innerWidth;
            const cardWidth = 0.45 * screenWidth;
            const totalTrackWidth = servicesData.length * cardWidth;
            const totalDistance = screenWidth + totalTrackWidth - cardWidth;

            // Clear any mobile inline styles on images
            gsap.set(".service-card-image", { clearProps: "all" });
            gsap.set(cardsTrack, { left: "100vw", x: 0, clearProps: "transform" });

            const checkCardPositions = () => {
                if (!cardsTrack) return;
                const cards = cardsTrack.children;
                const width = window.innerWidth;
                const threshold = 0.2 * width; // 20vw threshold

                const newExpanded = [];
                for (let i = 0; i < cards.length; i++) {
                    const rect = cards[i].getBoundingClientRect();
                    const entered = width - rect.left;
                    newExpanded.push(entered >= threshold);
                }

                setExpandedCards((prev) => {
                    const hasChanged = prev.some((val, idx) => val !== newExpanded[idx]);
                    return hasChanged ? newExpanded : prev;
                });
            };

            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: container,
                    start: "top top",
                    end: () => `+=${totalDistance * 1.3}`,
                    pin: pinWrapper,
                    scrub: 1.1,
                    invalidateOnRefresh: true,
                    onUpdate: checkCardPositions,
                },
            });

            // Hide hero indicator buttons as cards begin to roll in
            tl.to(".hero-indicators", { opacity: 0, duration: 0.1 }, 0);

            // Slide horizontal card track across screen
            tl.to(
                cardsTrack,
                {
                    x: -totalDistance,
                    ease: "none",
                },
                0
            );

            // Subtle dimming of hero left text as cards occupy screen
            tl.to(
                ".hero-content-area",
                {
                    opacity: 0.35,
                    scale: 0.96,
                    ease: "none",
                },
                0.1
            );

            ScrollTrigger.refresh();
        });

        // 2. MOBILE VIEW (< 768px): Overlap Hero + Image Slide-in from Right at 20vh
        mm.add("(max-width: 767px)", () => {
            gsap.set(cardsTrack, { clearProps: "all" });
            gsap.set(pinWrapper, { clearProps: "all" });
            gsap.set(".hero-content-area", { clearProps: "all" });
            gsap.set(".hero-indicators", { clearProps: "all" });

            const cards = cardsTrack.children;
            const triggers = [];

            // A. Hero Overlap effect: dim hero content as services overlap hero
            const heroOverlapTrigger = ScrollTrigger.create({
                trigger: cardsTrack,
                start: "top bottom",
                end: "top top",
                scrub: true,
                onUpdate: (self) => {
                    gsap.set(".hero-content-area", {
                        opacity: 1 - 0.75 * self.progress,
                        scale: 1 - 0.05 * self.progress,
                    });
                    gsap.set(".hero-indicators", {
                        opacity: 1 - self.progress,
                    });
                },
            });
            triggers.push(heroOverlapTrigger);

            // B. Card Image Reveal: slides in from the right when card enters 20vh into screen
            Array.from(cards).forEach((card, idx) => {
                const imgBox = card.querySelector(".service-card-image");

                // Initially position off to the right
                if (imgBox) {
                    gsap.set(imgBox, { x: "100%", opacity: 0 });
                }

                // Trigger at 20vh of the screen (top 80% = card enters 20vh into viewport)
                const trigger = ScrollTrigger.create({
                    trigger: card,
                    start: "top 80%",
                    end: "bottom 20%",
                    onEnter: () => {
                        if (imgBox) {
                            gsap.to(imgBox, {
                                x: "0%",
                                opacity: 1,
                                duration: 0.75,
                                ease: "power3.out",
                                overwrite: "auto",
                            });
                        }
                        setExpandedCards(() => {
                            const next = new Array(servicesData.length).fill(false);
                            next[idx] = true;
                            return next;
                        });
                    },
                    onEnterBack: () => {
                        if (imgBox) {
                            gsap.to(imgBox, {
                                x: "0%",
                                opacity: 1,
                                duration: 0.75,
                                ease: "power3.out",
                                overwrite: "auto",
                            });
                        }
                        setExpandedCards(() => {
                            const next = new Array(servicesData.length).fill(false);
                            next[idx] = true;
                            return next;
                        });
                    },
                    onLeaveBack: () => {
                        if (imgBox) {
                            gsap.to(imgBox, {
                                x: "100%",
                                opacity: 0,
                                duration: 0.45,
                                ease: "power2.in",
                                overwrite: "auto",
                            });
                        }
                    },
                });
                triggers.push(trigger);
            });

            ScrollTrigger.refresh();

            return () => {
                triggers.forEach((t) => t.kill());
                gsap.set(".service-card-image", { clearProps: "all" });
            };
        });

        const handleResize = () => {
            ScrollTrigger.refresh();
        };

        window.addEventListener("resize", handleResize);

        return () => {
            window.removeEventListener("resize", handleResize);
            mm.revert();
        };
    }, []);

    const currentItem = funkyItems[activeFunkyIndex];

    return (
        <div ref={containerRef} className="relative w-full">
            <style>{`
        @keyframes heroTextSlideUp {
          0% {
            opacity: 0;
            transform: translateY(35px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-hero-text {
          animation: heroTextSlideUp 0.65s cubic-bezier(0.16, 1, 0.3, 1) both;
        }
      `}</style>

            {/* Pinned Viewport Container on Desktop / Normal Vertical Flow on Mobile */}
            <section
                ref={pinWrapperRef}
                className="relative w-full md:h-[100dvh] md:min-h-[100dvh] md:overflow-hidden select-none bg-[#090807] text-white"
            >
                {/* ================= HERO BACKGROUND & CONTENT ================= */}
                <div className="sticky top-0 md:absolute md:inset-0 z-0 h-[100dvh] min-h-[100dvh] w-full overflow-hidden">
                    {/* Background Images with smooth cross-fade */}
                    {funkyItems.map((item, index) => (
                        <Image
                            key={item.image}
                            src={item.image}
                            alt={`${item.line2} ${item.line3} preview`}
                            fill
                            priority={index === 0}
                            sizes="100vw"
                            className={`scale-105 object-cover transition-all duration-700 ease-out ${activeFunkyIndex === index
                                ? "opacity-100 blur-0"
                                : "opacity-0 blur-sm pointer-events-none"
                                }`}
                        />
                    ))}

                    {/* Ambient gradient overlay */}
                    <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_72%_24%,rgba(255,255,255,0.22),transparent_27%),linear-gradient(90deg,rgba(0,0,0,0.86)_0%,rgba(0,0,0,0.5)_43%,rgba(0,0,0,0.18)_100%)]" />

                    {/* Hero Typography */}
                    <div
                        className="hero-content-area relative z-10 mx-auto flex h-full w-full max-w-[1800px] flex-col justify-end px-5 sm:px-7 md:px-10 pb-10 sm:pb-8 md:pb-12 transition-all duration-300 will-change-transform"
                        style={{
                            paddingBottom:
                                "max(3rem, calc(env(safe-area-inset-bottom, 0px) + 2rem))",
                        }}
                    >
                        <div className="grid flex-1 items-end gap-2 pt-4 md:pt-8">
                            <div className="flex-1 flex items-end pt-4 sm:pt-32">
                                <div className="w-full">
                                    <div key={activeFunkyIndex} className="animate-hero-text">
                                        <h2
                                            className="font-sans text-[clamp(2.75rem,14vw,5.5rem)] sm:text-[clamp(5rem,20vw,15rem)] md:text-[clamp(4.5rem,12vw,12.5rem)] font-black uppercase leading-[0.88] sm:leading-[0.76] md:leading-[0.73] tracking-[-0.07em] sm:tracking-[-0.09em] md:tracking-[-0.1em] pb-3 sm:pb-1"
                                            style={{
                                                fontFamily: "'Nexa', 'Syne', -apple-system, sans-serif",
                                                fontWeight: 900,
                                                WebkitTextStroke: "1.2px currentColor",
                                                paintOrder: "stroke fill",
                                            }}
                                        >
                                            {currentItem.line1 && (
                                                <>
                                                    {currentItem.line1}
                                                    <br />
                                                </>
                                            )}
                                            {currentItem.line2 && (
                                                <>
                                                    {currentItem.line2}
                                                    <br />
                                                </>
                                            )}
                                            {currentItem.line3?.trim()}
                                            <span className="text-orange-500">.</span>
                                        </h2>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Slide navigation indicator pills */}
                        <div className="hero-indicators absolute bottom-24 right-5 flex flex-col gap-2 sm:right-8 md:right-10 md:translate-y-1/2 transition-opacity duration-300">
                            {funkyItems.map((item, index) => (
                                <button
                                    key={item.image}
                                    type="button"
                                    onClick={() => setActiveFunkyIndex(index)}
                                    className={`h-2 w-8 rounded-full transition-all duration-300 ${activeFunkyIndex === index
                                        ? "bg-orange-500"
                                        : "bg-white/30 hover:bg-white/60"
                                        }`}
                                    aria-label={`Show ${item.line2} ${item.line3}`}
                                />
                            ))}
                        </div>
                    </div>
                </div>

                {/* ================= SERVICES CARDS TRACK (Vertical Rows on Mobile / Horizontal on Desktop) ================= */}
                <div
                    ref={cardsTrackRef}
                    className="relative left-0 w-full flex flex-col md:absolute md:top-0 md:left-[100vw] md:h-full md:flex-row md:w-auto z-20 pointer-events-auto will-change-transform shadow-[0_-25px_60px_rgba(0,0,0,0.85)]"
                >
                    {servicesData.map((service, index) => (
                        <ServiceCard
                            key={service.id}
                            item={service}
                            index={index}
                            total={servicesData.length}
                            isExpanded={Boolean(expandedCards[index])}
                            onToggle={() => handleToggleCard(index)}
                        />
                    ))}
                </div>
            </section>
        </div>
    );
}
