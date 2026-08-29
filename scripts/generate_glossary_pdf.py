#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
ABIX -- Générateur de Livret Méthodologique & Glossaire PDF Premium (FR & EN)
Une fiche par page, rendu institutionnel haute qualité, charte ABIX.
"""

import os
import sys
import json
import shutil
from datetime import datetime

if hasattr(sys.stdout, 'reconfigure'):
    sys.stdout.reconfigure(encoding='utf-8')
if hasattr(sys.stderr, 'reconfigure'):
    sys.stderr.reconfigure(encoding='utf-8')

from reportlab.lib.pagesizes import A4
from reportlab.lib import colors
from reportlab.platypus import (
    SimpleDocTemplate, Paragraph, Spacer, Table, TableStyle,
    PageBreak, KeepTogether, HRFlowable
)
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.lib.units import mm
from reportlab.pdfgen import canvas
from reportlab.lib.enums import TA_LEFT

# -- Répertoires
ROOT_DIR = r"c:\laragon\www\banques2025"
DATA_FILE = os.path.join(ROOT_DIR, "data", "glossary.json")
OUTPUT_DIR = os.path.join(ROOT_DIR, "public", "documents", "glossaire")
ABIX_FRONT_DOCS = r'C:/laragon/www/ABIX/ABIX_front/public/docs/glossaire'
COVERS_DIR = os.path.join(ROOT_DIR, "public", "images", "covers")

PAGE_WIDTH, PAGE_HEIGHT = A4
MARGIN = 16 * mm
CONTENT_W = PAGE_WIDTH - 2 * MARGIN

# -- Palette ABIX
C_NAVY      = colors.HexColor("#0D3B66")
C_NAVY_DARK = colors.HexColor("#081D37")
C_GOLD      = colors.HexColor("#F59E0B")
C_TEAL      = colors.HexColor("#0D9488")
C_BLUE      = colors.HexColor("#2563EB")
C_RED       = colors.HexColor("#DC2626")
C_VIOLET    = colors.HexColor("#7C3AED")
C_WHITE     = colors.white
C_SLATE_100 = colors.HexColor("#F1F5F9")
C_SLATE_200 = colors.HexColor("#E2E8F0")
C_SLATE_400 = colors.HexColor("#94A3B8")
C_SLATE_600 = colors.HexColor("#475569")
C_SLATE_800 = colors.HexColor("#1E293B")
C_SLATE_900 = colors.HexColor("#0F172A")
C_GREEN_50  = colors.HexColor("#F0FDF4")
C_GREEN_200 = colors.HexColor("#BBF7D0")
C_GREEN_800 = colors.HexColor("#065F46")
C_AMBER_50  = colors.HexColor("#FFFBEB")
C_AMBER_200 = colors.HexColor("#FDE68A")
C_AMBER_800 = colors.HexColor("#92400E")
C_BLUE_50   = colors.HexColor("#EFF6FF")
C_BLUE_200  = colors.HexColor("#BFDBFE")

MODULES_I18N = {
    "Allocation d'actifs": {"fr": "Allocation d'actifs", "en": "Asset Allocation"},
    "Baromètre E-Banking": {"fr": "Baromètre E-Banking", "en": "E-Banking Barometer"},
    "Benchmarks & Quartiles": {"fr": "Benchmarks & Quartiles", "en": "Benchmarks & Quartiles"},
    "Classements": {"fr": "Classements", "en": "Rankings"},
    "Classements Digitaux": {"fr": "Classements Digitaux", "en": "Digital Rankings"},
    "Comparateur": {"fr": "Comparateur", "en": "Comparator"},
    "Concentration": {"fr": "Concentration", "en": "Concentration"},
    "Concentration & Concurrence": {"fr": "Concentration & Concurrence", "en": "Concentration & Competition"},
    "Distribution & Boxplots": {"fr": "Distribution & Boxplots", "en": "Distribution & Boxplots"},
    "Distribution Sectorielle": {"fr": "Distribution Sectorielle", "en": "Sector Distribution"},
    "Executive Dashboard": {"fr": "Executive Dashboard", "en": "Executive Dashboard"},
    "Executive Summary": {"fr": "Executive Summary", "en": "Executive Summary"},
    "Executive V2": {"fr": "Executive V2", "en": "Executive V2"},
    "Fiche Prudentielle": {"fr": "Fiche Prudentielle", "en": "Prudential Profile"},
    "Glossaire pédagogique": {"fr": "Glossaire pédagogique", "en": "Educational Glossary"},
    "Heatmaps": {"fr": "Heatmaps", "en": "Heatmaps"},
    "Historique": {"fr": "Historique", "en": "Historical Trends"},
    "Historique Pluriannuel": {"fr": "Historique Pluriannuel", "en": "Multi-Year History"},
    "Insights & Alertes": {"fr": "Insights & Alertes", "en": "Insights & Alerts"},
    "Lab Méthodologique": {"fr": "Lab Méthodologique", "en": "Methodology Lab"},
    "Laboratoire méthodologique": {"fr": "Laboratoire méthodologique", "en": "Methodology Lab"},
    "Matrice 4 Quadrants": {"fr": "Matrice 4 Quadrants", "en": "4-Quadrant Matrix"},
    "Matrice Rentabilité vs Risque": {"fr": "Matrice Rentabilité vs Risque", "en": "Profitability vs Risk Matrix"},
    "Matrice de Corrélation": {"fr": "Matrice de Corrélation", "en": "Correlation Matrix"},
    "Nuage de Points (Scatter Plots)": {"fr": "Nuage de Points (Scatter Plots)", "en": "Scatter Plots"},
    "Outliers & Détection d'Anomalies": {"fr": "Outliers & Détection d'Anomalies", "en": "Outliers & Anomaly Detection"},
    "Parts de Marché": {"fr": "Parts de Marché", "en": "Market Shares"},
    "Parts de marché": {"fr": "Parts de marché", "en": "Market Shares"},
    "Profil Banque": {"fr": "Profil Banque", "en": "Bank Profile"},
    "Profil Banque (Synthèse)": {"fr": "Profil Banque (Synthèse)", "en": "Bank Profile (Summary)"},
    "Profil Banque (Volet Digital)": {"fr": "Profil Banque (Volet Digital)", "en": "Bank Profile (Digital Section)"},
    "Profils Multidimensionnels": {"fr": "Profils Multidimensionnels", "en": "Multidimensional Profiles"},
    "Public vs Privé": {"fr": "Public vs Privé", "en": "Public vs Private"},
    "Scanning Déterministe": {"fr": "Scanning Déterministe", "en": "Deterministic Scanning"},
    "Scores ABIX": {"fr": "Scores ABIX", "en": "ABIX Scores"},
    "Scores ABIX (4D)": {"fr": "Scores ABIX (4D)", "en": "ABIX Scores (4D)"},
    "Scores ABIX (Dynamique & Croissance)": {"fr": "Scores ABIX (Dynamique & Croissance)", "en": "ABIX Scores (Dynamic & Growth)"},
    "Scores ABIX (Dynamique)": {"fr": "Scores ABIX (Dynamique)", "en": "ABIX Scores (Dynamic)"},
    "Scores ABIX (Efficience & Risque)": {"fr": "Scores ABIX (Efficience & Risque)", "en": "ABIX Scores (Efficiency & Risk)"},
    "Scores ABIX (Efficience)": {"fr": "Scores ABIX (Efficience)", "en": "ABIX Scores (Efficiency)"},
    "Scores ABIX (Rentabilité)": {"fr": "Scores ABIX (Rentabilité)", "en": "ABIX Scores (Profitability)"},
    "Scores ABIX (Risque)": {"fr": "Scores ABIX (Risque)", "en": "ABIX Scores (Risk)"},
    "Scores ABIX (Solidité financière)": {"fr": "Scores ABIX (Solidité financière)", "en": "ABIX Scores (Financial Strength)"},
    "Scores ABIX (Solvabilité)": {"fr": "Scores ABIX (Solvabilité)", "en": "ABIX Scores (Solvency)"},
    "Séries Temporelles": {"fr": "Séries Temporelles", "en": "Time Series"},
    "Tous modules": {"fr": "Tous modules", "en": "All Modules"},
    "Vue Secteur": {"fr": "Vue Secteur", "en": "Sector View"}
}

def format_acronym_display(acronym, lang):
    if not acronym:
        return ""
    if lang == "en":
        if acronym in ["Effectifs", "Agences", "EHB Donnés", "EHB Reçus", "Autres / PNB", "Réf. statut", "PNB/Effectif", "BT / bilan", "Commissions / PNB", "MNI / PNB"]:
            return f"code: {acronym}"
    return acronym

def get_styles():
    return {
        'SectionLabel': ParagraphStyle('SectionLabel',
            fontName='Helvetica-Bold', fontSize=7.5, leading=9,
            textColor=C_SLATE_400, spaceBefore=0, spaceAfter=2),
        'TermName': ParagraphStyle('TermName',
            fontName='Helvetica-Bold', fontSize=17, leading=22, textColor=C_WHITE, spaceAfter=2),
        'TermAliases': ParagraphStyle('TermAliases',
            fontName='Helvetica-Oblique', fontSize=8.5, leading=12,
            textColor=colors.HexColor("#94A3B8")),
        'ShortDef': ParagraphStyle('ShortDef',
            fontName='Helvetica-Bold', fontSize=9.5, leading=14, textColor=C_SLATE_800, spaceAfter=0),
        'DetailedDef': ParagraphStyle('DetailedDef',
            fontName='Helvetica', fontSize=8.5, leading=13, textColor=C_SLATE_600, spaceAfter=0),
        'FormulaText': ParagraphStyle('FormulaText',
            fontName='Courier-Bold', fontSize=8.5, leading=12,
            textColor=colors.HexColor("#34D399")),
        'InterpText': ParagraphStyle('InterpText',
            fontName='Helvetica', fontSize=8.5, leading=13, textColor=C_GREEN_800),
        'ExampleText': ParagraphStyle('ExampleText',
            fontName='Helvetica', fontSize=8.5, leading=13, textColor=C_AMBER_800),
        'ThreshRegText': ParagraphStyle('ThreshRegText',
            fontName='Helvetica', fontSize=8.5, leading=13, textColor=C_RED),
        'ThreshAbixText': ParagraphStyle('ThreshAbixText',
            fontName='Helvetica', fontSize=8.5, leading=13, textColor=C_BLUE),
        'ModulesText': ParagraphStyle('ModulesText',
            fontName='Helvetica', fontSize=8, leading=11, textColor=C_SLATE_600),
        'TOCCatName': ParagraphStyle('TOCCatName',
            fontName='Helvetica-Bold', fontSize=10, leading=14, textColor=C_NAVY),
        'TOCTermName': ParagraphStyle('TOCTermName',
            fontName='Helvetica', fontSize=8.5, leading=13, textColor=C_SLATE_600),
    }


class ABIXCanvas(canvas.Canvas):
    def __init__(self, *args, **kwargs):
        self.lang = kwargs.pop("lang", "fr")
        self.cover_image = kwargs.pop("cover_image", None)
        super().__init__(*args, **kwargs)
        self._saved_page_states = []

    def showPage(self):
        self._saved_page_states.append(dict(self.__dict__))
        self._startPage()

    def save(self):
        total = len(self._saved_page_states)
        for i, state in enumerate(self._saved_page_states):
            self.__dict__.update(state)
            if i == 0:
                if self.cover_image and os.path.exists(self.cover_image):
                    self.drawImage(self.cover_image, 0, 0, width=PAGE_WIDTH, height=PAGE_HEIGHT)
            else:
                self._draw_decorations(i + 1, total)
            super().showPage()
        super().save()

    def _draw_decorations(self, page_num, total):
        self.saveState()
        # Header band
        self.setFillColor(C_NAVY)
        self.rect(0, PAGE_HEIGHT - 11*mm, PAGE_WIDTH, 11*mm, fill=1, stroke=0)
        self.setFont("Helvetica-Bold", 7.5)
        self.setFillColor(C_WHITE)
        title = ("GLOSSAIRE BANCAIRE & FINANCIER \u2014 ABIX" if self.lang == "fr"
                 else "BANKING & FINANCIAL GLOSSARY \u2014 ABIX")
        self.drawString(MARGIN, PAGE_HEIGHT - 7*mm, title)
        self.setFont("Helvetica", 7.5)
        self.setFillColor(colors.HexColor("#93C5FD"))
        edition_str = "Édition 2025/2026" if self.lang == "fr" else "Edition 2025/2026"
        self.drawRightString(PAGE_WIDTH - MARGIN, PAGE_HEIGHT - 7*mm, edition_str)
        
        # Footer
        self.setStrokeColor(C_SLATE_200)
        self.setLineWidth(0.4)
        self.line(MARGIN, 13*mm, PAGE_WIDTH - MARGIN, 13*mm)
        self.setFont("Helvetica", 7)
        self.setFillColor(C_SLATE_400)
        footer = ("© 2025–2026 ABIX — Tadjeddine & Partners. Tous droits réservés." if self.lang == "fr"
                  else "© 2025–2026 ABIX — Tadjeddine & Partners. All rights reserved.")
        self.drawString(MARGIN, 9*mm, footer)
        self.setFont("Helvetica-Bold", 7.5)
        self.setFillColor(C_NAVY)
        self.drawRightString(PAGE_WIDTH - MARGIN, 9*mm, f"Page {page_num} / {total}")
        self.restoreState()


def make_box(content_list, bg, border, pad_top=6, pad_bot=6, pad_lr=10, width=None):
    w = width or CONTENT_W
    t = Table([[content_list]], colWidths=[w])
    t.setStyle(TableStyle([
        ('BACKGROUND', (0, 0), (-1, -1), bg),
        ('BOX', (0, 0), (-1, -1), 0.6, border),
        ('TOPPADDING', (0, 0), (-1, -1), pad_top),
        ('BOTTOMPADDING', (0, 0), (-1, -1), pad_bot),
        ('LEFTPADDING', (0, 0), (-1, -1), pad_lr),
        ('RIGHTPADDING', (0, 0), (-1, -1), pad_lr),
        ('VALIGN', (0, 0), (-1, -1), 'TOP'),
    ]))
    return t


def perf_info(higher_b, perf_dir, lang):
    if higher_b is True or perf_dir == "higher_is_better":
        return (("▲  Plus élevé généralement favorable" if lang == "fr"
                 else "▲  Higher generally better"),
                colors.HexColor("#059669"))
    elif higher_b is False or perf_dir == "lower_is_better":
        return (("▼  Plus faible généralement favorable" if lang == "fr"
                 else "▼  Lower generally better"),
                colors.HexColor("#D97706"))
    else:
        return (("◆  Interprétation contextuelle" if lang == "fr"
                 else "◆  Contextual interpretation"),
                colors.HexColor("#475569"))


def thresh_info(thresh_type, lang):
    m = {
        "REGULATORY":         ("Norme Réglementaire" if lang == "fr" else "Regulatory Standard", "#DC2626"),
        "ABIX_BENCHMARK":     ("Benchmark ABIX", "#2563EB"),
        "ACADEMIC_REFERENCE": ("Réf. Académique" if lang == "fr" else "Academic Reference", "#7C3AED"),
        "MARKET_REFERENCE":   ("Pratique Marché" if lang == "fr" else "Market Reference", "#0D9488"),
    }
    pair = m.get(thresh_type)
    return (pair[0], pair[1]) if pair else (None, None)


def build_toc(story, entries, categories, lang, styles):
    story.append(Paragraph("SOMMAIRE" if lang == "fr" else "TABLE OF CONTENTS",
        ParagraphStyle('TOCTitle', fontName='Helvetica-Bold', fontSize=18,
                       leading=24, textColor=C_NAVY, spaceAfter=4)))
    story.append(HRFlowable(width=CONTENT_W, thickness=1.5, color=C_GOLD, spaceBefore=4, spaceAfter=10))
    by_cat = {}
    for e in entries:
        by_cat.setdefault(e.get("category", "other"), []).append(e)
    for cat_id, cat_data in categories.items():
        cat_name = (cat_data.get("name") or {}).get(lang) or (cat_data.get("name") or {}).get("fr", cat_id)
        cat_terms = by_cat.get(cat_id, [])
        if not cat_terms:
            continue
        story.append(Paragraph(f"<b>{cat_name}</b>  <font color='#94A3B8'>({len(cat_terms)})</font>",
                                styles['TOCCatName']))
        terms_str = "  ·  ".join([
            ((e.get("term") or {}).get(lang) or (e.get("term") or {}).get("fr", "?"))
            + (f" ({format_acronym_display(e['acronym'], lang)})" if e.get("acronym") else "")
            for e in cat_terms
        ])
        story.append(Paragraph(terms_str, styles['TOCTermName']))
        story.append(Spacer(1, 4*mm))
    story.append(PageBreak())


def build_term_card(item, lang, styles, cat_name, terms_by_id):
    blocks = []
    term_str  = (item.get("term") or {}).get(lang) or (item.get("term") or {}).get("fr", "")
    acronym_raw = item.get("acronym", "") or ""
    acronym   = format_acronym_display(acronym_raw, lang)
    aliases_d = item.get("aliases") or {}
    aliases   = aliases_d.get(lang) or aliases_d.get("fr") or []
    short_def = (item.get("short_definition") or {}).get(lang) or (item.get("short_definition") or {}).get("fr", "")
    detailed  = (item.get("detailed_definition") or {}).get(lang) or (item.get("detailed_definition") or {}).get("fr", "")
    
    # Formule multilingue
    formula_obj = item.get("formula")
    if isinstance(formula_obj, dict):
        formula = formula_obj.get(lang) or formula_obj.get("fr", "")
    else:
        formula = formula_obj or ""

    interp    = (item.get("interpretation") or {}).get(lang) or (item.get("interpretation") or {}).get("fr", "")
    example   = (item.get("example") or {}).get(lang) or (item.get("example") or {}).get("fr", "")
    
    # Unité multilingue
    unit_obj = item.get("unit")
    if isinstance(unit_obj, dict):
        unit = unit_obj.get(lang) or unit_obj.get("fr", "")
    else:
        unit = unit_obj or ""

    modules   = item.get("modules") or []
    related   = item.get("related_terms") or []
    higher_b  = item.get("higher_is_better")
    perf_dir  = item.get("performance_direction") or "neutral"
    thresh_t  = item.get("threshold_type") or "NONE"
    
    # Seuils & Benchmarks multilingues
    reg_thresh_obj = item.get("regulatory_threshold")
    if isinstance(reg_thresh_obj, dict):
        reg_thresh = reg_thresh_obj.get(lang) or reg_thresh_obj.get("fr", "")
    else:
        reg_thresh = reg_thresh_obj or ""

    abix_bench_obj = item.get("abix_benchmark")
    if isinstance(abix_bench_obj, dict):
        abix_bench = abix_bench_obj.get(lang) or abix_bench_obj.get("fr", "")
    else:
        abix_bench = abix_bench_obj or ""

    perf_txt, perf_fg = perf_info(higher_b, perf_dir, lang)
    thresh_lbl, thresh_col = thresh_info(thresh_t, lang)

    # Badge line
    badge_parts = [f"<font color='#93C5FD'><b>{cat_name.upper()}</b></font>"]
    if thresh_lbl:
        badge_parts.append(f"<font color='{thresh_col}'><b>{thresh_lbl}</b></font>")
    if unit:
        badge_parts.append(f"<font color='#CBD5E1'>{'Unité :' if lang == 'fr' else 'Unit:'} {unit}</font>")

    header_inner = [
        Paragraph("  ·  ".join(badge_parts),
                  ParagraphStyle('hdr_meta', fontName='Helvetica', fontSize=8,
                                 leading=11, textColor=C_WHITE)),
        Spacer(1, 3*mm),
        Paragraph(f"<b>{term_str}</b>" + (f"  <font color='#34D399'>({acronym})</font>" if acronym else ""),
                  styles['TermName']),
    ]
    if aliases:
        header_inner.append(Paragraph(
            ("Alias : " if lang == "fr" else "Aliases: ") + ", ".join(aliases),
            styles['TermAliases']))
    header_inner.append(Spacer(1, 4*mm))
    header_inner.append(Paragraph(perf_txt,
        ParagraphStyle('perf', fontName='Helvetica-Bold', fontSize=8.5, leading=11, textColor=perf_fg)))

    hdr_t = Table([[header_inner]], colWidths=[CONTENT_W])
    hdr_t.setStyle(TableStyle([
        ('BACKGROUND', (0, 0), (-1, -1), C_NAVY),
        ('LEFTPADDING', (0, 0), (-1, -1), 12),
        ('RIGHTPADDING', (0, 0), (-1, -1), 12),
        ('TOPPADDING', (0, 0), (-1, -1), 10),
        ('BOTTOMPADDING', (0, 0), (-1, -1), 10),
        ('VALIGN', (0, 0), (-1, -1), 'TOP'),
    ]))
    blocks.append(hdr_t)
    blocks.append(Spacer(1, 3*mm))

    # Def synthétique
    if short_def:
        blocks.append(Paragraph(("DÉFINITION SYNTHÉTIQUE" if lang == "fr" else "SUMMARY DEFINITION"),
                                 styles['SectionLabel']))
        blocks.append(make_box([Paragraph(short_def, styles['ShortDef'])],
                                C_SLATE_100, C_SLATE_200, pad_top=8, pad_bot=8, pad_lr=10))
        blocks.append(Spacer(1, 2.5*mm))

    # Def détaillée
    if detailed:
        blocks.append(Paragraph(("EXPLICATION DÉTAILLÉE" if lang == "fr" else "DETAILED EXPLANATION"),
                                 styles['SectionLabel']))
        blocks.append(make_box([Paragraph(detailed, styles['DetailedDef'])],
                                C_WHITE, C_SLATE_200, pad_top=6, pad_bot=6, pad_lr=10))
        blocks.append(Spacer(1, 2.5*mm))

    # Formule
    if formula:
        blocks.append(Paragraph(("FORMULE DE CALCUL" if lang == "fr" else "CALCULATION FORMULA"),
                                 styles['SectionLabel']))
        blocks.append(make_box([Paragraph(formula, styles['FormulaText'])],
                                C_SLATE_900, colors.HexColor("#334155"),
                                pad_top=8, pad_bot=8, pad_lr=10))
        blocks.append(Spacer(1, 2.5*mm))

    # Interprétation
    if interp:
        blocks.append(Paragraph(("COMMENT INTERPRÉTER ?" if lang == "fr" else "HOW TO INTERPRET?"),
                                 styles['SectionLabel']))
        blocks.append(make_box([Paragraph(interp, styles['InterpText'])],
                                C_GREEN_50, C_GREEN_200, pad_top=7, pad_bot=7, pad_lr=10))
        blocks.append(Spacer(1, 2.5*mm))

    # Seuils & Benchmarks
    if reg_thresh or abix_bench:
        blocks.append(Paragraph(("CLASSIFICATION & SEUILS" if lang == "fr" else "CLASSIFICATION & THRESHOLDS"),
                                 styles['SectionLabel']))
        thresh_rows = []
        if reg_thresh:
            thresh_rows.append(Paragraph(
                f"<font color='#DC2626'><b>{'Cadre Réglementaire Obligatoire' if lang == 'fr' else 'Mandatory Regulatory Framework'} :</b></font>  {reg_thresh}",
                styles['ThreshRegText']))
        if abix_bench:
            if thresh_rows:
                thresh_rows.append(Spacer(1, 3*mm))
            thresh_rows.append(Paragraph(
                f"<font color='#2563EB'><b>{'Benchmark & Repère ABIX' if lang == 'fr' else 'ABIX Comfort Benchmark'} :</b></font>  {abix_bench}",
                styles['ThreshAbixText']))
        blocks.append(make_box(thresh_rows, colors.HexColor("#F8FAFC"), C_SLATE_200,
                                pad_top=7, pad_bot=7, pad_lr=10))
        blocks.append(Spacer(1, 2.5*mm))

    # Exemple
    if example:
        lbl = ("EXEMPLE PÉDAGOGIQUE" if lang == "fr" else "PEDAGOGICAL EXAMPLE")
        blocks.append(Paragraph(lbl, styles['SectionLabel']))
        blocks.append(make_box([Paragraph(example, styles['ExampleText'])],
                                C_AMBER_50, C_AMBER_200, pad_top=7, pad_bot=7, pad_lr=10))
        blocks.append(Spacer(1, 2.5*mm))

    # Modules & Related
    translated_modules = [MODULES_I18N.get(m, {}).get(lang, m) for m in modules]
    translated_related = []
    for r in related:
        if r in terms_by_id:
            r_item = terms_by_id[r]
            r_t = (r_item.get("term") or {}).get(lang) or (r_item.get("term") or {}).get("fr", r)
            if r_item.get("acronym"):
                r_t += f" ({format_acronym_display(r_item['acronym'], lang)})"
            translated_related.append(r_t)
        else:
            translated_related.append(r)

    footer_cols = []
    if translated_modules:
        col_w = (CONTENT_W / 2 - 2*mm) if translated_related else CONTENT_W
        footer_cols.append([
            Paragraph("MODULES ABIX" if lang == "fr" else "ABIX MODULES", styles['SectionLabel']),
            make_box([Paragraph(", ".join(translated_modules), styles['ModulesText'])],
                      C_SLATE_100, C_SLATE_200, pad_top=5, pad_bot=5, pad_lr=8, width=col_w),
        ])
    if translated_related:
        col_w = (CONTENT_W / 2 - 2*mm) if translated_modules else CONTENT_W
        footer_cols.append([
            Paragraph("NOTIONS CONNEXES" if lang == "fr" else "RELATED CONCEPTS", styles['SectionLabel']),
            make_box([Paragraph(", ".join(translated_related), styles['ModulesText'])],
                      C_SLATE_100, C_SLATE_200, pad_top=5, pad_bot=5, pad_lr=8, width=col_w),
        ])
    if len(footer_cols) == 2:
        col_w = CONTENT_W / 2 - 1*mm
        ft = Table([footer_cols], colWidths=[col_w, col_w])
        ft.setStyle(TableStyle([
            ('VALIGN', (0, 0), (-1, -1), 'TOP'),
            ('LEFTPADDING', (0, 0), (-1, -1), 0),
            ('RIGHTPADDING', (0, 0), (-1, -1), 0),
            ('TOPPADDING', (0, 0), (-1, -1), 0),
            ('BOTTOMPADDING', (0, 0), (-1, -1), 0),
        ]))
        blocks.append(ft)
    elif len(footer_cols) == 1:
        for el in footer_cols[0]:
            blocks.append(el)

    return blocks


def generate_pdf(lang="fr"):
    os.makedirs(OUTPUT_DIR, exist_ok=True)
    filename = ("glossaire-bancaire-financier-abix-fr.pdf" if lang == "fr"
                else "abix-banking-financial-glossary-en.pdf")
    pdf_path = os.path.join(OUTPUT_DIR, filename)
    cover_image = os.path.join(COVERS_DIR, f"cover_{lang}.jpg")

    with open(DATA_FILE, "r", encoding="utf-8") as f:
        data = json.load(f)

    entries    = data.get("terms") or data.get("entries", [])
    categories = data.get("categories", {})
    terms_by_id = {it["id"]: it for it in entries}
    styles     = get_styles()
    story      = []

    # Page 1: Empty PageBreak (Canvas will draw full bleed cover on page 1)
    story.append(Spacer(1, 1))
    story.append(PageBreak())

    # Page 2: Sommaire / TOC
    build_toc(story, entries, categories, lang, styles)

    by_cat = {}
    for e in entries:
        by_cat.setdefault(e.get("category", "other"), []).append(e)

    for cat_id, cat_data in categories.items():
        cat_terms = by_cat.get(cat_id, [])
        if not cat_terms:
            continue
        cat_name = (cat_data.get("name") or {}).get(lang) or (cat_data.get("name") or {}).get("fr", cat_id)

        # Page titre de catégorie
        cat_inner = [
            Spacer(1, 28*mm),
            Paragraph("CATÉGORIE" if lang == "fr" else "CATEGORY",
                ParagraphStyle('catlbl', fontName='Helvetica-Bold', fontSize=9, leading=12,
                               textColor=colors.HexColor("#93C5FD"), spaceAfter=4)),
            Paragraph(cat_name,
                ParagraphStyle('catname', fontName='Helvetica-Bold', fontSize=24, leading=30,
                               textColor=C_WHITE, spaceAfter=8)),
            HRFlowable(width=CONTENT_W - 28, thickness=1.5, color=C_GOLD, spaceBefore=0, spaceAfter=8),
            Paragraph(f"{len(cat_terms)} {'notions dans cette catégorie' if lang == 'fr' else 'terms in this category'}",
                ParagraphStyle('catcnt', fontName='Helvetica', fontSize=12, leading=16,
                               textColor=colors.HexColor("#CBD5E1"))),
        ]
        cat_t = Table([[cat_inner]], colWidths=[CONTENT_W])
        cat_t.setStyle(TableStyle([
            ('BACKGROUND', (0, 0), (-1, -1), C_NAVY_DARK),
            ('LEFTPADDING', (0, 0), (-1, -1), 14),
            ('RIGHTPADDING', (0, 0), (-1, -1), 14),
            ('TOPPADDING', (0, 0), (-1, -1), 0),
            ('BOTTOMPADDING', (0, 0), (-1, -1), 60),
        ]))
        story.append(cat_t)
        story.append(PageBreak())

        for item in cat_terms:
            card = build_term_card(item, lang, styles, cat_name, terms_by_id)
            story.append(KeepTogether(card[:4] if len(card) > 4 else card))
            for block in (card[4:] if len(card) > 4 else []):
                story.append(block)
            story.append(PageBreak())

    def make_canvas(*args, **kwargs):
        kwargs["lang"] = lang
        kwargs["cover_image"] = cover_image
        return ABIXCanvas(*args, **kwargs)

    doc = SimpleDocTemplate(
        pdf_path, pagesize=A4,
        leftMargin=MARGIN, rightMargin=MARGIN,
        topMargin=14*mm, bottomMargin=16*mm,
    )
    doc.build(story, canvasmaker=make_canvas)
    size = os.path.getsize(pdf_path)
    print(f"[generate_glossary_pdf] OK  {os.path.basename(pdf_path)} ({size:,} octets)")

    if os.path.exists(ABIX_FRONT_DOCS):
        dest = os.path.join(ABIX_FRONT_DOCS, os.path.basename(pdf_path))
        shutil.copy2(pdf_path, dest)

    return pdf_path


if __name__ == "__main__":
    print("--- Génération des livrets PDF Premium du Glossaire ABIX (FR & EN) ---")
    generate_pdf("fr")
    generate_pdf("en")
    print("\nGénération FR & EN terminée avec succès !")
