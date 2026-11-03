#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
ABIX — Générateur d'offres commerciales PDF standards 2026
Génère 3 offres PDF A4 haute fidélité et optimisées pour l'impression :
- Pack Essentiel
- Pack Pro
- Pack Corporate Executive (3 pages avec planification stratégique dédiée)
"""

import os
import sys
import json
from reportlab.lib.pagesizes import A4
from reportlab.lib import colors
from reportlab.platypus import (
    SimpleDocTemplate, Paragraph, Spacer, Table, TableStyle, PageBreak, KeepTogether
)
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.lib.units import mm, cm
from reportlab.pdfgen import canvas
from reportlab.graphics.shapes import Drawing, Rect, Line, Circle, String, Path

# ── Couleurs de la charte ABIX, adaptées à l'impression ─────────────────────
BG_DARK = colors.HexColor("#FFFFFF")       # Fond de page blanc
BG_CARD = colors.HexColor("#F8FAFC")       # Carte gris très clair
BG_CARD_LIGHT = colors.HexColor("#F1F5F9") # Carte contrastée imprimable
BG_HIGHLIGHT = colors.HexColor("#FFF7E6")  # Mise en avant stratégique
ACCENT_GOLD = colors.HexColor("#D97706")   # Or soutenu, lisible sur blanc
ACCENT_GOLD_LIGHT = colors.HexColor("#B45309")
ACCENT_TEAL = colors.HexColor("#0D9488")   # Turquoise / Action
ACCENT_CYAN = colors.HexColor("#06B6D4")   # Cyan d'accentuation
TEXT_WHITE = colors.HexColor("#0F172A")    # Texte principal sur fond clair
TEXT_MUTED = colors.HexColor("#475569")    # Gris ardoise
TEXT_SUBTLE = colors.HexColor("#334155")   # Gris texte secondaire
BORDER_COLOR = colors.HexColor("#CBD5E1")
SUCCESS_GREEN = colors.HexColor("#10B981")

PAGE_WIDTH, PAGE_HEIGHT = A4


def check_icon():
    """Return an embedded vector check mark with no font dependency."""
    icon = Drawing(8*mm, 5*mm)
    mark = Path()
    mark.moveTo(1.2*mm, 2.4*mm)
    mark.lineTo(2.6*mm, 1.0*mm)
    mark.lineTo(5.5*mm, 4.0*mm)
    mark.strokeColor = ACCENT_GOLD
    mark.strokeWidth = 1.5
    mark.fillColor = None
    icon.add(mark)
    return icon


def dot_icon(color=ACCENT_TEAL):
    """Return an embedded vector bullet with no font dependency."""
    icon = Drawing(6*mm, 4*mm)
    icon.add(Circle(3*mm, 2*mm, 1.1*mm, fillColor=color, strokeColor=None))
    return icon

class NumberedCanvas(canvas.Canvas):
    """Canvas personnalisé pour arrière-plan institutionnel et pied de page numéroté"""
    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self._saved_page_states = []

    def showPage(self):
        self._saved_page_states.append(dict(self.__dict__))
        self._startPage()

    def save(self):
        num_pages = len(self._saved_page_states)
        for state in self._saved_page_states:
            self.__dict__.update(state)
            self.compose_page(num_pages)
            super().showPage()
        super().save()

    def compose_page(self, page_count):
        """Place the page background behind the Platypus flowables.

        The numbered-canvas pattern replays each completed page during save().
        Drawing the full-page background at that point normally appends it after
        the flowables and therefore hides the document body. Capture the existing
        page operators, draw the background into a fresh operator list, then put
        the flowables back before adding the foreground header and footer.
        """
        content_code = list(self._code)
        self._code = []
        self.draw_page_background()
        self._code.extend(content_code)
        self.draw_page_foreground(page_count)

    def draw_page_background(self):
        self.saveState()

        # 1. Arrière-plan global bleu nuit
        self.setFillColor(BG_DARK)
        self.rect(0, 0, PAGE_WIDTH, PAGE_HEIGHT, fill=True, stroke=False)

        # Lueur/Bande supérieure subtile turquoise & or
        self.setFillColor(ACCENT_TEAL)
        self.rect(0, PAGE_HEIGHT - 3.5*mm, PAGE_WIDTH * 0.65, 3.5*mm, fill=True, stroke=False)
        self.setFillColor(ACCENT_GOLD)
        self.rect(PAGE_WIDTH * 0.65, PAGE_HEIGHT - 3.5*mm, PAGE_WIDTH * 0.35, 3.5*mm, fill=True, stroke=False)

        self.restoreState()

    def draw_page_foreground(self, page_count):
        self.saveState()

        # 2. En-tête (Header)
        # Logo ABIX / Tadjeddine & Partners
        logo_path = os.path.abspath(os.path.join(os.path.dirname(__file__), "..", "public", "logo.png"))
        if os.path.exists(logo_path):
            try:
                self.drawImage(logo_path, 15*mm, PAGE_HEIGHT - 22*mm, width=42*mm, height=13*mm, preserveAspectRatio=True, mask='auto')
            except Exception:
                pass
        
        # Titre institutionnel à droite de l'en-tête
        self.setFont("Helvetica-Bold", 10)
        self.setFillColor(TEXT_WHITE)
        self.drawRightString(PAGE_WIDTH - 15*mm, PAGE_HEIGHT - 13*mm, "ALGERIA BANKING INDEX")
        self.setFont("Helvetica", 7.5)
        self.setFillColor(ACCENT_GOLD)
        self.drawRightString(PAGE_WIDTH - 15*mm, PAGE_HEIGHT - 17.5*mm, "ÉDITION 2026 — OFFRE COMMERCIALE OFFICIELLE")
        self.setFillColor(TEXT_MUTED)
        self.drawRightString(PAGE_WIDTH - 15*mm, PAGE_HEIGHT - 21.5*mm, "Tadjeddine & Partners • Intelligence & Stratégie Bancaire")

        # Ligne de séparation sous en-tête
        self.setStrokeColor(BORDER_COLOR)
        self.setLineWidth(0.75)
        self.line(15*mm, PAGE_HEIGHT - 25*mm, PAGE_WIDTH - 15*mm, PAGE_HEIGHT - 25*mm)

        # 3. Pied de page (Footer)
        self.setStrokeColor(BORDER_COLOR)
        self.setLineWidth(0.75)
        self.line(15*mm, 16*mm, PAGE_WIDTH - 15*mm, 16*mm)

        self.setFont("Helvetica", 7)
        self.setFillColor(TEXT_MUTED)
        self.drawString(15*mm, 11*mm, "Tadjeddine & Partners • Cité Naii Rue G N°1, Blida, Algérie • info@tadjeddine-partners.com")
        self.drawString(15*mm, 7.5*mm, "Document commercial officiel • algeriabankingindex.com • Validité : 31 août 2026")

        page_str = f"Page {self._pageNumber} sur {page_count}"
        self.setFont("Helvetica-Bold", 7.5)
        self.setFillColor(ACCENT_GOLD)
        self.drawRightString(PAGE_WIDTH - 15*mm, 9.5*mm, page_str)

        self.restoreState()


def build_offer_pdf(plan_key, plan_data, output_path):
    doc = SimpleDocTemplate(
        output_path,
        pagesize=A4,
        leftMargin=15*mm,
        rightMargin=15*mm,
        topMargin=28*mm,
        bottomMargin=20*mm
    )

    styles = getSampleStyleSheet()

    # Définition des styles personnalisés
    title_badge_style = ParagraphStyle(
        'TitleBadge',
        parent=styles['Normal'],
        fontName='Helvetica-Bold',
        fontSize=8.5,
        textColor=BG_DARK,
        alignment=1
    )

    h1_style = ParagraphStyle(
        'H1',
        parent=styles['Normal'],
        fontName='Helvetica-Bold',
        fontSize=20,
        leading=24,
        textColor=TEXT_WHITE,
        alignment=0
    )

    pos_style = ParagraphStyle(
        'Positioning',
        parent=styles['Normal'],
        fontName='Helvetica-Bold',
        fontSize=11,
        leading=15,
        textColor=ACCENT_GOLD,
        alignment=0
    )

    body_style = ParagraphStyle(
        'Body',
        parent=styles['Normal'],
        fontName='Helvetica',
        fontSize=8.5,
        leading=12,
        textColor=TEXT_SUBTLE
    )

    body_bold = ParagraphStyle(
        'BodyBold',
        parent=styles['Normal'],
        fontName='Helvetica-Bold',
        fontSize=8.5,
        leading=12,
        textColor=TEXT_WHITE
    )

    card_h2 = ParagraphStyle(
        'CardH2',
        parent=styles['Normal'],
        fontName='Helvetica-Bold',
        fontSize=11,
        leading=14,
        textColor=ACCENT_GOLD
    )

    price_struck = ParagraphStyle(
        'PriceStruck',
        parent=styles['Normal'],
        fontName='Helvetica',
        fontSize=10,
        leading=12,
        textColor=TEXT_MUTED
    )

    price_hero = ParagraphStyle(
        'PriceHero',
        parent=styles['Normal'],
        fontName='Helvetica-Bold',
        fontSize=22,
        leading=25,
        textColor=ACCENT_GOLD_LIGHT
    )

    price_ttc = ParagraphStyle(
        'PriceTTC',
        parent=styles['Normal'],
        fontName='Helvetica-Bold',
        fontSize=10,
        leading=13,
        textColor=TEXT_WHITE
    )

    section_title_style = ParagraphStyle(
        'SectionTitle',
        parent=styles['Normal'],
        fontName='Helvetica-Bold',
        fontSize=12,
        leading=15,
        textColor=TEXT_WHITE
    )

    def feature_card(number, title, items, background=BG_CARD, border=BORDER_COLOR, bullet_color=ACCENT_TEAL):
        """Build a compact, print-friendly feature pillar."""
        rows = []
        for item in items:
            rows.append([dot_icon(bullet_color), Paragraph(item, body_style)])

        item_table = Table(rows, colWidths=[6*mm, PAGE_WIDTH - 42*mm])
        item_table.setStyle(TableStyle([
            ('VALIGN', (0, 0), (-1, -1), 'TOP'),
            ('TOPPADDING', (0, 0), (-1, -1), 1.2*mm),
            ('BOTTOMPADDING', (0, 0), (-1, -1), 1.2*mm),
            ('LEFTPADDING', (0, 0), (-1, -1), 0),
            ('RIGHTPADDING', (0, 0), (-1, -1), 0),
        ]))

        heading = Paragraph(f"<font color='#D97706'>{number}.</font> {title}", section_title_style)
        card = Table([[heading], [Spacer(1, 1.5*mm)], [item_table]], colWidths=[PAGE_WIDTH - 30*mm])
        card.setStyle(TableStyle([
            ('BACKGROUND', (0, 0), (-1, -1), background),
            ('BOX', (0, 0), (-1, -1), 1, border),
            ('TOPPADDING', (0, 0), (-1, -1), 3.5*mm),
            ('BOTTOMPADDING', (0, 0), (-1, -1), 3.5*mm),
            ('LEFTPADDING', (0, 0), (-1, -1), 4*mm),
            ('RIGHTPADDING', (0, 0), (-1, -1), 4*mm),
        ]))
        return card

    story = []

    # ══════════════════════════════════════════════════════════════════════════
    # PAGE 1 : PROMESSE COMMERCIALE & TARIFICATION OFFICIELLE
    # ══════════════════════════════════════════════════════════════════════════
    
    # 1. En-tête de l'offre & Titre du Pack
    badge_p = Paragraph(f"<font color='#081426'><b>OFFRE COMMERCIALE — ÉDITION 2026</b></font>", title_badge_style)
    badge_table = Table([[badge_p]], colWidths=[PAGE_WIDTH - 30*mm], rowHeights=[6.5*mm])
    badge_table.setStyle(TableStyle([
        ('BACKGROUND', (0, 0), (-1, -1), ACCENT_GOLD),
        ('ALIGN', (0, 0), (-1, -1), 'CENTER'),
        ('VALIGN', (0, 0), (-1, -1), 'MIDDLE'),
        ('BOTTOMPADDING', (0, 0), (-1, -1), 0),
        ('TOPPADDING', (0, 0), (-1, -1), 0),
    ]))
    story.append(badge_table)
    story.append(Spacer(1, 4*mm))

    title_p = Paragraph(f"{plan_data['name']}", h1_style)
    pos_p = Paragraph(f"Positionnement stratégique : « {plan_data['positioning']} »", pos_style)
    
    if plan_key == 'corporate':
        intro_txt = (
            "Le <b>Pack ABIX Corporate Executive - Édition 2026</b> réunit trois leviers complémentaires : "
            "l'étude de référence du secteur bancaire algérien, la plateforme ABIX Data Explorer Corporate "
            "et un dispositif complet de <b>planification stratégique triennale avec assistance IA incluse</b>."
        )
    else:
        intro_txt = (
            "L'édition 2026 d'<b>ABIX (Algeria Banking Index)</b> constitue l'analyse de référence indépendante "
            "du secteur bancaire algérien, couvrant l'ensemble des 21 banques commerciales en activité. "
            "Cette offre standardisée vous garantit l'accès aux données financières certifiées, aux indicateurs exclusifs "
            "et aux outils de benchmark décisionnel."
        )
    intro_p = Paragraph(intro_txt, body_style)

    header_box = Table([[title_p], [pos_p], [Spacer(1, 1.5*mm)], [intro_p]], colWidths=[PAGE_WIDTH - 30*mm])
    header_box.setStyle(TableStyle([
        ('BACKGROUND', (0, 0), (-1, -1), BG_CARD),
        ('BOX', (0, 0), (-1, -1), 0.75, BORDER_COLOR),
        ('TOPPADDING', (0, 0), (-1, -1), 4*mm),
        ('BOTTOMPADDING', (0, 0), (-1, -1), 4*mm),
        ('LEFTPADDING', (0, 0), (-1, -1), 5*mm),
        ('RIGHTPADDING', (0, 0), (-1, -1), 5*mm),
    ]))
    story.append(header_box)
    story.append(Spacer(1, 4*mm))

    # 2. Cadre Financier & Tarification officielle 2026
    col_w1 = (PAGE_WIDTH - 30*mm) * 0.48
    col_w2 = (PAGE_WIDTH - 30*mm) * 0.52

    pricing_left = [
        Paragraph("TARIF OFFICIEL 2026", card_h2),
        Spacer(1, 2*mm),
        Paragraph(f"<b>{plan_data['regular_price_ht']:,} DA HT</b>".replace(',', ' '), price_hero),
        Spacer(1, 1.5*mm),
        Paragraph(f"TVA (19 %) : {plan_data['vat_amount']:,} DA".replace(',', ' '), body_style),
        Paragraph(f"Montant Total TTC : <b>{plan_data['total_ttc']:,} DA TTC</b>".replace(',', ' '), price_ttc),
    ]

    included_deliverables = (
        "Étude PDF sécurisée + fichier Excel + ABIX Data Explorer Corporate + planification stratégique triennale avec assistance IA."
        if plan_key == 'corporate'
        else "Étude PDF sécurisée haute définition + accès plateforme ABIX Data Explorer."
    )

    pricing_right = [
        Paragraph("MODALITÉS DE L’OFFRE", card_h2),
        Spacer(1, 2*mm),
        Paragraph("• <b>Tarification :</b> Tarif applicable aux nouvelles souscriptions 2026.", body_style),
        Paragraph(f"• <b>Licence d'utilisation :</b> {plan_data['users']} utilisateur(s) autorisé(s).", body_style),
        Paragraph("• <b>Durée d'accès :</b> 12 mois complets à compter de l'activation.", body_style),
        Paragraph(f"• <b>Périmètre temporel :</b> {plan_data['data_explorer_period']}.", body_style),
        Paragraph(f"• <b>Livrables inclus :</b> {included_deliverables}", body_style),
        Paragraph("• <b>Facturation :</b> Émission d'une facture officielle en bonne et due forme par Tadjeddine & Partners.", body_style),
    ]

    pricing_table = Table([[pricing_left, pricing_right]], colWidths=[col_w1, col_w2])
    pricing_table.setStyle(TableStyle([
        ('BACKGROUND', (0, 0), (0, 0), BG_CARD_LIGHT),
        ('BACKGROUND', (1, 0), (1, 0), BG_CARD),
        ('BOX', (0, 0), (-1, -1), 0.75, ACCENT_GOLD),
        ('INNERGRID', (0, 0), (-1, -1), 0.5, BORDER_COLOR),
        ('TOPPADDING', (0, 0), (-1, -1), 3.5*mm),
        ('BOTTOMPADDING', (0, 0), (-1, -1), 3.5*mm),
        ('LEFTPADDING', (0, 0), (-1, -1), 4*mm),
        ('RIGHTPADDING', (0, 0), (-1, -1), 4*mm),
        ('VALIGN', (0, 0), (-1, -1), 'TOP'),
    ]))
    story.append(pricing_table)
    story.append(Spacer(1, 4*mm))

    # 3. Résumé des principaux avantages & Valeur ajoutée
    advantages_title = Paragraph("RÉSUMÉ DES PRINCIPAUX AVANTAGES DU PACK", card_h2)
    
    adv_items = []
    if plan_key == 'essentiel':
        adv_items = [
            ("Vision globale & indépendante", "Comprendre la structure, les parts de marché et la rentabilité des 21 banques commerciales de la place algérienne."),
            ("Benchmarks sectoriels clairs", "Classements méthodiques par indicateur clé (PNB, Résultat net, ROE, ROA, Coefficient d'exploitation, Crédits, Dépôts)."),
            ("ABIX Data Explorer 2025", "Accès individuel pendant 12 mois à la plateforme interactive pour visualiser et comparer les performances 2025."),
            ("Conformité & Fiabilité", "Données certifiées basées sur les états financiers officiels publiés et validés.")
        ]
    elif plan_key == 'pro':
        adv_items = [
            ("Exploitation directe des données", "Fichier Excel structuré et documenté pour intégrer instantanément les métriques bancaires dans vos modèles financiers."),
            ("Analyse pluriannuelle dynamique", "Accès à l'historique 2024 et 2025 dans ABIX Data Explorer pour mesurer les trajectoires et croissances d'un exercice à l'autre."),
            ("Usage collaboratif (3 utilisateurs)", "Partage des analyses au sein de votre équipe financière, direction des risques ou stratégie."),
            ("Visualisations interactives avancées", "Tableaux croisés, comparateurs directs entre banques publiques et privées et ratios prudentiels.")
        ]
    else: # corporate
        adv_items = [
            ("Étude ABIX 2026", "Étude sécurisée, fichier Excel des données financières et session de présentation avec M. Rachid Sekak."),
            ("Data Explorer Corporate", "Licence 12 mois jusqu'à 20 utilisateurs, données 2022-2025, tableaux de bord et benchmarks avancés."),
            ("Planification stratégique triennale", "Élaboration de plans bancaires sur 3 exercices, projections et scénarios Central, Ambitieux et Défavorable."),
            ("Assistance IA incluse", "Aide à la rédaction, à l'analyse et à la structuration des axes, initiatives, risques et indicateurs."),
            ("Gouvernance et pilotage", "Workflow de validation DG / Conseil d'Administration et suivi annuel des objectifs et réalisations.")
        ]

    adv_rows = []
    for title, desc in adv_items:
        content_p = Paragraph(f"<b>{title} :</b> {desc}", body_style)
        adv_rows.append([check_icon(), content_p])

    adv_table = Table(adv_rows, colWidths=[8*mm, PAGE_WIDTH - 38*mm])
    adv_table.setStyle(TableStyle([
        ('VALIGN', (0, 0), (-1, -1), 'TOP'),
        ('BOTTOMPADDING', (0, 0), (-1, -1), 1.5*mm),
        ('TOPPADDING', (0, 0), (-1, -1), 1.5*mm),
        ('LEFTPADDING', (0, 0), (-1, -1), 0),
        ('RIGHTPADDING', (0, 0), (-1, -1), 0),
    ]))

    adv_box = Table([[advantages_title], [Spacer(1, 1.5*mm)], [adv_table]], colWidths=[PAGE_WIDTH - 30*mm])
    adv_box.setStyle(TableStyle([
        ('BACKGROUND', (0, 0), (-1, -1), BG_CARD),
        ('BOX', (0, 0), (-1, -1), 0.75, BORDER_COLOR),
        ('TOPPADDING', (0, 0), (-1, -1), 3.5*mm),
        ('BOTTOMPADDING', (0, 0), (-1, -1), 3.5*mm),
        ('LEFTPADDING', (0, 0), (-1, -1), 5*mm),
        ('RIGHTPADDING', (0, 0), (-1, -1), 5*mm),
    ]))
    story.append(adv_box)

    # ══════════════════════════════════════════════════════════════════════════
    # PAGE 2 : CONTENU DÉTAILLÉ, DATA EXPLORER & MODALITÉS D'ACTIVATION
    # ══════════════════════════════════════════════════════════════════════════
    story.append(PageBreak())

    if plan_key == 'corporate':
        story.append(Paragraph("LES TROIS PILIERS DU PACK CORPORATE EXECUTIVE", card_h2))
        story.append(Spacer(1, 2.5*mm))

        study_items = [
            "Étude complète au format PDF sécurisé.",
            "Analyses sectorielles, banques publiques / privées et profils individuels.",
            "Classements, ratios et comparaisons bancaires.",
            "Fichier Excel des données financières.",
            "Session de présentation avec M. Rachid Sekak.",
        ]
        explorer_items = [
            "Licence 12 mois - jusqu'à 20 utilisateurs.",
            "Données historiques 2022-2025.",
            "Tableaux de bord, analyses et benchmarks avancés.",
            "Profils bancaires, classements et évolutions pluriannuelles.",
            "Rapports Executive PDF et exports Excel.",
        ]
        strategic_items = [
            "Élaboration de plans bancaires sur 3 exercices.",
            "Préremplissage ABIX, benchmarks et projections.",
            "Scénarios Central, Ambitieux et Défavorable.",
            "Axes stratégiques, initiatives, risques et indicateurs.",
            "Assistance IA à la rédaction et à l'analyse.",
            "Workflow de validation DG / Conseil d'Administration.",
            "Suivi annuel des objectifs et réalisations.",
        ]

        story.append(feature_card("1", "ÉTUDE ABIX 2026", study_items))
        story.append(Spacer(1, 4*mm))
        story.append(feature_card("2", "ABIX DATA EXPLORER - CORPORATE", explorer_items))

        story.append(PageBreak())
        story.append(Paragraph("PLANIFICATION STRATÉGIQUE TRIENNALE", card_h2))
        story.append(Spacer(1, 1.5*mm))
        story.append(Paragraph(
            "Un cadre structuré pour transformer les analyses ABIX en trajectoire stratégique, "
            "arbitrages de gouvernance et pilotage annuel.",
            pos_style,
        ))
        story.append(Spacer(1, 3*mm))
        story.append(feature_card(
            "3",
            "PLANIFICATION STRATÉGIQUE TRIENNALE",
            strategic_items,
            background=BG_HIGHLIGHT,
            border=ACCENT_GOLD,
            bullet_color=ACCENT_GOLD,
        ))
        story.append(Spacer(1, 3*mm))

        ai_title = Paragraph("<b>ASSISTANCE IA INCLUSE</b>", ParagraphStyle(
            'AIBannerTitle', parent=card_h2, textColor=colors.HexColor("#065F46"), alignment=1
        ))
        ai_text = Paragraph(
            "L'assistance IA accompagne la rédaction, l'analyse, la structuration des scénarios "
            "et la formalisation des axes, initiatives, risques et indicateurs.",
            ParagraphStyle('AIBannerText', parent=body_style, alignment=1),
        )
        ai_banner = Table([[ai_title], [ai_text]], colWidths=[PAGE_WIDTH - 30*mm])
        ai_banner.setStyle(TableStyle([
            ('BACKGROUND', (0, 0), (-1, -1), colors.HexColor("#ECFDF5")),
            ('BOX', (0, 0), (-1, -1), 1, ACCENT_TEAL),
            ('TOPPADDING', (0, 0), (-1, -1), 2.5*mm),
            ('BOTTOMPADDING', (0, 0), (-1, -1), 2.5*mm),
            ('LEFTPADDING', (0, 0), (-1, -1), 4*mm),
            ('RIGHTPADDING', (0, 0), (-1, -1), 4*mm),
        ]))
        story.append(ai_banner)
        story.append(Spacer(1, 3.5*mm))
    else:
        story.append(Paragraph(f"CONTENU DÉTAILLÉ ET SPÉCIFICATIONS - {plan_data['name'].upper()}", card_h2))
        story.append(Spacer(1, 2.5*mm))

        if plan_key == 'essentiel':
            content_items = [
                ("Étude complète Édition 2026", "Livrable complet au format PDF sécurisé haute définition, incluant la vue d'ensemble du marché et les fiches individuelles des 21 banques."),
                ("Analyse sectorielle consolidée", "Agrégats macro-bancaires de la place, parts de marché globales et comparaisons banques publiques / banques privées."),
                ("Classements & Benchmarks", "Palmarès complets par PNB, Résultat net, Bilan, Dépôts, Crédits, ROE, ROA et Efficacité opérationnelle."),
                ("ABIX Data Explorer (12 mois)", "Licence d'accès interactif à la plateforme en ligne pour 1 utilisateur nommé."),
                ("Données exercice 2025", "Consultation des données détaillées et des ratios bancaires sur le dernier exercice audité (2025)."),
                ("Visualisations & Comparaisons 2025", "Graphes dynamiques, benchmarks visuels et comparaisons bancaires directes sur l'exercice 2025.")
            ]
        else:
            content_items = [
                ("Tout le contenu du Pack Essentiel", "Étude PDF complète 2026, analyses consolidées des 21 banques, classements et ratios de référence."),
                ("Fichier Excel structuré", "Modèle de données brutes prêt à l'emploi (tableaux financiers, bilans, comptes de résultat et métriques retraitées)."),
                ("ABIX Data Explorer Pro (12 mois)", "Licence multi-utilisateurs pour jusqu'à 3 collaborateurs d'une même entité."),
                ("Données 2024 et 2025", "Accès à l'historique sur 2 exercices pour mesurer les évolutions annuelles et taux de croissance."),
                ("Analyse dynamique des évolutions", "Comparaisons interannuelles, variations d'indicateurs et tendances par groupe bancaire."),
                ("Visualisations interactives Pro", "Outils de modélisation visuelle, exports graphiques et filtres avancés par segment.")
            ]

        content_rows = []
        for t_elem, d_elem in content_items:
            item_p = Paragraph(f"<b>{t_elem}</b><br/><font color='#334155'>{d_elem}</font>", body_style)
            content_rows.append([dot_icon(), item_p])

        content_table = Table(content_rows, colWidths=[6*mm, PAGE_WIDTH - 36*mm])
        content_table.setStyle(TableStyle([
            ('VALIGN', (0, 0), (-1, -1), 'TOP'),
            ('BOTTOMPADDING', (0, 0), (-1, -1), 1.5*mm),
            ('TOPPADDING', (0, 0), (-1, -1), 1.5*mm),
            ('LEFTPADDING', (0, 0), (-1, -1), 0),
            ('RIGHTPADDING', (0, 0), (-1, -1), 0),
        ]))

        detail_box = Table([[content_table]], colWidths=[PAGE_WIDTH - 30*mm])
        detail_box.setStyle(TableStyle([
            ('BACKGROUND', (0, 0), (-1, -1), BG_CARD),
            ('BOX', (0, 0), (-1, -1), 0.75, BORDER_COLOR),
            ('TOPPADDING', (0, 0), (-1, -1), 3*mm),
            ('BOTTOMPADDING', (0, 0), (-1, -1), 3*mm),
            ('LEFTPADDING', (0, 0), (-1, -1), 4*mm),
            ('RIGHTPADDING', (0, 0), (-1, -1), 4*mm),
        ]))
        story.append(detail_box)
        story.append(Spacer(1, 3.5*mm))

    # 2. Modalités générales d'activation & Engagement de service
    p2_modalites_title = Paragraph("MODALITÉS GÉNÉRALES D'ACTIVATION & FACTURATION", card_h2)
    modalites_txt = (
        "1. <b>Enregistrement :</b> Votre souscription est enregistrée sans engagement immédiat de paiement.<br/>"
        "2. <b>Validation & Facture Proforma :</b> Notre équipe commerciale vous contacte sous 24h ouvrées pour vous transmettre la facture proforma officielle.<br/>"
        "3. <b>Règlement & Activation :</b> Le règlement s'effectue par virement bancaire ou chèque de banque à l'ordre de Tadjeddine & Partners. Vos accès ABIX Data Explorer et vos livrables sont activés dès validation comptable.<br/>"
        "4. <b>Support & Assistance :</b> Assistance technique et méthodologique garantie tout au long de la durée de votre abonnement de 12 mois."
    )
    modalites_p = Paragraph(modalites_txt, body_style)

    modalites_box = Table([[p2_modalites_title], [Spacer(1, 1*mm)], [modalites_p]], colWidths=[PAGE_WIDTH - 30*mm])
    modalites_box.setStyle(TableStyle([
        ('BACKGROUND', (0, 0), (-1, -1), BG_CARD_LIGHT),
        ('BOX', (0, 0), (-1, -1), 0.75, BORDER_COLOR),
        ('TOPPADDING', (0, 0), (-1, -1), 3*mm),
        ('BOTTOMPADDING', (0, 0), (-1, -1), 3*mm),
        ('LEFTPADDING', (0, 0), (-1, -1), 4*mm),
        ('RIGHTPADDING', (0, 0), (-1, -1), 4*mm),
    ]))
    story.append(modalites_box)
    story.append(Spacer(1, 3.5*mm))

    # 3. Coordonnées & Appel à l'action
    cta_title = Paragraph("<font color='#081426'><b>POUR CONFIRMER VOTRE SOUSCRIPTION</b></font>", ParagraphStyle('CTATitle', parent=title_badge_style, fontSize=9))
    cta_txt = (
        "<b>Tadjeddine & Partners — Éditeur d'Algeria Banking Index</b><br/>"
        "Adresse : Cité Naii Rue G N°1, Blida, Algérie | Tél : +213 (0) 560 403 405 / +213 (0) 560 349 059<br/>"
        "Email : <b>info@tadjeddine-partners.com</b> | Portail web : <b>https://algeriabankingindex.com</b>"
    )
    cta_p = Paragraph(cta_txt, ParagraphStyle('CTATxt', parent=body_style, alignment=1, textColor=TEXT_WHITE))

    cta_btn_p = Paragraph(f"<font color='#FFFFFF'><b>CONFIRMER MA SOUSCRIPTION AU {plan_data['name'].upper()} SUR ALGERIABANKINGINDEX.COM</b></font>", ParagraphStyle('Btn', parent=title_badge_style, fontSize=8.5, textColor=TEXT_WHITE))
    
    cta_box = Table([[cta_title], [Spacer(1, 1*mm)], [cta_p], [Spacer(1, 1.5*mm)], [cta_btn_p]], colWidths=[PAGE_WIDTH - 30*mm])
    cta_box.setStyle(TableStyle([
        ('BACKGROUND', (0, 0), (-1, 0), ACCENT_GOLD),
        ('BACKGROUND', (0, 1), (-1, 3), BG_CARD),
        ('BACKGROUND', (0, 4), (-1, 4), ACCENT_TEAL),
        ('BOX', (0, 0), (-1, -1), 0.75, ACCENT_GOLD),
        ('ALIGN', (0, 0), (-1, -1), 'CENTER'),
        ('TOPPADDING', (0, 0), (-1, -1), 2*mm),
        ('BOTTOMPADDING', (0, 0), (-1, -1), 2*mm),
        ('LEFTPADDING', (0, 0), (-1, -1), 3*mm),
        ('RIGHTPADDING', (0, 0), (-1, -1), 3*mm),
    ]))
    story.append(cta_box)

    doc.build(story, canvasmaker=NumberedCanvas)
    print(f"[PDF] OK: {output_path}")


def main():
    base_dir = os.path.abspath(os.path.join(os.path.dirname(__file__), ".."))
    out_dir = os.path.join(base_dir, "public", "documents", "offres")
    os.makedirs(out_dir, exist_ok=True)

    with open(os.path.join(base_dir, "data", "offers-2026.json"), encoding="utf-8") as source:
        plans = json.load(source)["plans"]

    for key, data in plans.items():
        out_file = os.path.join(out_dir, data['pdf_filename'])
        build_offer_pdf(key, data, out_file)

if __name__ == '__main__':
    main()
