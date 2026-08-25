# LinkedIn — publier, et se certifier

*Établi le 18 août 2026, à partir du profil réel relevé le jour même
(`linkedin.com/in/benaja-bendo`), du contenu publié du site et du CV.*

Ce document prolonge [l'audit 10](10-audit-recherche-emploi.md), qui traitait du
**site** comme instrument de recherche d'emploi. Celui-ci traite des deux
surfaces que le site ne couvre pas : **ce qu'on publie sur LinkedIn** et **ce
qu'on fait certifier**.

Il ne redit pas la règle de cohérence de [CLAUDE.md](../CLAUDE.md) — il en
dépend : *les faits restent cohérents entre le site, le CV, LinkedIn et GitHub ;
la formulation change selon le lecteur.* Un post LinkedIn n'est donc jamais un
copier-coller d'une page du site.

---

## Point de départ, mesuré et pas supposé

| Constat | Relevé le 18/08/2026 |
| --- | --- |
| Abonnés | 647 |
| Publications | **Zéro.** L'activité publique se résume à deux commentaires, l'un il y a 2 mois, l'autre il y a 11 mois. |
| Vues du profil (7 j) | 16 |
| Apparitions dans les recherches (7 j) | 9 |
| Compétences déclarées | 43 |
| Certifications | **Une seule** : « Docker pour les développeurs / développeuses », LinkedIn Learning, janvier 2023. |
| Disponibilité affichée | CDI au 28/09/2026 |

Le déséquilibre saute aux yeux : **647 personnes se sont abonnées à un compte
qui n'a jamais rien publié.** C'est une audience acquise et jamais utilisée.

Deuxième constat, plus gênant : le seul commentaire technique du profil dit
« je développe une application avec KMP… je ne peux que le recommander ». Il y a
là un avis, une expérience réelle et publiée sur les deux stores — et rien
derrière. C'est la forme la plus coûteuse de présence : visible, mais sans
substance consultable.

> **La fenêtre.** Entre aujourd'hui et le 28/09/2026 il reste six semaines, et
> un recrutement se joue sur un à trois mois. La visibilité doit donc être
> construite **maintenant**, pas en septembre.

---

## Partie A — Publier

### A.1 La règle qui gouverne tout le reste

**Le site est la source, LinkedIn est la vitrine.** Un post ne recopie pas une
page : il en extrait *une* décision, la raconte en une minute de lecture, et
renvoie vers la version complète pour qui veut le détail.

Conséquence pratique : **aucun post ne demande d'écrire du contenu nouveau.**
Tout ce qui suit existe déjà, dans le dépôt ou dans la tête. Le travail est de
choisir l'angle, pas de produire de la matière.

### A.2 Le rythme, et pourquoi celui-là

Passer de zéro à « trois posts par semaine » ne tient jamais. La règle de
contenu n°4 du projet vaut ici aussi : *une page doit être utile avant d'être
complète, et aucun rythme n'est promis.*

**Un post tous les dix jours.** Sur six semaines, ça fait quatre posts. Quatre
publications réelles valent infiniment mieux que douze prévues et deux tenues —
et quatre suffisent à ce qu'un recruteur qui ouvre le profil ne tombe plus sur
un mur vide.

### A.3 Les sujets, par ordre de force

Classés par ce qu'ils prouvent, pas par confort d'écriture. Les trois premiers
sont ceux qui distinguent réellement Bénaja d'un profil Java générique.

**1. « J'ai refusé un bouton d'impression sur mon CV. J'avais tort. »**
Le revirement du 14/08/2026, documenté dans
[docs/10 §5](10-audit-recherche-emploi.md). Une règle interne — *le moins de JS
possible* — avait servi à écarter un bouton d'impression sur la page CV. La
règle était bonne, l'application était un raisonnement de développeur appliqué à
un lecteur qui n'en est pas un : demander un raccourci clavier à un RH pour
récupérer un CV, c'est lui demander de renoncer. La règle a été supprimée.
*Pourquoi c'est fort :* admettre publiquement une erreur de conception, avec le
raisonnement des deux côtés, est rare et se lit comme de la maturité. Aucun
recruteur ne lit ça comme une faiblesse.

**2. « Sur un outil juridique, la traçabilité passe avant la qualité de la
réponse. »**
L'enseignement de Mibeko, tel qu'il est déjà écrit dans le frontmatter de la
réalisation. Tant qu'une phrase ne renvoie pas à l'article exact dont elle
vient, elle n'est pas opposable — et l'outil redevient un chatbot qu'on ne peut
montrer à personne.
*Pourquoi c'est fort :* c'est un avis tranché sur les systèmes à base de modèles
de langage, adossé à un produit en production, avec des applications publiées.
C'est exactement ce que personne ne peut inventer.

**3. « Un outil interne n'est adopté que s'il supprime le geste manuel, pas
s'il le range mieux. »**
L'enseignement de la mission France Travail. Ce qui a fait la différence, ce
n'est pas d'avoir fusionné deux applications : c'est d'avoir retiré les relances
et la ressaisie du chemin des gens.
*Attention :* mission client. Décrire le rôle, la décision et l'enseignement —
**jamais** les données, l'architecture ou le système d'information du client.
C'est la règle de contenu n°5 du projet, et elle ne se négocie pas sur LinkedIn
non plus.

**4. « Une politique de sécurité stricte m'a coûté une fonctionnalité officielle
du framework. »**
`style-src 'self'` sans exception rend l'API Fonts d'Astro inutilisable, parce
que son composant injecte un `<style>`. IBM Plex est donc auto-hébergée à la
main. La note existe déjà : `/notes/api-fonts-astro-csp`.
*Pourquoi ça marche :* très concret, vérifiable, et ça parle à tous ceux qui ont
déjà arbitré entre confort de développement et contrainte de sécurité.

**5. Kotlin Multiplatform, le post que le commentaire promettait.**
Le commentaire existe, l'expérience aussi — deux applications publiées sur l'App
Store et Google Play depuis une base partagée. Ce qui a bien marché, ce qui a
coûté, ce qu'il faudrait savoir avant de commencer.
*Bonus :* c'est le sujet le plus susceptible d'être repartagé, KMP étant encore
peu documenté en français.

**6. La recherche hybride de Mibeko.**
Combiner plein texte, proximité orthographique et similarité sémantique dans
PostgreSQL avec pgvector — et pourquoi les trois sont nécessaires sur un corpus
juridique où l'orthographe des sources scannées n'est pas fiable.

**7. « J'ai arrêté un projet en 2025. »**
bgrfacile, six ans, serveurs coupés. Ce qui a été appris, pourquoi ça n'a pas
pris.
*Pourquoi c'est fort :* presque personne ne publie ses arrêts. C'est le post le
plus mémorable de la liste, et le plus risqué à écrire — donc le plus crédible.
Il rejoint l'invariant n°5 du projet : *rien de public ne reste agonisant.*

**8. La provenance jusqu'au SHA-256.**
Conserver l'empreinte du fichier source à travers toute la chaîne d'ingestion
(OCR → structuration → indexation), et ce que ça permet de garantir.

### A.4 Ce qu'il ne faut pas publier

- **Aucun détail client.** Ni AIFE, ni France Travail au-delà du rôle et de
  l'enseignement. Un post qui décrit l'architecture d'un système des finances
  publiques est un problème, pas une preuve.
- **Pas de « je suis à la recherche d'un CDI » en boucle.** C'est déjà porté par
  le badge « À l'écoute » et par la disponibilité affichée. Répété en post, ça
  déplace le profil de « quelqu'un qui construit » à « quelqu'un qui cherche ».
- **Pas de post sans objet.** Les vœux, les félicitations et les citations
  motivantes coûtent de la crédibilité à un profil technique.
- **Pas de reprise verbatim du site.** Deux surfaces qui récitent le même texte
  n'en font pas deux (CLAUDE.md, règle de contenu n°2).

### A.5 Forme

- **Les trois premières lignes décident de tout** : LinkedIn coupe le reste
  derrière « voir plus ». Commencer par l'affirmation, pas par le contexte.
- **Le lien en commentaire, pas dans le post.** L'algorithme pénalise les liens
  sortants dans le corps. Poster le texte, puis mettre le lien vers la page du
  site en premier commentaire.
- **Une image vaut d'être ajoutée si elle montre quelque chose.** Une capture de
  la réponse Mibeko avec l'article cité vaut cent mots — et c'est justement la
  capture que [docs/10](10-audit-recherche-emploi.md) réclame déjà pour le site.
  Une seule capture sert donc les deux surfaces.
- **En français.** Le site l'est entièrement, la cible est bordelaise. Si la
  version anglaise du site est un jour tranchée (docs/10, point ouvert n°6), la
  question se reposera ici.

---

## Partie B — Certifications

### B.1 D'abord, à quoi ça sert dans ce cas précis

Il faut être honnête sur le rendement : **pour un lecteur technique, aucune
certification n'ajoute quoi que ce soit à ce que Bénaja peut déjà montrer.** Un
SaaS en production, deux applications publiées, six dépôts publics et ~730 tests
pèsent plus lourd qu'un QCM réussi.

Une certification achète trois choses précises, et rien d'autre :

1. **Passer les filtres non techniques.** Le premier tri d'une ESN ou d'un ATS
   ne lit pas un dépôt GitHub. Il cherche des chaînes de caractères.
2. **Peser dans une grille de salaire.** Chez les ESN en particulier, une
   certification reconnue déplace une ligne.
3. **Compenser l'absence d'un nom d'école d'ingénieur.** Le titre RNCP niveau 7
   vaut Bac+5, mais il ne porte pas le signal de marque que certains recruteurs
   cherchent par réflexe. Une certification éditeur y répond directement.

Corollaire : **certifier ce qu'on fait déjà tous les jours**, pas ce qu'on
aimerait apprendre. Une certification sur une techno non pratiquée se démonte au
premier entretien technique — exactement comme les jauges de compétences que le
design system du site a refusées.

### B.2 Priorité 1 — Spring Certified Professional

La plus proche du travail réel et du positionnement affiché. Spring Boot est le
cœur du CV, de la mission France Travail et du titre du profil.

- Certification aujourd'hui gérée par **Broadcom** (historiquement Pivotal, puis
  VMware). L'examen le plus référencé reste **2V0-72.22**, à **250 USD**, avec un
  seuil de réussite de **76 %**.
- **Réserve importante et à vérifier avant de payer :** le programme de cet
  examen porte sur **Spring Framework 5.3 et Spring Boot 2.7**, soit une
  génération en retard sur ce qui est utilisé en production aujourd'hui. Broadcom
  fait par ailleurs apparaître un parcours « Spring Professional Develop » plus
  récent. **Vérifier lequel est en vigueur au moment de s'inscrire** — les noms
  et codes de cette famille ont changé trois fois en cinq ans.

### B.3 Priorité 2 — Oracle Certified Professional, Java SE 21 Developer

Le signal le plus universellement reconnu sur le marché français pour
« développeur Java ». C'est celle que les filtres RH connaissent.

- Examen **1Z0-830**, qui porte sur **Java SE 21** et remplace le 1Z0-819
  (Java SE 11).
- Plus large et plus dur que la certification Spring : syntaxe, POO,
  programmation fonctionnelle, streams, modules, concurrence, JDBC, et les
  nouveautés entre Java 8 et 21.
- Tarif à vérifier sur le site Oracle — il varie selon le pays et les
  promotions, et je ne le donne pas de mémoire.

### B.4 Priorité 3 — CKAD (Certified Kubernetes Application Developer)

Celle qui différencierait le plus, et de loin.

- Elle est **pratique, pas en QCM** : un terminal, des tâches à accomplir dans un
  temps donné. Elle prouve donc ce que le positionnement affirme — *je conçois,
  je livre et j'**opère***.
- Elle est adossée à une pratique réelle : OpenShift en production sur la
  mission France Travail, et le VPS administré avec Docker, Ansible et Traefik
  pour Mibeko. Ce n'est pas une certification de vitrine.
- Elle remplacerait avantageusement le certificat LinkedIn Learning « Docker »
  de janvier 2023, qui est aujourd'hui la seule ligne de la rubrique.

### B.5 Conditionnelles — à ne lancer que si la cible se précise

- **AWS Certified Solutions Architect – Associate (SAA-C03)** ou **Developer –
  Associate (DVA-C02)** : pertinent uniquement si les offres visées sont
  orientées cloud. Il y a une base réelle (contribution à un projet AWS sur
  l'AIFE), mais elle est mince — ne pas en faire une priorité avant Spring et
  Java.
- **Une certification d'anglais** (TOEIC, Cambridge, LinguaSkill) : sans objet
  pour un CDI bordelais, décisive pour du remote international.
  [docs/10](10-audit-recherche-emploi.md) relève déjà que le site est
  entièrement en français et que ça coûte cher hors de France. Les deux
  décisions se prennent ensemble, ou pas du tout.

### B.6 Ce qui ne vaut pas le coup

- **Les certificats LinkedIn Learning et assimilés.** Aucune valeur de marché :
  ils attestent qu'une vidéo a été regardée. Garder celui de 2023 tant que la
  rubrique serait vide autrement, mais ne pas en ajouter — et le laisser être
  remplacé par une vraie certification.
- **Toute certification sur une techno non pratiquée.** Voir B.1.
- **Les « badges » de plateformes d'exercices.** Ils ne franchissent aucun filtre
  RH et n'impressionnent aucun lecteur technique.

---

## Ce qui a été fait sur le profil le 18/08/2026

Trace des modifications, pour ne pas les refaire ni les défaire par accident.

| Section | Modification |
| --- | --- |
| Titre | Ramené à `Développeur fullstack — Java / Spring Boot · React`, identique à la ligne de rôle du CV. |
| Expérience — stage Capgemini | Dates corrigées : janv. → **mars 2023** (il était affiché « en cours » depuis 2023). |
| Expérience — alternance Capgemini | Description ajoutée (AIFE 2023-2024, puis France Travail depuis 2024). Type d'emploi rétabli sur « Apprentissage », qui s'affiche « Contrat en alternance » — « Stage / Alternance » s'affichait « Stage » sur trois ans. |
| Expérience — freelance Congo | **Ajoutée** (2021–2023, Pointe-Noire), elle manquait alors que /parcours la mentionne. |
| Expérience — bgrfacile | Description ajoutée, fautes du lien « Sélection » corrigées. |
| Formation | Entrée EPSI scindée : Bachelor CDA (2022–2023) **et** Expert en informatique Bac+5 (2024–2026, en attente de soutenance). Institut International 2i : fin corrigée 2018 → **2019**. |
| Compétences | Retirées : AngularJS, tailwindcss, Scrumban. Ajoutées : Spring Boot, PostgreSQL, TypeScript, OpenShift, GitHub Actions, Kotlin Multiplatform, Astro, AWS. |
| Services | **Dépubliée.** La rubrique référençait Bénaja comme prestataire freelance et listait « Design d'expérience utilisateur (UX) » et « Développement Android », que le site ne revendique nulle part. Réversible depuis LinkedIn. |
| Projets | **Section ouverte**, deux entrées : Mibeko (déc. 2025 →, avec le lien mibeko.fr) et benaja-bendo.fr (août 2026 →). |

> ⚠️ **Piège rencontré, à connaître.** Ajouter une expérience propose par défaut
> de remplacer le titre du profil par « *poste* chez *entreprise* », case
> **pré-cochée**. Le titre a été écrasé une fois de cette façon. Décocher, ou
> vérifier le titre après chaque ajout d'expérience.

---

## Ce qui reste ouvert

1. **Écrire et publier le premier post.** Le sujet 1 ou le sujet 7 : ce sont les
   deux qui ne ressemblent à rien d'autre dans un fil LinkedIn.
2. **La capture Mibeko** — question → réponse → article cité. Elle sert le site
   (docs/10) *et* le meilleur post de la liste. C'est le seul chantier qui rend
   deux fois.
3. **Trancher la certification n°1** et poser une date. Une certification
   « envisagée » depuis six mois ne pèse rien ; une date d'examen réservée se
   tient.
4. **Le lien média du projet benaja-bendo.fr.** L'ajout a échoué le 18/08 —
   LinkedIn a renvoyé « Saisissez un lien valide » y compris sur une URL GitHub,
   ce qui désigne un incident de leur côté et non le site. À réessayer.
5. **Deux quasi-doublons subsistent dans les compétences** (« tailwind css »
   après la suppression de « tailwindcss », « Déploiement de systèmes » et
   « Déploiement logiciel », « CSS » et « css3 »). Sans gravité, à nettoyer si
   l'occasion se présente.
6. **« Microsoft Power Automate »** figure dans les compétences sans que le site
   ni le CV ne le mentionnent. À confirmer ou à retirer — règle de contenu n°1.
