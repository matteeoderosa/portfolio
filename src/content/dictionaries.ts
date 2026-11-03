import type { Lang } from "@/lib/routes";

export type Dictionary = {
  nav: {
    home: string;
    projects: string;
    about: string;
    contact: string;
    write: string;
  };
  home: {
    title: string;
    intro: string;
    ctaProjects: string;
    servicesTitle: string;
    servicesProof: string;
    servicesProofLink: string;
    services: { title: string; text: string; items: string[] }[];
    featuredTitle: string;
    allProjects: string;
    aboutLink: string;
    contactInvite: string;
  };
  projects: {
    title: string;
    intro: string;
    viewProject: string;
    visit: string;
    mainTitle: string;
    otherTitle: string;
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
    instagramLabel: string;
    cvLabel: string;
    photoAlt: string;
  };
  cta: {
    text: string;
    title: string;
    lead: string;
    legend: string;
    other: string;
    send: string;
    mailSubject: string;
    mailBody: string;
  };
  footer: { copyright: string; github: string };
  a11y: {
    skip: string;
    navAria: string;
    themeDark: string;
    themeLight: string;
    switchLang: string;
    langUnavailable: string;
    lightbox: { open: string; close: string; prev: string; next: string; zoom: string; unzoom: string; of: string };
  };
};

const it: Dictionary = {
  nav: {
    home: "Home",
    projects: "Progetti",
    about: "Chi sono",
    contact: "Contatti",
    write: "Scrivimi",
  },
  home: {
    title: "Siti e WebApps su misura",
    intro:
      "Ciao! sono Matteo, sviluppatore web di Grosseto, a Pisa per motivi di studio. Aiuto persone e piccole attività a portare online ciò che serve davvero, in modo semplice e curato.",
    ctaProjects: "Guarda i progetti",
    servicesTitle: "Cosa posso fare per te",
    servicesProof: "Un esempio reale:",
    servicesProofLink: "il sito del Pisa Running Club, fatto da zero",
    services: [
      {
        title: "Un sito vetrina per la tua attività",
        text: "Una pagina chiara che spiega chi sei, cosa fai e come contattarti, che si legga piacevolmente da ogni dispositivo.",
        items: [
          "Titoli di studio, esperienze e contatti sempre a portata di mano",
          "Foto e descrizione di prodotti o servizi",
          "Veloce da aprire e semplice da tenere aggiornato",
          "Pronto per farsi trovare su ogni motore di ricerca",
        ],
      },
      {
        title: "Un'applicazione web su misura",
        text: "Quando non trovi un programma già pronto che faccia al caso tuo, costruisco io ciò che ti serve davvero.",
        items: [
          "Accesso con il tuo account personale",
          "I tuoi dati sempre sincronizzati e disponibili all'istante",
          "Funziona da ogni dispositivo, computer o telefono",
          "Cresce insieme alla tua attività",
        ],
      },
      {
        title: "Un gestionale per organizzare il tuo lavoro",
        text: "Clienti, appuntamenti, ordini o magazzino: tutto in un posto solo, sempre a portata di mano.",
        items: [
          "Elenchi e ricerche per ritrovare tutto subito",
          "Prenotazioni e scadenze sempre sotto controllo",
          "Meno carta e meno dati da ricopiare",
          "Pensato per chi lo usa ogni giorno",
        ],
      },
    ],
    featuredTitle: "Alcuni dei miei progetti",
    allProjects: "Tutti i progetti",
    aboutLink: "Leggi di più su chi sono",
    contactInvite: "Hai un'idea o un'esigenza? Scrivimi, ne parliamo per svilupparla insieme al meglio.",
  },
  projects: {
    title: "Progetti",
    intro: "Alcuni dei miei lavori a cui ho dedicato più cura.",
    viewProject: "Scopri di più sul progetto",
    visit: "Visita il sito",
    mainTitle: "Progetti principali",
    otherTitle: "Altri progetti minori",
    back: "Torna ai progetti",
    purposeTitle: "A cosa serve",
    whatIDidTitle: "Cosa ho creato",
    demo: "Vedi la demo",
    repo: "Vedi il codice",
    techTitle: "Tecnologie usate",
  },
  about: {
    title: "Chi sono",
    intro: "Ciao, mi chiamo Matteo, sono uno sviluppatore web.",
    paragraphs: [
      "Vivo a Grosseto e studio a Pisa. Mi piace trasformare un'idea in qualcosa che le persone possano usare davvero in maniera molto semplice.",
      "Lavoro volentieri con chi ha un'attività o un progetto in mente e vuole un sito o uno strumento fatto bene. Mi trovi sempre disponibile a parlare di software e a valutare una collaborazione.",
    ],
    interestsTitle: "Fuori dallo studio e dal lavoro",
    interests: ["Corsa", "Ciclismo", "Baseball"],
  },
  contact: {
    title: "Contatti",
    intro: "Scrivimi due righe sulla tua idea: rispondo il prima possibile :D",
    emailLabel: "Email",
    invite: "Sono sempre aperto a chiacchierare di software e a nuove collaborazioni.",
    phoneLabel: "Telefono",
    linkedinLabel: "LinkedIn",
    instagramLabel: "Instagram",
    cvLabel: "Scarica il CV",
    photoAlt: "Ritratto di Matteo De Rosa",
  },
  cta: {
    text: "Hai un progetto in mente? Scrivimi, ti rispondo il prima possibile.",
    title: "Raccontami la tua idea",
    lead: "Scegli cosa ti serve e si apre l'email già scritta: aggiungi due righe e invia. Ti rispondo il prima possibile.",
    legend: "Cosa ti serve?",
    other: "Non lo so ancora, parliamone",
    send: "Scrivimi",
    mailSubject: "Dal sito: {choice}",
    mailBody: "Ciao Matteo,\n\nmi interessa: {choice}.\n\nEcco di cosa ho bisogno:\n",
  },
  footer: {
    copyright: "Tutti i diritti riservati.",
    github: "GitHub",
  },
  a11y: {
    skip: "Vai al contenuto",
    navAria: "Principale",
    themeDark: "Tema scuro",
    themeLight: "Tema chiaro",
    switchLang: "Passa all'inglese",
    langUnavailable: "Questa pagina non è disponibile in inglese",
    lightbox: {
      open: "Ingrandisci",
      close: "Chiudi",
      prev: "Foto precedente",
      next: "Foto successiva",
      zoom: "Ingrandisci al 100%",
      unzoom: "Adatta allo schermo",
      of: "di",
    },
  },
};

const en: Dictionary = {
  nav: {
    home: "Home",
    projects: "Projects",
    about: "About",
    contact: "Contact",
    write: "Get in touch",
  },
  home: {
    title: "I build custom websites and web apps",
    intro:
      "I'm Matteo, a web developer from Grosseto. I help people and small businesses put online what they really need, with simplicity and care.",
    ctaProjects: "See my projects",
    servicesTitle: "What I can do for you",
    servicesProof: "A real example:",
    servicesProofLink: "the Pisa Running Club website, built from scratch",
    services: [
      {
        title: "A showcase website for your business",
        text: "One clear page that says who you are, what you do and how to find you, and reads well on a phone too.",
        items: [
          "Opening hours, address and contacts always at hand",
          "Photos and descriptions of your products or services",
          "Quick to open and easy to keep up to date",
          "Ready to be found on Google",
        ],
      },
      {
        title: "A custom-made web application",
        text: "When a ready-made program isn't enough, I build the tool that fits you exactly.",
        items: [
          "Sign in with your own account",
          "Your data saved and always available",
          "Works on a computer and on a phone",
          "Grows along with your business",
        ],
      },
      {
        title: "A tool to run your business",
        text: "Clients, appointments, orders or stock: everything in one place, instead of sheets and notebooks.",
        items: [
          "Lists and search to find anything at once",
          "Bookings and deadlines under control",
          "Less paper and less data to copy twice",
          "Made for people who use it every day",
        ],
      },
    ],
    featuredTitle: "Selected work",
    allProjects: "All projects",
    aboutLink: "Read more about me",
    contactInvite: "Have an idea or a need? Write to me, and we'll talk it over with no commitment.",
  },
  projects: {
    title: "Projects",
    intro: "A selection of the work I've put the most care into.",
    viewProject: "View the project",
    visit: "Visit the site",
    mainTitle: "Main projects",
    otherTitle: "Other projects",
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
    instagramLabel: "Instagram",
    cvLabel: "Download the CV",
    photoAlt: "Portrait of Matteo De Rosa",
  },
  cta: {
    text: "Have a project in mind? Write to me, I'll reply as soon as I can.",
    title: "Tell me what you need",
    lead: "Pick what you need and your email opens already written: add a couple of lines and send. I'll reply as soon as I can.",
    legend: "What do you need?",
    other: "I don't know yet, let's talk",
    send: "Get in touch",
    mailSubject: "From the site: {choice}",
    mailBody: "Hi Matteo,\n\nI'm interested in: {choice}.\n\nHere is what I need:\n",
  },
  footer: {
    copyright: "All rights reserved.",
    github: "GitHub",
  },
  a11y: {
    skip: "Skip to content",
    navAria: "Main",
    themeDark: "Dark theme",
    themeLight: "Light theme",
    switchLang: "Switch to Italian",
    langUnavailable: "This page is not available in Italian",
    lightbox: {
      open: "Enlarge",
      close: "Close",
      prev: "Previous photo",
      next: "Next photo",
      zoom: "Zoom to 100%",
      unzoom: "Fit to screen",
      of: "of",
    },
  },
};

export const dictionaries: Record<Lang, Dictionary> = { it, en };
