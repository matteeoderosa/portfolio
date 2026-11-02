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
- **Attenzione:** passare Register.it ai record DNS personalizzati può azzerare quelli esistenti: controlla che MX e TXT siano ancora al loro posto. Se su `@` ci sono record `AAAA` o di parcheggio (parking), eliminali: solo quelli, mai MX o TXT.
- Inserisci quattro record `A`, host `@`:
  - `185.199.108.153`
  - `185.199.109.153`
  - `185.199.110.153`
  - `185.199.111.153`
- Inserisci un record `CNAME`, host `www`, valore `matteeoderosa.github.io`.
- Funziona se: dopo da pochi minuti a qualche ora, `matteoderosa.it` risponde (anche con un errore di GitHub: va bene, il sito arriva al passo 4).
- Annullare: ripristina i valori che c'erano prima (copiali o fai uno screenshot prima di cambiare).

Nota: i passi 4 e 5 vanno fatti uno dopo l'altro, senza pause: nel frattempo l'indirizzo provvisorio `github.io/portfolio` ha le risorse (CSS, immagini) rotte.

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

## 6. Redirect del vecchio dominio `matteeoderosa.it`

Fallo SOLO quando il passo 5 funziona (il nuovo dominio deve già servire il sito e gli esercizi).

**Non togliere il CNAME dal branch gh-pages di ITSProdigi.** Il vecchio dominio resta collegato a quel branch: è così che `matteeoderosa.it` continua a funzionare e che GitHub può servire la pagina di redirect. Se togli il `CNAME`, GitHub smette di servire il dominio e il redirect non parte.

Sul branch `gh-pages` lasci solo `CNAME`, `index.html` e `404.html` (gli ultimi due sono il file `docs/redirect-stubs/matteoderosa-old.html`). I vecchi file del sito vanno tolti, altrimenti il vecchio dominio continuerebbe a servirli direttamente e il redirect scatterebbe solo sui percorsi mancanti. Dal tuo clone di ITSProdigi (e con il portfolio clonato accanto):

```bash
git checkout gh-pages
git rm -r -q --ignore-unmatch . ':!CNAME'
cp ../portfolio/docs/redirect-stubs/matteoderosa-old.html index.html
cp ../portfolio/docs/redirect-stubs/matteoderosa-old.html 404.html
git add CNAME index.html 404.html
git commit -m "Redirect al nuovo dominio matteoderosa.it"
git push
```

(Se `git rm` si lamenta del pattern, cancella a mano tutto tranne `CNAME` e rilancia da `cp`.)

- Dopo: i vecchi link `matteeoderosa.it/frontend/...` e `matteeoderosa.it/pages/navigation.html` portano allo stesso percorso su `matteoderosa.it`, dove gli esercizi restano agli stessi indirizzi.
- Funziona se: `matteeoderosa.it` e un vecchio link profondo portano a `matteoderosa.it`.
- I quattro sottodomini sono ospitati altrove e qui non si toccano.
- Annullare: `git revert HEAD` (oppure `git checkout <commit-precedente> -- .`) sul branch `gh-pages`, poi push.

## 7. Redirect di `derteo.github.io`

- Nel repo `derteo.github.io` sostituisci `index.html` con `docs/redirect-stubs/derteo-github-io.html` (copiato come `index.html`) e copialo anche come `404.html`. Elimina le vecchie cartelle `pages/`, `css/`, `js/`, `img/`, così ogni vecchio indirizzo (per esempio `/pages/projects.html`) cade sul `404.html` e viene reindirizzato:

  ```
  git rm -r pages css js img
  cp <percorso-del-portfolio>/docs/redirect-stubs/derteo-github-io.html index.html
  cp index.html 404.html
  git add index.html 404.html
  git commit -m "Redirect to matteoderosa.it" && git push
  ```
- Le vecchie pagine vanno: `/pages/projects.html` a `/progetti/`, `/pages/contact.html` a `/contatti/`, `/pages/skills.html` e tutto il resto alla home.
- Funziona se: aprendo `derteo.github.io` arrivi su `matteoderosa.it`.
- Annullare: `git revert HEAD` e push, oppure ripristina i vecchi file dalla cronologia.

## 8. Archivia ITSProdigi

Solo dopo che il redirect del passo 6 è online: archiviare non spegne il sito GitHub Pages, ma conviene farlo a redirect già attivo, perché poi non potrai più fare push sul branch.

- Dove: GitHub, repo `ITSProdigi`, Settings, in fondo "Archive this repository". Non cancellarlo.
- Annullare: stessa pagina, "Unarchive".

## 9. Per ultimo: i quattro sottodomini

Solo quando tutto il resto funziona.

- Ricrea `todo.`, `tabella.`, `poke.`, `stats.` sul nuovo dominio `matteoderosa.it` e, dai vecchi indirizzi, metti redirect permanenti (301) verso i nuovi. Finora i loro DNS non vanno toccati.
- Poi aggiorna i `demoUrl` in `src/content/projects.ts` ai nuovi indirizzi e correggi i link `http://` in `https://`.
- `utenti-post-commenti` non ha `demoUrl` finché la sua demo non è di nuovo online: quando torna attiva, aggiungi `demoUrl` con il nuovo indirizzo.
- Annullare: finché i vecchi sottodomini restano attivi, i vecchi link funzionano.

## Cosa controllare alla fine

- [ ] `https://matteoderosa.it` si apre col lucchetto (HTTPS).
- [ ] `https://matteoderosa.it/en/` mostra la versione inglese.
- [ ] Un vecchio esercizio funziona, ad esempio `https://matteoderosa.it/frontend/html/NavigazioneBase/tutto.html`.
- [ ] Una pagina inesistente mostra la pagina 404 del sito.
- [ ] `https://matteoderosa.it/sitemap.xml` si apre.
- [ ] Invia la sitemap in Google Search Console.
- [ ] `ciao@matteoderosa.it` riceve e invia.
