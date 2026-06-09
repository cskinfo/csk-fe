import { useState, useRef, createContext, useContext } from "react";
import axios from "axios";
import { useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";

// ─────────────────────────────────────────────────────────────
// CSK ADMIN PANEL  —  Dark/Light mode toggle (default: dark)
// Login: username = admin | password = csk@2025
// localStorage keys: csk_jobs | csk_gallery
// ─────────────────────────────────────────────────────────────

const ADMIN_CREDENTIALS = { username: "admin", password: "csk@2025" };

const LS = {
    getJobs: () => { try { return JSON.parse(localStorage.getItem("csk_jobs") || "[]"); } catch { return []; } },
    setJobs: (d) => localStorage.setItem("csk_jobs", JSON.stringify(d)),
    getPhotos: () => { try { return JSON.parse(localStorage.getItem("csk_gallery") || "[]"); } catch { return []; } },
    setPhotos: (d) => localStorage.setItem("csk_gallery", JSON.stringify(d)),
};

const BADGE_OPTIONS = ["Fresher", "1 Yr Exp", "2 Yr Exp", "3 Yr Exp", "5+ Yr Exp", "Senior"];
const BADGE_COLORS = ["orange", "blue", "green", "purple"];
const DEPT_OPTIONS = ["Engineer", "HR Department", "Administration", "Sales", "Finance", "Marketing", "IT", "Operations"];
const GALLERY_CATS = ["COMPANY EVENT", "FESTIVAL CELEBRATION", "CERTIFICATION"];

// ── Theme tokens ───────────────────────────────────────────
const DARK = {
    pageBg: "#0f1117",
    sidebarBg: "#161b27",
    cardBg: "#ffffff08",
    cardBgSolid: "#161b27",
    inputBg: "#1e2330",
    border: "#2d3448",
    borderLight: "#1e2330",
    activeBg: "#1e2a45",
    activeBorder: "#2d4a8a",
    activeText: "#7ba7f7",
    activeBadgeBg: "#4f6ef7",
    activeBadgeTx: "#ffffff",
    inactiveTx: "#8892a4",
    badgeBg: "#2d3448",
    badgeTx: "#8892a4",
    textPrimary: "#ffffff",
    textSecondary: "#8892a4",
    textMuted: "#4a5568",
    inputText: "#e2e8f0",
    rowBorder: "1px solid #1e2330",
    exportBg: "#0d1929",
    exportBorder: "#1e3a5f",
    exportTitle: "#7ba7f7",
    exportSubtxt: "#4a6080",
    copyJobsBg: "#1e2a45",
    copyJobsTx: "#7ba7f7",
    copyJobsBdr: "#2d4a8a",
    copyPhotosBg: "#0d2e23",
    copyPhotosTx: "#10b981",
    copyPhotosBdr: "#0f4f3a",
    copiedBg: "#14532d",
    copiedTx: "#4ade80",
    copiedBdr: "#166534",
    editBg: "#1e2a45",
    editTx: "#7ba7f7",
    editBdr: "#2d4a8a",
    delBg: "#2a1a1a",
    delTx: "#f87171",
    delBdr: "#4a2020",
    emptyTx: "#6b7280",
    modalOverlay: "rgba(0,0,0,0.75)",
    modalBg: "#161b27",
    modalBorder: "#2d3448",
    closeBtnBg: "#2d3448",
    closeBtnTx: "#8892a4",
    uploadZoneBg: "#1a1f2e",
    uploadZoneBdr: "#2d4a8a",
    catTagBg: "#1e2330",
    catTagTx: "#8892a4",
    progressTrack: "#2d3448",
    spanTagBg: "#1e2330",
    spanTagTx: "#4a5568",
    logoutBdr: "#3d4a5a",
    logoutTx: "#8892a4",
    shadow: "0 24px 60px rgba(0,0,0,0.5)",
    loginBg: "#0f1117",
    loginCardBg: "#161b27",
    loginCardBdr: "#2d3448",
    loginSubtxt: "#8892a4",
    loginFooter: "#3a4458",
    badgeOrangeBg: "#431407",
    badgeOrangeTx: "#fb923c",
    badgeBlueBg: "#1e3a5f",
    badgeBlueTx: "#60a5fa",
    badgePurpleBg: "#2d1f5e",
    badgePurpleTx: "#a78bfa",
    catCompanyBg: "#1e3a5f",
    catCompanyTx: "#60a5fa",
    catFestBg: "#431407",
    catFestTx: "#fb923c",
    catCertBg: "#2d1f5e",
    catCertTx: "#a78bfa",
    toggleBg: "#1e2a45",
    toggleBdr: "#2d4a8a",
    toggleTx: "#7ba7f7",
    statIconBg: "22",
};

const LIGHT = {
    pageBg: "#f1f5f9",
    sidebarBg: "#ffffff",
    cardBg: "#ffffff08",
    cardBgSolid: "#ffffff",
    inputBg: "#f8fafc",
    border: "#e2e8f0",
    borderLight: "#f1f5f9",
    activeBg: "#eff6ff",
    activeBorder: "#bfdbfe",
    activeText: "#1d4ed8",
    activeBadgeBg: "#3b5bdb",
    activeBadgeTx: "#ffffff",
    inactiveTx: "#64748b",
    badgeBg: "#e2e8f0",
    badgeTx: "#64748b",
    textPrimary: "#1e293b",
    textSecondary: "#64748b",
    textMuted: "#94a3b8",
    inputText: "#1e293b",
    rowBorder: "1px solid #f1f5f9",
    exportBg: "#eff6ff",
    exportBorder: "#bfdbfe",
    exportTitle: "#2563eb",
    exportSubtxt: "#64748b",
    copyJobsBg: "#eff6ff",
    copyJobsTx: "#2563eb",
    copyJobsBdr: "#bfdbfe",
    copyPhotosBg: "#f0fdf4",
    copyPhotosTx: "#059669",
    copyPhotosBdr: "#bbf7d0",
    copiedBg: "#dcfce7",
    copiedTx: "#16a34a",
    copiedBdr: "#86efac",
    editBg: "#eff6ff",
    editTx: "#2563eb",
    editBdr: "#bfdbfe",
    delBg: "#fff1f2",
    delTx: "#dc2626",
    delBdr: "#fecaca",
    emptyTx: "#6b7280",
    modalOverlay: "rgba(0,0,0,0.45)",
    modalBg: "#ffffff",
    modalBorder: "#e2e8f0",
    closeBtnBg: "#f1f5f9",
    closeBtnTx: "#64748b",
    uploadZoneBg: "#f8fafc",
    uploadZoneBdr: "#bfdbfe",
    catTagBg: "#f1f5f9",
    catTagTx: "#64748b",
    progressTrack: "#e2e8f0",
    spanTagBg: "#f1f5f9",
    spanTagTx: "#64748b",
    logoutBdr: "#e2e8f0",
    logoutTx: "#64748b",
    shadow: "0 24px 60px rgba(0,0,0,0.08)",
    loginBg: "#f1f5f9",
    loginCardBg: "#ffffff",
    loginCardBdr: "#e2e8f0",
    loginSubtxt: "#64748b",
    loginFooter: "#94a3b8",
    badgeOrangeBg: "#fff7ed",
    badgeOrangeTx: "#ea580c",
    badgeBlueBg: "#eff6ff",
    badgeBlueTx: "#2563eb",
    badgePurpleBg: "#ede9fe",
    badgePurpleTx: "#7c3aed",
    catCompanyBg: "#eff6ff",
    catCompanyTx: "#2563eb",
    catFestBg: "#fff7ed",
    catFestTx: "#ea580c",
    catCertBg: "#ede9fe",
    catCertTx: "#7c3aed",
    toggleBg: "#f1f5f9",
    toggleBdr: "#e2e8f0",
    toggleTx: "#64748b",
    statIconBg: "15",
};

const ThemeCtx = createContext({ T: DARK, isDark: true, toggleTheme: () => { } });
const useT = () => useContext(ThemeCtx);

// ─────────────────────────────────────────────────────────────
// LOGIN SCREEN
// ─────────────────────────────────────────────────────────────
function LoginScreen({ onLogin }) {
    const { T, isDark, toggleTheme } = useT();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [showPw, setShowPw] = useState(false);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const inputStyle = {
        width: "100%", padding: "9px 12px", background: T.inputBg,
        border: `1px solid ${T.border}`, borderRadius: 8, color: T.inputText,
        fontSize: 14, fontFamily: "inherit", outline: "none",
    };

    const handleSubmit = () => {
        setLoading(true);
        setTimeout(() => {
            if (username === ADMIN_CREDENTIALS.username && password === ADMIN_CREDENTIALS.password) {
                onLogin();
            } else {
                setError("Invalid username or password.");
            }
            setLoading(false);
        }, 600);
    };

    return (
        <div style={{ minHeight: "100vh", background: T.loginBg, display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "'Segoe UI', system-ui, sans-serif", position: "relative" }}>
            {/* Theme toggle — top right */}
            <button onClick={toggleTheme} style={{ position: "absolute", top: 20, right: 20, background: T.toggleBg, border: `1px solid ${T.toggleBdr}`, color: T.toggleTx, borderRadius: 10, padding: "8px 14px", cursor: "pointer", fontFamily: "inherit", fontSize: 13, fontWeight: 600, display: "flex", alignItems: "center", gap: 7 }}>
                {isDark ? "☀️ Light Mode" : "🌙 Dark Mode"}
            </button>

            <div style={{ width: 400, background: T.loginCardBg, border: `1px solid ${T.loginCardBdr}`, borderRadius: 20, padding: "40px 36px", boxShadow: T.shadow }}>
                <div style={{ textAlign: "center", marginBottom: 32 }}>
                    <div style={{ width: 56, height: 56, borderRadius: 16, background: "linear-gradient(135deg,#4f6ef7,#7c3aed)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 26, margin: "0 auto 16px" }}>🛡️</div>
                    <h1 style={{ fontSize: 22, fontWeight: 800, color: T.textPrimary, marginBottom: 6 }}>CSK Admin Panel</h1>
                    <p style={{ fontSize: 13, color: T.loginSubtxt }}>Sign in to manage jobs & gallery</p>
                </div>

                <div style={{ marginBottom: 16 }}>
                    <label style={{ display: "block", fontSize: 11, fontWeight: 700, letterSpacing: "0.06em", textTransform: "uppercase", color: T.textSecondary, marginBottom: 5 }}>Username</label>
                    <input type="text" placeholder="admin" value={username} onChange={e => setUsername(e.target.value)} onKeyDown={e => e.key === "Enter" && handleSubmit()} style={inputStyle} />
                </div>

                <div style={{ marginBottom: 8 }}>
                    <label style={{ display: "block", fontSize: 11, fontWeight: 700, letterSpacing: "0.06em", textTransform: "uppercase", color: T.textSecondary, marginBottom: 5 }}>Password</label>
                    <div style={{ position: "relative" }}>
                        <input type={showPw ? "text" : "password"} placeholder="••••••••" value={password} onChange={e => setPassword(e.target.value)} onKeyDown={e => e.key === "Enter" && handleSubmit()} style={{ ...inputStyle, paddingRight: 42 }} />
                        <button onClick={() => setShowPw(!showPw)} style={{ position: "absolute", right: 10, top: "50%", transform: "translateY(-50%)", background: "none", border: "none", color: T.textSecondary, cursor: "pointer", fontSize: 16, padding: 4 }}>{showPw ? "🙈" : "👁️"}</button>
                    </div>
                </div>

                {error && <p style={{ fontSize: 12, color: "#ef4444", marginBottom: 8, marginTop: 4 }}>⚠ {error}</p>}

                <button onClick={handleSubmit} style={{ width: "100%", marginTop: 16, padding: "12px", fontSize: 14, fontWeight: 700, fontFamily: "inherit", cursor: loading ? "not-allowed" : "pointer", border: "none", borderRadius: 10, background: loading ? T.border : "linear-gradient(135deg,#4f6ef7,#7c3aed)", color: loading ? T.textSecondary : "#fff" }}>
                    {loading ? "Signing in..." : "Sign In →"}
                </button>
                <p style={{ fontSize: 11, color: T.loginFooter, textAlign: "center", marginTop: 20 }}>Protected area — authorized personnel only</p>
            </div>
        </div>
    );
}

// ─────────────────────────────────────────────────────────────
// SIDEBAR
// ─────────────────────────────────────────────────────────────
function Sidebar({ activeTab, setTab, onLogout, jobCount, photoCount, applicationCount }) {
    const { T, isDark, toggleTheme } = useT();
    const navItems = [
        { id: "dashboard", icon: "📊", label: "Dashboard" },

        { id: "jobs", icon: "💼", label: "Job Posts", count: jobCount },

        { id: "gallery", icon: "🖼️", label: "Gallery", count: photoCount },

        {
            id: "applications",
            icon: "📄",
            label: "Applications",
            count: applicationCount,
        },
    ];

    return (
        <div style={{ width: 230, background: T.sidebarBg, borderRight: `1px solid ${T.border}`, display: "flex", flexDirection: "column", minHeight: "100vh", flexShrink: 0, fontFamily: "'Segoe UI', system-ui, sans-serif" }}>
            {/* Brand */}
            <div style={{ padding: "24px 20px 18px", borderBottom: `1px solid ${T.border}` }}>
                <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                    <div style={{ width: 38, height: 38, borderRadius: 10, background: "linear-gradient(135deg,#4f6ef7,#7c3aed)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18, flexShrink: 0 }}>🛡️</div>
                    <div>
                        <div style={{ fontWeight: 800, fontSize: 14, color: T.textPrimary }}>CSK Admin</div>
                        <div style={{ fontSize: 11, color: "#4f6ef7", fontWeight: 600 }}>Management Panel</div>
                    </div>
                </div>
            </div>

            {/* Nav */}
            <nav style={{ flex: 1, padding: "14px 10px" }}>
                {navItems.map(item => {
                    const active = activeTab === item.id;
                    return (
                        <button key={item.id} onClick={() => setTab(item.id)} style={{ width: "100%", display: "flex", alignItems: "center", gap: 10, padding: "10px 12px", borderRadius: 10, background: active ? T.activeBg : "transparent", border: `1px solid ${active ? T.activeBorder : "transparent"}`, color: active ? T.activeText : T.inactiveTx, marginBottom: 4, cursor: "pointer", textAlign: "left", fontSize: 13, fontWeight: active ? 700 : 400, fontFamily: "inherit", transition: "all 0.15s" }}>
                            <span style={{ fontSize: 17 }}>{item.icon}</span>
                            <span style={{ flex: 1 }}>{item.label}</span>
                            {item.count != null && (
                                <span style={{ background: active ? T.activeBadgeBg : T.badgeBg, color: active ? T.activeBadgeTx : T.badgeTx, fontSize: 10, fontWeight: 700, borderRadius: 20, padding: "1px 8px", minWidth: 22, textAlign: "center" }}>{item.count}</span>
                            )}
                        </button>
                    );
                })}
            </nav>

            {/* ── Theme Toggle Button ── */}
            <div style={{ padding: "0 10px 8px" }}>
                <button onClick={toggleTheme} style={{ width: "100%", padding: "9px 12px", background: T.toggleBg, border: `1px solid ${T.toggleBdr}`, color: T.toggleTx, borderRadius: 8, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: 8, fontSize: 13, fontFamily: "inherit", fontWeight: 600, transition: "all 0.2s" }}>
                    {isDark ? "☀️ Light Mode" : "🌙 Dark Mode"}
                </button>
            </div>

            {/* Logout */}
            <div style={{ padding: "0 10px 14px", borderTop: `1px solid ${T.border}`, paddingTop: 10 }}>
                <button onClick={onLogout} style={{ width: "100%", padding: "9px 12px", background: "transparent", border: `1px solid ${T.logoutBdr}`, color: T.logoutTx, borderRadius: 8, cursor: "pointer", display: "flex", alignItems: "center", gap: 8, fontSize: 13, fontFamily: "inherit", fontWeight: 500 }}>
                    🚪 Sign Out
                </button>
            </div>
        </div>
    );
}

// ─────────────────────────────────────────────────────────────
// STAT CARD
// ─────────────────────────────────────────────────────────────
function StatCard({ icon, label, value, accent }) {
    const { T } = useT();
    return (
        <div style={{ background: T.cardBgSolid, border: `1px solid ${T.border}`, borderRadius: 14, padding: "20px 22px", display: "flex", alignItems: "center", gap: 16 }}>
            <div style={{ width: 50, height: 50, borderRadius: 13, background: accent + T.statIconBg, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 22, flexShrink: 0 }}>{icon}</div>
            <div>
                <div style={{ fontSize: 28, fontWeight: 800, color: T.textPrimary, lineHeight: 1 }}>{value}</div>
                <div style={{ fontSize: 12, color: T.textSecondary, marginTop: 5 }}>{label}</div>
            </div>
        </div>
    );
}

// ─────────────────────────────────────────────────────────────
// DASHBOARD
// ─────────────────────────────────────────────────────────────
function Dashboard({ jobs, photos, setTab }) {
    const { T } = useT();
    const freshers = jobs.filter(j => j.badge === "Fresher").length;
    const events = photos.filter(p => p.category === "COMPANY EVENT").length;

    return (
        <div style={{ padding: 36 }}>
            <div style={{ marginBottom: 32 }}>
                <h2 style={{ fontSize: 24, fontWeight: 800, color: T.textPrimary, marginBottom: 6 }}>Welcome back 👋</h2>
                <p style={{ fontSize: 14, color: T.textSecondary }}>Here's an overview of your CSK career portal content.</p>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(190px,1fr))", gap: 16, marginBottom: 32 }}>
                <StatCard icon="💼" label="Total Job Posts" value={jobs.length} accent="#4f6ef7" />
                <StatCard icon="🎓" label="Fresher Roles" value={freshers} accent="#7c3aed" />
                <StatCard icon="🖼️" label="Gallery Photos" value={photos.length} accent="#10b981" />
                <StatCard icon="🏢" label="Company Events" value={events} accent="#f59e0b" />
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
                {/* Recent Jobs */}
                <div style={{ background: T.cardBgSolid, border: `1px solid ${T.border}`, borderRadius: 12, padding: 20 }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
                        <h3 style={{ fontSize: 14, fontWeight: 700, color: T.textPrimary }}>Recent Job Posts</h3>
                        <button onClick={() => setTab("jobs")} style={{ fontSize: 11, color: "#4f6ef7", background: T.activeBg, border: "none", borderRadius: 6, padding: "4px 12px", cursor: "pointer", fontFamily: "inherit", fontWeight: 600 }}>View All</button>
                    </div>
                    {jobs.length === 0
                        ? <p style={{ fontSize: 13, color: T.textMuted, textAlign: "center", padding: "20px 0" }}>No jobs posted yet</p>
                        : [...jobs].reverse().slice(0, 5).map(job => (
                            <div key={job.id} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "8px 0", borderBottom: T.rowBorder, fontSize: 13 }}>
                                <span style={{ color: T.textPrimary, fontWeight: 500 }}>{job.title}</span>
                                <span style={{ fontSize: 10, fontWeight: 700, borderRadius: 20, padding: "2px 9px", background: job.badgeColor === "orange" ? T.badgeOrangeBg : job.badgeColor === "blue" ? T.badgeBlueBg : T.badgePurpleBg, color: job.badgeColor === "orange" ? T.badgeOrangeTx : job.badgeColor === "blue" ? T.badgeBlueTx : T.badgePurpleTx }}>{job.badge}</span>
                            </div>
                        ))
                    }
                </div>

                {/* Gallery breakdown */}
                <div style={{ background: T.cardBgSolid, border: `1px solid ${T.border}`, borderRadius: 12, padding: 20 }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
                        <h3 style={{ fontSize: 14, fontWeight: 700, color: T.textPrimary }}>Gallery Breakdown</h3>
                        <button onClick={() => setTab("gallery")} style={{ fontSize: 11, color: "#059669", background: T.copyPhotosBg, border: "none", borderRadius: 6, padding: "4px 12px", cursor: "pointer", fontFamily: "inherit", fontWeight: 600 }}>View All</button>
                    </div>
                    {GALLERY_CATS.map(cat => {
                        const count = photos.filter(p => p.category === cat).length;
                        const pct = photos.length ? Math.round((count / photos.length) * 100) : 0;
                        return (
                            <div key={cat} style={{ marginBottom: 14 }}>
                                <div style={{ display: "flex", justifyContent: "space-between", fontSize: 12, marginBottom: 5 }}>
                                    <span style={{ color: T.textSecondary }}>{cat}</span>
                                    <span style={{ color: T.textPrimary, fontWeight: 700 }}>{count}</span>
                                </div>
                                <div style={{ height: 5, background: T.progressTrack, borderRadius: 999, overflow: "hidden" }}>
                                    <div style={{ height: "100%", width: `${pct}%`, borderRadius: 999, background: cat === "COMPANY EVENT" ? "#4f6ef7" : cat === "FESTIVAL CELEBRATION" ? "#f59e0b" : "#7c3aed", transition: "width 0.5s ease" }} />
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>

        </div>
    );
}

// ─────────────────────────────────────────────────────────────
// JOB FORM MODAL
// ─────────────────────────────────────────────────────────────
function JobFormModal({ initial, onSave, onClose }) {
    const { T } = useT();
    const blank = { title: "", badge: "Fresher", badgeColor: "orange", experience: "1 Yr", location: "Greater Noida", department: "Engineer", category: "IT", skills: "", ctaLabel: "View & Apply" };
    const [form, setForm] = useState(initial || blank);
    const set = (k, v) => setForm(f => ({ ...f, [k]: v }));
    const isValid = form.title.trim() && form.skills.trim();

    const inputStyle = { width: "100%", padding: "9px 12px", background: T.inputBg, border: `1px solid ${T.border}`, borderRadius: 8, color: T.inputText, fontSize: 14, fontFamily: "inherit", outline: "none" };
    const labelStyle = { display: "block", fontSize: 11, fontWeight: 700, letterSpacing: "0.06em", textTransform: "uppercase", color: T.textSecondary, marginBottom: 5 };

    return (
        <div style={{ position: "fixed", inset: 0, background: T.modalOverlay, display: "flex", alignItems: "center", justifyContent: "center", zIndex: 1000 }}>
            <div style={{ background: T.modalBg, border: `1px solid ${T.modalBorder}`, borderRadius: 18, padding: 32, width: 580, maxHeight: "92vh", overflowY: "auto", fontFamily: "'Segoe UI', system-ui, sans-serif" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 24 }}>
                    <h3 style={{ fontSize: 18, fontWeight: 800, color: T.textPrimary }}>{initial ? "✏️ Edit Job Post" : "➕ New Job Post"}</h3>
                    <button onClick={onClose} style={{ background: T.closeBtnBg, border: "none", color: T.closeBtnTx, width: 32, height: 32, borderRadius: 8, fontSize: 18, cursor: "pointer" }}>×</button>
                </div>

                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
                    <div style={{ gridColumn: "span 2" }}>
                        <label style={labelStyle}>Job Title *</label>
                        <input style={inputStyle} value={form.title} onChange={e => set("title", e.target.value)} placeholder="e.g. Desktop Support Engineer" />
                    </div>
                    <div>
                        <label style={labelStyle}>Experience Badge</label>
                        <select style={inputStyle} value={form.badge} onChange={e => set("badge", e.target.value)}>{BADGE_OPTIONS.map(b => <option key={b} value={b}>{b}</option>)}</select>
                    </div>
                    <div>
                        <label style={labelStyle}>Badge Color</label>
                        <select style={inputStyle} value={form.badgeColor} onChange={e => set("badgeColor", e.target.value)}>{BADGE_COLORS.map(c => <option key={c} value={c}>{c}</option>)}</select>
                    </div>
                    <div>
                        <label style={labelStyle}>Experience Required</label>
                        <input style={inputStyle} value={form.experience} onChange={e => set("experience", e.target.value)} placeholder="1 Yr" />
                    </div>
                    <div>
                        <label style={labelStyle}>Location</label>
                        <input style={inputStyle} value={form.location} onChange={e => set("location", e.target.value)} placeholder="Greater Noida" />
                    </div>
                    <div>
                        <label style={labelStyle}>Department</label>
                        <select style={inputStyle} value={form.department} onChange={e => set("department", e.target.value)}>{DEPT_OPTIONS.map(d => <option key={d} value={d}>{d}</option>)}</select>
                    </div>
                    <div>
                        <label style={labelStyle}>Category</label>
                        <input style={inputStyle} value={form.category} onChange={e => set("category", e.target.value)} placeholder="IT, Sales" />
                    </div>
                    <div>
                        <label style={labelStyle}>CTA Button Label</label>
                        <select style={inputStyle} value={form.ctaLabel} onChange={e => set("ctaLabel", e.target.value)}>{["Apply", "View & Apply", "Apply Now", "Learn More"].map(c => <option key={c} value={c}>{c}</option>)}</select>
                    </div>
                    <div style={{ gridColumn: "span 2" }}>
                        <label style={labelStyle}>Skills Description *</label>
                        <textarea style={{ ...inputStyle, minHeight: 100, resize: "vertical" }} value={form.skills} onChange={e => set("skills", e.target.value)} placeholder="Describe required skills, qualifications and responsibilities..." />
                    </div>
                </div>

                <div style={{ display: "flex", gap: 10, marginTop: 24, justifyContent: "flex-end" }}>
                    <button onClick={onClose} style={{ padding: "9px 20px", background: T.closeBtnBg, color: T.textSecondary, border: "none", borderRadius: 8, cursor: "pointer", fontFamily: "inherit", fontWeight: 700 }}>Cancel</button>
                    <button onClick={() => isValid && onSave(form)} style={{ padding: "9px 22px", background: isValid ? "linear-gradient(135deg,#4f6ef7,#7c3aed)" : T.border, color: isValid ? "#fff" : T.textMuted, border: "none", borderRadius: 8, cursor: isValid ? "pointer" : "not-allowed", fontFamily: "inherit", fontWeight: 700 }}>{initial ? "Save Changes" : "Post Job"}</button>
                </div>
            </div>
        </div>
    );
}

// ─────────────────────────────────────────────────────────────
// JOBS MANAGER
// ─────────────────────────────────────────────────────────────
function JobsManager({ jobs, setJobs }) {
    const { T } = useT();
    const [showForm, setShowForm] = useState(false);
    const [editItem, setEditItem] = useState(null);
    const [deleteId, setDeleteId] = useState(null);

    const addJob = async (form) => {
        try {
            const res = await axios.post(
                "http://localhost:5000/api/jobs",
                form
            );

            setJobs((prev) => [res.data, ...prev]);

            setShowForm(false);
        } catch (err) {
            console.log(err);
        }
    };
    const saveEdit = async (form) => {
        try {
            const res = await axios.put(
                `http://localhost:5000/api/jobs/${editItem.id}`,
                form
            );

            setJobs(
                jobs.map((job) =>
                    job.id === editItem.id
                        ? res.data
                        : job
                )
            );

            setEditItem(null);
        } catch (err) {
            console.log(err);
        }
    };
    const confirmDelete = async () => {
        try {
            await axios.delete(
                `http://localhost:5000/api/jobs/${deleteId}`
            );

            setJobs(
                jobs.filter(
                    (job) => job.id !== deleteId
                )
            );

            setDeleteId(null);
        } catch (err) {
            console.log(err);
        }
    };
    const badgeStyle = c => ({ background: c === "orange" ? T.badgeOrangeBg : c === "blue" ? T.badgeBlueBg : T.badgePurpleBg, color: c === "orange" ? T.badgeOrangeTx : c === "blue" ? T.badgeBlueTx : T.badgePurpleTx, fontSize: 10, fontWeight: 700, borderRadius: 20, padding: "2px 9px" });

    return (
        <div style={{ padding: 36, fontFamily: "'Segoe UI', system-ui, sans-serif" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 28 }}>
                <div>
                    <h2 style={{ fontSize: 22, fontWeight: 800, color: T.textPrimary, marginBottom: 4 }}>Job Posts</h2>
                    <p style={{ fontSize: 13, color: T.textSecondary }}>{jobs.length} active position{jobs.length !== 1 ? "s" : ""} on career page</p>
                </div>
                <button onClick={() => setShowForm(true)} style={{ padding: "10px 20px", background: "linear-gradient(135deg,#4f6ef7,#7c3aed)", color: "#fff", border: "none", borderRadius: 10, cursor: "pointer", fontWeight: 700, fontSize: 13, fontFamily: "inherit" }}>+ Add Job Post</button>
            </div>

            {jobs.length === 0
                ? <div style={{ textAlign: "center", padding: "80px 0" }}><div style={{ fontSize: 48, marginBottom: 14 }}>💼</div><p style={{ fontSize: 16, fontWeight: 600, color: T.emptyTx }}>No jobs posted yet</p><p style={{ fontSize: 13, marginTop: 6, color: T.textMuted }}>Click "Add Job Post" to create your first listing</p></div>
                : <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
                    {jobs.map(job => (
                        <div key={job.id} style={{ background: T.cardBgSolid, border: `1px solid ${T.border}`, borderRadius: 12, padding: 20, display: "flex", alignItems: "flex-start", gap: 18 }}>
                            <div style={{ flex: 1, minWidth: 0 }}>
                                <div style={{ display: "flex", alignItems: "center", gap: 8, flexWrap: "wrap", marginBottom: 8 }}>
                                    <span style={{ fontSize: 15, fontWeight: 700, color: T.textPrimary }}>{job.title}</span>
                                    <span style={badgeStyle(job.badgeColor)}>{job.badge}</span>
                                    <span style={{ fontSize: 11, color: T.textMuted, marginLeft: "auto" }}>{job.postedAgo}</span>
                                </div>
                                <div style={{ display: "flex", gap: 14, flexWrap: "wrap", marginBottom: 8 }}>
                                    {[["📅", job.experience], ["📍", job.location], ["🏢", job.department], ["🏷️", job.category]].map(([ic, val], i) => (
                                        <span key={i} style={{ fontSize: 12, color: T.textSecondary, display: "flex", alignItems: "center", gap: 4 }}>{ic} {val}</span>
                                    ))}
                                </div>
                                <p style={{ fontSize: 12, color: T.textSecondary, lineHeight: 1.6, overflow: "hidden", display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical" }}>{job.skills}</p>
                            </div>
                            <div style={{ display: "flex", gap: 8, flexShrink: 0 }}>
                                <button onClick={() => setEditItem(job)} style={{ padding: "7px 14px", background: T.editBg, color: T.editTx, border: `1px solid ${T.editBdr}`, borderRadius: 8, cursor: "pointer", fontSize: 12, fontWeight: 700, fontFamily: "inherit" }}>Edit</button>
                                <button onClick={() => setDeleteId(job.id)} style={{ padding: "7px 14px", background: T.delBg, color: T.delTx, border: `1px solid ${T.delBdr}`, borderRadius: 8, cursor: "pointer", fontSize: 12, fontWeight: 700, fontFamily: "inherit" }}>Delete</button>
                            </div>
                        </div>
                    ))}
                </div>
            }

            <ExportPanel jobs={jobs} photos={[]} />
            {showForm && <JobFormModal onSave={addJob} onClose={() => setShowForm(false)} />}
            {editItem && <JobFormModal initial={editItem} onSave={saveEdit} onClose={() => setEditItem(null)} />}
            {deleteId && <ConfirmModal title="Delete Job Post?" message="This will permanently remove it from the career page." onConfirm={confirmDelete} onCancel={() => setDeleteId(null)} />}
        </div>
    );
}

// ─────────────────────────────────────────────────────────────
// PHOTO FORM MODAL
// ─────────────────────────────────────────────────────────────
function PhotoFormModal({ initial, onSave, onClose }) {
    const { T } = useT();
    const blank = { title: "", category: "COMPANY EVENT", span: "normal", image: "" };
    const [form, setForm] = useState(initial || blank);
    const [selectedFile, setSelectedFile] = useState(null);
    const [preview, setPreview] = useState(initial?.image || "");
    const fileRef = useRef();
    const set = (k, v) => setForm(f => ({ ...f, [k]: v }));
    const isValid =
        form.title.trim() &&
        (selectedFile || preview);

    const inputStyle = { width: "100%", padding: "9px 12px", background: T.inputBg, border: `1px solid ${T.border}`, borderRadius: 8, color: T.inputText, fontSize: 14, fontFamily: "inherit", outline: "none" };
    const labelStyle = { display: "block", fontSize: 11, fontWeight: 700, letterSpacing: "0.06em", textTransform: "uppercase", color: T.textSecondary, marginBottom: 5 };

    const handleFile = (e) => {
        const file = e.target.files[0];

        if (!file) return;

        setSelectedFile(file);

        setPreview(URL.createObjectURL(file));
    };

    return (
        <div style={{ position: "fixed", inset: 0, background: T.modalOverlay, display: "flex", alignItems: "center", justifyContent: "center", zIndex: 1000 }}>
            <div style={{ background: T.modalBg, border: `1px solid ${T.modalBorder}`, borderRadius: 18, padding: 32, width: 520, maxHeight: "92vh", overflowY: "auto", fontFamily: "'Segoe UI', system-ui, sans-serif" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 24 }}>
                    <h3 style={{ fontSize: 18, fontWeight: 800, color: T.textPrimary }}>{initial ? "✏️ Edit Photo" : "📷 Upload Gallery Photo"}</h3>
                    <button onClick={onClose} style={{ background: T.closeBtnBg, border: "none", color: T.closeBtnTx, width: 32, height: 32, borderRadius: 8, fontSize: 18, cursor: "pointer" }}>×</button>
                </div>

                <div style={{ marginBottom: 18 }}>
                    <label style={labelStyle}>Photo *</label>
                    <div onClick={() => fileRef.current.click()} style={{ border: `2px dashed ${T.uploadZoneBdr}`, borderRadius: 12, padding: 24, textAlign: "center", cursor: "pointer", background: T.uploadZoneBg, transition: "border-color 0.2s" }}
                        onMouseEnter={e => e.currentTarget.style.borderColor = "#4f6ef7"}
                        onMouseLeave={e => e.currentTarget.style.borderColor = T.uploadZoneBdr}>
                        {preview
                            ? <img src={preview} alt="preview" style={{ maxHeight: 160, maxWidth: "100%", borderRadius: 10, objectFit: "cover" }} />
                            : <div><div style={{ fontSize: 36, marginBottom: 10 }}>📷</div><p style={{ fontSize: 14, color: "#4f6ef7", fontWeight: 700 }}>Click to upload photo</p><p style={{ fontSize: 11, color: T.textMuted, marginTop: 5 }}>JPG, PNG, WEBP — Stored securely in database</p></div>
                        }
                    </div>
                    <input ref={fileRef} type="file" accept="image/*" onChange={handleFile} style={{ display: "none" }} />
                </div>

                <div style={{ marginBottom: 16 }}>
                    <label style={labelStyle}>Photo Title *</label>
                    <input style={inputStyle} value={form.title} onChange={e => set("title", e.target.value)} placeholder="e.g. Diwali Celebration 2025" />
                </div>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
                    <div>
                        <label style={labelStyle}>Category</label>
                        <select style={inputStyle} value={form.category} onChange={e => set("category", e.target.value)}>{GALLERY_CATS.map(c => <option key={c} value={c}>{c}</option>)}</select>
                    </div>
                    <div>
                        <label style={labelStyle}>Card Size</label>
                        <select style={inputStyle} value={form.span} onChange={e => set("span", e.target.value)}>
                            <option value="normal">Normal (1 column)</option>
                            <option value="wide">Wide (2 columns)</option>
                        </select>
                    </div>
                </div>

                <div style={{ display: "flex", gap: 10, marginTop: 24, justifyContent: "flex-end" }}>
                    <button onClick={onClose} style={{ padding: "9px 20px", background: T.closeBtnBg, color: T.textSecondary, border: "none", borderRadius: 8, cursor: "pointer", fontFamily: "inherit", fontWeight: 700 }}>Cancel</button>
                    <button
                        onClick={() =>
                            isValid &&
                            onSave(form, selectedFile)
                        }
                        style={{
                            padding: "9px 22px",
                            background: isValid
                                ? "linear-gradient(135deg,#10b981,#059669)"
                                : T.border,
                            color: isValid ? "#fff" : T.textMuted,
                            border: "none",
                            borderRadius: 8,
                            cursor: isValid ? "pointer" : "not-allowed",
                            fontFamily: "inherit",
                            fontWeight: 700
                        }}
                    >
                        {initial ? "Save Changes" : "Upload Photo"}
                    </button>        </div>
            </div>
        </div>
    );
}

// ─────────────────────────────────────────────────────────────
// GALLERY MANAGER
// ─────────────────────────────────────────────────────────────
function GalleryManager({ photos, setPhotos }) {
    const { T } = useT();
    const [showForm, setShowForm] = useState(false);
    const [editItem, setEditItem] = useState(null);
    const [deleteId, setDeleteId] = useState(null);

    const addPhoto = async (form, file) => {
        try {
            const fd = new FormData();

            fd.append("image", file);
            fd.append("title", form.title);
            fd.append("category", form.category);
            fd.append("span", form.span);

            const res = await axios.post(
                "http://localhost:5000/api/gallery",
                fd,
                {
                    headers: {
                        "Content-Type":
                            "multipart/form-data",
                    },
                }
            );

            setPhotos((prev) => [
                res.data,
                ...prev,
            ]);

            setShowForm(false);
        } catch (err) {
            console.log(err);
        }
    };
    const saveEdit = async (form) => {
        try {
            const res = await axios.put(
                `http://localhost:5000/api/gallery/${editItem.id}`,
                form
            );

            setPhotos(
                photos.map((p) =>
                    p.id === editItem.id
                        ? res.data
                        : p
                )
            );

            setEditItem(null);
        } catch (err) {
            console.log(err);
        }
    };
    const confirmDelete = async () => {
        try {
            await axios.delete(
                `http://localhost:5000/api/gallery/${deleteId}`
            );

            setPhotos(
                photos.filter(
                    (p) => p.id !== deleteId
                )
            );

            setDeleteId(null);
        } catch (err) {
            console.log(err);
        }
    };

    const catBg = { "COMPANY EVENT": T.catCompanyBg, "FESTIVAL CELEBRATION": T.catFestBg, CERTIFICATION: T.catCertBg };
    const catTx = { "COMPANY EVENT": T.catCompanyTx, "FESTIVAL CELEBRATION": T.catFestTx, CERTIFICATION: T.catCertTx };

    return (
        <div style={{ padding: 36, fontFamily: "'Segoe UI', system-ui, sans-serif" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 28 }}>
                <div>
                    <h2 style={{ fontSize: 22, fontWeight: 800, color: T.textPrimary, marginBottom: 4 }}>Gallery</h2>
                    <p style={{ fontSize: 13, color: T.textSecondary }}>{photos.length} photo{photos.length !== 1 ? "s" : ""} — appear on career page gallery</p>
                </div>
                <button onClick={() => setShowForm(true)} style={{ padding: "10px 20px", background: "linear-gradient(135deg,#10b981,#059669)", color: "#fff", border: "none", borderRadius: 10, cursor: "pointer", fontWeight: 700, fontSize: 13, fontFamily: "inherit" }}>+ Upload Photo</button>
            </div>

            {photos.length === 0
                ? <div style={{ textAlign: "center", padding: "80px 0" }}><div style={{ fontSize: 48, marginBottom: 14 }}>🖼️</div><p style={{ fontSize: 16, fontWeight: 600, color: T.emptyTx }}>Gallery is empty</p><p style={{ fontSize: 13, marginTop: 6, color: T.textMuted }}>Upload photos to display on the career page</p></div>
                : <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(230px,1fr))", gap: 16 }}>
                    {photos.map(photo => (
                        <div key={photo.id} style={{ background: T.cardBgSolid, border: `1px solid ${T.border}`, borderRadius: 14, overflow: "hidden" }}>
                            <div style={{ height: 140, overflow: "hidden", background: T.inputBg, position: "relative" }}>
                                {photo.image
                                    ? <img src={photo.image} alt={photo.title} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                                    : <div style={{ width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 36 }}>🖼️</div>
                                }
                                <span style={{ position: "absolute", top: 8, right: 8, fontSize: 9, fontWeight: 700, background: catBg[photo.category] || T.catTagBg, color: catTx[photo.category] || T.catTagTx, borderRadius: 20, padding: "3px 9px", letterSpacing: "0.05em" }}>{photo.category}</span>
                            </div>
                            <div style={{ padding: "12px 14px" }}>
                                <div style={{ fontWeight: 700, fontSize: 13, color: T.textPrimary, marginBottom: 10, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{photo.title}</div>
                                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                                    <span style={{ fontSize: 10, color: T.spanTagTx, background: T.spanTagBg, borderRadius: 6, padding: "2px 8px", fontWeight: 600 }}>{photo.span === "wide" ? "Wide (2-col)" : "Normal (1-col)"}</span>
                                    <div style={{ display: "flex", gap: 6 }}>
                                        <button onClick={() => setEditItem(photo)} style={{ padding: "4px 11px", background: T.editBg, color: T.editTx, border: `1px solid ${T.editBdr}`, borderRadius: 6, cursor: "pointer", fontSize: 11, fontWeight: 700, fontFamily: "inherit" }}>Edit</button>
                                        <button onClick={() => setDeleteId(photo.id)} style={{ padding: "4px 11px", background: T.delBg, color: T.delTx, border: `1px solid ${T.delBdr}`, borderRadius: 6, cursor: "pointer", fontSize: 11, fontWeight: 700, fontFamily: "inherit" }}>Del</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            }

            <ExportPanel jobs={[]} photos={photos} />
            {showForm && <PhotoFormModal onSave={addPhoto} onClose={() => setShowForm(false)} />}
            {editItem && <PhotoFormModal initial={editItem} onSave={saveEdit} onClose={() => setEditItem(null)} />}
            {deleteId && <ConfirmModal title="Delete Photo?" message="This will permanently remove it from the gallery." onConfirm={confirmDelete} onCancel={() => setDeleteId(null)} />}
        </div>
    );
}

function ApplicationsManager({
    applications,
    deleteApplication,
}) {
    const { T } = useT();

    return (
        <div style={{ padding: 36 }}>
            <h2
                style={{
                    color: T.textPrimary,
                    fontSize: 24,
                    marginBottom: 20,
                }}
            >
                Applications
            </h2>

            {applications.length === 0 ? (
                <p
                    style={{
                        color: T.textSecondary,
                    }}
                >
                    No applications yet
                </p>
            ) : (
                applications.map((app) => (
                    <div
                        key={app.id}
                        style={{
                            position: "relative",
                            background: T.cardBgSolid,
                            border: `1px solid ${T.border}`,
                            borderRadius: 12,
                            padding: 20,
                            marginBottom: 15,
                        }}
                    >
                        {/* DELETE BUTTON */}
                        <button
                            onClick={() => {
                                if (
                                    window.confirm(
                                        "Delete this application?"
                                    )
                                ) {
                                    deleteApplication(app.id);
                                }
                            }}
                            style={{
                                position: "absolute",
                                top: 12,
                                right: 12,
                                width: 45,
                                height: 45,
                                border: "none",
                                borderRadius: "50%",
                                background: "",
                                color: "#808080",
                                cursor: "pointer",
                                fontSize: 17,
                                fontWeight: "bold",
                                transition: "all 0.2s ease",
                            }}
                           onMouseEnter={(e) => {
  e.currentTarget.style.transform = "scale(1.25)";
}}
onMouseLeave={(e) => {
  e.currentTarget.style.transform = "scale(1)";
}}
                        >
                            <FontAwesomeIcon icon={faTrash} />
                        </button>

                        <h3
                            style={{
                                color: T.textPrimary,
                                marginBottom: 10,
                            }}
                        >
                            {app.jobTitle}
                        </h3>

                        <p style={{ color: T.textSecondary }}>
                            <b>Name:</b> {app.name}
                        </p>

                        <p style={{ color: T.textSecondary }}>
                            <b>Email:</b> {app.email}
                        </p>

                        <p style={{ color: T.textSecondary }}>
                            <b>Phone:</b> {app.phone}
                        </p>

                        <p style={{ color: T.textSecondary }}>
                            <b>Experience:</b> {app.experience}
                        </p>

                        <a
                            href={app.resume}
                            target="_blank"
                            rel="noreferrer"
                            style={{
                                display: "inline-flex",
                                alignItems: "center",
                                justifyContent: "center",
                                marginTop: 12,
                                padding: "8px 14px",
                                background: "#2563eb",
                                color: "#fff",
                                borderRadius: 8,
                                textDecoration: "none",
                                fontSize: "13px",
                                fontWeight: "600",
                                transition: "all 0.25s ease",
                                boxShadow:
                                    "0 2px 8px rgba(37,99,235,0.3)",
                            }}
                            onMouseEnter={(e) => {
                                e.target.style.background =
                                    "#1d4ed8";
                                e.target.style.transform =
                                    "translateY(-2px)";
                            }}
                            onMouseLeave={(e) => {
                                e.target.style.background =
                                    "#2563eb";
                                e.target.style.transform =
                                    "translateY(0)";
                            }}
                        >
                            📄 View Resume
                        </a>
                    </div>
                ))
            )}
        </div>
    );
}

// ─────────────────────────────────────────────────────────────
// CONFIRM MODAL
// ─────────────────────────────────────────────────────────────
function ConfirmModal({ title, message, onConfirm, onCancel }) {
    const { T } = useT();
    return (
        <div style={{ position: "fixed", inset: 0, background: T.modalOverlay, display: "flex", alignItems: "center", justifyContent: "center", zIndex: 1100 }}>
            <div style={{ background: T.modalBg, border: `1px solid ${T.delBdr}`, borderRadius: 16, padding: 32, width: 340, textAlign: "center", fontFamily: "'Segoe UI', system-ui, sans-serif" }}>
                <div style={{ fontSize: 40, marginBottom: 14 }}>🗑️</div>
                <h3 style={{ color: T.textPrimary, marginBottom: 8, fontSize: 17, fontWeight: 700 }}>{title}</h3>
                <p style={{ color: T.textSecondary, fontSize: 13, marginBottom: 24, lineHeight: 1.5 }}>{message}</p>
                <div style={{ display: "flex", gap: 10, justifyContent: "center" }}>
                    <button onClick={onCancel} style={{ padding: "9px 24px", background: T.closeBtnBg, color: T.textPrimary, border: "none", borderRadius: 8, cursor: "pointer", fontFamily: "inherit", fontWeight: 700 }}>Cancel</button>
                    <button onClick={onConfirm} style={{ padding: "9px 24px", background: "#dc2626", color: "#fff", border: "none", borderRadius: 8, cursor: "pointer", fontFamily: "inherit", fontWeight: 700 }}>Delete</button>
                </div>
            </div>
        </div>
    );
}

// ─────────────────────────────────────────────────────────────
// EXPORT PANEL
// ─────────────────────────────────────────────────────────────
function ExportPanel({ jobs, photos }) {
    const { T } = useT();
    const [copied, setCopied] = useState("");
    const copy = (text, key) => { navigator.clipboard.writeText(text).then(() => { setCopied(key); setTimeout(() => setCopied(""), 2500); }); };
    const jobsCode = `export const jobs = ${JSON.stringify(jobs, null, 2)};`;
    const photosCode = `export const galleryItems = ${JSON.stringify(photos.map(p => ({ ...p, image: p.image || null })), null, 2)};`;

    return (
        <div style={{ background: T.exportBg, border: `1px solid ${T.exportBorder}`, borderRadius: 12, padding: 20, marginTop: 28 }}>
            <h3 style={{ fontSize: 14, fontWeight: 700, color: T.exportTitle, marginBottom: 6 }}>📋 Export to Career Page</h3>
            <p style={{ fontSize: 12, color: T.exportSubtxt, marginBottom: 16, lineHeight: 1.6 }}>
                Copy the generated data arrays and paste into{" "}
                <code style={{ color: "#4f6ef7", background: T.activeBg, padding: "1px 5px", borderRadius: 4 }}>OpenPositions.jsx</code>{" "}or{" "}
                <code style={{ color: "#059669", background: T.copyPhotosBg, padding: "1px 5px", borderRadius: 4 }}>Gallery.jsx</code>
            </p>
            <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
                {jobs.length > 0 && (
                    <button onClick={() => copy(jobsCode, "jobs")} style={{ padding: "8px 18px", background: copied === "jobs" ? T.copiedBg : T.copyJobsBg, color: copied === "jobs" ? T.copiedTx : T.copyJobsTx, border: `1px solid ${copied === "jobs" ? T.copiedBdr : T.copyJobsBdr}`, borderRadius: 8, cursor: "pointer", fontFamily: "inherit", fontWeight: 700, fontSize: 12 }}>{copied === "jobs" ? "✓ Copied!" : "Copy jobs[ ]"}</button>
                )}
                {photos.length > 0 && (
                    <button onClick={() => copy(photosCode, "photos")} style={{ padding: "8px 18px", background: copied === "photos" ? T.copiedBg : T.copyPhotosBg, color: copied === "photos" ? T.copiedTx : T.copyPhotosTx, border: `1px solid ${copied === "photos" ? T.copiedBdr : T.copyPhotosBdr}`, borderRadius: 8, cursor: "pointer", fontFamily: "inherit", fontWeight: 700, fontSize: 12 }}>{copied === "photos" ? "✓ Copied!" : "Copy galleryItems[ ]"}</button>
                )}
            </div>
        </div>
    );
}

// ─────────────────────────────────────────────────────────────
// ROOT APP
// ─────────────────────────────────────────────────────────────
export default function AdminPanel() {
    const [isAuthed, setIsAuthed] = useState(false);
    const [activeTab, setActiveTab] = useState("dashboard");
    const [jobs, setJobs] = useState([]);
    const [photos, setPhotos] = useState([]);
    const [isDark, setIsDark] = useState(true); // default: dark mode
    const [applications, setApplications] =
        useState([]);

    useEffect(() => {
        fetchJobs();
        fetchGallery();
        fetchApplications();
    }, []);

    const fetchJobs = async () => {
        try {
            const res = await axios.get(
                "http://localhost:5000/api/jobs"
            );

            setJobs(res.data);
        } catch (err) {
            console.log(err);
        }
    };

    const fetchGallery = async () => {
        try {
            const res = await axios.get(
                "http://localhost:5000/api/gallery"
            );

            setPhotos(res.data);
        } catch (err) {
            console.log(err);
        }
    };

    const fetchApplications = async () => {
        try {
            const res = await axios.get(
                "http://localhost:5000/api/applications"
            );

            setApplications(res.data);
        } catch (err) {
            console.log(err);
        }
    };

    const deleteApplication = async (id) => {
        try {
            await axios.delete(
                `http://localhost:5000/api/applications/${id}`
            );

            setApplications(
                applications.filter(
                    (app) => app.id !== id
                )
            );
        } catch (err) {
            console.log(err);
        }
    };

    const T = isDark ? DARK : LIGHT;
    const toggleTheme = () => setIsDark(d => !d);

    return (
        <ThemeCtx.Provider value={{ T, isDark, toggleTheme }}>
            {!isAuthed
                ? <LoginScreen onLogin={() => setIsAuthed(true)} />
                : (
                    <div style={{ display: "flex", minHeight: "100vh", background: T.pageBg, fontFamily: "'Segoe UI', system-ui, sans-serif" }}>
                        <Sidebar
                            activeTab={activeTab}
                            setTab={setActiveTab}
                            onLogout={() => setIsAuthed(false)}
                            jobCount={jobs.length}
                            photoCount={photos.length}
                            applicationCount={applications.length}
                        />
                        <div style={{ flex: 1, overflowY: "auto", minWidth: 0, display: "flex", flexDirection: "column" }}>
                            {/* ── Top bar ── */}
                            <div style={{ display: "flex", justifyContent: "flex-end", padding: "16px 36px 0", flexShrink: 0 }}>
                                <button
                                    onClick={toggleTheme}
                                    style={{
                                        display: "flex", alignItems: "center", gap: 8,
                                        padding: "9px 18px",
                                        background: T.toggleBg,
                                        border: `1px solid ${T.toggleBdr}`,
                                        borderRadius: 10,
                                        color: T.toggleTx,
                                        fontSize: 13, fontWeight: 700,
                                        fontFamily: "'Segoe UI', system-ui, sans-serif",
                                        cursor: "pointer",
                                        transition: "all 0.2s",
                                        letterSpacing: "0.01em",
                                    }}
                                >
                                    {isDark ? "☀️  Light Mode" : "🌙  Dark Mode"}
                                </button>
                            </div>
                            {activeTab === "dashboard" && <Dashboard jobs={jobs} photos={photos} setTab={setActiveTab} />}
                            {activeTab === "jobs" && <JobsManager jobs={jobs} setJobs={setJobs} />}
                            {activeTab === "gallery" && <GalleryManager photos={photos} setPhotos={setPhotos} />}
                            {activeTab === "applications" && (
                                <ApplicationsManager

                                    applications={applications}
                                    deleteApplication={deleteApplication}

                                />

                            )}
                        </div>
                    </div>
                )
            }
        </ThemeCtx.Provider>
    );
}