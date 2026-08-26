#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
ABIX — Générateur d'offres commerciales PDF standards 2026
Génère 3 offres PDF A4 haute fidélité (2 pages chacune) pour :
- Pack Essentiel
- Pack Pro
- Pack Corporate Executive
"""

import os
import sys
from reportlab.lib.pagesizes import A4
from reportlab.lib import colors
from reportlab.platypus import (
    SimpleDocTemplate, Paragraph, Spacer, Table, TableStyle, PageBreak, KeepTogether
)
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.lib.units import mm, cm
from reportlab.pdfgen import canvas
from reportlab.graphics.shapes import Drawing, Rect, Line, Circle, String

# ── Couleurs de la charte ABIX ──────────────────────────────────────────────
BG_DARK = colors.HexColor("#081426")       # Bleu nuit profond
BG_CARD = colors.HexColor("#0E223D")       # Bleu nuit carte
BG_CARD_LIGHT = colors.HexColor("#142E52") # Bleu nuit carte contrastée
ACCENT_GOLD = colors.HexColor("#F59E0B")   # Jaune doré primaire
ACCENT_GOLD_LIGHT = colors.HexColor("#FBBF24")
ACCENT_TEAL = colors.HexColor("#0D9488")   # Turquoise / Action
ACCENT_CYAN = colors.HexColor("#06B6D4")   # Cyan d'accentuation
TEXT_WHITE = colors.HexColor("#FFFFFF")
TEXT_MUTED = colors.HexColor("#94A3B8")    # Gris ardoise clair
TEXT_SUBTLE = colors.HexColor("#CBD5E1")   # Gris texte secondaire
BORDER_COLOR = colors.HexColor("#1E3A5F")
SUCCESS_GREEN = colors.HexColor("#10B981")

PAGE_WIDTH, PAGE_HEIGHT = A4

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
            self.draw_page_decorations(num_pages)
            super().showPage()
        super().save()

    def draw_page_decorations(self, page_count):
        self.saveState()
        
        # 1. Arrière-plan global bleu nuit
        self.setFillColor(BG_DARK)
        self.rect(0, 0, PAGE_WIDTH, PAGE_HEIGHT, fill=True, stroke=False)
        
        # Lueur/Bande supérieure subtile turquoise & or
        self.setFillColor(ACCENT_TEAL)
        self.rect(0, PAGE_HEIGHT - 3.5*mm, PAGE_WIDTH * 0.65, 3.5*mm, fill=True, stroke=False)
        self.setFillColor(ACCENT_GOLD)
        self.rect(PAGE_WIDTH * 0.65, PAGE_HEIGHT - 3.5*mm, PAGE_WIDTH * 0.35, 3.5*mm, fill=True, stroke=False)
        
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

    story = []

    # ══════════════════════════════════════════════════════════════════════════
    # PAGE 1 : PROMESSE COMMERCIALE & TARIFICATION OFFICIELLE
    # ══════════════════════════════════════════════════════════════════════════
    
    # 1. En-tête de l'offre & Titre du Pack
    badge_p = Paragraph(f"<font color='#081426'><b>OFFRE COMMERCIALE 2026 — SOUSCRIPTION ANTICIPÉE</b></font>", title_badge_style)
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

    # 2. Cadre Financier & Tarification (Prix normal, remise 10%, promo HT, TVA 19%, TTC)
    col_w1 = (PAGE_WIDTH - 30*mm) * 0.48
    col_w2 = (PAGE_WIDTH - 30*mm) * 0.52

    pricing_left = [
        Paragraph("CONDITIONS TARIFAIRES EXCLUSIVES", card_h2),
        Spacer(1, 2*mm),
        Paragraph(f"Prix catalogue normal : <b><strike>{plan_data['regular_price_ht']:,} DA HT</strike></b>".replace(',', ' '), price_struck),
        Paragraph(f"<font color='#10B981'><b>Remise Early Bird 10 % : -{plan_data['discount_amount']:,} DA</b></font>".replace(',', ' '), body_bold),
        Spacer(1, 2*mm),
        Paragraph(f"<b>{plan_data['promo_price_ht']:,} DA HT</b>".replace(',', ' '), price_hero),
        Spacer(1, 1.5*mm),
        Paragraph(f"TVA (19 %) : {plan_data['vat_amount']:,} DA".replace(',', ' '), body_style),
        Paragraph(f"Montant Total TTC : <b>{plan_data['total_ttc']:,} DA TTC</b>".replace(',', ' '), price_ttc),
        Spacer(1, 2*mm),
        Paragraph(f"<b>Économie réalisée : {plan_data['discount_amount']:,} DA</b>".replace(',', ' '), ParagraphStyle('Eco', parent=body_bold, textColor=ACCENT_GOLD)),
    ]

    pricing_right = [
        Paragraph("MODALITÉS DE L’OFFRE PROMOTIONNELLE", card_h2),
        Spacer(1, 2*mm),
        Paragraph("• <b>Validité de l'offre :</b> Jusqu'au 31 août 2026 inclus.", body_style),
        Paragraph(f"• <b>Licence d'utilisation :</b> {plan_data['users']} utilisateur(s) autorisé(s).", body_style),
        Paragraph("• <b>Durée d'accès :</b> 12 mois complets à compter de l'activation.", body_style),
        Paragraph(f"• <b>Périmètre temporel :</b> {plan_data['data_explorer_period']}.", body_style),
        Paragraph("• <b>Livrables inclus :</b> Étude PDF sécurisée haute définition + accès plateforme ABIX Data Explorer.", body_style),
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
            ("Intelligence bancaire 360°", "Accès aux 4 exercices historiques complets (2022, 2023, 2024 et 2025) pour une profondeur d'analyse stratégique inégalée."),
            ("Executive Dashboard & Key Insights", "Synthèse décisionnelle haute direction avec identification immédiate des forces, faiblesses et ruptures de tendance."),
            ("Déploiement groupe (20 utilisateurs)", "Large couverture pour vos comités de direction, équipes d'analyse financière, d'audit et de risk management."),
            ("Rapports Executive PDF & Exports Excel", "Exportation libre et illimitée des données consolidées et des synthèses graphiques prêtes pour vos présentations.")
        ]

    adv_rows = []
    for title, desc in adv_items:
        check_p = Paragraph("<font color='#F59E0B'>✔</font>", ParagraphStyle('Check', parent=body_bold, fontSize=12, alignment=1))
        content_p = Paragraph(f"<b>{title} :</b> {desc}", body_style)
        adv_rows.append([check_p, content_p])

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

    p2_header = Paragraph(f"CONTENU DÉTAILLÉ ET SPÉCIFICATIONS — {plan_data['name'].upper()}", card_h2)
    story.append(p2_header)
    story.append(Spacer(1, 2.5*mm))

    # 1. Tableau du contenu du pack & ABIX Data Explorer
    if plan_key == 'essentiel':
        content_items = [
            ("Étude complète Édition 2026", "Livrable complet au format PDF sécurisé haute définition, incluant la vue d'ensemble du marché et les fiches individuelles des 21 banques."),
            ("Analyse sectorielle consolidée", "Agrégats macro-bancaires de la place, parts de marché globales et comparaisons banques publiques / banques privées."),
            ("Classements & Benchmarks", "Palmarès complets par PNB, Résultat net, Bilan, Dépôts, Crédits, ROE, ROA et Efficacité opérationnelle."),
            ("ABIX Data Explorer (12 mois)", "Licence d'accès interactif à la plateforme en ligne pour 1 utilisateur nommé."),
            ("Données exercice 2025", "Consultation des données détaillées et des ratios bancaires sur le dernier exercice audité (2025)."),
            ("Visualisations & Comparaisons 2025", "Graphes dynamiques, benchmarks visuels et comparaisons bancaires directes sur l'exercice 2025.")
        ]
    elif plan_key == 'pro':
        content_items = [
            ("Tout le contenu du Pack Essentiel", "Étude PDF complète 2026, analyses consolidées des 21 banques, classements et ratios de référence."),
            ("Fichier Excel structuré", "Modèle de données brutes prêt à l'emploi (tableaux financiers, bilans, comptes de résultat et métriques retraitées)."),
            ("ABIX Data Explorer Pro (12 mois)", "Licence multi-utilisateurs pour jusqu'à 3 collaborateurs d'une même entité."),
            ("Données 2024 et 2025", "Accès à l'historique sur 2 exercices pour mesurer les évolutions annuelles et taux de croissance."),
            ("Analyse dynamique des évolutions", "Comparaisons interannuelles, variations d'indicateurs et tendances par groupe bancaire."),
            ("Visualisations interactives Pro", "Outils de modélisation visuelle, exports graphiques et filtres avancés par segment.")
        ]
    else: # corporate
        content_items = [
            ("Tout le contenu du Pack Pro", "Étude PDF 2026, fichier Excel complet des données et fonctionnalités Pro."),
            ("ABIX Data Explorer Executive (12 mois)", "Accès étendu jusqu'à 20 utilisateurs appartenant à la même organisation."),
            ("Historique complet sur 4 exercices", "Accès intégral aux données auditées 2022, 2023, 2024 et 2025."),
            ("Analyse multidimensionnelle & Profils 360°", "Fiches de synthèse bancaire complètes et indicateurs d'efficacité approfondis."),
            ("Executive Dashboard & Key Insights", "Tableaux de bord stratégiques conçus pour les directions générales et comités d'audit."),
            ("Groupes de pairs & Benchmarks avancés", "Segmentation personnalisée, analyse de sous-ensembles bancaires et comparaisons sur mesure."),
            ("Rapports Executive PDF & Exports Excel", "Génération de rapports exécutifs prêts pour les conseils d'administration et exports illimités.")
        ]

    content_rows = []
    for t_elem, d_elem in content_items:
        dot_p = Paragraph("<font color='#0D9488'>▪</font>", ParagraphStyle('Dot', parent=body_bold, fontSize=14, alignment=1))
        item_p = Paragraph(f"<b>{t_elem}</b><br/><font color='#CBD5E1'>{d_elem}</font>", body_style)
        content_rows.append([dot_p, item_p])

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

    plans = {
        'essentiel': {
            'name': 'Pack Essentiel',
            'positioning': 'Comprendre le marché',
            'regular_price_ht': 84000,
            'discount_amount': 8400,
            'promo_price_ht': 75600,
            'vat_amount': 14364,
            'total_ttc': 89964,
            'users': 1,
            'data_explorer_period': 'Données 2025',
            'filename': 'offre-abix-pack-essentiel-2026.pdf'
        },
        'pro': {
            'name': 'Pack Pro',
            'positioning': 'Exploiter les données',
            'regular_price_ht': 120000,
            'discount_amount': 12000,
            'promo_price_ht': 108000,
            'vat_amount': 20520,
            'total_ttc': 128520,
            'users': 3,
            'data_explorer_period': 'Données 2024 et 2025',
            'filename': 'offre-abix-pack-pro-2026.pdf'
        },
        'corporate': {
            'name': 'Pack Corporate Executive',
            'positioning': 'Analyser, comparer et partager',
            'regular_price_ht': 180000,
            'discount_amount': 18000,
            'promo_price_ht': 162000,
            'vat_amount': 30780,
            'total_ttc': 192780,
            'users': 20,
            'data_explorer_period': 'Données historiques 2022, 2023, 2024 et 2025',
            'filename': 'offre-abix-pack-corporate-executive-2026.pdf'
        }
    }

    for key, data in plans.items():
        out_file = os.path.join(out_dir, data['filename'])
        build_offer_pdf(key, data, out_file)

if __name__ == '__main__':
    main()
