import React from "react";
import { MacbookScroll } from "./macbook-scroll";

export function MacbookScrollDemo() {
  return (
    // ✅ overflow-hidden was killing the scroll — removed. Added min-h so it has scroll room.
    <div className="w-full">
      <MacbookScroll
        title={
          <span>
            Turn meeting notes <br />
            <span className="bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
              into action items.
            </span>
          </span>
        }
        badge={
          <a href="https://peerlist.io/manuarora">
            <Badge className="h-10 w-10 -rotate-12 transform" />
          </a>
        }
        src={appScreenshot}
        showGradient={false}
      />
    </div>
  );
}

const appScreenshot = `data:image/svg+xml,${encodeURIComponent(`
<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="750" viewBox="0 0 1200 750">
  <!-- Background -->
  <rect width="1200" height="750" fill="#0f0c29"/>

  <!-- Sidebar -->
  <rect width="220" height="750" fill="#1a1730"/>
  <text x="28" y="44" font-family="monospace" font-size="15" fill="#a78bfa" font-weight="bold">⚡ NotesAI</text>
  <rect x="12" y="62" width="196" height="1" fill="#ffffff10"/>

  <!-- Sidebar items -->
  <rect x="12" y="78" width="196" height="36" rx="8" fill="#6d28d920"/>
  <text x="38" y="101" font-family="monospace" font-size="12" fill="#a78bfa">🏠  Dashboard</text>

  <text x="38" y="140" font-family="monospace" font-size="12" fill="#ffffff50">🎙  New Meeting</text>
  <text x="38" y="172" font-family="monospace" font-size="12" fill="#ffffff50">✅  Action Items</text>
  <text x="38" y="204" font-family="monospace" font-size="12" fill="#ffffff50">📊  Analytics</text>
  <text x="38" y="236" font-family="monospace" font-size="12" fill="#ffffff50">⚙️  Settings</text>

  <!-- Main area -->
  <!-- Topbar -->
  <rect x="220" y="0" width="980" height="56" fill="#13102a"/>
  <text x="244" y="34" font-family="monospace" font-size="14" fill="#ffffff90" font-weight="bold">Good morning, Symphony 👋</text>
  <rect x="980" y="14" width="100" height="28" rx="14" fill="#6d28d9"/>
  <text x="1003" y="33" font-family="monospace" font-size="11" fill="white">+ New</text>

  <!-- Stats row -->
  <rect x="240" y="76" width="192" height="80" rx="12" fill="#1e1b38"/>
  <text x="260" y="106" font-family="monospace" font-size="11" fill="#ffffff50">MEETINGS TODAY</text>
  <text x="260" y="136" font-family="monospace" font-size="28" fill="white" font-weight="bold">4</text>

  <rect x="448" y="76" width="192" height="80" rx="12" fill="#1e1b38"/>
  <text x="468" y="106" font-family="monospace" font-size="11" fill="#ffffff50">OPEN ACTIONS</text>
  <text x="468" y="136" font-family="monospace" font-size="28" fill="#f472b6" font-weight="bold">12</text>

  <rect x="656" y="76" width="192" height="80" rx="12" fill="#1e1b38"/>
  <text x="676" y="106" font-family="monospace" font-size="11" fill="#ffffff50">COMPLETED</text>
  <text x="676" y="136" font-family="monospace" font-size="28" fill="#34d399" font-weight="bold">38</text>

  <rect x="864" y="76" width="192" height="80" rx="12" fill="#1e1b38"/>
  <text x="884" y="106" font-family="monospace" font-size="11" fill="#ffffff50">TEAM MEMBERS</text>
  <text x="884" y="136" font-family="monospace" font-size="28" fill="#60a5fa" font-weight="bold">7</text>

  <!-- Recent Meetings header -->
  <text x="244" y="198" font-family="monospace" font-size="13" fill="#ffffff90" font-weight="bold">Recent Meetings</text>

  <!-- Meeting rows -->
  <rect x="240" y="210" width="560" height="56" rx="10" fill="#1e1b38"/>
  <rect x="256" y="226" width="8" height="8" rx="2" fill="#a78bfa"/>
  <text x="276" y="237" font-family="monospace" font-size="12" fill="white">Q3 Planning Session</text>
  <text x="276" y="254" font-family="monospace" font-size="10" fill="#ffffff40">Today 09:00 · 5 action items</text>
  <rect x="712" y="226" width="68" height="20" rx="10" fill="#6d28d920"/>
  <text x="727" y="240" font-family="monospace" font-size="10" fill="#a78bfa">● Live</text>

  <rect x="240" y="274" width="560" height="56" rx="10" fill="#1e1b38"/>
  <rect x="256" y="290" width="8" height="8" rx="2" fill="#34d399"/>
  <text x="276" y="301" font-family="monospace" font-size="12" fill="white">Product Roadmap Review</text>
  <text x="276" y="318" font-family="monospace" font-size="10" fill="#ffffff40">Yesterday · 8 action items</text>
  <rect x="712" y="290" width="68" height="20" rx="10" fill="#34d39920"/>
  <text x="722" y="304" font-family="monospace" font-size="10" fill="#34d399">✓ Done</text>

  <rect x="240" y="338" width="560" height="56" rx="10" fill="#1e1b38"/>
  <rect x="256" y="354" width="8" height="8" rx="2" fill="#60a5fa"/>
  <text x="276" y="365" font-family="monospace" font-size="12" fill="white">Design Sprint Kickoff</text>
  <text x="276" y="382" font-family="monospace" font-size="10" fill="#ffffff40">Mon 14:00 · 3 action items</text>
  <rect x="712" y="354" width="68" height="20" rx="10" fill="#60a5fa20"/>
  <text x="722" y="368" font-family="monospace" font-size="10" fill="#60a5fa">✓ Done</text>

  <rect x="240" y="402" width="560" height="56" rx="10" fill="#1e1b38"/>
  <rect x="256" y="418" width="8" height="8" rx="2" fill="#f472b6"/>
  <text x="276" y="429" font-family="monospace" font-size="12" fill="white">Investor Update Call</text>
  <text x="276" y="446" font-family="monospace" font-size="10" fill="#ffffff40">Mon 10:00 · 6 action items</text>
  <rect x="712" y="418" width="68" height="20" rx="10" fill="#f472b620"/>
  <text x="716" y="432" font-family="monospace" font-size="10" fill="#f472b6">⏳ Pending</text>

  <!-- Action Items panel -->
  <rect x="824" y="176" width="352" height="290" rx="12" fill="#1e1b38"/>
  <text x="844" y="202" font-family="monospace" font-size="13" fill="#ffffff90" font-weight="bold">Action Items</text>

  <!-- action item rows -->
  <rect x="840" y="214" width="320" height="40" rx="8" fill="#13102a"/>
  <rect x="856" y="228" width="14" height="14" rx="3" fill="none" stroke="#6d28d9" stroke-width="1.5"/>
  <text x="878" y="240" font-family="monospace" font-size="11" fill="white">Share Q3 deck with board</text>
  <rect x="1096" y="222" width="48" height="18" rx="9" fill="#f472b620"/>
  <text x="1104" y="235" font-family="monospace" font-size="9" fill="#f472b6">High</text>

  <rect x="840" y="260" width="320" height="40" rx="8" fill="#13102a"/>
  <rect x="856" y="274" width="14" height="14" rx="3" fill="none" stroke="#34d399" stroke-width="1.5"/>
  <text x="878" y="286" font-family="monospace" font-size="11" fill="white">Update Figma prototype</text>
  <rect x="1096" y="268" width="48" height="18" rx="9" fill="#60a5fa20"/>
  <text x="1103" y="281" font-family="monospace" font-size="9" fill="#60a5fa">Med</text>

  <rect x="840" y="306" width="320" height="40" rx="8" fill="#13102a"/>
  <rect x="856" y="318" width="14" height="14" rx="3" fill="#34d399" stroke="#34d399" stroke-width="1.5"/>
  <text x="878" y="332" font-family="monospace" font-size="11" fill="#ffffff50" text-decoration="line-through">Send meeting recap email</text>
  <rect x="1096" y="314" width="48" height="18" rx="9" fill="#34d39920"/>
  <text x="1101" y="327" font-family="monospace" font-size="9" fill="#34d399">Done</text>

  <rect x="840" y="352" width="320" height="40" rx="8" fill="#13102a"/>
  <rect x="856" y="364" width="14" height="14" rx="3" fill="none" stroke="#f472b6" stroke-width="1.5"/>
  <text x="878" y="378" font-family="monospace" font-size="11" fill="white">Review API contracts</text>
  <rect x="1096" y="360" width="48" height="18" rx="9" fill="#f472b620"/>
  <text x="1104" y="373" font-family="monospace" font-size="9" fill="#f472b6">High</text>

  <rect x="840" y="398" width="320" height="40" rx="8" fill="#13102a"/>
  <rect x="856" y="410" width="14" height="14" rx="3" fill="none" stroke="#a78bfa" stroke-width="1.5"/>
  <text x="878" y="424" font-family="monospace" font-size="11" fill="white">Write sprint retrospective</text>
  <rect x="1096" y="406" width="48" height="18" rx="9" fill="#60a5fa20"/>
  <text x="1103" y="419" font-family="monospace" font-size="9" fill="#60a5fa">Med</text>

  <!-- Bottom transcript box -->
  <rect x="240" y="476" width="936" height="220" rx="12" fill="#1e1b38"/>
  <text x="260" y="502" font-family="monospace" font-size="13" fill="#ffffff90" font-weight="bold">🎙 Live Transcript — Q3 Planning Session</text>
  <rect x="256" y="512" width="904" height="1" fill="#ffffff10"/>

  <text x="260" y="534" font-family="monospace" font-size="11" fill="#a78bfa">Alex (09:02)</text>
  <text x="260" y="552" font-family="monospace" font-size="11" fill="#ffffffcc">Let's align on the three pillars for Q3 — growth, retention, and infra stability.</text>

  <text x="260" y="576" font-family="monospace" font-size="11" fill="#34d399">Maya (09:04)</text>
  <text x="260" y="594" font-family="monospace" font-size="11" fill="#ffffffcc">Agreed. I'll own the retention metrics dashboard and have it ready by Friday.</text>

  <text x="260" y="618" font-family="monospace" font-size="11" fill="#60a5fa">Jordan (09:06)</text>
  <text x="260" y="636" font-family="monospace" font-size="11" fill="#ffffffcc">Infra team will scope the migration plan. We need sign-off from the board first.</text>

  <text x="260" y="660" font-family="monospace" font-size="11" fill="#f472b6">Sam (09:08)</text>
  <text x="260" y="678" font-family="monospace" font-size="11" fill="#ffffffcc">I can prep the deck for board review — will share a draft by EOD tomorrow.</text>

  <!-- Blinking cursor -->
  <rect x="260" y="688" width="8" height="14" rx="1" fill="#a78bfa" opacity="0.8"/>
</svg>
`)}`;

const Badge = ({ className }: { className?: string }) => (
  <svg width="24" height="24" viewBox="0 0 56 56" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <path d="M56 28C56 43.464 43.464 56 28 56C12.536 56 0 43.464 0 28C0 12.536 12.536 0 28 0C43.464 0 56 12.536 56 28Z" fill="#00AA45" />
    <path fillRule="evenodd" clipRule="evenodd" d="M28 54C42.3594 54 54 42.3594 54 28C54 13.6406 42.3594 2 28 2C13.6406 2 2 13.6406 2 28C2 42.3594 13.6406 54 28 54ZM28 56C43.464 56 56 43.464 56 28C56 12.536 43.464 0 28 0C12.536 0 0 12.536 0 28C0 43.464 12.536 56 28 56Z" fill="#219653" />
    <path fillRule="evenodd" clipRule="evenodd" d="M27.0769 12H15V46H24.3846V38.8889H27.0769C34.7305 38.8889 41 32.9048 41 25.4444C41 17.984 34.7305 12 27.0769 12ZM24.3846 29.7778V21.1111H27.0769C29.6194 21.1111 31.6154 23.0864 31.6154 25.4444C31.6154 27.8024 29.6194 29.7778 27.0769 29.7778H24.3846Z" fill="#24292E" />
    <path fillRule="evenodd" clipRule="evenodd" d="M18 11H29.0769C36.2141 11 42 16.5716 42 23.4444C42 30.3173 36.2141 35.8889 29.0769 35.8889H25.3846V43H18V11ZM25.3846 28.7778H29.0769C32.1357 28.7778 34.6154 26.39 34.6154 23.4444C34.6154 20.4989 32.1357 18.1111 29.0769 18.1111H25.3846V28.7778Z" fill="white" />
  </svg>
);