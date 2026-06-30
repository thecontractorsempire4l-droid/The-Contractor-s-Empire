import { useState, useEffect, useMemo, useRef } from "react";
import {
  Home, Wrench, Shield, MapPin, Phone, Mail, Camera, Clock, Check,
  ChevronRight, ChevronLeft, Zap, AlertTriangle, Building2, Lock,
  Unlock, Hammer, X, Plus, Upload
} from "lucide-react";

/* ================================================================ */
/*  Contractors Empire — Phase 1 MVP (Enhanced)                     */
/*  - Multiple services per job                                     */
/*  - Email notifications on claim                                  */
/*  - Contractor branding (logo + background upload)                */
/*  - No Mapbox dependency                                          */
/* ================================================================ */

const C = {
  ink: "#16181D", panel: "#1E2228", panel2: "#262B33", panelHi: "#2E343D",
  line: "#333A44", lineHi: "#414A56",
  amber: "#F2A516", amberDk: "#B97F0A",
  red: "#E04434", redDk: "#8F2A20",
  green: "#3FB871", greenDk: "#1F6E45",
  paper: "#EEF1F3", paperLine: "#D5DCE2", paperInk: "#1C2530",
  textHi: "#F4F6F8", textMid: "#9AA4B0", textLo: "#69727E", blue: "#5C9BDC",
};

const SERVICES = [
  { id: "Roofing", icon: Home }, { id: "HVAC", icon: Zap },
  { id: "Plumbing", icon: Wrench }, { id: "Electrical", icon: Zap },
  { id: "Garage Doors", icon: Building2 }, { id: "Remodeling", icon: Hammer },
  { id: "Storm Damage", icon: AlertTriangle }, { id: "Other Trades", icon: Wrench },
];

const URGENCY = [
  { id: "Emergency", label: "Emergency", sub: "Need help now", color: C.red },
  { id: "Soon", label: "Needs done soon", sub: "Within a week or two", color: C.amber },
  { id: "Planning", label: "Planning ahead", sub: "No rush", color: C.blue },
];

const ZIPS = {
  "46545": [41.667, -86.158], "46544": [41.681, -86.131],
  "46556": [41.700, -86.238], "46202": [39.781, -86.162],
  "46032": [39.962, -86.131], "60601": [41.886, -87.622],
};

const miles = (a, b) => {
  if (!ZIPS[a] || !ZIPS[b]) return null;
  const [la1, lo1] = ZIPS[a], [la2, lo2] = ZIPS[b];
  const R = 3958.8, dLa = (la2 - la1) * Math.PI / 180, dLo = (lo2 - lo1) * Math.PI / 180;
  const h = Math.sin(dLa / 2) ** 2 +
    Math.cos(la1 * Math.PI / 180) * Math.cos(la2 * Math.PI / 180) * Math.sin(dLo / 2) ** 2;
  return Math.round(2 * R * Math.asin(Math.sqrt(h)));
};

const mem = new Map();
const store = {
  async get(k) {
    try { if (window.storage) { const r = await window.storage.get(k, false); return r ? r.value : null; } }
    catch { return mem.has(k) ? mem.get(k) : null; }
    return mem.has(k) ? mem.get(k) : null;
  },
  async set(k, v) {
    try { if (window.storage) { await window.storage.set(k, v, false); return; } } catch { }
    mem.set(k, v);
  },
};

const seedLeads = () => {
  const now = Date.now();
  return [
    { id: "1042", createdAt: now - 1000 * 60 * 18, services: ["Roofing"], urgency: "Emergency",
      zip: "46545", city: "Mishawaka, IN", address: "1418 Lincoln Way E",
      title: "Roof leaking after hailstorm", desc: "Hail came through last night. Active drip over the kitchen, ceiling stain spreading. Need a tarp today at minimum.",
      photos: ["hail-ceiling.jpg", "shingles.jpg"], name: "Dana Whitfield", phone: "(574) 555-0142", email: "dana.w@email.com", status: "open" },
    { id: "1039", createdAt: now - 1000 * 60 * 90, services: ["HVAC"], urgency: "Soon",
      zip: "46202", city: "Indianapolis, IN", address: "905 N College Ave",
      title: "AC not cooling, blowing warm", desc: "Unit runs but only blows warm air. Started two days ago. House is a 1,600 sq ft single story.",
      photos: ["thermostat.jpg"], name: "Marcus Lao", phone: "(317) 555-0188", email: "mlao@email.com", status: "open" },
    { id: "1031", createdAt: now - 1000 * 60 * 60 * 5, services: ["Plumbing", "Storm Damage"], urgency: "Planning",
      zip: "46544", city: "Mishawaka, IN", address: "",
      title: "Replace 50-gal water heater", desc: "Current heater is 14 years old, want to replace before it fails. Open on timing, looking for a quote.",
      photos: [], name: "Priya Shah", phone: "(574) 555-0173", email: "priya.s@email.com", status: "open" },
  ];
};

const defaultContractor = {
  business: "Northpoint Exteriors", owner: "Sam Reyes",
  phone: "(574) 555-0100", email: "sam@northpoint.co", web: "northpoint.co",
  trades: ["Roofing", "Storm Damage"], baseZip: "46545", radius: 30,
  logo: null, background: null,
};

/* ============================ APP ============================ */
export default function App() {
  const [role, setRole] = useState("homeowner");
  const [leads, setLeads] = useState(null);
  const [contractor, setContractor] = useState(defaultContractor);

  useEffect(() => {
    (async () => {
      let L = await store.get("ce:leads");
      if (L) { try { L = JSON.parse(L); } catch { L = null; } }
      if (!L) { L = seedLeads(); await store.set("ce:leads", JSON.stringify(L)); }
      setLeads(L);
      let K = await store.get("ce:contractor");
      if (K) { try { setContractor(JSON.parse(K)); } catch { } }
    })();
  }, []);

  const persistLeads = async (next) => { setLeads(next); await store.set("ce:leads", JSON.stringify(next)); };
  const persistContractor = async (c) => { setContractor(c); await store.set("ce:contractor", JSON.stringify(c)); };

  const open = leads ? leads.filter(l => l.status === "open").length : 0;
  const claimed = leads ? leads.filter(l => l.status === "claimed").length : 0;

  return (
    <div style={{ background: C.ink, color: C.textHi, fontFamily: "system-ui, -apple-system, sans-serif", minHeight: 640 }}>
      <style>{`
        * { box-sizing: border-box; }
        .ce-mono { font-family: ui-monospace, "SF Mono", Menlo, monospace; }
        .ce-ey { letter-spacing: .14em; text-transform: uppercase; font-size: 10px; font-weight: 700; }
        @keyframes ce-stamp { 0%{transform:scale(1.8) rotate(-18deg);opacity:0} 60%{opacity:1} 100%{transform:scale(1) rotate(-12deg);opacity:1} }
        @keyframes ce-rise { from{opacity:0;transform:translateY(10px)} to{opacity:1;transform:translateY(0)} }
        @keyframes ce-pulse { 0%,100%{opacity:1} 50%{opacity:.35} }
        .ce-rise { animation: ce-rise .35s ease both; }
        .ce-stamp { animation: ce-stamp .5s cubic-bezier(.2,1.4,.4,1) both; }
        .ce-blink { animation: ce-pulse 1.4s ease-in-out infinite; }
        .ce-btn { cursor:pointer; border:none; transition: filter .15s, transform .05s; }
        .ce-btn:hover { filter: brightness(1.08); }
        .ce-btn:active { transform: translateY(1px); }
        .ce-input { width:100%; outline:none; transition: border-color .15s, box-shadow .15s; }
        .ce-input:focus { box-shadow: 0 0 0 2px rgba(242,165,22,.35); }
        @media (prefers-reduced-motion: reduce){ .ce-rise,.ce-stamp,.ce-blink{ animation:none !important } }
      `}</style>

      <header style={{ background: C.panel, borderBottom: `1px solid ${C.line}`, position: "sticky", top: 0, zIndex: 30 }}>
        <div style={{ maxWidth: 1080, margin: "0 auto", padding: "12px 18px", display: "flex", alignItems: "center", gap: 16, flexWrap: "wrap" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <div style={{ width: 30, height: 30, background: C.amber, display: "grid", placeItems: "center", borderRadius: 4 }}>
              <Hammer size={18} color={C.ink} strokeWidth={2.6} />
            </div>
            <div style={{ lineHeight: 1 }}>
              <div style={{ fontWeight: 800, letterSpacing: ".06em", fontSize: 15 }}>CONTRACTORS EMPIRE</div>
              <div className="ce-ey" style={{ color: C.amber, marginTop: 3 }}>Live lead dispatch</div>
            </div>
          </div>

          <div style={{ flex: 1 }} />

          <RoleSwitch role={role} setRole={setRole} />

          <div style={{ display: "flex", gap: 8 }}>
            <Stat label="Open" n={open} color={C.amber} live />
            <Stat label="Claimed" n={claimed} color={C.green} />
          </div>
        </div>
      </header>

      <main style={{ maxWidth: 1080, margin: "0 auto", padding: "22px 18px 60px" }}>
        {!leads ? (
          <div style={{ color: C.textMid, padding: 40 }}>Loading dispatch…</div>
        ) : role === "homeowner" ? (
          <Homeowner onSubmit={async (lead) => { await persistLeads([lead, ...leads]); }} />
        ) : role === "contractor" ? (
          <Contractor
            leads={leads} contractor={contractor}
            onClaim={async (id) => {
              const lead = leads.find(l => l.id === id);
              await persistLeads(leads.map(l => l.id === id
                ? { ...l, status: "claimed", claimedBy: contractor.business, claimedAt: Date.now() } : l));
              // Simulate email notification
              console.log(`Email sent to ${lead.email}: Contractor ${contractor.business} claimed your job.`);
            }}
            onSaveProfile={persistContractor}
          />
        ) : (
          <Admin leads={leads} />
        )}
      </main>
    </div>
  );
}

/* ----------------------------- bits ----------------------------- */
function RoleSwitch({ role, setRole }) {
  const opts = [
    { id: "homeowner", label: "Homeowner", icon: Home },
    { id: "contractor", label: "Contractor", icon: Wrench },
    { id: "admin", label: "Admin", icon: Shield },
  ];
  return (
    <div style={{ display: "flex", background: C.ink, border: `1px solid ${C.line}`, borderRadius: 8, padding: 3 }}>
      {opts.map(o => {
        const on = role === o.id;
        return (
          <button key={o.id} className="ce-btn" onClick={() => setRole(o.id)}
            style={{ display: "flex", alignItems: "center", gap: 6, background: on ? C.amber : "transparent",
              color: on ? C.ink : C.textMid, fontWeight: 700, fontSize: 12.5, padding: "7px 12px", borderRadius: 6 }}>
            <o.icon size={14} strokeWidth={2.5} /> {o.label}
          </button>
        );
      })}
    </div>
  );
}

function Stat({ label, n, color, live }) {
  return (
    <div style={{ background: C.ink, border: `1px solid ${C.line}`, borderRadius: 8, padding: "5px 11px", textAlign: "center", minWidth: 58 }}>
      <div className="ce-mono" style={{ fontSize: 18, fontWeight: 700, color }}>{n}</div>
      <div className="ce-ey" style={{ color: C.textLo, display: "flex", gap: 4, justifyContent: "center", alignItems: "center" }}>
        {live && <span className="ce-blink" style={{ width: 5, height: 5, borderRadius: 9, background: color, display: "inline-block" }} />}
        {label}
      </div>
    </div>
  );
}

const fieldStyle = {
  background: "#fff", border: `1px solid ${C.paperLine}`, color: C.paperInk,
  borderRadius: 7, padding: "11px 12px", fontSize: 14.5,
};
const labelStyle = { display: "block", marginBottom: 6, color: C.paperInk, fontWeight: 600, fontSize: 13 };

/* ============== HOMEOWNER WIZARD ============== */
function Homeowner({ onSubmit }) {
  const [step, setStep] = useState(0);
  const [done, setDone] = useState(false);
  const [form, setForm] = useState({
    services: [], zip: "", city: "", address: "", title: "", desc: "",
    photos: [], urgency: "", name: "", phone: "", email: "",
  });
  const set = (k, v) => setForm(f => ({ ...f, [k]: v }));
  const fileRef = useRef();

  const steps = ["Services", "Location", "Job details", "Urgency", "Contact"];
  const valid = [
    form.services.length > 0,
    form.zip.length >= 5 && !!form.city,
    !!form.title && form.desc.length >= 8,
    !!form.urgency,
    !!form.name && form.phone.length >= 7 && /\S+@\S+/.test