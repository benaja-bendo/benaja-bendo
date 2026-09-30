# Refonte du contenu : un ton naturel, des faits à jour

*Établi le 30/09/2026, à partir des retours reçus sur le site et sur le CV.
C'est le plan de travail du chantier : chaque étape terminée met à jour le
tableau de suivi ci-dessous, dans le même commit.*

---

## Les retours reçus

1. La disponibilité « à partir du 28 septembre 2026 » est dépassée.
2. Le texte « fait IA » : trop écrit, pas assez naturel.
3. Le CV montre une coupure entre ce qui a été fait au Congo et en France.
4. Le nombre de tests n'intéresse pas le lecteur. La façon de tester, si.
5. La rubrique « Études de cas » doublonne « Réalisations ».
6. Certaines pages ne servent à rien, et la rubrique Notes doit pouvoir
   accueillir de vrais articles.

## Suivi

| Étape | État |
| --- | --- |
| 1. Disponibilité : une seule phrase, affichée à peu d'endroits | ✅ 30/09/2026 |
| 2. Tests : décrire la méthode, pas le nombre | ✅ 30/09/2026 |
| 3. CV et parcours : Congo et France d'un seul tenant, faits corrigés | ✅ 30/09/2026, à relire par Bénaja |
| 4. Fiche Trouve Ton Profil | ✅ 30/09/2026, « Ce que j'en retiens » à réécrire par Bénaja |
| 5. Fusion des études de cas dans les réalisations | ✅ 30/09/2026 (accord donné) : 301 dans firebase.json, ancres conservées, pages groupées par type |
| 6. Ton : réécriture page par page | ✅ 30/09/2026 en grande partie : accueil, parcours, contact, réalisations, composants. Restent le colophon, les notes et le README. Vérification visuelle faite le 30/09 (clair / sombre, mobile / desktop) |
| Mise en ligne des étapes 1 à 6 | ✅ 30/09/2026, commit bd2412f, déployé par GitHub Actions ; les 301 vérifiées en production |
| 7. Pages et blocs à retirer ou réduire | ✅ 30/09/2026 (détail en §6) |
| 8. Notes → Articles | À faire |
| 9. Visuels, photo, mouvement | Plus tard |

---

## 1. La disponibilité

**Décision (30/09/2026).** Plus de date : une date passée fait vieillir tout le
site, et c'est exactement ce qui est arrivé le 28/09. La phrase est
**« Disponible dès maintenant pour un CDI »**, écrite une seule fois dans
`DISPONIBILITE.texte` (`src/lib/parcours.ts`).

Elle n'apparaît qu'à quatre endroits, tous branchés sur cette constante :

| Où | Comment |
| --- | --- |
| Pied de page (toutes les pages) | composant `Disponibilite.astro` |
| Haut de l'accueil | composant `Disponibilite.astro` |
| Contact | composant `Disponibilite.astro` |
| En-tête du CV | la constante, en texte |

Elle a été retirée partout ailleurs : case de l'accueil, bloc « Disponibilité »
de l'accueil, fin des études de cas, liste de la page contact, descriptions
pour les moteurs de recherche. Pas de phrase du type « mon alternance s'est
terminée en… » : court et simple.

**Le jour de la signature :** changer cette ligne de `parcours.ts`, puis le
README de profil et LinkedIn. Rien d'autre.

---

## 2. La voix de Bénaja

### Ce qu'il a écrit lui-même

Trois phrases dictées le 30/09/2026, à peine corrigées. Ce sont les
références pour tout texte du site :

> Avec six ans d'expérience, je suis aujourd'hui capable de travailler sur des
> projets complexes et de rendre fiable un produit bancal.

> Sur un outil juridique, surtout au Congo, il faut pouvoir se protéger :
> chaque réponse doit renvoyer au texte d'origine, pour qu'on le retrouve
> facilement.

> Mibeko est un projet personnel. Il vise avant tout à aider les gens au Congo
> qui n'ont pas facilement accès aux textes de loi. Mibeko rend ces textes
> simples à consulter pour tout le monde, et donne aux professionnels des
> outils adaptés à leurs besoins.

### Ce qui caractérise cette voix

- **Le contexte d'abord, le but ensuite.** « Sur un outil juridique, surtout
  au Congo, il faut… »
- **Les gens avant la technique.** « aider les gens au Congo », « pour qu'on le
  retrouve facilement ».
- **Des mots simples, parfois familiers** : « bancal », « badger », « un peu
  comme Uber Eats ». Ils rendent le texte vivant.
- **Des liaisons orales** : « aujourd'hui », « avant tout », « pas forcément »,
  « donc », « surtout ».
- **Aucune formule.** Pas de chute, pas de phrase construite pour être citée.

### Ce qui donne l'effet « IA », et la règle qui le remplace

Mesuré sur le build du 29/09/2026 :

| Tic | Exemple en ligne | Règle |
| --- | --- | --- |
| « X, pas Y » et « ce n'est pas X, c'est Y » (33 fois) | « La preuve, pas la promesse » | Dire Y directement. |
| Le site commente sa propre stratégie | « Un produit public pour juger l'autonomie de bout en bout » | Le site ne parle pas de lui-même ni de son lecteur. |
| Un vocabulaire de tribunal | « Voir les preuves », « Juger sur pièces », « mon rôle réel » | « Projet », « travail », « voir le code ». |
| Des maximes | « le modèle propose, le schéma dispose » | Une idée par phrase, sans effet. |
| Des triplets rythmés | « comprendre un problème réel, construire l'outil qui le règle, et le faire tenir dans la durée » | Un fait à la fois. |
| Un sur-titre sur chaque section (36) | « En deux mots », « Pratique », « Et ensuite » | Un sur-titre en haut de page seulement. |

### Avant / après, à appliquer à l'étape 6

| En ligne | Proposition |
| --- | --- |
| « Avec 6 ans d'expérience, je transforme des processus métier fragiles en services fiables et je porte des produits jusqu'en production. » | « Avec six ans d'expérience, je sais aujourd'hui travailler sur des projets complexes et rendre fiable un produit bancal. Je travaille surtout en Java / Spring Boot et en React. » |
| « Deux contextes, deux preuves » | « Deux projets pour commencer » |
| « Un produit public pour juger l'autonomie de bout en bout. Une mission en entreprise pour juger l'impact… » | « Mibeko, une application que j'ai créée pour le Congo. Et ma mission chez Capgemini pour France Travail, en équipe. » |
| « Voir les preuves » | « Voir mes projets » |
| « Le fil conducteur n'a pas bougé : comprendre un problème réel, … » | Supprimer : les étapes du parcours suffisent. |
| « Je construis maintenant des systèmes logiciels qui n'ont pas besoin de moi pour tourner. » | Supprimer. |
| « Sur un outil juridique, la traçabilité passe avant la qualité de la réponse… » | « Sur un outil juridique, surtout au Congo, il faut pouvoir se protéger : chaque réponse doit renvoyer au texte d'origine. » |
| « Ce n'est pas une consigne donnée au modèle : c'est un contrôle appliqué à sa sortie. » | « Avant d'afficher une réponse, le code vérifie que chaque article cité existe bien dans la base. Sinon, la citation est retirée. » |
| « le modèle propose, le schéma dispose » | « Si ce que renvoie l'IA n'a pas la bonne forme, ça n'entre pas en base. » |
| « Un outil interne n'est adopté que s'il supprime le geste manuel, pas s'il le range mieux… » | « Pour les utilisateurs, le vrai changement, c'est de ne plus avoir à relancer ni à ressaisir à la main. » |
| « Écrivez-moi. » + « Pas de formulaire ni de suivi… » | « Le plus simple, c'est un mail : contact@benaja-bendo.fr » |
| « Il n'y a pas de fichier à télécharger, et c'est volontaire… » | « Ce bouton enregistre le CV en PDF, au format A4. » |
| « 2 réalisations où Java est en jeu, avec le rôle que j'y ai tenu, pas seulement la mention de l'outil. » | « Les projets où j'ai utilisé Java. » |

« Moi aussi je cherche. », sur la 404, sonne juste : à garder.

---

## 3. Les tests

Le nombre (« ~730 », « environ 200 », « 189 ») a été retiré du texte publié le
30/09/2026. Formulations retenues, vraies d'après les dépôts :

- « Chaque modification est testée automatiquement. Rien n'est mis en ligne si
  les tests échouent. »
- Pour Mibeko, en détail : l'API (Pest), le tableau de bord (Vitest) et
  l'application mobile (Kotlin) sont testés à chaque modification ; le
  traitement des documents a ses propres tests (pytest).

**À ne pas écrire** : « entièrement testé », « 100 % testé ». C'est une
affirmation de couverture de code qu'on ne mesure pas, et elle se démonte en
entretien. « Rien ne part en production sans que les tests passent » est plus
fort, et vérifiable dans les workflows.

---

## 4. Le CV : Congo et France d'un seul tenant

### Ce qui créait la coupure

- Capgemini avait quatre points chiffrés ; KabimGroup et InfraOne, deux lignes
  génériques chacun, sans un seul projet nommé.
- Le lien « Réalisation : web et mobile au Congo » était le seul endroit où un
  pays servait de catégorie.
- L'accroche ne disait rien des trois premières années.
- Les dates se chevauchaient : KabimGroup jusqu'en 2023, Bachelor à Bordeaux
  affiché dès 2022.

### Faits confirmés par Bénaja le 30/09/2026

| Fait | Avant sur le site | Correct |
| --- | --- | --- |
| KabimGroup | 2021–2023, Laravel, Flutter, Node.js, C# / .NET, Xamarin | Fin 2021 à février 2023. Surtout un **parseur de CV** (lecture automatique, OCR), en **Node.js et Laravel**, beaucoup de R&D, avant l'arrivée des IA génératives |
| InfraOne System | Logiciels métier ; sites d'entreprise en ASP.NET Core pour des sous-traitants de Total | 2020–2021, surtout en **C# / .NET Core**, applications variées. Principale : **InfraChecking**, application mobile (back-end .NET et Laravel) pour que les sous-traitants de Total E&P Congo badgent leurs arrivées et départs. Aussi **Nyota IT**, projet d'application de commande de repas façon Uber Eats (Xamarin, Laravel, .NET, Angular) |
| Bachelor EPSI | 2022–2023, obtenu en septembre 2023 | **Septembre 2023 à 2024**, obtenu en 2024 |
| Flutter | Attribué à KabimGroup | Uniquement bgrfacile (application Android) |

La ligne « sites d'entreprise en ASP.NET Core pour des sous-traitants de
Total » a été remplacée par InfraChecking, qui répond au même client. À
rétablir si c'était un travail distinct.

### Ce qui a été fait

1. Accroche du CV général et de la version Java / Spring Boot : elles
   racontent une seule histoire, du Congo à Capgemini.
2. Chaque poste au Congo nomme ses projets, comme Capgemini nomme les siens.
3. Un fil explicite entre les deux pays : la lecture automatique de documents
   de KabimGroup se retrouve dans Mibeko ; la relation client directe, avec La
   Grenaille.
4. La réalisation s'appelle « InfraOne System et KabimGroup » (même adresse,
   `/realisations/congo-web-mobile`, pour ne casser aucun lien envoyé).

**Reste à reporter sur LinkedIn** : fin de KabimGroup (février 2023), dates du
Bachelor, fin de Capgemini, disponibilité.

---

## 5. Fusionner les études de cas dans les réalisations

Les trois études doublonnent leurs trois fiches (l'étude AIFE fait 203 mots,
sa fiche 190). Seule Mibeko a vraiment plus de matière.

- **Une seule page par projet**, sous `/realisations/…`. Mibeko et France
  Travail récupèrent le texte long et leurs visuels (démo de l'assistant,
  schéma avant / après).
- **Redirections permanentes** de `/etudes/*` vers `/realisations/*` : les PDF
  de CV déjà envoyés pointent vers `/etudes/france-travail`, `/etudes/aife` et
  `/etudes/mibeko`. Les ancres restent les mêmes (`#ce-que-jai-fait`,
  `#la-construction`, `#la-production`, `#preuves-titre`).
- `/experiences` devient une redirection vers `/realisations`, où les lignes
  France Travail et AIFE portent les ancres `#france-travail` et `#aife`.
- **Navigation** : Réalisations · Articles · Parcours · CV · Contact.

⚠️ Les redirections touchent `firebase.json` et `astro.config.mjs` : accord de
Bénaja avant de les écrire.

### La page Réalisations, par type de travail

Le classement par type de travail, et non par pays, règle aussi la coupure
France / Congo :

- **Mes produits** : Mibeko, bgrfacile (arrêté)
- **En entreprise** : France Travail, AIFE, KabimGroup, InfraOne System
- **Pour des clients, avec d'autres** : La Grenaille, Trouve Ton Profil

### Chaque fiche suit le même plan

1. Une phrase qui dit ce que c'est.
2. Un encadré : quand, mon rôle, état du projet, liens.
3. Le contexte.
4. Ce que j'ai fait.
5. Le résultat.
6. Ce que j'en retiens, en une ou deux phrases simples.
7. Les technos.
8. Le code, s'il est public.

---

## 6. Pages et blocs à retirer ou réduire

*Fait le 30/09/2026. La fiche « benaja-bendo.fr » et la page de la techno
Astro (qui n'avait plus qu'une réalisation) redirigent vers `/colophon` :
leurs adresses sont dans les puces des CV déjà envoyés. L'illustration de la
page Contact (`answer.svg`) a été retirée avec l'encart qui la portait.*

| Quoi | Proposition |
| --- | --- |
| Fiche « benaja-bendo.fr », épinglée en tête des réalisations | La retirer, le colophon suffit. Elle affirme « moins de 3 Ko de JavaScript » (environ 7,6 Ko compressés aujourd'hui) et « aucun JavaScript pendant ses six premiers mois » (la refonte date de l'été 2026) |
| Colophon | Le ramener à 5 ou 6 lignes |
| Bloc « Ce que vaut une note » sur `/notes` | Le supprimer |
| Filtres « Par domaine » | Les retirer, garder « Par technologie » |
| Page Contact (3 sections, 3 rangées de boutons) | Un seul écran |
| « Mission client : je décris mon rôle… », répété sur chaque fiche | Une ligne courte, une fois |
| Accueil : 5 rangées de boutons | En garder 2 |

---

## 7. Notes → Articles

Les deux notes publiées parlent de la plomberie de ce site. Elles sont justes,
mais pas représentatives du travail de Bénaja. La rubrique devient
**« Articles »** et s'écrit à partir de ce qu'il a construit, sans rien de
confidentiel :

1. Comment l'assistant Mibeko cite l'article exact (le RAG expliqué simplement)
2. Trouver un article de loi sans connaître les mots de la loi : recherche
   hybride avec PostgreSQL et pgvector
3. Des PDF scannés à une base propre : OCR, modèle de langage et schéma strict
4. Lire un CV automatiquement en 2022, avant les IA génératives (KabimGroup),
   et ce que ça change en 2026 (Mibeko)
5. Publier une app Kotlin Multiplatform sur l'App Store et Google Play
6. Un serveur en Ansible pour deux produits (Mibeko et La Grenaille)
7. GitHub Actions : rien ne part en production si les tests échouent
8. La Grenaille : tenir un compte de métal précieux en grammes
9. Coder avec Claude Code sur un vrai projet : les règles écrites dans chaque
   dépôt
10. Un cluster Kubernetes sur Raspberry Pi, quand il sera documenté
11. De la maintenance industrielle au développement

Chaque article a déjà sa page. À ajouter : sommaire, temps de lecture, lien
vers le projet concerné. **Pas de serveur** : il ne servirait qu'aux
commentaires, aux likes ou à une newsletter, ce qui contredit l'invariant n°2
(zéro requête tierce) et le choix d'un hébergement statique. La discussion se
fait sur LinkedIn, où chaque article est partagé. Aucun rythme promis.

---

## 8. Plus tard

- De vraies captures de Mibeko : trois sont prévues dans `MibekoProof.astro`
  et jamais prises.
- Des captures de La Grenaille, avec l'accord du fondeur.
- Une photo de Bénaja sur l'accueil ou le parcours : la règle « un seul
  visage, sur la 404 » (docs/05 §7) est à rouvrir.
- Le mouvement : la base existe (transitions de page, apparitions au
  défilement), on l'enrichit après le contenu.

---

## Point ouvert : l'ancre au chargement

Constaté le 30/09/2026 dans le navigateur intégré de Claude Code : une adresse
avec ancre (`/realisations/mibeko#la-construction`) ouvre la page en haut,
sans descendre à la section. Un changement d'ancre dans la page, lui,
fonctionne. Le site en ligne se comporte pareil (`/etudes/mibeko#…`) : ce
n'est pas lié à la fusion. À vérifier dans un vrai Chrome ou Safari avant de
chercher une cause (pistes : `scroll-behavior: smooth` sur `html`, transitions
de page `@view-transition`).
