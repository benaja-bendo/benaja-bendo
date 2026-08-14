# Audit Codex — direction artistique, contenu et expérience

*Établi le 14 août 2026 à partir du build local Astro, du rendu réel dans le
navigateur et des objectifs consignés dans les docs 03, 05, 06 et 08.*

## Verdict sans détour

Le site est déjà **propre, cohérent, rapide et crédible techniquement**. Il est
nettement au-dessus d'un portfolio de développeur assemblé à partir d'un template.
La typographie tient, la palette fonctionne, la structure est claire, le mobile ne
déborde pas, la sécurité n'est pas seulement racontée : elle est effectivement
tenue.

En revanche, ce n'est pas encore un portfolio susceptible de gagner un concours de
design. C'est aujourd'hui **un excellent système éditorial de développeur**, pas
encore une expérience visuelle mémorable. Le langage « papier & pixels » est
cohérent mais trop uniforme, les assets originaux sont trop rares, le mouvement est
presque absent et plusieurs pages promettent davantage de profondeur qu'elles n'en
livrent réellement.

Le principal problème n'est pas le manque d'effets. C'est le manque de
**preuves visuelles et éditoriales propres à Bénaja**. Le site parle beaucoup de
traçabilité, de production et de décisions, mais montre encore peu d'écrans réels,
peu d'alternatives écartées, peu de limites et presque aucun résultat utilisateur.

### Évaluation actuelle

| Axe | Note | Lecture professionnelle |
| --- | ---: | --- |
| Positionnement | 7/10 | Clair et sérieux, encore trop générique dans le premier écran |
| Qualité du contenu | 6/10 | Bonne plume, mais promesse de recul partiellement non tenue |
| Crédibilité des preuves | 5/10 | Mibeko est fort, mais insuffisamment démontré ; deux études sont trop minces |
| Direction artistique | 6,5/10 | Système cohérent, pas encore une identité inoubliable |
| Assets | 3,5/10 | Une illustration, une capture, un OG : beaucoup trop peu |
| Motion / interaction | 3/10 | Survols propres, aucune narration en mouvement |
| UX desktop | 7,5/10 | Lisible, stable, parfois trop vide et monotone |
| UX mobile | 6/10 | Pas de débordement, mais header encombrant et cibles trop petites |
| Accessibilité | 7/10 | Fondations sérieuses ; plusieurs écarts à la règle interne des 44 px |
| Technique / performance | 9,5/10 | Le point fort incontestable du site |

**Note d'ensemble : 6,5/10.** Le site inspire confiance. Il ne crée pas encore le
moment « je me souviens de cette personne et de ce projet ».

---

## Ce qu'il ne faut surtout pas casser

- La phrase directrice « je construis des systèmes logiciels et je les fais tenir
  en production » donne un fil conducteur réel.
- L'arc maintenance industrielle → développement → produit opéré est distinctif.
- Mibeko est une réalisation exceptionnellement forte pour ce profil : produit,
  ingestion, recherche, mobile, infrastructure et exploitation.
- Le ton évite le jargon vide, les jauges de compétences et l'autocélébration.
- Le système « papier & pixels » est cohérent du favicon aux cartes.
- Le site est statique, sans JavaScript, sans requête tierce, sans traceur et sans
  style inline.
- La lisibilité, le contraste, le focus visible, le lien d'évitement et
  `prefers-reduced-motion` sont de bonnes fondations.
- Le build est minuscule : une feuille CSS d'environ 20 Ko, aucune ressource JS,
  environ 92 Ko de polices et une capture Mibeko de 56 Ko.

La suite doit enrichir l'expérience sans transformer cette sobriété en démonstration
technique gratuite.

---

## Les problèmes prioritaires

### P0 — La page Études promet des compromis et du recul qu'elle ne montre pas

La page `/etudes` annonce : « une à trois décisions importantes avec leur
compromis » et « le recul que j'ai aujourd'hui ». C'est la bonne promesse. Mais les
contenus ne la tiennent pas encore.

#### Mibeko

L'étude explique correctement le problème, la construction et la production. Elle
ne dit pas encore :

- quelle architecture ou quelle approche a été écartée ;
- quel compromis concret a été accepté ;
- ce qui a échoué ou demandé une reprise ;
- ce que Bénaja ferait différemment aujourd'hui ;
- quelle limite produit ou technique existe toujours ;
- comment les utilisateurs se servent réellement du produit ;
- comment sont contextualisés les « ~730 tests » : date du comptage, périmètre et
  nature des tests.

Les quatre tuiles visibles sont surtout des **mesures d'effort ou de contexte** : six
mois, nombre de tests, deux stores, date de production. Elles ne racontent pas encore
la valeur obtenue. Si des indicateurs d'usage vrais et publiables existent, ils sont
plus importants. Sinon, une preuve qualitative honnête vaut mieux qu'un chiffre de
vanité.

#### France Travail

Le contenu actuel est un bon résumé de mission, pas encore une étude de cas. Il
montre le contexte et ce qui a été construit, mais pas :

- les contraintes de départ ;
- pourquoi cette solution plutôt qu'une autre ;
- la frontière exacte du rôle dans l'équipe ;
- le compromis entre automatisation, robustesse et exploitation ;
- une limite ou un retour critique ;
- la méthode de mesure derrière « plusieurs semaines », « 400+ » et « utilisé au
  quotidien ».

Ces chiffres peuvent rester sans lien public dans une mission confidentielle, mais
ils doivent être datés, bornés et publiables avec certitude.

#### AIFE

Cette page n'est pas encore une étude de cas. Elle dit essentiellement : équipe de
10, SAFe, Java/Spring, contribution AWS. Elle ne présente ni problème précis, ni
décision, ni résultat observable, ni recul.

La phrase « C'est l'expérience qui ancre la crédibilité “entreprise” » doit sortir
du contenu public. Elle ressemble à une note de stratégie de candidature, pas à un
enseignement utile au lecteur.

**Décision recommandée :** soit enrichir cette page avec une vraie décision
racontable, soit la laisser comme réalisation/expérience et la retirer temporairement
des études. Une étude courte est acceptable ; une étude sans objet d'étude ne l'est
pas.

### P0 — Le site manque de preuves visuelles là où il affirme prouver

Le portfolio utilise seulement :

- une illustration de source sur l'accueil ;
- une capture de la page d'accueil de Mibeko ;
- un visuel Open Graph générique ;
- le favicon et les motifs CSS.

La capture de Mibeko montre une barre de recherche, mais **ne montre pas la promesse
centrale** : une réponse reliée à un article exact. Sur mobile, elle est réduite à
346 × 197 px ; son contenu devient pratiquement illisible et elle sert alors de
décoration plutôt que de preuve.

Il faut montrer, dans cet ordre :

1. une question et sa réponse avec citation ;
2. le zoom sur l'article source retrouvé ;
3. la même continuité sur mobile ;
4. les deux applications publiées, avec liens directs App Store et Play Store ;
5. une vue compréhensible de la chaîne document → structure → recherche → réponse ;
6. éventuellement une preuve de production ou de qualité, expurgée de toute donnée
   sensible.

Une belle maquette ne doit jamais remplacer un écran réel. Un mockup sert à mettre la
preuve en scène, pas à l'inventer.

### P0 — Le header mobile prend trop de place et casse les anciennes ancres

À 390 px de large, le header mesure environ **132 px de haut** et reste collant. Il
occupe plus de 15 % d'un écran de 844 px pendant tout le défilement. Le lien Contact
tombe seul sur une deuxième ligne, ce qui donne l'impression d'un menu qui a cassé
plutôt que d'une composition volontaire.

Les anciennes URL `/experiences#aife` et `/experiences#france-travail` sont justement
conservées pour ne pas casser les candidatures déjà envoyées. Sur mobile, l'ancre
place la section à `y = 0`, puis le header de 132 px masque l'eyebrow **et le titre**.
La page de compatibilité existe, mais sa destination principale disparaît sous le
menu.

**Correction minimale :** ajouter un `scroll-padding-top` ou un `scroll-margin-top`
adapté au header. **Correction de design recommandée :** ne plus rendre ce gros
header collant sur mobile tant que la navigation n'est pas réellement compacte.

### P0 — Les cibles tactiles ne respectent pas la règle interne du projet

Le projet exige des cibles d'au moins 44 px. Sur mobile, les mesures réelles donnent
notamment :

- marque : environ 32 px de haut ;
- liens de navigation : environ 30 px ;
- chips de taxonomie : environ 25 px ;
- liens du footer : environ 23 px.

Les boutons principaux respectent les 44 px, mais pas l'ensemble du parcours. Il
faut augmenter la zone cliquable sans nécessairement grossir visuellement chaque
texte.

### P0 — Le site parle trop souvent de lui-même

Le site comme réalisation est légitime. Mais le même sujet revient dans :

- l'accueil ;
- la page À propos ;
- la réalisation `benaja-bendo.fr` ;
- le colophon ;
- la note sur l'API Fonts ;
- la note sur les fragments d'URL.

La rubrique Notes ne contient actuellement que deux sujets issus de la construction
du portfolio. L'impression produite est celle d'un site qui prouve surtout qu'il sait
construire ce site.

La prochaine note devrait impérativement venir du cœur du travail réel : provenance
des documents, recherche hybride, évaluation d'un RAG sourcé, OCR de textes scannés,
publication Kotlin Multiplatform ou exploitation d'un service en production. Une
seule bonne note de ce type rééquilibrera fortement l'ensemble.

---

## Audit du contenu

### Accueil

#### Ce qui fonctionne

- Le nom, le métier et la production sont compris rapidement.
- Mibeko arrive dès le premier écran.
- La distinction réalisation / étude / note est intelligible.
- La transition personnelle depuis la maintenance industrielle est mémorable.

#### Ce qui affaiblit l'impact

- « Bordeaux · développeur fullstack » est juste mais interchangeable avec des
  centaines de portfolios.
- « Je construis des systèmes logiciels » est solide mais encore très large. La
  singularité réelle est plutôt : systèmes vérifiables, sources retrouvables,
  produits opérés jusqu'en production.
- Le bloc de preuve est long sur mobile et répète plusieurs informations avant
  d'offrir une action.
- La grande section Disponibilité répète le footer et consomme beaucoup d'espace.
- « Le reste du site ne dépend pas de cette ligne » est une note de stratégie
  éditoriale, pas une information utile au visiteur.

**Recommandation :** condenser le premier écran autour d'une promesse plus
différenciante et d'une preuve nette. Transformer la disponibilité en bandeau CTA
compact. Réutiliser l'espace pour une vraie preuve Mibeko.

### Réalisations

La page annonce « un inventaire, pas une sélection » et promet aussi les réponses
« pas flatteuses ». Or elle ne contient que quatre entrées : Mibeko, le portfolio et
deux missions Capgemini. Toutes sont sérieuses et valorisantes.

Le décalage est visible : le parcours mentionne InfraOne, le freelance, Flutter,
Laravel, Node.js et des clients au Congo, mais aucune réalisation correspondante
n'apparaît dans l'inventaire. Les expérimentations ou jeux qui justifient la signature
pixel n'y apparaissent pas non plus.

Deux options honnêtes :

1. assumer une **sélection** et changer le vocabulaire ;
2. tenir la promesse d'inventaire avec des entrées archivées, abandonnées ou plus
   modestes, accompagnées de leur apprentissage.

La seconde option est plus forte et plus personnelle.

### Études de cas

Les études devraient adopter une structure éditoriale minimale, non rigide :

1. contexte et enjeu ;
2. rôle exact et limites du périmètre ;
3. décision ;
4. alternative écartée ;
5. compromis accepté ;
6. résultat observable ;
7. limite ou recul actuel ;
8. preuve visuelle ou publique quand elle existe.

Les mots « décision », « compromis », « limite » et « autrement aujourd'hui » doivent
être visibles dans la page, pas seulement suggérés.

### Notes

Le format, les statuts et les dates sont bons. Le problème est la couverture
thématique. Pour l'instant, la rubrique dit surtout « Astro/CSP/Firebase ». Elle ne
prouve ni Java/Spring Boot, ni RAG, ni recherche, ni mobile, ni exploitation.

Ordre de valeur recommandé pour les prochaines notes :

1. comment conserver la provenance d'un fragment jusqu'au document source ;
2. pourquoi combiner texte intégral, similarité orthographique et vecteurs ;
3. comment évaluer une réponse quand la citation compte plus que le style ;
4. ce que Kotlin Multiplatform a réellement simplifié ou compliqué ;
5. un diagnostic de production réel, borné et anonymisé.

### À propos

L'ouverture « J'ai commencé par réparer des machines » est la meilleure phrase du
site. Elle mérite un traitement visuel de premier plan.

Mais la page censée laisser apparaître la personne ne contient aucune image, aucun
portrait, aucun lieu, aucun détail hors du parcours professionnel et aucune scène
concrète de collaboration. Elle reste une excellente biographie de travail, pas
encore une page personnelle.

Il manque au moins deux des éléments suivants :

- un portrait éditorial ou un avatar vraiment original ;
- l'origine personnelle de Mibeko et ce que le projet représente ;
- la manière de collaborer dans une équipe ;
- un exemple de désaccord ou de décision collective ;
- les jeux/pixels si cette pratique explique réellement l'identité visuelle ;
- les sujets actuellement explorés, au-delà de « opérer ce que je construis ».

Ne pas ajouter une liste de hobbies artificielle. Ajouter seulement des éléments qui
éclairent la manière de construire.

### Contact

La page est trop longue pour sa fonction. L'email, LinkedIn, GitHub et la
disponibilité sont répétés dans le hero, trois cartes et le footer. La section « Ce
qui m'aide à répondre utilement » est raisonnable, mais place une charge inutile sur
la personne qui veut simplement prendre contact.

Pour une recherche de CDI active, l'absence de CV téléchargeable est un manque
pratique. Il faut trancher explicitement :

- soit un PDF maintenu existe et il est relié depuis Contact ;
- soit le site assume qu'il remplace le CV public et n'en laisse pas attendre un.

Le pire état serait de réintroduire un lien vers un fichier non maintenu.

---

## Audit de la direction artistique

### Le système est cohérent, mais trop uniforme

Presque toutes les pages utilisent le même rythme : eyebrow, grand titre, lead,
filet, carte avec liseré pixel, ombre dure. Cette cohérence devient une monotonie.
Réalisations, Études, Notes et Contact ont des contenus différents mais presque le
même comportement visuel.

Un portfolio de concours a besoin d'un **système stable et de moments d'exception**.
Ici, le système existe ; les exceptions manquent.

Créer une grammaire par famille :

- Réalisations : couvertures, statuts et vignettes de produit ;
- Études : grands visuels de preuve, diagrammes et légendes ;
- Notes : composition éditoriale plus dense, sommaire et annotations ;
- À propos : portrait, chronologie illustrée, espaces plus organiques.

### Le pixel est devenu un motif, pas encore une signature

Le liseré répété sur les cartes est agréable, mais à force de répétition il ressemble
à une bordure de design system. La relation avec l'art généré par code n'est visible
que dans le colophon ; aucune réalisation ne la démontre.

Deux voies possibles :

- montrer un vrai asset pixel/génératif de Bénaja ;
- réduire l'omniprésence du liseré et réserver le pixel aux moments importants.

Une signature gagne en force quand elle n'est pas appliquée à chaque boîte.

### L'illustration principale n'est pas assez propriétaire

Le concept « réponse → source » est juste. Mais le cœur du visuel adapte une icône
de Koboyo. Le visuel le plus exposé du portfolio devrait être incontestablement
propriétaire.

Recommandation : produire une illustration originale qui relie trois éléments de
l'histoire : la machine, le système logiciel et la source juridique retrouvable. Ce
visuel peut rester construit en CSS/SVG local, sans abandonner les invariants du
projet.

### Le mode sombre est fonctionnel, pas encore luxueux

Dans le rendu sombre, les bordures et les ombres deviennent presque blanches. La
lecture est nette, mais le contraste structurel est très dur et donne parfois aux
cartes l'apparence d'éléments perpétuellement focus. C'est un choix documenté, mais
un choix intentionnel peut quand même être amélioré.

Tester une ombre sombre/teal distincte de la bordure, ou un niveau d'encre
intermédiaire, tout en conservant le principe d'ombre dure. Le but n'est pas de
copier le mode clair en négatif, mais de composer réellement une version nuit.

### La typographie manque d'un moment héroïque

IBM Plex Sans + Mono est très adaptée à l'ingénierie et excellente en lecture. Elle
est aussi très courante. Il n'est pas nécessaire d'ajouter une troisième police.
En revanche, le site peut créer plus de caractère par la composition : échelles plus
contrastées, mots isolés, lignes annotées, grands numéros ou légendes qui participent
au récit.

Sur les pages texte, la colonne de 44 rem laisse beaucoup de vide à droite sur grand
écran. Ce vide pourrait accueillir une annotation, un chiffre contextualisé, une
miniature ou une navigation de section. Aujourd'hui, il est souvent seulement vide.

---

## Plan d'assets recommandé

Chaque asset doit prouver quelque chose. Les décorations sans contenu arrivent en
dernier.

| Page | Asset | Ce qu'il doit prouver | Priorité |
| --- | --- | --- | ---: |
| Accueil | Illustration originale « machine → système → source » | L'histoire et la signature de Bénaja | Haute |
| Accueil | Aperçu Mibeko question/réponse/citation | La promesse centrale en une seconde | Haute |
| Mibeko | Galerie de 3 à 5 écrans réels | Produit utilisable et cohérent | Critique |
| Mibeko | Gros plan sur la citation et l'article | Traçabilité réelle | Critique |
| Mibeko | Duo de vues iOS/Android + liens stores | Livraison mobile effective | Haute |
| Mibeko | Diagramme d'architecture simplifié | Étendue du rôle et chaîne technique | Haute |
| Mibeko | Schéma de décision avec alternative écartée | Capacité d'arbitrage | Haute |
| France Travail | Avant/après du flux de collecte, anonymisé | Transformation du geste utilisateur | Haute |
| France Travail | Carte du périmètre de responsabilité | Rôle exact sans divulguer le SI | Moyenne |
| AIFE | Carte de dépendances entre équipes, si publiable | Le problème d'agilité à l'échelle | Moyenne |
| À propos | Portrait éditorial ou avatar original | Présence humaine et mémorisation | Haute |
| À propos | Frise illustrée Pointe-Noire → Bordeaux | Continuité du parcours | Moyenne |
| Notes | Mini-diagrammes spécifiques aux sujets | Retrouver l'idée avant de relire le texte | Moyenne |
| 404 | Petite scène pixel originale | Signature et soin jusque dans les marges | Basse |
| Partage | OG spécifique par étude/note | Pertinence des aperçus sociaux | Moyenne |

Contraintes de production : assets locaux, dimensions déclarées, variantes adaptées
au mobile, alt utile, WebP/AVIF quand pertinent et aucune capture contenant une donnée
client ou personnelle.

---

## Motion et interaction

Le site ne doit pas devenir un portfolio à curseur custom et scroll bloqué. Son sujet
est la fiabilité ; le mouvement doit expliquer la fiabilité.

### Ce qui existe

- soulèvement de 140 ms sur boutons et cartes ;
- enfoncement au clic ;
- légère rotation de l'illustration au survol ;
- désactivation sous `prefers-reduced-motion`.

C'est propre mais trop limité pour donner une présence particulière.

### Mouvement signature recommandé

Créer **une seule interaction mémorable** : la provenance se trace visuellement du
document à l'article cité. Au survol, au focus et éventuellement au défilement, les
quatre étapes s'allument l'une après l'autre. Cette interaction doit :

- rester compréhensible sans animation ;
- fonctionner au clavier ;
- avoir une version statique sous `prefers-reduced-motion` ;
- être construite en CSS/SVG externe, ou en petit JavaScript vanilla externe si
  l'état le nécessite ;
- ne déclencher aucune requête tierce.

### Compléments possibles

- révélation très légère des preuves, 8–12 px et opacité, une fois ;
- zoom/cadrage au survol et au focus dans les galeries produit ;
- surlignage progressif du diagramme d'architecture ;
- transition de statut sur les cartes sans déplacement de mise en page ;
- animation pixel discrète sur la 404.

À éviter : loader, fausse console, parallax lourd, scroll hijacking, trainée de
curseur, animation permanente et texte qui se recompose pendant la lecture.

---

## UX, responsive et accessibilité

### Points positifs vérifiés

- aucune largeur horizontale parasite à 390 px ;
- h1 et cartes se recomposent correctement ;
- boutons principaux suffisamment grands ;
- focus visible défini globalement ;
- contraste documenté et lisible dans le rendu sombre ;
- image Mibeko dimensionnée et chargée paresseusement ;
- aucune erreur console pendant le parcours testé ;
- tous les liens internes testés répondent en 2xx/3xx.

### Corrections nécessaires

1. Recomposer ou dé-coller le header mobile.
2. Corriger les ancres cachées sous le header.
3. Étendre toutes les zones tactiles à 44 px selon la règle du projet.
4. Ajouter un sommaire d'ancres aux longues études et notes. L'étude Mibeko mesure
   environ 4 600 px de haut sur mobile ; À propos environ 3 860 px.
5. Fournir des crops mobiles des captures : une capture desktop complète réduite à
   346 px ne prouve plus grand-chose.
6. Rendre les nombres de taxonomie explicites pour les technologies d'assistance.
   Le nom accessible actuel concatène par exemple « PostgreSQL3 » ou « Back-end2 ».
7. Augmenter légèrement la taille des micro-textes les plus petits : statuts,
   eyebrows et navigation mobile sont souvent entre 0,7 et 0,8 rem.
8. Prévoir un sélecteur clair/sombre manuel seulement si son implémentation externe
   respecte la CSP et l'absence de style inline. Le thème du système ne correspond
   pas toujours au contexte de lecture voulu.

---

## SEO et partage

Les titres, descriptions, canonical, sitemap, RSS et Open Graph sont présents. La
base est sérieuse. Les améliorations importantes sont :

- image Open Graph spécifique à Mibeko et aux contenus importants ;
- `og:type=article`, date, auteur et date de modification sur les notes ;
- données structurées `Person`, `Article` et éventuellement `SoftwareApplication`
  sans inventer de notation ou d'avis ;
- exclusion de `/experiences` du sitemap ou `noindex,follow` tant qu'il s'agit d'une
  page de compatibilité ;
- examen des pages de taxonomie : avec seulement deux réalisations, elles sont
  utiles à la navigation mais très minces pour l'indexation ;
- liens directs vers les stores et les meilleures preuves publiques, plutôt qu'un
  seul lien vers la home Mibeko.

---

## Qualité technique observée

- `npm run build` : succès, 27 pages générées.
- `npm run check` : 0 erreur, mais 54 indications de dépréciation autour de
  `astro:schema`/Zod et de la configuration Markdown.
- aucune balise `<style>` ni attribut `style=` dans le HTML produit ;
- aucune ressource JavaScript générée ;
- aucune erreur ou alerte console pendant le parcours ;
- aucun lien interne cassé dans le crawl local ;
- `npm audit` : 0 vulnérabilité ;
- TypeScript 7 est disponible mais reste volontairement bloqué par la compatibilité
  d'`@astrojs/check`, conformément à la décision documentée.

Les dépréciations ne nuisent pas au rendu actuel, mais elles contredisent l'objectif
de pérennité si elles restent jusqu'à la prochaine majeure Astro. Elles doivent être
traitées dans une maintenance dédiée, pas mélangées au chantier visuel.

---

## Roadmap recommandée

### Lot 1 — Crédibilité éditoriale

- compléter Mibeko avec décision, compromis, limite et recul ;
- enrichir ou déclasser temporairement AIFE ;
- borner les chiffres de France Travail ;
- supprimer les formulations internes de stratégie de candidature ;
- publier une première note issue de Mibeko ou de la production ;
- décider du CV public.

### Lot 2 — Preuves et assets

- capturer la vraie chaîne question → réponse → article ;
- ajouter les vues mobiles et les liens stores ;
- produire l'illustration propriétaire de l'accueil ;
- ajouter un portrait ou avatar original ;
- créer les diagrammes anonymisés des études.

### Lot 3 — UX mobile

- réduire ou dé-coller le header ;
- corriger `scroll-margin`/`scroll-padding` ;
- remettre toutes les cibles à 44 px ;
- ajouter les sommaires d'ancres ;
- créer des crops d'images réellement lisibles sur mobile.

### Lot 4 — Finition concours

- donner une composition distincte à chaque famille de contenu ;
- réduire la répétition des liserés pixel ;
- composer réellement le mode sombre ;
- ajouter l'interaction signature de traçabilité ;
- décliner les OG et les données structurées ;
- produire la scène 404.

---

## Le test final

Le site sera prêt à revendiquer une qualité de portfolio haut de gamme quand ces cinq
questions recevront un oui immédiat :

1. En cinq secondes, retient-on autre chose que « développeur fullstack à Bordeaux » ?
2. Peut-on **voir** la différence entre Mibeko et un chatbot qui affirme citer ses
   sources ?
3. Chaque étude montre-t-elle une décision, un compromis et une limite ?
4. La page À propos permet-elle de se souvenir d'une personne, pas seulement d'un
   parcours ?
5. Existe-t-il un moment visuel ou interactif qui ne pourrait appartenir qu'à ce
   site ?

Aujourd'hui, la réponse est : **oui au professionnalisme, non encore à la
mémorisation**. C'est une très bonne base. Le prochain saut de qualité viendra moins
de nouveaux composants que de preuves réelles, d'assets propriétaires et d'une mise
en scène plus personnelle.
