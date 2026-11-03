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
    siteUrl: "https://pisarunningclub.it",
    tech: [],
    featured: true,
    main: true,
    text: {
      it: {
        name: "Pisa Running Club",
        summary: "Il sito del gruppo di corsa di Pisa: uscite, eventi e come partecipare.",
        purpose:
          "Spiega come funziona il club: ci si trova in piazza Cairoli, si corre piano e nessuno resta indietro. Elenca le prossime uscite, presenta gli altri sport del gruppo e i professionisti convenzionati, e permette di mettersi in contatto.",
        whatIDid: "Ho realizzato il sito del club.",
      },
      en: {
        name: "Pisa Running Club",
        summary: "The website of Pisa's running group: runs, events and how to join.",
        purpose:
          "It explains how the club works: we meet in Piazza Cairoli, we run slowly and nobody is left behind. It lists the upcoming runs, presents the group's other sports and partner professionals, and lets you get in touch.",
        whatIDid: "I built the club's website.",
      },
    },
  },
  {
    slug: "gare-pisa-running-club",
    siteUrl: "https://gare.pisarunningclub.it",
    tech: [],
    featured: true,
    main: true,
    text: {
      it: {
        name: "Gare del Pisa Running Club",
        summary: "Il calendario condiviso delle gare podistiche.",
        purpose:
          "Un calendario condiviso delle gare podistiche, pensato per chi si prepara a una gara con il club. È collegato al sito principale del Pisa Running Club.",
        whatIDid: "Ho realizzato il sito del calendario.",
      },
      en: {
        name: "Pisa Running Club races",
        summary: "The shared calendar of running races.",
        purpose:
          "A shared calendar of running races, made for anyone preparing for a race with the club. It is linked from the main Pisa Running Club website.",
        whatIDid: "I built the calendar website.",
      },
    },
  },
  {
    slug: "to-do-list",
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
          "Ho costruito sia la parte che gestisce account e dati, sia l'interfaccia che si usa dal browser.",
      },
      en: {
        name: "To-Do List",
        summary: "To keep your lists and notes in order, with your own account.",
        purpose:
          "You sign in to your own account, create lists of things to do and notes you want to remember, and tick off what is already done.",
        whatIDid:
          "I built both the part that handles accounts and data, and the interface you use in the browser.",
      },
    },
  },
  {
    slug: "pokereact",
    demoUrl: "https://poke.matteeoderosa.it",
    repoUrl: "https://github.com/derteo/pokeReact",
    tech: ["React", "Material UI", "PokéAPI"],
    featured: true,
    text: {
      it: {
        name: "PokèReact",
        summary: "Per sfogliare e cercare tutti i Pokémon.",
        purpose:
          "Puoi cercare un Pokémon per nome, filtrarli per tipo, scorrere le pagine e aprire la scheda con i dettagli, di giorno o con il tema scuro.",
        whatIDid:
          "Ho creato l'intera interfaccia, che prende i dati da una raccolta pubblica online di Pokémon.",
      },
      en: {
        name: "PokèReact",
        summary: "To browse and search all the Pokémon.",
        purpose:
          "You can search a Pokémon by name, filter them by type, flip through the pages and open a card with all the details, in light or dark theme.",
        whatIDid:
          "I created the whole interface, which gets its data from a public online collection of Pokémon.",
      },
    },
  },
  {
    slug: "github-stats",
    demoUrl: "https://stats.matteeoderosa.it",
    repoUrl: "https://github.com/derteo/githubStatsReact",
    tech: ["React", "Material UI", "GitHub API"],
    featured: true,
    text: {
      it: {
        name: "GitHub Stats",
        summary: "Per capire a colpo d'occhio cosa fa un profilo GitHub.",
        purpose:
          "Scrivi il nome di una persona o di un'organizzazione e vedi i suoi progetti, i linguaggi usati e l'attività recente. Puoi anche confrontare due profili.",
        whatIDid:
          "Ho costruito la pagina con grafici e schede, che legge i dati direttamente da GitHub.",
      },
      en: {
        name: "GitHub Stats",
        summary: "To see at a glance what a GitHub profile is about.",
        purpose:
          "Type the name of a person or an organization and see their projects, the languages they use and their recent activity. You can also compare two profiles.",
        whatIDid:
          "I built the page with charts and cards, which reads its data straight from GitHub.",
      },
    },
  },
];
