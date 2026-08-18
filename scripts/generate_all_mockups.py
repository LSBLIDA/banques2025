import subprocess
import os
import tempfile
from PIL import Image

CHROME_PATH = r"C:\Program Files\Google\Chrome\Application\chrome.exe"
OUTPUT_DIR = r"c:\laragon\www\banques2025\public\ui-mockups"
os.makedirs(OUTPUT_DIR, exist_ok=True)

COMMON_CSS = """
* { box-sizing: border-box; margin: 0; padding: 0; }
body {
    background: #080d1a;
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Inter", "Helvetica Neue", Arial, sans-serif;
    color: #e2e8f0;
    width: 1400px;
    height: 780px;
    overflow: hidden;
    display: flex;
    flex-direction: column;
    -webkit-font-smoothing: antialiased;
}
.app-layout {
    display: flex;
    width: 1400px;
    height: 780px;
    background: #0c1322;
}

/* Sidebar */
.sidebar {
    width: 220px;
    min-width: 220px;
    background: #080d1a;
    border-right: 1px solid #1a2639;
    display: flex;
    flex-direction: column;
    padding: 16px 12px;
    height: 100%;
}
.logo-container {
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 4px 8px 16px 8px;
    border-bottom: 1px solid #1a2639;
    margin-bottom: 12px;
}
.logo-text {
    font-size: 22px;
    font-weight: 900;
    letter-spacing: -0.5px;
    color: #ffffff;
}
.logo-text span {
    color: #10b981;
}
.logo-tag {
    font-size: 9px;
    color: #64748b;
    text-transform: uppercase;
    letter-spacing: 1px;
    margin-top: -3px;
}
.nav-section-title {
    font-size: 10px;
    font-weight: 700;
    text-transform: uppercase;
    color: #475569;
    letter-spacing: 0.8px;
    padding: 6px 10px;
    margin-bottom: 4px;
}
.nav-list {
    display: flex;
    flex-direction: column;
    gap: 2px;
    flex: 1;
}
.nav-item {
    display: flex;
    align-items: center;
    gap: 10px;
    padding: 7px 10px;
    border-radius: 8px;
    font-size: 12px;
    font-weight: 500;
    color: #94a3b8;
    text-decoration: none;
    transition: all 0.15s ease;
}
.nav-item svg {
    width: 15px;
    height: 15px;
    stroke: #64748b;
    fill: none;
    stroke-width: 2;
    flex-shrink: 0;
}
.nav-item.active {
    background: #042f2e;
    color: #ffffff;
    border: 1px solid #059669;
    font-weight: 600;
}
.nav-item.active svg {
    stroke: #10b981;
}
.nav-bottom {
    border-top: 1px solid #1a2639;
    padding-top: 10px;
}

/* Main Area */
.main-wrapper {
    flex: 1;
    display: flex;
    flex-direction: column;
    height: 100%;
    background: #0c1322;
    overflow: hidden;
}

/* Top Bar */
.topbar {
    height: 52px;
    border-bottom: 1px solid #1a2639;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    padding: 0 24px;
    gap: 14px;
    background: #080d1a;
}
.dropdown-badge {
    display: flex;
    align-items: center;
    gap: 6px;
    background: #152033;
    border: 1px solid #23334d;
    color: #cbd5e1;
    font-size: 11.5px;
    padding: 5px 12px;
    border-radius: 6px;
    font-weight: 500;
}
.dropdown-badge .arrow {
    font-size: 9px;
    color: #94a3b8;
}
.btn-admin {
    background: #ffffff;
    color: #064e3b;
    font-size: 11.5px;
    font-weight: 700;
    padding: 5px 14px;
    border-radius: 6px;
}
.user-pill {
    display: flex;
    align-items: center;
    gap: 8px;
    font-size: 11.5px;
    color: #e2e8f0;
    font-weight: 500;
}
.user-avatar {
    width: 24px;
    height: 24px;
    border-radius: 50%;
    background: #047857;
    color: #ecfdf5;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 11px;
    font-weight: 700;
}

/* Content View */
.content-body {
    flex: 1;
    padding: 20px 24px;
    display: flex;
    flex-direction: column;
    gap: 16px;
    overflow: hidden;
}
.header-row {
    display: flex;
    align-items: center;
    justify-content: space-between;
}
.page-title {
    font-size: 22px;
    font-weight: 800;
    color: #ffffff;
    letter-spacing: -0.3px;
}
.page-subtitle {
    font-size: 12px;
    color: #64748b;
    margin-top: 2px;
    display: flex;
    align-items: center;
    gap: 8px;
}
.status-pill {
    background: #064e3b;
    color: #34d399;
    font-size: 10.5px;
    padding: 2px 8px;
    border-radius: 9999px;
    font-weight: 600;
    border: 1px solid #059669;
}

/* Common Card & Grid */
.kpi-grid-6 {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 14px;
}
.kpi-grid-4 {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 14px;
}
.kpi-card {
    background: #111c30;
    border: 1px solid #1e2c45;
    border-radius: 12px;
    padding: 14px 18px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.2);
}
.kpi-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 8px;
}
.kpi-icon-wrap {
    width: 32px;
    height: 32px;
    border-radius: 8px;
    display: flex;
    align-items: center;
    justify-content: center;
}
.kpi-unit {
    font-size: 10.5px;
    color: #64748b;
    font-weight: 500;
}
.kpi-label {
    font-size: 12px;
    color: #94a3b8;
    font-weight: 500;
    margin-bottom: 2px;
}
.kpi-value {
    font-size: 23px;
    font-weight: 800;
    color: #ffffff;
    letter-spacing: -0.5px;
}
.kpi-badge {
    display: inline-flex;
    align-items: center;
    gap: 4px;
    font-size: 10.5px;
    font-weight: 600;
    padding: 2px 6px;
    border-radius: 4px;
}
.badge-green { background: rgba(16,185,129,0.15); color: #34d399; }
.badge-blue { background: rgba(59,130,246,0.15); color: #60a5fa; }
.badge-amber { background: rgba(245,158,11,0.15); color: #fbbf24; }
.badge-rose { background: rgba(244,63,94,0.15); color: #fb7185; }

.charts-row-2 {
    display: grid;
    grid-template-columns: 3fr 2fr;
    gap: 14px;
    flex: 1;
}
.card-panel {
    background: #111c30;
    border: 1px solid #1e2c45;
    border-radius: 12px;
    padding: 16px 18px;
    display: flex;
    flex-direction: column;
    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.2);
}
.panel-title {
    font-size: 14px;
    font-weight: 700;
    color: #f1f5f9;
}
.panel-subtitle {
    font-size: 11px;
    color: #64748b;
    margin-top: 2px;
    margin-bottom: 12px;
}
"""

def render_sidebar(active_item="dashboard"):
    items = [
        ("dashboard", "Dashboard", "M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"),
        ("vue_secteur", "Vue Secteur", "M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"),
        ("classements", "Classements", "M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"),
        ("comparateur", "Comparateur", "M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4"),
        ("profil_banque", "Profil Banque", "M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"),
        ("historique", "Historique", "M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"),
        ("parts_marche", "% Parts de marché", "M11 3.055A9.001 9.001 0 1020.945 13H11V3.055z"),
        ("public_prive", "Public vs Privé", "M9 17V7m0 10a2 2 0 01-2 2H5a2 2 0 01-2-2V7a2 2 0 012-2h2a2 2 0 012 2m0 10a2 2 0 002 2h2a2 2 0 002-2M9 7a2 2 0 012-2h2a2 2 0 012 2m0 10V7m0 10a2 2 0 002 2h2a2 2 0 002-2V7a2 2 0 00-2-2h-2a2 2 0 00-2 2"),
        ("concentration", "Concentration du marché", "M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"),
        ("transversale", "Analyse transversale", "M4 6h16M4 10h16M4 14h16M4 18h16"),
        ("scores", "Scores financiers", "M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"),
        ("profils", "Profils", "M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"),
        ("executive", "Executive", "M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z")
    ]
    
    html = """
    <div class="sidebar">
        <div class="logo-container">
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
                <rect width="24" height="24" rx="6" fill="#042f2e"/>
                <path d="M7 17L12 7L17 17M9 13H15" stroke="#10b981" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
            <div>
                <div class="logo-text">ABI<span>X</span></div>
                <div class="logo-tag">Data Explorer</div>
            </div>
        </div>
        <div class="nav-section-title">ESPACE CLIENT</div>
        <div class="nav-list">
    """
    for key, label, icon_path in items:
        is_active = "active" if key == active_item else ""
        html += f"""
            <div class="nav-item {is_active}">
                <svg viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="{icon_path}"/></svg>
                <span>{label}</span>
            </div>
        """
    html += """
        </div>
        <div class="nav-bottom">
            <div class="nav-item">
                <svg viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/></svg>
                <span>Mon Compte</span>
            </div>
        </div>
    </div>
    """
    return html

def render_topbar():
    return """
    <div class="topbar">
        <div class="dropdown-badge">
            <span>Édition : <strong>ABIX 2022 — Publiée</strong></span>
            <span class="arrow">▼</span>
        </div>
        <div class="dropdown-badge">
            <span>FR — Français</span>
            <span class="arrow">▼</span>
        </div>
        <div class="btn-admin">Administration</div>
        <div class="user-pill">
            <div class="user-avatar">T</div>
            <span>Tadjeddine Bachir</span>
        </div>
    </div>
    """

def wrap_html(content, active_item="dashboard"):
    return f"""<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<style>
{COMMON_CSS}
</style>
</head>
<body>
<div class="app-layout">
    {render_sidebar(active_item)}
    <div class="main-wrapper">
        {render_topbar()}
        <div class="content-body">
            {content}
        </div>
    </div>
</div>
</body>
</html>"""

def save_rendered_image(html_content, filename):
    with tempfile.NamedTemporaryFile("w", suffix=".html", delete=False, encoding="utf-8") as f:
        f.write(html_content)
        temp_html = f.name

    temp_png = temp_html.replace(".html", ".png")
    out_webp = os.path.join(OUTPUT_DIR, filename)

    cmd = [
        CHROME_PATH,
        "--headless=new",
        "--disable-gpu",
        "--hide-scrollbars",
        "--window-size=1400,780",
        f"--screenshot={temp_png}",
        "file:///" + temp_html.replace("\\", "/")
    ]

    try:
        subprocess.run(cmd, check=True)
        img = Image.open(temp_png)
        img.save(out_webp, "WEBP", quality=92, method=6)
        print(f"[OK] Generated: {filename} ({os.path.getsize(out_webp)} bytes)")
    finally:
        if os.path.exists(temp_html):
            os.remove(temp_html)
        if os.path.exists(temp_png):
            os.remove(temp_png)

# ── 1. Hero Dashboard (exact screenshot replica) ──────────────────────────────
def build_hero():
    content = """
    <div class="header-row">
        <div>
            <div class="page-title">Dashboard</div>
            <div class="page-subtitle">
                <span>Secteur bancaire algérien — ABIX 2022</span>
                <span class="status-pill">Données 2022</span>
            </div>
        </div>
    </div>

    <div class="kpi-grid-6">
        <div class="kpi-card">
            <div class="kpi-header">
                <div class="kpi-icon-wrap" style="background:rgba(59,130,246,0.15);">
                    <svg width="18" height="18" fill="none" stroke="#3b82f6" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"/></svg>
                </div>
                <span class="kpi-unit">Mds DZD</span>
            </div>
            <div class="kpi-label">Total Bilan</div>
            <div class="kpi-value">22 002,83</div>
        </div>
        <div class="kpi-card">
            <div class="kpi-header">
                <div class="kpi-icon-wrap" style="background:rgba(16,185,129,0.15);">
                    <svg width="18" height="18" fill="none" stroke="#10b981" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"/></svg>
                </div>
                <span class="kpi-unit">Mds DZD</span>
            </div>
            <div class="kpi-label">Dépôts</div>
            <div class="kpi-value">14 641,63</div>
        </div>
        <div class="kpi-card">
            <div class="kpi-header">
                <div class="kpi-icon-wrap" style="background:rgba(168,85,247,0.15);">
                    <svg width="18" height="18" fill="none" stroke="#a855f7" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 10h18M3 14h18m-9-4v8m-7 0h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"/></svg>
                </div>
                <span class="kpi-unit">Mds DZD</span>
            </div>
            <div class="kpi-label">Prêts</div>
            <div class="kpi-value">8 844,65</div>
        </div>
        <div class="kpi-card">
            <div class="kpi-header">
                <div class="kpi-icon-wrap" style="background:rgba(245,158,11,0.15);">
                    <svg width="18" height="18" fill="none" stroke="#f59e0b" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"/></svg>
                </div>
                <span class="kpi-unit">Mds DZD</span>
            </div>
            <div class="kpi-label">PNB</div>
            <div class="kpi-value">513,11</div>
        </div>
        <div class="kpi-card">
            <div class="kpi-header">
                <div class="kpi-icon-wrap" style="background:rgba(16,185,129,0.15);">
                    <svg width="18" height="18" fill="none" stroke="#10b981" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"/></svg>
                </div>
                <span class="kpi-unit">Mds DZD</span>
            </div>
            <div class="kpi-label">Résultat Net</div>
            <div class="kpi-value">225,63</div>
        </div>
        <div class="kpi-card">
            <div class="kpi-header">
                <div class="kpi-icon-wrap" style="background:rgba(20,184,166,0.15);">
                    <svg width="18" height="18" fill="none" stroke="#14b8a6" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"/></svg>
                </div>
                <span class="kpi-unit">Mds DZD</span>
            </div>
            <div class="kpi-label">Fonds Propres</div>
            <div class="kpi-value">1 830,02</div>
        </div>
    </div>

    <div class="charts-row-2">
        <div class="card-panel">
            <div class="panel-title">Top banques — Total bilan (2022)</div>
            <div class="panel-subtitle">En milliards de DZD</div>
            <div style="flex:1; position:relative; display:flex; align-items:flex-end; gap:22px; padding:20px 20px 30px 40px; border-left:1px solid #1e2c45; border-bottom:1px solid #1e2c45;">
                <!-- Y Axis labels -->
                <div style="position:absolute; left:4px; top:15px; font-size:10px; color:#475569;">6000</div>
                <div style="position:absolute; left:4px; top:65px; font-size:10px; color:#475569;">4500</div>
                <div style="position:absolute; left:4px; top:115px; font-size:10px; color:#475569;">3000</div>
                <div style="position:absolute; left:4px; top:165px; font-size:10px; color:#475569;">1500</div>
                <div style="position:absolute; left:14px; bottom:28px; font-size:10px; color:#475569;">0</div>

                <!-- Horizontal grid lines -->
                <div style="position:absolute; left:35px; right:10px; top:20px; border-top:1px dashed #1e2c45;"></div>
                <div style="position:absolute; left:35px; right:10px; top:70px; border-top:1px dashed #1e2c45;"></div>
                <div style="position:absolute; left:35px; right:10px; top:120px; border-top:1px dashed #1e2c45;"></div>
                <div style="position:absolute; left:35px; right:10px; top:170px; border-top:1px dashed #1e2c45;"></div>

                <!-- Bar 1 : BNA -->
                <div style="flex:1; display:flex; flex-direction:column; align-items:center; height:100%; justify-content:flex-end;">
                    <div style="width:75%; height:190px; background:#3b82f6; border-radius:4px 4px 0 0;"></div>
                    <span style="font-size:9.5px; color:#94a3b8; margin-top:8px; white-space:nowrap;">BNA</span>
                </div>
                <!-- Bar 2 : BEA -->
                <div style="flex:1; display:flex; flex-direction:column; align-items:center; height:100%; justify-content:flex-end;">
                    <div style="width:75%; height:158px; background:#3b82f6; border-radius:4px 4px 0 0;"></div>
                    <span style="font-size:9.5px; color:#94a3b8; margin-top:8px; white-space:nowrap;">BEA</span>
                </div>
                <!-- Bar 3 : CPA -->
                <div style="flex:1; display:flex; flex-direction:column; align-items:center; height:100%; justify-content:flex-end;">
                    <div style="width:75%; height:115px; background:#3b82f6; border-radius:4px 4px 0 0;"></div>
                    <span style="font-size:9.5px; color:#94a3b8; margin-top:8px; white-space:nowrap;">CPA</span>
                </div>
                <!-- Bar 4 : BADR (with tooltip) -->
                <div style="flex:1; display:flex; flex-direction:column; align-items:center; height:100%; justify-content:flex-end; position:relative;">
                    <div style="position:absolute; top:20px; left:-50px; background:#080d1a; border:1px solid #334155; border-radius:6px; padding:6px 10px; z-index:10; box-shadow:0 10px 15px -3px rgba(0,0,0,0.5); white-space:nowrap;">
                        <div style="font-size:10px; font-weight:700; color:#e2e8f0;">BANQUE AGRICULTURE ET DEV RURAL</div>
                        <div style="font-size:9.5px; color:#94a3b8; margin-top:2px;">Total Bilan : <strong style="color:#3b82f6;">2 155,80 Mds DZD</strong></div>
                    </div>
                    <div style="width:75%; height:72px; background:#3b82f6; border-radius:4px 4px 0 0;"></div>
                    <span style="font-size:9.5px; color:#94a3b8; margin-top:8px; white-space:nowrap;">BADR</span>
                </div>
                <!-- Bar 5 : CNEP -->
                <div style="flex:1; display:flex; flex-direction:column; align-items:center; height:100%; justify-content:flex-end;">
                    <div style="width:75%; height:65px; background:#3b82f6; border-radius:4px 4px 0 0;"></div>
                    <span style="font-size:9.5px; color:#94a3b8; margin-top:8px; white-space:nowrap;">CNEP</span>
                </div>
                <!-- Bar 6 : BDL -->
                <div style="flex:1; display:flex; flex-direction:column; align-items:center; height:100%; justify-content:flex-end;">
                    <div style="width:75%; height:48px; background:#3b82f6; border-radius:4px 4px 0 0;"></div>
                    <span style="font-size:9.5px; color:#94a3b8; margin-top:8px; white-space:nowrap;">BDL</span>
                </div>
            </div>
        </div>

        <div class="card-panel">
            <div class="panel-title">Répartition du marché</div>
            <div class="panel-subtitle">Total bilan — public et privé</div>
            <div style="display:flex; flex-direction:column; gap:26px; justify-content:center; flex:1; padding:10px 6px;">
                <div>
                    <div style="display:flex; justify-content:space-between; margin-bottom:8px; font-size:12.5px;">
                        <span style="color:#94a3b8; font-weight:500;">Banques publiques</span>
                        <span style="color:#ffffff; font-weight:700;">88.0 %</span>
                    </div>
                    <div style="height:10px; background:#152033; border-radius:9999px; overflow:hidden;">
                        <div style="width:88%; height:100%; background:#3b82f6; border-radius:9999px;"></div>
                    </div>
                    <div style="font-size:11px; color:#64748b; margin-top:5px;">19 365,90 Mds DZD</div>
                </div>

                <div>
                    <div style="display:flex; justify-content:space-between; margin-bottom:8px; font-size:12.5px;">
                        <span style="color:#94a3b8; font-weight:500;">Banques privées</span>
                        <span style="color:#ffffff; font-weight:700;">12.0 %</span>
                    </div>
                    <div style="height:10px; background:#152033; border-radius:9999px; overflow:hidden;">
                        <div style="width:12%; height:100%; background:#0284c7; border-radius:9999px;"></div>
                    </div>
                    <div style="font-size:11px; color:#64748b; margin-top:5px;">2 636,93 Mds DZD</div>
                </div>
            </div>
        </div>
    </div>
    """
    return wrap_html(content, "dashboard")

# ── 2. Vue Secteur ────────────────────────────────────────────────────────────
def build_sector():
    content = """
    <div class="header-row">
        <div>
            <div class="page-title">Vue Secteur</div>
            <div class="page-subtitle">
                <span>Dynamique macro-bancaire et évolution des agrégats</span>
                <span class="status-pill">Vue Consolidée</span>
            </div>
        </div>
    </div>

    <div class="kpi-grid-4">
        <div class="kpi-card">
            <div class="kpi-header"><span class="kpi-label">Actifs Totaux</span><span class="kpi-badge badge-green">+8.4% YoY</span></div>
            <div class="kpi-value">22 002,8 <span style="font-size:12px;color:#64748b;font-weight:normal;">Mds DZD</span></div>
        </div>
        <div class="kpi-card">
            <div class="kpi-header"><span class="kpi-label">Dépôts Collectés</span><span class="kpi-badge badge-green">+6.2% YoY</span></div>
            <div class="kpi-value">14 641,6 <span style="font-size:12px;color:#64748b;font-weight:normal;">Mds DZD</span></div>
        </div>
        <div class="kpi-card">
            <div class="kpi-header"><span class="kpi-label">Crédits Accordés</span><span class="kpi-badge badge-blue">+5.1% YoY</span></div>
            <div class="kpi-value">8 844,7 <span style="font-size:12px;color:#64748b;font-weight:normal;">Mds DZD</span></div>
        </div>
        <div class="kpi-card">
            <div class="kpi-header"><span class="kpi-label">Résultat Net Agrégé</span><span class="kpi-badge badge-green">+14.8% YoY</span></div>
            <div class="kpi-value">225,6 <span style="font-size:12px;color:#64748b;font-weight:normal;">Mds DZD</span></div>
        </div>
    </div>

    <div class="charts-row-2">
        <div class="card-panel">
            <div class="panel-title">Évolution Pluriannuelle des Agrégats (2018 - 2023)</div>
            <div class="panel-subtitle">Milliards DZD • Trajectoire du Total Bilan, Dépôts et PNB</div>
            <div style="flex:1; display:flex; flex-direction:column; justify-content:space-between; padding-top:10px;">
                <svg width="100%" height="180" viewBox="0 0 600 180">
                    <line x1="40" y1="20" x2="580" y2="20" stroke="#1e2c45" stroke-dasharray="3,3"/>
                    <line x1="40" y1="60" x2="580" y2="60" stroke="#1e2c45" stroke-dasharray="3,3"/>
                    <line x1="40" y1="100" x2="580" y2="100" stroke="#1e2c45" stroke-dasharray="3,3"/>
                    <line x1="40" y1="140" x2="580" y2="140" stroke="#1e2c45"/>
                    <!-- Grouped Bars 2018-2023 -->
                    <!-- 2018 -->
                    <rect x="70" y="65" width="20" height="75" fill="#3b82f6" rx="2"/>
                    <rect x="94" y="85" width="20" height="55" fill="#10b981" rx="2"/>
                    <text x="92" y="160" fill="#64748b" font-size="11" text-anchor="middle">2018</text>
                    <!-- 2019 -->
                    <rect x="155" y="55" width="20" height="85" fill="#3b82f6" rx="2"/>
                    <rect x="179" y="78" width="20" height="62" fill="#10b981" rx="2"/>
                    <text x="177" y="160" fill="#64748b" font-size="11" text-anchor="middle">2019</text>
                    <!-- 2020 -->
                    <rect x="240" y="50" width="20" height="90" fill="#3b82f6" rx="2"/>
                    <rect x="264" y="72" width="20" height="68" fill="#10b981" rx="2"/>
                    <text x="262" y="160" fill="#64748b" font-size="11" text-anchor="middle">2020</text>
                    <!-- 2021 -->
                    <rect x="325" y="40" width="20" height="100" fill="#3b82f6" rx="2"/>
                    <rect x="349" y="65" width="20" height="75" fill="#10b981" rx="2"/>
                    <text x="347" y="160" fill="#64748b" font-size="11" text-anchor="middle">2021</text>
                    <!-- 2022 -->
                    <rect x="410" y="30" width="20" height="110" fill="#3b82f6" rx="2"/>
                    <rect x="434" y="55" width="20" height="85" fill="#10b981" rx="2"/>
                    <text x="432" y="160" fill="#64748b" font-size="11" text-anchor="middle">2022</text>
                    <!-- 2023 -->
                    <rect x="495" y="20" width="20" height="120" fill="#3b82f6" rx="2"/>
                    <rect x="519" y="45" width="20" height="95" fill="#10b981" rx="2"/>
                    <text x="517" y="160" fill="#64748b" font-size="11" text-anchor="middle">2023</text>
                    <!-- PNB Trend line -->
                    <polyline points="92,100 177,92 262,88 347,75 432,60 517,45" fill="none" stroke="#f59e0b" stroke-width="2.5"/>
                    <circle cx="517" cy="45" r="4" fill="#f59e0b"/>
                </svg>
                <div style="display:flex; justify-content:center; gap:24px; font-size:11px; margin-top:6px;">
                    <span style="display:flex;align-items:center;gap:6px;color:#94a3b8;"><span style="width:10px;height:10px;background:#3b82f6;border-radius:2px;"></span>Total Bilan</span>
                    <span style="display:flex;align-items:center;gap:6px;color:#94a3b8;"><span style="width:10px;height:10px;background:#10b981;border-radius:2px;"></span>Dépôts</span>
                    <span style="display:flex;align-items:center;gap:6px;color:#94a3b8;"><span style="width:12px;height:3px;background:#f59e0b;border-radius:2px;"></span>PNB</span>
                </div>
            </div>
        </div>

        <div class="card-panel">
            <div class="panel-title">Composition par Segment (2023)</div>
            <div class="panel-subtitle">Structure du marché et indicateurs clés</div>
            <div style="display:flex; flex-direction:column; gap:12px; flex:1; justify-content:center;">
                <div style="background:#152033; border:1px solid #23334d; border-radius:8px; padding:10px 12px;">
                    <div style="display:flex; justify-content:space-between; margin-bottom:4px;">
                        <span style="font-weight:700; color:#38bdf8; font-size:12px;">6 Banques Publiques</span>
                        <span style="font-weight:700; color:#ffffff; font-size:12px;">88.0% PDM</span>
                    </div>
                    <div style="display:flex; justify-content:space-between; font-size:11px; color:#94a3b8;">
                        <span>Croiss: <strong style="color:#10b981;">+8.1%</strong></span>
                        <span>RoE: <strong style="color:#ffffff;">11.4%</strong></span>
                        <span>Coeff: <strong style="color:#ffffff;">41.8%</strong></span>
                    </div>
                </div>

                <div style="background:#152033; border:1px solid #23334d; border-radius:8px; padding:10px 12px;">
                    <div style="display:flex; justify-content:space-between; margin-bottom:4px;">
                        <span style="font-weight:700; color:#a78bfa; font-size:12px;">13 Banques Privées Étrangères</span>
                        <span style="font-weight:700; color:#ffffff; font-size:12px;">10.8% PDM</span>
                    </div>
                    <div style="display:flex; justify-content:space-between; font-size:11px; color:#94a3b8;">
                        <span>Croiss: <strong style="color:#10b981;">+10.4%</strong></span>
                        <span>RoE: <strong style="color:#ffffff;">14.6%</strong></span>
                        <span>Coeff: <strong style="color:#ffffff;">48.2%</strong></span>
                    </div>
                </div>

                <div style="background:#152033; border:1px solid #23334d; border-radius:8px; padding:10px 12px;">
                    <div style="display:flex; justify-content:space-between; margin-bottom:4px;">
                        <span style="font-weight:700; color:#34d399; font-size:12px;">2 Banques Islamiques</span>
                        <span style="font-weight:700; color:#ffffff; font-size:12px;">1.2% PDM</span>
                    </div>
                    <div style="display:flex; justify-content:space-between; font-size:11px; color:#94a3b8;">
                        <span>Croiss: <strong style="color:#10b981;">+14.2%</strong></span>
                        <span>RoE: <strong style="color:#ffffff;">16.1%</strong></span>
                        <span>Coeff: <strong style="color:#ffffff;">39.8%</strong></span>
                    </div>
                </div>
            </div>
        </div>
    </div>
    """
    return wrap_html(content, "vue_secteur")

# ── 3. Profil Banque 360 ──────────────────────────────────────────────────────
def build_bank_360():
    content = """
    <div class="header-row">
        <div>
            <div class="page-title">Profil Banque — BEA (Banque Extérieure d'Algérie)</div>
            <div class="page-subtitle">
                <span>Fiche 360° • Rang #2 • Part de Marché 21.9%</span>
                <span class="status-pill">Banque Publique</span>
            </div>
        </div>
    </div>

    <div class="kpi-grid-4">
        <div class="kpi-card">
            <div class="kpi-header"><span class="kpi-label">Total Bilan</span><span class="kpi-badge badge-blue">Rang #2</span></div>
            <div class="kpi-value">4 810,4 <span style="font-size:12px;color:#64748b;font-weight:normal;">Mds DZD</span></div>
        </div>
        <div class="kpi-card">
            <div class="kpi-header"><span class="kpi-label">Produit Net Bancaire</span><span class="kpi-badge badge-green">+9.4% YoY</span></div>
            <div class="kpi-value">112,40 <span style="font-size:12px;color:#64748b;font-weight:normal;">Mds DZD</span></div>
        </div>
        <div class="kpi-card">
            <div class="kpi-header"><span class="kpi-label">Rentabilité RoE</span><span class="kpi-badge badge-green">Top 15% (Q4)</span></div>
            <div class="kpi-value">14,8 %</div>
        </div>
        <div class="kpi-card">
            <div class="kpi-header"><span class="kpi-label">Coeff. Exploitation</span><span class="kpi-badge badge-green">Q1 (Efficient)</span></div>
            <div class="kpi-value">34,2 %</div>
        </div>
    </div>

    <div class="charts-row-2">
        <div class="card-panel">
            <div class="panel-title">Radar 360° — Positionnement Multidimensionnel</div>
            <div class="panel-subtitle">BEA vs Médiane du Secteur Bancaire Algérien</div>
            <div style="flex:1; display:flex; align-items:center; justify-content:center; position:relative;">
                <svg width="280" height="220" viewBox="0 0 280 220">
                    <!-- Spider web background -->
                    <polygon points="140,25 230,75 230,165 140,205 50,165 50,75" fill="none" stroke="#1e2c45" stroke-width="1"/>
                    <polygon points="140,55 200,88 200,148 140,175 80,148 80,88" fill="none" stroke="#1e2c45" stroke-width="1"/>
                    <polygon points="140,85 170,102 170,132 140,145 110,132 110,102" fill="none" stroke="#1e2c45" stroke-width="1"/>
                    <line x1="140" y1="115" x2="140" y2="25" stroke="#1e2c45"/>
                    <line x1="140" y1="115" x2="230" y2="75" stroke="#1e2c45"/>
                    <line x1="140" y1="115" x2="230" y2="165" stroke="#1e2c45"/>
                    <line x1="140" y1="115" x2="140" y2="205" stroke="#1e2c45"/>
                    <line x1="140" y1="115" x2="50" y2="165" stroke="#1e2c45"/>
                    <line x1="140" y1="115" x2="50" y2="75" stroke="#1e2c45"/>
                    <!-- Sector Median Polygon -->
                    <polygon points="140,75 185,95 180,140 140,160 90,140 95,95" fill="rgba(59,130,246,0.15)" stroke="#3b82f6" stroke-width="1.5" stroke-dasharray="3,3"/>
                    <!-- BEA Polygon -->
                    <polygon points="140,35 220,78 205,158 140,195 65,150 60,80" fill="rgba(16,185,129,0.25)" stroke="#10b981" stroke-width="2"/>
                    <!-- Axis Labels -->
                    <text x="140" y="16" fill="#94a3b8" font-size="9" text-anchor="middle" font-weight="bold">Rentabilité (RoE)</text>
                    <text x="240" y="75" fill="#94a3b8" font-size="9" font-weight="bold">Croissance</text>
                    <text x="240" y="172" fill="#94a3b8" font-size="9" font-weight="bold">Solvabilité</text>
                    <text x="140" y="218" fill="#94a3b8" font-size="9" text-anchor="middle" font-weight="bold">PDM</text>
                    <text x="40" y="172" fill="#94a3b8" font-size="9" text-anchor="end" font-weight="bold">Intermédiation</text>
                    <text x="40" y="75" fill="#94a3b8" font-size="9" text-anchor="end" font-weight="bold">Efficacité</text>
                </svg>
            </div>
            <div style="display:flex; justify-content:center; gap:20px; font-size:11px;">
                <span style="display:flex;align-items:center;gap:6px;color:#10b981;font-weight:600;"><span style="width:10px;height:10px;background:#10b981;border-radius:2px;"></span>BEA</span>
                <span style="display:flex;align-items:center;gap:6px;color:#60a5fa;"><span style="width:12px;height:2px;background:#3b82f6;border-style:dashed;"></span>Médiane Marché</span>
            </div>
        </div>

        <div class="card-panel">
            <div class="panel-title">Positionnement & Quartiles</div>
            <div class="panel-subtitle">Percentiles calculés sur 21 banques algériennes</div>
            <div style="display:flex; flex-direction:column; gap:14px; flex:1; justify-content:center;">
                <div>
                    <div style="display:flex; justify-content:space-between; font-size:11.5px; margin-bottom:4px;">
                        <span style="color:#e2e8f0; font-weight:500;">RoE (14.8%)</span>
                        <span style="color:#34d399; font-weight:700;">88ème percentile</span>
                    </div>
                    <div style="height:6px; background:#152033; border-radius:9999px;"><div style="width:88%; height:100%; background:#10b981; border-radius:9999px;"></div></div>
                </div>
                <div>
                    <div style="display:flex; justify-content:space-between; font-size:11.5px; margin-bottom:4px;">
                        <span style="color:#e2e8f0; font-weight:500;">Productivité PNB/Agent (18.2 M DZD)</span>
                        <span style="color:#34d399; font-weight:700;">92ème percentile</span>
                    </div>
                    <div style="height:6px; background:#152033; border-radius:9999px;"><div style="width:92%; height:100%; background:#10b981; border-radius:9999px;"></div></div>
                </div>
                <div>
                    <div style="display:flex; justify-content:space-between; font-size:11.5px; margin-bottom:4px;">
                        <span style="color:#e2e8f0; font-weight:500;">Ratio Solvabilité (18.6%)</span>
                        <span style="color:#60a5fa; font-weight:700;">76ème percentile</span>
                    </div>
                    <div style="height:6px; background:#152033; border-radius:9999px;"><div style="width:76%; height:100%; background:#3b82f6; border-radius:9999px;"></div></div>
                </div>
                <div>
                    <div style="display:flex; justify-content:space-between; font-size:11.5px; margin-bottom:4px;">
                        <span style="color:#e2e8f0; font-weight:500;">Coût du Risque (0.65%)</span>
                        <span style="color:#34d399; font-weight:700;">68ème percentile</span>
                    </div>
                    <div style="height:6px; background:#152033; border-radius:9999px;"><div style="width:68%; height:100%; background:#10b981; border-radius:9999px;"></div></div>
                </div>
            </div>
        </div>
    </div>
    """
    return wrap_html(content, "profil_banque")

# ── 4. Parts de Marché ────────────────────────────────────────────────────────
def build_market_share():
    content = """
    <div class="header-row">
        <div>
            <div class="page-title">Parts de Marché & Dynamique Concurrentielle</div>
            <div class="page-subtitle">
                <span>Gains / pertes de terrain et contributions à la croissance</span>
                <span class="status-pill">Exercice 2022</span>
            </div>
        </div>
    </div>

    <div class="charts-row-2" style="grid-template-columns: 1fr 1fr; margin-top:6px;">
        <div class="card-panel">
            <div class="panel-title">Répartition des Parts de Marché (Bilan)</div>
            <div class="panel-subtitle">Parts relatives sur un marché de 22 002,8 Mds DZD</div>
            <div style="flex:1; display:flex; align-items:center; justify-content:center; gap:20px;">
                <svg width="180" height="180" viewBox="0 0 180 180">
                    <circle cx="90" cy="90" r="70" fill="none" stroke="#152033" stroke-width="26"/>
                    <!-- Segments -->
                    <!-- BNA 26.8% -->
                    <circle cx="90" cy="90" r="70" fill="none" stroke="#3b82f6" stroke-width="26" stroke-dasharray="118 440" stroke-dashoffset="0"/>
                    <!-- BEA 21.9% -->
                    <circle cx="90" cy="90" r="70" fill="none" stroke="#10b981" stroke-width="26" stroke-dasharray="96 440" stroke-dashoffset="-118"/>
                    <!-- CPA 15.2% -->
                    <circle cx="90" cy="90" r="70" fill="none" stroke="#6366f1" stroke-width="26" stroke-dasharray="67 440" stroke-dashoffset="-214"/>
                    <!-- BADR 9.8% -->
                    <circle cx="90" cy="90" r="70" fill="none" stroke="#f59e0b" stroke-width="26" stroke-dasharray="43 440" stroke-dashoffset="-281"/>
                    <!-- CNEP 8.3% -->
                    <circle cx="90" cy="90" r="70" fill="none" stroke="#ec4899" stroke-width="26" stroke-dasharray="36 440" stroke-dashoffset="-324"/>
                    <!-- BDL 6.0% -->
                    <circle cx="90" cy="90" r="70" fill="none" stroke="#14b8a6" stroke-width="26" stroke-dasharray="26 440" stroke-dashoffset="-360"/>
                    <!-- Others 12.0% -->
                    <circle cx="90" cy="90" r="70" fill="none" stroke="#475569" stroke-width="26" stroke-dasharray="54 440" stroke-dashoffset="-386"/>
                    <text x="90" y="88" fill="#ffffff" font-size="16" font-weight="bold" text-anchor="middle">21</text>
                    <text x="90" y="104" fill="#64748b" font-size="10" text-anchor="middle">Banques</text>
                </svg>
                <div style="display:flex; flex-direction:column; gap:6px; font-size:11px;">
                    <span style="color:#e2e8f0;"><strong style="color:#3b82f6;">■</strong> BNA : 26.8%</span>
                    <span style="color:#e2e8f0;"><strong style="color:#10b981;">■</strong> BEA : 21.9%</span>
                    <span style="color:#e2e8f0;"><strong style="color:#6366f1;">■</strong> CPA : 15.2%</span>
                    <span style="color:#e2e8f0;"><strong style="color:#f59e0b;">■</strong> BADR : 9.8%</span>
                    <span style="color:#e2e8f0;"><strong style="color:#ec4899;">■</strong> CNEP : 8.3%</span>
                    <span style="color:#e2e8f0;"><strong style="color:#14b8a6;">■</strong> BDL : 6.0%</span>
                    <span style="color:#e2e8f0;"><strong style="color:#475569;">■</strong> Privées : 12.0%</span>
                </div>
            </div>
        </div>

        <div class="card-panel">
            <div class="panel-title">Gains & Pertes de Parts de Marché (pts %)</div>
            <div class="panel-subtitle">Variation de part de marché par rapport à l'exercice précédent</div>
            <div style="flex:1; display:flex; flex-direction:column; gap:12px; justify-content:center;">
                <div style="display:flex; align-items:center; gap:10px; font-size:11.5px;">
                    <span style="width:45px; color:#e2e8f0; font-weight:600;">BEA</span>
                    <div style="flex:1; display:flex; align-items:center;">
                        <div style="width:50%; border-right:1px solid #334155; height:18px;"></div>
                        <div style="width:38%; height:14px; background:#10b981; border-radius:0 3px 3px 0; display:flex; align-items:center; padding-left:6px; font-size:10px; font-weight:700; color:#ffffff;">+0.82 pt</div>
                    </div>
                </div>
                <div style="display:flex; align-items:center; gap:10px; font-size:11.5px;">
                    <span style="width:45px; color:#e2e8f0; font-weight:600;">BNA</span>
                    <div style="flex:1; display:flex; align-items:center;">
                        <div style="width:50%; border-right:1px solid #334155; height:18px;"></div>
                        <div style="width:24%; height:14px; background:#10b981; border-radius:0 3px 3px 0; display:flex; align-items:center; padding-left:6px; font-size:10px; font-weight:700; color:#ffffff;">+0.45 pt</div>
                    </div>
                </div>
                <div style="display:flex; align-items:center; gap:10px; font-size:11.5px;">
                    <span style="width:45px; color:#e2e8f0; font-weight:600;">SGA</span>
                    <div style="flex:1; display:flex; align-items:center;">
                        <div style="width:50%; border-right:1px solid #334155; height:18px;"></div>
                        <div style="width:15%; height:14px; background:#10b981; border-radius:0 3px 3px 0; display:flex; align-items:center; padding-left:6px; font-size:10px; font-weight:700; color:#ffffff;">+0.22 pt</div>
                    </div>
                </div>
                <div style="display:flex; align-items:center; gap:10px; font-size:11.5px;">
                    <span style="width:45px; color:#e2e8f0; font-weight:600;">CPA</span>
                    <div style="flex:1; display:flex; align-items:center; justify-content:flex-end;">
                        <div style="width:10%; height:14px; background:#f59e0b; border-radius:3px 0 0 3px; display:flex; align-items:center; justify-content:flex-end; padding-right:4px; font-size:10px; font-weight:700; color:#ffffff;">-0.15</div>
                        <div style="width:50%; border-left:1px solid #334155; height:18px;"></div>
                    </div>
                </div>
                <div style="display:flex; align-items:center; gap:10px; font-size:11.5px;">
                    <span style="width:45px; color:#e2e8f0; font-weight:600;">BADR</span>
                    <div style="flex:1; display:flex; align-items:center; justify-content:flex-end;">
                        <div style="width:26%; height:14px; background:#f43f5e; border-radius:3px 0 0 3px; display:flex; align-items:center; justify-content:flex-end; padding-right:4px; font-size:10px; font-weight:700; color:#ffffff;">-0.48</div>
                        <div style="width:50%; border-left:1px solid #334155; height:18px;"></div>
                    </div>
                </div>
                <div style="display:flex; align-items:center; gap:10px; font-size:11.5px;">
                    <span style="width:45px; color:#e2e8f0; font-weight:600;">CNEP</span>
                    <div style="flex:1; display:flex; align-items:center; justify-content:flex-end;">
                        <div style="width:40%; height:14px; background:#f43f5e; border-radius:3px 0 0 3px; display:flex; align-items:center; justify-content:flex-end; padding-right:4px; font-size:10px; font-weight:700; color:#ffffff;">-0.86</div>
                        <div style="width:50%; border-left:1px solid #334155; height:18px;"></div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    """
    return wrap_html(content, "parts_marche")

# ── 5. Concentration du Marché ────────────────────────────────────────────────
def build_concentration():
    content = """
    <div class="header-row">
        <div>
            <div class="page-title">Indices de Concentration du Marché</div>
            <div class="page-subtitle">
                <span>Intensité concurrentielle et poids des acteurs dominants</span>
                <span class="status-pill">Indices HHI & CR</span>
            </div>
        </div>
    </div>

    <div class="kpi-grid-4">
        <div class="kpi-card">
            <div class="kpi-header"><span class="kpi-label">Indice HHI</span><span class="kpi-badge badge-amber">Modéré</span></div>
            <div class="kpi-value">1 742 <span style="font-size:11px;color:#64748b;font-weight:normal;">/ 10 000</span></div>
        </div>
        <div class="kpi-card">
            <div class="kpi-header"><span class="kpi-label">Ratio CR3 (Top 3)</span><span class="kpi-badge badge-blue">BNA + BEA + CPA</span></div>
            <div class="kpi-value">63,9 %</div>
        </div>
        <div class="kpi-card">
            <div class="kpi-header"><span class="kpi-label">Ratio CR5 (Top 5)</span><span class="kpi-badge badge-blue">Top 5 Acteurs</span></div>
            <div class="kpi-value">82,0 %</div>
        </div>
        <div class="kpi-card">
            <div class="kpi-header"><span class="kpi-label">Nbre Effectif Banques</span><span class="kpi-badge badge-green">1 / HHI</span></div>
            <div class="kpi-value">5,74 <span style="font-size:11px;color:#64748b;font-weight:normal;">banques</span></div>
        </div>
    </div>

    <div class="charts-row-2">
        <div class="card-panel">
            <div class="panel-title">Courbe de Concentration Cumulée (Lorenz / CR)</div>
            <div class="panel-subtitle">Part cumulée des actifs en fonction du nombre de banques</div>
            <div style="flex:1; display:flex; align-items:center; justify-content:center;">
                <svg width="100%" height="180" viewBox="0 0 500 180">
                    <line x1="40" y1="20" x2="480" y2="20" stroke="#1e2c45" stroke-dasharray="3,3"/>
                    <line x1="40" y1="80" x2="480" y2="80" stroke="#1e2c45" stroke-dasharray="3,3"/>
                    <line x1="40" y1="140" x2="480" y2="140" stroke="#1e2c45"/>
                    <line x1="40" y1="20" x2="40" y2="140" stroke="#1e2c45"/>
                    <!-- Diagonal equality line -->
                    <line x1="40" y1="140" x2="480" y2="20" stroke="#475569" stroke-width="1.5" stroke-dasharray="4,4"/>
                    <!-- Concentration Curve -->
                    <path d="M40,140 Q100,50 200,35 T480,20" fill="none" stroke="#3b82f6" stroke-width="3"/>
                    <!-- Milestone points -->
                    <circle cx="95" cy="85" r="5" fill="#3b82f6"/>
                    <text x="95" y="75" fill="#e2e8f0" font-size="10" font-weight="bold" text-anchor="middle">CR1 (26.8%)</text>
                    <circle cx="150" cy="48" r="5" fill="#3b82f6"/>
                    <text x="150" y="38" fill="#e2e8f0" font-size="10" font-weight="bold" text-anchor="middle">CR3 (63.9%)</text>
                    <circle cx="210" cy="35" r="5" fill="#3b82f6"/>
                    <text x="210" y="25" fill="#e2e8f0" font-size="10" font-weight="bold" text-anchor="middle">CR5 (82.0%)</text>
                    <circle cx="320" cy="24" r="5" fill="#3b82f6"/>
                    <text x="320" y="16" fill="#e2e8f0" font-size="10" font-weight="bold" text-anchor="middle">CR10 (94.8%)</text>
                </svg>
            </div>
        </div>

        <div class="card-panel">
            <div class="panel-title">Seuils Réglementaires HHI</div>
            <div class="panel-subtitle">Normes Department of Justice / FTC & ABIX</div>
            <div style="display:flex; flex-direction:column; gap:10px; flex:1; justify-content:center;">
                <div style="background:#152033; border-left:3px solid #10b981; padding:8px 12px; border-radius:0 6px 6px 0;">
                    <div style="font-size:11.5px; font-weight:700; color:#34d399;">Faible concentration : &lt; 1 500</div>
                    <div style="font-size:10px; color:#64748b; margin-top:2px;">Marché concurrentiel, aucun pouvoir unilatéral.</div>
                </div>
                <div style="background:#152033; border-left:3px solid #f59e0b; padding:8px 12px; border-radius:0 6px 6px 0;">
                    <div style="font-size:11.5px; font-weight:700; color:#fbbf24;">Concentration modérée : 1 500 – 2 500 (Algérie: 1 742)</div>
                    <div style="font-size:10px; color:#64748b; margin-top:2px;">Marché oligopolistique structuré autour d'un noyau public fort.</div>
                </div>
                <div style="background:#152033; border-left:3px solid #f43f5e; padding:8px 12px; border-radius:0 6px 6px 0;">
                    <div style="font-size:11.5px; font-weight:700; color:#fb7185;">Forte concentration : &gt; 2 500</div>
                    <div style="font-size:10px; color:#64748b; margin-top:2px;">Domination forte par 1 ou 2 acteurs ultra-dominants.</div>
                </div>
            </div>
        </div>
    </div>
    """
    return wrap_html(content, "concentration")

# ── 6. Heatmap Multicritères ──────────────────────────────────────────────────
def build_heatmap():
    rows_data = [
        ("BNA", "5 820", "+9.2%", "13.8%", "1.6%", "38.2%", "3.4%", "58.2%", "0.82%"),
        ("BEA", "4 810", "+11.4%", "14.8%", "1.8%", "34.2%", "3.6%", "64.1%", "0.65%"),
        ("CPA", "3 450", "+6.8%", "11.2%", "1.4%", "42.1%", "3.1%", "61.5%", "0.94%"),
        ("BADR", "2 156", "+4.1%", "8.5%", "0.9%", "49.5%", "2.8%", "72.4%", "1.45%"),
        ("CNEP", "1 980", "+3.2%", "9.8%", "1.1%", "44.8%", "2.9%", "68.0%", "0.78%"),
        ("BDL", "1 420", "+5.6%", "7.9%", "0.8%", "52.3%", "2.7%", "66.2%", "1.12%"),
        ("SGA", "485", "+8.1%", "15.2%", "2.1%", "46.2%", "4.2%", "88.4%", "0.52%"),
        ("AGB", "420", "+12.3%", "12.6%", "1.7%", "51.0%", "3.9%", "91.2%", "0.74%"),
        ("BNP", "395", "+7.4%", "14.1%", "1.9%", "45.8%", "4.0%", "85.6%", "0.48%"),
        ("Al Baraka", "360", "+14.2%", "16.4%", "2.3%", "41.5%", "4.4%", "94.1%", "0.39%"),
    ]
    
    rows_html = ""
    for r in rows_data:
        rows_html += f"""
        <tr style="border-bottom:1px solid #1a2639; font-size:11.5px;">
            <td style="padding:7px 10px; font-weight:700; color:#e2e8f0;">{r[0]}</td>
            <td style="padding:7px 10px; text-align:right; color:#cbd5e1;">{r[1]}</td>
            <td style="padding:7px 10px; text-align:right; background:rgba(16,185,129,0.15); color:#34d399; font-weight:600;">{r[2]}</td>
            <td style="padding:7px 10px; text-align:right; background:rgba(16,185,129,0.22); color:#10b981; font-weight:700;">{r[3]}</td>
            <td style="padding:7px 10px; text-align:right; background:rgba(59,130,246,0.18); color:#60a5fa;">{r[4]}</td>
            <td style="padding:7px 10px; text-align:right; background:rgba(16,185,129,0.12); color:#34d399;">{r[5]}</td>
            <td style="padding:7px 10px; text-align:right; background:rgba(59,130,246,0.15); color:#93c5fd;">{r[6]}</td>
            <td style="padding:7px 10px; text-align:right; background:rgba(245,158,11,0.15); color:#fbbf24;">{r[7]}</td>
            <td style="padding:7px 10px; text-align:right; background:rgba(244,63,94,0.12); color:#fb7185;">{r[8]}</td>
        </tr>
        """

    content = f"""
    <div class="header-row">
        <div>
            <div class="page-title">Heatmap — Analyse Multicritères</div>
            <div class="page-subtitle">
                <span>Cartographie des performances, rentabilité et efficacité des banques</span>
                <span class="status-pill">Vue Matricielle</span>
            </div>
        </div>
    </div>

    <div class="card-panel" style="flex:1;">
        <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:12px;">
            <div class="panel-title">Grille d'Intensité Financière (Exercice 2022)</div>
            <div style="display:flex; gap:14px; font-size:10.5px;">
                <span style="display:flex;align-items:center;gap:4px;color:#34d399;"><span style="width:10px;height:10px;background:#10b981;border-radius:2px;"></span>Top 25%</span>
                <span style="display:flex;align-items:center;gap:4px;color:#60a5fa;"><span style="width:10px;height:10px;background:#3b82f6;border-radius:2px;"></span>Médiane</span>
                <span style="display:flex;align-items:center;gap:4px;color:#fbbf24;"><span style="width:10px;height:10px;background:#f59e0b;border-radius:2px;"></span>Vigilance</span>
                <span style="display:flex;align-items:center;gap:4px;color:#fb7185;"><span style="width:10px;height:10px;background:#f43f5e;border-radius:2px;"></span>Bas 25%</span>
            </div>
        </div>

        <table style="width:100%; border-collapse:collapse; text-align:left;">
            <thead>
                <tr style="border-bottom:2px solid #23334d; font-size:10.5px; text-transform:uppercase; color:#64748b; letter-spacing:0.5px;">
                    <th style="padding:8px 10px;">Banque</th>
                    <th style="padding:8px 10px; text-align:right;">Bilan (Mds)</th>
                    <th style="padding:8px 10px; text-align:right;">Croiss. Actifs</th>
                    <th style="padding:8px 10px; text-align:right;">RoE %</th>
                    <th style="padding:8px 10px; text-align:right;">RoA %</th>
                    <th style="padding:8px 10px; text-align:right;">Coeff. Expl.</th>
                    <th style="padding:8px 10px; text-align:right;">Marge Int.</th>
                    <th style="padding:8px 10px; text-align:right;">Prêts/Dépôts</th>
                    <th style="padding:8px 10px; text-align:right;">Coût Risque</th>
                </tr>
            </thead>
            <tbody>
                {rows_html}
            </tbody>
        </table>
    </div>
    """
    return wrap_html(content, "transversale")

# ── 7. Matrice Stratégique ───────────────────────────────────────────────────
def build_matrix():
    content = """
    <div class="header-row">
        <div>
            <div class="page-title">Matrice Stratégique : Croissance vs Rentabilité</div>
            <div class="page-subtitle">
                <span>Positionnement en 4 quadrants des banques selon la dynamique PNB et le RoE</span>
                <span class="status-pill">Quadrant 2D</span>
            </div>
        </div>
    </div>

    <div class="card-panel" style="flex:1;">
        <div style="flex:1; position:relative; display:flex; align-items:center; justify-content:center;">
            <svg width="100%" height="420" viewBox="0 0 700 420">
                <!-- 4 Quadrants Backgrounds -->
                <rect x="50" y="20" width="300" height="180" fill="rgba(59,130,246,0.06)" rx="8"/>
                <rect x="350" y="20" width="300" height="180" fill="rgba(16,185,129,0.08)" rx="8"/>
                <rect x="50" y="200" width="300" height="180" fill="rgba(244,63,94,0.06)" rx="8"/>
                <rect x="350" y="200" width="300" height="180" fill="rgba(245,158,11,0.06)" rx="8"/>

                <!-- Median Crosshair Lines -->
                <line x1="350" y1="20" x2="350" y2="380" stroke="#334155" stroke-width="2"/>
                <line x1="50" y1="200" x2="650" y2="200" stroke="#334155" stroke-width="2"/>

                <!-- Quadrant Labels -->
                <text x="365" y="45" fill="#34d399" font-size="12" font-weight="800">LEADERS DYNAMIQUES</text>
                <text x="365" y="60" fill="#64748b" font-size="10">Croissance Forte • RoE Élevé</text>

                <text x="65" y="45" fill="#60a5fa" font-size="12" font-weight="800">RENTABILITÉ RÉSILIENTE</text>
                <text x="65" y="60" fill="#64748b" font-size="10">Croissance Modérée • RoE Élevé</text>

                <text x="65" y="355" fill="#fb7185" font-size="12" font-weight="800">EN TRANSFORMATION</text>
                <text x="65" y="370" fill="#64748b" font-size="10">Croissance Faible • RoE Modeste</text>

                <text x="365" y="355" fill="#fbbf24" font-size="12" font-weight="800">INVESTISSEMENT & CONQUÊTE</text>
                <text x="365" y="370" fill="#64748b" font-size="10">Croissance Forte • RoE Modeste</text>

                <!-- Bubbles -->
                <!-- BEA (High growth, high RoE) -->
                <circle cx="480" cy="110" r="32" fill="rgba(16,185,129,0.3)" stroke="#10b981" stroke-width="2"/>
                <text x="480" y="114" fill="#ffffff" font-size="11" font-weight="bold" text-anchor="middle">BEA</text>
                
                <!-- BNA (Moderate growth, high RoE) -->
                <circle cx="270" cy="125" r="36" fill="rgba(59,130,246,0.3)" stroke="#3b82f6" stroke-width="2"/>
                <text x="270" y="129" fill="#ffffff" font-size="11" font-weight="bold" text-anchor="middle">BNA</text>

                <!-- Al Baraka (High growth, high RoE) -->
                <circle cx="560" cy="80" r="18" fill="rgba(16,185,129,0.3)" stroke="#10b981" stroke-width="2"/>
                <text x="560" y="84" fill="#ffffff" font-size="9" font-weight="bold" text-anchor="middle">Baraka</text>

                <!-- SGA (Moderate growth, high RoE) -->
                <circle cx="310" cy="95" r="20" fill="rgba(59,130,246,0.3)" stroke="#3b82f6" stroke-width="2"/>
                <text x="310" y="99" fill="#ffffff" font-size="9" font-weight="bold" text-anchor="middle">SGA</text>

                <!-- CPA (High growth, moderate RoE) -->
                <circle cx="430" cy="245" r="26" fill="rgba(245,158,11,0.3)" stroke="#f59e0b" stroke-width="2"/>
                <text x="430" y="249" fill="#ffffff" font-size="10" font-weight="bold" text-anchor="middle">CPA</text>

                <!-- AGB (High growth, moderate RoE) -->
                <circle cx="510" cy="225" r="19" fill="rgba(245,158,11,0.3)" stroke="#f59e0b" stroke-width="2"/>
                <text x="510" y="229" fill="#ffffff" font-size="9" font-weight="bold" text-anchor="middle">AGB</text>

                <!-- BADR (Low growth, lower RoE) -->
                <circle cx="210" cy="290" r="24" fill="rgba(244,63,94,0.3)" stroke="#f43f5e" stroke-width="2"/>
                <text x="210" y="294" fill="#ffffff" font-size="10" font-weight="bold" text-anchor="middle">BADR</text>

                <!-- CNEP (Low growth, lower RoE) -->
                <circle cx="150" cy="275" r="22" fill="rgba(244,63,94,0.3)" stroke="#f43f5e" stroke-width="2"/>
                <text x="150" y="279" fill="#ffffff" font-size="10" font-weight="bold" text-anchor="middle">CNEP</text>

                <!-- BDL -->
                <circle cx="240" cy="320" r="18" fill="rgba(244,63,94,0.3)" stroke="#f43f5e" stroke-width="2"/>
                <text x="240" y="324" fill="#ffffff" font-size="9" font-weight="bold" text-anchor="middle">BDL</text>

                <!-- Axis Arrows & Labels -->
                <text x="640" y="218" fill="#94a3b8" font-size="10" font-weight="bold">Croissance PNB % →</text>
                <text x="360" y="30" fill="#94a3b8" font-size="10" font-weight="bold">↑ Rentabilité RoE %</text>
            </svg>
        </div>
    </div>
    """
    return wrap_html(content, "transversale")

# ── 8. Valeurs Atypiques (Outliers) ──────────────────────────────────────────
def build_outliers():
    content = """
    <div class="header-row">
        <div>
            <div class="page-title">Détection des Valeurs Atypiques (Outliers)</div>
            <div class="page-subtitle">
                <span>Identification des écarts statistiques significatifs (&gt; ±2.0 σ)</span>
                <span class="status-pill">Algorithme d'Anomalie</span>
            </div>
        </div>
    </div>

    <div class="charts-row-2">
        <div class="card-panel">
            <div class="panel-title">Dispersion Statistique & Seuils d'Alerte</div>
            <div class="panel-subtitle">Transformation Prêts/Dépôts vs Rentabilité</div>
            <div style="flex:1; display:flex; align-items:center; justify-content:center;">
                <svg width="100%" height="220" viewBox="0 0 500 220">
                    <!-- Sigma Bands -->
                    <rect x="40" y="50" width="440" height="120" fill="rgba(16,185,129,0.06)"/>
                    <line x1="40" y1="110" x2="480" y2="110" stroke="#10b981" stroke-dasharray="4,4"/>
                    <line x1="40" y1="50" x2="480" y2="50" stroke="#f59e0b" stroke-dasharray="2,2"/>
                    <line x1="40" y1="170" x2="480" y2="170" stroke="#f59e0b" stroke-dasharray="2,2"/>
                    <line x1="40" y1="20" x2="480" y2="20" stroke="#f43f5e"/>
                    <line x1="40" y1="200" x2="480" y2="200" stroke="#f43f5e"/>

                    <text x="45" y="16" fill="#fb7185" font-size="9" font-weight="bold">+3.0σ (Seuil Critique)</text>
                    <text x="45" y="45" fill="#fbbf24" font-size="9">+2.0σ (Vigilance)</text>
                    <text x="45" y="105" fill="#34d399" font-size="9">Médiane Sectorielle</text>
                    <text x="45" y="195" fill="#fb7185" font-size="9">-3.0σ (Seuil Critique)</text>

                    <!-- Normal points -->
                    <circle cx="120" cy="115" r="5" fill="#64748b"/>
                    <circle cx="160" cy="105" r="5" fill="#64748b"/>
                    <circle cx="190" cy="120" r="5" fill="#64748b"/>
                    <circle cx="230" cy="98" r="5" fill="#64748b"/>
                    <circle cx="270" cy="112" r="5" fill="#64748b"/>
                    <circle cx="310" cy="108" r="5" fill="#64748b"/>
                    <circle cx="350" cy="125" r="5" fill="#64748b"/>

                    <!-- Outlier Point 1 -->
                    <circle cx="410" cy="28" r="7" fill="#f43f5e"/>
                    <circle cx="410" cy="28" r="14" fill="none" stroke="#f43f5e" stroke-width="1.5" stroke-dasharray="3,3"/>
                    <text x="410" y="16" fill="#ffffff" font-size="10" font-weight="bold" text-anchor="middle">Baraka (+3.1σ)</text>

                    <!-- Outlier Point 2 -->
                    <circle cx="290" cy="42" r="7" fill="#f59e0b"/>
                    <text x="290" y="32" fill="#ffffff" font-size="10" font-weight="bold" text-anchor="middle">AGB (+2.4σ)</text>
                </svg>
            </div>
        </div>

        <div class="card-panel">
            <div class="panel-title">Signaux d'Anomalies Détectées</div>
            <div class="panel-subtitle">Observations méritant une investigation approfondie</div>
            <div style="display:flex; flex-direction:column; gap:10px; flex:1; justify-content:center;">
                <div style="background:#152033; border:1px solid #334155; border-radius:8px; padding:9px 12px;">
                    <div style="display:flex; justify-content:space-between; align-items:center;">
                        <span style="font-weight:700; color:#fb7185; font-size:11.5px;">Outlier #1 : Ratio Prêts / Dépôts</span>
                        <span class="kpi-badge badge-rose">+3.1 σ</span>
                    </div>
                    <p style="font-size:10.5px; color:#94a3b8; margin-top:2px;">Al Baraka (94.1% vs médiane secteur 64.1%). Modèle d'intermédiation islamique.</p>
                </div>

                <div style="background:#152033; border:1px solid #334155; border-radius:8px; padding:9px 12px;">
                    <div style="display:flex; justify-content:space-between; align-items:center;">
                        <span style="font-weight:700; color:#fbbf24; font-size:11.5px;">Outlier #2 : Croissance du PNB</span>
                        <span class="kpi-badge badge-amber">+2.6 σ</span>
                    </div>
                    <p style="font-size:10.5px; color:#94a3b8; margin-top:2px;">AGB (+18.4% vs médiane 7.2%). Forte hausse de la marge d'intermédiation.</p>
                </div>

                <div style="background:#152033; border:1px solid #334155; border-radius:8px; padding:9px 12px;">
                    <div style="display:flex; justify-content:space-between; align-items:center;">
                        <span style="font-weight:700; color:#fbbf24; font-size:11.5px;">Outlier #3 : Coût du Risque</span>
                        <span class="kpi-badge badge-amber">+2.4 σ</span>
                    </div>
                    <p style="font-size:10.5px; color:#94a3b8; margin-top:2px;">BADR (1.45% vs médiane 0.72%). Poids du portefeuille agricole.</p>
                </div>
            </div>
        </div>
    </div>
    """
    return wrap_html(content, "transversale")

# ── 9. Quatre Dimensions Financières ──────────────────────────────────────────
def build_dimensions():
    content = """
    <div class="header-row">
        <div>
            <div class="page-title">Quatre Dimensions pour Comprendre le Profil Bancaire</div>
            <div class="page-subtitle">
                <span>Lecture financière structurée sans score global arbitraire</span>
                <span class="status-pill">Cadre Analytique ABIX</span>
            </div>
        </div>
    </div>

    <div style="display:grid; grid-template-columns:1fr 1fr; gap:14px; flex:1;">
        <!-- Card 1: Rentabilité -->
        <div class="card-panel">
            <div style="display:flex; justify-content:space-between; align-items:center;">
                <div class="panel-title" style="color:#34d399;">1. Rentabilité</div>
                <span class="kpi-badge badge-green">RoE • RoA • Marge</span>
            </div>
            <div class="panel-subtitle">Transformation de l'activité en résultat économique</div>
            <div style="display:flex; flex-direction:column; gap:8px; flex:1; justify-content:center;">
                <div style="display:flex; justify-content:space-between; font-size:11px;"><span style="color:#94a3b8;">RoE Médian Secteur</span><strong style="color:#ffffff;">11.8 %</strong></div>
                <div style="display:flex; justify-content:space-between; font-size:11px;"><span style="color:#94a3b8;">RoA Médian Secteur</span><strong style="color:#ffffff;">1.52 %</strong></div>
                <div style="display:flex; justify-content:space-between; font-size:11px;"><span style="color:#94a3b8;">Marge d'Intérêt Nette</span><strong style="color:#ffffff;">3.40 %</strong></div>
                <div style="height:4px; background:#152033; border-radius:9999px; margin-top:4px;"><div style="width:78%; height:100%; background:#10b981; border-radius:9999px;"></div></div>
            </div>
        </div>

        <!-- Card 2: Croissance -->
        <div class="card-panel">
            <div style="display:flex; justify-content:space-between; align-items:center;">
                <div class="panel-title" style="color:#60a5fa;">2. Croissance</div>
                <span class="kpi-badge badge-blue">CAGR Actifs • Dépôts • PNB</span>
            </div>
            <div class="panel-subtitle">Dynamique pluriannuelle de développement</div>
            <div style="display:flex; flex-direction:column; gap:8px; flex:1; justify-content:center;">
                <div style="display:flex; justify-content:space-between; font-size:11px;"><span style="color:#94a3b8;">CAGR Actifs (3 ans)</span><strong style="color:#ffffff;">+7.8 %</strong></div>
                <div style="display:flex; justify-content:space-between; font-size:11px;"><span style="color:#94a3b8;">CAGR Dépôts (3 ans)</span><strong style="color:#ffffff;">+6.4 %</strong></div>
                <div style="display:flex; justify-content:space-between; font-size:11px;"><span style="color:#94a3b8;">Croissance PNB (YoY)</span><strong style="color:#ffffff;">+8.9 %</strong></div>
                <div style="height:4px; background:#152033; border-radius:9999px; margin-top:4px;"><div style="width:82%; height:100%; background:#3b82f6; border-radius:9999px;"></div></div>
            </div>
        </div>

        <!-- Card 3: Efficacité -->
        <div class="card-panel">
            <div style="display:flex; justify-content:space-between; align-items:center;">
                <div class="panel-title" style="color:#fbbf24;">3. Efficacité</div>
                <span class="kpi-badge badge-amber">Coeff. Expl. • Productivité</span>
            </div>
            <div class="panel-subtitle">Maîtrise des charges et conversion opérationnelle</div>
            <div style="display:flex; flex-direction:column; gap:8px; flex:1; justify-content:center;">
                <div style="display:flex; justify-content:space-between; font-size:11px;"><span style="color:#94a3b8;">Coeff. Exploitation Moyen</span><strong style="color:#ffffff;">42.6 %</strong></div>
                <div style="display:flex; justify-content:space-between; font-size:11px;"><span style="color:#94a3b8;">PNB / Effectif Moyen</span><strong style="color:#ffffff;">14.8 M DZD</strong></div>
                <div style="display:flex; justify-content:space-between; font-size:11px;"><span style="color:#94a3b8;">Frais Généraux / Actifs</span><strong style="color:#ffffff;">1.45 %</strong></div>
                <div style="height:4px; background:#152033; border-radius:9999px; margin-top:4px;"><div style="width:68%; height:100%; background:#f59e0b; border-radius:9999px;"></div></div>
            </div>
        </div>

        <!-- Card 4: Capitalisation -->
        <div class="card-panel">
            <div style="display:flex; justify-content:space-between; align-items:center;">
                <div class="panel-title" style="color:#a78bfa;">4. Capitalisation Comptable</div>
                <span class="kpi-badge badge-blue">Fonds Propres • Solvabilité</span>
            </div>
            <div class="panel-subtitle">Solidité du bilan et couverture prudentielle</div>
            <div style="display:flex; flex-direction:column; gap:8px; flex:1; justify-content:center;">
                <div style="display:flex; justify-content:space-between; font-size:11px;"><span style="color:#94a3b8;">Fonds Propres / Actifs</span><strong style="color:#ffffff;">8.32 %</strong></div>
                <div style="display:flex; justify-content:space-between; font-size:11px;"><span style="color:#94a3b8;">Ratio Solvabilité Moyen</span><strong style="color:#ffffff;">17.8 %</strong></div>
                <div style="display:flex; justify-content:space-between; font-size:11px;"><span style="color:#94a3b8;">Couverture des Provisions</span><strong style="color:#ffffff;">84.2 %</strong></div>
                <div style="height:4px; background:#152033; border-radius:9999px; margin-top:4px;"><div style="width:85%; height:100%; background:#8b5cf6; border-radius:9999px;"></div></div>
            </div>
        </div>
    </div>
    """
    return wrap_html(content, "scores")

# ── 10. Executive Dashboard ──────────────────────────────────────────────────
def build_executive():
    content = """
    <div class="header-row">
        <div>
            <div class="page-title">Executive Dashboard — Synthèse Dirigeant</div>
            <div class="page-subtitle">
                <span>Alertes stratégiques déterministes et synthèse décisionnelle</span>
                <span class="status-pill">Mode Décideur</span>
            </div>
        </div>
    </div>

    <div class="charts-row-2" style="grid-template-columns: 1.1fr 0.9fr;">
        <div class="card-panel">
            <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:10px;">
                <div class="panel-title">Scanning Data & Alertes Détectées</div>
                <div style="display:flex; align-items:center; gap:6px; font-size:11px; color:#34d399; font-weight:600;">
                    <svg width="14" height="14" fill="none" stroke="#10b981" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"/></svg>
                    21 Banques Scannées
                </div>
            </div>

            <div style="display:flex; flex-direction:column; gap:8px; flex:1; justify-content:center;">
                <div style="background:#152033; border-left:3px solid #f59e0b; padding:7px 10px; border-radius:0 6px 6px 0; font-size:11px;">
                    <strong style="color:#fbbf24;">Divergence Dépôts vs Crédits :</strong> Dépôts (+6.2%) progressent plus vite que les crédits (+5.1%).
                </div>
                <div style="background:#152033; border-left:3px solid #f59e0b; padding:7px 10px; border-radius:0 6px 6px 0; font-size:11px;">
                    <strong style="color:#fbbf24;">Coût du Risque :</strong> Hausse significative des dotations sur 3 acteurs de taille intermédiaire.
                </div>
                <div style="background:#152033; border-left:3px solid #f43f5e; padding:7px 10px; border-radius:0 6px 6px 0; font-size:11px;">
                    <strong style="color:#fb7185;">Érosion de Rentabilité :</strong> 2 banques affichent un PNB en hausse mais un résultat net en baisse.
                </div>
                <div style="background:#152033; border-left:3px solid #3b82f6; padding:7px 10px; border-radius:0 6px 6px 0; font-size:11px;">
                    <strong style="color:#60a5fa;">Structure Bilan :</strong> Les banques publiques maintiennent 88% de part de marché globale.
                </div>
                <div style="background:#152033; border-left:3px solid #10b981; padding:7px 10px; border-radius:0 6px 6px 0; font-size:11px;">
                    <strong style="color:#34d399;">Positionnement :</strong> BEA conforte sa 2ème place sur le PNB avec une efficacité de 34.2%.
                </div>
            </div>
        </div>

        <div class="card-panel">
            <div class="panel-title">Synthèse Macro & Trajectoire</div>
            <div class="panel-subtitle">Points d'attention pour la gouvernance bancaire</div>
            <div style="display:flex; flex-direction:column; gap:12px; flex:1; justify-content:center;">
                <div style="background:rgba(59,130,246,0.1); border:1px solid rgba(59,130,246,0.25); border-radius:8px; padding:12px;">
                    <div style="font-weight:700; color:#60a5fa; font-size:12px; margin-bottom:4px;">1. Liquidité & Marges</div>
                    <p style="font-size:10.5px; color:#cbd5e1; line-height:1.4;">Ratio de transformation de 60.4% offrant un potentiel de crédit important sous réserve de la maîtrise du risque.</p>
                </div>

                <div style="background:rgba(16,185,129,0.1); border:1px solid rgba(16,185,129,0.25); border-radius:8px; padding:12px;">
                    <div style="font-weight:700; color:#34d399; font-size:12px; margin-bottom:4px;">2. Efficacité Opérationnelle</div>
                    <p style="font-size:10.5px; color:#cbd5e1; line-height:1.4;">Les banques privées conservent un avantage de rentabilité (RoE 14.6% vs 11.4%) malgré un réseau d'agences réduit.</p>
                </div>

                <div style="background:rgba(168,85,247,0.1); border:1px solid rgba(168,85,247,0.25); border-radius:8px; padding:12px;">
                    <div style="font-weight:700; color:#c084fc; font-size:12px; margin-bottom:4px;">3. Traçabilité Analytique</div>
                    <p style="font-size:10.5px; color:#cbd5e1; line-height:1.4;">Toutes les alertes sont déterministes et auditables directement vers les états financiers officiels.</p>
                </div>
            </div>
        </div>
    </div>
    """
    return wrap_html(content, "executive")

print("Generating 10 UI Mockups...")

screens = [
    ("data-explorer-hero.webp", build_hero()),
    ("data-explorer-sector.webp", build_sector()),
    ("data-explorer-bank-360.webp", build_bank_360()),
    ("data-explorer-market-share.webp", build_market_share()),
    ("data-explorer-concentration.webp", build_concentration()),
    ("data-explorer-heatmap.webp", build_heatmap()),
    ("data-explorer-matrix.webp", build_matrix()),
    ("data-explorer-outliers.webp", build_outliers()),
    ("data-explorer-dimensions.webp", build_dimensions()),
    ("data-explorer-executive.webp", build_executive()),
]

for filename, html in screens:
    save_rendered_image(html, filename)

print("All 10 UI mockups successfully generated!")
