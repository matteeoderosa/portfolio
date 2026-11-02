# Messa online: cosa fare, in ordine

Guida per Matteo. Segui i passi nell'ordine. Ogni passo dice dove cliccare, cosa devi vedere quando funziona e come tornare indietro.

Nomi da non confondere:
- `matteoderosa.it` (una "e") = il dominio NUOVO, quello del portfolio.
- `matteeoderosa.it` (due "e") = il dominio VECCHIO, che oggi mostra ITSProdigi e ha i sottodomini `todo.`, `tabella.`, `poke.`, `stats.`.

## 1. Casella email `ciao@matteoderosa.it` (si può fare subito)

- Dove: pannello Register.it, dominio `matteoderosa.it`, sezione Email, "Crea casella".
- Crea `ciao@matteoderosa.it` (hai 3 caselle a disposizione).
- Funziona se: puoi accedere alla webmail e ricevere un messaggio di prova.
- Annullare: elimina la casella dallo stesso pannello.

## 2. Attiva GitHub Pages e controlla il sito provvisorio

- Dove: GitHub, repo `matteeoderosa/portfolio`, Settings, Pages, "Build and deployment", Source = **GitHub Actions**.
- Poi lancia il workflow da Actions ("Deploy to GitHub Pages", Run workflow) o fai un push su `main`.
- Funziona se: `https://matteeoderosa.github.io/portfolio/` mostra il sito.
- Annullare: in Settings, Pages, cambia di nuovo Source.

## 3. DNS di `matteoderosa.it` su Register.it

- Dove: Register.it, dominio `matteoderosa.it`, Gestione DNS (o "Record DNS").
- **ATTENZIONE: non cancellare i record MX e TXT esistenti.** Servono alla posta (`ciao@...`). Tocca solo i record A e il CNAME `www`: aggiungi o sostituisci solo quelli.
- Inserisci quattro record `A`, host `@`:
  - `185.199.108.153`
  - `185.199.109.153`
  - `185.199.110.153`
  - `185.199.111.153`
- Inserisci un record `CNAME`, host `www`, valore `matteeoderosa.github.io`.
- Funziona se: dopo da pochi minuti a qualche ora, `matteoderosa.it` risponde (anche con un errore di GitHub: va bene, il sito arriva al passo 4).
- Annullare: ripristina i valori che c'erano prima (copiali o fai uno screenshot prima di cambiare).

## 4. Aggiungi `CNAME` e passa alle impostazioni finali

Nel repo `portfolio`:

1. Crea il file `public/CNAME` con dentro una sola riga: `matteoderosa.it`
2. In `.github/workflows/deploy.yml` sostituisci le tre righe `env` del passo `npm run build`.

Prima:

```yaml
        env:
          NEXT_PUBLIC_BASE_PATH: /portfolio
          NEXT_PUBLIC_SITE_URL: https://matteeoderosa.github.io/portfolio
          NEXT_PUBLIC_NOINDEX: "1"
```

Dopo (percorso base vuoto, indirizzo finale, niente NOINDEX):

```yaml
        env:
          NEXT_PUBLIC_BASE_PATH: ""
          NEXT_PUBLIC_SITE_URL: https://matteoderosa.it
```

(Togli anche il commento "Provisional URL build..." sopra, ora non serve più.)

3. Fai commit e push su `main`: il workflow pubblica la versione finale.

- Funziona se: l'Action diventa verde.
- Annullare: rimetti le tre righe di prima e rifai il push.

## 5. Dominio personalizzato e HTTPS

- Dove: GitHub, repo `portfolio`, Settings, Pages, "Custom domain": scrivi `matteoderosa.it`, Save.
- Aspetta il certificato (può richiedere da qualche minuto a un'ora o più), poi spunta **Enforce HTTPS**.
- Funziona se: `https://matteoderosa.it` si apre col lucchetto e `www.matteoderosa.it` porta allo stesso sito.
- Annullare: svuota "Custom domain" e salva.

## 6. Libera il vecchio dominio da ITSProdigi

Fallo SOLO quando il passo 5 funziona, altrimenti `matteeoderosa.it` resta senza sito.

- Dove: GitHub, repo `matteeoderosa/ITSProdigi`, branch `gh-pages`, file `CNAME`, icona cestino, commit.
- Funziona se: il file non c'è più sul branch `gh-pages`.
- Annullare: ricrea `CNAME` con dentro `matteeoderosa.it`.

## 7. Pubblica le due pagine di redirect

Le due pagine sono in `docs/redirect-stubs/`.

**a) Vecchio dominio `matteeoderosa.it`** (branch `gh-pages` di ITSProdigi)
- Sul branch `gh-pages` sostituisci `index.html` con il contenuto di `matteoderosa-old.html`.
- Copia lo stesso contenuto anche come `404.html` sullo stesso branch.
- Nota: da ora gli esercizi su `matteeoderosa.it` non vengono più serviti da lì (li serve il nuovo dominio). Il redirect mantiene il percorso: `matteeoderosa.it/frontend/...` porta a `matteoderosa.it/frontend/...`. Senza `404.html` quei link darebbero errore 404.
- I quattro sottodomini non si toccano e continuano a funzionare.
- Funziona se: `matteeoderosa.it` e un vecchio link profondo portano a `matteoderosa.it`.
- Annullare: ripristina i file precedenti dalla cronologia del branch.

**b) `derteo.github.io`**
- Nel repo `derteo.github.io` sostituisci `index.html` con `derteo-github-io.html` (rinominato `index.html`).
- Le vecchie pagine vanno: `/pages/projects.html` a `/progetti/`, `/pages/contact.html` a `/contatti/`, `/pages/skills.html` e tutto il resto alla home.
- Funziona se: aprendo `derteo.github.io` arrivi su `matteoderosa.it`.
- Annullare: ripristina il vecchio `index.html` dalla cronologia.

## 8. Archivia ITSProdigi

- Dove: GitHub, repo `ITSProdigi`, Settings, in fondo "Archive this repository". Non cancellarlo.
- Annullare: stessa pagina, "Unarchive".

## 9. Per ultimo: i quattro sottodomini

Solo quando tutto il resto funziona.

- Ricrea `todo.`, `tabella.`, `poke.`, `stats.` sul nuovo dominio `matteoderosa.it` e, dai vecchi indirizzi, metti redirect permanenti (301) verso i nuovi.
- Poi (chiedimelo) aggiorno i `demoUrl` in `src/content/projects.ts` ai nuovi indirizzi e correggo i link `http://` in `https://`.
- Annullare: finché i vecchi sottodomini restano attivi, i vecchi link funzionano.

## Cosa controllare alla fine

- [ ] `https://matteoderosa.it` si apre col lucchetto (HTTPS).
- [ ] `https://matteoderosa.it/en/` mostra la versione inglese.
- [ ] Un vecchio esercizio funziona, ad esempio `https://matteoderosa.it/frontend/html/NavigazioneBase/tutto.html`.
- [ ] Una pagina inesistente mostra la pagina 404 del sito.
- [ ] `https://matteoderosa.it/sitemap.xml` si apre.
- [ ] Invia la sitemap in Google Search Console.
- [ ] `ciao@matteoderosa.it` riceve e invia.
