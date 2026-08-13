# benaja-bendo.fr — instructions projet

Site personnel de Bénaja Bendo-Matondo. **Astro 7, 100 % statique, zéro JS par défaut.**
Objectif n°1 : servir un recruteur qui clique depuis un CV. Disponibilité CDI : **28/09/2026**.

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

`docs/04-design-system.md` est **périmé** (direction « Console », non retenue) — gardé pour l'historique.

## Invariants — ne pas casser sans le dire explicitement

1. **CSP stricte.** `style-src 'self'` et `script-src 'self'`, sans `unsafe-inline` ni hash.
   Concrètement : **aucun `<style>` ni attribut `style=` dans le HTML produit**.
   Vérification obligatoire après tout changement de rendu :
   ```bash
   npm run build && grep -c '<style\|style="' dist/index.html   # doit afficher 0
   ```
   Conséquence directe : **ne pas activer l'API Fonts d'Astro** (`fonts: []` + `<Font/>`),
   son composant injecte `<style set:html>`. Voir le commentaire dans `astro.config.mjs`.
   IBM Plex est donc auto-hébergée **à la main** : fichiers dans `public/fonts/`,
   `@font-face` écrit en tête de `global.css`.
2. **Zéro requête tierce.** Pas de CDN, pas de Google Fonts, pas d'image externe, pas
   d'analytics à cookies. Tout est servi depuis le domaine.
3. **Zéro JS par défaut.** Aucun framework UI (pas de React ici). Si une interaction
   devient indispensable, c'est du vanilla dans un fichier `.js` externe — jamais inline.
4. **Le design est un système, pas des styles à l'unité.** Toute couleur, tout rayon,
   toute ombre vient d'un token de `src/styles/global.css`. Pas de valeur en dur dans
   une page. Les ombres sont **dures** (0 flou) — c'est la signature, voir docs/05.
5. **Rien de public ne reste agonisant.** Un artefact est vivant ou supprimé, jamais
   périmé. C'est le point faible historique de ce projet (site 2022 laissé en ligne 4 ans).

## Contenu : la règle qui prime sur tout

**Toute affirmation doit être vraie et prouvée par un lien cliquable.** Jamais d'adjectif
qui ne survit pas à « prouvé où ? ». Le site doit dire exactement la même chose que les
CV, LinkedIn et le README GitHub — mêmes mots, mêmes chiffres.

Ne jamais inventer un chiffre, une techno ou une date. En cas de doute sur un fait
(nombre de tests, dates, périmètre d'une mission) : **demander**, ne pas combler.

## Structure

```
src/
  layouts/Base.astro     # <head>, CSP en <meta>, SEO/OG, skip-link
  components/            # SiteHeader, SiteFooter
  pages/                 # index, mibeko, experiences, a-propos, colophon, 404, rss.xml.js
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
auto-hébergée** · contenu : **études de cas + vitrine Mibeko GitHub + notes techniques**
(dans cet ordre ; la rubrique Notes ne s'ouvre qu'une fois le premier article écrit) ·
hébergement **Firebase Hosting, plan Spark, statique uniquement**. Voir
[docs/07](docs/07-deploiement-firebase.md). Ne pas activer Firestore, Authentication,
Functions ou App Hosting sans un besoin fonctionnel explicite.
Argumentaire complet : [docs/06](docs/06-chantiers-futurs.md).

## Vérification avant de rendre la main

- [ ] `npm run build` passe
- [ ] `grep -c '<style\|style="' dist/index.html` renvoie 0
- [ ] `npm run preview` puis rendu contrôlé en **clair ET sombre**, **mobile ET desktop**
- [ ] zéro erreur console
- [ ] cibles tactiles ≥ 44px, navigation clavier, contrastes AA

## Git

Branche par défaut : `main`. **Ne jamais pousser sans demande explicite** — ce dépôt
est aussi le dépôt de profil GitHub (son README s'affiche sur la page de profil), un
push a donc un effet public immédiat. Voir docs/06 §« Le sort de ce dépôt ».
