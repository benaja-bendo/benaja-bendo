# benaja-bendo.fr — instructions projet

Site personnel de Bénaja Bendo-Matondo. **Astro 7, 100 % statique, un seul fichier JS.**
Le site est une **mémoire professionnelle publique** : il documente ce que Bénaja
construit, les décisions prises et les apprentissages à retrouver. Il doit aussi permettre
à un pair, un recruteur ou un client de comprendre rapidement son travail, sans réduire
le site à un CV en ligne. Disponibilité CDI : **28/09/2026** (fait daté à réviser, pas
raison d'être du site).

## Commandes

```bash
npm run dev      # serveur de dev (port 4321)
npm run build    # build statique -> dist/
npm run preview  # sert dist/ (à privilégier pour vérifier : le dev inline des styles)
npm run check    # astro check (types)
```

## Avant de coder : lire le bon document

| Question | Document |
| --- | --- |
| Pourquoi ce site existe, ce qu'il doit prouver | `docs/02` *(local, hors dépôt)* |
| Comment on écrit (ton, mots bannis) | `docs/02` *(local)* §4 |
| Architecture des pages, stack, sécurité | [docs/03-proposition-refonte.md](docs/03-proposition-refonte.md) |
| **Design : tokens, composants, règles** | [docs/05-design-system-papier-pixels.md](docs/05-design-system-papier-pixels.md) |
| Ce qui reste à faire / à mettre à jour | [docs/06-chantiers-futurs.md](docs/06-chantiers-futurs.md) |
| **Contenu : quoi écrire, dans quel ordre, quand ouvrir une rubrique** | [docs/08-plan-contenu.md](docs/08-plan-contenu.md) |

`docs/04-design-system.md` est **périmé** (direction « Console », non retenue) — gardé pour l'historique.

## Invariants — ne pas casser sans le dire explicitement

1. **CSP stricte.** `style-src 'self'` et `script-src 'self'`, sans `unsafe-inline` ni hash.
   Concrètement : **aucun `<style>` ni attribut `style=` dans le HTML produit**.
   Vérification obligatoire après tout changement de rendu — **toutes les pages**, pas
   seulement l'accueil :
   ```bash
   npm run build && grep -rlE '<style[ >]|<[a-zA-Z][^>]* style="' dist --include='*.html'
   ```
   Elle ne doit **rien** afficher. Le motif exige un contexte de balise ouvrante
   (`<style` suivi d'une espace ou de `>`, ou `style="` à l'intérieur d'un `<tag …>`)
   parce que la version naïve `grep -c 'style="'` signalait la note qui documente
   justement cette commande : le motif y apparaît, échappé, dans un bloc de code.
   Conséquences directes :
   - **ne pas activer l'API Fonts d'Astro** (`fonts: []` + `<Font/>`), son composant
     injecte `<style set:html>`. Voir le commentaire dans `astro.config.mjs`.
     IBM Plex est donc auto-hébergée **à la main** : fichiers dans `public/fonts/`,
     `@font-face` écrit en tête de `global.css` ;
   - **ne pas réactiver la coloration syntaxique Markdown** (`markdown.syntaxHighlight`) :
     Shiki écrit ses couleurs en `style=` sur le `<pre>` et sur chaque `<span>`. Les
     blocs de code sont mis en forme par `.prose pre` dans `global.css`.
2. **Zéro requête tierce.** Pas de CDN, pas de Google Fonts, pas d'image externe, pas
   d'analytics à cookies. Tout est servi depuis le domaine.
3. **Un seul fichier JS, et il se justifie.** Aucun framework UI (pas de React ici).
   Une interaction indispensable se code en vanilla dans un fichier `.js` externe —
   jamais inline, sinon la CSP la bloque. Aujourd'hui il y en a **un** :
   `public/js/theme.js` (1,5 Ko compressés), qui mémorise le choix clair/sombre —
   une préférence qui survit à la navigation exige `localStorage`, et une bascule
   en CSS pur se réinitialise à chaque lien suivi. Il est chargé **sans `defer`**
   dans le `<head>` pour poser `data-theme` avant le premier rendu ; avec `defer`,
   la page clignote. Avant d'en ajouter un deuxième : la fonctionnalité vaut-elle
   une requête bloquante ? Et mettre à jour le colophon, qui énumère ce qui est
   envoyé.
4. **Le design est un système, pas des styles à l'unité.** Toute couleur, tout rayon,
   toute ombre vient d'un token de `src/styles/global.css`. Pas de valeur en dur dans
   une page. Les ombres sont **dures** (0 flou) — c'est la signature, voir docs/05.
5. **Rien de public ne reste agonisant.** Un artefact est vivant ou supprimé, jamais
   périmé. C'est le point faible historique de ce projet (site 2022 laissé en ligne 4 ans).

## Contenu : les règles qui priment sur tout

1. **Tout fait doit être vrai, précis et soutenable.** La preuve est proportionnée au
   type de contenu : lien public pour un projet public ; rôle et périmètre explicitement
   bornés pour une mission confidentielle ; source citée pour une ressource externe.
   Une opinion ou un retour d'expérience est présenté comme tel, pas déguisé en fait.
2. **Les faits restent cohérents entre le site, le CV, LinkedIn et GitHub ; la formulation
   peut changer selon le lecteur.** Ces surfaces ne doivent pas réciter le même texte.
3. **Ne jamais inventer** un chiffre, une techno, une date, un rôle ou un résultat. En cas
   de doute : demander, retirer le détail ou marquer explicitement l'incertitude.
4. **Une page doit être utile avant d'être complète.** Une note courte et datée peut être
   publiée si elle aide à retrouver ou comprendre quelque chose ; aucun rythme de
   publication n'est promis.
5. **Le confidentiel reste confidentiel.** Décrire son rôle, ses décisions et les
   enseignements ; ne publier ni données, ni code, ni architecture appartenant au client.

## Structure

```
src/
  layouts/Base.astro     # <head>, CSP en <meta>, SEO/OG, skip-link
  components/            # SiteHeader, SiteFooter
  pages/                 # index, mibeko, experiences, a-propos, contact, colophon, 404, rss.xml.js
  content/etudes/        # études de cas (content collections, schéma Zod dans content.config.ts)
  styles/global.css      # LE design system — @font-face, tokens, composants
public/fonts/            # IBM Plex auto-hébergée (OFL 1.1, licence incluse)
firebase.json            # déploiement Firebase Hosting, en-têtes et cache
.firebaserc               # alias local du projet Firebase benaja-bendo
public/_headers          # copie portable des en-têtes (Cloudflare/Netlify)
deploy/                  # ancienne solution Apache, conservée comme retour arrière
.agents/skills/           # compétences Firebase officielles installées par la CLI
```

## Décisions actées (13/08/2026) — ne pas les rouvrir sans raison

Astro **conservé** · le site vit **dans ce dépôt, sur `main`** · typographie **IBM Plex
auto-hébergée** · contenu : **réalisations + études de cas + notes** (une note utile et
publiable suffit à ouvrir la rubrique ; les articles restent un format, pas une obligation) ·
hébergement **Firebase Hosting, plan Spark, statique uniquement**. Voir
[docs/07](docs/07-deploiement-firebase.md). Ne pas activer Firestore, Authentication,
Functions ou App Hosting sans un besoin fonctionnel explicite.
Argumentaire complet : [docs/06](docs/06-chantiers-futurs.md).

## Vérification avant de rendre la main

- [ ] `npm run build` passe
- [ ] **aucune espace avalée** : Astro supprime le saut de ligne entre un texte et une
      balise en ligne adjacente (`… il est\n<a>lien</a>` rend `il estlien`). Ne jamais
      couper la ligne entre un mot et le `<a>`, `<mark>`, `<strong>` ou `<code>` qui
      le suit — vérifier dans `dist/` en cas de doute
- [ ] `grep -c '<style\|style="' dist/index.html` renvoie 0
- [ ] `npm run preview` puis rendu contrôlé en **clair ET sombre**, **mobile ET desktop**
- [ ] zéro erreur console
- [ ] cibles tactiles ≥ 44px, navigation clavier, contrastes AA

## Git

Branche par défaut : `main`. **Ne jamais pousser sans demande explicite** — ce dépôt
est aussi le dépôt de profil GitHub (son README s'affiche sur la page de profil), un
push a donc un effet public immédiat. Voir docs/06 §« Le sort de ce dépôt ».
