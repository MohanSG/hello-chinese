/* Translation strings.
   Shape: key: { en: "…", zh: "…" }
     • arrays are allowed for bullet lists — read them with tList()
     • {placeholders} are filled by t(path, { placeholder: value })
     • dates and money do NOT belong here — use tDate() / tMoney()
   Sections below are grouped by area. Enroll copy is the active work;
   the marketing block is already live and should not regress. */

export const translations = {
  nav: {
    /* Nav links are off — the navbar is brand + language toggle only.
       Keys kept for when links come back.
    home: { en: "Home", zh: "首页" },
    about: { en: "About Us", zh: "关于我们" },
    classes: { en: "Programs", zh: "课程" },
    culture: { en: "Cultural Experiences", zh: "文化体验" },
    journey: { en: "Hello Journey", zh: "Hello Journey" },
    calendar: { en: "Calendar", zh: "日历" },
    bookCta: { en: "Book a Free Trial", zh: "预约免费试听" },
    */
    brandSub: { en: "Weekend Language Learning & Enrichment Program", zh: "周末语言学习与素养课程" },
  },
  /* Marketing pages — already translated and in use by Home.jsx + Hero.jsx.
     Not the current focus; leave working. */
  home: {
    badge: { en: "Bilingual classes for ages 3–12", zh: "面向3-12岁儿童的双语课程" },
    heroTitle1: { en: "Begin with Ni Hao.", zh: "从你好开始。" },
    heroTitleAccent: { en: "Grow with confidence.", zh: "自信成长。" },
    heroTitle2: { en: "Connect with the world.", zh: "连接世界。" },
    heroDesc: {
      en: "A bilingual education ecosystem for children ages 3–12 — combining structured Mandarin learning, cultural connection, and personalized support.",
      zh: "面向3-12岁儿童的双语教育生态系统——融合系统化中文学习、文化连接与个性化支持。",
    },
    ctaFindClass: { en: "Find Your Child\u2019s Class", zh: "查找适合的课程" },
    ctaTrial: { en: "Book a Free Trial", zh: "预约免费试听 →" },
    ctaClasses: { en: "See our classes", zh: "查看我们的课程" },
    glanceWho: { en: "Who it's for", zh: "适合对象" },
    glanceWhoVal: { en: "Ages 3–12", zh: "3-12岁" },
    glanceWhat: { en: "What's taught", zh: "教学内容" },
    glanceWhatVal: { en: "Chinese, Math & Tutoring", zh: "中文、数学与辅导" },
    glanceSchedule: { en: "Schedule", zh: "时间安排" },
    glanceScheduleVal: { en: "Sundays, 9am–12pm", zh: "周日 9:00-12:00" },
    glancePricing: { en: "Pricing", zh: "价格" },
    glancePricingVal: { en: "From $360 / 10-session term", zh: "每期10节课，起价$360" },
    statMaxStudents: { en: "max students per group", zh: "每组最多学生数" },
    statTeachers: { en: "teachers per group", zh: "每组教师数" },
    statExperience: { en: "teacher immersion experience", zh: "教师沉浸式教学经验" },
    statSchedule: { en: "year-round enrollment", zh: "全年招生" },
    aboutEyebrow: { en: "Who we are", zh: "我们是谁" },
    aboutTitle: { en: "A neighborhood language school — with a global classroom.", zh: "一所社区语言学校——拥有全球课堂。" },
    aboutP1: {
      en: "HelloChinese began in 2023 with eight children, one picnic blanket, and one Chinese picture book at a neighborhood park. What started as a simple weekend gathering grew into a curriculum, a teaching team, cultural experiences, and a community of families who keep coming back.",
      zh: "HelloChinese始于2023年，在社区公园里，八个孩子、一块野餐垫和一本中文绘本。从简单的周末聚会开始，逐渐发展成课程体系、教学团队、文化体验，以及一群不断回来的家庭社区。",
    },
    aboutP2: {
      en: "Today our certified teachers guide students from their very first 你好 to confident, everyday fluency — online and in-person, in classes small enough to know every child by name.",
      zh: "如今，我们的认证教师引导学生从第一声你好开始，逐步走向自信、日常的流利表达——无论线上还是线下，班级规模小到能叫出每个孩子的名字。",
    },
    teacherStandard: {
      en: "Hello Chinese program teachers are qualified professionals with 3-5+ years of Chinese immersion experience. They understand child language development and value interaction, cultural connection, and individual learning needs.",
      zh: "Hello Chinese项目教师均为专业人士，具有3-5年以上中文沉浸式教学经验，了解儿童语言发展规律，重视互动、文化连接与个性化学习需求。",
    },
    factCertified: { en: "Certified native teachers", zh: "认证母语教师" },
    factAges: { en: "Ages 3 to 12", zh: "3至12岁" },
    factOnline: { en: "Online & in-person", zh: "线上与线下" },
  },
/* ---- Enroll flow ---------------------------------------------------- */

  enrollCommon: {
    backToPrograms: { en: "← Back to Programs", zh: "← 返回课程总览" },
    nowEnrolling: { en: "Now Enrolling", zh: "正在招生" },
    comingSoon: { en: "Coming Soon", zh: "即将开课" },
    flexibleSchedule: { en: "Flexible Schedule", zh: "时间灵活" },
    viewPlans: { en: "View Plans →", zh: "查看方案 →" },
    nextStepLabel: { en: "Next step:", zh: "下一步：" },
  },

  enrollOverview: {
    eyebrow: { en: "Fall Enrollment", zh: "秋季招生" },
    titleLine1: { en: "Find the Right", zh: "为您的孩子" },
    titleAccent: { en: "Program", zh: "选择合适的课程" },
    titleLine2: { en: "for Your Child", zh: "" },
    desc: {
      en: "Explore our Sunday Chinese programs, free trial options, and flexible learning opportunities for Fall 2026.",
      zh: "了解我们的周日中文课程、免费试听，以及2026年秋季的灵活学习选择。",
    },
    ctaSunday: { en: "View Sunday Programs", zh: "查看周日课程" },
    ctaTrial: { en: "Book a Free Trial", zh: "预约免费试听" },
    trialTitle: { en: "New to Hello Chinese?", zh: "初次了解 Hello Chinese？" },
    trialDesc: {
      en: "Join us for a free trial class and discover how your child can learn, connect, and grow with Hello Chinese.",
      zh: "欢迎参加免费试听课，看看孩子如何在 Hello Chinese 学习、交流并成长。",
    },
    trialCta: { en: "Book a Free Trial Class", zh: "预约免费试听课" },
    divider: {
      en: "Already learning with us? Explore our fall programs below.",
      zh: "已在我们这里学习？请查看下方的秋季课程。",
    },
    sundayTitle: { en: "Sunday Programs", zh: "周日课程" },
    sundayBullets: {
      en: ["Chinese Learning Pathway", "Chinese Learning Support", "Math Enrichment"],
      zh: ["中文学习进阶路径", "中文学习辅导", "数学思维拓展"],
    },
    sundayCta: { en: "View Sunday Programs", zh: "查看周日课程" },
    saturdayTitle: { en: "Saturday Programs", zh: "周六课程" },
    saturdayBullets: {
      en: ["English Language Learning", "English Teacher-Led Math Enrichment"],
      zh: ["英语学习", "英语外教数学思维拓展"],
    },
    saturdayCta: { en: "Join the Interest List", zh: "加入意向名单" },
    privateTitle: { en: "Private Lessons", zh: "一对一私教课" },
    privateBullets: {
      en: ["One-on-One Chinese", "Monday–Sunday", "Online or In Person"],
      zh: ["一对一中文教学", "周一至周日", "线上或线下"],
    },
    privateCta: { en: "Learn More", zh: "了解更多" },
  },

  enrollSunday: {
    title: { en: "Sunday Programs", zh: "周日课程" },
    desc: {
      en: "We offer Chinese language learning, personalized learning support before and after our three leveled Chinese classes, as well as math enrichment on Sunday mornings from 9:00 AM to 12:00 PM.",
      zh: "我们提供中文语言学习，在三个级别的中文课程前后设有个性化学习辅导，并在周日上午 9:00 至 12:00 提供数学思维拓展课程。",
    },
    pathwayEyebrow: { en: "课程", zh: "课程" },
    pathwayTitle: { en: "Chinese Learning Pathway (3 Levels)", zh: "中文学习进阶路径（三个级别）" },

    stepInBadge: { en: "入门", zh: "入门" },
    stepInTitle: { en: "Step-In (Level 1)", zh: "入门（一级）" },
    stepInAge: { en: "Ages 3–6", zh: "3–6岁" },
    stepInTime: { en: "9:00 – 10:00 AM", zh: "上午 9:00 – 10:00" },
    stepInDesc: {
      en: "Build a strong foundation in Chinese through stories, songs, games, and vocabulary.",
      zh: "通过故事、儿歌、游戏和词汇积累，打下扎实的中文基础。",
    },

    stepUpBadge: { en: "进阶", zh: "进阶" },
    stepUpTitle: { en: "Step-Up (Level 2)", zh: "进阶（二级）" },
    stepUpAge: { en: "Ages 6–10", zh: "6–10岁" },
    stepUpTime: { en: "10:00 – 11:00 AM", zh: "上午 10:00 – 11:00" },
    stepUpDesc: {
      en: "Expand vocabulary and sentence patterns through interactive lessons and reading.",
      zh: "通过互动课堂与阅读，扩展词汇量和句型表达。",
    },

    stepBeyondBadge: { en: "精进", zh: "精进" },
    stepBeyondTitle: { en: "Step-Beyond (Level 3)", zh: "精进（三级）" },
    stepBeyondAge: { en: "Ages 10+", zh: "10岁以上" },
    stepBeyondTime: { en: "11:00 AM – 12:00 PM", zh: "上午 11:00 – 12:00" },
    stepBeyondDesc: {
      en: "Strengthen reading, writing, speaking, and advanced language skills.",
      zh: "加强阅读、写作、口语表达与更高阶的语言能力。",
    },

    supportEyebrow: { en: "Supports all three levels above", zh: "适用于以上三个级别" },
    supportTitle: {
      en: "Chinese Learning Support (Before- & After-Class Tutoring)",
      zh: "中文学习辅导（课前与课后辅导）",
    },
    supportDesc: {
      en: "Personalized support for all three Chinese levels — added to a level plan, not a separate level.",
      zh: "为三个中文级别提供个性化辅导——作为课程方案的附加项，并非独立级别。",
    },
    supportBullets: {
      en: ["Review & reinforce key concepts", "Homework help", "Extra practice & personalized support"],
      zh: ["复习并巩固重点内容", "作业辅导", "额外练习与个性化支持"],
    },

    mathBadge: { en: "数学", zh: "数学" },
    mathEyebrow: { en: "Independent Sunday course", zh: "独立周日课程" },
    mathTitle: { en: "Math Enrichment", zh: "数学思维拓展" },
    mathTeacher: { en: "Chinese Teacher-Led", zh: "中文教师授课" },
    mathTime: { en: "11:00 AM – 12:00 PM", zh: "上午 11:00 – 12:00" },
    mathDesc: {
      en: "Strengthen math foundations, build problem-solving skills, and boost confidence. Available with Step-In and Step-Up plans.",
      zh: "夯实数学基础，培养解题能力，增强自信。可与入门、进阶课程方案搭配报名。",
    },

    nextStep: {
      en: "choose your child's level to view available Sunday plans.",
      zh: "选择孩子的级别，查看可报名的周日课程方案。",
    },
  },
/* Shared data-layer strings. enrollment.js keeps structure, times, prices and
     rules; every display string it used to hold lives here, keyed the same way. */
  enrollData: {
    levelName: {
      "step-in": { en: "Step-In", zh: "入门" },
      "step-up": { en: "Step-Up", zh: "进阶" },
      "step-beyond": { en: "Step-Beyond", zh: "精进" },
      math: { en: "Math Enrichment", zh: "数学思维拓展" },
    },
    levelLabel: {
      "step-in": { en: "Building Language Foundations", zh: "打好语言基础" },
      "step-up": { en: "Developing Language Skills", zh: "提升语言能力" },
      "step-beyond": { en: "Advancing Language Independence", zh: "走向自主表达" },
      math: { en: "Grouped by Grade & Skill Level", zh: "按年级与能力分组" },
    },
    levelAges: {
      "step-in": { en: "Recommended Ages 3–6+", zh: "建议年龄 3–6岁以上" },
      "step-up": { en: "Recommended Ages 7–10", zh: "建议年龄 7–10岁" },
      "step-beyond": { en: "Recommended Ages 10+", zh: "建议年龄 10岁以上" },
      math: { en: "Recommended Ages 7–12", zh: "建议年龄 7–12岁" },
    },
    planName: {
      1: { en: "Chinese Only", zh: "仅中文课" },
      2: { en: "Chinese + 1 Tutoring", zh: "中文课 + 1小时辅导" },
      3: { en: "Chinese + 2 Tutoring", zh: "中文课 + 2小时辅导" },
      4: { en: "Chinese + Math", zh: "中文课 + 数学" },
      5: { en: "Chinese + Tutoring + Math", zh: "中文课 + 辅导 + 数学" },
      6: { en: "Math Enrichment Only", zh: "仅数学思维拓展" },
    },
    slot: {
      chineseClass: { en: "Chinese Class", zh: "中文课" },
      optionalTutoring: { en: "Optional Tutoring", zh: "可选辅导" },
      optionalMath: { en: "Optional Math Enrichment", zh: "可选数学思维拓展" },
      tutoring: { en: "Learning Support Tutoring", zh: "学习辅导" },
      math: { en: "Math Enrichment", zh: "数学思维拓展" },
    },
    unit: {
      chinese: { en: "Chinese classes", zh: "节中文课" },
      tutoring: { en: "tutoring hours", zh: "小时辅导" },
      math: { en: "math classes", zh: "节数学课" },
    },
    conflictMathClash: {
      en: "{level} Chinese and Math Enrichment both run {time}, so they cannot be combined.",
      zh: "{level}中文课与数学思维拓展都在{time}上课，因此无法同时报名。",
    },
    conflictUnknown: { en: "Unknown level or plan.", zh: "未找到该级别或方案。" },
  },

  enrollPlans: {
    backToSunday: { en: "← Back to Sunday Programs", zh: "← 返回周日课程" },
    notFoundTitle: { en: "We could not find that level", zh: "未找到该级别" },
    notFoundCta: { en: "Back to Sunday Programs", zh: "返回周日课程" },
    childBanner: {
      en: "You are enrolling Child {n}. This child can choose a different level, plan, and Sundays — parent information is already saved.",
      zh: "您正在为第{n}个孩子报名。该孩子可选择不同的级别、方案与上课周日——家长信息已保存。",
    },
    titleSuffix: { en: "Chinese", zh: "中文" },
    classTimeLine: { en: "Chinese class time: Sunday {time}", zh: "中文课时间：周日 {time}" },
    scheduleAria: { en: "Sunday morning schedule", zh: "周日上午课程安排" },
    scheduleTitle: { en: "Sunday Morning Schedule", zh: "周日上午课程安排" },
    pricingTitle: { en: "How Pricing Works", zh: "收费方式" },
    pricingFlexibleLabel: { en: "Flexible dates", zh: "日期灵活" },
    pricingFlexible: { en: "choose the Sundays that work for your family.", zh: "自由选择适合家庭安排的周日。" },
    pricingPerStudentLabel: { en: "Per student", zh: "按学生计费" },
    pricingPerStudent: { en: "standard weekly rates shown below are per student.", zh: "下方标准周单价为每位学生的价格。" },
    pricingSavingsLabel: { en: "Automatic savings", zh: "自动优惠" },
    pricingSavings: { en: "package savings are applied automatically when eligible.", zh: "符合条件时将自动享受套餐优惠。" },
    chooseTitle: { en: "Choose Your Plan", zh: "选择课程方案" },
    chooseCount: { en: "Five plan types", zh: "五种方案" },
    mostPopular: { en: "★ Most Popular", zh: "★ 最受欢迎" },
    unavailableRibbon: { en: "Not available at this level", zh: "该级别不可选" },
    save: { en: "Save {amount}", zh: "省 {amount}" },
    perSunday: { en: "/ Sunday", zh: "／每周日" },
    rateLabel: { en: "Standard weekly rate", zh: "标准周单价" },
    selectPlan: { en: "Select Plan", zh: "选择此方案" },
    unavailable: { en: "Unavailable", zh: "暂不可选" },
    foot: {
      en: "No long-term commitment. Join for the Sundays that work for you.",
      zh: "无需长期承诺，选择适合您的周日报名即可。",
    },
    srHint: { en: "{plan} is the most popular combination.", zh: "{plan}是最受欢迎的组合。" },
  },

  enrollSundayProgram: {
    childBanner: {
      en: "You are enrolling Child {n}. This child can choose a different level, plan, and Sundays — parent information is already saved.",
      zh: "您正在为第{n}个孩子报名。该孩子可选择不同的级别、方案与上课周日——家长信息已保存。",
    },
    pathwayTitle: { en: "Chinese Learning Pathway", zh: "中文学习进阶路径" },
    pathwayIntro: {
      en: "A structured Mandarin pathway designed to support continuous growth from foundational language skills to increasingly independent Chinese use.",
      zh: "系统化的中文学习路径，帮助孩子从语言基础逐步走向更加自主的中文运用。",
    },
    choosePlan: { en: "Choose Your Plan →", zh: "选择课程方案 →" },

    stepInTitle: { en: "Step-In Chinese", zh: "入门中文" },
    stepInSubtitle: { en: "Building Language Foundations", zh: "打好语言基础" },
    stepInAge: { en: "Recommended Ages 3–6+", zh: "建议年龄 3–6岁以上" },
    stepInTime: { en: "9:00 – 10:00 AM", zh: "上午 9:00 – 10:00" },
    stepInDesc: {
      en: "Build a strong foundation through vocabulary, sentence formation, and early literacy, while developing confidence and a natural feel for Chinese.",
      zh: "通过词汇积累、句子表达与早期识字打好基础，同时培养自信和对中文的语感。",
    },

    stepUpTitle: { en: "Step-Up Chinese", zh: "进阶中文" },
    stepUpSubtitle: { en: "Developing Language Skills", zh: "提升语言能力" },
    stepUpAge: { en: "Recommended Ages 7–10", zh: "建议年龄 7–10岁" },
    stepUpTime: { en: "10:00 – 11:00 AM", zh: "上午 10:00 – 11:00" },
    stepUpDesc: {
      en: "Develop core language skills through expanded sentence patterns, structured reading and writing, and comprehension, while applying Chinese in meaningful contexts.",
      zh: "通过更丰富的句型、系统的读写训练与阅读理解，发展核心语言能力，并在真实情境中运用中文。",
    },

    stepBeyondTitle: { en: "Step-Beyond Chinese", zh: "精进中文" },
    stepBeyondSubtitle: { en: "Advancing Language Independence", zh: "走向自主表达" },
    stepBeyondAge: { en: "Recommended Ages 10+", zh: "建议年龄 10岁以上" },
    stepBeyondTime: { en: "11:00 AM – 12:00 PM", zh: "上午 11:00 – 12:00" },
    stepBeyondDesc: {
      en: "Advance toward independent language use through deeper reading, more complex writing, real-world communication, and project-based learning, while developing the confidence to express ideas with greater depth and clarity.",
      zh: "通过深入阅读、更复杂的写作、真实交流与项目式学习，走向自主运用中文，并更有信心地清晰表达自己的想法。",
    },

    supportEyebrow: { en: "Supports all three Chinese levels", zh: "适用于三个中文级别" },
    supportTitle: { en: "Chinese Learning Support", zh: "中文学习辅导" },
    supportSubtitle: { en: "Optional Before- & After-Class Tutoring", zh: "可选的课前与课后辅导" },
    supportDesc: {
      en: "Personalized support to review class learning, strengthen communication skills, and provide homework guidance.",
      zh: "个性化辅导，帮助复习课堂内容、加强表达能力，并提供作业指导。",
    },
    supportFeature1Title: { en: "Review & Reinforce", zh: "复习与巩固" },
    supportFeature1Desc: { en: "Strengthen key learning through guided practice.", zh: "通过有指导的练习巩固重点内容。" },
    supportFeature2Title: { en: "Speak with Confidence", zh: "自信表达" },
    supportFeature2Desc: { en: "Build communication skills through conversation and role-play.", zh: "通过对话与角色扮演提升交流能力。" },
    supportFeature3Title: { en: "Personalized Support", zh: "个性化支持" },
    supportFeature3Desc: { en: "Learn at your own pace with small-group guidance.", zh: "小组指导，按自己的节奏学习。" },

    mathTitle: { en: "Math Enrichment", zh: "数学思维拓展" },
    mathSubtitle: { en: "Grouped by Grade & Skill Level", zh: "按年级与能力分组" },
    mathAge: { en: "Recommended Ages 7–12", zh: "建议年龄 7–12岁" },
    mathTime: { en: "11:00 AM – 12:00 PM", zh: "上午 11:00 – 12:00" },
    mathDesc: {
      en: "An independent Sunday course that builds core skills, reasoning, and confidence. Students are grouped by both grade level and mathematical ability.",
      zh: "独立的周日课程，培养核心运算能力、逻辑推理与自信。学生按年级和数学能力分组。",
    },
    mathTicks: {
      en: ["Strengthen Mathematical Foundations", "Cultivate Mathematical Thinking", "Support Academic Growth"],
      zh: ["夯实数学基础", "培养数学思维", "助力学业成长"],
    },
  },
/* Validation and blocking reasons. These reach a parent mid-checkout, so they
     always render in the active language. */
  enrollValidation: {
    duplicateDates: { en: "Please remove duplicate dates.", zh: "请删除重复的日期。" },
    tooFewDates: {
      en: "Please select at least {minimum} Sundays to enroll.",
      zh: "请至少选择 {minimum} 个周日才能报名。",
    },
    tooFewDatesOne: { en: "Please select at least 1 Sunday to enroll.", zh: "请至少选择 1 个周日才能报名。" },
    tooManyDates: {
      en: "Please select no more than {maximum} Sundays.",
      zh: "最多只能选择 {maximum} 个周日。",
    },
    dateUnavailable: {
      en: "One of your dates is no longer available. Please review your selection.",
      zh: "您选择的日期中有一个已不可用，请重新确认。",
    },
    unknownSelection: {
      en: "We could not tell which level and plan you selected.",
      zh: "无法确认您所选择的级别与课程方案。",
    },
    pastDate: { en: "Past date", zh: "已过期" },
    groupFull: { en: "Group full", zh: "已满班" },
    yctExamDay: { en: "YCT Exam Day", zh: "YCT考试日" },
  },

  enrollDates: {
    termFall2026: { en: "Fall Term 2026", zh: "2026年秋季学期" },
    lostPlanTitle: { en: "We lost track of your plan", zh: "未能找到您的课程方案" },
    backToSunday: { en: "Back to Sunday Programs", zh: "返回周日课程" },
    backToPlans: { en: "← Back to plans", zh: "← 返回课程方案" },
    stepperAria: { en: "Enrollment progress", zh: "报名进度" },
    stepPlan: { en: "Plan", zh: "方案" },
    stepSundays: { en: "Sundays", zh: "上课日" },
    stepRegistration: { en: "Registration", zh: "报名信息" },
    title: { en: "Choose Your Sundays", zh: "选择上课的周日" },
    lede: {
      en: "Select the class dates that work best for your family. Eligible package discounts are applied automatically.",
      zh: "选择最适合家庭安排的上课日期。符合条件的套餐优惠将自动计算。",
    },
    childLineFirst: { en: "Child 1 enrollment", zh: "第1个孩子的报名" },
    childLineOther: {
      en: "Child {n} enrollment — this child can have a different level, plan, and schedule.",
      zh: "第{n}个孩子的报名——该孩子可选择不同的级别、方案与上课时间。",
    },
    perStudentNote: { en: "Standard weekly rates shown are per student.", zh: "所示标准周单价为每位学生的价格。" },
    pickerTitle: { en: "Select Your Sundays", zh: "选择上课的周日" },
    counter: { en: "{selected} of {total} Sundays selected", zh: "已选择 {selected} / {total} 个周日" },
    hintReduced: {
      en: "Some Sundays in {term} have already passed. Choose at least {minimum} of the remaining Sundays to enroll.",
      zh: "{term}的部分周日已经过去。请至少选择剩余周日中的 {minimum} 个才能报名。",
    },
    hintReducedOne: {
      en: "Some Sundays in {term} have already passed. Choose the remaining Sunday to enroll.",
      zh: "{term}的部分周日已经过去。请选择剩余的那个周日报名。",
    },
    hintFull: {
      en: "{term} runs on {total} Sundays. Pick any combination — choose at least {minimum}.",
      zh: "{term}共有 {total} 个上课周日。可自由组合，至少选择 {minimum} 个。",
    },
    selectAll: { en: "Select all Sundays", zh: "全选所有周日" },
    clear: { en: "Clear", zh: "清空" },
    daySelected: { en: "Selected", zh: "已选择" },
    dayAvailable: { en: "Available", zh: "可选择" },

    yctTitle: { en: "YCT Level 1 Exam Day — November 22", zh: "YCT一级考试日——11月22日" },
    yctBody: {
      en: "If your child plans to take the YCT Level 1 exam, please select this date. The exam lasts approximately 40 minutes, and all other scheduled classes continue as usual afterward. The $15 YCT exam registration fee is already included in the November 22 session fee — there is nothing extra to pay.",
      zh: "如果孩子计划参加YCT一级考试，请选择这一天。考试约40分钟，考试结束后其余课程照常进行。15美元的YCT考试报名费已包含在11月22日的课程费用中，无需额外支付。",
    },
    yctAskPre: { en: "Not sure if your child is ready for the YCT Level 1 exam?", zh: "不确定孩子是否已准备好参加YCT一级考试？" },
    yctAskLink: { en: "Email us", zh: "请发邮件给我们" },
    yctAskPost: { en: "in advance to confirm with your child's teacher.", zh: "，我们会提前与老师确认。" },

    summaryTitle: { en: "Pricing Summary", zh: "费用明细" },
    savingsBadge: { en: "✓ Package Savings Applied", zh: "✓ 已享套餐优惠" },
    regularLine: { en: "Regular: {amount}", zh: "原价：{amount}" },
    save: { en: "Save {amount}", zh: "省 {amount}" },
    total: { en: "Total", zh: "合计" },
    totalSavings: { en: "Total savings: {amount}", zh: "共节省：{amount}" },
    allPerStudent: { en: "All rates shown are per student.", zh: "所示价格均为每位学生的费用。" },
    continue: { en: "Continue to Registration ›", zh: "继续填写报名信息 ›" },
    altPre: { en: "Need a different option?", zh: "需要其他选择？" },
    altLink: { en: "Back to Plans", zh: "返回课程方案" },

    recapEyebrow: { en: "Your selection", zh: "您的选择" },
    recapSundays: { en: "Sundays selected", zh: "已选周日" },
    recapRate: { en: "Weekly rate", zh: "周单价" },
    recapRateValue: { en: "{amount} / Sunday", zh: "{amount}／每周日" },
    recapSavings: { en: "Savings", zh: "优惠" },
    recapSubtotal: { en: "Subtotal", zh: "小计" },
    recapDates: { en: "Selected: {dates}", zh: "已选：{dates}" },
    recapNone: { en: "No Sundays selected yet.", zh: "尚未选择任何周日。" },

    planTitle: { en: "Plan {order} — {name}", zh: "方案{order} — {name}" },
    componentChinese: { en: "Chinese Classes", zh: "中文课" },
    componentTutoring: { en: "Tutoring Hours", zh: "辅导课时" },
    componentMath: { en: "Math Classes", zh: "数学课" },
    qtyClass: { en: "classes", zh: "节课" },
    qtyClassOne: { en: "class", zh: "节课" },
    qtyHour: { en: "hours", zh: "小时" },
    qtyHourOne: { en: "hour", zh: "小时" },
  },
enrollReg: {
    stepParent: { en: "Parent Info", zh: "家长信息" },
    stepStudent: { en: "Student Info", zh: "学生信息" },
    stepAddChild: { en: "Add Child?", zh: "添加孩子" },
    stepReview: { en: "Review & Submit", zh: "确认提交" },
    stepperAria: { en: "Registration progress", zh: "报名进度" },

    emptyTitle: { en: "Let's pick up your enrollment", zh: "继续完成报名" },
    emptyDesc: {
      en: "We do not have a plan and Sundays on file yet. Choose a level and plan to begin.",
      zh: "我们还没有收到您的课程方案与上课日期。请先选择级别与方案。",
    },
    emptyCta: { en: "Back to Sunday Programs", zh: "返回周日课程" },

    doneTitle: { en: "Registration received", zh: "报名已收到" },
    doneBody: {
      en: "Thank you, {name}. We have your household enrollment for {children} and will confirm placement by email. No payment is taken now.",
      zh: "谢谢您，{name}。我们已收到您家庭中{children}的报名信息，将通过邮件确认班级安排。现在无需付款。",
    },
    doneThere: { en: "there", zh: "您" },
    childCountOne: { en: "1 child", zh: "1个孩子" },
    childCountMany: { en: "{n} children", zh: "{n}个孩子" },
    doneTotalLabel: { en: "Total due after confirmation", zh: "确认后应付总额" },
    doneCta: { en: "Back to Programs", zh: "返回课程总览" },

    backToSundays: { en: "Back to Choose Your Sundays", zh: "返回选择上课周日" },
    backToParent: { en: "Back to Parent Information", zh: "返回家长信息" },
    backToStudent: { en: "Back to Student Information", zh: "返回学生信息" },
    backToAddChild: { en: "Back to Add Another Child", zh: "返回添加孩子" },

    parentTitle: { en: "Parent / Guardian Information", zh: "家长／监护人信息" },
    parentLede: {
      en: "Parent information is shared once and applies to every child in this registration.",
      zh: "家长信息只需填写一次，适用于本次报名的所有孩子。",
    },
    parentName: { en: "Parent / Guardian name *", zh: "家长／监护人姓名 *" },
    parentNamePlaceholder: { en: "Enter full name", zh: "请输入姓名全称" },
    parentEmail: { en: "Email *", zh: "电子邮箱 *" },
    parentEmailPlaceholder: { en: "Enter email address", zh: "请输入电子邮箱" },
    parentPhone: { en: "Phone number *", zh: "联系电话 *" },
    parentPhonePlaceholder: { en: "(555) 123-4567", zh: "(555) 123-4567" },
    parentNotes: { en: "Optional notes", zh: "备注（选填）" },
    parentNotesPlaceholder: { en: "Anything we should know?", zh: "还有什么需要我们了解的吗？" },
    parentContinue: { en: "Continue to Student Information →", zh: "继续填写学生信息 →" },

    studentTitle: { en: "Student Information", zh: "学生信息" },
    studentTitleChild: { en: "Student Information — Child {n}", zh: "学生信息 — 第{n}个孩子" },
    studentLede: { en: "Tell us about the child enrolling in this plan.", zh: "请填写报名该方案的孩子的信息。" },
    childName: { en: "Child name *", zh: "孩子姓名 *" },
    childNamePlaceholder: { en: "Enter child's full name", zh: "请输入孩子的姓名全称" },
    dob: { en: "Date of birth *", zh: "出生日期 *" },
    dobHint: { en: "Age is calculated from the date of birth.", zh: "年龄将根据出生日期自动计算。" },
    ageValue: { en: "Age {age}", zh: "{age}岁" },
    grade: { en: "Grade *", zh: "年级 *" },
    gradePlaceholder: { en: "e.g. 1st Grade", zh: "例如：一年级" },
    school: { en: "School", zh: "学校" },
    optional: { en: "(optional)", zh: "（选填）" },
    schoolPlaceholder: { en: "Enter school name", zh: "请输入学校名称" },
    background: { en: "Chinese learning background", zh: "中文学习背景" },
    backgroundSelect: { en: "Select background level", zh: "请选择中文程度" },
    backgroundNone: { en: "No prior Chinese", zh: "没有中文基础" },
    backgroundHome: { en: "Spoken at home", zh: "家中使用中文" },
    backgroundSome: { en: "Some experience", zh: "有一些学习经历" },
    backgroundYear: { en: "1+ year of classes", zh: "上过一年以上课程" },
    backgroundFluent: { en: "Reads and writes confidently", zh: "能自信读写" },
    sundaysSelected: { en: "{n} Sundays selected", zh: "已选择 {n} 个周日" },
    subtotalLabel: { en: "Subtotal {amount}", zh: "小计 {amount}" },
    continue: { en: "Continue →", zh: "继续 →" },

    addChildTitle: { en: "Add another child?", zh: "是否添加另一个孩子？" },
    addChildLede: {
      en: "One parent can register multiple students. Each child's enrollment is independent.",
      zh: "一位家长可以为多个孩子报名，每个孩子的报名相互独立。",
    },
    addChildQuestion: { en: "Would you like to enroll another child?", zh: "您想再为一个孩子报名吗？" },
    addChildText: {
      en: "Each additional child chooses their own level, plan, and Sundays, and receives a separate subtotal. You will not need to re-enter parent information.",
      zh: "每个孩子都可以选择自己的级别、方案与上课日期，并单独计算小计。家长信息无需重复填写。",
    },
    addChildNo: { en: "No, Continue", zh: "不用了，继续" },
    addChildYes: { en: "Yes, Add Another Child", zh: "是的，添加孩子" },
    enrolledSoFar: { en: "Enrolled so far: {names} · Household total {amount}", zh: "已报名：{names} · 家庭合计 {amount}" },
    childFallback: { en: "Child {n}", zh: "第{n}个孩子" },

    reviewTitle: { en: "Final Review & Submit", zh: "最终确认并提交" },
    reviewLede: {
      en: "Check every detail below, then submit your household registration.",
      zh: "请核对以下所有信息，然后提交家庭报名。",
    },
    edit: { en: "Edit", zh: "修改" },
    remove: { en: "Remove", zh: "移除" },
    removeTitle: { en: "Remove this child", zh: "移除该孩子" },
    removeAria: { en: "Remove {name}", zh: "移除{name}" },
    removeConfirm: { en: "Remove {name} from this enrollment?", zh: "确定要将{name}从本次报名中移除吗？" },
    fieldName: { en: "Name", zh: "姓名" },
    fieldEmail: { en: "Email", zh: "电子邮箱" },
    fieldPhone: { en: "Phone", zh: "电话" },
    childSummary: { en: "Child {n} Enrollment Summary", zh: "第{n}个孩子的报名摘要" },
    fieldStudent: { en: "Student", zh: "学生" },
    namePending: { en: "Name pending", zh: "姓名待填写" },
    fieldProgram: { en: "Program", zh: "课程" },
    fieldSchedule: { en: "Schedule", zh: "上课时间" },
    fieldSundays: { en: "Sundays", zh: "上课周日" },
    countSelected: { en: "{n} selected", zh: "已选 {n} 个" },
    fieldSubtotal: { en: "Subtotal", zh: "小计" },

    householdEyebrow: { en: "Household total", zh: "家庭合计" },
    couponPlaceholder: { en: "Coupon code", zh: "优惠码" },
    couponApply: { en: "Apply", zh: "使用" },
    couponAppliedLine: { en: "{code} applied — {label}", zh: "已使用 {code} — {label}" },
    couponRemove: { en: "Remove", zh: "取消" },
    couponPercent10: { en: "10% off", zh: "9折优惠" },
    couponFlat20: { en: "$20 off", zh: "减20美元" },
    couponInvalid: {
      en: "That code isn't valid. Check the spelling and try again.",
      zh: "该优惠码无效，请检查后重新输入。",
    },
    subtotal: { en: "Subtotal", zh: "小计" },
    siblingDiscount: { en: "Sibling discount ({n} children)", zh: "多孩优惠（{n}个孩子）" },
    couponRow: { en: "Coupon ({code})", zh: "优惠码（{code}）" },
    totalDue: { en: "Total due", zh: "应付总额" },
    youSave: { en: "You save {amount}", zh: "共省 {amount}" },
    savePackage: { en: "{amount} package savings", zh: "套餐优惠 {amount}" },
    saveSibling: { en: "{amount} sibling discount", zh: "多孩优惠 {amount}" },
    saveCoupon: { en: "{amount} coupon {code}", zh: "优惠码{code} {amount}" },
    householdNoteOne: {
      en: "All rates are per student. Enroll a second child and the household saves {amount} more.",
      zh: "所有价格均为每位学生的费用。再为第二个孩子报名，家庭可再省 {amount}。",
    },
    householdNoteMany: {
      en: "All rates are per student. Package and sibling savings are applied automatically.",
      zh: "所有价格均为每位学生的费用。套餐与多孩优惠将自动计算。",
    },

    payTitle: { en: "How would you like to pay?", zh: "您希望如何付款？" },
    payFull: { en: "Pay in full", zh: "一次付清" },
    payFullMeta: { en: "One payment before the first Sunday", zh: "首次上课前一次性付款" },
    payPlanUnavailable: { en: "Payment plan — unavailable", zh: "分期付款——暂不可用" },
    payPlan: { en: "Payment plan — {months}", zh: "分期付款——{months}" },
    payMonthsOne: { en: "1 month", zh: "1个月" },
    payMonthsMany: { en: "{n} months", zh: "{n}个月" },
    payPlanClosedMeta: {
      en: "Too few payment dates remain this term",
      zh: "本学期剩余的付款日期过少",
    },
    payPlanMeta: { en: "{months} · no fees", zh: "{months} · 无手续费" },
    perMonth: { en: "/mo", zh: "／月" },
    dueOn: { en: "Due {date}", zh: "{date}到期" },
    payHelp: {
      en: "Need more time to pay? Let our team know and we will work out a schedule that fits your family.",
      zh: "需要更长的付款时间？请告知我们的团队，我们会安排适合您家庭的付款计划。",
    },
    payClosedNote: {
      en: "The monthly plan is no longer available for this term — too few payment dates remain. Pay in full to enroll, or contact us to arrange a schedule.",
      zh: "本学期已无法使用分期付款——剩余付款日期过少。请一次付清以完成报名，或联系我们另行安排。",
    },

    policyTitle: { en: "Enrollment, Make-Up & Refund Policy", zh: "报名、补课与退费政策" },
    policySummary: {
      en: "You pay only for the Sundays you select, at the standard weekly rate per student. Package savings are applied automatically when a component reaches an eligible quantity — Chinese classes, Math classes, and tutoring hours each qualify independently. There is no long-term commitment. Refunds are calculated from tuition actually paid and itemized in writing.",
      zh: "您只需为所选择的周日付费，按每位学生的标准周单价计算。当某一项课程达到优惠数量时，套餐优惠将自动生效——中文课、数学课与辅导课时各自独立计算。无需长期承诺。退费将按实际已付学费计算，并以书面形式逐项列明。",
    },
    policyMakeupFirst: {
      en: "If your child misses a class, we will first offer a make-up class on another available date.",
      zh: "如果孩子缺课，我们会首先安排在其他可行的日期补课。",
    },
    policyMakeupStrong: { en: "make-up class", zh: "补课" },
    policyMakeupChoose: {
      en: "If no make-up date works for your family, you may choose:",
      zh: "如果没有合适的补课日期，您可以选择：",
    },
    policyCreditLabel: { en: "Future Credit", zh: "课程余额" },
    policyCreditDesc: {
      en: "apply the missed class value toward a future term",
      zh: "将缺课金额抵扣到之后的学期",
    },
    policyRefundLabel: { en: "Refund", zh: "退款" },
    policyRefundDesc: {
      en: "receive a refund to the original payment method",
      zh: "退回至原付款方式",
    },
    policyAccept: {
      en: "I have read and accept the Enrollment, Make-Up & Refund Policy. *",
      zh: "我已阅读并接受报名、补课与退费政策。*",
    },

    privacyTitle: { en: "Your child's privacy", zh: "关于孩子的隐私" },
    privacySummary: {
      en: "We collect your child's information only to place them in the right class and to reach you about their learning. We never sell or share it with anyone outside our teaching team.",
      zh: "我们收集孩子的信息仅用于安排合适的班级，以及就学习情况与您联系。我们绝不会将其出售或分享给教学团队以外的任何人。",
    },
    privacyConsent: {
      en: "I give permission for photos or video of my child taken in class to be used in Hello Chinese newsletters and social posts.",
      zh: "我同意 Hello Chinese 将课堂上拍摄的孩子照片或视频用于通讯与社交媒体内容。",
    },
    privacyHint: {
      en: "Optional — leave unchecked and we will keep your child out of all photos and videos.",
      zh: "选填——不勾选则我们不会在任何照片或视频中出现您的孩子。",
    },

    submit: { en: "Submit Registration", zh: "提交报名" },
    submitNote: {
      en: "No payment is taken now. We confirm placement and send payment instructions by email.",
      zh: "现在无需付款。我们会确认班级安排，并通过邮件发送付款说明。",
    },

    warnSend: {
      en: "We could not submit your registration just now. Please try again, or contact us if it keeps happening — nothing has been lost.",
      zh: "目前无法提交您的报名信息。请重试，若仍不成功请联系我们——您填写的内容不会丢失。",
    },
    warnMissingChild: {
      en: "One child is missing required information. Use Edit to complete it.",
      zh: "有一个孩子的必填信息尚未完成，请点击“修改”补充。",
    },
    warnPolicy: { en: "Please accept the enrollment and refund policy.", zh: "请先接受报名与退费政策。" },
    warnTerms: {
      en: "Please agree to the Terms of Service and Privacy Policy.",
      zh: "请先同意《服务条款》与《隐私政策》。",
    },
    termsTitle: { en: "Terms & Privacy", zh: "条款与隐私" },
    termsLede: {
      en: "Registration is completed by a parent or legal guardian. Please review both documents before submitting.",
      zh: "报名须由家长或法定监护人完成。提交前请阅读以下两份文件。",
    },
    // Three fragments because the two links sit inside the sentence; Chinese
    // word order differs, so these are the keys to check with a reviewer.
    termsAgreePre: { en: "I have read and agree to the", zh: "我已阅读并同意" },
    termsAgreeMid: { en: "and acknowledge the", zh: "，并已知悉" },
    termsAgreePost: { en: ". *", zh: "。*" },
    warnParentFields: {
      en: "Please add your name, email, and phone number.",
      zh: "请填写您的姓名、电子邮箱和联系电话。",
    },
    warnStudentFields: {
      en: "Please add the child's name, date of birth, and grade.",
      zh: "请填写孩子的姓名、出生日期和年级。",
    },
    warnDob: {
      en: "Please check the date of birth — it cannot be in the future.",
      zh: "请检查出生日期——不能是将来的日期。",
    },
  },
enrollMath: {
    back: { en: "← Back to Sunday Programs", zh: "← 返回周日课程" },
    childBanner: {
      en: "You are enrolling Child {n}. This child can choose a different level, plan, and Sundays — parent information is already saved.",
      zh: "您正在为第{n}个孩子报名。该孩子可选择不同的级别、方案与上课周日——家长信息已保存。",
    },
    subtitle: { en: "Sunday {time} · {ages}", zh: "周日 {time} · {ages}" },
    scheduleAria: { en: "Sunday morning schedule", zh: "周日上午课程安排" },
    scheduleTitle: { en: "Sunday Morning Schedule", zh: "周日上午课程安排" },
    slotLabel: { en: "Math Enrichment", zh: "数学思维拓展" },
    stripNote: {
      en: "An independent Sunday course — no Chinese class required. Students are grouped by both grade level and mathematical ability.",
      zh: "独立的周日课程，无需报名中文课。学生按年级和数学能力分组。",
    },
    benefits: {
      en: ["Strengthen Mathematical Foundations", "Cultivate Mathematical Thinking", "Support Academic Growth"],
      zh: ["夯实数学基础", "培养数学思维", "助力学业成长"],
    },
    pricingTitle: { en: "How Pricing Works", zh: "收费方式" },
    pricingFlexibleLabel: { en: "Flexible dates", zh: "日期灵活" },
    pricingFlexible: { en: "choose the Sundays that work for your family.", zh: "自由选择适合家庭安排的周日。" },
    pricingPerStudentLabel: { en: "Per student", zh: "按学生计费" },
    pricingPerStudent: { en: "the standard weekly rate shown below is per student.", zh: "下方标准周单价为每位学生的价格。" },
    pricingSavingsLabel: { en: "Automatic savings", zh: "自动优惠" },
    pricingSavings: { en: "package savings are applied automatically when eligible.", zh: "符合条件时将自动享受套餐优惠。" },
    yourPlan: { en: "Your Plan", zh: "您的方案" },
    onePlan: { en: "One plan — math only", zh: "单一方案——仅数学课" },
    save: { en: "Save {amount}", zh: "省 {amount}" },
    packageLine: { en: "10 math classes", zh: "10节数学课" },
    perSession: { en: "/ session", zh: "／每节课" },
    rateLabel: { en: "Standard weekly rate", zh: "标准周单价" },
    selectPlan: { en: "Select Plan", zh: "选择此方案" },
    noCommitment: {
      en: "No long-term commitment. Join for the Sundays that work for you.",
      zh: "无需长期承诺，选择适合您的周日报名即可。",
    },
    footPre: { en: "Looking for Chinese classes too?", zh: "同时也想了解中文课？" },
    footLink: { en: "See the Chinese pathway plans", zh: "查看中文进阶课程方案" },
  },

  enrollSat: {
    back: { en: "← Back to Programs", zh: "← 返回课程总览" },
    title: { en: "Saturday Programs Interest List", zh: "周六课程意向名单" },
    desc: {
      en: "English Language Learning and English-Led Math Enrichment are launching soon. Tell us who you're enrolling and we'll notify you the moment registration opens — schedule, pricing, and teachers to be announced.",
      zh: "英语学习与英语外教数学思维拓展课程即将开设。请告诉我们报名的孩子信息，开放报名时我们会第一时间通知您——课程时间、费用与师资稍后公布。",
    },
    englishTitle: { en: "English Language Learning", zh: "英语学习" },
    englishDesc: {
      en: "Build strong English foundations through engaging reading, writing, and language activities.",
      zh: "通过有趣的阅读、写作与语言活动，打好扎实的英语基础。",
    },
    englishBullets: {
      en: ["Reading & writing foundations", "Vocabulary and grammar building", "Small group instruction"],
      zh: ["读写基础", "词汇与语法积累", "小班教学"],
    },
    mathTitle: { en: "Math Enrichment", zh: "数学思维拓展" },
    mathDesc: {
      en: "Strengthen math thinking and problem-solving skills in a supportive and interactive setting.",
      zh: "在互动与支持性的课堂中，提升数学思维与解题能力。",
    },
    mathBullets: {
      en: ["Conceptual understanding", "Problem solving", "Math fluency and confidence"],
      zh: ["概念理解", "解决问题", "运算熟练与自信"],
    },
    parentName: { en: "Parent name", zh: "家长姓名" },
    email: { en: "Email", zh: "电子邮箱" },
    emailPlaceholder: { en: "parent@email.com", zh: "parent@email.com" },
    childAgeGrade: { en: "Child age / grade", zh: "孩子年龄／年级" },
    childAgeGradePlaceholder: { en: "e.g. Age 7 / 2nd grade", zh: "例如：7岁／二年级" },
    programInterest: { en: "Program of interest", zh: "感兴趣的课程" },
    programSelect: { en: "Select a program", zh: "请选择课程" },
    programBoth: { en: "Both", zh: "两者都要" },
    preferredTime: { en: "Preferred Saturday time", zh: "希望的周六时间" },
    preferredTimePlaceholder: { en: "e.g. Morning, early afternoon...", zh: "例如：上午、午后…" },
    comments: { en: "Comments", zh: "备注" },
    optional: { en: "(optional)", zh: "（选填）" },
    submit: { en: "Join Interest List", zh: "加入意向名单" },
    note: {
      en: "No enrollment or payment yet — this only adds you to the notification list.",
      zh: "这不是报名也无需付款——仅将您加入通知名单。",
    },
    warnSend: {
      en: "We could not submit your request just now. Please try again, or email us directly.",
      zh: "目前无法提交您的申请。请重试，或直接发邮件联系我们。",
    },
    warnFields: {
      en: "Please fill in parent name, email, and program of interest.",
      zh: "请填写家长姓名、电子邮箱和感兴趣的课程。",
    },
    doneEyebrow: { en: "You're on the list", zh: "已加入名单" },
    doneTitle: { en: "Thanks, {name}.", zh: "谢谢您，{name}。" },
    doneDesc: {
      en: "We'll email you as soon as Saturday enrollment opens, with final schedule, pricing, and teacher details.",
      zh: "周六课程开放报名时，我们会立即发送邮件通知您，并附上最终的课程时间、费用与师资信息。",
    },
    doneCta: { en: "Back to programs", zh: "返回课程总览" },
  },
enrollPrivate: {
    back: { en: "← Back to Programs", zh: "← 返回课程总览" },
    badge: { en: "Flexible Schedule", zh: "时间灵活" },
    title: { en: "Private Chinese Lessons", zh: "中文一对一私教课" },
    desc: {
      en: "Timing and goals vary by family, so private lessons are arranged individually — not through the Sunday package structure. Tell us what you're looking for and our team will follow up.",
      zh: "每个家庭的时间与学习目标各不相同，因此私教课单独安排，不采用周日套餐的形式。请告诉我们您的需求，我们的团队会与您联系。",
    },
    tagDays: { en: "Available Monday–Sunday", zh: "周一至周日均可安排" },
    tagFormat: { en: "Online or in person", zh: "线上或线下" },
    tagOneOnOne: { en: "One-on-one", zh: "一对一教学" },

    formTitle: { en: "Private Chinese Lesson Inquiry", zh: "中文私教课咨询" },
    formSub: { en: "Flexible One-on-One Chinese Instruction", zh: "灵活的一对一中文教学" },
    intro: {
      en: "Our private lessons use Hello Chinese curriculum and materials and can be tailored to each child's learning goals. Current Hello Chinese students may also use private lessons for individualized reinforcement of their group-class learning.",
      zh: "我们的私教课使用 Hello Chinese 的课程体系与教材，并可根据每个孩子的学习目标进行调整。已在读的学生也可以通过私教课，对小班课内容进行个性化巩固。",
    },

    step1: { en: "Parent & Child Information", zh: "家长与孩子信息" },
    parentName: { en: "Parent / Guardian Name", zh: "家长／监护人姓名" },
    email: { en: "Email", zh: "电子邮箱" },
    emailPlaceholder: { en: "parent@email.com", zh: "parent@email.com" },
    phone: { en: "Phone Number", zh: "联系电话" },
    childName: { en: "Child's Name", zh: "孩子姓名" },
    dob: { en: "Date of Birth", zh: "出生日期" },
    dobHint: {
      en: "We will use the date of birth to understand your child's age and recommend the best fit.",
      zh: "我们会根据出生日期了解孩子的年龄，并推荐最合适的安排。",
    },
    dobAge: {
      en: "Your child is {age} years old — we will use this to recommend the best fit.",
      zh: "孩子今年{age}岁——我们会据此推荐最合适的安排。",
    },

    step2: {
      en: "Is your child currently enrolled in a Hello Chinese group class?",
      zh: "孩子目前是否在 Hello Chinese 小班课就读？",
    },
    enrolledYes: { en: "Yes", zh: "是" },
    enrolledYesDesc: {
      en: "My child is currently enrolled in a Hello Chinese group class.",
      zh: "孩子目前正在 Hello Chinese 小班课就读。",
    },
    enrolledNo: { en: "No", zh: "否" },
    enrolledNoDesc: {
      en: "My child is not enrolled in any Hello Chinese group class.",
      zh: "孩子目前没有就读任何 Hello Chinese 小班课。",
    },
    whichClass: { en: "Which class is your child currently enrolled in?", zh: "孩子目前就读的是哪个班级？" },
    classStepIn: { en: "Step-In Chinese (Ages 3–6+)", zh: "入门中文（3–6岁以上）" },
    classStepUp: { en: "Step-Up Chinese (Ages 7–10)", zh: "进阶中文（7–10岁）" },
    classStepBeyond: { en: "Step-Beyond Chinese (Ages 10–12+)", zh: "精进中文（10–12岁以上）" },
    classOther: { en: "Other / Not Sure", zh: "其他／不确定" },

    step3: { en: "What are you looking for from private lessons?", zh: "您希望私教课解决什么需求？" },
    optionATitle: { en: "A. Group Class Reinforcement", zh: "A. 小班课内容巩固" },
    optionADesc: {
      en: "Personalized support based on your child's current Hello Chinese group class, including review, reading, writing, speaking, homework, and areas that need additional practice.",
      zh: "结合孩子目前的 Hello Chinese 小班课内容提供个性化辅导，包括复习、阅读、写作、口语、作业，以及需要加强的部分。",
    },
    optionBTitle: { en: "B. Standalone One-on-One Chinese", zh: "B. 独立的一对一中文课" },
    optionBDesc: {
      en: "A fully personalized one-on-one Chinese learning program using Hello Chinese curriculum and materials, designed for students who are not currently enrolled in our group classes.",
      zh: "使用 Hello Chinese 课程体系与教材的完全个性化一对一中文课，适合尚未就读我们小班课的学生。",
    },

    step4: { en: "Lesson Preference", zh: "课程偏好" },
    lessonLength: { en: "Preferred Lesson Length", zh: "希望的单次课时长" },
    length30: { en: "30 Minutes", zh: "30分钟" },
    length60: { en: "60 Minutes", zh: "60分钟" },
    lengthUnsure: { en: "Not Sure – Please Recommend", zh: "不确定——请为我推荐" },
    format: { en: "Preferred Format", zh: "上课方式" },
    formatNone: { en: "No Preference", zh: "无特别偏好" },
    formatOnline: { en: "Online", zh: "线上" },
    formatInPerson: { en: "In person", zh: "线下" },

    step5: { en: "Preferred Schedule", zh: "希望的上课时间" },
    preferredDays: { en: "Preferred Days", zh: "希望的上课日" },
    selectAllApply: { en: "(select all that apply)", zh: "（可多选）" },
    dayMonday: { en: "Monday", zh: "周一" },
    dayTuesday: { en: "Tuesday", zh: "周二" },
    dayWednesday: { en: "Wednesday", zh: "周三" },
    dayThursday: { en: "Thursday", zh: "周四" },
    dayFriday: { en: "Friday", zh: "周五" },
    daySaturday: { en: "Saturday", zh: "周六" },
    daySunday: { en: "Sunday", zh: "周日" },
    dayFlexible: { en: "Flexible", zh: "时间灵活" },
    preferredTime: { en: "Preferred Time", zh: "希望的时间段" },
    timeMorning: { en: "Morning (before 12 PM)", zh: "上午（12点前）" },
    timeEarlyAfternoon: { en: "Early afternoon (12–3 PM)", zh: "午后（12–3点）" },
    timeLateAfternoon: { en: "Late afternoon (3–6 PM)", zh: "下午（3–6点）" },
    timeEvening: { en: "Evening (after 6 PM)", zh: "傍晚（6点后）" },
    specificTimes: { en: "Specific preferred time(s)", zh: "具体希望的时间" },
    specificTimesPlaceholder: {
      en: "e.g. Tuesdays after 4:00 PM, Saturday mornings",
      zh: "例如：周二下午4点后、周六上午",
    },

    step6: { en: "Chinese Learning Experience", zh: "中文学习经历" },
    expNone: { en: "No prior Chinese learning experience", zh: "没有中文学习经历" },
    expUnder1: { en: "Less than 1 year", zh: "不到1年" },
    exp1to2: { en: "1–2 years", zh: "1–2年" },
    exp3plus: { en: "3+ years", zh: "3年以上" },

    step7: { en: "Tell Us About Your Child's Learning Goals", zh: "请告诉我们孩子的学习目标" },
    optional: { en: "(optional)", zh: "（选填）" },
    goalsPlaceholder: {
      en: "Please share any specific goals, areas your child would like to strengthen, school requirements, or anything else that would help us personalize the lesson.",
      zh: "请分享具体的学习目标、希望加强的方面、学校的要求，或任何有助于我们定制课程的信息。",
    },

    submit: { en: "Submit Private Lesson Inquiry", zh: "提交私教课咨询" },
    footNote: {
      en: "Once we receive your inquiry, our team will review your child's information and contact you to recommend the most appropriate lesson structure and schedule.",
      zh: "收到您的咨询后，我们的团队会了解孩子的情况，并与您联系，推荐最合适的课程安排与时间。",
    },
    brandTag: { en: "Language Learning & Enrichment", zh: "语言学习与素养课程" },

    warnSend: {
      en: "We could not submit your inquiry just now. Please try again, or email us directly.",
      zh: "目前无法提交您的咨询。请重试，或直接发邮件联系我们。",
    },
    warnRequired: {
      en: "Please fill in parent name, email, phone, child's name, and date of birth.",
      zh: "请填写家长姓名、电子邮箱、联系电话、孩子姓名和出生日期。",
    },
    warnLessonType: {
      en: "Please choose what you are looking for from private lessons (A or B).",
      zh: "请选择您希望私教课解决的需求（A 或 B）。",
    },
    warnLessonLength: {
      en: "Please choose a preferred lesson length.",
      zh: "请选择希望的单次课时长。",
    },

    doneEyebrow: { en: "Inquiry received", zh: "咨询已收到" },
    doneTitle: { en: "Thanks, {name}.", zh: "谢谢您，{name}。" },
    doneDesc: {
      en: "Our team will review your child's information and follow up by email to recommend the most appropriate lesson structure and schedule.",
      zh: "我们的团队会了解孩子的情况，并通过邮件与您联系，推荐最合适的课程安排与时间。",
    },
    doneCta: { en: "Back to programs", zh: "返回课程总览" },
  },
freeTrial: {
    back: { en: "Back to Programs", zh: "返回课程总览" },
    bannerTitle: { en: "New to Hello Chinese?", zh: "初次了解 Hello Chinese？" },
    bannerDescLine1: { en: "Experience a class, meet our teachers,", zh: "来上一节体验课，认识我们的老师，" },
    bannerDescLine2: { en: "and find the right level for your child.", zh: "为孩子找到合适的级别。" },

    step1: { en: "Parent / Guardian Information", zh: "家长／监护人信息" },
    parentName: { en: "Parent / Guardian Name", zh: "家长／监护人姓名" },
    parentNamePlaceholder: { en: "Enter full name", zh: "请输入姓名全称" },
    phone: { en: "Phone Number", zh: "联系电话" },
    phonePlaceholder: { en: "(555) 123-4567", zh: "(555) 123-4567" },
    email: { en: "Email Address", zh: "电子邮箱" },
    emailPlaceholder: { en: "name@example.com", zh: "name@example.com" },

    step2: { en: "Child Information", zh: "孩子信息" },
    childName: { en: "Child's Name", zh: "孩子姓名" },
    childNamePlaceholder: { en: "Enter child's name", zh: "请输入孩子姓名" },
    childAge: { en: "Child's Age", zh: "孩子年龄" },
    childAgePlaceholder: { en: "Enter age", zh: "请输入年龄" },
    experience: { en: "Chinese Learning Experience", zh: "中文学习经历" },
    experienceSelect: { en: "Select an option", zh: "请选择" },
    expNone: { en: "No prior Chinese learning experience", zh: "没有中文学习经历" },
    expUnder1: { en: "Less than 1 year", zh: "不到1年" },
    exp1to2: { en: "1–2 years", zh: "1–2年" },
    exp3plus: { en: "3+ years", zh: "3年以上" },

    step3: { en: "Trial Class Preference", zh: "体验课类型" },
    step3Question: { en: "What class would you like your child to try?", zh: "希望孩子体验哪一类课程？" },
    prefChinese: { en: "Chinese Class Trial", zh: "中文课体验" },
    prefTutoring: { en: "Chinese Class + Tutoring Trial", zh: "中文课 + 辅导体验" },

    step4: { en: "Math Interest", zh: "数学课意向" },
    step4Question: {
      en: "Are you also interested in Math Enrichment for your child?",
      zh: "您是否也考虑让孩子上数学思维拓展课？",
    },
    yes: { en: "Yes", zh: "是" },
    no: { en: "No", zh: "否" },
    mathNote: {
      en: "Math classes aren't directly bookable — our team follows up based on your child's information to determine whether a math class may be a good fit.",
      zh: "数学课暂不支持直接预约——我们的团队会根据孩子的情况与您沟通，判断数学课是否合适。",
    },

    step5: { en: "Select Your Trial Date", zh: "选择体验课日期" },
    dateCount: { en: "{n} of 1 trial date selected", zh: "已选择 {n} / 1 个体验课日期" },
    dateHint: { en: "Please select one Sunday for your child's trial class.", zh: "请为孩子的体验课选择一个周日。" },
    dateBlockedYct: { en: "YCT Test", zh: "YCT考试" },
    dateUnavailable: { en: "Unavailable", zh: "不可选" },
    dateLegend: {
      en: "Past, full, completed, or blocked dates are automatically disabled.",
      zh: "已过期、已满、已结束或不可选的日期会自动禁用。",
    },

    step6: { en: "Additional Notes", zh: "补充说明" },
    step6Question: { en: "Anything you would like us to know?", zh: "还有什么需要我们了解的吗？" },
    notesPlaceholder: {
      en: "Share your child's goals, learning needs, or anything else you would like us to know.",
      zh: "可以告诉我们孩子的学习目标、需求，或任何您希望我们了解的信息。",
    },

    callout: {
      en: "Once we receive your information, our team will contact you promptly to confirm and schedule a trial class based on your selected date.",
      zh: "收到您的信息后，我们的团队会尽快与您联系，根据您选择的日期确认并安排体验课。",
    },
    submit: { en: "Submit Trial Request", zh: "提交体验课申请" },
    sending: { en: "Sending…", zh: "提交中…" },

    warnParent: { en: "Please complete the parent / guardian fields.", zh: "请填写完整的家长／监护人信息。" },
    warnChild: { en: "Please complete your child's information.", zh: "请填写完整的孩子信息。" },
    warnDate: { en: "Please select one trial date.", zh: "请选择一个体验课日期。" },
    warnSend: {
      en: "Something went wrong sending your request. Please try again.",
      zh: "提交时出现问题，请重试。",
    },

    confirmTitle: { en: "Request received, {name}.", zh: "已收到您的申请，{name}。" },
    confirmThere: { en: "there", zh: "您" },
    confirmDescPre: {
      en: "Our team will contact you promptly to confirm and schedule the trial class on",
      zh: "我们的团队会尽快与您联系，确认并安排体验课，日期为",
    },
    confirmChild: { en: "Child:", zh: "孩子：" },
    confirmChildAge: { en: "{name}, age {age}", zh: "{name}，{age}岁" },
    confirmTrial: { en: "Trial:", zh: "体验课：" },
    confirmMath: { en: "Math interest:", zh: "数学课意向：" },
    mathNotAnswered: { en: "Not answered", zh: "未填写" },
    submitAnother: { en: "Submit another request", zh: "再提交一份申请" },
    returnHome: { en: "Return home", zh: "返回首页" },
  },
  legal: {
    eyebrow: { en: "Legal", zh: "法律条款" },
    title: {
      en: "Terms of Service & Privacy Policy",
      zh: "服务条款与隐私政策",
    },
    effective: { en: "Effective Date: {date}", zh: "生效日期：{date}" },
    tocHead: { en: "On this page", zh: "本页内容" },
    partOne: { en: "Part I — Terms of Service", zh: "第一部分 — 服务条款" },
    partTwo: { en: "Part II — Privacy Policy", zh: "第二部分 — 隐私政策" },
    termsTab: { en: "Terms of Service", zh: "服务条款" },
    privacyTab: { en: "Privacy Policy", zh: "隐私政策" },
    agreement: {
      en: "By registering for a Hello Chinese weekend language learning program, the parent or legal guardian confirms that they have reviewed and agree to the Terms of Service and acknowledge the Privacy Policy.",
      zh: "为孩子报名 Hello Chinese 周末中文课程时，家长或法定监护人确认已阅读并同意《服务条款》，并已知悉《隐私政策》。",
    },
    contactHead: { en: "Contact", zh: "联系我们" },
    contactLead: { en: "Questions may be directed to:", zh: "如有疑问，请联系：" },
    contactLine: {
      en: "Questions may be directed to Hello Chinese, Washington, DC, United States —",
      zh: "如有疑问，请联系 Hello Chinese（美国华盛顿特区）——",
    },
    openFull: { en: "Open the full page", zh: "查看完整页面" },
    close: { en: "Close", zh: "关闭" },
    agree: { en: "I agree", zh: "我同意" },
  },

footer: {
    tagline: { en: "Meet the World Through Chinese.", zh: "从你好开始，与世界相见" },
    youtube: { en: "Hello Chinese on YouTube", zh: "Hello Chinese 的 YouTube 频道" },

    exploreHead: { en: "Explore", zh: "浏览" },
    linkPrograms: { en: "Programs", zh: "课程总览" },
    linkTrial: { en: "Book a Free Trial", zh: "预约免费试听" },
    linkContact: { en: "Contact Us", zh: "联系我们" },
    linkTerms: { en: "Terms & Privacy", zh: "条款与隐私" },

    programsHead: { en: "Programs", zh: "课程" },
    linkSunday: { en: "Sunday Programs", zh: "周日课程" },
    linkSaturday: { en: "Saturday Programs", zh: "周六课程" },
    linkPrivate: { en: "Private Lessons", zh: "一对一私教课" },

    contactHead: { en: "Contact", zh: "联系方式" },
    rights: { en: "© 2026 Hello Chinese. All rights reserved.", zh: "© 2026 Hello Chinese 版权所有" },
  },
};
