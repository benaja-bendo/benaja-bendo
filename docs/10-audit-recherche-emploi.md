# Audit — le site comme instrument de recherche d'emploi

*Établi le 14 août 2026, à partir du build local, du rendu mesuré dans le
navigateur en clair et en sombre, et de la vérification des surfaces externes
(profil GitHub, dépôts, mibeko.fr, fiches des stores).*

Ce document a un angle unique, différent de celui de
[l'audit archivé 09](archives/09-audit-codex.md) : non pas « ce site est-il beau
et bien fait », mais **« ce site aide-t-il réellement à décrocher un CDI ? »**.
Il n'y a donc presque rien ici sur la direction artistique.

---

## Verdict

Le site est techniquement excellent et remarquablement bien écrit. Mais comme
instrument de recherche d'emploi, il sous-exploitait son meilleur atout : des
preuves publiques, vérifiables et impressionnantes existent, et le site ne les
montrait presque jamais.

Formulé autrement, et c'est le constat qui a déclenché tout ce chantier : **le
README du profil GitHub faisait un meilleur travail de candidature que le site.**
Il nommait la stack complète, listait les six dépôts, mentionnait les jeux
Phaser et portait même une ligne en anglais. Le site ne faisait rien de tout ça.

---

## Ce qui a été mesuré, et pas supposé

| Constat | Mesure |
| --- | --- |
| Liens sortants du build entier | LinkedIn ×30, racine du profil GitHub ×28, `mibeko.fr` ×10, dépôt du site ×5. **Zéro** vers les dépôts Mibeko, **zéro** vers les stores. |
| Dépôts Mibeko | Les six répondent 200 et sont publics. `mibeko-dashboard` seul : 279 commits, tests, Docker, CI/CD, doc d'architecture. |
| Épinglés du profil GitHub | `electronjs-with-typescript`, `back-app-quiz`, `louka-loca-docs`, `env-vps`, `fluxo-erp` — aucun lien avec Mibeko. Corrigé par Bénaja le 14/08/2026. |
| Technologies sur l'accueil | « Spring Boot » ×2. React, TypeScript, Kotlin, Laravel, Docker, Ansible, OpenShift : **0**. |
| Pages de taxonomie | Le seuil de deux réalisations (`SEUIL_FILTRE`) exclut React, Laravel, Kotlin et Flutter : aucune page de repli pour ces technos. |
| CV | Aucune occurrence dans le build. Aucune feuille de style d'impression. |
| `mibeko.fr` | En ligne, sérieux, une soixantaine de textes publiés — mais l'assistant IA sourcé est derrière l'espace Pro. |
| Cibles tactiles | Puces de taxonomie cliquables à **35 px** sur `/etudes/*` à 375 px, sous la règle des 44 px du projet. |

---

## Les constats, et ce qui en a été fait

### 1. Le site ne pointait jamais vers ce qui prouverait tout — ✅ corrigé

Le point le plus coûteux et le plus facile à réparer. Un lecteur technique qui
voulait juger sur pièces arrivait sur un profil de 88 dépôts, sans savoir
lesquels regarder. La page contact promettait pourtant « les dépôts Mibeko ».

**Fait :** un type `preuve` entre dans le schéma de contenu
(`src/content.config.ts`) — un lien, plus **ce qu'il prouve**, plus une famille.
Le composant `Preuves.astro` les rend groupées : le produit en ligne, les
applications publiées, le code source. Neuf liens vérifiables apparaissent
maintenant sur l'étude Mibeko et sa fiche. La carte GitHub de la page contact
n'envoie plus vers la racine du profil mais vers cette liste commentée.

> Les URL des stores viennent de `mibeko.fr/produits`, pas d'une reconstruction :
> `apps.apple.com/app/id6768865781` et
> `play.google.com/store/apps/details?id=cg.mibeko.app`. Les six dépôts ont été
> testés (HTTP 200) avant d'être liés — un lien mort vaut moins que pas de lien.

### 2. Le lien « Voir Mibeko en ligne » ne montre pas la promesse centrale — ⏳ ouvert

Le site affirme partout que l'assistant « cite l'article exact d'où vient chaque
réponse ». Or le public de `mibeko.fr` est un portail juridique : l'assistant
sourcé vit derrière l'espace Pro. Un recruteur qui clique ne peut donc pas
vérifier la seule chose qui distingue Mibeko d'un chatbot.

**Fait :** la galerie et ses styles sont écrits et prêts dans
`MibekoProof.astro`. **Reste à faire :** prendre les captures — voir la
spécification plus bas.

### 3. Une imprécision factuelle sur l'accueil — ✅ corrigé

L'accueil disait au présent : « j'écris des microservices Java / Spring Boot
chez Capgemini, sur des systèmes des finances publiques ». C'est l'AIFE,
`statut: termine`, 2023–2024. Depuis 2024, la mission est France Travail. Un
lecteur qui enchaînait l'accueil puis les études voyait l'écart de deux ans —
exactement ce que la règle de contenu n°1 interdit.

La phrase distingue maintenant la mission en cours de la précédente. La
description de la page a été alignée au passage.

### 4. La stack était illisible pour qui scanne — ✅ corrigé

**Fait :** `src/lib/stack.ts` devient la source unique, rendue par
`StackVisuelle.astro` — logos monochromes groupés par famille, variante compacte
sur l'accueil, complète sur le CV. Trois décisions structurantes :

- **Aucun niveau, aucune jauge, aucune étoile.** Une barre « React 80 % » n'est
  pas une mesure, c'est une opinion mise en graphique, et elle se fait démonter
  au premier entretien technique.
- **Icônes en `currentColor`, jamais en couleur de marque.** Vingt teintes
  officielles feraient un album d'autocollants, sortiraient du système de design
  (invariant n°4) et exigeraient un `style=` par puce — interdit par la CSP.
- **Tracés vendorisés, pas une dépendance.** `simple-icons` (CC0) a été installé,
  `src/lib/icones-tech.ts` généré par `scripts/generer-icones.mjs`, puis le
  paquet retiré. Garder 3 000 icônes en `node_modules` pour en utiliser vingt
  contredirait l'économie du projet. Power BI et AWS n'ont pas d'icône libre :
  le composant rend un monogramme encadré plutôt qu'un logo approximatif.

### 5. Pas de CV, et pas de plan B pour l'imprimer — ✅ corrigé, décision actée

**Décision : le site remplace le PDF.** La page `/cv` est la seule surface, et
son export tient dans la feuille de style — `@page` en A4, thème clair forcé,
en-tête, pied et boutons retirés, coupures de page contrôlées. `Cmd/Ctrl + P`
produit un fichier présentable.

Le raisonnement est celui qui gouverne tout le projet : un PDF déposé quelque
part est exactement le genre d'artefact qui se périme sans prévenir — c'est
l'invariant n°5, et le site de 2022 resté quatre ans en ligne. Une page se
corrige en une ligne et se redéploie.

**Revirement du 14/08/2026, assumé — et la règle qui l'avait causé a été
supprimée.** La première version ne donnait que l'indication clavier
`Cmd/Ctrl + P`, au motif qu'un second fichier JS ne se justifiait pas. C'était un
raisonnement de développeur. Le lecteur visé par cette page est un recruteur ou
un RH : lui demander un raccourci clavier pour récupérer un CV revient à lui
demander de renoncer.

L'invariant n°3 disait « un seul fichier JS, et il se justifie ». Il a servi une
fois à améliorer le site — en écartant les frameworks — et une fois à le
dégrader, en écartant ce bouton. Il ne dit plus qu'il faut économiser le
JavaScript, seulement où le mettre (fichier externe, la CSP l'exige), quand le
charger (par page, en `defer`) et comment le faire dégrader (rien de visible tant
que le script n'a pas répondu présent). `/cv` porte donc deux
boutons — un dans l'en-tête, un en pied de page — servis par `public/js/cv.js`,
chargé **en `defer` et sur cette seule page** via la prop `script` de
`Base.astro`. `onclick=` reste exclu : la CSP bloque tout script en ligne.

Le contrat de dégradation est le même que celui de la bascule de thème : les
boutons sont masqués tant que le script n'a pas posé `data-cv-pret` sur `<html>`,
et l'indication clavier reste écrite sur la page. Sans JavaScript, personne ne
voit un bouton mort et le résultat reste atteignable.

> ⚠️ Piège rencontré, à ne pas défaire : `prefers-color-scheme` **n'est pas**
> neutralisé à l'impression. Sur une machine réglée en sombre, la règle
> `:root:not([data-theme="clair"])` (spécificité 0,2,0) écrasait un simple
> `:root` (0,1,0) et le CV serait sorti en pleine page noire. Le bloc `@media
> print` reprend donc le même sélecteur, en fin de fichier, et gagne par ordre
> d'apparition.

### 6. La promesse d'inventaire n'est pas tenue — ⏳ ouvert, décision à prendre

`/realisations` annonce « un inventaire, pas une sélection » et « y compris
quand la réponse n'est pas flatteuse ». Il contient quatre entrées, toutes
valorisantes, et `congo-web-mobile.md` est en `brouillon: true`. Les trois
années qui prouvent le plus — des clients réels avant les diplômes — sont donc
invisibles dans l'inventaire alors que le parcours les mentionne.

Deux sorties honnêtes : publier cette entrée même imparfaite, ou changer le mot
« inventaire ». La première est plus forte. Elle demande ce que toi seul peux
écrire : quels projets nommer, pour quels clients, et ce que tu en retiens.

### 7. Deux détails qui coûtent cher — ✅ corrigés

L'étude AIFE se terminait sur : « C'est l'expérience qui ancre la crédibilité
"entreprise" ». C'était une note de stratégie de candidature laissée dans le
contenu public : elle disait au lecteur ce qu'il était censé conclure, ce qui
produit l'effet inverse. **Retirée le 14/08/2026.** L'étude s'arrête maintenant
sur ce qui a été fait, et laisse le lecteur en tirer la conclusion — reste
ouverte la question de savoir si elle a un objet d'étude (voir ci-dessous).

Les cibles tactiles sous 44 px ont été corrigées. `align-self: stretch` ne
suffisait pas : il étire le lien à la boîte de *contenu* de la puce, soit 44 px
moins la bordure et le rembourrage — 35 px au doigt. La puce paraissait
conforme, le lien ne l'était pas. Les liens de contact du CV (23 px sur mobile,
dont l'adresse e-mail) sont traités de la même façon.

---

## Les captures à prendre

L'emplacement, les styles et le décodage sont déjà écrits. Il suffit de déposer
le fichier dans `public/images/` et de passer `pret: true` dans le tableau
`captures` de `src/components/MibekoProof.astro`.

Tant qu'une capture n'est pas prête, elle ne laisse **aucune trace publique** :
pas de cadre gris, pas de « bientôt disponible ». L'invariant n°5 interdit de
laisser vivre de l'inachevé en ligne, et une promesse de capture en est une.

| Fichier attendu | Format | Ce qu'il doit montrer | Priorité |
| --- | --- | --- | --- |
| `mibeko-reponse-citation.jpg` | 1280 × 720 | Une question, la réponse, et la référence de l'article cité dans le même écran. | **Critique** |
| `mibeko-article-source.jpg` | 1280 × 720 | Le lien de citation ouvert sur le texte officiel, à l'article exact. | Haute |
| `mibeko-mobile.jpg` | 750 × 1334 | La même chaîne dans l'application publiée. | Haute |

Contraintes : JPEG ou WebP, moins de 150 Ko en large et 120 Ko en mobile,
servis depuis le domaine (jamais de lien externe), **aucune donnée client,
aucun compte réel, aucune adresse e-mail visible**.

La première est la seule qui compte vraiment. Sans elle, la différence entre
Mibeko et un chatbot qui prétend citer ses sources reste une affirmation.

---

## Ce qui reste ouvert

Repris de l'audit archivé 09 quand c'est toujours vrai, et daté quand ça ne
l'est plus.

1. **La capture question → réponse → article.** Le premier gain du site.
2. **Publier ou déclasser la réalisation Congo** (§6 ci-dessus).
3. **Décider du sort de l'étude AIFE.** La phrase de stratégie en a été retirée
   le 14/08/2026, mais le fond n'a pas changé : la page dit une équipe de 10, du
   SAFe, du Java/Spring et une contribution AWS — pas de problème précis, pas de
   décision, pas de résultat observable. Soit elle gagne une vraie décision
   racontable, soit elle redevient une simple réalisation. Une étude courte est
   acceptable ; une étude sans objet d'étude ne l'est pas.
4. **Une note issue du cœur du travail.** Les deux notes publiées parlent de la
   construction de ce site. Une note sur la provenance des documents, la
   recherche hybride, l'évaluation d'un RAG sourcé ou la publication Kotlin
   Multiplatform rééquilibrerait fortement l'ensemble.
5. **Vue.** C'est la seule techno de la stack qu'aucune réalisation publiée
   n'appuie : elle vient du README. La soutenir ou la retirer.
6. **Une version anglaise.** Le site est entièrement en français, ce qui convient
   à un CDI bordelais et coûte cher pour du remote ou de l'international. À
   trancher, pas à laisser en suspens.
7. **Les captures mobiles des visuels existants** et les images Open Graph
   spécifiques par étude — hérités de l'audit 09, toujours valables.

Ce qui vient de l'audit 09 et **n'est plus vrai** : l'en-tête mobile de 132 px
(mesuré à 59 px), les ancres masquées sous l'en-tête (`scroll-padding-top: 80px`
posé), l'absence de bascule de thème (livrée le 14/08/2026), et l'absence de
`noindex` sur `/experiences`.

---

## Vérifier après modification

En plus de la checklist de [CLAUDE.md](../../CLAUDE.md) :

```bash
npm run build && grep -rlE '<style[ >]|<[a-zA-Z][^>]* style="' dist --include='*.html'
```

Et, spécifique à ce chantier — les liens de preuve doivent tous répondre :

```bash
grep -rhoE 'https://(github\.com/benaja-bendo|apps\.apple\.com|play\.google\.com)[^"]*' dist --include='*.html' | sort -u | while read -r u; do printf '%s -> %s\n' "$u" "$(curl -s -o /dev/null -w '%{http_code}' -L "$u")"; done
```

Un lien de preuve mort est pire que l'absence de preuve : il transforme un
argument en négligence visible.
