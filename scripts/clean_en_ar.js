const fs = require('fs');

const updates = [
    {
        file: 'locales/en.json',
        replacements: [
            ["Early subscriptions open — Preferential rate until August 31, 2026", "Subscriptions open — 2026 Edition"],
            ["Early Subscription Offer — Until August 31, 2026", "Subscription — 2026 Edition"],
            ["Enjoy a 10% discount on all subscriptions recorded before August 31, 2026. The study is currently being finalized and will be delivered to subscribers upon publication.", "The study is currently being finalized and will be delivered to subscribers upon publication."],
            ["Preferential rate reserved for early subscriptions before August 31, 2026", "Subscription for the 2026 Edition"],
            ["Offer reserved for early subscriptions recorded before August 31, 2026.", ""],
            ["Valid until August 31, 2026 at 11:59 PM", ""],
            ["Subscribe before August 31, 2026 and enjoy a 10% discount on the 2026 edition public rate. The study will be delivered upon publication.", "The study will be delivered upon publication."],
            ["-10% until Aug 31", ""],
            ["Early subscription rate valid until August 31, 2026", ""],
            ["Enjoy a 10% discount on all subscriptions recorded before August 31, 2026 at 11:59 PM.", "Subscribe to the 2026 edition."],
            ["Yes. Any subscription recorded no later than August 31, 2026 at 11:59 PM, Algeria time, benefits from the early subscription rate.\\n\\nThis rate remains guaranteed until the study is delivered.", "Yes. The subscription remains guaranteed until the study is delivered."],
            ["Subscribers will be informed of any changes to the publication schedule.\\n\\nThe subscription will remain valid and the preferential rate obtained before August 31, 2026 will remain guaranteed.", "Subscribers will be informed of any changes to the publication schedule.\\n\\nThe subscription will remain valid."],
            ["The 2026 edition is open for early subscription with a preferential rate valid until August 31, 2026.", "The 2026 edition is open for subscription."],
            ["Early Bird promotional offer valid until August 31, 2026.", ""]
        ]
    },
    {
        file: 'locales/ar.json',
        replacements: [
            ["الاشتراكات المسبقة مفتوحة — سعر تفضيلي حتى 31 أغسطس 2026", "الاشتراكات مفتوحة — إصدار 2026"],
            ["عرض الاشتراك المسبق — حتى 31 أغسطس 2026", "الاشتراك — إصدار 2026"],
            ["استفد من خصم 10% على أي اشتراك مسجل قبل 31 أغسطس 2026. الدراسة قيد الإعداد النهائي حالياً وسيتم تسليمها للمشتركين فور نشرها.", "الدراسة قيد الإعداد النهائي حالياً وسيتم تسليمها للمشتركين فور نشرها."],
            ["سعر تفضيلي مخصص للاشتراكات المسبقة قبل 31 أغسطس 2026", "الاشتراك في إصدار 2026"],
            ["العرض مخصص للاشتراكات المسبقة المسجلة قبل 31 أغسطس 2026.", ""],
            ["صالح حتى 31 أغسطس 2026 الساعة 23:59", ""],
            ["اشترك قبل 31 أغسطس 2026 واستفد من خصم 10% على السعر العام لإصدار 2026. تُسلَّم الدراسة فور نشرها.", "تُسلَّم الدراسة فور نشرها."],
            ["-10% حتى 31 أغسطس", ""],
            ["سعر الاشتراك المسبق ساري حتى 31 أغسطس 2026", ""],
            ["استفد من خصم 10% على أي اشتراك مسجل قبل 31 أغسطس 2026 الساعة 23:59.", "اشترك في إصدار 2026."],
            ["نعم. أي اشتراك مسجل في موعد أقصاه 31 أغسطس 2026 الساعة 23:59، بتوقيت الجزائر، يستفيد من سعر الاشتراك المسبق.\\n\\nهذا السعر يظل مضموناً حتى تسليم الدراسة.", "نعم. يظل الاشتراك مضموناً حتى تسليم الدراسة."],
            ["سيتم إبلاغ المشتركين بأي تغيير في جدول النشر.\\n\\nسيظل الاشتراك سارياً والسعر التفضيلي الذي تم الحصول عليه قبل 31 أغسطس 2026 سيظل مضموناً.", "سيتم إبلاغ المشتركين بأي تغيير في جدول النشر.\\n\\nسيظل الاشتراك سارياً."],
            ["إصدار 2026 مفتوح للاشتراك المسبق بسعر تفضيلي سارٍ حتى 31 أغسطس 2026.", "إصدار 2026 مفتوح للاشتراك."],
            ["عرض Early Bird الترويجي صالح حتى 31 أغسطس 2026.", ""]
        ]
    }
];

updates.forEach(u => {
    if (fs.existsSync(u.file)) {
        let content = fs.readFileSync(u.file, 'utf8');
        u.replacements.forEach(([oldStr, newStr]) => {
            content = content.split(oldStr).join(newStr);
        });
        fs.writeFileSync(u.file, content, 'utf8');
        console.log(`Updated ${u.file}`);
    }
});
