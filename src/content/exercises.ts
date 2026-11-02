export type Exercise = {
  /** Unique, 1-26 in the order of the old index. */
  n: number;
  /** Number as shown in the old index, e.g. "es. 2-bis" (numbering restarts per group). */
  label: string;
  group: "HTML" | "JavaScript";
  title: string;
  href: string;
  codeUrl: string;
};

// Parsed from the legacy ITSProdigi/pages/navigation.html. hrefs are root-absolute; render them through withBase.
export const exercises: Exercise[] = [
  { n: 1, label: "es. 1", group: "HTML", title: "Navigazione base tra file HTML in modo relativo", href: "/frontend/html/NavigazioneBase/tutto.html", codeUrl: "https://github.com/matteeoderosa/ITSProdigi/blob/main/frontend/html/NavigazioneBase/tutto.html" },
  { n: 2, label: "es. 2", group: "HTML", title: "Primo esercizio sulle tabelle", href: "/frontend/html/TabellaMacchine/tabelle.html", codeUrl: "https://github.com/matteeoderosa/ITSProdigi/blob/main/frontend/html/TabellaMacchine/tabelle.html" },
  { n: 3, label: "es. 2-bis", group: "HTML", title: "Classi e id nelle tabelle", href: "/frontend/html/TabellaMacchine/sottoes/esempio04_tabella.htm", codeUrl: "https://github.com/matteeoderosa/ITSProdigi/blob/main/frontend/html/TabellaMacchine/sottoes/esempio04_tabella.htm" },
  { n: 4, label: "es. 3", group: "HTML", title: "Colorazione a scacchiera di una tabella (nth-child)", href: "/frontend/html/TabellaPseudoClassi/scacchiera.html", codeUrl: "https://github.com/matteeoderosa/ITSProdigi/blob/main/frontend/html/TabellaPseudoClassi/scacchiera.html" },
  { n: 5, label: "es. 4", group: "HTML", title: "Colorazione su più tabelle", href: "/frontend/html/TabelleColorate/tavolapitagorica.html", codeUrl: "https://github.com/matteeoderosa/ITSProdigi/blob/main/frontend/html/TabelleColorate/tavolapitagorica.html" },
  { n: 6, label: "es. 5", group: "HTML", title: "Tabelle un po' più complesse", href: "/frontend/html/ClassiEId/table.html", codeUrl: "https://github.com/matteeoderosa/ITSProdigi/blob/main/frontend/html/ClassiEId/table.html" },
  { n: 7, label: "es. 6", group: "HTML", title: "Colorazione tabella in stile sudoku", href: "/frontend/html/Sudoku/04_sudoku.html", codeUrl: "https://github.com/matteeoderosa/ITSProdigi/blob/main/frontend/html/Sudoku/04_sudoku.html" },
  { n: 8, label: "es. 7", group: "HTML", title: "Form di base", href: "/frontend/html/BasicForm/index.html", codeUrl: "https://github.com/matteeoderosa/ITSProdigi/blob/main/frontend/html/BasicForm/index.html" },
  { n: 9, label: "es. 1", group: "JavaScript", title: "JavaScript di base (uso del console.log)", href: "/frontend/javascript/lezioni/PrimoEsempio/index.html", codeUrl: "https://github.com/matteeoderosa/ITSProdigi/blob/main/frontend/javascript/lezioni/PrimoEsempio/index.html" },
  { n: 10, label: "es. 2", group: "JavaScript", title: "Tipi di variabili", href: "/frontend/javascript/lezioni/Variabili/index.html", codeUrl: "https://github.com/matteeoderosa/ITSProdigi/blob/main/frontend/javascript/lezioni/Variabili/index.html" },
  { n: 11, label: "es. 3", group: "JavaScript", title: "Generazione random di codice HTML", href: "/frontend/javascript/lezioni/GiocoMonete/index.html", codeUrl: "https://github.com/matteeoderosa/ITSProdigi/blob/main/frontend/javascript/lezioni/GiocoMonete/index.html" },
  { n: 12, label: "es. 4", group: "JavaScript", title: "Calcolo giorno della settimana", href: "/frontend/javascript/lezioni/GiornoDellaSettimana/index.html", codeUrl: "https://github.com/matteeoderosa/ITSProdigi/blob/main/frontend/javascript/lezioni/GiornoDellaSettimana/index.html" },
  { n: 13, label: "es. 5", group: "JavaScript", title: "Calcolo giorno dell'anno", href: "/frontend/javascript/lezioni/GiornoDellAnno/index.html", codeUrl: "https://github.com/matteeoderosa/ITSProdigi/blob/main/frontend/javascript/lezioni/GiornoDellAnno/index.html" },
  { n: 14, label: "es. 6", group: "JavaScript", title: "Calcolo successione di Fibonacci", href: "/frontend/javascript/lezioni/Fibonacci/index.html", codeUrl: "https://github.com/matteeoderosa/ITSProdigi/blob/main/frontend/javascript/lezioni/Fibonacci/index.html" },
  { n: 15, label: "es. 7", group: "JavaScript", title: "Calcolo del fattoriale", href: "/frontend/javascript/lezioni/Fattoriale/index.html", codeUrl: "https://github.com/matteeoderosa/ITSProdigi/blob/main/frontend/javascript/lezioni/Fattoriale/index.html" },
  { n: 16, label: "es. 8", group: "JavaScript", title: "Semaforo random", href: "/frontend/javascript/esercizi/Semaforo/index.html", codeUrl: "https://github.com/matteeoderosa/ITSProdigi/blob/main/frontend/javascript/esercizi/Semaforo/index.html" },
  { n: 17, label: "es. 9", group: "JavaScript", title: "Somma con doppio bottone", href: "/frontend/javascript/esercizi/SommaDoppioBottone/index.html", codeUrl: "https://github.com/matteeoderosa/ITSProdigi/blob/main/frontend/javascript/esercizi/SommaDoppioBottone/index.html" },
  { n: 18, label: "es. 10", group: "JavaScript", title: "Nodi del DOM", href: "/frontend/javascript/lezioni/NodiDOM/index.html", codeUrl: "https://github.com/matteeoderosa/ITSProdigi/blob/main/frontend/javascript/lezioni/NodiDOM/index.html" },
  { n: 19, label: "es. 11", group: "JavaScript", title: "Selezione immagine al click", href: "/frontend/javascript/lezioni/CambioImmagine/index.html", codeUrl: "https://github.com/matteeoderosa/ITSProdigi/blob/main/frontend/javascript/lezioni/CambioImmagine/index.html" },
  { n: 20, label: "es. 12", group: "JavaScript", title: "Attributo mouse over", href: "/frontend/javascript/lezioni/MouseOver/index.html", codeUrl: "https://github.com/matteeoderosa/ITSProdigi/blob/main/frontend/javascript/lezioni/MouseOver/index.html" },
  { n: 21, label: "es. 13", group: "JavaScript", title: "Rubrica standard", href: "/frontend/javascript/lezioni/RubricaOggetti/index.html", codeUrl: "https://github.com/matteeoderosa/ITSProdigi/blob/main/frontend/javascript/lezioni/RubricaOggetti/index.html" },
  { n: 22, label: "es. 14", group: "JavaScript", title: "Rubrica avanzata (solo nel codice, stesso funzionamento)", href: "/frontend/javascript/esercizi/RubricaAvanzata/index.html", codeUrl: "https://github.com/matteeoderosa/ITSProdigi/blob/main/frontend/javascript/esercizi/RubricaAvanzata/index.html" },
  { n: 23, label: "es. 15", group: "JavaScript", title: "Timer (conto alla rovescia)", href: "/frontend/javascript/lezioni/Intervalli/index.html", codeUrl: "https://github.com/matteeoderosa/ITSProdigi/blob/main/frontend/javascript/lezioni/Intervalli/index.html" },
  { n: 24, label: "es. 16", group: "JavaScript", title: "Mouse over tra due immagini", href: "/frontend/javascript/esercizi/NewMouseOver/index.html", codeUrl: "https://github.com/matteeoderosa/ITSProdigi/blob/main/frontend/javascript/esercizi/NewMouseOver/index.html" },
  { n: 25, label: "es. 17", group: "JavaScript", title: "Tabella avanzata creata dal JavaScript", href: "/frontend/javascript/esercizi/CreazioneTabella/index.html", codeUrl: "https://github.com/matteeoderosa/ITSProdigi/blob/main/frontend/javascript/esercizi/CreazioneTabella/index.html" },
  { n: 26, label: "es. 18", group: "JavaScript", title: "Tabella avanzata con easter egg", href: "/frontend/javascript/esercizi/TabellaConBottone/index.html", codeUrl: "https://github.com/matteeoderosa/ITSProdigi/blob/main/frontend/javascript/esercizi/TabellaConBottone/index.html" },
];
