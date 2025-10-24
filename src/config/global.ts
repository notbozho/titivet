type MenuItem = {
  name: string;
  href: string;
  hasChildren?: boolean | false;
  children?: MenuItem[];
};

const config = {
  //
  // Business settings
  //
  businessName: "Тити Вет",
  logo: {
    enabled: true,
    primary: "/images/titivet_logo.svg",
    secondary: "/images/titivet_logo.svg",
  },
  phone: "+359887813428",
  email: "hello@titivet.com",
  address: "гр.Игнатиево, ул. „Граф Игнатиев“ №3",
  workingHours: "Пон-Пет: 09:00-17:00 | Събота: 09:00-13:00",
  social: {
    linkedin: "https://linkedin.com/company/titivet",
    instagram: "https://instagram.com/titivet",
  },
  //
  //  SEO settings
  //
  seo: {
    defaultTitle: "Тити Вет - Ветеринарен кабинет, гр. Игнатиево",
    description:
      "We build fast, convertible, and beautiful websites with 95+ Lighthouse performance.",
    metaImage: "/images/og-image.png",
    siteUrl: "https://titivet.com",
  },
  googleTagManagerId: "GTM-XXXXXXX",
  //
  // Menu settings
  //
  navigation: [
    {
      name: "Начало",
      href: "/",
    },
    {
      name: "Услуги",
      href: "/#services",
    },
    {
      name: "За мен",
      href: "/#aboutme",
    },
    {
      name: "Кабинетът",
      href: "/#cabinet",
    },
    {
      name: "Контакти",
      href: "/#contact",
    },
  ] as MenuItem[],
  navigation_button: {
    enabled: true,
    name: "Запази час",
    href: "tel:" + "+359887813428",
  },
  //
  // Branding settings
  //
  colors: {
    default: {
      primary: "#5474AA",
      secondary: "#6091E3",
      body: "#ffffff",
      bodySecondary: "#F4F8FF",
      border: "#eaeaea",
      light: "#f5f5f5",
      dark: "#040404",
      text: "#444444",
      text_dark: "#040404",
      text_light: "#717171",
    },
  },
  fonts: {
    font_family: {
      primary: "Montserrat+Alternates:wght@300;400;500;600",
      primary_type: "sans-serif",
      secondary: "Pacifico:wght@300;400",
      secondary_type: "sans-serif",
    },
    font_size: {
      base: "16",
      scale: "1.2",
    },
  },
};

export default config;
