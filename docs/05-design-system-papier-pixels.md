# Design system — « Papier & pixels »

*Établi le 13 août 2026. **Appliqué** dans [src/styles/global.css](../src/styles/global.css) — ce document en est la spécification écrite, pas une proposition. Remplace [04-design-system.md](04-design-system.md) (direction « Console », non retenue).*

---

## D'où ça vient, et où on s'arrête

Point de départ demandé : **[romainlanz.com](https://romainlanz.com)**. Ce qui y a été relevé, mesuré dans le navigateur :

| Trait | Valeur relevée |
| --- | --- |
| Fond | papier crème `#FFFDF7`, jamais blanc pur |
| Encre | ardoise `#1E293B`, jamais noir pur |
| Police | Atkinson Hyperlegible, une seule, pour tout |
| Boutons / blocs | bordure pleine 2px + **ombre dure** `4px 4px 0`, rayon 8px |
| Mots-clés | surlignés au marqueur pastel (pseudo-élément derrière le texte) |
| Illustrations | line art épais, aplats pastel |
| Thème | clair uniquement, largeur 1280px |

**La distinction qui compte.** Un *langage* visuel se réutilise — le néo-brutalisme
« papier + trait franc + ombre dure » est un courant, pas la propriété de quelqu'un.
Une *identité* ne se réutilise pas : reprendre en plus sa palette, sa police et ses
illustrations produirait un site que Romain Lanz et une partie de l'écosystème JS
français reconnaîtraient au premier coup d'œil — pour un site dont le rôle est de
prouver qu'on conçoit soi-même, c'est le contraire de l'effet recherché.

Donc : **on garde la construction, on change l'identité.**

| On reprend (le langage) | On change (l'identité) |
| --- | --- |
| Fond papier chaud, encre non-noire | Palette : sapin-teal + ambre, pas lavande/rose/menthe |
| Bordure pleine + ombre dure, 0 flou | Police : **IBM Plex Sans**, pas Atkinson Hyperlegible |
| Surligneur au marqueur sur les mots-clés | **IBM Plex Mono** pour les données (il n'a pas de mono) |
| Beaucoup de blanc, grille large | **Mode sombre** (il n'en a pas) |
| | Signature : **pixels dessinés en CSS** ; illustration éditoriale rare et justifiée |

## Le parti pris en une phrase

> Une feuille de papier chaude, une encre franche, des blocs qui ont une épaisseur
> — et le pixel comme signature, dessiné par le code, jamais importé.

Pourquoi ça lui va : son art de jeu est **100 % généré par code**, et le pixel est
formellement d'accord avec le néo-brutalisme (arêtes nettes, pas de flou, pas de
dégradé lissé). La forme raconte le fond. Le pixel reste un **accent** — jamais la
porte d'entrée, jamais un obstacle à la lecture (ligne rouge de doc 02 *(notes locales, non publiées)* §6).

## 1. Tokens

Définis dans `:root` de [global.css](../src/styles/global.css). **Aucune valeur en dur ailleurs.**

### Clair (mode de référence)

| Token | Valeur | Rôle | Contraste sur papier |
| --- | --- | --- | --- |
| `--bg` | `#FCFAF3` | papier chaud | — |
| `--surface` | `#FFFFFF` | cartes (ressortent sur le papier) | — |
| `--surface-2` | `#F4F0E4` | encarts, boutons fantômes | — |
| `--fg` | `#16212B` | encre | 15:1 |
| `--muted` | `#5A6673` | texte secondaire | **5.6:1** ✓ AA |
| `--border` | `#16212B` | bordures structurelles (= encre pleine) | — |
| `--rule` | `#E2DCCB` | filets discrets, séparateurs | — |
| `--accent` | `#0E7C66` | sapin-teal : liens, primaire, pixels | **4.9:1** ✓ AA |
| `--signal` | `#B9700A` | ambre : **aplats et graphiques uniquement** | 3.75:1 ✗ texte |
| `--ok` | `#1A7F4B` | pastille « disponible » | — |
| `--mark-1/2/3` | `#A9E5D3` / `#FBDFA4` / `#F7CDBB` | surligneurs : preuve / temps / humain | — |

### Sombre

Bascule par `prefers-color-scheme`, **zéro JS**. Nuit chaude `#12161A`, jamais de noir pur.
L'encre s'inverse : `--border` devient clair, donc **les ombres dures deviennent claires** —
c'est volontaire, c'est la même mécanique lue en négatif. `--muted` y tient 7.1:1.

### Trait & relief

| Token | Valeur |
| --- | --- |
| `--edge` | `2px` — épaisseur de toute bordure structurelle |
| `--pop` | `4px 4px 0 var(--border)` |
| `--pop-sm` / `--pop-lg` | `3px 3px 0` / `6px 6px 0` |
| `--radius` / `--radius-sm` | `12px` / `8px` |
| `--maxw` / `--prose` | `68rem` / `44rem` |

## 2. Les trois règles non négociables

1. **Les ombres sont dures.** `0 flou`, toujours. Une `box-shadow` avec un rayon de flou
   quelque part dans ce projet est un bug, pas un choix.
2. **La signature reste dessinée en CSS.** Les pixels sont des dégradés à arrêts nets
   (`repeating-linear-gradient`) et des `box-shadow` décalées. Une illustration
   éditoriale est admise seulement si elle explique une idée précise, reste rare et est
   stockée localement. Aucun hotlink ni bibliothèque d'icônes chargée au runtime.
3. **Un seul accent porteur.** Le teal porte, l'ambre **signale**. L'ambre ne passe jamais
   en texte courant (3.75:1). Deux accents qui se disputent = plus aucun accent.

## 3. Typographie

Échelle fluide en `clamp()`, corps 17px, interlignage 1.65 / titres 1.15, `letter-spacing`
titres −0.02em, `text-wrap: balance` sur les titres et `pretty` sur les paragraphes.

Le **mono** n'est pas décoratif : il porte tout ce qui est **donnée ou méta** — ligne de
rôle, intertitres, navigation, dates, chiffres, chips. C'est ce qui donne le grain
« ingénierie » et ce qui éloigne le plus de la référence de départ.

### ✅ Décidé le 13/08/2026 : IBM Plex auto-hébergée à la main

**IBM Plex Sans + IBM Plex Mono**, fichiers dans `public/fonts/`, `@font-face` écrit à la
main en tête de `global.css`. **92 Ko au total** (moins que les ~200 Ko estimés) :

| Fichier | Contenu | Poids |
| --- | --- | --- |
| `ibm-plex-sans-var-latin.woff2` | **variable**, graisses 400→700 | 39 Ko |
| `ibm-plex-sans-var-latin-ext.woff2` | variable, latin étendu | 25 Ko |
| `ibm-plex-mono-400-latin.woff2` | mono régulier | 9,8 Ko |
| `ibm-plex-mono-600-latin.woff2` | mono demi-gras | 9,9 Ko |

Sous-ensembles **latin uniquement** — le français est entièrement couvert. Le fichier du
corps est préchargé dans `Base.astro` ; le latin-ext ne se télécharge que si un caractère
le réclame (vérifié : `unloaded` sur l'accueil). Licence **SIL OFL 1.1**, redistribuée
dans `public/fonts/LICENSE-IBM-Plex.txt` comme la licence l'exige.

**Pourquoi pas l'API Fonts d'Astro 7** — testée le 13/08/2026 : elle fonctionne (build OK,
6 fichiers auto-hébergés) mais son composant `<Font/>` injecte le `@font-face` via
`<style set:html>`, donc un style **inline**, bloqué par la CSP `style-src 'self'` servie
par `public/_headers` et la conf Apache. Constaté : **10 violations CSP**. Aucune option
n'émet un fichier CSS externe. L'autre sortie possible (`security.csp` d'Astro + report
des mêmes hashes dans les en-têtes serveur) a été écartée : deux sources de vérité à
resynchroniser à chaque changement de police, et la fragilité est exactement ce qui tue
ce projet à long terme.

**Pour ajouter un alphabet plus tard** : récupérer le woff2 du sous-ensemble voulu, le
déposer dans `public/fonts/`, ajouter un bloc `@font-face` avec son `unicode-range`.

## 4. Composants (tous dans `global.css`, classes inchangées)

- **Header** — collant, filet d’encre 2px. Monogramme `BB` : bloc teal à **coins vifs**,
  bordure encre, ombre 2px. Nav en mono ; la page courante est marquée par un **trait
  d’encre sous le lien**, pas par une couleur. Contact reste l’action distincte sur
  grand écran. Sous 48rem, un `<details>` natif donne accès à toutes les sections
  dans une seule barre collante, sans JavaScript.
- **Hero** — eyebrow (glyphe 4 pixels : 3 teal + 1 ambre), nom en h1, intitulé de
  poste en mono puis proposition de valeur courte. **`.hero-proof` reste le bloc
  le plus épais de la page**, mais sa variante `.hero-proof-split` sépare la preuve
  produit de la preuve entreprise. `.hero-facts` porte les trois repères lus en
  diagonale. Sur l'accueil, une illustration éditoriale « citation footnote » de
  Koboyo matérialise la traçabilité de Mibeko. Elle est intégrée dans un composant
  Astro, recolorée par les tokens et ne déclenche aucune requête tierce. Sous 52rem,
  elle passe après les deux travaux sélectionnés pour que le contenu utile arrive
  avant le décor éditorial.
- **Surligneur `<mark>`** — `.mark-1` (défaut) = la preuve · `.mark-time` = le temps, la
  disponibilité · `.mark-human` = le parcours. **Deux marques maximum par bloc** :
  au-delà, plus rien ne ressort.
- **Boutons** — bordure + ombre dure ; au survol ils se **soulèvent** (−2px, ombre 6px),
  au clic ils s'**enfoncent** (+2px, ombre 0). Hauteur mini 2.75rem (cible tactile).
- **Cartes** — liseré pixel en tête (6px), puces **carrées** teal, soulèvement au survol.
  La gouttière est portée par les enfants (`.card > *`), pas par la carte : c'est ce qui
  permet au liseré de toucher les bords.
- **Cartes de contact** — même grammaire, mais organisées par intention
  (« recruter » / « besoin technique ») plutôt que par canal. L'email est
  l'action ; CV, études et réalisations sont les preuves secondaires.
- **Tuiles de chiffres** — grand nombre en mono teal, `tabular-nums`, bordure sans
  ombre ni liseré répété. Elles passent en grille 2×2 sur petit écran : les chiffres
  restent scannables sans repousser l’action principale sous plusieurs écrans.
- **Flux d'impact** — `.trust-flow` sert aussi aux schémas code-native. La
  variante `.impact-flow` raconte un avant / intervention / après sans prétendre
  reconstituer l'architecture d'un client confidentiel.
- **Footer** — fond `--surface-2`, pastille de disponibilité **carrée** (un pixel, pas une
  LED), liens en mono, et la date de génération de la page.
- **404** — le code en mono géant avec ombre dure, qui **décroche** une fraction de
  seconde toutes les quatre secondes et demie. La seule vraie fantaisie de la v1 —
  et le seul endroit où un visage est admis (voir §7).
- **Bascule de thème (en-tête)** — un bouton unique qui cycle clair → sombre →
  système. Le sélecteur nommé reste en pied de page ; ce bouton-ci ne fait que
  remonter l'action là où on la cherche. Glyphe dessiné en carrés — évidé pour le
  jour, entamé pour la nuit, coupé en deux pour « le système décide ». Masqué tant
  que `data-theme-pret` n'est pas posé, comme le sélecteur.
- **Sommaire (`.sommaire`)** — liste d'ancres numérotées, collante dans la colonne
  de droite au-dessus de 68rem, bloc en tête de contenu en dessous. Ne s'affiche
  qu'à partir de trois sections : en deçà, ce n'est plus un sommaire.
- **« Et ensuite » (`.suite`)** — deux portes (précédent / suivant) puis
  l'invitation. Ce que ce bloc remplace : un unique « ← Tout voir » en fin de
  contenu, c'est-à-dire un retour en arrière au moment de plus forte intention.
  La grille garde les deux places même quand un seul voisin existe — mais ne
  dessine rien à la place manquante, un cadre vide se lisant comme un trou.
- **Rail de filtres (`.filtres`)** — les taxonomies en TÊTE d'index, pas en pied.
  Elles étaient une sortie, elles deviennent l'entrée.
- **Illustration (`<Illustration/>`)** — voir §7.

## 5. Accessibilité & mouvement

- Contrastes vérifiés AA (tableau §1) ; l'ambre est cantonné aux aplats.
- `:focus-visible` teal 3px partout, cibles ≥ 44px, `lang="fr"`, skip-link.
- Rien de ce qui bouge n'est nécessaire à la lecture.

### Le mouvement est un système — révisé le 25/08/2026

**L'état avant.** Trois règles `transition` dans 2 462 lignes, toutes sur `:hover`,
et zéro `@keyframes`. Rien ne se produisait à l'arrivée sur une page, au défilement,
ni entre deux pages. Le site paraissait figé — pas faute d'effets, faute de
**déclencheurs**.

**Les quatre règles.**

1. **L'état par défaut est l'état FINAL.** Un navigateur qui ignore une de ces
   règles affiche la page entière, immédiatement. Jamais d'`opacity: 0` en dur,
   jamais un contenu qui dépend d'un script pour apparaître.
2. **Un déclencheur par écran.** « Deux marques maximum par bloc » (§4) vaut aussi
   pour le mouvement.
3. **Zéro JavaScript.** `@view-transition` pour la navigation,
   `animation-timeline: view()` pour le défilement. Aucune bibliothèque, aucun
   `IntersectionObserver` — donc rien de neuf à autoriser dans la CSP.
4. **Tout est coupé sous `prefers-reduced-motion: reduce`**, y compris les
   transitions de page (`::view-transition-*`) et les trois boucles infinies.

**Deux pièges, tous deux rencontrés.**

- **`translate`, jamais `transform`, pour les apparitions au défilement.** Une
  animation en cours l'emporte sur les déclarations ordinaires : animer `transform`
  écrase le soulèvement au survol des cartes. `translate` est une propriété
  distincte qui se compose avec `transform`.
- **La plage s'arrête à `entry 100%`.** Une plage en `cover` laisse un élément
  visible mais non défilé — bas d'une page courte — figé à mi-animation, donc à
  moitié transparent. Ce serait rendre un contenu illisible par décoration.

**Le catalogue.** Transitions de page (`@view-transition`, noms sur l'en-tête, le
pied et le `h1`) · apparition au défilement des cartes, lignes, tuiles et
illustrations · liseré pixel qui défile au survol d'une carte · surligneur qui se
pose de gauche à droite · curseur qui bat après la ligne de rôle · monogramme et
bascule qui s'enfoncent en `steps(2)` · pastille de disponibilité qui **commute**
en `steps(1)` sur 2,4 s (elle ne respire pas : ce serait la LED que §4 refuse) ·
filet d'accent qui pousse au survol d'une ligne d'inventaire · 404 qui décroche.

Les transitions de survol restent à **140 ms**, sur `transform` et `box-shadow`.

## 6. Ce qui reste à faire sur le design

- [x] ~~Trancher la question des webfonts~~ — fait le 13/08/2026 (§3).
- [x] Favicon pixel sur l'accent teal.
- [x] Image Open Graph dédiée 1200×630 pour les aperçus sociaux.
- [ ] Décliner le système sur `/mibeko`, `/experiences`, `/a-propos`, `/colophon` : les
      classes existent déjà, mais ces pages n'ont pas été relues une par une.
- [x] ~~Scène pixel de la 404~~ — faite le 25/08/2026, mais pas comme prévu : plutôt
      qu'une scène à dessiner, l'ombre du code décroche d'un pixel et vire à l'ambre
      un dixième de seconde. Un défaut d'affichage, pas une animation.
- [x] Sélecteur clair/sombre manuel — trois états explicites, script externe et
      commande masquée tant que le script n’est pas prêt. Doublé le 25/08/2026 d'une
      bascule compacte dans l'en-tête (§4).
- [ ] **Une photo.** Le site n'en contient aucune. C'est la vraie réponse au manque
      d'« humain » — pas un visage dessiné qui n'est pas le sien. Traitée comme le
      reste : bordure d'encre 2px, ombre dure, coins vifs, servie depuis le domaine.
- [ ] **Deux ou trois captures produit de plus.** Le cadre « fenêtre de navigateur »
      dessiné en CSS existe déjà sur `/etudes/mibeko` et ne demande qu'à resservir.
- [ ] **Un schéma pour l'étude AIFE.** C'est la seule des trois qui n'en a pas :
      Mibeko a sa chaîne de traçabilité en quatre temps (`MibekoProof`), France
      Travail son avant / intervention / après (`FranceTravailImpact`). Un schéma
      vaut dix icônes achetées — il est unique et n'a pas de licence — mais celui-ci
      demande de décrire une architecture cliente **confidentielle** : il faudra
      trouver l'altitude qui raconte le rôle sans livrer le système, comme l'a fait
      `.impact-flow`. À ne pas bâcler, donc, et à ne surtout pas inventer.

## 7. Illustrations éditoriales

Admises seulement si elles expliquent une idée précise (§2, règle 2), stockées
localement, recolorées par les tokens. Le composant `<Illustration/>` porte la règle :
la prop `legende` est **obligatoire** — si on ne sait pas écrire ce que le dessin
apporte, c'est qu'il n'apporte rien.

**Ce qui est en place** (six dessins, Koboyo Icons, `currentColor`, aucun `style=`) :

| Fichier | Où | Ce qu'il explique |
| --- | --- | --- |
| `citation-footnote` | accueil | la réponse garde le chemin vers sa source |
| `balance-sheet` | `/etudes/mibeko` | le droit d'un côté, l'article cité de l'autre |
| `add-for-reporting` | `/etudes/france-travail` | des tableaux de bord qu'on assemble |
| `attacker-hood` | note sur la CSP | la seule page qui parle de menace |
| `academic-year-planner` | `/parcours` | une chronologie |
| `answer` | `/contact` | une réponse, pas un accusé de réception |
| `bald-person-looking-confused` | `/404` | la fantaisie autorisée, une seule fois |

**La règle sur les personnages.** Un **objet** rendu grand, en teal, tenu par un
cadre (papier ligné, étiquettes mono, ombre dure) reste dans le système : le
dispositif appartient au site, le dessin n'est qu'un contenu. Un **visage** de
dessin animé ne survit pas à ce traitement — il devient du clip-art, et le clip-art
fait basculer un site sérieux dans le registre « modèle gratuit ». D'où : **un seul
visage sur tout le site, et il est sur la 404.**

Corollaire pratique : ne pas chercher à « caser » un lot d'icônes téléchargé. Le
dossier `selection-assets/` (hors dépôt) en contient 36 dont 22 portraits — c'est
une tranche alphabétique de bibliothèque, pas une sélection. On y retourne chercher
un fichier quand un besoin précis apparaît, jamais l'inverse.
