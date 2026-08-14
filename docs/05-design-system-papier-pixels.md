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

- **Header** — collant, filet d'encre 2px. Monogramme `BB` : bloc teal à **coins vifs**,
  bordure encre, ombre 2px. Nav en mono ; la page courante est marquée par un **trait
  d'encre sous le lien**, pas par une couleur. Pastille « CV (PDF) » en relief.
  Media query dédiée < 48rem : sans elle l'ombre de la pastille déborde sous le filet.
- **Hero** — eyebrow (glyphe 4 pixels : 3 teal + 1 ambre), nom en h1, rôle en mono.
  **`.hero-proof` est le bloc le plus épais de la page** : c'est voulu, c'est la seule
  chose à lire si on ne lit qu'une chose. Sur l'accueil, une illustration éditoriale
  « citation footnote » de Koboyo matérialise la traçabilité de Mibeko. Elle est intégrée
  dans un composant Astro, recolorée par les tokens et ne déclenche aucune requête tierce.
- **Surligneur `<mark>`** — `.mark-1` (défaut) = la preuve · `.mark-time` = le temps, la
  disponibilité · `.mark-human` = le parcours. **Deux marques maximum par bloc** :
  au-delà, plus rien ne ressort.
- **Boutons** — bordure + ombre dure ; au survol ils se **soulèvent** (−2px, ombre 6px),
  au clic ils s'**enfoncent** (+2px, ombre 0). Hauteur mini 2.75rem (cible tactile).
- **Cartes** — liseré pixel en tête (6px), puces **carrées** teal, soulèvement au survol.
  La gouttière est portée par les enfants (`.card > *`), pas par la carte : c'est ce qui
  permet au liseré de toucher les bords.
- **Tuiles de chiffres** — grand nombre en mono teal, `tabular-nums`, liseré pixel.
- **Footer** — fond `--surface-2`, pastille de disponibilité **carrée** (un pixel, pas une
  LED), liens en mono.
- **404** — le code en mono géant avec ombre dure. La seule vraie fantaisie de la v1.

## 5. Accessibilité & mouvement

- Contrastes vérifiés AA (tableau §1) ; l'ambre est cantonné aux aplats.
- `:focus-visible` teal 3px partout, cibles ≥ 44px, `lang="fr"`, skip-link.
- Transitions 140 ms, **uniquement** transform + box-shadow. Tout est désactivé sous
  `prefers-reduced-motion: reduce` (y compris les transformations de survol).
- Rien de ce qui bouge n'est nécessaire à la lecture.

## 6. Ce qui reste à faire sur le design

- [x] ~~Trancher la question des webfonts~~ — fait le 13/08/2026 (§3).
- [x] Favicon pixel sur l'accent teal.
- [x] Image Open Graph dédiée 1200×630 pour les aperçus sociaux.
- [ ] Décliner le système sur `/mibeko`, `/experiences`, `/a-propos`, `/colophon` : les
      classes existent déjà, mais ces pages n'ont pas été relues une par une.
- [ ] Scène pixel de la 404 (aujourd'hui : seulement le code en gros).
- [ ] Sélecteur clair/sombre manuel — **seulement** si une solution sans style inline est
      trouvée (voir invariant CSP).
