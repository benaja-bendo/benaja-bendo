# Proposition de design system — benaja-bendo.fr

*Établi le 25 juillet 2026. À critiquer avant application. Le site tourne aujourd'hui sur une baseline neutre volontaire ([global.css](../src/styles/global.css)) ; ce document propose l'identité visuelle qui la remplacera une fois validée.*

> Maquette visuelle interactive (hero, cartes, palette, typo, emblème pixel animé, bascule clair/sombre) publiée en artifact — c'est l'objet à critiquer. Ce document en est la spécification écrite.
>
> Note de méthode : une première piste « papier chaud + terre cuite + Space Grotesk » a été écartée — c'est précisément le look « généré par IA » le plus répandu aujourd'hui, à l'opposé du « très beau site » distinctif demandé. La direction ci-dessous, « Console », est ancrée dans le métier réel de Bénaja.

---

## Le parti pris : « Console »

Ce qui distingue Bénaja n'est pas seulement qu'il code — c'est qu'il **met en
production et opère** (tests, CI/CD, déploiement continu, astreinte). Le site
emprunte donc le vocabulaire visuel d'une **console d'exploitation** bien tenue —
précision, données en évidence, grille nette — mais exécuté avec calme éditorial,
pas en « terminal vert sur noir » cliché.

Et le vrai différenciateur, sa signature : **son art est 100 % généré par code**.
On en fait l'emblème de marque — un motif pixel dessiné en direct au Canvas, pas
une image importée. La forme raconte le fond.

Trois principes :

1. **Neutres acier + une seule couleur de signature.** Un sapin-teal discipliné, loin du bleu SaaS générique ; l'ambre est réservé au « signal » (disponibilité, pixels) — jamais deux accents qui se disputent.
2. **La donnée est mise en scène** (chiffres en mono, tuiles, liserés pixel) — cohérent avec un profil qui prouve par les chiffres (~730 tests, 400+ collaborateurs).
3. **Le pixel est généré par code**, discret et transversal (emblème, puces, liserés, 404) — jamais la porte d'entrée, toujours la signature.

**Le détail mémorable / la prise de risque** : l'**emblème pixel animé** en Canvas
dans le hero — un monogramme « B » dont quelques pixels « respirent » comme le
battement d'un système surveillé en production. Statique si `prefers-reduced-motion`.

---

## 1. Couleur (design tokens)

Neutres acier à léger biais froid, accent sapin-teal, ambre en signal. À valider
au build avec un vérificateur de contraste (cible **WCAG AA** : 4.5:1 texte, 3:1 UI).

### Mode clair

| Token | Hex | Usage |
|---|---|---|
| `--bg` | `#ECEFF2` | fond acier clair |
| `--surface` | `#FFFFFF` | cartes |
| `--surface-2` | `#F5F7F9` | encarts, tuiles |
| `--ink` | `#12171C` | texte |
| `--muted` | `#59616B` | secondaire |
| `--border` | `#D6DCE2` | filets |
| `--accent` | `#0E7C66` | sapin-teal — liens, boutons, marques |
| `--accent-strong` | `#0B5F4E` | survol / actif |
| `--on-accent` | `#F3FFFB` | texte sur aplat teal |
| `--signal` | `#B9700A` | ambre — pixels « signal » |
| `--ok` | `#1F9D57` | « disponible » |

### Mode sombre (nuit chaude, pas de noir pur)

| Token | Hex | Usage |
|---|---|---|
| `--bg` | `#0E1315` | fond nuit |
| `--surface` | `#161D20` | cartes |
| `--surface-2` | `#1C2427` | encarts |
| `--ink` | `#E8EDEE` | texte |
| `--muted` | `#929CA3` | secondaire |
| `--border` | `#273035` | filets |
| `--accent` | `#34D0AE` | teal éclairci |
| `--accent-strong` | `#57E0C2` | survol / actif |
| `--on-accent` | `#06110D` | texte sur aplat |
| `--signal` | `#F6B24B` | ambre signal |
| `--ok` | `#46C67E` | « disponible » |

Bascule light/dark par `prefers-color-scheme` (zéro JS). Un sélecteur manuel
viendra plus tard, avec gestion propre des hash CSP.

## 2. Typographie (auto-hébergée)

Auto-hébergée via la Fonts API d'Astro → aucune requête tierce, CSP `font-src 'self'` respectée.

- **Corps & UI — IBM Plex Sans** : la voix « ingénierie » (police conçue par IBM pour les interfaces techniques), très lisible, honnête, différente du réflexe Inter.
- **Données & méta — IBM Plex Mono** : chiffres, dates, eyebrows, navigation, stack. Donne le grain « console » authentique et souligne les preuves chiffrées.
- **Titres — display à caractère** (ex. *Bricolage Grotesque*, variable et libre) : de la personnalité sans tomber dans le Space Grotesk générique. À arbitrer ensemble.

Échelle fluide `clamp()`, corps ≥ 16px sur mobile, interlignage 1.6 corps / 1.1 titres, `letter-spacing` titres −0.02em, `font-variant-numeric: tabular-nums` sur les chiffres alignés.

> Dans la maquette, les polices affichées sont des polices **système** (les vraies s'auto-hébergent au build) — l'inlining d'un webfont n'était pas possible côté artifact.

## 3. Espace, rayons, élévation

- Base **4px** (`--sp-1`…`--sp-8`), sections respirantes (40→60px vertical fluide).
- Rayons : `--r` 12px, `--r-sm` 7px ; les éléments pixel gardent un rayon 0.
- Élévation par **ombres douces teintées encre** (pas de bordures épaisses), largeur contenu ~62–68rem, prose ~44rem.

## 4. Signature pixel (générée par code)

- **Emblème hero** : monogramme « B » en Canvas, palette limitée (teal + ambre), quelques pixels animés (heartbeat), trame de fond discrète. Statique si `prefers-reduced-motion`.
- **Eyebrows** : petit glyphe 4-pixels (teal + 1 ambre) devant chaque intertitre.
- **Tuiles de chiffres** : liseré supérieur en rangée de pixels.
- **Puce « disponible »** : carré pixel (pas un rond).
- **404** : petite scène pixel — le seul vrai moment de jeu.
- **Tout en CSS/Canvas/SVG** : zéro image tierce (CSP intacte), et l'identité « art par le code » est cohérente de bout en bout.

## 5. Composants clés

- **Header** : monogramme pixel + nom, nav en mono discrète, « CV (PDF) » en pilule. Collant, léger flou, filet fin.
- **Hero** : deux colonnes — texte (nom, rôle en mono, preuve Mibeko en encart à liseré teal, disponibilité, 2 CTA) + emblème pixel. Empilé sur mobile.
- **Cartes preuve** : `--surface`, ombre douce, liseré pixel en tête, soulèvement 2px au survol (coupé si reduced-motion).
- **Tuiles de chiffres** : grand nombre en mono teal, label muted, liseré pixel, `tabular-nums`.
- **Chips (stack)** : pilules mono à contour.
- **Boutons** : primaire = aplat teal ; fantôme = contour. Focus ring 3px teal.
- **Footer** : point « disponible » pixel, liens, mention « statique, sans traceur ».

## 6. Mouvement & accessibilité

- Micro-interactions seulement : survol 160 ms ease-out (soulèvement + ombre), soulignement des liens, `:focus-visible` 3px teal partout.
- L'emblème animé et toute entrée de page sont encadrés par `@media (prefers-reduced-motion: reduce)`.
- Contrastes AA, navigation clavier, cibles ≥ 44px, `lang="fr"`, hiérarchie de titres correcte. Le site reste **zéro JS** par défaut (l'emblème Canvas est le seul script, chargé proprement et dégradable).

## 7. Mise en œuvre (après validation)

1. Remplacer les tokens de [global.css](../src/styles/global.css) par ceux ci-dessus (les composants consomment déjà ces variables → bascule quasi immédiate).
2. Ajouter la Fonts API dans [astro.config.mjs](../astro.config.mjs) : auto-héberger IBM Plex Sans/Mono + le display, précharger les graisses critiques.
3. Décliner l'emblème et les éléments pixel en Canvas/CSS ; mettre à jour le favicon sur l'accent.
4. Rebuild + vérif : contrastes AA, `prefers-reduced-motion`, mobile, re-scan CSP (le seul script inline = l'emblème → prévoir un hash CSP `script-src` ou le sortir en fichier `'self'`).

---

**À critiquer en priorité** :
1. Le parti pris « Console » (ingénieur qui opère en prod) te parle-t-il, ou tu préfères une autre ambiance (éditoriale sobre premium ? plus sombre-technique ?) ?
2. La couleur de signature **sapin-teal** — on garde, ou on cherche une teinte plus « toi » ?
3. Le rôle de l'**emblème pixel animé** — signature assumée, ou trop joueur pour une cible recruteur ?
