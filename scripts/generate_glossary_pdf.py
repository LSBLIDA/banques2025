#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
ABIX — Générateur de Livret Méthodologique & Glossaire PDF
Génère un document PDF institutionnel A4 multi-pages de haute qualité
pour le Glossaire complet d'ABIX Data Explorer (Versions FR et EN).
"""

import os
import sys
import json

if hasattr(sys.stdout, 'reconfigure'):
    sys.stdout.reconfigure(encoding='utf-8')
if hasattr(sys.stderr, 'reconfigure'):
    sys.stderr.reconfigure(encoding='utf-8')

from datetime import datetime
from reportlab.lib.pagesizes import A4
from reportlab.lib import colors
from reportlab.platypus import (
    SimpleDocTemplate, Paragraph, Spacer, Table, TableStyle, PageBreak, KeepTogether, HRFlowable
)
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.lib.units import mm, cm
from reportlab.pdfgen import canvas
from reportlab.graphics.shapes import Drawing, Rect, Line, Circle, String

# ── Répertoires ─────────────────────────────────────────────────────────────
ROOT_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
DATA_FILE = os.path.join(ROOT_DIR, "data", "glossary.json")
OUTPUT_DIR = os.path.join(ROOT_DIR, "public", "documents", "glossaire")

# ── Couleurs de la charte ABIX ──────────────────────────────────────────────
PRIMARY_NAVY = colors.HexColor("#0D3B66")     # Bleu institutionnel ABIX
NAVY_DARK = colors.HexColor("#081426")        # Fond sombre
BG_CARD = colors.HexColor("#F8FAFC")          # Fond carte gris/bleuté très clair
BORDER_COLOR = colors.HexColor("#E2E8F0")     # Bordure subtile
ACCENT_GOLD = colors.HexColor("#F59E0B")      # Jaune doré
ACCENT_TEAL = colors.HexColor("#0D9488")      # Turquoise
ACCENT_BLUE = colors.HexColor("#2563EB")      # Bleu primaire
TEXT_DARK = colors.HexColor("#0F172A")        # Texte sombre principal
TEXT_MUTED = colors.HexColor("#475569")       # Texte secondaire
TEXT_LIGHT = colors.HexColor("#64748B")       # Texte tertiaire
BADGE_BG = colors.HexColor("#EEF2F6")         # Fond badge
FORMULA_BG = colors.HexColor("#0F172A")       # Fond bloc formule (Dark Slate)
FORMULA_TEXT = colors.HexColor("#34D399")     # Texte vert émeraude formule
INTERP_BG = colors.HexColor("#F0FDF4")        # Fond interprétation (vert clair)
INTERP_BORDER = colors.HexColor("#BBF7D0")
EXAMPLE_BG = colors.HexColor("#FFFBEB")       # Fond exemple (ambre très clair)
EXAMPLE_BORDER = colors.HexColor("#FDE68A")

PAGE_WIDTH, PAGE_HEIGHT = A4

class GlossaryCanvas(canvas.Canvas):
    """Canvas personnalisé avec en-têtes et pieds de page numérotés"""
    def __init__(self, *args, **kwargs):
        self.lang = kwargs.pop("lang", "fr")
        super().__init__(*args, **kwargs)
        self._saved_page_states = []

    def showPage(self):
        self._saved_page_states.append(dict(self.__dict__))
        self._startPage()

    def save(self):
        num_pages = len(self._saved_page_states)
        for i, state in enumerate(self._saved_page_states):
            self.__dict__.update(state)
            # Ne pas afficher en-tête/pied sur la page de couverture (page 1)
            if i > 0:
                self.draw_page_decorations(i + 1, num_pages)
            super().showPage()
        super().save()

    def draw_page_decorations(self, current_page, total_pages):
        self.saveState()
        
        # En-tête (Header)
        self.setStrokeColor(BORDER_COLOR)
        self.setLineWidth(0.5)
        self.line(18*mm, PAGE_HEIGHT - 16*mm, PAGE_WIDTH - 18*mm, PAGE_HEIGHT - 16*mm)
        
        self.setFont("Helvetica-Bold", 8)
        self.setFillColor(PRIMARY_NAVY)
        header_title = "ABIX DATA EXPLORER — RÉFÉRENTIEL MÉTHODOLOGIQUE & GLOSSAIRE" if self.lang == "fr" else "ABIX DATA EXPLORER — METHODOLOGICAL GLOSSARY & REFERENCE GUIDE"
        self.drawString(18*mm, PAGE_HEIGHT - 13*mm, header_title)
        
        self.setFont("Helvetica", 8)
        self.setFillColor(TEXT_LIGHT)
        self.drawRightString(PAGE_WIDTH - 18*mm, PAGE_HEIGHT - 13*mm, "Édition 2025/2026")

        # Pied de page (Footer)
        self.line(18*mm, 15*mm, PAGE_WIDTH - 18*mm, 15*mm)
        
        self.setFont("Helvetica", 7.5)
        self.setFillColor(TEXT_LIGHT)
        footer_text = "© 2025 ABIX — Tadjeddine & Partners. Tous droits réservés. Reproduction et diffusion réglementées." if self.lang == "fr" else "© 2025 ABIX — Tadjeddine & Partners. All rights reserved."
        self.drawString(18*mm, 10*mm, footer_text)
        
        page_str = f"Page {current_page} / {total_pages}"
        self.setFont("Helvetica-Bold", 8)
        self.setFillColor(PRIMARY_NAVY)
        self.drawRightString(PAGE_WIDTH - 18*mm, 10*mm, page_str)

        self.restoreState()


def get_styles():
    """Définit les styles typographiques ReportLab"""
    base_styles = getSampleStyleSheet()
    
    styles = {
        'CoverTitle': ParagraphStyle(
            'CoverTitle',
            fontName='Helvetica-Bold',
            fontSize=26,
            leading=32,
            textColor=TEXT_DARK,
            alignment=0,
            spaceAfter=8
        ),
        'CoverSubtitle': ParagraphStyle(
            'CoverSubtitle',
            fontName='Helvetica',
            fontSize=13,
            leading=18,
            textColor=PRIMARY_NAVY,
            spaceAfter=15
        ),
        'CoverMeta': ParagraphStyle(
            'CoverMeta',
            fontName='Helvetica',
            fontSize=9.5,
            leading=14,
            textColor=TEXT_MUTED,
            spaceAfter=6
        ),
        'CategoryHeader': ParagraphStyle(
            'CategoryHeader',
            fontName='Helvetica-Bold',
            fontSize=15,
            leading=20,
            textColor=PRIMARY_NAVY,
            spaceBefore=14,
            spaceAfter=8,
            keepWithNext=True
        ),
        'TermTitle': ParagraphStyle(
            'TermTitle',
            fontName='Helvetica-Bold',
            fontSize=12,
            leading=15,
            textColor=TEXT_DARK,
            spaceBefore=0,
            spaceAfter=3,
            keepWithNext=True
        ),
        'TermAcronym': ParagraphStyle(
            'TermAcronym',
            fontName='Helvetica-Bold',
            fontSize=9,
            leading=11,
            textColor=ACCENT_TEAL
        ),
        'ShortDef': ParagraphStyle(
            'ShortDef',
            fontName='Helvetica-Bold',
            fontSize=8.5,
            leading=12,
            textColor=TEXT_DARK,
            spaceAfter=4
        ),
        'DetailedDef': ParagraphStyle(
            'DetailedDef',
            fontName='Helvetica',
            fontSize=8,
            leading=11.5,
            textColor=TEXT_MUTED,
            spaceAfter=5
        ),
        'FormulaLabel': ParagraphStyle(
            'FormulaLabel',
            fontName='Helvetica-Bold',
            fontSize=7.5,
            leading=9,
            textColor=TEXT_MUTED
        ),
        'FormulaText': ParagraphStyle(
            'FormulaText',
            fontName='Courier-Bold',
            fontSize=7.5,
            leading=10,
            textColor=FORMULA_TEXT
        ),
        'InterpText': ParagraphStyle(
            'InterpText',
            fontName='Helvetica-Oblique',
            fontSize=7.5,
            leading=10.5,
            textColor=colors.HexColor("#065F46")
        ),
        'ExampleText': ParagraphStyle(
            'ExampleText',
            fontName='Helvetica',
            fontSize=7.5,
            leading=10.5,
            textColor=colors.HexColor("#92400E")
        ),
        'MetaBadge': ParagraphStyle(
            'MetaBadge',
            fontName='Helvetica-Bold',
            fontSize=7,
            leading=8.5,
            textColor=PRIMARY_NAVY
        ),
        'TOCItem': ParagraphStyle(
            'TOCItem',
            fontName='Helvetica',
            fontSize=8.5,
            leading=13,
            textColor=TEXT_DARK
        ),
    }
    return styles


def generate_pdf(lang="fr"):
    """Génère le document PDF pour la langue demandée ('fr' ou 'en')"""
    os.makedirs(OUTPUT_DIR, exist_ok=True)
    filename = "glossaire-abix-banques-algerie-fr.pdf" if lang == "fr" else "glossary-abix-algerian-banking-en.pdf"
    pdf_path = os.path.join(OUTPUT_DIR, filename)

    with open(DATA_FILE, "r", encoding="utf-8") as f:
        data = json.load(f)

    entries = data.get("terms") or data.get("entries", [])
    categories = data.get("categories", {})
    styles = get_styles()
    story = []

    doc = SimpleDocTemplate(
        pdf_path,
        pagesize=A4,
        leftMargin=18*mm,
        rightMargin=18*mm,
        topMargin=20*mm,
        bottomMargin=20*mm
    )

    # ── 1. Page de Couverture Institutionnelle ───────────────────────────────
    story.append(Spacer(1, 15*mm))

    # Badge Supérieur
    badge_label = "RÉFÉRENTIEL MÉTHODOLOGIQUE OFFICIEL" if lang == "fr" else "OFFICIAL METHODOLOGICAL REFERENCE"
    story.append(Paragraph(f"<font color='#0D3B66'><b>{badge_label}</b></font>", styles['MetaBadge']))
    story.append(Spacer(1, 4*mm))

    # Titre Principal
    main_title = "Glossaire Financier & Bancaire" if lang == "fr" else "Banking & Financial Glossary"
    story.append(Paragraph(main_title, styles['CoverTitle']))
    
    sub_title = "ABIX Data Explorer — Algorithmes, Ratios, Indicateurs & Concepts Métiers du Secteur Bancaire Algérien" if lang == "fr" else "ABIX Data Explorer — Financial Metrics, Ratios, Algorithms & Banking Concepts in Algeria"
    story.append(Paragraph(sub_title, styles['CoverSubtitle']))

    story.append(HRFlowable(width="100%", thickness=2, color=ACCENT_GOLD, spaceBefore=4, spaceAfter=14))

    # Bloc de présentation & Métadonnées
    desc_p = "Ce document constitue le référentiel méthodologique exhaustif des notions, agrégats comptables, formules déterministes et méthodes statistiques mis en œuvre dans la plateforme ABIX Data Explorer. Il couvre l'ensemble des 21 banques commerciales actives en Algérie et documente la méthode réellement utilisée pour le calcul et l'interprétation des performances." if lang == "fr" else "This document provides the comprehensive methodological reference for all accounting aggregates, formulas, and statistical methods implemented in the ABIX Data Explorer platform across the 21 commercial banks in Algeria."
    story.append(Paragraph(desc_p, styles['DetailedDef']))
    story.append(Spacer(1, 6*mm))

    meta_table_data = [
        [
            Paragraph("<b>Périmètre :</b> 21 banques commerciales (6 publiques, 15 privées)", styles['CoverMeta']) if lang == "fr" else Paragraph("<b>Scope:</b> 21 Commercial Banks in Algeria", styles['CoverMeta']),
            Paragraph(f"<b>Notions indexées :</b> {len(entries)} notions", styles['CoverMeta']) if lang == "fr" else Paragraph(f"<b>Indexed Terms:</b> {len(entries)} concepts", styles['CoverMeta'])
        ],
        [
            Paragraph("<b>Édition :</b> 2025 / 2026", styles['CoverMeta']) if lang == "fr" else Paragraph("<b>Edition:</b> 2025 / 2026", styles['CoverMeta']),
            Paragraph(f"<b>Date d'export :</b> {datetime.now().strftime('%d/%m/%Y')}", styles['CoverMeta']) if lang == "fr" else Paragraph(f"<b>Export Date:</b> {datetime.now().strftime('%Y-%m-%d')}", styles['CoverMeta'])
        ],
        [
            Paragraph("<b>Éditeur :</b> Tadjeddine & Partners", styles['CoverMeta']) if lang == "fr" else Paragraph("<b>Publisher:</b> Tadjeddine & Partners", styles['CoverMeta']),
            Paragraph("<b>Format :</b> Normalisation déterministe & auditée", styles['CoverMeta']) if lang == "fr" else Paragraph("<b>Standard:</b> Deterministic & Auditable", styles['CoverMeta'])
        ]
    ]
    meta_table = Table(meta_table_data, colWidths=[90*mm, 84*mm])
    meta_table.setStyle(TableStyle([
        ('BACKGROUND', (0, 0), (-1, -1), BG_CARD),
        ('BOX', (0, 0), (-1, -1), 0.5, BORDER_COLOR),
        ('VALIGN', (0, 0), (-1, -1), 'MIDDLE'),
        ('TOPPADDING', (0, 0), (-1, -1), 6),
        ('BOTTOMPADDING', (0, 0), (-1, -1), 6),
        ('LEFTPADDING', (0, 0), (-1, -1), 8),
        ('RIGHTPADDING', (0, 0), (-1, -1), 8),
    ]))
    story.append(meta_table)
    story.append(Spacer(1, 10*mm))

    # Sommaire des 8 Catégories
    toc_title = "Sommaire des 8 Catégories Analytiques" if lang == "fr" else "Summary of the 8 Analytical Categories"
    story.append(Paragraph(f"<b>{toc_title}</b>", styles['CategoryHeader']))
    story.append(Spacer(1, 3*mm))

    cat_items = []
    for cat_id, cat_obj in categories.items():
        cat_name = cat_obj.get("name", {}).get(lang, cat_obj.get("name", {}).get("fr", cat_id))
        count = sum(1 for e in entries if e.get("category") == cat_id)
        cat_items.append([
            Paragraph(f"• <b>{cat_name}</b>", styles['TOCItem']),
            Paragraph(f"{count} {'notions' if lang == 'fr' else 'terms'}", styles['TOCItem'])
        ])
    
    cat_table = Table(cat_items, colWidths=[140*mm, 34*mm])
    cat_table.setStyle(TableStyle([
        ('VALIGN', (0, 0), (-1, -1), 'MIDDLE'),
        ('TOPPADDING', (0, 0), (-1, -1), 3),
        ('BOTTOMPADDING', (0, 0), (-1, -1), 3),
        ('LEFTPADDING', (0, 0), (-1, -1), 0),
        ('RIGHTPADDING', (0, 0), (-1, -1), 0),
    ]))
    story.append(cat_table)

    story.append(PageBreak())

    # ── 2. Corps du Glossaire : Par Catégorie ────────────────────────────────
    # Groupement par catégorie
    by_category = {}
    for entry in entries:
        c = entry.get("category", "other")
        by_category.setdefault(c, []).append(entry)

    for cat_id, cat_obj in categories.items():
        cat_entries = by_category.get(cat_id, [])
        if not cat_entries:
            continue

        cat_name = cat_obj.get("name", {}).get(lang, cat_obj.get("name", {}).get("fr", cat_id))

        # En-tête de catégorie
        story.append(Spacer(1, 4*mm))
        cat_title_p = Paragraph(f"<b>{cat_name.upper()}</b>", styles['CategoryHeader'])
        story.append(cat_title_p)
        story.append(HRFlowable(width="100%", thickness=1, color=PRIMARY_NAVY, spaceBefore=2, spaceAfter=8))

        for item in cat_entries:
            term_str = item.get("term", {}).get(lang, item.get("term", {}).get("fr", ""))
            acronym = item.get("acronym", "")
            short_def = item.get("short_definition", {}).get(lang, item.get("short_definition", {}).get("fr", ""))
            detailed_def = item.get("detailed_definition", {}).get(lang, item.get("detailed_definition", {}).get("fr", ""))
            formula = item.get("formula", "")
            interp = item.get("interpretation", {}).get(lang, item.get("interpretation", {}).get("fr", ""))
            example = item.get("example", {}).get(lang, item.get("example", {}).get("fr", ""))
            unit = item.get("unit", "")
            higher_better = item.get("higher_is_better")
            modules = item.get("modules", [])

            # Construction de la carte de la notion
            card_content = []

            # Titre & Acronyme
            title_text = f"<b>{term_str}</b>"
            if acronym:
                title_text += f" <font color='#0D9488'>({acronym})</font>"
            card_content.append(Paragraph(title_text, styles['TermTitle']))

            # Badges métadonnées (Unité, Sens de performance, Seuil)
            badges = []
            thresh_type = item.get("threshold_type", "NONE")
            if thresh_type == "REGULATORY":
                badges.append("<font color='#DC2626'><b>" + ("Norme Réglementaire" if lang == "fr" else "Regulatory Standard") + "</b></font>")
            elif thresh_type == "ABIX_BENCHMARK":
                badges.append("<font color='#2563EB'><b>" + ("Benchmark ABIX" if lang == "fr" else "ABIX Benchmark") + "</b></font>")
            elif thresh_type == "ACADEMIC_REFERENCE":
                badges.append("<font color='#7C3AED'><b>" + ("Réf. Académique" if lang == "fr" else "Academic Reference") + "</b></font>")
            elif thresh_type == "MARKET_REFERENCE":
                badges.append("<font color='#0D9488'><b>" + ("Pratique Marché" if lang == "fr" else "Market Reference") + "</b></font>")

            if unit:
                badges.append(f"<b>{'Unité :' if lang == 'fr' else 'Unit:'}</b> {unit}")
            
            perf_dir = item.get("performance_direction")
            if higher_better is True or perf_dir == "higher_is_better":
                badges.append("▲ " + ("Élevé généralement favorable" if lang == "fr" else "Higher generally better"))
            elif higher_better is False or perf_dir == "lower_is_better":
                badges.append("▼ " + ("Faible généralement favorable" if lang == "fr" else "Lower generally better"))
            else:
                badges.append("◆ " + ("Interprétation contextuelle" if lang == "fr" else "Contextual interpretation"))
            
            if badges:
                card_content.append(Paragraph(" &nbsp;|&nbsp; ".join(badges), styles['MetaBadge']))
                card_content.append(Spacer(1, 1.5*mm))

            # Définition courte
            if short_def:
                card_content.append(Paragraph(short_def, styles['ShortDef']))

            # Définition détaillée
            if detailed_def:
                card_content.append(Paragraph(detailed_def, styles['DetailedDef']))

            # Formule
            if formula:
                f_box_content = [
                    Paragraph(f"<b>{'FORMULE ABIX :' if lang == 'fr' else 'ABIX FORMULA:'}</b>", styles['FormulaLabel']),
                    Paragraph(formula, styles['FormulaText'])
                ]
                f_table = Table([[f_box_content]], colWidths=[166*mm])
                f_table.setStyle(TableStyle([
                    ('BACKGROUND', (0, 0), (-1, -1), FORMULA_BG),
                    ('BOX', (0, 0), (-1, -1), 0.5, colors.HexColor("#334155")),
                    ('TOPPADDING', (0, 0), (-1, -1), 4),
                    ('BOTTOMPADDING', (0, 0), (-1, -1), 4),
                    ('LEFTPADDING', (0, 0), (-1, -1), 6),
                    ('RIGHTPADDING', (0, 0), (-1, -1), 6),
                ]))
                card_content.append(f_table)
                card_content.append(Spacer(1, 1.5*mm))

            # Interprétation
            if interp:
                interp_p = Paragraph(f"<b>{'Interprétation :' if lang == 'fr' else 'Interpretation:'}</b> {interp}", styles['InterpText'])
                interp_table = Table([[interp_p]], colWidths=[166*mm])
                interp_table.setStyle(TableStyle([
                    ('BACKGROUND', (0, 0), (-1, -1), INTERP_BG),
                    ('BOX', (0, 0), (-1, -1), 0.5, INTERP_BORDER),
                    ('TOPPADDING', (0, 0), (-1, -1), 4),
                    ('BOTTOMPADDING', (0, 0), (-1, -1), 4),
                    ('LEFTPADDING', (0, 0), (-1, -1), 6),
                    ('RIGHTPADDING', (0, 0), (-1, -1), 6),
                ]))
                card_content.append(interp_table)
                card_content.append(Spacer(1, 1.5*mm))

            # Cadre Réglementaire & Benchmarks ABIX
            reg_thresh = item.get("regulatory_threshold")
            abix_bench = item.get("abix_benchmark")
            if reg_thresh or abix_bench:
                thresh_boxes = []
                if reg_thresh:
                    thresh_boxes.append(Paragraph(f"<b><font color='#DC2626'>{'Cadre Réglementaire Obligatoire :' if lang == 'fr' else 'Mandatory Regulatory Framework:'}</font></b> {reg_thresh}", styles['InterpText']))
                if abix_bench:
                    thresh_boxes.append(Paragraph(f"<b><font color='#2563EB'>{'Benchmark & Repère ABIX :' if lang == 'fr' else 'ABIX Comfort Benchmark:'}</font></b> {abix_bench}", styles['InterpText']))
                
                t_table = Table([[Paragraph("<br/>".join([p.text for p in thresh_boxes]), styles['InterpText'])]], colWidths=[166*mm])
                t_table.setStyle(TableStyle([
                    ('BACKGROUND', (0, 0), (-1, -1), colors.HexColor("#F8FAFC")),
                    ('BOX', (0, 0), (-1, -1), 0.5, colors.HexColor("#CBD5E1")),
                    ('TOPPADDING', (0, 0), (-1, -1), 4),
                    ('BOTTOMPADDING', (0, 0), (-1, -1), 4),
                    ('LEFTPADDING', (0, 0), (-1, -1), 6),
                    ('RIGHTPADDING', (0, 0), (-1, -1), 6),
                ]))
                card_content.append(t_table)
                card_content.append(Spacer(1, 1.5*mm))

            # Exemple
            if example:
                example_p = Paragraph(f"<b>{'Exemple concret :' if lang == 'fr' else 'Concrete example:'}</b> {example}", styles['ExampleText'])
                example_table = Table([[example_p]], colWidths=[166*mm])
                example_table.setStyle(TableStyle([
                    ('BACKGROUND', (0, 0), (-1, -1), EXAMPLE_BG),
                    ('BOX', (0, 0), (-1, -1), 0.5, EXAMPLE_BORDER),
                    ('TOPPADDING', (0, 0), (-1, -1), 4),
                    ('BOTTOMPADDING', (0, 0), (-1, -1), 4),
                    ('LEFTPADDING', (0, 0), (-1, -1), 6),
                    ('RIGHTPADDING', (0, 0), (-1, -1), 6),
                ]))
                card_content.append(example_table)
                card_content.append(Spacer(1, 1.5*mm))

            # Modules ABIX associés
            if modules:
                mod_str = f"<b>{'Modules ABIX :' if lang == 'fr' else 'ABIX Modules:'}</b> " + ", ".join(modules)
                card_content.append(Paragraph(mod_str, styles['MetaBadge']))

            # Encapsulation dans un bloc Table
            term_table = Table([[card_content]], colWidths=[174*mm])
            term_table.setStyle(TableStyle([
                ('BACKGROUND', (0, 0), (-1, -1), BG_CARD),
                ('BOX', (0, 0), (-1, -1), 0.5, BORDER_COLOR),
                ('TOPPADDING', (0, 0), (-1, -1), 6),
                ('BOTTOMPADDING', (0, 0), (-1, -1), 6),
                ('LEFTPADDING', (0, 0), (-1, -1), 8),
                ('RIGHTPADDING', (0, 0), (-1, -1), 8),
            ]))

            story.append(KeepTogether([term_table, Spacer(1, 4*mm)]))

    # Construction du document avec le Canvas personnalisé
    def make_canvas(*args, **kwargs):
        kwargs["lang"] = lang
        return GlossaryCanvas(*args, **kwargs)

    doc.build(story, canvasmaker=make_canvas)
    print(f"[generate_glossary_pdf] ✓ Document PDF généré : {pdf_path} ({os.path.getsize(pdf_path)} octets)")
    return pdf_path


if __name__ == "__main__":
    print("─── Génération des livrets PDF du Glossaire ABIX ───")
    fr_pdf = generate_pdf("fr")
    en_pdf = generate_pdf("en")
    print("\n✓ Tous les documents PDF ont été générés avec succès !")
