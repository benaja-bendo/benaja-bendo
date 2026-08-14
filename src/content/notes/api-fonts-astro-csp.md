---
titre: "L’API Fonts d’Astro casse une CSP stricte (style-src 'self')"
date: 2026-08-13
maj: 2026-08-14
resume: "Le composant Font injecte son @font-face en style inline. Sous une CSP sans 'unsafe-inline' ni hash, ça donne dix violations et zéro police chargée. La sortie tient en un @font-face écrit à la main."
sujets: ["Astro", "CSP", "Typographie"]
statut: "stable"
---

## Le contexte

Ce site sert une CSP stricte : `style-src 'self'`, sans `'unsafe-inline'` et sans
hash. Concrètement, **aucun `<style>` ni attribut `style=` ne doit survivre dans le
HTML produit**. J’ai voulu utiliser l’API Fonts d’Astro 7 pour auto-héberger IBM
Plex proprement.

## Ce que j’ai constaté

Le build passe et les fichiers de police sont bien émis en local — l’API fait son
travail. Mais le composant `<Font/>` écrit sa déclaration `@font-face` dans un
`<style set:html>`, donc un style **inline**. Résultat en production : **dix
violations CSP** et aucune police chargée. Aucune option de l’intégration n’émet un
fichier CSS externe à la place.

La seconde sortie possible — activer `security.csp` d’Astro et reporter les hashes
générés dans les en-têtes de l’hébergeur — a été écartée : elle crée deux sources de
vérité à resynchroniser à chaque changement de police.

## Ce que j’ai retenu

`@font-face` écrit à la main en tête de la feuille de style globale, fichiers
`woff2` déposés dans `public/fonts/`, sous-ensembles latin uniquement. 92 Ko au
total pour IBM Plex Sans (variable) et Mono. C’est plus manuel, mais il n’y a plus
qu’un seul endroit à modifier pour ajouter un alphabet.

## Comment le vérifier

La règle est vérifiable en une commande, et c’est celle que je lance après tout
changement de rendu :

```bash
npm run build && grep -rlE '<style[ >]|<[a-zA-Z][^>]* style="' dist --include='*.html'
```

Elle ne doit **rien** afficher. Si un fichier sort, quelque chose a réintroduit un
style inline — le plus souvent une intégration, pas mon code. C’est d’ailleurs ce
qui m’a fait couper la coloration syntaxique des blocs de code : Shiki écrit ses
couleurs en attribut de style sur le bloc et sur chaque fragment coloré.

Le motif a l’air compliqué pour une bonne raison. Sa version naïve signalait cette
page même : la commande recherchée apparaît dans le bloc ci-dessus, échappée par le
générateur, et se trouvait donc elle-même. Exiger un contexte de balise ouvrante
règle le problème — une page qui parle d’un attribut n’en contient pas un.

## Les limites

Constaté sur Astro 7.2 en août 2026, avec `build.inlineStylesheets: 'never'`. Si
l’intégration se met à émettre un CSS externe, cette note devient obsolète : c’est
la première chose à revérifier avant de la citer.
