import subprocess
import os
import tempfile
from PIL import Image

CHROME_PATH = r"C:\Program Files\Google\Chrome\Application\chrome.exe"
OUTPUT_DIR = r"c:\laragon\www\banques2025\public\ui-mockups"
os.makedirs(OUTPUT_DIR, exist_ok=True)

# Common CSS styles for dark dashboard
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
    margin-bottom: 10px;
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
    margin-bottom: 4px;
}
.kpi-value {
    font-size: 24px;
    font-weight: 800;
    color: #ffffff;
    letter-spacing: -0.5px;
}
.kpi-change {
    font-size: 11px;
    font-weight: 600;
    display: flex;
    align-items: center;
    gap: 4px;
    margin-top: 4px;
}
.kpi-change.up { color: #10b981; }
.kpi-change.down { color: #f43f5e; }

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
        # Convert PNG to WebP with high quality
        img = Image.open(temp_png)
        img.save(out_webp, "WEBP", quality=92, method=6)
        print(f"[OK] Generated: {filename} ({os.path.getsize(out_webp)} bytes)")
    finally:
        if os.path.exists(temp_html):
            os.remove(temp_html)
        if os.path.exists(temp_png):
            os.remove(temp_png)

print("Starting UI Mockup Generator...")
