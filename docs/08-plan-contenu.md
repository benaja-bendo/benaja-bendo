# Stratégie de contenu — une mémoire professionnelle publique

*Révisé le 14 août 2026. Ce document remplace la logique « CV en ligne » de la
[proposition initiale](03-proposition-refonte.md) pour le contenu et la sitemap. Il garde
le besoin de recrutement comme un parcours important, sans en faire la raison d'être du
site.*

---

## 0. La décision

Le site n'est ni un CV augmenté, ni un blog à alimenter, ni une base de connaissances
exhaustive. C'est un lieu personnel et professionnel où Bénaja peut :

1. **montrer ce qu'il construit** et le rôle qu'il y joue ;
2. **expliquer comment il réfléchit** : contraintes, décisions, compromis et recul ;
3. **conserver ce qu'il apprend** sous une forme retrouvable et partageable ;
4. **laisser apparaître une personne**, ses sujets d'intérêt et sa manière de travailler.

Un recruteur doit pouvoir comprendre le profil rapidement. Un développeur doit pouvoir
trouver de la substance technique. Bénaja doit avoir une raison de revenir sur son propre
site après avoir signé un CDI. Aucun de ces lecteurs ne doit dicter seul toute la page
d'accueil.

### Ce que la proposition fournie voit juste

- séparer les réalisations, les études de cas et les notes ;
- accepter plusieurs niveaux de finition ;
- faire du site un support de discussion en entretien ;
- donner aux petites choses construites une place, pas seulement aux projets « phares » ;
- permettre des parcours par sujet ou technologie avec des URL partageables.

### Ce qu'on ne reprend pas

- **Une rubrique Articles obligatoire.** Une note peut rester une note. Un texte long est
  un format possible, pas le sommet d'une hiérarchie éditoriale.
- **La chaîne imposée note → article → étude de cas.** Une étude de cas part d'une
  réalisation ; elle ne descend pas nécessairement d'une note.
- **Un rythme mensuel.** Un jardin numérique n'est ni une newsletter ni un média. Chaque
  contenu est daté ; aucune fréquence n'est promise.
- **Des gabarits rigides.** Les structures proposées sont des garde-fous. Forcer sept
  sections identiques sur chaque étude produit du remplissage et gomme les différences.
- **Le filtre pensé uniquement pour adapter un discours de candidature.** Les taxonomies
  servent d'abord à retrouver et relier les contenus ; leur utilité en entretien est un
  bénéfice supplémentaire.
- **L'idée que toute phrase doit avoir un lien public.** Une mission confidentielle ne se
  prouve pas comme un dépôt GitHub. On exige des faits soutenables, pas une page couverte
  de liens artificiels.

---

## 1. Les lecteurs et ce qu'ils viennent chercher

| Lecteur | Question réelle | Réponse du site |
| --- | --- | --- |
| Bénaja dans six mois | « Comment avais-je résolu ou arbitré ça ? » | Notes datées, recherche par sujet, liens entre contenus |
| Développeur ou pair | « Comment travaille-t-il, qu'a-t-il appris ? » | Notes, décisions, limites, code ou sources quand publiables |
| Lead dev | « Quel est son niveau d'autonomie et de recul ? » | Études de cas, rôle exact, compromis, ce qui changerait aujourd'hui |
| RH ou recruteur | « Qui est-il, que cherche-t-il, qu'a-t-il réellement fait ? » | Accueil lisible, sélection de travaux, parcours synthétique, contact |
| Client ou collaborateur potentiel | « Est-ce que son expérience correspond à mon besoin ? » | Réalisations par domaine/techno, contexte et rôle clairement bornés |

Le parcours rapide doit exister, mais il ne commande pas tout le contenu. L'accueil
oriente ; les pages suivantes apportent la profondeur.

---

## 2. Sitemap cible

### Navigation principale

```text
/
├── /realisations
│   ├── /realisations/[slug]
│   ├── /realisations/domaine/[domaine]
│   └── /realisations/tech/[technologie]
├── /etudes
│   └── /etudes/[slug]
├── /notes
│   ├── /notes/[slug]
│   └── /notes/sujet/[sujet]
├── /a-propos
└── /contact
```

Navigation visible recommandée : **Réalisations · Études · Notes · À propos**, puis
**Contact** comme action distincte. Tant qu'une rubrique n'a aucun contenu publiable,
elle n'apparaît pas dans la navigation ni dans le sitemap XML.

### Pages secondaires

| Route | Rôle | Dans la navigation principale |
| --- | --- | --- |
| `/colophon` | Expliquer les choix de conception, de sécurité et de sobriété | Non, footer |
| `/rss.xml` | Suivre les notes et les nouveaux textes | Non, footer de `/notes` |
| `/404` | Sortie utile avec liens vers les trois grands espaces | Non |
| `/cv` ou PDF | Document de candidature, si une version maintenue existe | Non, lien secondaire depuis `/contact` ou `/a-propos` |

Le CV n'est pas supprimé par principe. Il est **décentré** : c'est un document pratique,
pas l'architecture du site.

### Rôle de chaque page

#### `/` — orienter, pas tout raconter

- un intitulé de poste explicite, suivi d'une courte phrase sur le type de
  problèmes et de systèmes construits ;
- deux niveaux de preuve dans le hero : produit porté de bout en bout, puis
  expérience en équipe ;
- trois repères factuels scannables sans lire les paragraphes ;
- deux travaux sélectionnés et complémentaires : une preuve publique et une
  mission d'entreprise racontable sans exposer le client ;
- la stack après les travaux, pour que les mots-clés restent reliés à des faits ;
- un aperçu humain bref ;
- la disponibilité et le contact dans un bloc secondaire, exact et facile à réviser.

Les réalisations, études et notes restent trois espaces distincts dans la
navigation. Elles n'ont pas pour autant à occuper chacune une carte sur
l'accueil : une note sur la construction du site ne doit pas prendre la place
d'une preuve de livraison pour satisfaire la symétrie du modèle de contenu.

L'accueil ne doit plus afficher le diplôme comme une « preuve » au même niveau qu'un
produit construit. Le diplôme appartient au parcours ; la preuve principale est le
travail montré et expliqué.

#### `/realisations` — l'inventaire

Inventaire des produits, missions, outils, prototypes, contributions et projets
abandonnés qui ont laissé un apprentissage. Une fiche courte répond à :

- qu'est-ce que c'est ?
- quel problème cela traitait-il ?
- quel était mon rôle exact ?
- quel est son statut aujourd'hui ?
- qu'est-ce que j'en retiens ?
- où voir une preuve publique, si elle existe ?

Une réalisation n'a pas besoin d'être prestigieuse. Elle a besoin d'être située et
honnête. Les archives restent accessibles si leur statut et leur date sont visibles.

#### `/etudes` — les décisions derrière quelques réalisations

Les études de cas ne sont pas un duplicata de l'inventaire. Elles approfondissent une
réalisation quand il existe assez de matière : problème, rôle, contraintes, décisions,
résultat et recul. Une étude peut servir de support en entretien sans adopter un « mode
présentation » ni publier une antisèche de questions/réponses.

#### `/notes` — la mémoire de travail

Des fragments autonomes et datés : commande expliquée, configuration, diagnostic,
lecture annotée, décision technique, retour après incident, solution incomplète mais
utile. Le niveau de finition doit être explicite, pas caché.

Une seule note utile suffit à ouvrir la rubrique. Le risque de rubrique abandonnée est
traité par les dates et les statuts, pas par une cadence artificielle.

#### `/a-propos` — la personne et le fil conducteur

Le parcours n'est pas une deuxième page Expériences. Il raconte ce qui relie la
maintenance industrielle, le développement au Congo, le travail en équipe chez
Capgemini, Mibeko et les expérimentations. Il peut aussi dire :

- les problèmes auxquels Bénaja aime travailler ;
- sa manière de collaborer et de décider ;
- ce qu'il cherche à approfondir maintenant ;
- ce qu'il fait hors du travail quand cela éclaire le reste.

#### `/contact` — ouvrir une conversation

Email, LinkedIn et GitHub suffisent comme canaux. La page organise d'abord les
**intentions** — recruter ou exposer un besoin technique — puis donne à chacune
les faits, les preuves et un objet d'email adaptés. Elle ne prétend pas à une
offre de services détaillée tant que périmètre, disponibilité et modalités ne
sont pas formalisés.

---

## 3. Migration depuis la sitemap actuelle

| Actuel | Cible | Traitement |
| --- | --- | --- |
| `/` | `/` | Réécriture éditoriale, URL conservée |
| `/mibeko` | `/etudes/mibeko` | Redirection permanente ; conserver l'ancienne URL pour les CV et liens déjà envoyés |
| `/experiences` | `/a-propos` et `/etudes/*` | Garder temporairement une page d'orientation, puis redirection quand les études sont autonomes |
| `/experiences#france-travail` | `/etudes/france-travail` | Conserver temporairement l'ancre sur la page de synthèse et y placer un lien direct |
| `/experiences#aife` | `/etudes/aife` | Même traitement |
| `/a-propos` | `/a-propos` | Réécriture, URL conservée |
| `/contact` | `/contact` | Élargir le ton au-delà de la candidature |
| `/colophon` | `/colophon` | Conserver |

Une redirection n'est ajoutée que quand sa destination existe réellement. Les anciennes
URL publiques ne sont jamais cassées pour rendre la nouvelle arborescence plus élégante.
Firebase ne reçoit pas le fragment `#...` d'une URL : il ne peut donc pas rediriger les
deux ancres de `/experiences` vers deux pages différentes. La page de compatibilité reste
la solution sûre tant que ces liens ont pu être distribués.

---

## 4. Modèle de contenu

### Réalisation

Champs recommandés : `nom`, `resume`, `statut`, `debut`, `fin`, `role`, `stack`,
`domaines`, `liens`, `enseignement`, `etude`, `epingle`, `maj`, `brouillon`,
`confidentiel`.

Règles utiles :

- `enseignement` est obligatoire : sans lui, l'inventaire redevient un CV en liste ;
- `resume` reste court ;
- `statut` et `maj` sont visibles ;
- une fiche confidentielle peut ne contenir aucun lien public ; son rôle et son
  périmètre doivent alors être particulièrement précis ;
- les taxonomies sont courtes et contrôlées ; on n'ajoute une page filtrée que si elle
  aide réellement à naviguer.

### Étude de cas

Socle attendu, à adapter au sujet :

1. résumé lisible en moins d'une minute ;
2. problème et contexte ;
3. rôle exact et limites du périmètre ;
4. une à trois décisions importantes, avec le compromis associé ;
5. résultat observable ;
6. recul actuel : limite, erreur, ou autre choix possible.

L'architecture, les chiffres, les contraintes ou l'alternative écartée sont présents
quand ils apportent quelque chose. Aucun nombre de sections n'est imposé.

### Note

Champs recommandés : `titre`, `date`, `maj`, `resume`, `sujets`, `statut`, `brouillon`,
`sources`. Statuts publics possibles : `fragment`, `testee`, `stable`, `obsolete`.

Le corps doit au minimum dire : le contexte, ce qui a été essayé ou retenu, et dans
quelles limites cela fonctionne. Une ressource annotée explique pourquoi le lien mérite
d'être conservé ; elle ne devient pas une rubrique séparée.

### Article

`article` est éventuellement une valeur de `format` dans la collection des notes, pas
une collection ni une route à créer maintenant. Une rubrique `/articles` ne devient
utile que si plusieurs textes longs forment réellement un ensemble distinct.

---

## 5. Vérité, preuve et confidentialité

La règle précédente — « toute affirmation doit être prouvée par un lien cliquable » —
était simple mais faussement universelle. Elle empêchait soit de raconter les missions
confidentielles, soit de les couvrir de liens qui ne prouvaient rien.

| Type d'énoncé | Exigence |
| --- | --- |
| Projet public, dépôt, application, publication | Lien direct vers la meilleure preuve disponible |
| Chiffre public ou résultat mesurable | Source publique, méthode de mesure, ou mention claire du contexte et de la date |
| Mission client confidentielle | Rôle, équipe et périmètre bornés ; uniquement des faits autorisés ; aucune donnée appartenant au client |
| Choix ou apprentissage personnel | Écrit à la première personne, avec contexte et limites |
| Source externe | Lien vers la source et explication de ce qui en est retenu |
| Fait incertain | Vérifier, généraliser honnêtement ou ne pas publier |

Les surfaces publiques doivent partager les **mêmes faits**, pas obligatoirement les
mêmes phrases. Le CV synthétise, LinkedIn contextualise, GitHub montre le code public et
le site relie l'ensemble.

Pour une mission client, le test « est-ce déjà écrit sur le CV ? » n'est pas une
autorisation suffisante. Le bon test est : ai-je le droit de le publier, est-ce mon
travail à raconter, et le niveau de détail est-il nécessaire ?

---

## 6. Publication et entretien dans le temps

- aucun calendrier éditorial public ;
- chaque contenu affiche sa date de création, sa dernière relecture et son statut ;
- `brouillon: true` exclut le contenu de toutes les routes et du RSS ;
- une note obsolète est marquée et reliée à sa remplaçante, ou retirée si elle devient
  trompeuse ;
- une réalisation archivée peut rester visible : l'archive est un état, pas un abandon ;
- une revue semestrielle vérifie les liens, les dates, la disponibilité et les contenus
  non relus depuis douze mois ;
- aucune rubrique vide n'apparaît dans la navigation ou le sitemap XML.

La pérennité vient de statuts honnêtes et de petites unités publiables, pas de seuils
arbitraires comme « trois notes d'avance ».

---

## 7. Ordre de mise en œuvre

### Étape 1 — Inventaire éditorial

Lister les réalisations et les matériaux déjà disponibles, sans chercher à les rédiger :
nom, période, rôle, statut, liens, sujet, apprentissage, niveau de confidentialité.

**Fini quand** : on peut décider quelles pages existent réellement et lesquelles
attendent, sans inventer de contenu pour remplir la sitemap.

### Étape 2 — Fondations de contenu

Créer les collections `realisations`, `etudes` étendue et `notes`, avec brouillons,
statuts et dates. Construire les routes uniquement pour les contenus publiables présents.
Le filtrage reste statique avec des URL partageables ; aucun JavaScript n'est nécessaire.

### Étape 3 — Deux preuves solides, trois espaces accessibles

Publier :

- un inventaire de réalisations crédible ;
- une étude de cas Mibeko complète ;
- une première note réellement utile à Bénaja.

Cela suffit pour tester la nouvelle identité du site : travail, réflexion et
mémoire. Sur l'accueil, les preuves de livraison sont sélectionnées selon leur
force ; les trois espaces restent accessibles dans la navigation sans imposer
une carte à chacun.

### Étape 4 — Réécrire le parcours public

Recomposer l'accueil, l'à-propos, le contact et la navigation. Les missions France
Travail et AIFE deviennent des études autonomes uniquement avec des informations
validées et publiables.

### Étape 5 — Étendre au fil du travail réel

Ajouter des notes, articles, études ou pages filtrées quand le contenu le demande. Le
Labo et les jeux peuvent entrer dans `realisations` avant de mériter un espace propre.

---

## 8. Critères de réussite

- En moins de dix secondes, on comprend qui est Bénaja et le type de choses qu'il
  construit, sans devoir lire une candidature.
- En deux clics, un pair trouve une décision technique ou un apprentissage concret.
- Chaque réalisation indique le rôle réel, le statut et la date de relecture.
- Une étude de cas montre au moins un compromis et une limite, pas seulement un succès.
- Le site reste utile si la disponibilité professionnelle change demain.
- Les faits sont cohérents entre les surfaces, sans copier-coller éditorial.
- Aucun contenu vide, faux, confidentiel ou artificiellement gonflé n'est publié.
- Le site reste statique, accessible, sans traceur et sans JavaScript par défaut.

---

## 9. Matière nécessaire pour écrire le site

Les prochaines réponses doivent porter sur la matière, pas sur la technique :

1. Quelles réalisations veux-tu retrouver toi-même dans deux ans, même si elles ne sont
   pas impressionnantes pour un recruteur ?
2. Pour chacune : quel problème, quel rôle exact, quel statut actuel, quel apprentissage
   et quelle preuve publique éventuelle ?
3. Quelles décisions de Mibeko peux-tu expliquer avec leurs contraintes et leurs
   alternatives ?
4. Quelles missions professionnelles peux-tu raconter publiquement, et à quel niveau de
   détail ?
5. Quelles sont les trois notes que tu aurais déjà aimé retrouver sur ton propre site ?
6. Quels sujets personnels ou techniques veux-tu laisser apparaître au-delà du CV ?

Ces réponses permettront d'écrire les pages sans transformer une bonne architecture en
coquilles vides.
