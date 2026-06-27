import React, { useState, useEffect, useRef } from "react";
import {
  BarChart, Bar, LineChart, Line, PieChart, Pie, Cell, AreaChart, Area,
  XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid,
} from "recharts";
import {
  Activity, Heart, MapPin, TrendingUp, Sparkles, ShieldCheck,
  MessageSquareQuote, ChevronRight, X, ArrowRight, Coffee, Stethoscope,
  BookOpen, Telescope, Wheat, Cookie, Tractor, Truck, Menu, Lock,
  Users, FileBarChart, Search, CheckCircle2, Filter,
  Accessibility, Languages, Contrast, Type, Volume2, VolumeX, Minus, Plus,
  MessageCircle, Send, RefreshCw, Settings, ThumbsUp, ThumbsDown,
  Pill, Bus, Wrench, Scissors, Baby, Sun,
} from "lucide-react";

/* ---------------------------------------------------------------------- */
/* DESIGN TOKENS                                                          */
/* ---------------------------------------------------------------------- */
const T = {
  sand: "#FBF6EC",
  ink: "#2B2118",
  dune: "#C98A4B",
  duneDark: "#A8703A",
  oasis: "#1F7A6C",
  oasisLight: "#3FA391",
  dusk: "#5B3A52",
  gold: "#E3A857",
  line: "rgba(43,33,24,0.12)",
  card: "rgba(255,255,255,0.62)",
};

const FONTS = `
@import url('https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,400..700&family=Space+Grotesk:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500&family=IBM+Plex+Sans+Arabic:wght@400;500;600;700&family=Noto+Kufi+Arabic:wght@400..700&display=swap');
`;

/* ---------------------------------------------------------------------- */
/* I18N — UI STRINGS                                                      */
/* ---------------------------------------------------------------------- */
const STR = {
  en: {
    brand: "Desert Pulse",
    footer: "Desert Pulse — built for the Tatweer Hackathon · Challenge 3: The Data Gap for Local Entrepreneurs",

    // landing
    heroEyebrow: "Al Qua'a · Community Intelligence Platform",
    heroTitle: ["Build the business", "your community is", "already asking for."],
    heroSub: "Desert Pulse turns anonymous resident feedback into evidence-backed business opportunities — so entrepreneurs in rural communities stop guessing and start building what's actually needed.",
    ctaExplore: "Start Exploring",
    ctaShare: "Share Your Needs",
    pulseLabel: "Live community signal — last 24 hours",
    howEyebrow: "How it works",
    howTitle: "From a voice note to a viable business",
    fListenT: "Listen",
    fListenB: "Residents answer a few simple, anonymous questions about what their community is missing.",
    fAnalyzeT: "Analyze",
    fAnalyzeB: "AI clusters responses into ranked, scored business opportunities with supporting evidence.",
    fLaunchT: "Launch",
    fLaunchB: "Entrepreneurs get a full business plan — costs, customers, marketing, and a 30-day roadmap.",
    howCta: "Browse opportunities & generate a plan",
    howStepHint: "Tap to open",

    // stats
    communityResponses: "Community Responses",
    opportunitiesFound: "Business Opportunities Found",
    entrepreneursHelped: "Entrepreneurs Helped",
    needsIdentified: "Local Needs Identified",

    // survey
    surveyEyebrow: "100% anonymous · takes 90 seconds",
    surveyTitle: "Tell us what Al Qua'a needs",
    surveySub: "Answer as many as you like — even one response helps.",
    surveyPlaceholder: "Type your answer…",
    surveySubmit: "Submit Anonymously",
    surveyNeedAnswer: "Please answer at least one question before submitting.",
    surveyVoteLabel: "Which need would help Al Qua'a most?",
    surveyMatched: "Your response was added to the ranking for",
    surveyMatchedTail: "open Insights to see it.",
    surveyCreated: "We've created a new community opportunity from your answer:",
    surveyCreatedTail: "find it under Opportunities.",
    oppNewBadge: "New · from the community",
    surveyNeedPick: "Pick which need your answer is about (above) so it can be added to the rankings.",
    contribTitle: "Your contributions this session",
    contribIntro: "Submissions you've added — these are reflected in the rankings below:",
    youSupported: "✓ You supported this",
    youTag: " · your pick",
    surveyDoneTitle: "Thank you — your voice just moved the needle.",
    surveyDoneSub: "Your anonymous response has been added to the community signal. No personal data was collected or stored.",
    seeInsights: "See Community Insights",
    submitAnother: "Submit Another",

    // dashboard
    dashEyebrow: "AI Demand Analysis",
    dashTitle: "Insights Dashboard",
    dashSub: "Live patterns extracted from 1,284 anonymous community responses.",
    topRequested: "Top requested services",
    catBreakdown: "Category breakdown",
    trending: "Trending needs by category (6-month)",
    rankings: "AI opportunity rankings",
    trAgriculture: "Agriculture",
    trFoodBev: "Food & Bev",
    trServices: "Services",

    // marketplace
    mktEyebrow: "Opportunity Marketplace",
    mktTitle: "23 AI-ranked business opportunities",
    mktSub: "Every opportunity is backed by real survey evidence, not assumptions.",
    all: "All",
    generatePlan: "Generate Business Plan",
    whyThis: "Why this?",
    startupCost: "Startup cost",
    monthlyCustomers: "Monthly customers",
    expectedCustomers: "Expected customers",
    opportunitySize: "Opportunity size",
    confidence: "confidence",
    responses: "responses",

    // generator
    genEyebrow: "AI Business Generator",
    problem: "Problem",
    evidence: "Evidence",
    aiRec: "AI recommendation",
    aiRecBody: "Strong, evidence-backed signal with",
    aiRecBody2: "confidence based on",
    aiRecBody3: "responses.",
    save: "Save",
    saved: "Saved",
    startupReport: "Startup Report",
    secSummary: "Executive Summary",
    secPersona: "Customer Persona",
    secPricing: "Pricing Strategy",
    secMarketing: "Marketing Plan",
    secFinancial: "Financial Snapshot",
    secRoadmap: "30-Day Launch Roadmap",
    secRisks: "Potential Risks",
    secFit: "Tailored for you",
    planHelpfulQ: "Was this plan helpful?",
    planHelpfulYes: "Yes",
    planHelpfulNo: "Not really",
    planThanksYes: "Thanks! We've counted you in Entrepreneurs Helped.",
    planThanksNo: "Thanks for the feedback — we'll keep improving the plans.",
    tailorTitle: "Tailor this plan to you (optional)",
    tailorBudget: "Your budget",
    tailorTime: "Time you can give",
    tailorExperience: "Your experience",
    tailorHint: "Pick any that apply — the plan adjusts its guidance, pace, and risks to match.",
    timeEvenings: "Evenings/weekends",
    timePart: "Part-time",
    timeFull: "Full-time",
    expNew: "New to this",
    expSome: "Some experience",
    expExperienced: "Experienced",
    fitBudgetTight: "Your budget is below the typical startup cost, so start lean: launch a smaller first version and reinvest as demand proves out.",
    fitBudgetOk: "Your budget comfortably covers the typical startup cost, so you can launch at full scope.",
    fitTimeEvenings: "At an evenings-and-weekends pace (~8–10 hrs/week), expect the 30-day roadmap to stretch to roughly 6–8 weeks.",
    fitTimePart: "Part-time (~20 hrs/week) is enough to keep to the 30-day timeline.",
    fitTimeFull: "Full-time focus lets you compress the roadmap and launch sooner.",
    fitExpNew: "Since you're new to this, add an early learning step — shadow someone doing it locally or take a short course before launch.",
    fitExpSome: "With some experience, focus your early effort on the gaps rather than the basics.",
    fitExpExperienced: "Your experience means you can skip the basics and focus on differentiation and scale.",
    riskBudget: "Starting capital is tight versus the typical setup cost — protect cash flow and avoid large upfront commitments.",
    secExpansion: "Future Expansion",
    size: "Size",
    estCustomers: "Est. customers",
    genEmpty: "No opportunity selected yet.",
    browseOpps: "Browse Opportunities",

    // saved
    savedEyebrow: "Your shortlist",
    savedTitle: "Saved Opportunities",
    savedEmpty: "You haven't saved any opportunities yet.",
    browseMarket: "Browse the Marketplace",
    savedHistoryEyebrow: "Your survey responses",
    savedHistoryEmpty: "You haven't submitted any survey responses this session.",

    // validation
    valEyebrow: "Falsifiability & Evidence",
    valTitle: "Community Validation",
    valSub: "Every recommendation Desert Pulse makes is traceable back to real, anonymous community input.",
    totalResponses: "Total Survey Responses",
    activeParticipants: "Active Participants",
    businessesRequested: "Businesses Requested",
    responseRate: "Response Rate",
    newThisWeek: "New Responses This Week",
    communityQuotes: "Community quotes",
    aiConfidence: "AI confidence per opportunity",
    whyRecommended: "Why was this recommended?",
    supportText: "survey responses support this opportunity",
    trendRising: "Demand trend rising over the last 6 months",
    aiReasoning: "AI reasoning",
    exampleComments: "Example anonymized comments",
    demandMap: "Interactive demand map — Al Qua'a",
    mapPrompt: "Tap a dot to see survey participation and top requested service for that area.",
    mapResponses: "responses",
    topRequest: "Top request",
    transparency: "Survey transparency",
    tr1: "All responses are anonymous.",
    tr2: "Individual data is never shared.",
    tr3: "Only aggregated trends are shown.",
    tr4: "Entrepreneurs receive insights, not personal information.",

    // about
    aboutEyebrow: "About & Impact",
    aboutTitle: "Closing the data gap for rural entrepreneurs",
    aboutBody: "Entrepreneurs in communities like Al Qua'a often build on assumptions instead of real local demand. Desert Pulse replaces guesswork with evidence — crowdsourcing community needs and converting them into AI-ranked, falsifiable business opportunities, built for the Tatweer Hackathon's Challenge 3: The Data Gap for Local Entrepreneurs.",
    aEvidenceT: "Evidence over assumption",
    aEvidenceB: "Every opportunity is traceable to real survey responses, with full reasoning shown.",
    aRuralT: "Built for rural context",
    aRuralB: "Mobile-first, low-bandwidth friendly, and designed around the realities of communities like Al Qua'a.",
    aPilotT: "Pilot-ready",
    aPilotB: "A working MVP that could be piloted in Al Qua'a — and scaled to similar communities across the UAE.",
    exploreOpps: "Explore Opportunities",
    seeEvidence: "See the Evidence",

    // accessibility
    a11y: "Accessibility",
    a11yLanguage: "Language",
    a11yContrast: "Contrast",
    a11yTextSize: "Text size",
    a11yReadPage: "Read this page",
    a11yStop: "Stop reading",
    narrNoVoice: "Your device has no Arabic voice installed, so Arabic read-aloud stays silent. You can add an Arabic text-to-speech voice in your device's language or accessibility settings, then try again. (Tap to dismiss.)",
    listen: "Listen",
    on: "On",
    off: "Off",
    // AI business coach
    agentName: "Pulse · Help",
    agentTagline: "Answers to common questions about starting a business",
    agentOpen: "Open the help chatbot",
    agentGreeting: "Marhaba! I'm Pulse. Tap one of the common questions below and I'll answer it — all about starting a business in Al Qua'a.",
    agentPlaceholder: "Type a question, or tap one below…",
    agentSend: "Send",
    agentError: "Sorry — something went wrong. Please tap one of the questions below.",
    agentNewChat: "New chat",
    agentScopeNote: "I answer a set of common business questions.",
    agentSuggested: "Common questions",
    agentFallback: "I can answer the common questions below — tap one and I'll help.",
    agentChip1: "How do I license a small business in the UAE?",
    agentChip2: "What does a home bakery cost to start?",
    agentChip3: "How do I find my first customers?",
    historyTitle: "Your responses this session",
    historyNote: "These are kept only in your browser for this visit. Desert Pulse is a prototype with no server yet, so nothing is sent anywhere or saved permanently — refreshing the page clears them.",
    historyResponse: "Response",
  },
  ar: {
    brand: "نبض الصحراء",
    footer: "نبض الصحراء — صُمّم لهاكاثون تطوير · التحدي 3: فجوة البيانات لرواد الأعمال المحليين",

    heroEyebrow: "القوع · منصة الذكاء المجتمعي",
    heroTitle: ["ابدأ المشروع", "الذي يطلبه", "مجتمعك بالفعل."],
    heroSub: "يحوّل نبض الصحراء ملاحظات السكان المجهولة إلى فرص أعمال مدعومة بالأدلة — لكي يتوقف رواد الأعمال في المجتمعات الريفية عن التخمين ويبنوا ما هو مطلوب فعلًا.",
    ctaExplore: "ابدأ الاستكشاف",
    ctaShare: "شاركنا احتياجاتك",
    pulseLabel: "إشارة المجتمع المباشرة — آخر 24 ساعة",
    howEyebrow: "كيف يعمل",
    howTitle: "من ملاحظة صوتية إلى مشروع قابل للتطبيق",
    fListenT: "الإصغاء",
    fListenB: "يجيب السكان عن بضعة أسئلة بسيطة ومجهولة حول ما ينقص مجتمعهم.",
    fAnalyzeT: "التحليل",
    fAnalyzeB: "يجمّع الذكاء الاصطناعي الإجابات في فرص أعمال مرتّبة ومقيّمة مع أدلة داعمة.",
    fLaunchT: "الإطلاق",
    fLaunchB: "يحصل رواد الأعمال على خطة عمل كاملة — التكاليف والعملاء والتسويق وخارطة طريق لـ30 يومًا.",
    howCta: "تصفّح الفرص وأنشئ خطة",
    howStepHint: "اضغط للفتح",

    communityResponses: "استجابات المجتمع",
    opportunitiesFound: "فرص الأعمال المكتشفة",
    entrepreneursHelped: "رواد أعمال تمّت مساعدتهم",
    needsIdentified: "احتياجات محلية محدّدة",

    surveyEyebrow: "مجهول 100٪ · يستغرق 90 ثانية",
    surveyTitle: "أخبرنا بما يحتاجه القوع",
    surveySub: "أجب عن العدد الذي تريده — حتى إجابة واحدة تساعد.",
    surveyPlaceholder: "اكتب إجابتك…",
    surveySubmit: "إرسال بشكل مجهول",
    surveyNeedAnswer: "يرجى الإجابة عن سؤال واحد على الأقل قبل الإرسال.",
    surveyVoteLabel: "ما الحاجة التي ستفيد القوع أكثر؟",
    surveyMatched: "أُضيف ردّك إلى ترتيب",
    surveyMatchedTail: "افتح الرؤى لمشاهدته.",
    surveyCreated: "أنشأنا فرصة مجتمعية جديدة من إجابتك:",
    surveyCreatedTail: "تجدها ضمن الفرص.",
    oppNewBadge: "جديدة · من المجتمع",
    surveyNeedPick: "اختر الحاجة التي يتعلق بها ردّك (بالأعلى) حتى تُضاف إلى الترتيب.",
    contribTitle: "مساهماتك في هذه الجلسة",
    contribIntro: "الردود التي أضفتها — وهي منعكسة في الترتيب أدناه:",
    youSupported: "✓ لقد دعمت هذه",
    youTag: " · اختيارك",
    surveyDoneTitle: "شكرًا — صوتك أحدث فرقًا للتو.",
    surveyDoneSub: "تمت إضافة استجابتك المجهولة إلى إشارة المجتمع. لم يتم جمع أو تخزين أي بيانات شخصية.",
    seeInsights: "عرض رؤى المجتمع",
    submitAnother: "إرسال إجابة أخرى",

    dashEyebrow: "تحليل الطلب بالذكاء الاصطناعي",
    dashTitle: "لوحة الرؤى",
    dashSub: "أنماط حية مستخلصة من 1,284 استجابة مجتمعية مجهولة.",
    topRequested: "أكثر الخدمات طلبًا",
    catBreakdown: "التوزيع حسب الفئة",
    trending: "الاحتياجات الرائجة حسب الفئة (6 أشهر)",
    rankings: "ترتيب الفرص بالذكاء الاصطناعي",
    trAgriculture: "الزراعة",
    trFoodBev: "الأطعمة والمشروبات",
    trServices: "الخدمات",

    mktEyebrow: "سوق الفرص",
    mktTitle: "23 فرصة أعمال مرتّبة بالذكاء الاصطناعي",
    mktSub: "كل فرصة مدعومة بأدلة استبيان حقيقية، لا بافتراضات.",
    all: "الكل",
    generatePlan: "إنشاء خطة عمل",
    whyThis: "لماذا هذه؟",
    startupCost: "تكلفة البدء",
    monthlyCustomers: "العملاء شهريًا",
    expectedCustomers: "العملاء المتوقعون",
    opportunitySize: "حجم الفرصة",
    confidence: "ثقة",
    responses: "استجابة",

    genEyebrow: "مولّد الأعمال بالذكاء الاصطناعي",
    problem: "المشكلة",
    evidence: "الدليل",
    aiRec: "توصية الذكاء الاصطناعي",
    aiRecBody: "إشارة قوية مدعومة بالأدلة بثقة",
    aiRecBody2: "استنادًا إلى",
    aiRecBody3: "استجابة.",
    save: "حفظ",
    saved: "محفوظة",
    startupReport: "تقرير البدء",
    secSummary: "الملخص التنفيذي",
    secPersona: "شخصية العميل",
    secPricing: "استراتيجية التسعير",
    secMarketing: "خطة التسويق",
    secFinancial: "لمحة مالية",
    secRoadmap: "خارطة الإطلاق خلال 30 يومًا",
    secRisks: "المخاطر المحتملة",
    secFit: "مُخصّص لك",
    planHelpfulQ: "هل كانت هذه الخطة مفيدة؟",
    planHelpfulYes: "نعم",
    planHelpfulNo: "ليس تمامًا",
    planThanksYes: "شكرًا! تمّت إضافتك إلى عدد رواد الأعمال الذين تمّت مساعدتهم.",
    planThanksNo: "شكرًا على ملاحظتك — سنواصل تحسين الخطط.",
    tailorTitle: "خصّص هذه الخطة لك (اختياري)",
    tailorBudget: "ميزانيتك",
    tailorTime: "الوقت المتاح لك",
    tailorExperience: "خبرتك",
    tailorHint: "اختر ما ينطبق عليك — وستتكيّف الخطة في إرشاداتها ووتيرتها ومخاطرها وفقًا لذلك.",
    timeEvenings: "مساءً/عطلات",
    timePart: "دوام جزئي",
    timeFull: "دوام كامل",
    expNew: "جديد على هذا",
    expSome: "بعض الخبرة",
    expExperienced: "خبير",
    fitBudgetTight: "ميزانيتك أقل من التكلفة المعتادة للبدء، لذا ابدأ بموارد محدودة: أطلق نسخة أولى أصغر وأعد الاستثمار مع تأكّد الطلب.",
    fitBudgetOk: "تغطي ميزانيتك التكلفة المعتادة للبدء بأريحية، لذا يمكنك الإطلاق بالنطاق الكامل.",
    fitTimeEvenings: "بوتيرة المساء وعطلات الأسبوع (≈8–10 ساعات أسبوعيًا)، توقّع أن تمتد خارطة الـ30 يومًا إلى نحو 6–8 أسابيع.",
    fitTimePart: "الدوام الجزئي (≈20 ساعة أسبوعيًا) كافٍ للالتزام بجدول الـ30 يومًا.",
    fitTimeFull: "التفرّغ الكامل يتيح لك ضغط الخارطة والإطلاق في وقت أبكر.",
    fitExpNew: "بما أنك جديد على هذا، أضِف خطوة تعلّم مبكرة — رافق من يمارسه محليًا أو خذ دورة قصيرة قبل الإطلاق.",
    fitExpSome: "مع بعض الخبرة، ركّز جهدك المبكر على الثغرات بدلًا من الأساسيات.",
    fitExpExperienced: "خبرتك تعني أنه يمكنك تجاوز الأساسيات والتركيز على التميّز والتوسّع.",
    riskBudget: "رأس المال المبدئي محدود مقارنةً بالتكلفة المعتادة للإعداد — احمِ التدفق النقدي وتجنّب الالتزامات الكبيرة المسبقة.",
    secExpansion: "التوسّع المستقبلي",
    size: "الحجم",
    estCustomers: "العملاء المقدّرون",
    genEmpty: "لم يتم اختيار فرصة بعد.",
    browseOpps: "تصفّح الفرص",

    savedEyebrow: "قائمتك المختصرة",
    savedTitle: "الفرص المحفوظة",
    savedEmpty: "لم تحفظ أي فرص بعد.",
    browseMarket: "تصفّح السوق",
    savedHistoryEyebrow: "استجابات الاستبيان الخاصة بك",
    savedHistoryEmpty: "لم تُرسل أي استجابات للاستبيان في هذه الجلسة.",

    valEyebrow: "قابلية التحقق والأدلة",
    valTitle: "التحقق المجتمعي",
    valSub: "كل توصية يقدّمها نبض الصحراء يمكن تتبّعها إلى مدخلات مجتمعية حقيقية ومجهولة.",
    totalResponses: "إجمالي استجابات الاستبيان",
    activeParticipants: "المشاركون النشطون",
    businessesRequested: "الأعمال المطلوبة",
    responseRate: "معدل الاستجابة",
    newThisWeek: "استجابات جديدة هذا الأسبوع",
    communityQuotes: "اقتباسات من المجتمع",
    aiConfidence: "ثقة الذكاء الاصطناعي لكل فرصة",
    whyRecommended: "لماذا أُوصي بهذه؟",
    supportText: "استجابة استبيان تدعم هذه الفرصة",
    trendRising: "اتجاه الطلب في ارتفاع خلال الأشهر الستة الماضية",
    aiReasoning: "تعليل الذكاء الاصطناعي",
    exampleComments: "أمثلة على تعليقات مجهولة",
    demandMap: "خريطة الطلب التفاعلية — القوع",
    mapPrompt: "اضغط على نقطة لعرض مشاركة الاستبيان وأكثر الخدمات طلبًا في تلك المنطقة.",
    mapResponses: "استجابة",
    topRequest: "أكثر طلب",
    transparency: "شفافية الاستبيان",
    tr1: "جميع الاستجابات مجهولة.",
    tr2: "لا تتم مشاركة البيانات الفردية أبدًا.",
    tr3: "تُعرض الاتجاهات المجمّعة فقط.",
    tr4: "يتلقى رواد الأعمال رؤى، لا معلومات شخصية.",

    aboutEyebrow: "عن المنصة والأثر",
    aboutTitle: "سدّ فجوة البيانات لرواد الأعمال في الريف",
    aboutBody: "غالبًا ما يبني رواد الأعمال في مجتمعات مثل القوع على افتراضات بدلًا من الطلب المحلي الحقيقي. يستبدل نبض الصحراء التخمين بالأدلة — بجمع احتياجات المجتمع وتحويلها إلى فرص أعمال قابلة للتحقق ومرتّبة بالذكاء الاصطناعي، ضمن التحدي 3 لهاكاثون تطوير: فجوة البيانات لرواد الأعمال المحليين.",
    aEvidenceT: "الدليل قبل الافتراض",
    aEvidenceB: "كل فرصة يمكن تتبّعها إلى استجابات استبيان حقيقية، مع عرض التعليل كاملًا.",
    aRuralT: "مصمّم للسياق الريفي",
    aRuralB: "يعمل أولًا على الجوال، ومناسب للشبكات الضعيفة، ومصمّم حول واقع مجتمعات مثل القوع.",
    aPilotT: "جاهز للتجربة",
    aPilotB: "نموذج أولي عملي يمكن تجربته في القوع — وتوسيعه إلى مجتمعات مماثلة في الإمارات.",
    exploreOpps: "استكشف الفرص",
    seeEvidence: "اطّلع على الأدلة",

    a11y: "إمكانية الوصول",
    a11yLanguage: "اللغة",
    a11yContrast: "التباين",
    a11yTextSize: "حجم النص",
    a11yReadPage: "اقرأ هذه الصفحة",
    a11yStop: "إيقاف القراءة",
    narrNoVoice: "لا يوجد صوت عربي مثبّت على جهازك، لذا تبقى القراءة العربية صامتة. يمكنك إضافة صوت عربي للنطق من إعدادات اللغة أو إمكانية الوصول في جهازك ثم المحاولة مجددًا. (اضغط للإغلاق.)",
    listen: "استماع",
    on: "مفعّل",
    off: "معطّل",
    // روبوت المساعدة
    agentName: "Pulse · مساعدة",
    agentTagline: "إجابات عن أسئلة شائعة حول بدء مشروع",
    agentOpen: "افتح روبوت المساعدة",
    agentGreeting: "مرحبًا! أنا Pulse. اختر أحد الأسئلة الشائعة بالأسفل وسأجيبك — كل ما يخص بدء مشروع في القوع.",
    agentPlaceholder: "اكتب سؤالًا، أو اختر واحدًا بالأسفل…",
    agentSend: "إرسال",
    agentError: "عذرًا — حدث خطأ ما. اختر أحد الأسئلة بالأسفل.",
    agentNewChat: "محادثة جديدة",
    agentScopeNote: "أجيب عن مجموعة من الأسئلة الشائعة حول الأعمال.",
    agentSuggested: "أسئلة شائعة",
    agentFallback: "يمكنني الإجابة عن الأسئلة الشائعة بالأسفل — اختر سؤالًا وسأساعدك.",
    agentChip1: "كيف أرخّص مشروعًا صغيرًا في الإمارات؟",
    agentChip2: "كم تكلفة بدء مخبز منزلي؟",
    agentChip3: "كيف أجد أوّل عملائي؟",
    historyTitle: "استجاباتك في هذه الجلسة",
    historyNote: "تُحفظ هذه فقط في متصفحك خلال هذه الزيارة. «نبض الصحراء» نموذج أوّلي بلا خادم بعد، لذا لا يُرسَل شيء إلى أي مكان ولا يُحفظ بشكل دائم — وتحديث الصفحة يمسحها.",
    historyResponse: "استجابة",
  },
};

const t = (key, lang) => (STR[lang] && STR[lang][key] != null ? STR[lang][key] : STR.en[key] ?? key);
const L = (o, lang) => (lang === "ar" && o && o.ar ? { ...o, ...o.ar } : o);

/* ---------------------------------------------------------------------- */
/* DATA (bilingual)                                                       */
/* ---------------------------------------------------------------------- */
const STATS = [
  { key: "communityResponses", value: "1,284" },
  { key: "opportunitiesFound", value: "23" },
  { key: "entrepreneursHelped", value: "67" },
  { key: "needsIdentified", value: "142" },
];

const VALIDATION_STATS = [
  { key: "totalResponses", value: "1,284" },
  { key: "activeParticipants", value: "412" },
  { key: "businessesRequested", value: "38" },
  { key: "responseRate", value: "78%" },
  { key: "newThisWeek", value: "96" },
];

// Adds the live session response count onto a numeric base value (keeps commas).
function bumpCount(value, extra = 0) {
  const base = parseInt(String(value).replace(/,/g, ""), 10);
  if (isNaN(base) || !extra) return value;
  return (base + extra).toLocaleString("en-US");
}

// Live ranking: fold session survey votes into each opportunity's numbers.
function votesFor(votes, id) { return (votes && votes[id]) || 0; }
function liveResponses(o, votes) { return o.supportingResponses + votesFor(votes, o.id); }
function liveScore(o, votes) { return Math.min(100, o.demandScore + votesFor(votes, o.id)); }
function rankedOpportunities(votes) {
  return [...OPPORTUNITIES].sort((a, b) => liveScore(b, votes) - liveScore(a, votes) || b.supportingResponses - a.supportingResponses);
}

// Map free-text survey answers to the most relevant opportunity (so a typed
// response still lands in the rankings even if no need chip was tapped).
const OPP_KEYWORDS = {
  "camel-vet": ["camel", "vet", "veterinary", "animal", "livestock", "calv", "herd", "إبل", "بيطري", "حيوان", "ماشية"],
  "evening-cafe": ["cafe", "café", "coffee", "restaurant", "gather", "evening", "hangout", "tea", "مقهى", "قهوة", "مطعم", "مساء"],
  "food-delivery": ["deliver", "delivery", "grocer", "food", "supermarket", "order", "توصيل", "طعام", "بقالة", "طلب"],
  "home-tutoring": ["tutor", "study", "exam", "school", "teach", "lesson", "math", "educat", "kids", "homework", "درس", "تدريس", "مدرسة", "امتحان", "تعليم", "أطفال"],
  "stargazing": ["star", "stargaz", "astronom", "night sky", "desert", "tourism", "tourist", "activity", "weekend", "نجوم", "سياح", "صحراء", "نشاط"],
  "date-marketplace": ["date", "market", "sell", "produce", "surplus", "تمور", "تمر", "سوق", "بيع", "محصول"],
  "home-bakery": ["bake", "bakery", "bread", "cake", "sweets", "pastry", "dessert", "cookie", "مخبز", "خبز", "كعك", "حلويات", "معجنات"],
  "equipment-rental": ["equipment", "rental", "rent", "tractor", "machinery", "tool", "harvest", "farm gear", "معدات", "تأجير", "جرار", "حصاد", "آلات"],
  "mobile-health": ["health", "clinic", "pharmac", "medicine", "medication", "prescription", "doctor", "nurse", "blood pressure", "sick", "صحة", "صيدلية", "دواء", "عيادة", "طبيب", "وصفة", "مريض"],
  "town-transport": ["transport", "bus", "commute", "school run", "ride", "van", "taxi", "lift to", "النقل", "حافلة", "مواصلات", "باص", "مدرسة نقل"],
  "appliance-repair": ["repair", "fix", "broken", "air condition", "appliance", "technician", "maintenance", "fridge", "washing machine", "تصليح", "إصلاح", "مكيف", "ثلاجة", "فني", "صيانة", "عطل"],
  "home-salon": ["salon", "haircut", "barber", "beauty", "tailor", "sew", "alteration", "stitch", "صالون", "حلاقة", "تجميل", "خياطة", "خياط", "تفصيل"],
  "daycare": ["daycare", "nursery", "childcare", "babysit", "kindergarten", "preschool", "early learning", "حضانة", "روضة", "رعاية أطفال", "تعلّم مبكر"],
  "solar-water": ["solar", "panel", "energy", "electricity bill", "irrigation", "pump", "diesel", "well water", "sustainab", "طاقة شمسية", "شمسية", "كهرباء", "مياه", "ري", "مضخة", "ديزل", "بئر"],
};
function matchOpportunity(text) {
  const s = (text || "").toLowerCase();
  if (!s.trim()) return null;
  let best = null, bestScore = 0;
  for (const o of OPPORTUNITIES) {
    let score = 0;
    for (const k of (OPP_KEYWORDS[o.id] || [])) if (s.includes(k)) score++;
    if (score > bestScore) { bestScore = score; best = o; }
  }
  return best;
}

// Reinforce an existing community-created opportunity if the new text overlaps it.
function matchCommunity(text, communityOpps) {
  const words = ((text || "").toLowerCase().match(/[a-z\u0600-\u06FF]{4,}/g) || []);
  let best = null, bestScore = 0;
  for (const o of (communityOpps || [])) {
    const probl = (o.problem || "").toLowerCase();
    let score = 0;
    for (const w of words) if (probl.includes(w)) score++;
    if (score > bestScore && score >= 2) { bestScore = score; best = o; }
  }
  return best;
}

// Build a brand-new opportunity straight from a resident's survey text (no AI).
function makeCommunityOpp(text, idSeed) {
  const clean = (text || "").trim().replace(/\s+/g, " ");
  const titleWords = clean.split(" ").slice(0, 5).join(" ");
  const name = titleWords.charAt(0).toUpperCase() + titleWords.slice(1);
  const opp = {
    id: `community-${idSeed}`,
    isCommunity: true,
    name,
    category: "Community Need",
    icon: MessageSquareQuote,
    demandScore: 55,
    supportingResponses: 1,
    communitySupport: 60,
    startupCost: "To be estimated",
    monthlyCustomers: "TBD",
    opportunitySize: "TBD",
    problem: clean,
    evidence: "Raised directly by a resident through the Desert Pulse survey. Not yet cross-validated against other responses.",
    targetAudience: "Residents of Al Qua'a who share this need.",
    confidence: "Emerging",
    trend: [40, 44, 47, 51, 56, 61, 66],
    reasons: [
      "Submitted directly by a community member",
      "Reflects a real, locally expressed need",
      "Awaiting more responses to confirm demand",
    ],
    comments: [clean],
    ar: {
      name,
      category: "حاجة مجتمعية",
      startupCost: "بحاجة إلى تقدير",
      monthlyCustomers: "غير محدد",
      opportunitySize: "غير محدد",
      problem: clean,
      evidence: "وردت مباشرة من أحد سكان القوع عبر استبيان نبض الصحراء، ولم تُؤكَّد بعد مقابل ردود أخرى.",
      targetAudience: "سكان القوع الذين يشاركون هذه الحاجة.",
      confidence: "ناشئة",
      reasons: [
        "مقدَّمة مباشرة من أحد أفراد المجتمع",
        "تعكس حاجة محلية حقيقية",
        "بانتظار مزيد من الردود لتأكيد الطلب",
      ],
      comments: [clean],
    },
  };
  return opp;
}

const OPPORTUNITIES = [
  {
    id: "camel-vet", name: "Mobile Camel Veterinary Service", icon: Stethoscope,
    category: "Agriculture & Livestock", demandScore: 94, confidence: "High",
    supportingResponses: 147, communitySupport: 91, startupCost: "AED 45,000–70,000",
    monthlyCustomers: "80–120", opportunitySize: "Medium",
    problem: "Camel owners travel 40+ minutes to the nearest veterinary clinic, risking livestock health during emergencies.",
    evidence: "147 residents reported camel ownership and described long travel times for veterinary care, especially during calving season.",
    targetAudience: "Camel owners and small livestock farms within a 25km radius of Al Qua'a.",
    reasons: [
      "High frequency of camel ownership across surveyed households",
      "Residents repeatedly report long travel times for veterinary care",
      "Strong seasonal demand spikes during calving season",
    ],
    comments: [
      "A mobile camel veterinarian would save us hours.",
      "Our nearest vet is in Al Ain — that's almost an hour each way.",
      "During calving season we sometimes can't get help in time.",
    ],
    trend: [40, 55, 61, 78, 85, 94],
    ar: {
      name: "خدمة بيطرية متنقلة للإبل", category: "الزراعة والثروة الحيوانية",
      confidence: "عالية", opportunitySize: "متوسطة",
      startupCost: "45,000–70,000 درهم", monthlyCustomers: "80–120",
      problem: "يقطع أصحاب الإبل أكثر من 40 دقيقة للوصول إلى أقرب عيادة بيطرية، مما يعرّض صحة الماشية للخطر في الحالات الطارئة.",
      evidence: "أفاد 147 من السكان بامتلاكهم للإبل ووصفوا طول مسافة التنقل للحصول على الرعاية البيطرية، خاصة في موسم الولادة.",
      targetAudience: "أصحاب الإبل والمزارع الصغيرة للماشية ضمن نطاق 25 كم من القوع.",
      reasons: [
        "ارتفاع نسبة امتلاك الإبل بين الأسر المشمولة بالاستبيان",
        "تكرار شكاوى السكان من طول مسافة التنقل للرعاية البيطرية",
        "ارتفاع موسمي قوي في الطلب أثناء موسم الولادة",
      ],
      comments: [
        "وجود طبيب بيطري متنقل للإبل سيوفّر علينا ساعات.",
        "أقرب طبيب بيطري لنا في العين — أي ساعة تقريبًا في كل اتجاه.",
        "في موسم الولادة لا نستطيع أحيانًا الحصول على المساعدة في الوقت المناسب.",
      ],
    },
  },
  {
    id: "evening-cafe", name: "Evening Café", icon: Coffee,
    category: "Food & Beverage", demandScore: 89, confidence: "High",
    supportingResponses: 203, communitySupport: 86, startupCost: "AED 80,000–120,000",
    monthlyCustomers: "300–450", opportunitySize: "Medium",
    problem: "There's no place to gather after sunset — residents drive to Al Ain for evening socializing.",
    evidence: "203 responses specifically requested an evening gathering space in Al Qua'a.",
    targetAudience: "Families and young adults seeking evening leisure spots.",
    reasons: [
      "Highest single-category request volume in the survey",
      "Strong evening and weekend demand pattern",
      "No existing evening café within Al Qua'a",
    ],
    comments: [
      "I wish there was a café open after sunset.",
      "We end up sitting in the car park because there's nowhere to go.",
      "Even a simple shaded café would be enough.",
    ],
    trend: [50, 58, 66, 74, 81, 89],
    ar: {
      name: "مقهى مسائي", category: "الأطعمة والمشروبات",
      confidence: "عالية", opportunitySize: "متوسطة",
      startupCost: "80,000–120,000 درهم", monthlyCustomers: "300–450",
      problem: "لا يوجد مكان للتجمّع بعد الغروب — يسافر السكان إلى العين للتواصل الاجتماعي مساءً.",
      evidence: "طلب 203 مشاركًا تحديدًا وجود مساحة للتجمّع المسائي في القوع.",
      targetAudience: "العائلات والشباب الباحثون عن أماكن ترفيه مسائية.",
      reasons: [
        "أعلى حجم طلب لفئة واحدة في الاستبيان",
        "نمط طلب قوي في المساء وعطلة نهاية الأسبوع",
        "لا يوجد مقهى مسائي حاليًا داخل القوع",
      ],
      comments: [
        "أتمنى لو كان هناك مقهى مفتوح بعد الغروب.",
        "ينتهي بنا الأمر جالسين في موقف السيارات لعدم وجود مكان نذهب إليه.",
        "حتى مقهى بسيط مظلّل سيكون كافيًا.",
      ],
    },
  },
  {
    id: "food-delivery", name: "Local Food Delivery", icon: Truck,
    category: "Retail & Logistics", demandScore: 87, confidence: "High",
    supportingResponses: 178, communitySupport: 80, startupCost: "AED 25,000–40,000",
    monthlyCustomers: "150–250", opportunitySize: "Small",
    problem: "Fresh produce isn't reliably available locally, forcing frequent trips to Al Ain.",
    evidence: "178 households reported regularly traveling outside Al Qua'a for groceries.",
    targetAudience: "Households without easy transport, elderly residents.",
    reasons: [
      "Repeated mentions of travel to Al Ain for groceries",
      "High-frequency need — reported as weekly",
      "Low existing local competition",
    ],
    comments: [
      "We always drive to Al Ain to buy fresh vegetables.",
      "By the time I get back, the vegetables are already wilting.",
      "A delivery option would save me half a day every week.",
    ],
    trend: [45, 52, 60, 70, 79, 87],
    ar: {
      name: "توصيل الطعام المحلي", category: "التجارة والخدمات اللوجستية",
      confidence: "عالية", opportunitySize: "صغيرة",
      startupCost: "25,000–40,000 درهم", monthlyCustomers: "150–250",
      problem: "المنتجات الطازجة غير متوفرة محليًا بشكل موثوق، مما يفرض رحلات متكررة إلى العين.",
      evidence: "أفاد 178 منزلًا بأنهم يسافرون بانتظام خارج القوع لشراء البقالة.",
      targetAudience: "الأسر التي لا تملك وسيلة تنقل سهلة، وكبار السن.",
      reasons: [
        "تكرار ذكر السفر إلى العين لشراء البقالة",
        "حاجة متكررة — أُبلغ عنها أسبوعيًا",
        "قلة المنافسة المحلية الحالية",
      ],
      comments: [
        "نسوق دائمًا إلى العين لشراء الخضار الطازجة.",
        "حين أعود تكون الخضار قد ذبلت.",
        "خيار التوصيل سيوفّر عليّ نصف يوم كل أسبوع.",
      ],
    },
  },
  {
    id: "home-tutoring", name: "Home Tutoring", icon: BookOpen,
    category: "Education", demandScore: 83, confidence: "Medium",
    supportingResponses: 134, communitySupport: 74, startupCost: "AED 5,000–12,000",
    monthlyCustomers: "40–70 students", opportunitySize: "Small",
    problem: "Parents struggle to find qualified tutors for school-aged children locally.",
    evidence: "134 responses requested more tutoring options, concentrated around exam seasons.",
    targetAudience: "Parents of school-age children, ages 6–16.",
    reasons: [
      "Consistent demand across exam seasons",
      "Limited existing tutoring supply in Al Qua'a",
      "High reported willingness to pay",
    ],
    comments: [
      "We need more tutoring options for school students.",
      "I drive my daughter 30 minutes for math tutoring.",
      "Group sessions would help more families afford it.",
    ],
    trend: [38, 44, 55, 63, 72, 83],
    ar: {
      name: "الدروس الخصوصية المنزلية", category: "التعليم",
      confidence: "متوسطة", opportunitySize: "صغيرة",
      startupCost: "5,000–12,000 درهم", monthlyCustomers: "40–70 طالبًا",
      problem: "يجد الآباء صعوبة في إيجاد معلّمين مؤهلين لأبنائهم في سن المدرسة محليًا.",
      evidence: "طلب 134 مشاركًا مزيدًا من خيارات الدروس الخصوصية، تتركّز حول مواسم الامتحانات.",
      targetAudience: "أولياء أمور الطلاب في سن المدرسة من 6 إلى 16 عامًا.",
      reasons: [
        "طلب مستمر خلال مواسم الامتحانات",
        "محدودية خيارات الدروس الخصوصية في القوع",
        "استعداد مرتفع للدفع",
      ],
      comments: [
        "نحتاج إلى مزيد من خيارات الدروس الخصوصية لطلاب المدارس.",
        "أقود ابنتي 30 دقيقة لدرس الرياضيات.",
        "الجلسات الجماعية ستساعد عائلات أكثر على تحمّل التكلفة.",
      ],
    },
  },
  {
    id: "stargazing", name: "Stargazing Equipment Rental", icon: Telescope,
    category: "Recreation & Tourism", demandScore: 78, confidence: "Medium",
    supportingResponses: 96, communitySupport: 68, startupCost: "AED 15,000–25,000",
    monthlyCustomers: "20–35 bookings/mo", opportunitySize: "Small",
    problem: "Families want astronomy experiences but lack equipment access.",
    evidence: "96 responses mentioned interest in family weekend activities tied to the desert night sky.",
    targetAudience: "Families, tourists, and school groups.",
    reasons: [
      "Unique to Al Qua'a's dark-sky location",
      "Growing weekend tourism interest",
      "No comparable service within 50km",
    ],
    comments: [
      "I'd love weekend astronomy workshops for families.",
      "Visitors keep asking where to see the stars properly.",
      "My kids would love a real telescope night.",
    ],
    trend: [20, 30, 45, 58, 68, 78],
    ar: {
      name: "تأجير معدات رصد النجوم", category: "الترفيه والسياحة",
      confidence: "متوسطة", opportunitySize: "صغيرة",
      startupCost: "15,000–25,000 درهم", monthlyCustomers: "20–35 حجزًا/شهر",
      problem: "ترغب العائلات في تجارب فلكية لكنها تفتقر إلى الوصول إلى المعدات.",
      evidence: "ذكر 96 مشاركًا اهتمامهم بأنشطة عائلية في عطلة نهاية الأسبوع مرتبطة بسماء الصحراء ليلًا.",
      targetAudience: "العائلات والسياح والمجموعات المدرسية.",
      reasons: [
        "ميزة فريدة لموقع القوع ذي السماء المظلمة",
        "اهتمام سياحي متنامٍ في عطلات نهاية الأسبوع",
        "لا توجد خدمة مماثلة ضمن 50 كم",
      ],
      comments: [
        "أحب أن تكون هناك ورش فلكية للعائلات في عطلة نهاية الأسبوع.",
        "يسأل الزوار دائمًا عن أفضل مكان لرؤية النجوم.",
        "سيحب أطفالي ليلة رصد بتلسكوب حقيقي.",
      ],
    },
  },
  {
    id: "date-marketplace", name: "Date Farm Marketplace", icon: Wheat,
    category: "Agriculture & Retail", demandScore: 76, confidence: "Medium",
    supportingResponses: 121, communitySupport: 70, startupCost: "AED 10,000–20,000",
    monthlyCustomers: "60–100", opportunitySize: "Small",
    problem: "Local date farmers lack a reliable channel to sell surplus harvest.",
    evidence: "121 responses from farming households described unsold or spoiled surplus dates.",
    targetAudience: "Date farmers and households seeking local produce.",
    reasons: [
      "Recurring seasonal surplus problem",
      "Farmers actively seeking new sales channels",
      "Strong community pride in local dates",
    ],
    comments: [
      "My dates spoil before I can sell them all locally.",
      "I only sell to family — I don't know where else to sell.",
      "A shared stall during harvest would help everyone.",
    ],
    trend: [30, 38, 50, 60, 68, 76],
    ar: {
      name: "سوق مزارع التمور", category: "الزراعة والتجارة",
      confidence: "متوسطة", opportunitySize: "صغيرة",
      startupCost: "10,000–20,000 درهم", monthlyCustomers: "60–100",
      problem: "يفتقر مزارعو التمور المحليون إلى قناة موثوقة لبيع فائض المحصول.",
      evidence: "وصف 121 مشاركًا من الأسر المزارعة فائضًا من التمور غير المباعة أو التالفة.",
      targetAudience: "مزارعو التمور والأسر الباحثة عن منتجات محلية.",
      reasons: [
        "مشكلة فائض موسمية متكررة",
        "سعي المزارعين لإيجاد قنوات بيع جديدة",
        "فخر مجتمعي قوي بالتمور المحلية",
      ],
      comments: [
        "تتلف تموري قبل أن أتمكن من بيعها كلها محليًا.",
        "أبيع للعائلة فقط — لا أعرف أين أبيع غير ذلك.",
        "وجود بسطة مشتركة في موسم الحصاد سيساعد الجميع.",
      ],
    },
  },
  {
    id: "home-bakery", name: "Women's Home Bakery", icon: Cookie,
    category: "Food & Beverage", demandScore: 72, confidence: "Medium",
    supportingResponses: 88, communitySupport: 64, startupCost: "AED 8,000–15,000",
    monthlyCustomers: "50–90 orders/mo", opportunitySize: "Small",
    problem: "Home bakers have demand but no formal way to reach customers beyond family.",
    evidence: "88 responses described interest in buying home-baked goods locally.",
    targetAudience: "Local households and event organizers.",
    reasons: [
      "Existing informal supply with no distribution channel",
      "Repeated requests for celebration and event baking",
      "Low startup barrier, high community support",
    ],
    comments: [
      "I bake on weekends but have nowhere to sell beyond family.",
      "Her cakes are amazing, she just needs more orders.",
      "I'd order weekly if it were easy to ask.",
    ],
    trend: [25, 35, 45, 55, 64, 72],
    ar: {
      name: "مخبز منزلي للسيدات", category: "الأطعمة والمشروبات",
      confidence: "متوسطة", opportunitySize: "صغيرة",
      startupCost: "8,000–15,000 درهم", monthlyCustomers: "50–90 طلبًا/شهر",
      problem: "لدى الخبازات المنزليات طلب، لكن لا توجد وسيلة رسمية للوصول إلى العملاء خارج نطاق العائلة.",
      evidence: "وصف 88 مشاركًا اهتمامهم بشراء المخبوزات المنزلية محليًا.",
      targetAudience: "الأسر المحلية ومنظّمو المناسبات.",
      reasons: [
        "عرض غير رسمي قائم دون قناة توزيع",
        "طلبات متكررة لمخبوزات المناسبات والاحتفالات",
        "حاجز بدء منخفض ودعم مجتمعي مرتفع",
      ],
      comments: [
        "أخبز في عطلة نهاية الأسبوع لكن لا مكان لأبيع فيه خارج العائلة.",
        "كعكاتها رائعة، تحتاج فقط إلى مزيد من الطلبات.",
        "سأطلب أسبوعيًا لو كان الأمر سهلًا.",
      ],
    },
  },
  {
    id: "equipment-rental", name: "Agricultural Equipment Rental", icon: Tractor,
    category: "Agriculture", demandScore: 69, confidence: "Medium",
    supportingResponses: 102, communitySupport: 61, startupCost: "AED 60,000–90,000",
    monthlyCustomers: "15–25 renters/mo", opportunitySize: "Medium",
    problem: "Small farms can't afford equipment that's only needed during harvest season.",
    evidence: "102 responses from farming households described rental hassles during harvest.",
    targetAudience: "Small-scale farmers during planting and harvest seasons.",
    reasons: [
      "High seasonal spike in equipment need",
      "Most farms too small to justify ownership",
      "Existing rental options require travel outside Al Qua'a",
    ],
    comments: [
      "Renting a tractor during harvest season is such a hassle.",
      "We share with neighbors but it's never enough during peak season.",
      "Booking ahead from Al Ain takes too long.",
    ],
    trend: [28, 34, 42, 52, 60, 69],
    ar: {
      name: "تأجير المعدات الزراعية", category: "الزراعة",
      confidence: "متوسطة", opportunitySize: "متوسطة",
      startupCost: "60,000–90,000 درهم", monthlyCustomers: "15–25 مستأجرًا/شهر",
      problem: "لا تستطيع المزارع الصغيرة شراء معدات لا تُستخدم إلا في موسم الحصاد.",
      evidence: "وصف 102 مشاركًا من الأسر المزارعة صعوبات التأجير أثناء موسم الحصاد.",
      targetAudience: "المزارعون صغار الحجم خلال موسمي الزراعة والحصاد.",
      reasons: [
        "ارتفاع موسمي حاد في الحاجة للمعدات",
        "معظم المزارع أصغر من أن تبرّر الشراء",
        "خيارات التأجير الحالية تتطلب السفر خارج القوع",
      ],
      comments: [
        "استئجار جرّار في موسم الحصاد أمر شاق.",
        "نتشارك مع الجيران لكنه لا يكفي في موسم الذروة.",
        "الحجز المسبق من العين يستغرق وقتًا طويلًا.",
      ],
    },
  },
  {
    id: "mobile-health", name: "Mobile Health & Pharmacy Run", icon: Pill,
    category: "Health & Wellbeing", demandScore: 90, confidence: "High",
    supportingResponses: 138, communitySupport: 88, startupCost: "AED 35,000–55,000",
    monthlyCustomers: "150–220", opportunitySize: "Medium",
    problem: "Residents drive to Al Ain for routine prescriptions, blood-pressure checks, and basic medicine, with no pharmacy or clinic nearby.",
    evidence: "138 residents reported traveling outside Al Qua'a for medicine or simple health checks, with elderly households most affected.",
    targetAudience: "Elderly residents, families with young children, and chronic-condition patients across Al Qua'a.",
    reasons: [
      "Repeated reports of long trips for routine medication",
      "Elderly and chronic-care residents are underserved locally",
      "Demand is steady year-round, not seasonal",
    ],
    comments: [
      "My father needs his prescription every month and the drive is exhausting.",
      "A simple pharmacy run would help the whole neighbourhood.",
      "We have no way to check blood pressure without going to the city.",
    ],
    trend: [48, 58, 66, 74, 83, 90],
    ar: {
      name: "خدمة صحية متنقلة وصيدلية", category: "الصحة والعافية",
      confidence: "عالية", opportunitySize: "متوسطة",
      startupCost: "35,000–55,000 درهم", monthlyCustomers: "150–220",
      problem: "يضطر السكان للذهاب إلى العين لصرف الوصفات الروتينية وقياس ضغط الدم والحصول على الأدوية الأساسية، إذ لا توجد صيدلية أو عيادة قريبة.",
      evidence: "أفاد 138 من السكان بأنهم يسافرون خارج القوع للحصول على الدواء أو فحوصات بسيطة، والأسر المسنّة هي الأكثر تأثرًا.",
      targetAudience: "كبار السن والأسر التي لديها أطفال صغار ومرضى الحالات المزمنة في القوع.",
      reasons: [
        "تكرار الشكاوى من طول الرحلات لصرف الأدوية الروتينية",
        "نقص الخدمات المحلية لكبار السن ومرضى الحالات المزمنة",
        "الطلب ثابت على مدار العام وليس موسميًا",
      ],
      comments: [
        "والدي يحتاج دواءه شهريًا والقيادة متعبة.",
        "خدمة صيدلية بسيطة ستفيد الحي بأكمله.",
        "لا توجد لدينا وسيلة لقياس ضغط الدم دون الذهاب إلى المدينة.",
      ],
    },
  },
  {
    id: "town-transport", name: "Shared School & Town Transport", icon: Bus,
    category: "Transport & Mobility", demandScore: 86, confidence: "High",
    supportingResponses: 124, communitySupport: 84, startupCost: "AED 60,000–95,000",
    monthlyCustomers: "90–140", opportunitySize: "Medium",
    problem: "Families without a spare car struggle to get children to school and reach markets in Al Ain, relying on costly one-off trips.",
    evidence: "124 residents described difficulty arranging daily school runs and town trips, with several sharing a single vehicle per household.",
    targetAudience: "Households with school-age children and residents without daily access to a car.",
    reasons: [
      "Many households share one vehicle for all daily needs",
      "Daily school transport is a recurring pain point",
      "Predictable routes make demand easy to plan",
    ],
    comments: [
      "Getting the kids to school every day is a constant struggle.",
      "A shared van on a fixed schedule would change our week.",
      "We pay too much for single trips into Al Ain.",
    ],
    trend: [44, 52, 60, 69, 78, 86],
    ar: {
      name: "نقل مشترك للمدارس والمدينة", category: "النقل والتنقل",
      confidence: "عالية", opportunitySize: "متوسطة",
      startupCost: "60,000–95,000 درهم", monthlyCustomers: "90–140",
      problem: "تعاني الأسر التي لا تملك سيارة إضافية من إيصال الأطفال إلى المدرسة والوصول إلى أسواق العين، معتمدة على رحلات فردية مكلفة.",
      evidence: "وصف 124 من السكان صعوبة ترتيب رحلات المدرسة اليومية ورحلات المدينة، ويتشارك كثيرون سيارة واحدة لكل أسرة.",
      targetAudience: "الأسر التي لديها أطفال في سن المدرسة والسكان الذين لا تتوفر لديهم سيارة يوميًا.",
      reasons: [
        "تشارك كثير من الأسر سيارة واحدة لكل احتياجاتها اليومية",
        "النقل المدرسي اليومي نقطة ألم متكررة",
        "المسارات المنتظمة تجعل الطلب سهل التخطيط",
      ],
      comments: [
        "إيصال الأطفال إلى المدرسة كل يوم معاناة مستمرة.",
        "حافلة مشتركة بجدول ثابت ستغيّر أسبوعنا.",
        "ندفع الكثير مقابل الرحلات الفردية إلى العين.",
      ],
    },
  },
  {
    id: "appliance-repair", name: "AC & Appliance Repair Service", icon: Wrench,
    category: "Trades & Repair", demandScore: 83, confidence: "High",
    supportingResponses: 116, communitySupport: 82, startupCost: "AED 20,000–40,000",
    monthlyCustomers: "70–110", opportunitySize: "Medium",
    problem: "When an air conditioner or fridge breaks in summer, residents wait days for a technician to travel from Al Ain.",
    evidence: "116 residents reported long waits and high call-out fees for appliance and AC repairs, peaking in the hot months.",
    targetAudience: "Every household and small business in Al Qua'a relying on AC and refrigeration.",
    reasons: [
      "AC and refrigeration are essential through the long summer",
      "Technicians currently travel in from outside the area",
      "Call-out fees and wait times are widely reported",
    ],
    comments: [
      "Our AC failed in July and we waited four days for a technician.",
      "Every repair means a long wait and a big travel fee.",
      "A local handyman for appliances is badly needed.",
    ],
    trend: [42, 50, 58, 67, 75, 83],
    ar: {
      name: "خدمة إصلاح المكيفات والأجهزة", category: "الحرف والإصلاح",
      confidence: "عالية", opportunitySize: "متوسطة",
      startupCost: "20,000–40,000 درهم", monthlyCustomers: "70–110",
      problem: "عند تعطّل المكيف أو الثلاجة في الصيف، ينتظر السكان أيامًا حتى يصل فني من العين.",
      evidence: "أفاد 116 من السكان بطول مدة الانتظار وارتفاع رسوم الاستدعاء لإصلاح الأجهزة والمكيفات، مع ذروة في الأشهر الحارة.",
      targetAudience: "كل أسرة ومنشأة صغيرة في القوع تعتمد على التكييف والتبريد.",
      reasons: [
        "التكييف والتبريد ضروريان طوال الصيف الطويل",
        "يأتي الفنيون حاليًا من خارج المنطقة",
        "كثرة الشكاوى من رسوم الاستدعاء ومدد الانتظار",
      ],
      comments: [
        "تعطّل مكيفنا في يوليو وانتظرنا أربعة أيام لوصول فني.",
        "كل إصلاح يعني انتظارًا طويلًا ورسوم تنقل كبيرة.",
        "نحتاج بشدة إلى فنّي محلي للأجهزة.",
      ],
    },
  },
  {
    id: "home-salon", name: "Women's Home Salon & Tailoring", icon: Scissors,
    category: "Personal Services", demandScore: 80, confidence: "Medium",
    supportingResponses: 102, communitySupport: 79, startupCost: "AED 12,000–25,000",
    monthlyCustomers: "60–100", opportunitySize: "Small",
    problem: "Women travel to Al Ain for salon visits and clothing alterations, with no private, local option for either.",
    evidence: "102 residents — mostly women — asked for local salon and tailoring services, citing privacy and travel as barriers.",
    targetAudience: "Women and families in Al Qua'a seeking salon care and clothing alterations close to home.",
    reasons: [
      "Strong preference for a private, women-run local service",
      "Salon and tailoring trips currently require travel to the city",
      "Low startup cost suits a home-based start",
    ],
    comments: [
      "I'd love a trusted salon I can reach without driving to Al Ain.",
      "Simple alterations shouldn't mean a trip to the city.",
      "A women-run home salon would be very welcome here.",
    ],
    trend: [38, 47, 55, 64, 72, 80],
    ar: {
      name: "صالون وخياطة منزلية للسيدات", category: "الخدمات الشخصية",
      confidence: "متوسطة", opportunitySize: "صغيرة",
      startupCost: "12,000–25,000 درهم", monthlyCustomers: "60–100",
      problem: "تسافر السيدات إلى العين لزيارة الصالون وتعديل الملابس، دون وجود خيار محلي خاص لأيٍّ منهما.",
      evidence: "طلب 102 من السكان — معظمهم من السيدات — خدمات صالون وخياطة محلية، مشيرين إلى الخصوصية والتنقل كعائقين.",
      targetAudience: "السيدات والأسر في القوع الباحثات عن خدمات الصالون وتعديل الملابس بالقرب من المنزل.",
      reasons: [
        "تفضيل قوي لخدمة محلية خاصة تديرها سيدات",
        "تتطلب زيارات الصالون والخياطة حاليًا السفر إلى المدينة",
        "انخفاض تكلفة البدء يناسب الانطلاق من المنزل",
      ],
      comments: [
        "أتمنى وجود صالون موثوق أصل إليه دون القيادة إلى العين.",
        "التعديلات البسيطة لا ينبغي أن تعني رحلة إلى المدينة.",
        "صالون منزلي تديره سيدات سيكون موضع ترحيب كبير هنا.",
      ],
    },
  },
  {
    id: "daycare", name: "Children's Daycare & Early Learning", icon: Baby,
    category: "Childcare & Education", demandScore: 78, confidence: "Medium",
    supportingResponses: 96, communitySupport: 77, startupCost: "AED 25,000–45,000",
    monthlyCustomers: "30–50", opportunitySize: "Small",
    problem: "Working parents have no local daycare or early-learning option, limiting mothers' ability to take jobs or run businesses.",
    evidence: "96 residents identified a need for trusted childcare, several linking it directly to wanting to start work or a small business.",
    targetAudience: "Working parents and mothers of pre-school children in and around Al Qua'a.",
    reasons: [
      "Childcare gap directly limits parents' income opportunities",
      "Demand tied to a growing number of young families",
      "Pairs well with other community services on this list",
    ],
    comments: [
      "I can't take a job because there's nowhere safe for my child.",
      "A small early-learning centre would help many mothers here.",
      "We need trusted childcare we don't have to drive far for.",
    ],
    trend: [36, 45, 53, 62, 70, 78],
    ar: {
      name: "حضانة وتعلّم مبكر للأطفال", category: "رعاية الطفل والتعليم",
      confidence: "متوسطة", opportunitySize: "صغيرة",
      startupCost: "25,000–45,000 درهم", monthlyCustomers: "30–50",
      problem: "لا يجد الآباء العاملون خيار حضانة أو تعلّم مبكر محلي، مما يحدّ من قدرة الأمهات على العمل أو إدارة مشاريعهن.",
      evidence: "حدّد 96 من السكان حاجة إلى رعاية موثوقة للأطفال، وربط عدة منهم ذلك مباشرة برغبتهم في بدء عمل أو مشروع صغير.",
      targetAudience: "الآباء العاملون وأمهات أطفال ما قبل المدرسة في القوع وما حولها.",
      reasons: [
        "نقص رعاية الأطفال يحدّ مباشرة من فرص دخل الآباء",
        "الطلب مرتبط بتزايد عدد الأسر الشابة",
        "تتكامل جيدًا مع خدمات مجتمعية أخرى في هذه القائمة",
      ],
      comments: [
        "لا أستطيع العمل لعدم وجود مكان آمن لطفلي.",
        "مركز تعلّم مبكر صغير سيساعد كثيرًا من الأمهات هنا.",
        "نحتاج رعاية موثوقة للأطفال دون القيادة بعيدًا.",
      ],
    },
  },
  {
    id: "solar-water", name: "Solar & Water Systems for Farms", icon: Sun,
    category: "Utilities & Energy", demandScore: 75, confidence: "Medium",
    supportingResponses: 88, communitySupport: 74, startupCost: "AED 50,000–90,000",
    monthlyCustomers: "20–40", opportunitySize: "Medium",
    problem: "Farms rely on costly diesel pumps and face high water and energy bills, with no local installer for solar or efficient irrigation.",
    evidence: "88 farm-owning residents reported high running costs and interest in solar pumping and water-saving systems they can't source locally.",
    targetAudience: "Date farms, livestock operations, and large households across Al Qua'a's farming areas.",
    reasons: [
      "High diesel and water costs are a recurring complaint",
      "No local installer for solar or efficient irrigation",
      "Aligns with regional push toward sustainable agriculture",
    ],
    comments: [
      "Our diesel pump costs more every season.",
      "We'd switch to solar if someone local could install it.",
      "Saving water would cut our biggest farm bill.",
    ],
    trend: [34, 43, 51, 60, 68, 75],
    ar: {
      name: "أنظمة الطاقة الشمسية والمياه للمزارع", category: "المرافق والطاقة",
      confidence: "متوسطة", opportunitySize: "متوسطة",
      startupCost: "50,000–90,000 درهم", monthlyCustomers: "20–40",
      problem: "تعتمد المزارع على مضخات ديزل مكلفة وتواجه فواتير مياه وطاقة مرتفعة، دون مركّب محلي للطاقة الشمسية أو الري الكفء.",
      evidence: "أفاد 88 من السكان أصحاب المزارع بارتفاع تكاليف التشغيل واهتمامهم بأنظمة الضخ الشمسي وتوفير المياه التي لا تتوفر محليًا.",
      targetAudience: "مزارع التمور وعمليات الثروة الحيوانية والأسر الكبيرة في المناطق الزراعية بالقوع.",
      reasons: [
        "ارتفاع تكاليف الديزل والمياه شكوى متكررة",
        "لا يوجد مركّب محلي للطاقة الشمسية أو الري الكفء",
        "يتماشى مع التوجه الإقليمي نحو الزراعة المستدامة",
      ],
      comments: [
        "تكلفة مضخة الديزل لدينا ترتفع كل موسم.",
        "سننتقل إلى الطاقة الشمسية لو توفّر من يركّبها محليًا.",
        "توفير المياه سيخفّض أكبر فاتورة في مزرعتنا.",
      ],
    },
  },
];

const CATEGORY_BREAKDOWN = [
  { name: "Agriculture & Livestock", name_ar: "الزراعة والثروة الحيوانية", value: 28, color: T.dune },
  { name: "Food & Beverage", name_ar: "الأطعمة والمشروبات", value: 24, color: T.oasis },
  { name: "Retail & Logistics", name_ar: "التجارة والخدمات اللوجستية", value: 18, color: T.gold },
  { name: "Education", name_ar: "التعليم", value: 16, color: T.dusk },
  { name: "Recreation & Tourism", name_ar: "الترفيه والسياحة", value: 14, color: T.duneDark },
];

const PULSE_DATA = Array.from({ length: 24 }, (_, i) => ({
  t: i, v: 30 + Math.round(40 * Math.abs(Math.sin(i / 2.3))) + (i % 5 === 0 ? 25 : 0),
}));

const AREAS = [
  { id: "center", name: "Al Qua'a Center", name_ar: "وسط القوع", oppId: "evening-cafe", participation: 320, x: 50, y: 42 },
  { id: "north", name: "North Farms", name_ar: "مزارع الشمال", oppId: "equipment-rental", participation: 210, x: 50, y: 14 },
  { id: "east", name: "East Settlement", name_ar: "مستوطنة الشرق", oppId: "home-tutoring", participation: 180, x: 76, y: 56 },
  { id: "south", name: "South Camel Grounds", name_ar: "مراعي الإبل الجنوبية", oppId: "camel-vet", participation: 260, x: 34, y: 76 },
  { id: "west", name: "West Outskirts", name_ar: "أطراف الغرب", oppId: "food-delivery", participation: 150, x: 18, y: 50 },
];

const SURVEY_QUESTIONS = [
  { en: "What service do you wish existed?", ar: "ما الخدمة التي تتمنى وجودها؟" },
  { en: "What product do you struggle to find?", ar: "ما المنتج الذي يصعب عليك إيجاده؟" },
  { en: "What would you pay for locally?", ar: "ما الذي قد تدفع مقابله محليًا؟" },
];

const NAV = [
  { id: "landing", en: "Home", ar: "الرئيسية" },
  { id: "survey", en: "Survey", ar: "الاستبيان" },
  { id: "dashboard", en: "Insights", ar: "الرؤى" },
  { id: "marketplace", en: "Opportunities", ar: "الفرص" },
  { id: "validation", en: "Validation", ar: "التحقق" },
  { id: "saved", en: "Saved", ar: "المحفوظة" },
  { id: "about", en: "Impact", ar: "الأثر" },
];

/* ---------------------------------------------------------------------- */
/* NARRATION HELPERS                                                      */
/* ---------------------------------------------------------------------- */
const speechOK = () => typeof window !== "undefined" && "speechSynthesis" in window;

function pageNarration(page, opp, lang) {
  const j = (...parts) => parts.filter(Boolean).join(". ");
  switch (page) {
    case "landing":
      return j(t("heroTitle", lang).join(" "), t("heroSub", lang));
    case "survey":
      return j(t("surveyTitle", lang), t("surveySub", lang));
    case "dashboard":
      return j(t("dashTitle", lang), t("dashSub", lang),
        t("topRequested", lang) + ": " + OPPORTUNITIES.slice(0, 4).map(o => L(o, lang).name).join("، "));
    case "marketplace":
      return j(t("mktTitle", lang), t("mktSub", lang));
    case "saved":
      return t("savedTitle", lang);
    case "validation":
      return j(t("valTitle", lang), t("valSub", lang));
    case "about":
      return j(t("aboutTitle", lang), t("aboutBody", lang));
    case "generator": {
      if (!opp) return t("genEmpty", lang);
      const lo = L(opp, lang);
      return j(lo.name, lo.problem, lo.evidence);
    }
    default:
      return "";
  }
}

/* ---------------------------------------------------------------------- */
/* SHARED PIECES                                                          */
/* ---------------------------------------------------------------------- */
function Pulse({ size = 18 }) {
  return <Activity size={size} className="dp-pulse-icon" />;
}

function StatCard({ labelKey, value, lang }) {
  return (
    <div className="dp-stat-card">
      <div className="dp-stat-value">{value}</div>
      <div className="dp-stat-label">{t(labelKey, lang)}</div>
    </div>
  );
}

function ScoreRing({ score, size = 56 }) {
  const r = size / 2 - 4;
  const c = 2 * Math.PI * r;
  const offset = c - (score / 100) * c;
  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
      <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke="rgba(43,33,24,0.12)" strokeWidth="4" />
      <circle
        cx={size / 2} cy={size / 2} r={r} fill="none" stroke={T.oasis} strokeWidth="4"
        strokeDasharray={c} strokeDashoffset={offset} strokeLinecap="round"
        transform={`rotate(-90 ${size / 2} ${size / 2})`}
        style={{ transition: "stroke-dashoffset 0.8s ease" }}
      />
      <text x="50%" y="52%" textAnchor="middle" className="dp-ring-text">{score}</text>
    </svg>
  );
}

function ConfidenceBadge({ level, lang }) {
  const isHigh = level === "High" || level === "عالية";
  const color = isHigh ? T.oasis : T.dune;
  return (
    <span className="dp-badge" style={{ color, borderColor: color }}>
      <ShieldCheck size={12} style={{ marginInlineEnd: 4 }} /> {level} {t("confidence", lang)}
    </span>
  );
}

function ListenButton({ active, onClick, lang, size = 18 }) {
  if (!speechOK()) return null;
  return (
    <button className="dp-icon-btn" onClick={onClick} aria-label={active ? t("a11yStop", lang) : t("listen", lang)} title={active ? t("a11yStop", lang) : t("listen", lang)}>
      {active ? <VolumeX size={size} color={T.oasis} /> : <Volume2 size={size} />}
    </button>
  );
}

function ValidationPanel({ opp, onClose, lang, votes = {} }) {
  if (!opp) return null;
  const lo = L(opp, lang);
  return (
    <div className="dp-overlay" onClick={onClose}>
      <div className="dp-panel" onClick={(e) => e.stopPropagation()}>
        <div className="dp-panel-head">
          <div>
            <div className="dp-eyebrow">{t("whyRecommended", lang)}</div>
            <h3 className="dp-panel-title">{lo.name}</h3>
          </div>
          <button className="dp-icon-btn" onClick={onClose} aria-label="Close"><X size={18} /></button>
        </div>

        <div className="dp-panel-row">
          <Users size={16} />
          <span><strong>{liveResponses(opp, votes)}</strong> {t("supportText", lang)}</span>
        </div>
        <div className="dp-panel-row">
          <TrendingUp size={16} />
          <span>{t("trendRising", lang)}</span>
        </div>
        <ResponsiveContainer width="100%" height={70}>
          <AreaChart data={opp.trend.map((v, i) => ({ i, v }))}>
            <Area type="monotone" dataKey="v" stroke={T.oasis} fill="rgba(31,122,108,0.15)" strokeWidth={2} />
          </AreaChart>
        </ResponsiveContainer>

        <div className="dp-panel-sub">{t("aiReasoning", lang)}</div>
        <ul className="dp-reason-list">
          {lo.reasons.map((r, i) => (
            <li key={i}><CheckCircle2 size={14} style={{ color: T.oasis, marginInlineEnd: 6, flexShrink: 0 }} />{r}</li>
          ))}
        </ul>

        <div className="dp-panel-sub">{t("exampleComments", lang)}</div>
        <div className="dp-quote-stack">
          {lo.comments.map((c, i) => (
            <div className="dp-quote-mini" key={i}><MessageSquareQuote size={13} style={{ marginInlineEnd: 6, flexShrink: 0, opacity: 0.6 }} />“{c}”</div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ---------------------------------------------------------------------- */
/* ACCESSIBILITY WIDGET                                                   */
/* ---------------------------------------------------------------------- */
function AccessibilityWidget({ lang, setLang, hc, setHc, fontScale, setFontScale, isReadingPage, onReadPage }) {
  const [open, setOpen] = useState(false);
  const steps = [0.85, 1, 1.15, 1.3];
  const stepDown = () => setFontScale(s => steps[Math.max(0, steps.indexOf(s) - 1)] || 0.85);
  const stepUp = () => setFontScale(s => steps[Math.min(steps.length - 1, steps.indexOf(s) + 1)] || 1.3);
  return (
    <>
      <button className="dp-a11y-fab" onClick={() => setOpen(o => !o)} aria-label={t("a11y", lang)} aria-expanded={open}>
        {open ? <X size={22} /> : <Settings size={24} />}
      </button>
      {open && (
        <div className="dp-a11y-panel" role="dialog" aria-label={t("a11y", lang)}>
          <div className="dp-a11y-row">
            <div className="dp-a11y-label"><Languages size={13} style={{ verticalAlign: -2, marginInlineEnd: 4 }} />{t("a11yLanguage", lang)}</div>
            <div className="dp-seg">
              <button className={lang === "en" ? "on" : ""} onClick={() => setLang("en")}>English</button>
              <button className={lang === "ar" ? "on" : ""} onClick={() => setLang("ar")}>العربية</button>
            </div>
          </div>

          <div className="dp-a11y-row">
            <div className="dp-a11y-label"><Contrast size={13} style={{ verticalAlign: -2, marginInlineEnd: 4 }} />{t("a11yContrast", lang)}</div>
            <div className="dp-seg">
              <button className={!hc ? "on" : ""} onClick={() => setHc(false)}>{t("off", lang)}</button>
              <button className={hc ? "on" : ""} onClick={() => setHc(true)}>{t("on", lang)}</button>
            </div>
          </div>

          <div className="dp-a11y-row">
            <div className="dp-a11y-label"><Type size={13} style={{ verticalAlign: -2, marginInlineEnd: 4 }} />{t("a11yTextSize", lang)}</div>
            <div className="dp-seg">
              <button onClick={stepDown} aria-label="Smaller text"><Minus size={15} /></button>
              <button style={{ flex: 2 }} onClick={() => setFontScale(1)}>{Math.round(fontScale * 100)}%</button>
              <button onClick={stepUp} aria-label="Larger text"><Plus size={15} /></button>
            </div>
          </div>

          {speechOK() && (
            <div className="dp-a11y-row">
              <div className="dp-seg">
                <button className={isReadingPage ? "on" : ""} style={{ flex: 1 }} onClick={onReadPage}>
                  {isReadingPage ? <VolumeX size={15} /> : <Volume2 size={15} />}
                  {isReadingPage ? t("a11yStop", lang) : t("a11yReadPage", lang)}
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </>
  );
}

/* ---------------------------------------------------------------------- */
/* AI BUSINESS COACH  (scoped to entrepreneurship only)                    */
/* ---------------------------------------------------------------------- */
function renderRich(text) {
  const lines = String(text).split("\n");
  return lines.map((line, li) => {
    // strip markdown headers and normalise bullet markers
    let l = line.replace(/^[ \t]*#{1,6}[ \t]+/, "").replace(/^[ \t]*[*\-][ \t]+/, "• ");
    const nodes = [];
    const rx = /\*\*([^*]+)\*\*|\*([^*]+)\*|__([^_]+)__/g;
    let last = 0, m, k = 0;
    while ((m = rx.exec(l)) !== null) {
      if (m.index > last) nodes.push(l.slice(last, m.index));
      if (m[1] != null || m[3] != null) nodes.push(<strong key={k++}>{m[1] || m[3]}</strong>);
      else nodes.push(<em key={k++}>{m[2]}</em>);
      last = rx.lastIndex;
    }
    if (last < l.length) nodes.push(l.slice(last));
    return <React.Fragment key={li}>{li > 0 && <br />}{nodes.length ? nodes : null}</React.Fragment>;
  });
}

const PULSE_FAQ = [
  { id: "start", q_en: "How do I start a business in Al Qua'a?", q_ar: "كيف أبدأ مشروعًا في القوع؟", a_en: "Start small and prove demand first.\n- Pick one clear idea people here already asked for (see the Opportunities page).\n- Talk to 10 potential customers and confirm they would pay.\n- Offer a small first version to a few neighbours before spending big.\n- Reinvest what you earn into what customers ask for most.", a_ar: "ابدأ صغيرًا وأثبت وجود الطلب أولًا.\n- اختر فكرة واحدة واضحة طلبها الناس هنا (راجع صفحة الفرص).\n- تحدّث إلى 10 عملاء محتملين وتأكّد من استعدادهم للدفع.\n- قدّم نسخة أولى بسيطة لبعض الجيران قبل الإنفاق الكبير.\n- أعد استثمار أرباحك فيما يطلبه العملاء أكثر.", keys: ["start", "begin", "get started", "new business", "how do i start", "ابدأ", "أبدأ", "بدء", "مشروع جديد"] },
  { id: "license", q_en: "How do I license a small business in the UAE?", q_ar: "كيف أرخّص مشروعًا صغيرًا في الإمارات؟", a_en: "Most small businesses register through the Department of Economic Development (DED) in Abu Dhabi.\n- Choose your activity and a trade name.\n- Decide mainland vs free zone (mainland is usual for serving the local community).\n- Apply for the licence and any activity-specific approvals.\nFees and exact steps change, so confirm the current requirements directly with the DED before you commit.", a_ar: "تُسجَّل معظم المشاريع الصغيرة عبر دائرة التنمية الاقتصادية في أبوظبي.\n- اختر نشاطك واسمًا تجاريًا.\n- حدّد بين البر الرئيسي والمنطقة الحرة (البر الرئيسي مناسب لخدمة المجتمع المحلي).\n- قدّم طلب الرخصة وأي موافقات خاصة بالنشاط.\nتتغير الرسوم والخطوات، لذا تأكّد من المتطلبات الحالية مباشرةً مع الدائرة قبل البدء.", keys: ["licen", "register", "permit", "legal", "trade name", "ded", "ترخيص", "رخصة", "تسجيل", "تصريح", "قانون"] },
  { id: "cost", q_en: "How much money do I need to start?", q_ar: "كم أحتاج من المال للبدء؟", a_en: "It depends on the idea. Rough Al Ain-region estimates:\n- Home tutoring: AED 500–2,000\n- Home bakery: AED 3,000–8,000\n- Date marketplace: AED 5,000–12,000\n- Evening cafe: AED 15,000–35,000\nThese are estimates only — get real supplier quotes before budgeting.", a_ar: "يعتمد ذلك على الفكرة. تقديرات تقريبية لمنطقة العين:\n- دروس منزلية: 500–2000 درهم\n- مخبز منزلي: 3000–8000 درهم\n- سوق التمور: 5000–12000 درهم\n- مقهى مسائي: 15000–35000 درهم\nهذه تقديرات فقط — احصل على عروض أسعار حقيقية قبل وضع الميزانية.", keys: ["cost", "money", "capital", "budget", "afford", "how much", "تكلفة", "مال", "ميزانية", "كم", "رأس المال"] },
  { id: "customers", q_en: "How do I find my first customers?", q_ar: "كيف أجد أوّل عملائي؟", a_en: "In a small community, trust travels fast.\n- Start with people you already know and ask them to spread the word.\n- Offer a small intro deal to your first few customers.\n- Ask every happy customer for a short recommendation you can share.\n- Be where people gather (the majlis, school pick-up, local groups).", a_ar: "في مجتمع صغير تنتقل الثقة بسرعة.\n- ابدأ بمن تعرفهم واطلب منهم نشر الخبر.\n- قدّم عرضًا تعريفيًا بسيطًا لأول عملائك.\n- اطلب من كل عميل راضٍ توصية قصيرة تشاركها.\n- كن حيث يجتمع الناس (المجلس، مواعيد المدارس، المجموعات المحلية).", keys: ["customer", "client", "first sale", "buyers", "find customers", "عميل", "عملاء", "زبائن", "مبيعات"] },
  { id: "marketing", q_en: "How should I market my business locally?", q_ar: "كيف أسوّق مشروعي محليًا؟", a_en: "Keep it simple and local.\n- A clear WhatsApp/Instagram page with photos, prices, and your location.\n- Word of mouth — ask satisfied customers to refer one friend.\n- A simple sign or flyer where neighbours pass daily.\nConsistency matters more than a big budget.", a_ar: "اجعله بسيطًا ومحليًا.\n- صفحة واضحة على واتساب/إنستغرام بالصور والأسعار وموقعك.\n- التسويق الشفهي — اطلب من العملاء الراضين دعوة صديق.\n- لافتة أو منشور بسيط حيث يمرّ الجيران يوميًا.\nالاستمرارية أهم من الميزانية الكبيرة.", keys: ["market", "advertis", "promot", "social media", "instagram", "whatsapp", "تسويق", "إعلان", "ترويج", "إنستغرام", "واتساب"] },
  { id: "funding", q_en: "Where can I get funding or support?", q_ar: "من أين أحصل على تمويل أو دعم؟", a_en: "For a first small business, your safest funding is early sales — start lean and grow from real income. Beyond that, options can include family support, local SME programmes, and bank or government small-business schemes. Terms and availability vary, so check current programmes with the relevant authority before relying on them.", a_ar: "لأول مشروع صغير، أأمن تمويل هو المبيعات المبكرة — ابدأ بموارد قليلة وانمُ من دخل حقيقي. وبعد ذلك قد تشمل الخيارات دعم العائلة وبرامج المشاريع الصغيرة المحلية وبرامج البنوك أو الحكومة. تختلف الشروط والتوافر، لذا تحقّق من البرامج الحالية مع الجهة المختصة قبل الاعتماد عليها.", keys: ["fund", "loan", "grant", "support", "invest", "تمويل", "قرض", "منحة", "دعم"] },
  { id: "how_works", q_en: "How does Desert Pulse choose opportunities?", q_ar: "كيف يختار «نبض الصحراء» الفرص؟", a_en: "Every opportunity comes from real, anonymous resident responses. Desert Pulse scores each idea on community demand, willingness to pay, how feasible it is for a local, and how poorly the need is currently served. You can trace any opportunity back to the responses behind it on the Validation page.", a_ar: "تأتي كل فرصة من استجابات حقيقية ومجهولة للسكان. يقيّم «نبض الصحراء» كل فكرة بناءً على طلب المجتمع، والاستعداد للدفع، ومدى ملاءمتها لشخص محلي، ومدى ضعف تلبية الحاجة حاليًا. يمكنك تتبّع أي فرصة إلى الاستجابات وراءها في صفحة التحقق.", keys: ["how does", "desert pulse", "choose", "rank", "score", "opportunit", "نبض", "الفرص", "ترتيب", "تقييم", "يختار"] },
  { id: "privacy", q_en: "Is my survey response saved anywhere?", q_ar: "هل تُحفظ استجابتي في أي مكان؟", a_en: "No personal data is collected, and in this prototype nothing is sent to a server. Your responses are kept only in your browser for the current visit and clear when you refresh. That keeps every response fully anonymous.", a_ar: "لا تُجمع أي بيانات شخصية، وفي هذا النموذج الأوّلي لا يُرسَل شيء إلى أي خادم. تُحفظ استجاباتك فقط في متصفحك خلال هذه الزيارة وتُمسح عند التحديث، مما يبقي كل استجابة مجهولة تمامًا.", keys: ["save", "store", "data", "privacy", "anonym", "database", "حفظ", "تخزين", "بيانات", "خصوصية", "مجهول", "قاعدة"] },
];

// Match free-typed text to the closest predefined question (keyword overlap).
function matchFAQ(input) {
  const s = String(input).toLowerCase();
  let best = null, bestScore = 0;
  for (const f of PULSE_FAQ) {
    let score = 0;
    for (const k of f.keys) { if (s.includes(k.toLowerCase())) score++; }
    if (score > bestScore) { bestScore = score; best = f; }
  }
  return best;
}

function BusinessCoach({ lang }) {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([]); // {role:'user'|'assistant', content}
  const [input, setInput] = useState("");
  const bodyRef = useRef(null);
  const lastQRef = useRef(null);

  useEffect(() => {
    const body = bodyRef.current;
    if (!body) return;
    if (lastQRef.current) {
      // Bring the most recent question to the top of the panel so its answer shows below it.
      body.scrollTop += lastQRef.current.getBoundingClientRect().top - body.getBoundingClientRect().top - 8;
    } else {
      body.scrollTop = body.scrollHeight;
    }
  }, [messages, open]);

  let lastUserIndex = -1;
  for (let i = messages.length - 1; i >= 0; i--) { if (messages[i].role === "user") { lastUserIndex = i; break; } }

  const ask = (f) => {
    const q = lang === "ar" ? f.q_ar : f.q_en;
    const a = lang === "ar" ? f.a_ar : f.a_en;
    setMessages(m => [...m, { role: "user", content: q }, { role: "assistant", content: a }]);
  };

  const sendText = () => {
    const text = input.trim();
    if (!text) return;
    setInput("");
    const f = matchFAQ(text);
    const answer = f ? (lang === "ar" ? f.a_ar : f.a_en) : t("agentFallback", lang);
    setMessages(m => [...m, { role: "user", content: text }, { role: "assistant", content: answer }]);
  };

  const reset = () => { setMessages([]); setInput(""); };

  return (
    <>
      <button className="dp-coach-fab" onClick={() => setOpen(o => !o)} aria-label={t("agentOpen", lang)} aria-expanded={open}>
        {open ? <X size={22} /> : <MessageCircle size={24} />}
      </button>
      {open && (
        <div className="dp-coach-panel" role="dialog" aria-label={t("agentName", lang)}>
          <div className="dp-coach-head">
            <div className="dp-coach-avatar"><Sparkles size={18} /></div>
            <div className="dp-coach-head-txt">
              <div className="dp-coach-name">{t("agentName", lang)}</div>
              <div className="dp-coach-tag">{t("agentTagline", lang)}</div>
            </div>
            {messages.length > 0 && (
              <button className="dp-coach-reset" onClick={reset} title={t("agentNewChat", lang)} aria-label={t("agentNewChat", lang)}>
                <RefreshCw size={15} />
              </button>
            )}
          </div>

          <div className="dp-coach-body" ref={bodyRef}>
            <div className="dp-coach-msg assistant" dir="auto">{t("agentGreeting", lang)}</div>
            {messages.map((m, i) => (
              <div key={i} ref={i === lastUserIndex ? lastQRef : undefined} className={`dp-coach-msg ${m.role}`} dir="auto">{m.role === "assistant" ? renderRich(m.content) : m.content}</div>
            ))}
            <div className="dp-coach-chips">
              <div className="dp-coach-suggest-label">{t("agentSuggested", lang)}</div>
              {PULSE_FAQ.map((f) => (
                <button key={f.id} className="dp-coach-chip" dir="auto" onClick={() => ask(f)}>
                  {lang === "ar" ? f.q_ar : f.q_en}
                </button>
              ))}
            </div>
          </div>

          <div className="dp-coach-foot">
            <input
              className="dp-coach-input"
              value={input}
              dir="auto"
              placeholder={t("agentPlaceholder", lang)}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); sendText(); } }}
              aria-label={t("agentPlaceholder", lang)}
            />
            <button className="dp-coach-send" onClick={sendText} disabled={!input.trim()} aria-label={t("agentSend", lang)}>
              <Send size={18} />
            </button>
          </div>
          <div className="dp-coach-scope">{t("agentScopeNote", lang)}</div>
        </div>
      )}
    </>
  );
}

/* ---------------------------------------------------------------------- */
/* MAIN APP                                                                */
/* ---------------------------------------------------------------------- */
export default function App() {
  const [page, setPage] = useState("landing");
  const [navOpen, setNavOpen] = useState(false);
  const [saved, setSaved] = useState([]);
  const [activeOpp, setActiveOpp] = useState(null);
  const [panelOpp, setPanelOpp] = useState(null);
  const [surveyAnswers, setSurveyAnswers] = useState({});
  const [surveyDone, setSurveyDone] = useState(false);
  const [responses, setResponses] = useState([]); // session response history
  const [votes, setVotes] = useState({}); // session votes per opportunity (oppId -> count)
  const [communityOpps, setCommunityOpps] = useState([]); // new opportunities created from survey input
  const [helped, setHelped] = useState(0); // entrepreneurs who marked a plan helpful this session
  const [areaFilter, setAreaFilter] = useState("All");
  const [activeArea, setActiveArea] = useState(null);

  // accessibility / i18n state
  const [lang, setLang] = useState("en");
  const [hc, setHc] = useState(false);
  const [fontScale, setFontScale] = useState(1);
  const [narratingKey, setNarratingKey] = useState(null);
  const [noVoiceNotice, setNoVoiceNotice] = useState(false);
  const voicesRef = useRef([]);

  const isRTL = lang === "ar";

  // load voices for narration (getVoices is async/empty on first paint on many browsers)
  useEffect(() => {
    if (!speechOK()) return;
    let tries = 0, iv;
    const load = () => {
      const v = window.speechSynthesis.getVoices() || [];
      if (v.length) voicesRef.current = v;
    };
    load();
    window.speechSynthesis.onvoiceschanged = load;
    iv = setInterval(() => { load(); if (++tries > 12 || voicesRef.current.length) clearInterval(iv); }, 250);
    return () => { clearInterval(iv); try { window.speechSynthesis.cancel(); } catch (e) {} };
  }, []);

  // text size — scale the document root so rem/clamp text scales
  useEffect(() => {
    const prev = document.documentElement.style.fontSize;
    document.documentElement.style.fontSize = `${16 * fontScale}px`;
    return () => { document.documentElement.style.fontSize = prev; };
  }, [fontScale]);

  // stop narration whenever page or language changes
  useEffect(() => {
    if (speechOK()) window.speechSynthesis.cancel();
    setNarratingKey(null);
    setNoVoiceNotice(false);
  }, [page, lang]);

  // auto-dismiss the "no Arabic voice" notice
  useEffect(() => {
    if (!noVoiceNotice) return;
    const id = setTimeout(() => setNoVoiceNotice(false), 7000);
    return () => clearTimeout(id);
  }, [noVoiceNotice]);

  const speak = (key, text) => {
    if (!speechOK() || !text) return;
    const synth = window.speechSynthesis;
    // toggle off if the same item is already playing
    if (narratingKey === key) { synth.cancel(); setNarratingKey(null); return; }
    synth.cancel();
    setNoVoiceNotice(false);

    const target = isRTL ? "ar" : "en";
    const norm = v => (v.lang || "").toLowerCase().replace("_", "-");
    const findVoice = () => {
      const all = (synth.getVoices && synth.getVoices().length) ? synth.getVoices() : voicesRef.current;
      return (all || []).find(v => norm(v).startsWith(target)) || null;
    };
    const voice = findVoice();

    // Speak synchronously inside the click gesture (Safari/iOS require this).
    const u = new SpeechSynthesisUtterance(text);
    u.lang = voice ? voice.lang : (target === "ar" ? "ar-SA" : "en-US");
    if (voice) u.voice = voice;
    u.rate = 0.97;
    let started = false;
    u.onstart = () => { started = true; setNoVoiceNotice(false); };
    u.onend = () => setNarratingKey(null);
    u.onerror = () => setNarratingKey(null);
    setNarratingKey(key);
    synth.speak(u);
    try { synth.resume(); } catch (e) {}   // Chrome can leave the queue paused

    // For Arabic only: if after a generous window nothing has begun AND nothing
    // is playing or queued, the device almost certainly has no Arabic voice —
    // tell the user instead of failing silently. We do NOT cancel here, so we
    // never cut off speech that was just slow to start.
    if (target === "ar") {
      setTimeout(() => {
        if (!started && !synth.speaking && !synth.pending) {
          setNarratingKey(null);
          setNoVoiceNotice(true);
        }
      }, 1600);
    }
  };

  const readPage = () => speak("page", pageNarration(page, activeOpp, lang));

  const toggleSave = (id) => setSaved(s => s.includes(id) ? s.filter(x => x !== id) : [...s, id]);
  const go = (p) => { setPage(p); setNavOpen(false); window.scrollTo({ top: 0 }); };

  // After the page actually changes, jump to the top so the new page starts at its header.
  useEffect(() => {
    window.scrollTo(0, 0);
    if (document.documentElement) document.documentElement.scrollTop = 0;
    if (document.body) document.body.scrollTop = 0;
  }, [page]);

  // Record an anonymous survey submission in the session's response history.
  const submitResponse = (answers, voteId) => {
    const entries = Object.entries(answers).filter(([, v]) => v && v.trim());
    if (!entries.length && !voteId) return null;
    const text = entries.map(([, v]) => v).join(" ");
    let target = voteId ? OPPORTUNITIES.find(o => o.id === voteId) : matchOpportunity(text);
    let isNew = false;
    if (target) {
      setVotes(v => ({ ...v, [target.id]: (v[target.id] || 0) + 1 }));
    } else {
      const existing = matchCommunity(text, communityOpps);
      if (existing) {
        target = existing;
        setVotes(v => ({ ...v, [existing.id]: (v[existing.id] || 0) + 1 }));
      } else if (text.trim()) {
        target = makeCommunityOpp(text, Date.now());
        setCommunityOpps(list => [...list, target]);
        isNew = true;
      }
    }
    setResponses(r => [{ id: Date.now(), time: Date.now(), answers: Object.fromEntries(entries), vote: target ? target.name : null, isNew }, ...r]);
    return target ? { name: target.name, isNew } : null;
  };

  const categories = ["All", ...Array.from(new Set(AREAS.map(a => L(OPPORTUNITIES.find(o => o.id === a.oppId), lang).category)))];
  const localizedAreas = AREAS.map(a => {
    const opp = L(OPPORTUNITIES.find(o => o.id === a.oppId), lang);
    return { ...a, name: isRTL ? a.name_ar : a.name, topService: opp.name, category: opp.category };
  });
  const visibleAreas = areaFilter === "All" ? localizedAreas : localizedAreas.filter(a => a.category === areaFilter);

  const ctx = { lang, speak, narratingKey, isRTL, votes, onHelpful: () => setHelped(h => h + 1) };

  return (
    <div className={`dp-app ${isRTL ? "dp-rtl" : ""} ${hc ? "dp-hc" : ""}`} dir={isRTL ? "rtl" : "ltr"} lang={lang}>
      <style>{`
        ${FONTS}
        .dp-app { font-family: 'Space Grotesk', ui-sans-serif, system-ui, sans-serif; background: ${T.sand}; color: ${T.ink}; min-height: 100vh; }
        .dp-app * { box-sizing: border-box; }
        .dp-app *:focus-visible { outline: 3px solid ${T.oasis}; outline-offset: 2px; border-radius: 4px; }
        .dp-display { font-family: 'Fraunces', Georgia, serif; }

        /* Arabic typography */
        .dp-rtl { font-family: 'IBM Plex Sans Arabic', 'Space Grotesk', sans-serif; }
        .dp-rtl .dp-display, .dp-rtl .dp-h1, .dp-rtl .dp-h2, .dp-rtl .dp-opp-name,
        .dp-rtl .dp-panel-title, .dp-rtl .dp-quote-text, .dp-rtl .dp-stat-value, .dp-rtl .dp-logo {
          font-family: 'Noto Kufi Arabic', 'Fraunces', serif;
        }
        .dp-rtl .dp-eyebrow, .dp-rtl .dp-mono, .dp-rtl .dp-plan-label, .dp-rtl .dp-pulse-label,
        .dp-rtl .dp-panel-sub, .dp-rtl .dp-a11y-label {
          font-family: 'IBM Plex Sans Arabic', monospace; letter-spacing: 0; text-transform: none;
        }
        .dp-rtl .dp-tab, .dp-rtl .dp-stat-label { text-transform: none; }
        .dp-rtl .dp-h1 { line-height: 1.5; }
        .dp-rtl .dp-h2 { line-height: 1.45; }

        .dp-nav { position: sticky; top: 0; z-index: 40; backdrop-filter: blur(14px); background: rgba(251,246,236,0.86); border-bottom: 1px solid ${T.line}; display:flex; align-items:center; justify-content:space-between; padding: 14px 20px; }
        .dp-logo { display:flex; align-items:center; gap:8px; font-family:'Fraunces',serif; font-weight:600; font-size:1.15rem; letter-spacing:-0.01em; cursor:pointer; }
        .dp-pulse-icon { color: ${T.oasis}; animation: dp-beat 1.8s ease-in-out infinite; }
        @keyframes dp-beat { 0%,100%{ transform: scale(1); } 50%{ transform: scale(1.18); } }
        @media (prefers-reduced-motion: reduce) { .dp-pulse-icon { animation: none; } * { animation: none !important; } }
        .dp-nav-links { display:none; gap: 22px; }
        @media (min-width: 920px) { .dp-nav-links { display:flex; } }
        .dp-nav-link { font-size: 0.88rem; font-weight: 500; color: rgba(43,33,24,0.6); cursor:pointer; padding-bottom: 4px; border-bottom: 2px solid transparent; transition: all .2s; white-space:nowrap; }
        .dp-nav-link.active, .dp-nav-link:hover { color: ${T.ink}; border-color: ${T.dune}; }
        .dp-nav-right { display:flex; align-items:center; gap:6px; }
        .dp-lang-btn { background:none; border:1.5px solid ${T.line}; border-radius:999px; padding:5px 12px; font-size:0.8rem; font-weight:600; cursor:pointer; color:${T.ink}; font-family:inherit; }
        .dp-lang-btn:hover { border-color:${T.ink}; }
        .dp-icon-btn { background:none; border:none; cursor:pointer; color:${T.ink}; padding:6px; border-radius:8px; }
        .dp-icon-btn:hover { background: rgba(43,33,24,0.06); }
        .dp-menu-btn { display:block; }
        @media (min-width: 920px) { .dp-menu-btn { display:none; } }
        .dp-mobile-menu { display:flex; flex-direction:column; gap:2px; padding: 8px 20px 16px; border-bottom: 1px solid ${T.line}; background: ${T.sand}; }
        @media (min-width: 920px) { .dp-mobile-menu { display:none; } }
        .dp-mobile-link { padding: 10px 4px; font-size: 0.95rem; font-weight:500; cursor:pointer; border-bottom: 1px solid ${T.line}; }

        .dp-shell { max-width: 1140px; margin: 0 auto; padding: 0 20px; }
        .dp-section { padding: 56px 0; }
        .dp-eyebrow { font-family:'JetBrains Mono',monospace; font-size: 0.72rem; text-transform: uppercase; letter-spacing: 0.12em; color: ${T.duneDark}; margin-bottom: 8px; }
        .dp-h1 { font-family:'Fraunces',serif; font-size: clamp(2.1rem, 5vw, 3.4rem); line-height: 1.06; font-weight: 600; letter-spacing: -0.01em; }
        .dp-h2 { font-family:'Fraunces',serif; font-size: clamp(1.6rem, 3vw, 2.2rem); font-weight: 600; letter-spacing: -0.01em; margin-bottom: 6px; }
        .dp-sub { color: rgba(43,33,24,0.62); font-size: 1rem; max-width: 560px; line-height: 1.55; }

        .dp-hero { position: relative; padding: 64px 0 40px; overflow:hidden; }
        .dp-hero-grad { position:absolute; inset:-20% -10% auto -10%; height: 480px; background: radial-gradient(60% 60% at 30% 20%, rgba(201,138,75,0.28), transparent 70%), radial-gradient(50% 50% at 80% 10%, rgba(31,122,108,0.22), transparent 70%); filter: blur(10px); z-index:0; }
        .dp-hero-inner { position:relative; z-index:1; }
        .dp-btn { display:inline-flex; align-items:center; gap:8px; font-weight:600; font-size:0.92rem; padding: 13px 22px; border-radius: 999px; border:none; cursor:pointer; transition: transform .15s, box-shadow .15s; font-family:inherit; }
        .dp-btn-primary { background: linear-gradient(135deg, ${T.dune}, ${T.gold}); color: #2B2118; box-shadow: 0 8px 24px rgba(201,138,75,0.35); }
        .dp-btn-primary:hover { transform: translateY(-2px); }
        .dp-btn-ghost { background: transparent; border: 1.5px solid rgba(43,33,24,0.22); color: ${T.ink}; }
        .dp-btn-ghost:hover { border-color: ${T.ink}; }
        .dp-btn-sm { padding: 8px 14px; font-size: 0.8rem; border-radius: 999px; }

        .dp-stat-grid { display:grid; grid-template-columns: repeat(2,1fr); gap: 14px; margin-top: 36px; }
        @media (min-width: 700px) { .dp-stat-grid { grid-template-columns: repeat(4,1fr); } }
        .dp-stat-card { background: ${T.card}; border: 1px solid ${T.line}; border-radius: 18px; padding: 18px; backdrop-filter: blur(8px); }
        .dp-stat-value { font-family:'Fraunces',serif; font-size: 1.9rem; font-weight: 600; color: ${T.duneDark}; }
        .dp-stat-label { font-size: 0.78rem; color: rgba(43,33,24,0.6); margin-top: 2px; }

        .dp-pulse-card { margin-top: 36px; background: ${T.ink}; border-radius: 22px; padding: 20px 18px 6px; position:relative; overflow:hidden; }
        .dp-pulse-card::before { content:''; position:absolute; inset:0; background: radial-gradient(60% 80% at 80% 0%, rgba(31,122,108,0.35), transparent 70%); }
        .dp-pulse-label { color: rgba(251,246,236,0.7); font-family:'JetBrains Mono',monospace; font-size:0.72rem; letter-spacing:0.08em; text-transform:uppercase; position:relative; z-index:1; }

        .dp-card { background: ${T.card}; border: 1px solid ${T.line}; border-radius: 20px; padding: 22px; backdrop-filter: blur(8px); transition: transform .18s, box-shadow .18s; }
        .dp-card:hover { transform: translateY(-3px); box-shadow: 0 14px 30px rgba(43,33,24,0.10); }
        .dp-feature-card { display:block; width:100%; text-align:start; cursor:pointer; font-family:inherit; color:${T.ink}; }
        .dp-feature-card:hover .dp-feature-hint { color:${T.oasis}; }
        .dp-feature-hint { margin-top:14px; font-family:'JetBrains Mono',monospace; font-size:0.72rem; text-transform:uppercase; letter-spacing:0.08em; color:${T.duneDark}; }
        .dp-rtl .dp-feature-hint { font-family:'IBM Plex Sans Arabic',monospace; letter-spacing:0; text-transform:none; }
        .dp-saved-divider { height:1px; background:${T.line}; margin:40px 0 26px; }
        .dp-form-hint { background:rgba(176,64,46,0.10); border:1px solid rgba(176,64,46,0.35); color:#9a3b2c; border-radius:12px; padding:10px 14px; font-size:0.85rem; margin-bottom:4px; }
        .dp-vote-grid { display:flex; flex-wrap:wrap; gap:8px; margin-bottom:8px; }
        .dp-vote-chip { background:rgba(31,122,108,0.07); border:1.5px solid ${T.line}; color:${T.ink}; border-radius:999px; padding:8px 14px; font-family:inherit; font-size:0.84rem; cursor:pointer; transition:all .15s; }
        .dp-vote-chip:hover { border-color:${T.oasis}; }
        .dp-vote-chip.active { background:${T.oasis}; color:#fff; border-color:${T.oasis}; }
        .dp-you-badge { display:inline-block; margin-top:10px; background:rgba(31,122,108,0.12); color:${T.oasis}; border-radius:999px; padding:3px 10px; font-size:0.74rem; font-weight:600; }
        .dp-new-badge { display:inline-block; margin-top:10px; margin-inline-start:6px; background:rgba(227,168,87,0.18); color:${T.duneDark}; border:1px solid rgba(227,168,87,0.5); border-radius:999px; padding:3px 10px; font-size:0.74rem; font-weight:600; }
        .dp-you-tag { color:${T.oasis}; font-weight:600; font-size:0.78rem; }
        .dp-match-note { max-width:520px; margin:16px auto 0; background:rgba(31,122,108,0.10); border:1px solid rgba(31,122,108,0.3); color:${T.ink}; border-radius:12px; padding:11px 16px; font-size:0.9rem; line-height:1.5; }
        .dp-contrib { margin-top:22px; background:rgba(31,122,108,0.08); border:1px solid rgba(31,122,108,0.28); border-radius:16px; padding:16px 18px; }
        .dp-contrib-title { font-family:'Fraunces',serif; font-weight:600; font-size:1.05rem; color:${T.oasis}; }
        .dp-rtl .dp-contrib-title { font-family:'Noto Kufi Arabic',serif; }
        .dp-contrib-intro { font-size:0.85rem; color:rgba(43,33,24,0.7); margin:4px 0 12px; }
        .dp-contrib-tags { display:flex; flex-wrap:wrap; gap:8px; }
        .dp-contrib-tag { display:inline-flex; align-items:center; gap:6px; background:#fff; border:1px solid ${T.line}; border-radius:999px; padding:6px 12px; font-size:0.85rem; font-weight:500; }
        .dp-contrib-count { background:${T.oasis}; color:#fff; border-radius:999px; padding:1px 8px; font-family:'JetBrains Mono',monospace; font-size:0.74rem; }
        .dp-intake { margin-top:18px; padding:16px; border:1px dashed ${T.line}; border-radius:14px; background:rgba(31,122,108,0.04); }
        .dp-intake-title { font-weight:600; font-size:0.95rem; margin-bottom:12px; }
        .dp-intake-row { display:flex; flex-wrap:wrap; align-items:center; gap:8px; margin-bottom:10px; }
        .dp-intake-label { font-size:0.82rem; color:rgba(43,33,24,0.7); min-width:120px; }
        .dp-intake-chips { display:flex; flex-wrap:wrap; gap:6px; }
        .dp-intake-chip { background:#fff; border:1.5px solid ${T.line}; color:${T.ink}; border-radius:999px; padding:6px 12px; font-family:inherit; font-size:0.8rem; cursor:pointer; transition:all .15s; }
        .dp-intake-chip:hover { border-color:${T.oasis}; }
        .dp-intake-chip.active { background:${T.oasis}; color:#fff; border-color:${T.oasis}; }
        .dp-intake-hint { font-size:0.76rem; color:rgba(43,33,24,0.55); margin-top:4px; }
        .dp-fit-box { background:rgba(201,138,75,0.10); border:1px solid rgba(201,138,75,0.35); border-radius:12px; padding:12px 14px; font-size:0.92rem; line-height:1.6; color:${T.ink}; }
        .dp-helpful { margin-top:22px; padding-top:18px; border-top:1px solid ${T.line}; display:flex; flex-wrap:wrap; align-items:center; gap:14px; }
        .dp-helpful-q { font-weight:600; font-size:0.95rem; }
        .dp-helpful-btns { display:flex; gap:8px; }
        .dp-helpful-btn { display:inline-flex; align-items:center; gap:6px; background:#fff; border:1.5px solid ${T.line}; color:${T.ink}; border-radius:999px; padding:7px 16px; font-family:inherit; font-size:0.86rem; cursor:pointer; transition:all .15s; }
        .dp-helpful-btn:hover { border-color:${T.oasis}; color:${T.oasis}; }
        .dp-helpful-thanks { display:inline-flex; align-items:center; gap:8px; font-size:0.9rem; color:rgba(43,33,24,0.8); }
        .dp-toast { position:fixed; left:50%; transform:translateX(-50%); bottom:24px; z-index:70; max-width:min(560px, calc(100vw - 32px)); background:${T.ink}; color:${T.sand}; border-radius:14px; padding:14px 18px; font-size:0.88rem; line-height:1.5; box-shadow:0 14px 40px rgba(43,33,24,0.35); cursor:pointer; animation: dp-toast-in .25s ease-out; }
        @keyframes dp-toast-in { from { opacity:0; transform:translate(-50%, 12px); } to { opacity:1; transform:translate(-50%, 0); } }
        .dp-grid-2 { display:grid; grid-template-columns: 1fr; gap: 16px; }
        @media (min-width: 760px) { .dp-grid-2 { grid-template-columns: 1fr 1fr; } }
        .dp-grid-3 { display:grid; grid-template-columns: 1fr; gap: 16px; }
        @media (min-width: 700px) { .dp-grid-3 { grid-template-columns: 1fr 1fr; } }
        @media (min-width: 1020px) { .dp-grid-3 { grid-template-columns: 1fr 1fr 1fr; } }

        .dp-opp-head { display:flex; justify-content:space-between; align-items:flex-start; gap: 10px; }
        .dp-opp-icon { width:42px; height:42px; border-radius: 12px; background: linear-gradient(135deg, rgba(201,138,75,0.18), rgba(31,122,108,0.16)); display:flex; align-items:center; justify-content:center; color:${T.duneDark}; flex-shrink:0; }
        .dp-opp-name { font-family:'Fraunces',serif; font-weight:600; font-size: 1.06rem; line-height:1.25; }
        .dp-opp-cat { font-size: 0.72rem; color: rgba(43,33,24,0.55); margin-top: 2px; }
        .dp-opp-meta { display:flex; gap: 14px; margin-top: 14px; flex-wrap:wrap; font-size: 0.78rem; color: rgba(43,33,24,0.65); }
        .dp-opp-meta b { color: ${T.ink}; font-family:'JetBrains Mono',monospace; }
        .dp-rtl .dp-opp-meta b { font-family: 'IBM Plex Sans Arabic', monospace; }
        .dp-badge { display:inline-flex; align-items:center; font-size: 0.7rem; font-weight:600; padding: 4px 9px; border-radius: 999px; border: 1px solid; }
        .dp-ring-text { font-family:'JetBrains Mono',monospace; font-size: 13px; font-weight:600; fill: ${T.ink}; }
        .dp-opp-actions { display:flex; gap: 8px; margin-top:16px; align-items:center; flex-wrap:wrap; }

        .dp-overlay { position: fixed; inset:0; background: rgba(43,33,24,0.45); backdrop-filter: blur(2px); z-index: 60; display:flex; justify-content:flex-end; }
        .dp-rtl .dp-overlay { justify-content:flex-start; }
        .dp-panel { width: min(420px, 92vw); height: 100%; background: ${T.sand}; padding: 26px 22px; overflow-y: auto; animation: dp-slide .25s ease; }
        @keyframes dp-slide { from { transform: translateX(20px); opacity:0;} to { transform: translateX(0); opacity:1; } }
        .dp-panel-head { display:flex; justify-content:space-between; align-items:flex-start; margin-bottom: 16px; }
        .dp-panel-title { font-family:'Fraunces',serif; font-size:1.25rem; font-weight:600; }
        .dp-panel-row { display:flex; align-items:center; gap:8px; font-size:0.86rem; margin-bottom:10px; color: rgba(43,33,24,0.75); }
        .dp-panel-sub { font-size: 0.76rem; text-transform:uppercase; letter-spacing:0.07em; color: rgba(43,33,24,0.5); margin: 18px 0 8px; font-family:'JetBrains Mono',monospace; }
        .dp-reason-list { list-style:none; padding:0; margin:0; display:flex; flex-direction:column; gap:8px; font-size:0.88rem; }
        .dp-reason-list li { display:flex; align-items:flex-start; }
        .dp-quote-stack { display:flex; flex-direction:column; gap:8px; }
        .dp-quote-mini { display:flex; align-items:flex-start; font-size: 0.85rem; font-style: italic; color: rgba(43,33,24,0.75); background: rgba(255,255,255,0.5); padding:10px; border-radius:10px; }

        .dp-quote-card { background: ${T.card}; border:1px solid ${T.line}; border-radius:18px; padding:20px; }
        .dp-quote-text { font-family:'Fraunces',serif; font-size: 1.02rem; font-style: italic; line-height:1.4; }
        .dp-quote-tag { margin-top:10px; font-size: 0.72rem; color: ${T.oasis}; font-weight:600; }

        .dp-form-card { background: ${T.card}; border:1px solid ${T.line}; border-radius: 22px; padding: 28px 24px; max-width: 560px; margin: 0 auto; }
        .dp-q-label { font-weight: 600; font-size: 0.95rem; margin-bottom: 8px; }
        .dp-input { width:100%; border: 1.5px solid ${T.line}; background: rgba(255,255,255,0.7); border-radius: 12px; padding: 12px 14px; font-size: 0.92rem; font-family: inherit; margin-bottom: 20px; resize: vertical; min-height: 56px; }
        .dp-history { max-width: 640px; margin: 34px auto 0; }
        .dp-history-head { font-family:'Fraunces',serif; font-weight:600; font-size:1.05rem; display:flex; align-items:center; }
        .dp-rtl .dp-history-head { font-family:'Noto Kufi Arabic',serif; }
        .dp-history-count { display:inline-flex; align-items:center; justify-content:center; min-width:22px; height:22px; padding:0 7px; margin-inline-start:8px; border-radius:999px; background:${T.oasis}; color:#fff; font-family:'JetBrains Mono',monospace; font-size:0.75rem; }
        .dp-history-note { font-size:0.82rem; color:rgba(43,33,24,0.6); line-height:1.5; margin:8px 0 16px; }
        .dp-history-list { display:flex; flex-direction:column; gap:12px; }
        .dp-history-item { background:${T.card}; border:1px solid ${T.line}; border-radius:16px; padding:14px 16px; }
        .dp-history-meta { display:flex; justify-content:space-between; gap:10px; font-family:'JetBrains Mono',monospace; font-size:0.72rem; color:${T.duneDark}; margin-bottom:10px; }
        .dp-rtl .dp-history-meta { font-family:'IBM Plex Sans Arabic',monospace; }
        .dp-history-qa { margin-bottom:9px; } .dp-history-qa:last-child { margin-bottom:0; }
        .dp-history-q { font-size:0.8rem; color:rgba(43,33,24,0.6); margin-bottom:2px; }
        .dp-history-a { font-size:0.94rem; color:${T.ink}; font-weight:500; overflow-wrap:anywhere; }
        .dp-hc .dp-history-item { background:#fff; border:2px solid #0d0d0d; }
        .dp-input:focus { outline: 2px solid ${T.oasis}; border-color: transparent; }

        .dp-footer { padding: 30px 0 50px; text-align:center; font-size: 0.78rem; color: rgba(43,33,24,0.5); }
        .dp-build { font-family:'JetBrains Mono',monospace; color:${T.oasis}; }

        .dp-tab-row { display:flex; gap: 8px; flex-wrap:wrap; margin: 18px 0 24px; }
        .dp-tab { padding: 7px 14px; border-radius: 999px; font-size: 0.8rem; font-weight: 600; cursor:pointer; border: 1.5px solid ${T.line}; background: rgba(255,255,255,0.5); transition: all .15s; font-family:inherit; }
        .dp-tab.active { background: ${T.ink}; color: ${T.sand}; border-color: ${T.ink}; }

        .dp-plan-section { margin-bottom: 22px; }
        .dp-plan-label { font-family:'JetBrains Mono',monospace; font-size: 0.74rem; text-transform: uppercase; letter-spacing: 0.08em; color: ${T.duneDark}; margin-bottom: 6px; }
        .dp-plan-body { font-size: 0.92rem; line-height: 1.6; color: rgba(43,33,24,0.85); }
        .dp-pill-row { display:flex; gap:8px; flex-wrap:wrap; margin-top:6px; }
        .dp-pill { font-size: 0.78rem; background: rgba(31,122,108,0.1); color: ${T.oasis}; padding: 5px 11px; border-radius: 999px; font-weight: 600; }

        .dp-map-wrap { background: linear-gradient(160deg, #EFE3C9, #E2D2AC); border-radius: 22px; padding: 18px; position: relative; aspect-ratio: 4/3; max-width: 640px; }
        .dp-map-dot { position:absolute; border-radius:50%; transform: translate(-50%,-50%); cursor:pointer; border: 2px solid rgba(255,255,255,0.85); transition: transform .15s; }
        .dp-map-dot:hover { transform: translate(-50%,-50%) scale(1.12); }
        .dp-map-tip { position:absolute; bottom: 12px; left: 12px; right:12px; background: rgba(255,255,255,0.92); border-radius: 14px; padding: 12px 14px; font-size: 0.82rem; box-shadow: 0 8px 20px rgba(43,33,24,0.15); }

        .dp-transparency { display:flex; flex-direction:column; gap: 10px; }
        .dp-tr-item { display:flex; gap:10px; align-items:flex-start; font-size: 0.9rem; }

        .dp-empty { text-align:center; padding: 60px 20px; color: rgba(43,33,24,0.55); }

        .dp-legend-row { display:flex; gap:16px; flex-wrap:wrap; margin-top:10px; font-size:12px; }
        .dp-legend-item { display:flex; align-items:center; gap:6px; }

        /* Accessibility widget */
        .dp-a11y-fab { position:fixed; bottom:20px; inset-inline-start:20px; z-index:55; width:54px; height:54px; border-radius:50%; border:none; cursor:pointer; background:${T.oasis}; color:#fff; display:flex; align-items:center; justify-content:center; box-shadow:0 8px 24px rgba(31,122,108,0.42); }
        .dp-a11y-fab:hover { background:${T.oasisLight}; }
        .dp-a11y-panel { position:fixed; bottom:84px; inset-inline-start:20px; z-index:55; width:268px; max-width:calc(100vw - 40px); background:${T.sand}; border:1px solid ${T.line}; border-radius:18px; padding:16px; box-shadow:0 16px 40px rgba(43,33,24,0.22); }
        .dp-a11y-row { margin-bottom:14px; } .dp-a11y-row:last-child { margin-bottom:0; }
        .dp-a11y-label { font-size:0.72rem; text-transform:uppercase; letter-spacing:0.08em; color:${T.duneDark}; margin-bottom:7px; font-family:'JetBrains Mono',monospace; }
        .dp-seg { display:flex; gap:6px; }
        .dp-seg button { flex:1; padding:9px 8px; border-radius:10px; border:1.5px solid ${T.line}; background:rgba(255,255,255,0.6); cursor:pointer; font-family:inherit; font-size:0.82rem; font-weight:600; color:${T.ink}; display:flex; align-items:center; justify-content:center; gap:6px; }
        .dp-seg button:hover { border-color:${T.ink}; }
        .dp-seg button.on { background:${T.ink}; color:${T.sand}; border-color:${T.ink}; }

        /* AI business coach */
        .dp-coach-fab { position:fixed; bottom:20px; inset-inline-end:20px; z-index:55; width:56px; height:56px; border-radius:50%; border:none; cursor:pointer; background: linear-gradient(135deg, ${T.dune}, ${T.gold}); color:#2B2118; display:flex; align-items:center; justify-content:center; box-shadow:0 8px 26px rgba(201,138,75,0.5); transition: transform .15s; }
        .dp-coach-fab:hover { transform: translateY(-2px); }
        .dp-coach-panel { position:fixed; bottom:88px; inset-inline-end:20px; z-index:55; width:380px; max-width:calc(100vw - 32px); height:540px; max-height:calc(100vh - 130px); background:${T.sand}; border:1px solid ${T.line}; border-radius:20px; box-shadow:0 18px 48px rgba(43,33,24,0.28); display:flex; flex-direction:column; overflow:hidden; }
        .dp-coach-head { display:flex; align-items:center; gap:10px; padding:13px 15px; background:${T.ink}; color:${T.sand}; }
        .dp-coach-avatar { width:34px; height:34px; border-radius:50%; background: linear-gradient(135deg, ${T.oasis}, ${T.oasisLight}); display:flex; align-items:center; justify-content:center; color:#fff; flex-shrink:0; }
        .dp-coach-head-txt { flex:1; min-width:0; }
        .dp-coach-name { font-family:'Fraunces',serif; font-weight:600; font-size:0.98rem; }
        .dp-rtl .dp-coach-name { font-family:'Noto Kufi Arabic',serif; }
        .dp-coach-tag { font-size:0.72rem; opacity:0.72; line-height:1.3; }
        .dp-coach-reset { background:rgba(255,255,255,0.14); border:none; color:${T.sand}; cursor:pointer; width:30px; height:30px; border-radius:8px; display:flex; align-items:center; justify-content:center; flex-shrink:0; }
        .dp-coach-reset:hover { background:rgba(255,255,255,0.26); }
        .dp-coach-body { flex:1; overflow-y:auto; padding:16px; display:flex; flex-direction:column; gap:10px; }
        .dp-coach-msg { max-width:85%; padding:10px 13px; border-radius:15px; font-size:0.9rem; line-height:1.55; white-space:pre-wrap; overflow-wrap:anywhere; }
        .dp-coach-msg.assistant { align-self:flex-start; background:rgba(255,255,255,0.74); border:1px solid ${T.line}; border-end-start-radius:5px; color:${T.ink}; }
        .dp-coach-msg.user { align-self:flex-end; background:${T.oasis}; color:#fff; border-end-end-radius:5px; }
        .dp-coach-err { background:rgba(176,64,46,0.12) !important; border:1px solid rgba(176,64,46,0.4) !important; color:#9a3b2c !important; }
        .dp-coach-chips { display:flex; flex-direction:column; gap:7px; }
        .dp-coach-chip { text-align:start; background:rgba(31,122,108,0.08); border:1px solid rgba(31,122,108,0.28); color:${T.oasis}; padding:9px 12px; border-radius:12px; font-family:inherit; font-size:0.84rem; font-weight:500; cursor:pointer; }
        .dp-coach-chip:hover { background:rgba(31,122,108,0.16); }
        .dp-coach-suggest-label { font-size:0.7rem; text-transform:uppercase; letter-spacing:0.08em; color:${T.duneDark}; font-family:'JetBrains Mono',monospace; margin:4px 0 2px; }
        .dp-rtl .dp-coach-suggest-label { font-family:'IBM Plex Sans Arabic',monospace; letter-spacing:0; text-transform:none; }
        .dp-coach-typing { display:flex; gap:5px; align-items:center; }
        .dp-coach-typing span { width:7px; height:7px; border-radius:50%; background:${T.duneDark}; opacity:0.45; animation: dp-bounce 1s infinite; }
        .dp-coach-typing span:nth-child(2){ animation-delay:.15s; }
        .dp-coach-typing span:nth-child(3){ animation-delay:.3s; }
        @keyframes dp-bounce { 0%,60%,100%{ transform:translateY(0); opacity:.4; } 30%{ transform:translateY(-5px); opacity:.9; } }
        .dp-coach-foot { display:flex; gap:8px; padding:12px; border-top:1px solid ${T.line}; }
        .dp-coach-input { flex:1; min-width:0; border:1.5px solid ${T.line}; border-radius:12px; padding:11px 14px; font-family:inherit; font-size:0.9rem; background:rgba(255,255,255,0.72); color:${T.ink}; outline:none; }
        .dp-coach-input:focus { border-color:${T.oasis}; }
        .dp-coach-send { width:46px; flex-shrink:0; border:none; border-radius:12px; background:${T.oasis}; color:#fff; cursor:pointer; display:flex; align-items:center; justify-content:center; }
        .dp-coach-send:hover:not(:disabled) { background:${T.oasisLight}; }
        .dp-coach-send:disabled { opacity:0.4; cursor:not-allowed; }
        .dp-rtl .dp-coach-send svg { transform: scaleX(-1); }
        .dp-coach-scope { font-size:0.66rem; color:rgba(43,33,24,0.5); text-align:center; padding:0 12px 11px; font-family:'JetBrains Mono',monospace; }
        .dp-rtl .dp-coach-scope { font-family:'IBM Plex Sans Arabic',monospace; letter-spacing:0; }
        .dp-hc .dp-coach-msg.assistant, .dp-hc .dp-coach-input { border-color:${T.ink}; }
        @media (max-width:480px) { .dp-coach-panel { inset-inline-end:12px; inset-inline-start:12px; width:auto; max-width:none; } .dp-coach-fab { inset-inline-end:14px; } }

        /* ---------------- HIGH CONTRAST ---------------- */
        .dp-hc { background:#ffffff; color:#0d0d0d; }
        .dp-hc .dp-nav { background:#ffffff; border-bottom:2px solid #0d0d0d; }
        .dp-hc .dp-nav-link { color:#333; }
        .dp-hc .dp-nav-link.active, .dp-hc .dp-nav-link:hover { color:#000; border-color:#000; }
        .dp-hc .dp-sub, .dp-hc .dp-opp-cat, .dp-hc .dp-stat-label, .dp-hc .dp-opp-meta,
        .dp-hc .dp-plan-body, .dp-hc .dp-panel-row, .dp-hc .dp-tr-item, .dp-hc .dp-reason-list,
        .dp-hc .dp-quote-mini, .dp-hc .dp-quote-text { color:#1a1a1a !important; }
        .dp-hc .dp-opp-meta b { color:#000; }
        .dp-hc .dp-card, .dp-hc .dp-stat-card, .dp-hc .dp-quote-card, .dp-hc .dp-form-card,
        .dp-hc .dp-a11y-panel { background:#ffffff; border:2px solid #0d0d0d; backdrop-filter:none; }
        .dp-hc .dp-eyebrow, .dp-hc .dp-plan-label, .dp-hc .dp-a11y-label, .dp-hc .dp-panel-sub { color:#7a3d00; }
        .dp-hc .dp-stat-value { color:#7a3d00; }
        .dp-hc .dp-input { background:#fff; border:2px solid #0d0d0d; color:#0d0d0d; }
        .dp-hc .dp-btn-ghost, .dp-hc .dp-tab, .dp-hc .dp-lang-btn, .dp-hc .dp-seg button { border-color:#0d0d0d; color:#0d0d0d; }
        .dp-hc .dp-tab.active, .dp-hc .dp-seg button.on { background:#0d0d0d; color:#fff; }
        .dp-hc .dp-quote-mini, .dp-hc .dp-pill { background:#f0f0f0; }
        .dp-hc .dp-map-tip { background:#fff; border:2px solid #0d0d0d; }
        .dp-hc .dp-panel { background:#fff; border-inline-start:2px solid #0d0d0d; }
        .dp-hc .dp-quote-tag, .dp-hc .dp-pill { color:#0a4f45; }
        .dp-hc .dp-ring-text { fill:#0d0d0d; }
      `}</style>

      {/* NAV */}
      <div className="dp-nav">
        <div className="dp-logo" onClick={() => go("landing")}>
          <Pulse /> {t("brand", lang)}
        </div>
        <div className="dp-nav-links">
          {NAV.map(n => (
            <div key={n.id} className={`dp-nav-link ${page === n.id ? "active" : ""}`} onClick={() => go(n.id)}>
              {isRTL ? n.ar : n.en}
            </div>
          ))}
        </div>
        <div className="dp-nav-right">
          <button className="dp-lang-btn" onClick={() => setLang(l => l === "en" ? "ar" : "en")} aria-label={t("a11yLanguage", lang)}>
            {lang === "en" ? "العربية" : "English"}
          </button>
          <button className="dp-icon-btn dp-menu-btn" onClick={() => setNavOpen(v => !v)} aria-label="Menu">
            <Menu size={20} />
          </button>
        </div>
      </div>
      {navOpen && (
        <div className="dp-mobile-menu">
          {NAV.map(n => (
            <div key={n.id} className="dp-mobile-link" onClick={() => go(n.id)}>{isRTL ? n.ar : n.en}</div>
          ))}
        </div>
      )}

      {/* PAGES */}
      {page === "landing" && <LandingPage go={go} lang={lang} extraResponses={responses.length} extraHelped={helped} extraOpps={communityOpps.length} />}
      {page === "survey" && (
        <SurveyPage answers={surveyAnswers} setAnswers={setSurveyAnswers} done={surveyDone} setDone={setSurveyDone} go={go} lang={lang} responses={responses} onSubmit={submitResponse} />
      )}
      {page === "dashboard" && <DashboardPage lang={lang} extraResponses={responses.length} votes={votes} extraHelped={helped} extraOpps={communityOpps.length} />}
      {page === "marketplace" && (
        <MarketplacePage saved={saved} toggleSave={toggleSave} openPanel={setPanelOpp}
          openPlan={(o) => { setActiveOpp(o); go("generator"); }} ctx={ctx} communityOpps={communityOpps} />
      )}
      {page === "generator" && (
        <GeneratorPage opp={activeOpp} go={go} saved={saved} toggleSave={toggleSave} ctx={ctx} />
      )}
      {page === "saved" && (
        <SavedPage saved={saved} toggleSave={toggleSave} openPlan={(o) => { setActiveOpp(o); go("generator"); }} go={go} ctx={ctx} responses={responses} />
      )}
      {page === "validation" && (
        <ValidationPage openPanel={setPanelOpp} areaFilter={areaFilter} setAreaFilter={setAreaFilter}
          categories={categories} visibleAreas={visibleAreas} activeArea={activeArea} setActiveArea={setActiveArea} lang={lang} extraResponses={responses.length} votes={votes} />
      )}
      {page === "about" && <AboutPage go={go} lang={lang} />}

      <div className="dp-footer">{t("footer", lang)} · <span className="dp-build">build R10 · 14-opportunities</span></div>

      <ValidationPanel opp={panelOpp} onClose={() => setPanelOpp(null)} lang={lang} votes={votes} />

      <AccessibilityWidget
        lang={lang} setLang={setLang}
        hc={hc} setHc={setHc}
        fontScale={fontScale} setFontScale={setFontScale}
        isReadingPage={narratingKey === "page"} onReadPage={readPage}
      />

      <BusinessCoach lang={lang} />

      {noVoiceNotice && (
        <div className="dp-toast" role="status" dir="auto" onClick={() => setNoVoiceNotice(false)}>
          {t("narrNoVoice", lang)}
        </div>
      )}
    </div>
  );
}

/* ---------------------------------------------------------------------- */
/* LANDING                                                                 */
/* ---------------------------------------------------------------------- */
function LandingPage({ go, lang, extraResponses = 0, extraHelped = 0, extraOpps = 0 }) {
  const title = t("heroTitle", lang);
  const statValue = (s) => {
    if (s.key === "communityResponses") return bumpCount(s.value, extraResponses);
    if (s.key === "entrepreneursHelped") return bumpCount(s.value, extraHelped);
    if (s.key === "opportunitiesFound") return bumpCount(s.value, extraOpps);
    return s.value;
  };
  return (
    <>
      <section className="dp-hero">
        <div className="dp-hero-grad" />
        <div className="dp-shell dp-hero-inner">
          <div className="dp-eyebrow">{t("heroEyebrow", lang)}</div>
          <h1 className="dp-h1">{title.map((ln, i) => <React.Fragment key={i}>{ln}{i < title.length - 1 && <br />}</React.Fragment>)}</h1>
          <p className="dp-sub" style={{ marginTop: 16 }}>{t("heroSub", lang)}</p>
          <div style={{ display: "flex", gap: 12, marginTop: 26, flexWrap: "wrap" }}>
            <button className="dp-btn dp-btn-primary" onClick={() => go("marketplace")}>
              {t("ctaExplore", lang)} <ArrowRight size={16} style={{ transform: lang === "ar" ? "scaleX(-1)" : "none" }} />
            </button>
            <button className="dp-btn dp-btn-ghost" onClick={() => go("survey")}>{t("ctaShare", lang)}</button>
          </div>

          <div className="dp-stat-grid">
            {STATS.map(s => <StatCard key={s.key} labelKey={s.key} value={statValue(s)} lang={lang} />)}
          </div>

          <div className="dp-pulse-card">
            <div className="dp-pulse-label">{t("pulseLabel", lang)}</div>
            <ResponsiveContainer width="100%" height={120}>
              <AreaChart data={PULSE_DATA}>
                <defs>
                  <linearGradient id="pulseGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor={T.oasisLight} stopOpacity={0.6} />
                    <stop offset="100%" stopColor={T.oasisLight} stopOpacity={0} />
                  </linearGradient>
                </defs>
                <Area type="monotone" dataKey="v" stroke={T.oasisLight} strokeWidth={2} fill="url(#pulseGrad)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
      </section>

      <section className="dp-section dp-shell">
        <div className="dp-eyebrow">{t("howEyebrow", lang)}</div>
        <h2 className="dp-h2">{t("howTitle", lang)}</h2>
        <div className="dp-grid-3" style={{ marginTop: 24 }}>
          <FeatureCard icon={MessageSquareQuote} title={t("fListenT", lang)} text={t("fListenB", lang)} hint={t("howStepHint", lang)} onClick={() => go("survey")} />
          <FeatureCard icon={Sparkles} title={t("fAnalyzeT", lang)} text={t("fAnalyzeB", lang)} hint={t("howStepHint", lang)} onClick={() => go("dashboard")} />
          <FeatureCard icon={FileBarChart} title={t("fLaunchT", lang)} text={t("fLaunchB", lang)} hint={t("howStepHint", lang)} onClick={() => go("marketplace")} />
        </div>
        <div style={{ marginTop: 22 }}>
          <button className="dp-btn dp-btn-primary" onClick={() => go("marketplace")}>
            {t("howCta", lang)} <ArrowRight size={16} style={{ transform: lang === "ar" ? "scaleX(-1)" : "none" }} />
          </button>
        </div>
      </section>
    </>
  );
}

function FeatureCard({ icon: Icon, title, text, hint, onClick }) {
  return (
    <button type="button" className="dp-card dp-feature-card" onClick={onClick}>
      <div className="dp-opp-icon"><Icon size={20} /></div>
      <div style={{ fontFamily: "inherit", fontWeight: 600, fontSize: "1.05rem", marginTop: 14 }} className="dp-display">{title}</div>
      <div style={{ fontSize: "0.88rem", color: "rgba(43,33,24,0.65)", marginTop: 6, lineHeight: 1.5 }}>{text}</div>
      {hint && (
        <div className="dp-feature-hint">
          {hint} <ChevronRight size={13} style={{ verticalAlign: -2 }} />
        </div>
      )}
    </button>
  );
}

/* ---------------------------------------------------------------------- */
/* SURVEY                                                                  */
/* ---------------------------------------------------------------------- */
function ResponseHistory({ responses, lang }) {
  if (!responses || responses.length === 0) return null;
  const fmt = (ts) => {
    try {
      return new Date(ts).toLocaleString(lang === "ar" ? "ar-AE" : "en-GB",
        { day: "numeric", month: "short", hour: "2-digit", minute: "2-digit" });
    } catch (e) { return ""; }
  };
  return (
    <div className="dp-history">
      <div className="dp-history-head">
        <FileBarChart size={16} style={{ marginInlineEnd: 6, verticalAlign: -3 }} />
        {t("historyTitle", lang)} <span className="dp-history-count">{responses.length}</span>
      </div>
      <p className="dp-history-note">{t("historyNote", lang)}</p>
      <div className="dp-history-list">
        {responses.map((r, idx) => (
          <div key={r.id} className="dp-history-item">
            <div className="dp-history-meta">
              <span>{t("historyResponse", lang)} #{responses.length - idx}</span>
              <span>{fmt(r.time)}</span>
            </div>
            {Object.entries(r.answers).map(([qi, val]) => {
              const q = SURVEY_QUESTIONS[Number(qi)];
              if (!q) return null;
              return (
                <div key={qi} className="dp-history-qa" dir="auto">
                  <div className="dp-history-q">{lang === "ar" ? q.ar : q.en}</div>
                  <div className="dp-history-a">{val}</div>
                </div>
              );
            })}
          </div>
        ))}
      </div>
    </div>
  );
}

function SurveyPage({ answers, setAnswers, done, setDone, go, lang, responses, onSubmit }) {
  const [needAnswer, setNeedAnswer] = useState(false);
  const [lastMatch, setLastMatch] = useState(null);
  const submit = () => {
    const hasAnswer = Object.values(answers).some(v => v && v.trim());
    if (!hasAnswer) { setNeedAnswer(true); return; }
    setNeedAnswer(false);
    const matched = onSubmit(answers);
    setLastMatch(matched);
    setDone(true);
  };
  if (done) {
    return (
      <section className="dp-section dp-shell" style={{ textAlign: "center" }}>
        <CheckCircle2 size={42} style={{ color: T.oasis }} />
        <h2 className="dp-h2" style={{ marginTop: 14 }}>{t("surveyDoneTitle", lang)}</h2>
        <p className="dp-sub" style={{ margin: "0 auto" }}>{t("surveyDoneSub", lang)}</p>
        {lastMatch && (
          <div className="dp-match-note" dir="auto">
            {t(lastMatch.isNew ? "surveyCreated" : "surveyMatched", lang)} <strong>{lastMatch.name}</strong> — {t(lastMatch.isNew ? "surveyCreatedTail" : "surveyMatchedTail", lang)}
          </div>
        )}
        <div style={{ display: "flex", gap: 12, justifyContent: "center", marginTop: 22, flexWrap: "wrap" }}>
          <button className="dp-btn dp-btn-primary" onClick={() => go("dashboard")}>{t("seeInsights", lang)}</button>
          <button className="dp-btn dp-btn-ghost" onClick={() => { setDone(false); setAnswers({}); }}>{t("submitAnother", lang)}</button>
        </div>
        <div style={{ textAlign: "start", maxWidth: 640, margin: "30px auto 0" }}>
          <ResponseHistory responses={responses} lang={lang} />
        </div>
      </section>
    );
  }
  return (
    <section className="dp-section dp-shell">
      <div className="dp-eyebrow">{t("surveyEyebrow", lang)}</div>
      <h2 className="dp-h2">{t("surveyTitle", lang)}</h2>
      <p className="dp-sub" style={{ marginBottom: 28 }}>{t("surveySub", lang)}</p>
      <div className="dp-form-card">
        {SURVEY_QUESTIONS.map((q, i) => (
          <div key={i}>
            <div className="dp-q-label">{lang === "ar" ? q.ar : q.en}</div>
            <textarea
              className="dp-input"
              placeholder={t("surveyPlaceholder", lang)}
              value={answers[i] || ""}
              onChange={(e) => { setAnswers(a => ({ ...a, [i]: e.target.value })); if (needAnswer) setNeedAnswer(false); }}
            />
          </div>
        ))}
        {needAnswer && <div className="dp-form-hint" role="alert" dir="auto">{t("surveyNeedAnswer", lang)}</div>}
        <button className="dp-btn dp-btn-primary" style={{ width: "100%", justifyContent: "center" }} onClick={submit}>
          {t("surveySubmit", lang)}
        </button>
      </div>
      <ResponseHistory responses={responses} lang={lang} />
    </section>
  );
}

/* ---------------------------------------------------------------------- */
/* DASHBOARD                                                               */
/* ---------------------------------------------------------------------- */
function DashboardPage({ lang, extraResponses = 0, votes = {}, extraHelped = 0, extraOpps = 0 }) {
  const ranked = rankedOpportunities(votes);
  const topServices = ranked.slice(0, 6).map(o => ({
    name: L(o, lang).name.split(" ").slice(0, 2).join(" "), score: liveScore(o, votes),
  }));
  const trendData = ["Jan", "Feb", "Mar", "Apr", "May", "Jun"].map((m, i) => ({
    month: m,
    a: [30, 38, 50, 60, 68, 76][i],
    f: [40, 50, 58, 70, 80, 89][i],
    s: [35, 44, 55, 63, 72, 83][i],
  }));
  const pie = CATEGORY_BREAKDOWN.map(c => ({ ...c, label: lang === "ar" ? c.name_ar : c.name }));
  const statValue = (s) => {
    if (s.key === "communityResponses") return bumpCount(s.value, extraResponses);
    if (s.key === "entrepreneursHelped") return bumpCount(s.value, extraHelped);
    if (s.key === "opportunitiesFound") return bumpCount(s.value, extraOpps);
    return s.value;
  };
  return (
    <section className="dp-section dp-shell">
      <div className="dp-eyebrow">{t("dashEyebrow", lang)}</div>
      <h2 className="dp-h2">{t("dashTitle", lang)}</h2>
      <p className="dp-sub">{t("dashSub", lang).replace("1,284", bumpCount("1,284", extraResponses))}</p>

      <div className="dp-stat-grid" style={{ marginTop: 24 }}>
        {STATS.map(s => <StatCard key={s.key} labelKey={s.key} value={statValue(s)} lang={lang} />)}
      </div>

      {Object.keys(votes).length > 0 && (
        <div className="dp-contrib" dir="auto">
          <div className="dp-contrib-title">{t("contribTitle", lang)}</div>
          <div className="dp-contrib-intro">{t("contribIntro", lang)}</div>
          <div className="dp-contrib-tags">
            {OPPORTUNITIES.filter(o => votesFor(votes, o.id) > 0).map(o => (
              <span className="dp-contrib-tag" key={o.id}>
                {L(o, lang).name}<span className="dp-contrib-count">+{votesFor(votes, o.id)}</span>
              </span>
            ))}
          </div>
        </div>
      )}

      <div className="dp-grid-2" style={{ marginTop: 26 }}>
        <div className="dp-card">
          <div className="dp-plan-label">{t("topRequested", lang)}</div>
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={topServices} margin={{ left: -20 }}>
              <CartesianGrid vertical={false} stroke={T.line} />
              <XAxis dataKey="name" tick={{ fontSize: 11 }} interval={0} angle={-15} textAnchor="end" height={50} />
              <YAxis tick={{ fontSize: 11 }} />
              <Tooltip />
              <Bar dataKey="score" fill={T.dune} radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="dp-card">
          <div className="dp-plan-label">{t("catBreakdown", lang)}</div>
          <ResponsiveContainer width="100%" height={220}>
            <PieChart>
              <Pie data={pie} dataKey="value" nameKey="label" innerRadius={50} outerRadius={80} paddingAngle={2}>
                {pie.map((c, i) => <Cell key={i} fill={c.color} />)}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginTop: 4 }}>
            {pie.map(c => (
              <span key={c.label} style={{ fontSize: 11, display: "flex", alignItems: "center", gap: 5 }}>
                <span style={{ width: 8, height: 8, borderRadius: 4, background: c.color, display: "inline-block" }} />{c.label}
              </span>
            ))}
          </div>
        </div>

        <div className="dp-card" style={{ gridColumn: "1 / -1" }}>
          <div className="dp-plan-label">{t("trending", lang)}</div>
          <ResponsiveContainer width="100%" height={220}>
            <LineChart data={trendData}>
              <CartesianGrid vertical={false} stroke={T.line} />
              <XAxis dataKey="month" tick={{ fontSize: 11 }} />
              <YAxis tick={{ fontSize: 11 }} />
              <Tooltip />
              <Line type="monotone" dataKey="a" stroke={T.dune} strokeWidth={2} dot={false} />
              <Line type="monotone" dataKey="f" stroke={T.oasis} strokeWidth={2} dot={false} />
              <Line type="monotone" dataKey="s" stroke={T.dusk} strokeWidth={2} dot={false} />
            </LineChart>
          </ResponsiveContainer>
          <div className="dp-legend-row">
            <span className="dp-legend-item"><span style={{ width: 12, height: 3, background: T.dune }} />{t("trAgriculture", lang)}</span>
            <span className="dp-legend-item"><span style={{ width: 12, height: 3, background: T.oasis }} />{t("trFoodBev", lang)}</span>
            <span className="dp-legend-item"><span style={{ width: 12, height: 3, background: T.dusk }} />{t("trServices", lang)}</span>
          </div>
        </div>

        <div className="dp-card" style={{ gridColumn: "1 / -1" }}>
          <div className="dp-plan-label">{t("rankings", lang)}</div>
          <div style={{ display: "flex", flexDirection: "column", gap: 10, marginTop: 8 }}>
            {ranked.map((o, i) => {
              const sc = liveScore(o, votes);
              const mine = votesFor(votes, o.id) > 0;
              return (
                <div key={o.id} style={{ display: "flex", alignItems: "center", gap: 12 }}>
                  <span className="dp-mono" style={{ width: 22, color: "rgba(43,33,24,0.45)", fontSize: 12 }}>{i + 1}</span>
                  <span style={{ flex: 1, fontSize: 13.5, fontWeight: 500 }}>
                    {L(o, lang).name}
                    {mine && <span className="dp-you-tag">{t("youTag", lang)}</span>}
                  </span>
                  <div style={{ flex: 1, maxWidth: 140, height: 6, background: T.line, borderRadius: 4, overflow: "hidden" }}>
                    <div style={{ width: `${sc}%`, height: "100%", background: `linear-gradient(90deg, ${T.dune}, ${T.gold})` }} />
                  </div>
                  <span className="dp-mono" style={{ fontSize: 12, width: 34, textAlign: "end" }}>{sc}%</span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------------------------------------------------------------------- */
/* MARKETPLACE                                                             */
/* ---------------------------------------------------------------------- */
function OppCard({ o, saved, toggleSave, openPanel, openPlan, ctx }) {
  const { lang, speak, narratingKey, votes } = ctx;
  const lo = L(o, lang);
  const Icon = o.icon;
  const isSaved = saved.includes(o.id);
  const narrKey = `opp-${o.id}`;
  const myVotes = votesFor(votes, o.id);
  return (
    <div className="dp-card">
      <div className="dp-opp-head">
        <div style={{ display: "flex", gap: 12 }}>
          <div className="dp-opp-icon"><Icon size={20} /></div>
          <div>
            <div className="dp-opp-name">{lo.name}</div>
            <div className="dp-opp-cat">{lo.category}</div>
          </div>
        </div>
        <ScoreRing score={liveScore(o, votes)} size={48} />
      </div>
      {myVotes > 0 && <div className="dp-you-badge">{t("youSupported", lang)}{myVotes > 1 ? ` ×${myVotes}` : ""}</div>}
      {o.isCommunity && <div className="dp-new-badge">{t("oppNewBadge", lang)}</div>}
      <p style={{ fontSize: "0.86rem", color: "rgba(43,33,24,0.7)", marginTop: 14, lineHeight: 1.5 }}>{lo.problem}</p>
      <ConfidenceBadge level={lo.confidence} lang={lang} />
      <div className="dp-opp-meta">
        <span>{t("startupCost", lang)}: <b>{lo.startupCost}</b></span>
        <span>{t("monthlyCustomers", lang)}: <b>{lo.monthlyCustomers}</b></span>
      </div>
      <div className="dp-opp-actions">
        <button className="dp-btn dp-btn-primary dp-btn-sm" onClick={() => openPlan(o)}>{t("generatePlan", lang)}</button>
        <button className="dp-btn dp-btn-ghost dp-btn-sm" onClick={() => openPanel(o)}>{t("whyThis", lang)}</button>
        <div style={{ marginInlineStart: "auto", display: "flex", gap: 4 }}>
          <ListenButton active={narratingKey === narrKey} lang={lang}
            onClick={() => speak(narrKey, `${lo.name}. ${lo.problem}`)} />
          <button className="dp-icon-btn" onClick={() => toggleSave(o.id)} aria-label={isSaved ? t("saved", lang) : t("save", lang)}>
            <Heart size={18} fill={isSaved ? T.dune : "none"} color={isSaved ? T.dune : T.ink} />
          </button>
        </div>
      </div>
    </div>
  );
}

function MarketplacePage({ saved, toggleSave, openPanel, openPlan, ctx, communityOpps = [] }) {
  const { lang } = ctx;
  const [cat, setCat] = useState("All");
  const all = [...OPPORTUNITIES, ...communityOpps];
  const cats = ["All", ...Array.from(new Set(all.map(o => L(o, lang).category)))];
  const base = cat === "All" ? all : all.filter(o => L(o, lang).category === cat);
  const list = [...base].sort((a, b) => liveScore(b, ctx.votes) - liveScore(a, ctx.votes) || b.supportingResponses - a.supportingResponses);
  return (
    <section className="dp-section dp-shell">
      <div className="dp-eyebrow">{t("mktEyebrow", lang)}</div>
      <h2 className="dp-h2">{t("mktTitle", lang)}</h2>
      <p className="dp-sub">{t("mktSub", lang)}</p>
      <div className="dp-tab-row">
        {cats.map(c => (
          <div key={c} className={`dp-tab ${cat === c ? "active" : ""}`} onClick={() => setCat(c)}>{c === "All" ? t("all", lang) : c}</div>
        ))}
      </div>
      <div className="dp-grid-3">
        {list.map(o => (
          <OppCard key={o.id} o={o} saved={saved} toggleSave={toggleSave} openPanel={openPanel} openPlan={openPlan} ctx={ctx} />
        ))}
      </div>
    </section>
  );
}

/* ---------------------------------------------------------------------- */
/* GENERATOR / BUSINESS PLAN                                              */
/* ---------------------------------------------------------------------- */
function generatePlan(o, lang, profile) {
  const lo = L(o, lang);
  const plan = lang === "ar" ? {
      names: [`${lo.name} القوع`, `نبض ${lo.category.split(" ")[0]}`, lo.name],
      summary: `يعالج ${lo.name} فجوة محلية مؤكدة: ${lo.problem} وبدعم ${o.supportingResponses} استجابة و${o.communitySupport}٪ من تأييد المجتمع، تُعد هذه من أعلى الفرص ثقةً في القوع.`,
      persona: `العميل الأساسي: ${lo.targetAudience} وهم حسّاسون للسعر لكنهم مخلصون بمجرد بناء الثقة، ولا تخدمهم حاليًا أي جهة أقرب من العين.`,
      pricing: `ابدأ بسعر دخول ميسور مدعوم بإشارات استعداد المجتمع للدفع، ثم أدخِل فئة مميّزة (اشتراك أو باقة أو خدمة ذات أولوية) بمجرد إثبات الطلب المتكرر خلال أول 60 يومًا.`,
      marketing: [
        "التعاون مع المسجد المحلي أو المدرسة أو المركز المجتمعي للإعلان عن الإطلاق",
        "الاستعانة بسفراء الكلمة المنطوقة — السكان الذين أجابوا عن سؤال الاستبيان الأصلي",
        "تشغيل قناة واتساب/تواصل اجتماعي منخفضة التكلفة للحجز والتحديثات",
      ],
      financials: { startupCost: lo.startupCost, monthlyCustomers: lo.monthlyCustomers, opportunitySize: lo.opportunitySize },
      roadmap: [
        "الأيام 1–5: تأمين الموقع/المعدات وتسجيل النشاط",
        "الأيام 6–12: إطلاق تجريبي لأفراد المجتمع الذين طلبوا هذه الخدمة",
        "الأيام 13–20: جمع الملاحظات وضبط التسعير وساعات العمل",
        "الأيام 21–30: إطلاق عام مع حملة تسويق محلية وأول العروض",
      ],
      risks: [
        "تقلّب الطلب الموسمي — خطّط للتدفق النقدي حول أشهر الذروة",
        "محدودية الوصول الأولي لسلسلة التوريد خارج القوع",
        "الحاجة لبناء الثقة بسرعة في مجتمع متماسك",
      ],
      expansion: `بمجرد التحقق في القوع، يمكن توسيع هذا النموذج إلى مجتمعات ريفية مماثلة بإشارات طلب مقارِبة — تُظهر بيانات نبض الصحراء أن فئة ${lo.category} تتصدّر باستمرار في المناطق المحرومة.`,
    } : {
    names: [`${lo.name.split(" ")[0]} Al Qua'a`, `Pulse ${lo.category.split(" ")[0]}`, `${lo.name} Co.`],
    summary: `${lo.name} addresses a validated local gap: ${lo.problem.toLowerCase()} With ${o.supportingResponses} survey responses and ${o.communitySupport}% community support, this is one of the highest-confidence opportunities identified in Al Qua'a.`,
    persona: `Primary customer: ${lo.targetAudience} They are price-sensitive but loyal once trust is established, and currently underserved by anything closer than Al Ain.`,
    pricing: `Start with an accessible entry price point validated by community willingness-to-pay signals, then introduce a premium tier (subscription, bundle, or priority service) once repeat demand is proven over the first 60 days.`,
    marketing: [
      "Partner with the local mosque, school, or community center for the launch announcement",
      "Use word-of-mouth ambassadors — residents who answered the original survey question",
      "Run a low-cost WhatsApp/social channel for booking and updates",
    ],
    financials: { startupCost: lo.startupCost, monthlyCustomers: lo.monthlyCustomers, opportunitySize: lo.opportunitySize },
    roadmap: [
      "Days 1–5: Secure location/equipment and register the business",
      "Days 6–12: Soft-launch to the community members who requested this service",
      "Days 13–20: Collect feedback, refine pricing and hours",
      "Days 21–30: Public launch with local marketing push and first promotions",
    ],
    risks: [
      "Seasonal demand fluctuation — plan cash flow around peak months",
      "Limited initial supply chain access outside Al Qua'a",
      "Need to build trust quickly in a tight-knit community",
    ],
    expansion: `Once validated in Al Qua'a, this model can expand to similar rural communities with comparable demand signals — Desert Pulse data shows ${lo.category} consistently ranks in the top categories across underserved areas.`,
  };

  // Personalize from the optional intake profile (no AI — deterministic rules).
  if (profile && (profile.budget || profile.time || profile.experience)) {
    const parts = [];
    if (profile.budget) {
      const startMin = parseInt(((String(lo.startupCost).match(/[\d,]+/) || ["0"])[0]).replace(/,/g, ""), 10);
      const budgetMax = { u5: 5000, b5_20: 20000, b20_50: 50000, b50p: Infinity }[profile.budget] || Infinity;
      const tight = budgetMax < startMin;
      parts.push(t(tight ? "fitBudgetTight" : "fitBudgetOk", lang));
      if (tight) plan.risks = [t("riskBudget", lang), ...plan.risks];
    }
    if (profile.time) parts.push(t({ evenings: "fitTimeEvenings", part: "fitTimePart", full: "fitTimeFull" }[profile.time], lang));
    if (profile.experience) parts.push(t({ new: "fitExpNew", some: "fitExpSome", exp: "fitExpExperienced" }[profile.experience], lang));
    plan.fit = parts.join(" ");
  }
  return plan;
}

function GeneratorPage({ opp, go, saved, toggleSave, ctx }) {
  const { lang, speak, narratingKey, votes, onHelpful } = ctx;
  const [plan, setPlan] = useState(null);
  const [profile, setProfile] = useState({ budget: null, time: null, experience: null });
  const [feedback, setFeedback] = useState(null); // null | 'yes' | 'no'
  // reset plan when opp or language changes
  useEffect(() => { setPlan(null); setProfile({ budget: null, time: null, experience: null }); setFeedback(null); }, [opp, lang]);
  const setField = (k, v) => setProfile(p => ({ ...p, [k]: p[k] === v ? null : v }));
  const markHelpful = (val) => {
    if (feedback) return;            // count once per generated plan
    setFeedback(val);
    if (val === "yes" && onHelpful) onHelpful();
  };

  if (!opp) {
    return (
      <section className="dp-section dp-shell dp-empty">
        <p>{t("genEmpty", lang)}</p>
        <button className="dp-btn dp-btn-primary" onClick={() => go("marketplace")} style={{ marginTop: 12 }}>
          {t("browseOpps", lang)}
        </button>
      </section>
    );
  }
  const lo = L(opp, lang);
  const Icon = opp.icon;
  const isSaved = saved.includes(opp.id);
  const narrKey = `gen-${opp.id}`;
  return (
    <section className="dp-section dp-shell">
      <div className="dp-eyebrow">{t("genEyebrow", lang)}</div>
      <div className="dp-card" style={{ marginTop: 10 }}>
        <div className="dp-opp-head">
          <div style={{ display: "flex", gap: 12 }}>
            <div className="dp-opp-icon"><Icon size={22} /></div>
            <div>
              <div className="dp-opp-name" style={{ fontSize: "1.3rem" }}>{lo.name}</div>
              <div className="dp-opp-cat">{lo.category}</div>
            </div>
          </div>
          <ScoreRing score={opp.demandScore} size={56} />
        </div>

        <div className="dp-opp-meta" style={{ marginTop: 18 }}>
          <span>{t("startupCost", lang)}: <b>{lo.startupCost}</b></span>
          <span>{t("expectedCustomers", lang)}: <b>{lo.monthlyCustomers}</b></span>
          <span>{t("opportunitySize", lang)}: <b>{lo.opportunitySize}</b></span>
        </div>
        <p style={{ marginTop: 14, fontSize: "0.92rem", lineHeight: 1.6 }}><strong>{t("problem", lang)}:</strong> {lo.problem}</p>
        <p style={{ marginTop: 8, fontSize: "0.92rem", lineHeight: 1.6 }}><strong>{t("evidence", lang)}:</strong> {lo.evidence}</p>
        <p style={{ marginTop: 8, fontSize: "0.92rem", lineHeight: 1.6 }}>
          <strong>{t("aiRec", lang)}:</strong> {t("aiRecBody", lang)} {lo.confidence.toLowerCase ? lo.confidence.toLowerCase() : lo.confidence} {t("aiRecBody2", lang)} {liveResponses(opp, votes)} {t("aiRecBody3", lang)}
        </p>

        {!plan && (
          <div className="dp-intake">
            <div className="dp-intake-title">{t("tailorTitle", lang)}</div>
            <div className="dp-intake-row">
              <span className="dp-intake-label">{t("tailorBudget", lang)}</span>
              <div className="dp-intake-chips">
                {[["u5", "AED <5k"], ["b5_20", "AED 5–20k"], ["b20_50", "AED 20–50k"], ["b50p", "AED 50k+"]].map(([v, lbl]) => (
                  <button key={v} type="button" className={`dp-intake-chip ${profile.budget === v ? "active" : ""}`} onClick={() => setField("budget", v)}>{lbl}</button>
                ))}
              </div>
            </div>
            <div className="dp-intake-row">
              <span className="dp-intake-label">{t("tailorTime", lang)}</span>
              <div className="dp-intake-chips">
                {[["evenings", t("timeEvenings", lang)], ["part", t("timePart", lang)], ["full", t("timeFull", lang)]].map(([v, lbl]) => (
                  <button key={v} type="button" className={`dp-intake-chip ${profile.time === v ? "active" : ""}`} onClick={() => setField("time", v)}>{lbl}</button>
                ))}
              </div>
            </div>
            <div className="dp-intake-row">
              <span className="dp-intake-label">{t("tailorExperience", lang)}</span>
              <div className="dp-intake-chips">
                {[["new", t("expNew", lang)], ["some", t("expSome", lang)], ["exp", t("expExperienced", lang)]].map(([v, lbl]) => (
                  <button key={v} type="button" className={`dp-intake-chip ${profile.experience === v ? "active" : ""}`} onClick={() => setField("experience", v)}>{lbl}</button>
                ))}
              </div>
            </div>
            <div className="dp-intake-hint">{t("tailorHint", lang)}</div>
          </div>
        )}

        <div className="dp-opp-actions">
          {!plan && <button className="dp-btn dp-btn-primary" onClick={() => setPlan(generatePlan(opp, lang, profile))}>{t("generatePlan", lang)}</button>}
          <button className="dp-btn dp-btn-ghost" onClick={() => toggleSave(opp.id)}>
            <Heart size={16} fill={isSaved ? T.dune : "none"} color={isSaved ? T.dune : T.ink} /> {isSaved ? t("saved", lang) : t("save", lang)}
          </button>
          <ListenButton active={narratingKey === narrKey} lang={lang}
            onClick={() => speak(narrKey, `${lo.name}. ${lo.problem} ${lo.evidence}`)} />
        </div>
      </div>

      {plan && (
        <div className="dp-card" style={{ marginTop: 20 }}>
          <div className="dp-eyebrow">{t("startupReport", lang)}</div>
          <h2 className="dp-h2">{plan.names[0]}</h2>
          <div className="dp-pill-row" style={{ marginBottom: 18 }}>
            {plan.names.map(n => <span className="dp-pill" key={n}>{n}</span>)}
          </div>

          {plan.fit && (
            <div className="dp-plan-section">
              <div className="dp-plan-label">{t("secFit", lang)}</div>
              <div className="dp-fit-box" dir="auto">{plan.fit}</div>
            </div>
          )}
          <PlanSection label={t("secSummary", lang)} body={plan.summary} />
          <PlanSection label={t("secPersona", lang)} body={plan.persona} />
          <PlanSection label={t("secPricing", lang)} body={plan.pricing} />
          <div className="dp-plan-section">
            <div className="dp-plan-label">{t("secMarketing", lang)}</div>
            <ul style={{ margin: 0, paddingInlineStart: 18, fontSize: "0.92rem", lineHeight: 1.6, color: "rgba(43,33,24,0.85)" }}>
              {plan.marketing.map((m, i) => <li key={i}>{m}</li>)}
            </ul>
          </div>
          <div className="dp-plan-section">
            <div className="dp-plan-label">{t("secFinancial", lang)}</div>
            <div className="dp-opp-meta">
              <span>{t("startupCost", lang)}: <b>{plan.financials.startupCost}</b></span>
              <span>{t("estCustomers", lang)}: <b>{plan.financials.monthlyCustomers}</b></span>
              <span>{t("size", lang)}: <b>{plan.financials.opportunitySize}</b></span>
            </div>
          </div>
          <div className="dp-plan-section">
            <div className="dp-plan-label">{t("secRoadmap", lang)}</div>
            <ul style={{ margin: 0, paddingInlineStart: 18, fontSize: "0.92rem", lineHeight: 1.6, color: "rgba(43,33,24,0.85)" }}>
              {plan.roadmap.map((m, i) => <li key={i}>{m}</li>)}
            </ul>
          </div>
          <div className="dp-plan-section">
            <div className="dp-plan-label">{t("secRisks", lang)}</div>
            <ul style={{ margin: 0, paddingInlineStart: 18, fontSize: "0.92rem", lineHeight: 1.6, color: "rgba(43,33,24,0.85)" }}>
              {plan.risks.map((m, i) => <li key={i}>{m}</li>)}
            </ul>
          </div>
          <PlanSection label={t("secExpansion", lang)} body={plan.expansion} last />

          <div className="dp-helpful" dir="auto">
            {!feedback ? (
              <>
                <span className="dp-helpful-q">{t("planHelpfulQ", lang)}</span>
                <div className="dp-helpful-btns">
                  <button className="dp-helpful-btn" onClick={() => markHelpful("yes")}>
                    <ThumbsUp size={15} /> {t("planHelpfulYes", lang)}
                  </button>
                  <button className="dp-helpful-btn" onClick={() => markHelpful("no")}>
                    <ThumbsDown size={15} /> {t("planHelpfulNo", lang)}
                  </button>
                </div>
              </>
            ) : (
              <span className="dp-helpful-thanks">
                <CheckCircle2 size={16} style={{ color: T.oasis }} />
                {t(feedback === "yes" ? "planThanksYes" : "planThanksNo", lang)}
              </span>
            )}
          </div>
        </div>
      )}
    </section>
  );
}

function PlanSection({ label, body, last }) {
  return (
    <div className="dp-plan-section" style={last ? { marginBottom: 0 } : {}}>
      <div className="dp-plan-label">{label}</div>
      <div className="dp-plan-body">{body}</div>
    </div>
  );
}

/* ---------------------------------------------------------------------- */
/* SAVED                                                                   */
/* ---------------------------------------------------------------------- */
function SavedPage({ saved, toggleSave, openPlan, go, ctx, responses }) {
  const { lang } = ctx;
  const list = OPPORTUNITIES.filter(o => saved.includes(o.id));
  const hasResponses = responses && responses.length > 0;
  return (
    <section className="dp-section dp-shell">
      <div className="dp-eyebrow">{t("savedEyebrow", lang)}</div>
      <h2 className="dp-h2">{t("savedTitle", lang)}</h2>
      {list.length === 0 ? (
        <div className="dp-empty">
          <p>{t("savedEmpty", lang)}</p>
          <button className="dp-btn dp-btn-primary" onClick={() => go("marketplace")} style={{ marginTop: 12 }}>
            {t("browseMarket", lang)}
          </button>
        </div>
      ) : (
        <div className="dp-grid-3" style={{ marginTop: 22 }}>
          {list.map(o => (
            <OppCard key={o.id} o={o} saved={saved} toggleSave={toggleSave} openPanel={() => {}} openPlan={openPlan} ctx={ctx} />
          ))}
        </div>
      )}

      <div className="dp-saved-divider" />
      <div className="dp-eyebrow">{t("savedHistoryEyebrow", lang)}</div>
      {hasResponses ? (
        <ResponseHistory responses={responses} lang={lang} />
      ) : (
        <p className="dp-sub" style={{ marginTop: 8 }}>{t("savedHistoryEmpty", lang)}</p>
      )}
    </section>
  );
}

/* ---------------------------------------------------------------------- */
/* VALIDATION                                                              */
/* ---------------------------------------------------------------------- */
function ValidationPage({ openPanel, areaFilter, setAreaFilter, categories, visibleAreas, activeArea, setActiveArea, lang, extraResponses = 0, votes = {} }) {
  const quotes = OPPORTUNITIES.map(o => {
    const lo = L(o, lang);
    return { text: lo.comments[0], tag: lo.name };
  });
  const valValue = (s) => ((s.key === "totalResponses" || s.key === "newThisWeek") ? bumpCount(s.value, extraResponses) : s.value);
  return (
    <section className="dp-section dp-shell">
      <div className="dp-eyebrow">{t("valEyebrow", lang)}</div>
      <h2 className="dp-h2">{t("valTitle", lang)}</h2>
      <p className="dp-sub">{t("valSub", lang)}</p>

      <div className="dp-stat-grid" style={{ gridTemplateColumns: "repeat(2,1fr)", marginTop: 24 }}>
        {VALIDATION_STATS.map(s => <StatCard key={s.key} labelKey={s.key} value={valValue(s)} lang={lang} />)}
      </div>

      <div style={{ marginTop: 44 }}>
        <div className="dp-plan-label">{t("communityQuotes", lang)}</div>
        <div className="dp-grid-3" style={{ marginTop: 12 }}>
          {quotes.map((q, i) => (
            <div className="dp-quote-card" key={i}>
              <MessageSquareQuote size={16} style={{ color: T.oasis, marginBottom: 8 }} />
              <div className="dp-quote-text">“{q.text}”</div>
              <div className="dp-quote-tag">{lang === "ar" ? "←" : "→"} {q.tag}</div>
            </div>
          ))}
        </div>
      </div>

      <div style={{ marginTop: 44 }}>
        <div className="dp-plan-label">{t("aiConfidence", lang)}</div>
        <div className="dp-grid-2" style={{ marginTop: 12 }}>
          {rankedOpportunities(votes).slice(0, 4).map(o => {
            const lo = L(o, lang);
            return (
              <div className="dp-card" key={o.id}>
                <div className="dp-opp-head">
                  <div className="dp-opp-name" style={{ fontSize: "1rem" }}>{lo.name}</div>
                  <ScoreRing score={liveScore(o, votes)} size={42} />
                </div>
                <div style={{ display: "flex", gap: 10, marginTop: 10, flexWrap: "wrap" }}>
                  <ConfidenceBadge level={lo.confidence} lang={lang} />
                  <span className="dp-badge" style={{ color: T.duneDark, borderColor: T.duneDark }}>
                    <Users size={12} style={{ marginInlineEnd: 4 }} /> {liveResponses(o, votes)} {t("responses", lang)}
                  </span>
                </div>
                <button className="dp-btn dp-btn-ghost dp-btn-sm" style={{ marginTop: 14 }} onClick={() => openPanel(o)}>
                  {t("whyRecommended", lang)} <ChevronRight size={14} style={{ transform: lang === "ar" ? "scaleX(-1)" : "none" }} />
                </button>
              </div>
            );
          })}
        </div>
      </div>

      <div style={{ marginTop: 44 }}>
        <div className="dp-plan-label">{t("demandMap", lang)}</div>
        <div className="dp-tab-row">
          {categories.map(c => (
            <div key={c} className={`dp-tab ${areaFilter === c ? "active" : ""}`} onClick={() => setAreaFilter(c)}>{c === "All" ? t("all", lang) : c}</div>
          ))}
        </div>
        <div className="dp-map-wrap">
          {visibleAreas.map(a => {
            const size = 22 + a.participation / 12;
            return (
              <div
                key={a.id}
                className="dp-map-dot"
                style={{
                  left: `${a.x}%`, top: `${a.y}%`, width: size, height: size,
                  background: `radial-gradient(circle, ${T.dune}, ${T.duneDark})`,
                  boxShadow: activeArea?.id === a.id ? `0 0 0 4px rgba(31,122,108,0.4)` : "none",
                }}
                onClick={() => setActiveArea(a)}
                title={a.name}
              />
            );
          })}
          {activeArea ? (
            <div className="dp-map-tip">
              <strong>{activeArea.name}</strong> — {activeArea.participation} {t("mapResponses", lang)}<br />
              {t("topRequest", lang)}: <b>{activeArea.topService}</b> ({activeArea.category})
            </div>
          ) : (
            <div className="dp-map-tip">
              <MapPin size={14} style={{ display: "inline", marginInlineEnd: 4 }} />
              {t("mapPrompt", lang)}
            </div>
          )}
        </div>
      </div>

      <div className="dp-card dp-transparency" style={{ marginTop: 44, maxWidth: 640 }}>
        <div className="dp-plan-label">{t("transparency", lang)}</div>
        {["tr1", "tr2", "tr3", "tr4"].map(k => (
          <div className="dp-tr-item" key={k}><Lock size={15} style={{ color: T.oasis, marginTop: 2, flexShrink: 0 }} /> {t(k, lang)}</div>
        ))}
      </div>
    </section>
  );
}

/* ---------------------------------------------------------------------- */
/* ABOUT                                                                   */
/* ---------------------------------------------------------------------- */
function AboutPage({ go, lang }) {
  return (
    <section className="dp-section dp-shell">
      <div className="dp-eyebrow">{t("aboutEyebrow", lang)}</div>
      <h2 className="dp-h2">{t("aboutTitle", lang)}</h2>
      <p className="dp-sub" style={{ maxWidth: 680 }}>{t("aboutBody", lang)}</p>

      <div className="dp-grid-3" style={{ marginTop: 28 }}>
        <FeatureCard icon={Search} title={t("aEvidenceT", lang)} text={t("aEvidenceB", lang)} />
        <FeatureCard icon={Filter} title={t("aRuralT", lang)} text={t("aRuralB", lang)} />
        <FeatureCard icon={TrendingUp} title={t("aPilotT", lang)} text={t("aPilotB", lang)} />
      </div>

      <div style={{ display: "flex", gap: 12, marginTop: 32, flexWrap: "wrap" }}>
        <button className="dp-btn dp-btn-primary" onClick={() => go("marketplace")}>{t("exploreOpps", lang)}</button>
        <button className="dp-btn dp-btn-ghost" onClick={() => go("validation")}>{t("seeEvidence", lang)}</button>
      </div>
    </section>
  );
}
