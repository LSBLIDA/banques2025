import os
import json

updates = [
    {
        'file': 'locales/fr.json',
        'replacements': [
            ('Souscriptions anticipées ouvertes — Tarif préférentiel jusqu’au 31 août 2026', 'Souscriptions ouvertes — Édition 2026'),
            ("Offre de souscription anticipée — Jusqu'au 31 août 2026", 'Souscription — Édition 2026'),
            ('Bénéficiez d’une remise de 10 % pour toute souscription enregistrée avant le 31 août 2026. L’étude est actuellement en cours de finalisation et sera remise aux souscripteurs dès sa publication.', 'L’étude est actuellement en cours de finalisation et sera remise aux souscripteurs dès sa publication.'),
            ('Tarif préférentiel réservé aux souscriptions anticipées avant le 31 août 2026', 'Souscription pour l\\'édition 2026'),
            ('Offre réservée aux souscriptions anticipées enregistrées avant le 31 août 2026.', ''),
            ("Valable jusqu'au 31 août 2026 à 23h59", ''),
            ('Souscrivez avant le 31 août 2026 et bénéficiez d’une remise de 10 % sur le tarif public de l’édition 2026. L’étude sera livrée dès sa publication.', 'L’étude sera livrée dès sa publication.'),
            ('-10 % jusqu’au 31 août', ''),
            ('Tarif de souscription anticipée valable jusqu’au 31 août 2026', ''),
            ('Bénéficiez d’une remise de 10 % pour toute souscription enregistrée avant le 31 août 2026 à 23 h 59.', 'Souscrivez à l\\'édition 2026.'),
            ('Oui. Toute souscription enregistrée au plus tard le 31 août 2026 à 23 h 59, heure d’Algérie, bénéficie du tarif de souscription anticipée.\\n\\nCe tarif reste garanti jusqu’à la livraison de l’étude.', 'Oui. La souscription reste garantie jusqu’à la livraison de l’étude.'),
            ('Les souscripteurs seront informés de toute évolution du calendrier de publication.\\n\\nLa souscription restera valide et le tarif préférentiel obtenu avant le 31 août 2026 demeurera garanti.', 'Les souscripteurs seront informés de toute évolution du calendrier de publication.\\n\\nLa souscription restera valide.'),
            ('L’édition 2026 est ouverte à la souscription anticipée avec un tarif préférentiel valable jusqu’au 31 août 2026.', 'L’édition 2026 est ouverte à la souscription.'),
            ('Offre promotionnelle Early Bird valable jusqu’au 31 août 2026.', '')
        ]
    },
    {
        'file': 'locales/en.json',
        'replacements': [
            ('Early subscriptions open — Preferential rate until August 31, 2026', 'Subscriptions open — 2026 Edition'),
            ('Early Subscription Offer — Until August 31, 2026', 'Subscription — 2026 Edition'),
            ('Enjoy a 10% discount on all subscriptions recorded before August 31, 2026. The study is currently being finalized and will be delivered to subscribers upon publication.', 'The study is currently being finalized and will be delivered to subscribers upon publication.'),
            ('Preferential rate reserved for early subscriptions before August 31, 2026', 'Subscription for the 2026 Edition'),
            ('Offer reserved for early subscriptions recorded before August 31, 2026.', ''),
            ('Valid until August 31, 2026 at 11:59 PM', ''),
            ('Subscribe before August 31, 2026 and enjoy a 10% discount on the 2026 edition public rate. The study will be delivered upon publication.', 'The study will be delivered upon publication.'),
            ('-10% until Aug 31', ''),
            ('Early subscription rate valid until August 31, 2026', ''),
            ('Enjoy a 10% discount on all subscriptions recorded before August 31, 2026 at 11:59 PM.', 'Subscribe to the 2026 edition.'),
            ('Yes. Any subscription recorded no later than August 31, 2026 at 11:59 PM, Algeria time, benefits from the early subscription rate.\\n\\nThis rate remains guaranteed until the study is delivered.', 'Yes. The subscription remains guaranteed until the study is delivered.'),
            ('Subscribers will be informed of any changes to the publication schedule.\\n\\nThe subscription will remain valid and the preferential rate obtained before August 31, 2026 will remain guaranteed.', 'Subscribers will be informed of any changes to the publication schedule.\\n\\nThe subscription will remain valid.'),
            ('The 2026 edition is open for early subscription with a preferential rate valid until August 31, 2026.', 'The 2026 edition is open for subscription.'),
            ('Early Bird promotional offer valid until August 31, 2026.', '')
        ]
    },
    {
        'file': 'locales/ar.json',
        'replacements': [
            ('الاشتراكات المسبقة مفتوحة — سعر تفضيلي حتى 31 أغسطس 2026', 'الاشتراكات مفتوحة — إصدار 2026'),
            ('عرض الاشتراك المسبق — حتى 31 أغسطس 2026', 'الاشتراك — إصدار 2026'),
            ('استفد من خصم 10% على أي اشتراك مسجل قبل 31 أغسطس 2026. الدراسة قيد الإعداد النهائي حالياً وسيتم تسليمها للمشتركين فور نشرها.', 'الدراسة قيد الإعداد النهائي حالياً وسيتم تسليمها للمشتركين فور نشرها.'),
            ('سعر تفضيلي مخصص للاشتراكات المسبقة قبل 31 أغسطس 2026', 'الاشتراك في إصدار 2026'),
            ('العرض مخصص للاشتراكات المسبقة المسجلة قبل 31 أغسطس 2026.', ''),
            ('صالح حتى 31 أغسطس 2026 الساعة 23:59', ''),
            ('اشترك قبل 31 أغسطس 2026 واستفد من خصم 10% على السعر العام لإصدار 2026. تُسلَّم الدراسة فور نشرها.', 'تُسلَّم الدراسة فور نشرها.'),
            ('-10% حتى 31 أغسطس', ''),
            ('سعر الاشتراك المسبق ساري حتى 31 أغسطس 2026', ''),
            ('استفد من خصم 10% على أي اشتراك مسجل قبل 31 أغسطس 2026 الساعة 23:59.', 'اشترك في إصدار 2026.'),
            ('نعم. أي اشتراك مسجل في موعد أقصاه 31 أغسطس 2026 الساعة 23:59، بتوقيت الجزائر، يستفيد من سعر الاشتراك المسبق.\\n\\nهذا السعر يظل مضموناً حتى تسليم الدراسة.', 'نعم. يظل الاشتراك مضموناً حتى تسليم الدراسة.'),
            ('سيتم إبلاغ المشتركين بأي تغيير في جدول النشر.\\n\\nسيظل الاشتراك سارياً والسعر التفضيلي الذي تم الحصول عليه قبل 31 أغسطس 2026 سيظل مضموناً.', 'سيتم إبلاغ المشتركين بأي تغيير في جدول النشر.\\n\\nسيظل الاشتراك سارياً.'),
            ('إصدار 2026 مفتوح للاشتراك المسبق بسعر تفضيلي سارٍ حتى 31 أغسطس 2026.', 'إصدار 2026 مفتوح للاشتراك.'),
            ('عرض Early Bird الترويجي صالح حتى 31 أغسطس 2026.', '')
        ]
    }
]

for u in updates:
    filepath = u['file']
    if os.path.exists(filepath):
        with open(filepath, 'r', encoding='utf-8') as f:
            content = f.read()
            
        for old, new in u['replacements']:
            content = content.replace(old, new)
            
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(content)
        print(f"Updated {filepath}")
