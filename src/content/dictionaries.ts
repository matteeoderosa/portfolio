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
    title: string;
    intro: string;
    ctaProjects: string;
    servicesTitle: string;
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
  archive: {
    title: string;
    lead: string;
    filterLabel: string;
    placeholder: string;
    groupCount: string;
    found: string;
    foundOne: string;
    none: string;
    code: string;
    codeAria: string;
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
  footer: { copyright: string; github: string; role: string };
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
    archive: "Esercizi",
    write: "Scrivimi",
  },
  home: {
    title: "Creo siti e applicazioni web su misura",
    intro:
      "Sono Matteo, sviluppatore web di Grosseto. Aiuto persone e piccole attività a portare online ciò che serve davvero, in modo semplice e curato.",
    ctaProjects: "Guarda i progetti",
    servicesTitle: "Cosa posso fare per te",
    services: [
      {
        title: "Un sito vetrina per la tua attività",
        text: "Una pagina chiara che dice chi sei, cosa fai e come trovarti, e che si legge bene anche da telefono.",
        items: [
          "Orari, indirizzo e contatti sempre a portata di mano",
          "Foto e descrizione di prodotti o servizi",
          "Veloce da aprire e semplice da tenere aggiornato",
          "Pronto per farsi trovare su Google",
        ],
      },
      {
        title: "Un'applicazione web fatta su misura",
        text: "Quando un programma già pronto non basta, costruisco lo strumento che serve proprio a te.",
        items: [
          "Accesso con il tuo account personale",
          "I tuoi dati salvati e sempre disponibili",
          "Funziona da computer e da telefono",
          "Cresce insieme alla tua attività",
        ],
      },
      {
        title: "Un gestionale per organizzare il tuo lavoro",
        text: "Clienti, appuntamenti, ordini o magazzino: tutto in un posto solo, al posto di fogli e quaderni.",
        items: [
          "Elenchi e ricerche per ritrovare tutto subito",
          "Prenotazioni e scadenze sotto controllo",
          "Meno carta e meno dati da ricopiare",
          "Pensato per chi lo usa ogni giorno",
        ],
      },
    ],
    featuredTitle: "Alcuni lavori",
    allProjects: "Tutti i progetti",
    aboutLink: "Leggi di più su di me",
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
    intro: "Sono Matteo, sviluppatore web di Grosseto.",
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
  archive: {
    title: "Esercizi",
    lead: "Esercizi di frontend puro: HTML, CSS e JavaScript senza librerie. Ognuno ha il suo codice sorgente su GitHub.",
    filterLabel: "Filtra gli esercizi",
    placeholder: "Per esempio: tabella, rubrica, timer",
    groupCount: "{n} esercizi",
    found: "{n} esercizi trovati.",
    foundOne: "1 esercizio trovato.",
    none: "Nessun esercizio trovato.",
    code: "Codice",
    codeAria: "Codice sorgente su GitHub: {title}",
  },
  cta: {
    text: "Hai un progetto in mente? Scrivimi, ti rispondo appena posso.",
    title: "Raccontami cosa ti serve",
    lead: "Scegli cosa ti serve e si apre l'email già scritta: aggiungi due righe e invia. Ti rispondo appena posso.",
    legend: "Cosa ti serve?",
    other: "Non lo so ancora, parliamone",
    send: "Scrivimi",
    mailSubject: "Dal sito: {choice}",
    mailBody: "Ciao Matteo,\n\nmi interessa: {choice}.\n\nEcco di cosa ho bisogno:\n",
  },
  footer: {
    copyright: "Tutti i diritti riservati.",
    github: "GitHub",
    role: "Sviluppatore web a Grosseto",
  },
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
    write: "Get in touch",
  },
  home: {
    title: "I build custom websites and web apps",
    intro:
      "I'm Matteo, a web developer from Grosseto. I help people and small businesses put online what they really need, with simplicity and care.",
    ctaProjects: "See my projects",
    servicesTitle: "What I can do for you",
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
  archive: {
    title: "Exercises",
    lead: "Plain frontend exercises: HTML, CSS and JavaScript with no libraries. Each one has its source code on GitHub.",
    filterLabel: "Filter the exercises",
    placeholder: "For example: table, address book, timer",
    groupCount: "{n} exercises",
    found: "{n} exercises found.",
    foundOne: "1 exercise found.",
    none: "No exercises found.",
    code: "Code",
    codeAria: "Source code on GitHub: {title}",
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
    role: "Web developer in Grosseto",
  },
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
