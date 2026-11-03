# Portfolio di Matteo De Rosa: documento di progetto

Data: 2026-11-02. Stato: in attesa di approvazione.

## Intenzione e perché

Matteo De Rosa ha oggi due siti che si sovrappongono:

- `derteo.github.io`: tema terminale scuro (monospace, verde `#3fc427`, logo `{m}`), pagine about / skills / projects / contact. Buon contenuto personale, base tecnica debole (HTML copiato su 4 pagine, titoli identici, favicon e immagine social rotte, niente sitemap, 404 o canonical).
- `ITSProdigi` (servito su `matteeoderosa.it`): tema chiaro/scuro pulito (Instrument Sans e Instrument Serif ospitati in locale), SEO e accessibilità curate, 404, sitemap. Ma niente presentazione personale né contatti, e 26 esercizi di corso mescolati ai progetti veri.

Serve **un solo sito, una vetrina professionale**, nel nuovo repo `portfolio` e sul nuovo dominio `matteoderosa.it` (già acquistato da Matteo su Register.it). Il pubblico è **principalmente non tecnico**: deve capire subito cosa Matteo sa fare e come contattarlo, senza tecnicismi.

## Obiettivi

1. In pochi secondi un visitatore non tecnico capisce cosa fa Matteo e come scrivergli.
2. Aspetto professionale, curato, veloce, accessibile, con tema chiaro e scuro.
3. Italiano di default; versione inglese completa, raggiungibile con un selettore.
4. Un solo sito mantenibile da Matteo: testi modificabili senza toccare il codice dei componenti.
5. Migrazione senza rompere i link già in giro (esercizi, progetti, sottodomini).

## Non-obiettivi

Blog, form di contatto con server, analytics, CMS, area riservata, e-commerce.

## Anti-obiettivi (sarebbe un fallimento anche se funziona)

- Gergo tecnico nella prima schermata ("craftsman", "full stack", nomi di framework come titolo).
- Un sito che sembra un terminale e confonde un visitatore non tecnico.
- Link vecchi che danno 404 dopo la migrazione.
- Traduzione inglese parziale o con testi sparsi nel codice.

## Decisioni di Matteo

- Repo `portfolio` sull'account GitHub `matteeoderosa`, pubblico, branch `main`. Nessuna licenza per ora.
- Stack: **Next.js con export statico** (React), ospitato su GitHub Pages. Niente Angular.
- Dominio principale: `matteoderosa.it` (una sola "e"). Il vecchio `matteeoderosa.it` (due "e") resta attivo per i sottodomini `todo.`, `tabella.`, `poke.`, `stats.` e diventa redirect solo per il sito principale.
- Stile: **direzione C "Ibrido"** scelta nelle bozze. Base pulita di ITSProdigi (chiaro/scuro, Instrument Sans per il testo, Instrument Serif per i titoli grandi). Dal sito terminale restano solo: verde come accento, monospace per etichette e tag tecnologici, logo `{m}`.
- Lingua: italiano di default; selettore in alto a destra accanto al tema, con bandierina.
- Pubblico non tecnico: testi in italiano semplice, progetti raccontati dal punto di vista di chi li usa, tecnologie come dettaglio piccolo, pulsante "Scrivimi" sempre visibile.

## Pagine

- **Home:** titolo che dice cosa fa per le persone, una riga di presentazione, pulsante "Guarda i progetti", sezione "Cosa posso fare per te" (3 o 4 voci), 3 o 4 progetti in evidenza, invito a scrivere.
- **Progetti** (elenco) e **una pagina per progetto:** a cosa serve, cosa ha fatto Matteo, screenshot, link demo e repo, tecnologie in piccolo.
- **Chi sono:** breve e umano (Grosseto, studio a Pisa, baseball, ciclismo, corsa).
- **Contatti:** email `@matteoderosa.it`, GitHub. LinkedIn solo se Matteo lo fornisce.
- **Archivio:** i 26 esercizi del corso, sezione secondaria, solo in italiano. Le cartelle `frontend/` e `pages/navigation.html` di ITSProdigi si copiano **così come sono** in `public/` (sono HTML puro con i loro asset relativi), quindi gli URL pubblici di oggi (`/frontend/...`, `/pages/navigation.html`) restano identici e non servono redirect. La pagina indice dell'archivio viene riscritta nel nuovo stile, tenendo il filtro di ricerca.
- **404**, `sitemap.xml`, `robots.txt`, favicon e apple-touch-icon, immagine di anteprima social per pagina, dati strutturati Person.

Materiale di partenza, in locale, nella cartella `matteo-sito/` accanto al repo: `derteo.github.io` (testi personali, tema terminale) e `ITSProdigi` (font, favicon, immagine social, esercizi, struttura SEO). Progetti veri da mostrare: To-Do List, Utenti/post/commenti, PokèReact, GitHub Stats. "Sito personale" (che oggi è elencato come progetto) non va tra i progetti. Gli altri contenuti di ITSProdigi sono esercizi del corso e vanno nell'Archivio. Le tecnologie di ogni progetto vanno verificate sui repo dei progetti prima di scriverle (i due siti vecchi si contraddicono: To-Do con interfaccia React o JS puro, Utenti/post con MySQL o SQLite).

## Lingue

- Italiano alla radice (`/`), inglese sotto `/en`. L'i18n integrato di Next.js non funziona con l'export statico, quindi si costruisce con una cartella per lingua.
- Tutti i testi in due dizionari (italiano e inglese), non dentro i componenti.
- Il selettore mostra bandierina più sigla "IT"/"EN" (la bandiera sola è ambigua e non accessibile).
- La scelta si ricorda solo come preferenza: nessun redirect automatico da `/` a `/en`, che rovinerebbe SEO e Lighthouse. Dichiara le due versioni a Google con `hreflang` e canonical.
- `/en` replica tutte le pagine tranne l'Archivio, che resta solo italiano.

## Vincoli

- Hosting gratuito su GitHub Pages: niente codice server.
- Il repo deve essere pubblico (Pages su account gratuito).
- Il DNS (Register.it) si tocca solo quando il sito è pronto.
- Prestazioni: obiettivo Lighthouse 95+ in tutte le categorie; funziona bene su telefono.
- Accessibilità: link "vai al contenuto", contrasto sufficiente in chiaro e scuro, rispetto di `prefers-reduced-motion`, navigazione da tastiera.

## Messa online, in ordine

1. Costruire e pubblicare su `matteeoderosa.github.io/portfolio` (provvisorio).
2. Quando Matteo approva: `CNAME` per `matteoderosa.it` e record DNS (A di GitHub Pages e CNAME per `www`) nel pannello Register.it. Rimuovere `CNAME` dal branch `gh-pages` di ITSProdigi.
3. Casella email `info@matteoderosa.it` dal pannello Register.it (può essere fatta subito, indipendente).
4. `matteeoderosa.it` (due "e"): la home diventa un redirect verso il nuovo dominio; i sottodomini restano.
5. `derteo.github.io`: solo un `index.html` con meta refresh, canonical e JS verso il nuovo sito.
6. Archiviare ITSProdigi su GitHub, senza cancellarlo.
7. Per ultimo: ricreare i sottodomini sul nuovo dominio con redirect permanenti dai vecchi, e correggere i link `http://` in `https://`.

## Cosa è incluso nel lavoro e cosa fa Matteo

- **Nel lavoro di costruzione:** il sito, il file `CNAME`, la pagina di redirect per `matteeoderosa.it` e lo stub `index.html` per `derteo.github.io`, e l'elenco esatto dei record DNS.
- **Lo fa Matteo:** il pannello DNS e le caselle email su Register.it, la rimozione del `CNAME` da ITSProdigi e il suo archivio su GitHub, il push dello stub su `derteo.github.io`. La casella `info@matteoderosa.it` va creata prima di andare online.

## A discrezione del costruttore

Struttura delle cartelle, libreria di stile (CSS Modules o CSS semplice, senza framework pesanti), come generare le immagini social, come gestire gli screenshot dei progetti, testi definitivi (bozze da rifinire con Matteo), scelta delle voci di "Cosa posso fare per te" (proposte: sito vetrina, applicazione web su misura, gestionale per un'attività), strumenti per controllare i link rotti.

## Scelte fatte da Claude (Matteo può cambiarle)

- Titolo home in bozza: "Creo siti e applicazioni web su misura".
- Sigla accanto alla bandierina; nessun redirect automatico di lingua; Archivio solo italiano.
- Esercizi copiati identici in `public/`, senza redirect.
- Pubblicazione provvisoria: il percorso base (`/portfolio`) e l'indirizzo del sito sono variabili di build, quindi lo stesso codice serve sia `matteeoderosa.github.io/portfolio` (con `noindex`) sia `matteoderosa.it` alla radice. Canonical e sitemap puntano a `matteoderosa.it` solo nella build finale.
- I link demo dei progetti usano i sottodomini attuali di `matteeoderosa.it`; sono un solo campo dati per progetto, da aggiornare all'ultimo passo.
- Senza telefono, LinkedIn, CV e foto per ora: ognuno è un campo dati che compare solo quando viene compilato.
- Voci di "Cosa posso fare per te".
- Il documento sta in `matteo-sito/`; va spostato in `docs/superpowers/specs/` del repo `portfolio` appena è clonato.

## Aperto, da chiedere a Matteo

- Telefono o WhatsApp tra i contatti? LinkedIn?
- CV in PDF: lo fornisce lui o ne parliamo dopo?
- Foto di Matteo: sì o no?
- Screenshot per ogni progetto: li facciamo noi dai siti online.

## Aggiornamento del 2026-11-03: nuova direzione grafica

La direzione C "Ibrido" (verde, Instrument Sans/Serif, logo `{m}`, card con bordo) è stata sostituita perché risultava generica e senza immagini. Il contenuto, le pagine, le due lingue, la struttura dei dati e i link restano gli stessi.

- **Idea:** metà schermo resta ferma (per ora un campo di colore), l'altra metà scorre.
- **Aspetto:** noce e sabbia (tema scuro di default, tema chiaro in osso e noce), Bodoni Moda per i titoli, Jost per il testo, ospitati in locale. Niente monospace, linee sottili, ombre, sfumature o card.
- **Immagini:** per ora nessuna fotografia. La colonna ferma è un campo a tono e le foto aperte di Grosseto provate in una prima versione sono state tolte (e con loro i crediti).
- **Cosa viva:** nella chiusura della home e in Contatti, scegliere "cosa ti serve" scrive l'email già pronta (`mailto:`), senza server.
- **Da fare quando ci sono:** screenshot dei progetti e foto di Matteo nella colonna ferma.

## Aggiornamento: tolta la sezione Esercizi

Il sito ha solo Home, Progetti, Chi sono e Contatti. Sono stati rimossi la pagina `/archivio/`, il filtro, l'elenco dei 26 esercizi e le copie dei file in `public/frontend/` e `public/pages/`. I vecchi indirizzi `/frontend/...` e `/pages/navigation.html` ora danno la pagina 404; gli esercizi restano nel repository ITSProdigi.
