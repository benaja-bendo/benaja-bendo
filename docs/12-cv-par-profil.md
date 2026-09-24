# Le CV par profil — une source, plusieurs versions

*Établi le 23 septembre 2026. Complète [docs/10](10-audit-recherche-emploi.md) §5
(« le CV est une page, pas un PDF »), qui reste valable.*

Ce document décrit le **mécanisme**. Il ne contient volontairement aucune
stratégie de candidature : ce dépôt est public, c'est le profil GitHub.

---

## Le besoin

Des offres aux stacks différentes, un seul CV. Renommer le PDF à la main ne
changeait rien à son contenu : c'était toujours le CV général. Et `cv.js`
nommait *tous* les exports « …-Java-Spring-Boot », y compris celui du CV
général.

## La décision

Des **pages statiques générées au build**, une par profil technique :

| URL | Rôle | Indexée | Liée depuis le site |
| --- | --- | --- | --- |
| `/cv` | Le CV général : toutes les compétences, sans accent | oui | oui (navigation) |
| `/cv/java-spring` | Offres Java / Spring Boot | non | non |
| `/cv/devops` | Offres orientées livraison et exploitation | non | non |

Les approches écartées, et pourquoi :

| Approche | Raison |
| --- | --- |
| `/cv?profil=…` | Le site est statique : le serveur ne voit jamais le paramètre. Il faudrait réordonner la page en JavaScript après chargement, et l'aperçu de lien resterait celui du CV général. |
| `/cv#…` | Un fragment peut surligner (`:target`), pas réordonner ni changer le titre. |
| PDF déposés sur le site | Ils se périment sans prévenir — invariant n°5. |
| Une page par entreprise | Morte à la fin du recrutement, et indiscrète : une URL non indexée n'est pas une URL privée. |

## La règle : un profil choisit et ordonne, il n'écrit jamais un fait

Trois couches, trois fichiers :

```
src/lib/parcours.ts          les faits — chaque point porte un `id` stable
src/lib/cv-profils.ts        les profils — sélection et ordre, rien d'autre
src/pages/cv/[...profil].astro + src/components/CV.astro   un seul gabarit
```

| Un profil peut changer | Un profil ne peut pas changer |
| --- | --- |
| L'intitulé sous le nom, la ligne de stack, l'accroche | Les dates, intitulés, employeurs, chiffres |
| L'ordre des points dans chaque expérience (`prioritaires`) | Le texte d'un point |
| Le retrait d'un point (`masques`) | L'ordre chronologique des expériences |
| Projets avant ou après l'expérience (`projetsEnPremier`) | La liste des technos (seulement leur ordre) |
| L'ordre des groupes de stack et des technos dans chaque groupe | La formation, les langues, les coordonnées |
| Le `<title>`, la description, le nom du PDF | |

La colonne de droite n'est pas une consigne : **le type `ProfilCV` n'a aucun
champ pour ces faits**. L'accroche est la seule prose propre à un profil.

## Les contrôles — le build s'arrête si…

`resoudreProfil()` (src/lib/cv-profils.ts) s'exécute à chaque génération de
page. `astro build` ne vérifie pas les types : ces contrôles lèvent donc une
erreur explicite, qui arrête le build.

1. **Un identifiant cité n'existe pas** — point, projet, groupe de stack.
2. **Une techno de l'en-tête n'apparaît dans aucun point affiché par ce
   profil.** C'est le contrôle central : pas de techno en vitrine sans preuve
   sur la même page. Vérifié le 23/09/2026 : ajouter une techno à l'en-tête
   DevOps sans point qui en parle arrête le build.
3. L'accroche contient une autre balise que `<strong>`.
4. Plus de **quatre profils**. Chaque variante est une page à tenir juste ;
   au-delà, elle devient une dette.

Et `npm test`, après le build, vérifie que chaque variante porte
`noindex, follow`, sort du sitemap, n'est liée par aucune page, nomme son PDF
de façon unique, montre les liens des stores et de Trouve Ton Profil, et ne
contient que des liens absolus.

## Détails qui ont compté

- **Canonique auto-référente, pas vers `/cv`.** Combiner `noindex` et une
  canonique vers une autre page envoie deux signaux contradictoires, et
  `og:url` suit la canonique dans Base.astro : l'aperçu d'un lien envoyé
  aurait affiché le CV général.
- **Liens absolus sur tout le CV**, y compris le site : un PDF exporté depuis
  `npm run preview` gardait sinon des liens vers `localhost`.
- **Aucune compétence n'est surlignée** (retiré le 24/09/2026, après
  relecture par un pair). Les technos de l'en-tête étaient mises en évidence
  dans « Compétences techniques » : cela faisait lire une hiérarchie de
  compétences, là où le CV veut une liste à plat. Le gras de l'accroche est
  parti pour la même raison. Un profil ordonne toujours ses puces, sans
  emphase.
- **Chaque ligne renvoie à sa preuve, y compris dans le PDF** (24/09/2026).
  Sous une expérience, la rangée `liens` d'`Etape` (parcours.ts) mène aux
  études de cas ; dans la stack, une techno qui a une `preuve` (stack.ts)
  devient une puce soulignée qui mène à la page, ou à la section, qui la
  montre. Une légende l'annonce, imprimée aussi : sur papier, c'est le seul
  signe que ces puces sont cliquables. `npm test` vérifie que la page visée
  nomme bien la techno (dans la section, si l'URL porte un fragment). Une
  techno sans page qui la nomme reste sans lien : la liste de ces technos,
  en tête de stack.ts, est la liste des preuves à écrire ou des lignes à
  retirer.
- **Une feuille A4 fait ~680 px CSS** : les règles « mobile » (< 48rem)
  s'appliquent à l'impression. Les zones tactiles de 44 px triplaient la
  hauteur des lignes de contact sur papier ; `@media print` les neutralise.
- **Les entrées longues (4 points et plus) peuvent se couper entre deux
  points**, jamais avant le premier : repoussée d'un bloc, l'entrée Mibeko
  laissait un quart de page blanc.

## Exporter les PDF — `npm run cv:pdf`

Les sites d'emploi exigent un fichier. `npm run cv:pdf` construit le site, le
sert localement et fait imprimer chaque version par le Chrome installé
(`--no-pdf-header-footer`), vers `output/pdf/<nomImpression>.pdf`. Aucune
dépendance, rien de déployé, rien de versionné : `output/` est dans le
`.gitignore`. Le script vérifie que **chaque version tient en
deux pages A4** et sort en erreur sinon. Chemin de Chrome surchargeable par
`CHROME_PATH`.

## Ajouter, modifier, retirer un profil

**Ajouter** — seulement si une offre réelle le justifie :

1. Ajouter une entrée à `PROFILS` dans `src/lib/cv-profils.ts`.
2. Si une techno à mettre en avant n'est portée par aucun point : **écrire
   d'abord le fait** dans `src/lib/parcours.ts` (où, quand, quoi). Le build
   refusera l'en-tête tant que ce n'est pas fait — c'est voulu.
3. `npm run cv:pdf` : deux pages, sinon masquer le point le moins pertinent.
4. `npm test`.

**Retirer** — une URL de variante a été envoyée : elle ne tombe jamais en
404. Retirer l'entrée, puis rediriger `/cv/<slug>` vers `/cv` en 301 dans
`firebase.json` et dans `redirects` d'`astro.config.mjs`, comme `/mibeko`.

**Ne jamais** écrire dans `cv-profils.ts` un nom d'entreprise visée ou une
note de stratégie : le fichier est public.
