import type { Lang } from "@/lib/routes";

export type Dictionary = {
  nav: {
    home: string;
    projects: string;
    about: string;
    contact: string;
    archive: string;
    write: string;
  };
  home: {
    eyebrow: string;
    title: string;
    intro: string;
    ctaProjects: string;
    servicesTitle: string;
    services: string[];
    featuredTitle: string;
    contactInvite: string;
  };
  projects: {
    title: string;
    intro: string;
    viewProject: string;
    back: string;
    purposeTitle: string;
    whatIDidTitle: string;
    demo: string;
    repo: string;
    techTitle: string;
  };
  about: { title: string; intro: string; paragraphs: string[]; interestsTitle: string; interests: string[] };
  contact: {
    title: string;
    intro: string;
    emailLabel: string;
    invite: string;
    phoneLabel: string;
    linkedinLabel: string;
    cvLabel: string;
    photoAlt: string;
  };
  cta: { text: string };
  footer: { copyright: string; github: string };
  a11y: {
    skip: string;
    navAria: string;
    themeDark: string;
    themeLight: string;
    switchLang: string;
    langUnavailable: string;
  };
};

const it: Dictionary = {
  nav: {
    home: "Home",
    projects: "Progetti",
    about: "Chi sono",
    contact: "Contatti",
    archive: "Archivio",
    write: "Scrivimi",
  },
  home: {
    eyebrow: "WEB APP DEVELOPER · PISA",
    title: "Creo siti e applicazioni web su misura",
    intro:
      "Mi chiamo Matteo e aiuto persone e piccole attività a portare online ciò che serve davvero, in modo semplice e curato.",
    ctaProjects: "Guarda i progetti",
    servicesTitle: "Cosa posso fare per te",
    services: [
      "Un sito vetrina per la tua attività",
      "Un'applicazione web fatta su misura",
      "Un gestionale per organizzare il tuo lavoro",
    ],
    featuredTitle: "Alcuni lavori",
    contactInvite: "Hai un'idea o un'esigenza? Scrivimi, ne parliamo senza impegno.",
  },
  projects: {
    title: "Progetti",
    intro: "Una selezione dei lavori a cui ho dedicato più cura.",
    viewProject: "Scopri il progetto",
    back: "Tutti i progetti",
    purposeTitle: "A cosa serve",
    whatIDidTitle: "Cosa ho fatto",
    demo: "Vedi la demo",
    repo: "Vedi il codice",
    techTitle: "Tecnologie usate",
  },
  about: {
    title: "Chi sono",
    intro: "Sono Matteo, sviluppo web di Grosseto.",
    paragraphs: [
      "Vivo a Grosseto e studio a Pisa. Mi piace trasformare un'idea in qualcosa che le persone possano usare davvero, senza complicazioni.",
      "Lavoro volentieri con chi ha un'attività o un progetto e vuole un sito o uno strumento fatto bene. Mi trovi sempre disponibile a parlare di software e a valutare una collaborazione.",
    ],
    interestsTitle: "Fuori dallo schermo",
    interests: ["Baseball", "Ciclismo", "Corsa"],
  },
  contact: {
    title: "Contatti",
    intro: "Scrivimi due righe: ti rispondo appena posso.",
    emailLabel: "Email",
    invite: "Sono aperto a chiacchierare di software e a nuove collaborazioni.",
    phoneLabel: "Telefono",
    linkedinLabel: "LinkedIn",
    cvLabel: "Scarica il CV",
    photoAlt: "Ritratto di Matteo De Rosa",
  },
  cta: { text: "Hai un progetto in mente? Scrivimi, ti rispondo appena posso." },
  footer: { copyright: "Tutti i diritti riservati.", github: "GitHub" },
  a11y: {
    skip: "Vai al contenuto",
    navAria: "Principale",
    themeDark: "Tema scuro",
    themeLight: "Tema chiaro",
    switchLang: "Passa all'inglese",
    langUnavailable: "Questa pagina non è disponibile in inglese",
  },
};

const en: Dictionary = {
  nav: {
    home: "Home",
    projects: "Projects",
    about: "About",
    contact: "Contact",
    archive: "Archive",
    write: "Write me",
  },
  home: {
    eyebrow: "WEB APP DEVELOPER · PISA",
    title: "I build custom websites and web applications",
    intro:
      "I'm Matteo, and I help people and small businesses put online what they really need, in a simple and careful way.",
    ctaProjects: "See my projects",
    servicesTitle: "What I can do for you",
    services: [
      "A showcase website for your business",
      "A custom-made web application",
      "A management tool to organize your work",
    ],
    featuredTitle: "Selected work",
    contactInvite: "Have an idea or a need? Write to me, and we'll talk it over with no commitment.",
  },
  projects: {
    title: "Projects",
    intro: "A selection of the work I've put the most care into.",
    viewProject: "View the project",
    back: "All projects",
    purposeTitle: "What it is for",
    whatIDidTitle: "What I did",
    demo: "See the demo",
    repo: "See the code",
    techTitle: "Technologies used",
  },
  about: {
    title: "About",
    intro: "I'm Matteo, a web developer from Grosseto.",
    paragraphs: [
      "I live in Grosseto and study in Pisa. I like turning an idea into something people can actually use, without the fuss.",
      "I enjoy working with anyone who has a business or a project and wants a website or a tool done well. I'm always happy to talk about software and to explore a collaboration.",
    ],
    interestsTitle: "Away from the screen",
    interests: ["Baseball", "Cycling", "Running"],
  },
  contact: {
    title: "Contact",
    intro: "Drop me a few lines: I'll reply as soon as I can.",
    emailLabel: "Email",
    invite: "I'm open to chatting about software and to new collaborations.",
    phoneLabel: "Phone",
    linkedinLabel: "LinkedIn",
    cvLabel: "Download the CV",
    photoAlt: "Portrait of Matteo De Rosa",
  },
  cta: { text: "Have a project in mind? Write to me, I'll reply as soon as I can." },
  footer: { copyright: "All rights reserved.", github: "GitHub" },
  a11y: {
    skip: "Skip to content",
    navAria: "Main",
    themeDark: "Dark theme",
    themeLight: "Light theme",
    switchLang: "Switch to Italian",
    langUnavailable: "This page is not available in Italian",
  },
};

export const dictionaries: Record<Lang, Dictionary> = { it, en };
