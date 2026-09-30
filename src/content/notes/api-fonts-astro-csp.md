---
titre: "L’API Fonts d’Astro casse une CSP stricte (style-src 'self')"
date: 2026-08-13
maj: 2026-09-30
resume: "Le composant Font d’Astro écrit ses polices dans un style placé directement dans la page. Avec une politique de sécurité stricte, le navigateur le bloque : dix erreurs, aucune police chargée. J’ai écrit le @font-face à la main."
sujets: ["Astro", "CSP", "Typographie"]
statut: "stable"
---

## Le contexte

Mon site applique une politique de sécurité stricte, une CSP (Content Security
Policy) : `style-src 'self'`, sans `'unsafe-inline'` et sans hash. Concrètement,
le navigateur refuse tout style écrit directement dans la page : **aucune balise
`<style>` ni attribut `style=` ne doit rester dans le HTML produit**. Je voulais
utiliser l’API Fonts d’Astro 7 pour héberger moi-même la police IBM Plex.

## Ce que j’ai constaté

Le build passe, et les fichiers de police sont bien copiés en local. Mais le
composant `<Font/>` écrit sa déclaration `@font-face` dans un `<style set:html>`,
c’est-à-dire un style placé dans la page. En production, le navigateur le
bloque : **dix violations de la CSP**, et aucune police chargée. Aucune option de
l’intégration ne permet de sortir ce style dans un fichier CSS à part.

Il existait une autre voie : activer `security.csp` d’Astro, puis recopier les
hashes générés dans les en-têtes de l’hébergeur. Je l’ai écartée : il aurait
fallu tenir deux listes à jour à chaque changement de police.

## Ce que j’ai retenu

J’ai écrit le `@font-face` à la main, en tête de la feuille de style globale,
et déposé les fichiers `woff2` dans `public/fonts/`, en ne gardant que les
caractères latins. Au total, 92 Ko pour IBM Plex Sans (variable) et Mono. C’est
plus manuel, mais il n’y a plus qu’un seul endroit à modifier pour ajouter un
alphabet.

## Comment le vérifier

Je lance cette commande après chaque changement de rendu :

```bash
npm run build && grep -rlE '<style[ >]|<[a-zA-Z][^>]* style="' dist --include='*.html'
```

Elle ne doit **rien** afficher. Si un fichier apparaît, quelque chose a remis un
style dans la page, le plus souvent une intégration et pas mon propre code.
C’est aussi pour ça que j’ai coupé la coloration des blocs de code : Shiki,
l’outil qui la fait, écrit ses couleurs en attribut `style` sur chaque morceau
coloré.

Le motif de recherche a l’air compliqué, et il y a une raison. Sa version
simple signalait cette page elle-même : la commande apparaît dans le bloc
ci-dessus, et elle se trouvait donc toute seule. Le motif exige maintenant une
vraie balise ouvrante autour de `style=`.

## Les limites

Constaté sur Astro 7.2 en août 2026, avec `build.inlineStylesheets: 'never'`. Si
l’intégration se met un jour à produire un fichier CSS séparé, cet article
devient obsolète : c’est la première chose à revérifier avant de le citer.
