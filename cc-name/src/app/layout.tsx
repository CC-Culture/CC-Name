import "./globals.css";
import "./backgrounds.css";

export const metadata = {
  metadataBase: new URL("https://name.cc-tech.cloud"),
  title: {
    default:
      "CC Name - Chinese Name Generator | Ancient Wisdom Meets Modern Life",
    zh: "CC Name - 基于中国文化的姓名推荐系统 | 传统智慧与现代生活的结合",
    en: "CC Name - Chinese Name Generator | Ancient Wisdom Meets Modern Life",
    fr: "CC Name - Générateur de Noms Chinois | La Sagesse Ancienne Rencontre la Vie Moderne",
    es: "CC Name - Generador de Nombres Chinos | La Sabiduría Antigua se Encuentra con la Vida Moderna",
    ja: "CC Name - 中国名ジェネレーター | 古代の知恵と現代の生活の融合",
    ar: "CC Name - مولد الأسماء الصينية | حكمة قديمة تلتقي بالحياة العصرية",
    ru: "CC Name - Генератор Китайских Имен | Древняя Мудрость Встречается с Современной Жизнью",
    pt: "CC Name - Gerador de Nomes Chineses | Sabedoria Antiga Encontra a Vida Moderna",
    bn: "CC Name - চাইনিজ নাম জেনারেটর | প্রাচীন জ্ঞান আধুনিক জীবনের সাথে মিলিত",
    ur: "CC Name - چینی نام جنریٹر | قدیم حکمت جدید زندگی سے ملتی ہے",
  },
  description: {
    default:
      "Discover your perfect Chinese name based on ancient Chinese culture, poetry, and the Five Elements theory. Our AI-powered name generator combines traditional wisdom with modern aesthetics to create meaningful names that resonate with your destiny.",
    zh: "基于中国古代诗经、五行、易经原理的姓名推荐系统。我们的AI驱动名字生成器将传统智慧与现代美学相结合，创造与您命运相呼应的有意义的名字。",
    en: "Discover your perfect Chinese name based on ancient Chinese culture, poetry, and the Five Elements theory. Our AI-powered name generator combines traditional wisdom with modern aesthetics to create meaningful names that resonate with your destiny.",
    fr: "Découvrez votre nom chinois parfait basé sur la culture chinoise ancienne, la poésie et la théorie des Cinq Éléments. Notre générateur de noms alimenté par l'IA combine la sagesse traditionnelle et l'esthétique moderne pour créer des noms significatifs qui résonnent avec votre destin.",
    es: "Descubra su nombre chino perfecto basado en la antigua cultura china, la poesía y la teoría de los Cinco Elementos. Nuestro generador de nombres impulsado por IA combina la sabiduría tradicional con la estética moderna para crear nombres significativos que resuenen con su destino.",
    ja: "古代中国文化、詩、五行説に基づいた完璧な中国名を発見してください。AIを活用した名前ジェネレーターは、伝統的な知恵と現代の美学を組み合わせて、あなたの運命と共鳴する意味のある名前を作成します。",
    ar: "اكتشف اسمك الصيني المثالي المستند إلى الثقافة الصينية القديمة والشعر ونظرية العناصر الخمسة. يجمع مولد الأسماء المدعوم بالذكاء الاصطناعي بين الحكمة التقليدية والجماليات الحديثة لإنشاء أسماء ذات معنى تتناغم مع مصيرك.",
    ru: "Откройте для себя идеальное китайское имя, основанное на древней китайской культуре, поэзии и теории Пяти Элементов. Наш генератор имен на базе ИИ сочетает традиционную мудрость с современной эстетикой для создания значимых имен, которые резонируют с вашей судьбой.",
    pt: "Descubra seu nome chinês perfeito baseado na antiga cultura chinesa, poesia e teoria dos Cinco Elementos. Nosso gerador de nomes com tecnologia de IA combina sabedoria tradicional com estética moderna para criar nomes significativos que ressoam com seu destino.",
    bn: "প্রাচীন চীনা সংস্কৃতি, কবিতা এবং পঞ্চ উপাদান তত্ত্বের উপর ভিত্তি করে আপনার নিখুঁত চীনা নাম আবিষ্কার করুন। আমাদের AI-চালিত নাম জেনারেটর ঐতিহ্যগত জ্ঞান এবং আধুনিক নান্দনিকতা একত্রিত করে অর্থপূর্ণ নাম তৈরি করে যা আপনার ভাগ্যের সাথে সংযুক্ত হয়।",
    ur: "قدیم چینی ثقافت، شاعری، اور پانچ عناصر کے نظریے پر مبنی اپنا مثالی چینی نام دریافت کریں۔ ہمارا AI سے چلنے والا نام جنریٹر روایتی حکمت اور جدید جمالیات کو یکجا کرتا ہے تاکہ معنی خیز نام تخلیق کیے جا سکیں جو آپ کی قسمت کے ساتھ ہم آہنگ ہوں۔",
  },
  keywords: [
    "Chinese Name",
    "中文名字",
    "Nom Chinois",
    "Nombre Chino",
    "中国名",
    "اسم صيني",
    "Китайское Имя",
    "Nome Chinês",
    "চাইনিজ নাম",
    "چینی نام",

    // Default keywords
    "Chinese Culture",
    "Ancient Chinese Wisdom",
    "Poetry",
    "Five Elements",
    "Chinese Name Generator",

    // Chinese (zh) keywords

    "中国文化",
    "古代智慧",
    "诗经",
    "五行",
    "易经",
    "姓名推荐",
    "名字生成器",

    // English (en) keywords
    "Traditional Chinese Names",

    // French (fr) keywords
    "Culture Chinoise",
    "Sagesse Chinoise Ancienne",
    "Poésie",
    "Cinq Éléments",
    "Générateur de Noms Chinois",

    // Spanish (es) keywords
    "Cultura China",
    "Sabiduría China Antigua",
    "Poesía",
    "Cinco Elementos",
    "Generador de Nombres Chinos",

    // Japanese (ja) keywords
    "中国文化",
    "古代中国の知恵",
    "詩",
    "五行",
    "名前ジェネレーター",

    // Arabic (ar) keywords
    "الثقافة الصينية",
    "الحكمة الصينية القديمة",
    "الشعر",
    "العناصر الخمسة",
    "مولد الأسماء الصينية",

    // Russian (ru) keywords
    "Китайская Культура",
    "Древняя Китайская Мудрость",
    "Поэзия",
    "Пять Элементов",
    "Генератор Китайских Имен",

    // Portuguese (pt) keywords
    "Cultura Chinesa",
    "Sabedoria Chinesa Antiga",
    "Poesia",
    "Cinco Elementos",
    "Gerador de Nomes Chineses",

    // Bengali (bn) keywords
    "চীনা সংস্কৃতি",
    "প্রাচীন চীনা জ্ঞান",
    "কবিতা",
    "পঞ্চ উপাদান",
    "চাইনিজ নাম জেনারেটর",

    // Urdu (ur) keywords
    "چینی ثقافت",
    "قدیم چینی حکمت",
    "شاعری",
    "پانچ عناصر",
    "چینی نام جنریٹر",
  ],
  openGraph: {
    title: {
      default:
        "CC Name - Chinese Name Generator | Ancient Wisdom Meets Modern Life",
      zh: "CC Name - 基于中国文化的姓名推荐系统 | 传统智慧与现代生活的结合",
      en: "CC Name - Chinese Name Generator | Ancient Wisdom Meets Modern Life",
      fr: "CC Name - Générateur de Noms Chinois | La Sagesse Ancienne Rencontre la Vie Moderne",
      es: "CC Name - Generador de Nombres Chinos | La Sabiduría Antigua se Encuentra con la Vida Moderna",
      ja: "CC Name - 中国名ジェネレーター | 古代の知恵と現代の生活の融合",
      ar: "CC Name - مولد الأسماء الصينية | حكمة قديمة تلتقي بالحياة العصرية",
      ru: "CC Name - Генератор Китайских Имен | Древняя Мудрость Встречается с Современной Жизнью",
      pt: "CC Name - Gerador de Nomes Chineses | Sabedoria Antiga Encontra a Vida Moderna",
      bn: "CC Name - চাইনিজ নাম জেনারেটর | প্রাচীন জ্ঞান আধুনিক জীবনের সাথে মিলিত",
      ur: "CC Name - چینی نام جنریٹر | قدیم حکمت جدید زندگی سے ملتی ہے",
    },
    description: {
      default:
        "Discover your perfect Chinese name based on ancient Chinese culture, poetry, and the Five Elements theory.",
      zh: "基于中国古代诗经、五行、易经原理的姓名推荐系统，创造与您命运相呼应的有意义的名字。",
      en: "Discover your perfect Chinese name based on ancient Chinese culture, poetry, and the Five Elements theory.",
      fr: "Découvrez votre nom chinois parfait basé sur la culture chinoise ancienne, la poésie et la théorie des Cinq Éléments.",
      es: "Descubra su nombre chino perfecto basado en la antigua cultura china, la poesía y la teoría de los Cinco Elementos.",
      ja: "古代中国文化、詩、五行説に基づいた完璧な中国名を発見してください。",
      ar: "اكتشف اسمك الصيني المثالي المستند إلى الثقافة الصينية القديمة والشعر ونظرية العناصر الخمسة.",
      ru: "Откройте для себя идеальное китайское имя, основанное на древней китайской культуре, поэзии и теории Пяти Элементов.",
      pt: "Descubra seu nome chinês perfeito baseado na antiga cultura chinesa, poesia e teoria dos Cinco Elementos.",
      bn: "প্রাচীন চীনা সংস্কৃতি, কবিতা এবং পঞ্চ উপাদান তত্ত্বের উপর ভিত্তি করে আপনার নিখুঁত চীনা নাম আবিষ্কার করুন।",
      ur: "قدیم چینی ثقافت، شاعری، اور پانچ عناصر کے نظریے پر مبنی اپنا مثالی چینی نام دریافت کریں۔",
    },
    type: "website",
    locale: {
      default: "en_US",
      zh: "zh_CN",
      en: "en_US",
      fr: "fr_FR",
      es: "es_ES",
      ja: "ja_JP",
      ar: "ar_SA",
      ru: "ru_RU",
      pt: "pt_BR",
      bn: "bn_BD",
      ur: "ur_PK",
    },
    siteName: "CC Name",
    url: "https://name.cc-tech.cloud",
  },
  twitter: {
    card: "summary_large_image",
    title: {
      default: "CC Name - Chinese Name Generator",
      zh: "CC Name - 基于中国文化的姓名推荐系统",
      en: "CC Name - Chinese Name Generator",
      fr: "CC Name - Générateur de Noms Chinois",
      es: "CC Name - Generador de Nombres Chinos",
      ja: "CC Name - 中国名ジェネレーター",
      ar: "CC Name - مولد الأسماء الصينية",
      ru: "CC Name - Генератор Китайских Имен",
      pt: "CC Name - Gerador de Nomes Chineses",
      bn: "CC Name - চাইনিজ নাম জেনারেটর",
      ur: "CC Name - چینی نام جنریٹر",
    },
    description: {
      default:
        "Discover your perfect Chinese name based on ancient Chinese culture and wisdom.",
      zh: "基于中国古代文化和智慧的姓名推荐系统，创造与您命运相呼应的有意义的名字。",
      en: "Discover your perfect Chinese name based on ancient Chinese culture and wisdom.",
      fr: "Découvrez votre nom chinois parfait basé sur la culture et la sagesse chinoises anciennes.",
      es: "Descubra su nombre chino perfecto basado en la antigua cultura y sabiduría china.",
      ja: "古代中国の文化と知恵に基づいた完璧な中国名を発見してください。",
      ar: "اكتشف اسمك الصيني المثالي المستند إلى الثقافة والحكمة الصينية القديمة.",
      ru: "Откройте для себя идеальное китайское имя, основанное на древней китайской культуре и мудрости.",
      pt: "Descubra seu nome chinês perfeito baseado na antiga cultura e sabedoria chinesa.",
      bn: "প্রাচীন চীনা সংস্কৃতি এবং জ্ঞানের উপর ভিত্তি করে আপনার নিখুঁত চীনা নাম আবিষ্কার করুন।",
      ur: "قدیم چینی ثقافت اور حکمت پر مبنی اپنا مثالی چینی نام دریافت کریں۔",
    },
    site: "@ccname",
  },
  alternates: {
    canonical: "/",
    languages: {
      zh: "/zh",
      en: "/en",
      fr: "/fr",
      es: "/es",
      ja: "/ja",
      ar: "/ar",
      ru: "/ru",
      pt: "/pt",
      bn: "/bn",
      ur: "/ur",
    },
  },
};

// 根布局函数 - 直接返回子组件，让locale布局处理HTML标签
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // 直接返回子组件，避免HTML标签嵌套
  return children;
}
