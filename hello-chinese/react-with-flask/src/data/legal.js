// Single source of truth for the Terms of Service and Privacy Policy.
// Both the /Terms page and the modal on the registration review step render
// from these arrays, so the two can never drift apart.
//
// Every string is { en, zh }. The Chinese was translated by Claude and still
// wants a native-speaker pass before launch — legal wording carries more risk
// than UI copy. pick() also accepts a plain string, so a new item may be added
// in English first and translated later.

export const LEGAL_VERSION = "2026-08-16";
export const LEGAL_EFFECTIVE_DATE = "08/16/2026";

export const pick = (value, lang) =>
  typeof value === "string" ? value : (value[lang] ?? value.en);

export const LEGAL_SCOPE = {
  en: "These Terms of Service and Privacy Policy apply to the Hello Chinese website, registration process, and related programs.",
  zh: "本《服务条款》与《隐私政策》适用于 Hello Chinese 网站、报名流程及相关课程项目。",
};

export const LEGAL_AGREEMENT = {
  en: "By registering for a Hello Chinese weekend language learning program, the parent or legal guardian confirms that they have reviewed and agree to the Terms of Service and acknowledge the Privacy Policy below.",
  zh: "为孩子报名 Hello Chinese 周末中文课程时，家长或法定监护人确认已阅读并同意以下《服务条款》，并已知悉《隐私政策》。",
};

export const TERMS_SECTIONS = [
  {
    title: { en: "1. Enrollment", zh: "一、报名" },
    items: [
      {
        en: "Enrollment is subject to class availability, program capacity, and appropriate student placement.",
        zh: "报名须视班级名额、项目容量及合适的分班安排而定。",
      },
      {
        en: "Hello Chinese may recommend or adjust a student's class placement based on age, learning background, instructional needs, class size, and teacher assessment.",
        zh: "Hello Chinese 可根据学生年龄、学习背景、教学需要、班级人数及教师评估，建议或调整学生的分班。",
      },
      {
        en: "Registration is considered complete once the required registration information has been submitted and enrollment has been confirmed by Hello Chinese.",
        zh: "在所需报名信息提交完成、并经 Hello Chinese 确认后，报名即视为完成。",
      },
    ],
  },
  {
    title: {
      en: "2. Tuition, Dates & Program Information",
      zh: "二、学费、日期与项目信息",
    },
    items: [
      {
        en: "Tuition, available dates, program options, and applicable fees will be displayed or communicated as part of the enrollment process.",
        zh: "学费、可选日期、课程选项及相关费用，将在报名过程中显示或另行告知。",
      },
      {
        en: "The Hello Chinese website is used for program information and registration. Payments are not processed through the website.",
        zh: "Hello Chinese 网站用于提供项目信息与报名，付款不通过网站处理。",
      },
      {
        en: "Program schedules, instructors, class arrangements, locations, curriculum, or other program details may be adjusted when reasonably necessary. Families will be notified of significant changes when appropriate.",
        zh: "课程时间、授课教师、班级设置、上课地点、教学内容或其他项目细节，可在合理必要时进行调整。如有重要变更，我们会适时通知家庭。",
      },
    ],
  },
  {
    title: {
      en: "3. Absences, Credits & Make-Up Classes",
      zh: "三、缺课、课时补偿与补课",
    },
    items: [
      {
        en: "Families should notify Hello Chinese as early as possible when a student will be absent.",
        zh: "学生如需缺课，请尽早通知 Hello Chinese。",
      },
      {
        en: "Eligibility for credits, rescheduling, or make-up classes may vary by program and is subject to availability.",
        zh: "课时补偿、改期或补课的适用条件因项目而异，并视名额情况而定。",
      },
      {
        en: "Any specific cancellation, credit, or make-up policy communicated during registration will apply to that enrollment.",
        zh: "报名时告知的具体取消、课时补偿或补课政策，适用于该次报名。",
      },
      {
        en: "If Hello Chinese cancels a class, an appropriate alternative may be provided.",
        zh: "如 Hello Chinese 取消课程，我们会提供适当的替代安排。",
      },
    ],
  },
  {
    title: { en: "4. Student Information & Safety", zh: "四、学生信息与安全" },
    items: [
      {
        en: "Parents and guardians are responsible for providing accurate and relevant information necessary for their child's participation, including emergency contact information and any applicable allergy, accessibility, or other relevant information.",
        zh: "家长与监护人须提供孩子参加课程所需的准确且相关的信息，包括紧急联系人信息，以及适用的过敏、无障碍需求或其他相关信息。",
      },
      {
        en: "Families should notify Hello Chinese if important student information changes.",
        zh: "学生的重要信息如有变更，请通知 Hello Chinese。",
      },
    ],
  },
  {
    title: { en: "5. Photos & Videos", zh: "五、照片与视频" },
    items: [
      {
        en: "Photos and videos may be taken during classes, events, study tours, or other program activities.",
        zh: "我们可能在课堂、活动、游学或其他项目活动中拍摄照片与视频。",
      },
      {
        en: "Identifiable student photos or videos will be used for public-facing purposes in accordance with the media consent provided by the parent or guardian.",
        zh: "可识别学生身份的照片或视频，将按家长或监护人所提供的媒体授权，用于对外公开用途。",
      },
      {
        en: "Families may contact Hello Chinese to update their preferences regarding future use.",
        zh: "家庭可联系 Hello Chinese，更新今后使用方面的意愿。",
      },
    ],
  },
  {
    title: { en: "6. Website Registration", zh: "六、网站报名" },
    items: [
      {
        en: "The Hello Chinese website is intended to provide program information and allow families to submit registration information.",
        zh: "Hello Chinese 网站旨在提供项目信息，并供家庭提交报名信息。",
      },
      {
        en: "Parents and guardians are responsible for providing accurate information when completing registration.",
        zh: "家长与监护人须在填写报名时提供准确信息。",
      },
      {
        en: "Program information, availability, dates, and registration options may be updated from time to time.",
        zh: "项目信息、名额、日期与报名选项可能不时更新。",
      },
    ],
  },
];

export const PRIVACY_SECTIONS = [
  {
    title: { en: "1. Information We Collect", zh: "一、我们收集的信息" },
    lead: {
      en: "We collect information reasonably necessary for registration and program administration, which may include:",
      zh: "我们收集报名与项目管理所合理需要的信息，可能包括：",
    },
    items: [
      {
        en: "Parent or guardian name and contact information",
        zh: "家长或监护人的姓名与联系方式",
      },
      {
        en: "Student name, date of birth, age, or grade",
        zh: "学生姓名、出生日期、年龄或年级",
      },
      {
        en: "School or language-learning background",
        zh: "就读学校或中文学习背景",
      },
      { en: "Selected programs and class dates", zh: "所选课程与上课日期" },
      {
        en: "Information voluntarily provided by families regarding learning needs or goals",
        zh: "家庭自愿提供的学习需求或学习目标信息",
      },
      {
        en: "Emergency, allergy, or other relevant student information",
        zh: "紧急联系、过敏或其他相关的学生信息",
      },
      {
        en: "Photo and video consent preferences",
        zh: "照片与视频的授权意愿",
      },
      { en: "Program-related communications", zh: "与项目相关的沟通记录" },
    ],
    note: {
      en: "Registration is intended to be completed by a parent or legal guardian.",
      zh: "报名应由家长或法定监护人完成。",
    },
  },
  {
    title: { en: "2. How We Use Information", zh: "二、我们如何使用信息" },
    items: [
      {
        en: "Information provided through registration is used for Hello Chinese internal program purposes, including registration, class organization, student placement, family communication, instruction, scheduling, attendance, student support, and safety.",
        zh: "通过报名提供的信息，用于 Hello Chinese 的内部项目用途，包括报名、班级组织、学生分班、家庭沟通、教学、排课、出勤、学生支持与安全。",
      },
      {
        en: "Personal information is not sold or used for unrelated commercial purposes.",
        zh: "个人信息不会被出售，也不会用于无关的商业用途。",
      },
    ],
  },
  {
    title: { en: "3. Children's Information", zh: "三、儿童信息" },
    items: [
      {
        en: "Information relating to children is intended to be provided by a parent or legal guardian.",
        zh: "与儿童有关的信息应由家长或法定监护人提供。",
      },
      {
        en: "Children are not intended to independently create accounts or register themselves through the Hello Chinese website.",
        zh: "儿童不应自行在 Hello Chinese 网站创建账户或独立报名。",
      },
      {
        en: "Parents and guardians may contact Hello Chinese regarding their child's information.",
        zh: "家长与监护人可联系 Hello Chinese，咨询其孩子的信息。",
      },
    ],
  },
  {
    title: { en: "4. Information Storage & Privacy", zh: "四、信息存储与隐私" },
    items: [
      {
        en: "Registration information is maintained for internal program and administrative purposes.",
        zh: "报名信息因内部项目与行政管理目的而保存。",
      },
      {
        en: "Access to student and family information is limited to Hello Chinese team members who reasonably need the information for program operations.",
        zh: "学生与家庭信息的访问权限，仅限于因项目运营而合理需要了解这些信息的 Hello Chinese 团队成员。",
      },
      {
        en: "We take reasonable measures to protect personal information from unauthorized access, use, or disclosure.",
        zh: "我们采取合理措施保护个人信息，防止未经授权的访问、使用或披露。",
      },
      {
        en: "Information is retained only for as long as reasonably necessary for program, administrative, safety, or recordkeeping purposes.",
        zh: "信息的保存期限，仅为项目、行政、安全或存档记录所合理需要的时间。",
      },
    ],
  },
  {
    title: { en: "5. Parent & Guardian Requests", zh: "五、家长与监护人的请求" },
    items: [
      {
        en: "Parents and guardians may contact Hello Chinese to request reasonable access to, correction of, updating of, or deletion of information they have provided.",
        zh: "家长与监护人可联系 Hello Chinese，合理请求查阅、更正、更新或删除其所提供的信息。",
      },
      {
        en: "Families may also contact us to update photo and video consent preferences.",
        zh: "家庭也可联系我们，更新照片与视频的授权意愿。",
      },
    ],
  },
  {
    title: { en: "6. Updates & Contact", zh: "六、更新与联系方式" },
    items: [
      {
        en: "These Terms of Service and Privacy Policy may be updated as our programs, registration process, or website change.",
        zh: "随着课程项目、报名流程或网站的变化，本《服务条款》与《隐私政策》可能会更新。",
      },
      {
        en: "The current version and effective date will be posted on the Hello Chinese website.",
        zh: "最新版本及其生效日期将公布在 Hello Chinese 网站上。",
      },
    ],
  },
];

export const LEGAL_CONTACT = {
  name: "Hello Chinese",
  address: { en: "Washington, DC, United States", zh: "美国华盛顿特区" },
  email: "hello.nihao.chinese@gmail.com",
};
