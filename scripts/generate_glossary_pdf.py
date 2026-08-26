#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
ABIX -- Generateur de Livret Methodologique & Glossaire PDF Premium
Une fiche par page, rendu institutionnel haute qualite, charte ABIX.
"""

import os
import sys
import json
import shutil

if hasattr(sys.stdout, 'reconfigure'):
    sys.stdout.reconfigure(encoding='utf-8')
if hasattr(sys.stderr, 'reconfigure'):
    sys.stderr.reconfigure(encoding='utf-8')

from datetime import datetime
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

# -- Repertoires
ROOT_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
DATA_FILE = os.path.join(ROOT_DIR, "data", "glossary.json")
OUTPUT_DIR = os.path.join(ROOT_DIR, "public", "documents", "glossaire")
ABIX_FRONT_DOCS = r'C:/laragon/www/ABIX/ABIX_front/public/docs/glossaire'

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


def get_styles():
    return {
        'CoverTitle': ParagraphStyle('CoverTitle',
            fontName='Helvetica-Bold', fontSize=28, leading=34, textColor=C_WHITE, spaceAfter=6),
        'CoverSubtitle': ParagraphStyle('CoverSubtitle',
            fontName='Helvetica', fontSize=13, leading=19,
            textColor=colors.HexColor("#93C5FD"), spaceAfter=18),
        'CoverMeta': ParagraphStyle('CoverMeta',
            fontName='Helvetica', fontSize=9, leading=14, textColor=colors.HexColor("#CBD5E1")),
        'CoverBadge': ParagraphStyle('CoverBadge',
            fontName='Helvetica-Bold', fontSize=10, leading=14, textColor=C_GOLD, spaceAfter=10),
        'SectionLabel': ParagraphStyle('SectionLabel',
            fontName='Helvetica-Bold', fontSize=7.5, leading=9,
            textColor=C_SLATE_400, spaceBefore=0, spaceAfter=2),
        'TermName': ParagraphStyle('TermName',
            fontName='Helvetica-Bold', fontSize=18, leading=23, textColor=C_WHITE, spaceAfter=2),
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
        super().__init__(*args, **kwargs)
        self._saved_page_states = []

    def showPage(self):
        self._saved_page_states.append(dict(self.__dict__))
        self._startPage()

    def save(self):
        total = len(self._saved_page_states)
        for i, state in enumerate(self._saved_page_states):
            self.__dict__.update(state)
            if i > 0:
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
        title = ("ABIX DATA EXPLORER \u2014 REFERENTIEL METHODOLOGIQUE & GLOSSAIRE" if self.lang == "fr"
                 else "ABIX DATA EXPLORER \u2014 METHODOLOGICAL GLOSSARY & REFERENCE GUIDE")
        self.drawString(MARGIN, PAGE_HEIGHT - 7*mm, title)
        self.setFont("Helvetica", 7.5)
        self.setFillColor(colors.HexColor("#93C5FD"))
        self.drawRightString(PAGE_WIDTH - MARGIN, PAGE_HEIGHT - 7*mm, "Edition 2025/2026")
        # Footer
        self.setStrokeColor(C_SLATE_200)
        self.setLineWidth(0.4)
        self.line(MARGIN, 13*mm, PAGE_WIDTH - MARGIN, 13*mm)
        self.setFont("Helvetica", 7)
        self.setFillColor(C_SLATE_400)
        footer = ("(c) 2025 ABIX \u2014 Tadjeddine & Partners. Tous droits reserves." if self.lang == "fr"
                  else "(c) 2025 ABIX \u2014 Tadjeddine & Partners. All rights reserved.")
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
        return (("\u25b2  Plus eleve generalement favorable" if lang == "fr"
                 else "\u25b2  Higher generally better"),
                colors.HexColor("#059669"))
    elif higher_b is False or perf_dir == "lower_is_better":
        return (("\u25bc  Plus faible generalement favorable" if lang == "fr"
                 else "\u25bc  Lower generally better"),
                colors.HexColor("#D97706"))
    else:
        return (("\u25c6  Interpretation contextuelle" if lang == "fr"
                 else "\u25c6  Contextual interpretation"),
                colors.HexColor("#475569"))


def thresh_info(thresh_type, lang):
    m = {
        "REGULATORY":         ("Norme Reglementaire" if lang == "fr" else "Regulatory Standard", "#DC2626"),
        "ABIX_BENCHMARK":     ("Benchmark ABIX", "#2563EB"),
        "ACADEMIC_REFERENCE": ("Ref. Academique" if lang == "fr" else "Academic Reference", "#7C3AED"),
        "MARKET_REFERENCE":   ("Pratique Marche" if lang == "fr" else "Market Reference", "#0D9488"),
    }
    pair = m.get(thresh_type)
    return (pair[0], pair[1]) if pair else (None, None)


def build_cover(story, lang, n_entries, styles):
    cover_inner = [
        Spacer(1, 22*mm),
        Paragraph("REFERENTIEL METHODOLOGIQUE OFFICIEL" if lang == "fr"
                  else "OFFICIAL METHODOLOGICAL REFERENCE", styles['CoverBadge']),
        Paragraph("Glossaire Financier &amp; Bancaire" if lang == "fr"
                  else "Banking &amp; Financial Glossary", styles['CoverTitle']),
        Paragraph(
            ("ABIX Data Explorer \u2014 Algorithmes, Ratios, Indicateurs &amp; Concepts Metiers"
             "<br/>du Secteur Bancaire Algerien" if lang == "fr" else
             "ABIX Data Explorer \u2014 Financial Metrics, Ratios, Algorithms &amp; Banking Concepts in Algeria"),
            styles['CoverSubtitle']),
        HRFlowable(width=CONTENT_W - 28, thickness=1.5, color=C_GOLD, spaceBefore=6, spaceAfter=16),
        Paragraph(
            (f"Ce document constitue le referentiel methodologique exhaustif des <b>{n_entries} notions</b> "
             f"mises en oeuvre dans la plateforme ABIX Data Explorer, couvrant les banques commerciales "
             f"actives en Algerie. Chaque fiche documente la methode reellement utilisee par le moteur de calcul ABIX."
             if lang == "fr" else
             f"This document provides the comprehensive methodological reference for all <b>{n_entries} concepts</b> "
             f"implemented in the ABIX Data Explorer platform across commercial banks in Algeria."),
            styles['CoverMeta']),
        Spacer(1, 12*mm),
        Table([
            [Paragraph(f"<b>{'Perimetre :' if lang == 'fr' else 'Scope:'}</b> 21 banques commerciales algeriennes",
                       styles['CoverMeta']),
             Paragraph(f"<b>{'Notions :' if lang == 'fr' else 'Terms:'}</b> {n_entries}",
                       styles['CoverMeta'])],
            [Paragraph(f"<b>{'Edition :' if lang == 'fr' else 'Edition:'}</b> 2025 / 2026",
                       styles['CoverMeta']),
             Paragraph(f"<b>{'Genere :' if lang == 'fr' else 'Generated:'}</b> {datetime.now().strftime('%d/%m/%Y')}",
                       styles['CoverMeta'])],
        ], colWidths=[CONTENT_W / 2, CONTENT_W / 2]),
    ]
    cover_t = Table([[cover_inner]], colWidths=[CONTENT_W])
    cover_t.setStyle(TableStyle([
        ('BACKGROUND', (0, 0), (-1, -1), C_NAVY_DARK),
        ('LEFTPADDING', (0, 0), (-1, -1), 14),
        ('RIGHTPADDING', (0, 0), (-1, -1), 14),
        ('TOPPADDING', (0, 0), (-1, -1), 0),
        ('BOTTOMPADDING', (0, 0), (-1, -1), 30),
    ]))
    story.append(cover_t)
    story.append(PageBreak())


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
        terms_str = "  \u00b7  ".join([
            ((e.get("term") or {}).get(lang) or (e.get("term") or {}).get("fr", "?"))
            + (f" ({e['acronym']})" if e.get("acronym") else "")
            for e in cat_terms
        ])
        story.append(Paragraph(terms_str, styles['TOCTermName']))
        story.append(Spacer(1, 4*mm))
    story.append(PageBreak())


def build_term_card(item, lang, styles, cat_name):
    blocks = []
    term_str  = (item.get("term") or {}).get(lang) or (item.get("term") or {}).get("fr", "")
    acronym   = item.get("acronym", "") or ""
    aliases_d = item.get("aliases") or {}
    aliases   = aliases_d.get(lang) or aliases_d.get("fr") or []
    short_def = (item.get("short_definition") or {}).get(lang) or (item.get("short_definition") or {}).get("fr", "")
    detailed  = (item.get("detailed_definition") or {}).get(lang) or (item.get("detailed_definition") or {}).get("fr", "")
    formula   = item.get("formula") or ""
    interp    = (item.get("interpretation") or {}).get(lang) or (item.get("interpretation") or {}).get("fr", "")
    example   = (item.get("example") or {}).get(lang) or (item.get("example") or {}).get("fr", "")
    vintage   = item.get("example_vintage") or ""
    unit      = item.get("unit") or ""
    modules   = item.get("modules") or []
    related   = item.get("related_terms") or []
    higher_b  = item.get("higher_is_better")
    perf_dir  = item.get("performance_direction") or "neutral"
    thresh_t  = item.get("threshold_type") or "NONE"
    reg_thresh= item.get("regulatory_threshold") or ""
    abix_bench= item.get("abix_benchmark") or ""

    perf_txt, perf_fg = perf_info(higher_b, perf_dir, lang)
    thresh_lbl, thresh_col = thresh_info(thresh_t, lang)

    # Badge line
    badge_parts = [f"<font color='#93C5FD'><b>{cat_name.upper()}</b></font>"]
    if thresh_lbl:
        badge_parts.append(f"<font color='{thresh_col}'><b>{thresh_lbl}</b></font>")
    if unit:
        badge_parts.append(f"<font color='#CBD5E1'>{'Unite :' if lang == 'fr' else 'Unit:'} {unit}</font>")

    header_inner = [
        Paragraph("  \u00b7  ".join(badge_parts),
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
        blocks.append(Paragraph(("DEFINITION SYNTHETIQUE" if lang == "fr" else "SUMMARY DEFINITION"),
                                 styles['SectionLabel']))
        blocks.append(make_box([Paragraph(short_def, styles['ShortDef'])],
                                C_SLATE_100, C_SLATE_200, pad_top=8, pad_bot=8, pad_lr=10))
        blocks.append(Spacer(1, 2.5*mm))

    # Def détaillée
    if detailed:
        blocks.append(Paragraph(("EXPLICATION DETAILLEE" if lang == "fr" else "DETAILED EXPLANATION"),
                                 styles['SectionLabel']))
        blocks.append(make_box([Paragraph(detailed, styles['DetailedDef'])],
                                C_WHITE, C_SLATE_200, pad_top=6, pad_bot=6, pad_lr=10))
        blocks.append(Spacer(1, 2.5*mm))

    # Formule
    if formula:
        blocks.append(Paragraph(("FORMULE DE CALCUL ABIX" if lang == "fr" else "ABIX CALCULATION FORMULA"),
                                 styles['SectionLabel']))
        blocks.append(make_box([Paragraph(formula, styles['FormulaText'])],
                                C_SLATE_900, colors.HexColor("#334155"),
                                pad_top=8, pad_bot=8, pad_lr=10))
        blocks.append(Spacer(1, 2.5*mm))

    # Interprétation
    if interp:
        blocks.append(Paragraph(("COMMENT INTERPRETER ?" if lang == "fr" else "HOW TO INTERPRET?"),
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
                f"<font color='#DC2626'><b>{'Cadre Reglementaire Obligatoire' if lang == 'fr' else 'Mandatory Regulatory Framework'} :</b></font>  {reg_thresh}",
                styles['ThreshRegText']))
        if abix_bench:
            if thresh_rows:
                thresh_rows.append(Spacer(1, 3*mm))
            thresh_rows.append(Paragraph(
                f"<font color='#2563EB'><b>{'Benchmark &amp; Repere ABIX' if lang == 'fr' else 'ABIX Comfort Benchmark'} :</b></font>  {abix_bench}",
                styles['ThreshAbixText']))
        blocks.append(make_box(thresh_rows, colors.HexColor("#F8FAFC"), C_SLATE_200,
                                pad_top=7, pad_bot=7, pad_lr=10))
        blocks.append(Spacer(1, 2.5*mm))

    # Exemple
    if example:
        lbl = ("EXEMPLE CONCRET" if lang == "fr" else "CONCRETE EXAMPLE")
        if vintage:
            lbl += f"  ({vintage})"
        blocks.append(Paragraph(lbl, styles['SectionLabel']))
        blocks.append(make_box([Paragraph(example, styles['ExampleText'])],
                                C_AMBER_50, C_AMBER_200, pad_top=7, pad_bot=7, pad_lr=10))
        blocks.append(Spacer(1, 2.5*mm))

    # Modules & Related
    footer_cols = []
    if modules:
        col_w = (CONTENT_W / 2 - 2*mm) if related else CONTENT_W
        footer_cols.append([
            Paragraph("MODULES ABIX" if lang == "fr" else "ABIX MODULES", styles['SectionLabel']),
            make_box([Paragraph(", ".join(modules), styles['ModulesText'])],
                      C_SLATE_100, C_SLATE_200, pad_top=5, pad_bot=5, pad_lr=8, width=col_w),
        ])
    if related:
        col_w = (CONTENT_W / 2 - 2*mm) if modules else CONTENT_W
        footer_cols.append([
            Paragraph("NOTIONS CONNEXES" if lang == "fr" else "RELATED TERMS", styles['SectionLabel']),
            make_box([Paragraph(", ".join(related), styles['ModulesText'])],
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
    filename = ("glossaire-abix-banques-algerie-fr.pdf" if lang == "fr"
                else "glossary-abix-algerian-banking-en.pdf")
    pdf_path = os.path.join(OUTPUT_DIR, filename)

    with open(DATA_FILE, "r", encoding="utf-8") as f:
        data = json.load(f)

    entries    = data.get("terms") or data.get("entries", [])
    categories = data.get("categories", {})
    styles     = get_styles()
    story      = []

    build_cover(story, lang, len(entries), styles)
    build_toc(story, entries, categories, lang, styles)

    by_cat = {}
    for e in entries:
        by_cat.setdefault(e.get("category", "other"), []).append(e)

    for cat_id, cat_data in categories.items():
        cat_terms = by_cat.get(cat_id, [])
        if not cat_terms:
            continue
        cat_name = (cat_data.get("name") or {}).get(lang) or (cat_data.get("name") or {}).get("fr", cat_id)

        # Page titre de categorie
        cat_inner = [
            Spacer(1, 28*mm),
            Paragraph("CATEGORIE" if lang == "fr" else "CATEGORY",
                ParagraphStyle('catlbl', fontName='Helvetica-Bold', fontSize=9, leading=12,
                               textColor=colors.HexColor("#93C5FD"), spaceAfter=4)),
            Paragraph(cat_name,
                ParagraphStyle('catname', fontName='Helvetica-Bold', fontSize=24, leading=30,
                               textColor=C_WHITE, spaceAfter=8)),
            HRFlowable(width=CONTENT_W - 28, thickness=1.5, color=C_GOLD, spaceBefore=0, spaceAfter=8),
            Paragraph(f"{len(cat_terms)} {'notions dans cette categorie' if lang == 'fr' else 'terms in this category'}",
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
            card = build_term_card(item, lang, styles, cat_name)
            # Les premiers elements restent ensemble (header + def)
            story.append(KeepTogether(card[:4] if len(card) > 4 else card))
            for block in (card[4:] if len(card) > 4 else []):
                story.append(block)
            story.append(PageBreak())

    def make_canvas(*args, **kwargs):
        kwargs["lang"] = lang
        return ABIXCanvas(*args, **kwargs)

    doc = SimpleDocTemplate(
        pdf_path, pagesize=A4,
        leftMargin=MARGIN, rightMargin=MARGIN,
        topMargin=14*mm, bottomMargin=16*mm,
    )
    doc.build(story, canvasmaker=make_canvas)
    size = os.path.getsize(pdf_path)
    print(f"[generate_glossary_pdf] OK  {os.path.basename(pdf_path)} ({size:,} octets)")
    return pdf_path


if __name__ == "__main__":
    print("--- Generation des livrets PDF Premium du Glossaire ABIX ---")
    generate_pdf("fr")
    generate_pdf("en")
    if os.path.exists(ABIX_FRONT_DOCS):
        for fname in os.listdir(OUTPUT_DIR):
            if fname.endswith(".pdf"):
                shutil.copy2(os.path.join(OUTPUT_DIR, fname),
                             os.path.join(ABIX_FRONT_DOCS, fname))
        print(f"OK  PDFs synchronises vers {ABIX_FRONT_DOCS}")
    print("\nGeneration terminee avec succes !")
