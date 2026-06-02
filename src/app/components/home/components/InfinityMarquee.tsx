"use client";

const row1 = [
    { icon: "🎙️", label: "Smart Capture" },
    { icon: "✅", label: "Action Tracking", badge: "New" },
    { icon: "🔔", label: "Auto Reminders" },
    { icon: "🔗", label: "Slack" },
    { icon: "📋", label: "Jira" },
    { icon: "📝", label: "Notion" },
    { icon: "🔒", label: "SOC 2 Certified" },
    { icon: "📊", label: "Analytics", badge: "Beta" },
];

const row2 = [
    { icon: "🤖", label: "AI Summaries" },
    { icon: "👥", label: "Team Assign" },
    { icon: "📅", label: "Calendar Sync", badge: "New" },
    { icon: "⚡", label: "Real-time Sync" },
    { icon: "🌍", label: "Multi-language" },
    { icon: "🔍", label: "Smart Search" },
    { icon: "📁", label: "Google Drive" },
    { icon: "🛡️", label: "E2E Encryption" },
];

type Item = { icon: string; label: string; badge?: string };

function MarqueeRow({
    items,
    direction,
    duration,
}: {
    items: Item[];
    direction: "left" | "right";
    duration: number;
}) {
    const doubled = [...items, ...items];
    return (
        <div className="overflow-hidden w-full group/row">
            <div
                className={`flex gap-4 w-max group-hover/row:[animation-play-state:paused]`}
                style={{
                    animation: `${direction === "left" ? "marquee-left" : "marquee-right"} ${duration}s linear infinite`,
                }}
            >
                {doubled.map((item, i) => (
                    <div
                        key={i}
                        className="flex items-center gap-3 px-6 py-3.5 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm text-base font-medium text-white whitespace-nowrap hover:border-indigo-500/40 hover:bg-white/10 transition-colors cursor-default"
                    >
                        <span className="text-2xl">{item.icon}</span>
                        {item.label}
                        {item.badge && (
                            <span className="text-xs px-2.5 py-0.5 rounded-full bg-indigo-500/20 text-indigo-300">
                                {item.badge}
                            </span>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
}

export function InfiniteMarquee() {
    return (
        <section className="relative z-10 py-16">
            <p className="text-center text-xs uppercase tracking-widest text-gray-500 mb-8">
                Trusted integrations &amp; features
            </p>
            <div className="flex flex-col gap-4">
                <MarqueeRow items={row1} direction="left" duration={22} />
                <MarqueeRow items={row2} direction="right" duration={26} />
            </div>
        </section>
    );
}