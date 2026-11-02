import type { Lang } from "@/lib/routes";

export type ProjectText = {
  name: string;
  summary: string;
  purpose: string;
  whatIDid: string;
};

export type Project = {
  slug: string;
  demoUrl: string;
  repoUrl: string;
  tech: string[];
  featured: boolean;
  text: Record<Lang, ProjectText>;
  screenshot?: string;
};

export const projects: Project[] = [
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
    slug: "utenti-post-commenti",
    demoUrl: "https://tabella.matteeoderosa.it",
    repoUrl: "https://github.com/derteo/users-posts-comments-node",
    tech: ["Node.js", "Express", "SQLite"],
    featured: true,
    text: {
      it: {
        name: "Utenti, post e commenti",
        summary: "Per gestire persone, articoli e commenti in un'unica pagina.",
        purpose:
          "Vedi utenti, post e commenti in tabelle chiare e puoi aggiungerli, cambiarli o toglierli direttamente da lì, senza cambiare pagina.",
        whatIDid:
          "Ho realizzato la pagina con le tabelle modificabili e il programma che conserva e aggiorna i dati.",
      },
      en: {
        name: "Users, posts and comments",
        summary: "To manage people, articles and comments on a single page.",
        purpose:
          "You see users, posts and comments in clear tables and can add, change or remove them right there, without leaving the page.",
        whatIDid:
          "I made the page with editable tables and the program that stores and updates the data.",
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
