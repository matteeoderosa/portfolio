import type { Lang } from "@/lib/routes";

export type ProjectText = {
  name: string;
  summary: string;
  purpose: string;
  whatIDid: string;
};

export type Project = {
  slug: string;
  /** Live website: shown first, as the main action ("Visita il sito"). */
  siteUrl?: string;
  demoUrl?: string;
  repoUrl?: string;
  tech: string[];
  featured: boolean;
  /** Main project: listed first, under "Progetti principali". */
  main?: boolean;
  text: Record<Lang, ProjectText>;
  screenshot?: string;
};

export const projects: Project[] = [
  {
    slug: "pisa-running-club",
    screenshot: "/work/pisa-running-club.png",
    siteUrl: "https://pisarunningclub.it",
    tech: [],
    featured: true,
    main: true,
    text: {
      it: {
        name: "Pisa Running Club",
        summary: "Il sito del Running Club di Pisa: corse, eventi e come partecipare.",
        purpose:
          "Il sito spiega come funziona il club: decidiamo il punto di ritrovo, si corre piano e nessuno resta indietro. Elenca le prossime uscite, presenta gli altri sport del gruppo e i professionisti convenzionati, e permette di mettersi in contatto con questa realtà.",
        whatIDid: "Ho realizzato il sito del club da zero, utilizzando il nostro design system, loghi e nomi. Tutto ciò che vedi nel sito, l'ho realizzato personalmente.",
      },
      en: {
        name: "Pisa Running Club",
        summary: "The website of Pisa's running group: runs, events and how to join.",
        purpose:
          "It explains how the club works: we decide the meeting point, we run slowly and nobody is left behind. It lists the upcoming runs, presents the group's other sports and partner professionals, and lets you get in touch.",
        whatIDid: "I built the club's website from scratch, using our design system, logos and names. Everything you see on the site, I made personally.",
      },
    },
  },
  {
    slug: "gare-pisa-running-club",
    screenshot: "/work/gare-pisa-running-club.png",
    siteUrl: "https://gare.pisarunningclub.it",
    tech: [],
    featured: true,
    main: true,
    text: {
      it: {
        name: "Gare del Pisa Running Club",
        summary: "Il calendario condiviso delle gare podistiche.",
        purpose:
          "Un calendario condiviso delle gare podistiche, pensato per chi si prepara a una gara con il club. È collegato al sito principale del Pisa Running Club. Chiunque voglia può aggiungere una gara, e chiunque può consultarlo per sapere dove e quando si corre.",
        whatIDid: "Ho realizzato il sito da zero. Qualunque servizio è stato pensato e realizzato da me, in modo che fosse il più semplice possibile da utilizzare.",
      },
      en: {
        name: "Pisa Running Club races",
        summary: "The shared calendar of running races.",
        purpose:
          "A shared calendar of running races, made for anyone preparing for a race with the club. It is linked from the main Pisa Running Club website. Anyone can add a race, and anyone can browse it to find out where and when people run.",
        whatIDid: "I built the site from scratch. Every feature was designed and built by me, to make it as simple as possible to use.",
      },
    },
  },
  {
    slug: "to-do-list",
    screenshot: "/work/to-do-list.png",
    demoUrl: "https://todo.matteeoderosa.it",
    repoUrl: "https://github.com/derteo/todo-list-laravel",
    tech: ["Laravel", "React", "Docker"],
    featured: true,
    text: {
      it: {
        name: "To-Do List",
        summary: "Per tenere in ordine liste e note, con il tuo account personale.",
        purpose:
          "Accedi con il tuo account, crei le tue liste di cose da fare e le note che vuoi ricordare, e spunti ciò che hai già completato.",
        whatIDid:
          "Ho costruito sia la parte che gestisce account e dati, sia l'interfaccia che si usa dal browser, in maniera che fosse il più semplice possibile da utilizzare su ogni dispositivo.",
      },
      en: {
        name: "To-Do List",
        summary: "To keep your lists and notes in order, with your own account.",
        purpose:
          "You sign in to your own account, create lists of things to do and notes you want to remember, and tick off what is already done.",
        whatIDid:
          "I built both the part that handles accounts and data, and the interface you use in the browser, making it as simple as possible to use on every device.",
      },
    },
  },
  {
    slug: "pokereact",
    screenshot: "/work/pokereact.png",
    demoUrl: "https://poke.matteeoderosa.it",
    repoUrl: "https://github.com/derteo/pokeReact",
    tech: ["React", "Material UI", "PokéAPI"],
    featured: true,
    text: {
      it: {
        name: "PokèReact",
        summary: "Per sfogliare e cercare tutti i Pokémon del Pokédex.",
        purpose:
          "Puoi cercare un Pokémon per nome, filtrarli per tipo, scorrere le pagine e aprire la scheda con i dettagli, con tema chiaro o scuro.",
        whatIDid:
          "Ho creato l'intera interfaccia, che prende i dati dalle API pubbliche fornite da PokéAPI, in modo che fosse carino visivamente e facile da usare.",
      },
      en: {
        name: "PokèReact",
        summary: "To browse and search all the Pokémon of the Pokédex.",
        purpose:
          "You can search a Pokémon by name, filter them by type, flip through the pages and open a card with all the details, in light or dark theme.",
        whatIDid:
          "I created the whole interface, which gets its data from the public APIs provided by PokéAPI, so that it would look nice and be easy to use.",
      },
    },
  },
  {
    slug: "github-stats",
    screenshot: "/work/github-stats.png",
    demoUrl: "https://stats.matteeoderosa.it",
    repoUrl: "https://github.com/derteo/githubStatsReact",
    tech: ["React", "Material UI", "GitHub API"],
    featured: true,
    text: {
      it: {
        name: "GitHub Stats",
        summary: "Per capire a colpo d'occhio cosa è presente su un profilo GitHub.",
        purpose:
          "Scrivi il nome di una persona o di un'organizzazione e vedi i suoi progetti, i linguaggi usati e l'attività recente. Puoi anche confrontare due profili per vedere le differenze tra di essi.",
        whatIDid:
          "Ho costruito la pagina con grafici e schede, che legge i dati direttamente da GitHub utilizzando API pubbliche con un'interfaccia accattivante.",
      },
      en: {
        name: "GitHub Stats",
        summary: "To see at a glance what a GitHub profile is about.",
        purpose:
          "Type the name of a person or an organization and see their projects, the languages they use and their recent activity. You can also compare two profiles.",
        whatIDid:
          "I built the page with charts and cards, which reads its data straight from GitHub through public APIs, with an eye-catching interface.",
      },
    },
  },
];
