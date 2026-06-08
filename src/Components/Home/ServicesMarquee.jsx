"use client";

export default function LRSMasonryClone() {
    const column1 = [
        {
            title: "NOC Services",
            image:
                "https://images.unsplash.com/photo-1496171367470-9ed9a91ea931?q=80&w=1200&auto=format&fit=crop",
            height: "h-[190px]",
        },
        {
            title: "Digital Transformation",
            image:
                "https://images.unsplash.com/photo-1515879218367-8466d910aaa4?q=80&w=1200&auto=format&fit=crop",
            height: "h-[290px]",
        },
    ];

    const column2 = [
        {
            title: "Managed Services",
            image:
                "https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=1200&auto=format&fit=crop",
            height: "h-[190px]",
        },
        {
            title: "Cloud Services",
            image:
                "https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=1200&auto=format&fit=crop",
            height: "h-[290px]",
        },
    ];

    const column3 = [
        {
            title: "Security",
            image:
                "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?q=80&w=1200&auto=format&fit=crop",
            height: "h-[240px]",
        },
        {
            title: "100% Uptime",
            image:
                "https://images.unsplash.com/photo-1520607162513-77705c0f0d4a?q=80&w=1200&auto=format&fit=crop",
            height: "h-[240px]",
        },
    ];

    const column4 = [
        {
            title: "Resource Augmentation",
            image:
                "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=1200&auto=format&fit=crop",
            height: "h-[240px]",
        },
        {
            title: "Energy & Power",
            image:
                "https://images.unsplash.com/photo-1516321497487-e288fb19713f?q=80&w=1200&auto=format&fit=crop",
            height: "h-[240px]",
        },
    ];

    const columns = [column1, column2, column3, column4];

    return (
        <section className="w-full bg-white py-16 overflow-hidden">
            {/* TOP CONTENT */}
            <div className="text-center mb-16 px-6">
                {/* TOP SMALL TEXT */}
                <p className="uppercase tracking-[7px] text-[#7FB3F3] text-sm md:text-base font-semibold mb-4">
                    ENTERPRISE IT SERVICES
                </p>

                {/* MAIN HEADING */}
                <h1 className="text-[52px] md:text-[60px] leading-[0.95] font-[700] text-[rgba(3,38,64,1)] tracking-[-4px]">
                    End-to-End Solutions
                </h1>
            </div>

            {/* SLIDER */}
            <div className="relative overflow-hidden">
                {/* LEFT FADE */}
                {/* <div className="absolute left-0 top-0 h-full w-28 bg-gradient-to-r from-white to-transparent z-20" /> */}

                {/* RIGHT FADE */}
                {/* <div className="absolute right-0 top-0 h-full w-28 bg-gradient-to-l from-white to-transparent z-20" /> */}

                <div className="flex gap-8 animate-marquee w-max px-6">
                    {[...columns, ...columns].map((column, i) => (
                        <div
                            key={i}
                            className="flex flex-col gap-8 shrink-0"
                        >
                            {column.map((card, index) => (
                                <div
                                    key={index}
                                    className={`relative w-[300px] ${card.height} rounded-[30px] overflow-hidden group cursor-pointer shadow-[0_2px_10px_rgba(0,0,0,0.18)] hover:shadow-[0_10px_20px_rgba(0,0,0,0.22)] transition-all duration-500`}
                                >
                                    {/* IMAGE */}
                                    <img
                                        src={card.image}
                                        alt={card.title}
                                        className="w-full h-full object-cover  transition duration-700"
                                    />

                                    {/* OVERLAY */}
                                    <div className="absolute inset-0 bg-black/45 group-hover:bg-white/5 transition duration-500" />

                                    {/* CONTENT */}
                                    <div className="absolute bottom-5 left-5 z-10">
                                        <h2 className="text-white text-[18px] md:text-[20px] font-semibold">
                                            {card.title}
                                        </h2>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ))}
                </div>
            </div>

            <style jsx>{`
        @keyframes marquee {
          0% {
            transform: translateX(0%);
          }

          100% {
            transform: translateX(-50%);
          }
        }

        .animate-marquee {
          animation: marquee 32s linear infinite;
        }

        
      `}</style>
        </section>
    );
}