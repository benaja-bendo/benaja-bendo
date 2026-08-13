# Chantiers futurs — la règle de mise à jour, et les choix ouverts

*Établi le 13 août 2026. Ce document a deux rôles : poser **la règle** que tout chantier
sur ce projet doit suivre, et présenter les **choix** — techno et type de contenu — avec
ce que chacun coûte et rapporte.*

---

## ✅ Décisions prises le 13/08/2026

Les options sont conservées plus bas avec leur argumentaire : c'est ce qui permettra de
rouvrir un choix en connaissance de cause plutôt que de le refaire de zéro.

| Sujet | Décision | Détail |
| --- | --- | --- |
| **Techno** | **Astro**, on garde | Partie 2 — rien ne justifiait d'en changer |
| **Dépôt** | **Le site reste dans ce dépôt, sur `main`** | Il cohabite avec le README de profil GitHub, qui reste à réécrire (voir tableau ci-dessous) |
| **Typographie** | **IBM Plex auto-hébergée** | Appliqué — [doc 05](05-design-system-papier-pixels.md) §3 |
| **Contenu** | **Études de cas** + **vitrine Mibeko sur GitHub** + **notes techniques** | Partie 3 — voir l'ordre de mise en œuvre |
| **Hébergement** | ⏳ **non tranché** | VPS existant ou Cloudflare Pages — à décider avant la mise en ligne (fin de la partie 2) |

⚠️ Conséquence du choix « notes techniques » : c'est le format le plus exigeant en
rythme (1 par mois tenu). La règle qui l'accompagne est en partie 3 — **n'ouvrir la
rubrique que le jour où le premier texte est écrit**, jamais avant.

---

## Partie 1 — La règle : ici, rien ne se répare tout seul

### Pourquoi cette règle existe

Ce projet a une maladie documentée : **l'abandon**. Le site mis en ligne en 2022 est
resté quatre ans sur benaja-bendo.fr en affichant « à la recherche d'un stage », pendant
que les CV de 2026 annonçaient un SaaS en production. Le déploiement GitHub Pages était
mort. Les workflows étaient cassés. Le problème n'a jamais été de savoir coder — il a
été de **laisser vivre du périmé**.

Et ça ne se compte pas en années. Vérification faite le 13/08/2026, sur un projet
**créé trois semaines plus tôt** :

- `astro` 7.1.3 → 7.2.1 disponible, `@astrojs/mdx` 7.0.3 → 7.0.5
- **4 vulnérabilités** (3 hautes, 1 modérée) dans les dépendances transitives :
  `fast-uri`, `js-yaml` (CVE-2026-59870), `nanoid`, `postcss`

Toutes corrigées le jour même (`npm audit fix` + `npm update` → 0 vulnérabilité), mais
c'est la démonstration : **trois semaines suffisent**.

### La règle, donc

> **Tout chantier sur ce projet commence par une remise à niveau complète, avant
> d'écrire la moindre ligne de fonctionnalité.** On ne construit pas sur du périmé.

Le passage obligé, à faire **en premier** et à commiter séparément :

```bash
npm outdated              # ce qui a bougé
npm audit                 # ce qui est vulnérable
npm audit fix && npm update
npm run check && npm run build     # on prouve que ça tient encore
```

Puis, dans le même passage :

- [ ] **Actions GitHub** : elles sont épinglées par empreinte de commit (leçon
      tj-actions, mars 2025). Vérifier que les PR Dependabot `github-actions` sont
      passées — une empreinte figée est sûre, mais devient vite obsolète.
- [ ] **Node** : `.nvmrc` et la CI doivent viser la même version LTS vivante.
- [ ] **Les faits du site** : dates, chiffres, statut de disponibilité, liens. Le
      28/09/2026 devient du passé — la ligne « Disponible en CDI à partir du… » devra
      changer, et c'est exactement le genre de détail qui pourrit un site.
- [ ] **Les docs de `docs/`** : si un chantier invalide un document, il le met à jour ou
      le marque périmé **dans le même commit**. Un document périmé ment plus longtemps
      que du code périmé (`04-design-system.md` est marqué ainsi).
- [ ] **Les majeures en attente** : elles ne se font pas en douce, elles se décident.
      En cours au 13/08/2026 : **TypeScript 6 → 7**, proposé par Dependabot en
      [PR #31](https://github.com/benaja-bendo/benaja-bendo/pull/31) — **la CI la refuse,
      et elle a raison** : `@astrojs/check@0.9.10` déclare `typescript@^5 || ^6` en peer
      dependency. Le blocage est en amont. **Ne pas forcer** avec `--legacy-peer-deps` :
      attendre qu'`@astrojs/check` accepte TS 7, puis relancer la PR.

### Ce qui est encore périmé aujourd'hui, hors du site

Le site est propre ; son écosystème ne l'est pas encore.

| Quoi | État au 13/08/2026 | Action |
| --- | --- | --- |
| `/cv-benaja-bendo.pdf` | **404** — le header et le footer pointent dans le vide | Déposer le CV « parapluie » dans `public/` |
| ~~README de profil GitHub~~ | ✅ **Réécrit le 13/08/2026** : positionnement, écosystème Mibeko (5 dépôts liés), Capgemini, stack réelle, disponibilité | ⚠️ Contient « disponible au 28/09/2026 » — **à mettre à jour dès la signature** |
| Épinglage GitHub | Encore les dépôts d'école : `electronjs-with-typescript`, `back-app-quiz`, `louka-loca-docs`, `env-vps`, `fluxo-erp` | Épingler `mibeko-dashboard`, `mibeko-python`, `mibeko-app-kmp`, `vps_infra`, ce dépôt |
| Site en ligne benaja-bendo.fr | La SPA de 2022 tourne toujours | Dépublier le jour de la mise en ligne |
| GitHub Pages | Déploiement zombie | Désactiver dans Settings → Pages |
| Branches distantes | `dev` (fusionnée), `optimisation-site-web-bcac0` (1 commit sur la stack React morte), `output` (artefact GitHub Pages) | Supprimer une fois la décision de déploiement prise |
| Protection de `main` | Règle « toute modification passe par une PR » (1 revue requise), mais `enforce_admins: false` — le propriétaire la contourne à chaque push direct | Trancher : soit passer par des PR (même seul, ça documente), soit retirer une règle qui ne s'applique à personne |
| [PR #30](https://github.com/benaja-bendo/benaja-bendo/pull/30) | « Update from task f760a1b4… », ouverte, origine inconnue | Relire et fermer ou fusionner |
| Favicon, image Open Graph | Génériques / absente | Voir [doc 05](05-design-system-papier-pixels.md) §6 |

## Partie 2 — Choix n°1 : sur quelle techno partir

### Ce qui tourne aujourd'hui

**Astro 7.2.1, 100 % statique, zéro JS livré, zéro dépendance runtime.** Le site build en
~0,6 s, ne sert aucun script, et tient une CSP stricte sans `unsafe-inline`.

### Les options, honnêtement

| Option | Ce que ça apporte | Ce que ça coûte | Verdict |
| --- | --- | --- | --- |
| **Astro** *(actuel)* | Fait pour les sites de contenu. HTML statique par défaut, îlots interactifs si besoin un jour, content collections typées (Zod) pour les études de cas, RSS/sitemap intégrés. **Déjà en place et déjà utilisé sur Mibeko** — une techno de moins à entretenir. | Un framework à suivre (majeures ~1/an). | ✅ **Rien ne justifie d'en changer** |
| **HTML/CSS à la main** | Zéro dépendance, zéro obsolescence, immortel. | Chaque page dupliquée à la main : header, footer, meta. À 6 pages ça passe ; à 15 avec des articles, la duplication devient la source de l'abandon. | Cohérent seulement si le site reste figé à vie |
| **Hugo / 11ty** | Même famille (statique), Hugo build très vite. | Aucun gain sur Astro ici, et Hugo impose Go templates. Migrer = refaire le travail déjà fait. | Sans objet |
| **Next.js / Nuxt / SvelteKit** | Utile si le site devenait une **application** (espace membre, base de données, formulaires). | Un serveur ou une plateforme à opérer, du JS livré au client, une CSP plus difficile, des mises à jour plus lourdes. | ❌ Surdimensionné pour un site vitrine |
| **Framer / Webflow / template** | Rapide à mettre en ligne, joli sans effort. | Pour un développeur, **le site est lui-même un échantillon de travail** : un template payant dit le contraire de ce que le site affirme. Abonnement + contenu captif. | ❌ Contre-productif ici |

**Recommandation : garder Astro.** Non par inertie — parce que le besoin (contenu,
statique, durable, sûr) correspond exactement à ce pour quoi Astro est fait, que c'est
déjà debout et testé, et qu'à six semaines de l'échéance du 28/09/2026 le seul risque
réel est de repartir de zéro.

**La seule question qui vaut vraiment**, et elle n'est pas de la technologie mais de
l'hébergement — trancher avant la mise en ligne :

- **VPS existant (Apache/Traefik)** — le domaine ne bouge pas, la conf est déjà écrite
  ([deploy/](../deploy/apache-benaja-bendo.conf)), et l'infra devient une ligne du colophon
  qui prouve ce que le CV affirme. Coût : c'est lui qui l'opère.
- **Cloudflare Pages** — gratuit, zéro maintenance serveur, `public/_headers` déjà prêt.
  Coût : une dépendance de plus, et un argument « j'opère ma prod » en moins.

## Partie 3 — Choix n°2 : quel contenu proposer

Le site fait aujourd'hui **une seule chose** : convaincre un recruteur en 5 secondes,
30 secondes, 3 minutes (doc 02 *(notes locales, non publiées)* §3). La question est de
savoir ce qu'on lui ajoute — sachant que **chaque type de contenu est un engagement de
rythme**, et qu'un contenu abandonné fait plus de mal que pas de contenu du tout.

| Option | Ce que ça prouve | Rythme exigé | Risque |
| --- | --- | --- | --- |
| **A. Rien de plus** — vitrine candidat, figée | Le nécessaire, très bien fait | Aucun (relecture des faits 2×/an) | Aucun. Mais rien ne vous distingue une fois le CDI signé |
| **B. Études de cas** *(déjà amorcé)* — Mibeko, France Travail, AIFE | **La façon de penser** : décisions, arbitrages, contraintes. C'est ce qu'un lead dev lit vraiment | 3-4 textes, **puis plus rien à faire**. Pas d'abonnement au rythme | Faible. Le meilleur ratio preuve/effort |
| **C. Notes techniques** — articles courts tirés de la prod Mibeko (pipeline traçable, provenance SHA-256, recherche hybride, RAG sourcé) | Une expertise vivante, du référencement, de la matière à relayer sur LinkedIn | 1 par mois **tenu**. En dessous, la page « Notes » date le site | Moyen : c'est le format qui s'abandonne le plus. À n'ouvrir que si le premier texte existe déjà |
| **D. Labo / devlogs** — jeux Phaser, pixel art 100 % généré par code | La personnalité, et une vraie compétence rare (« son art est écrit, pas dessiné ») | Libre, par nature intermittent | Faible **si** c'est présenté comme un labo assumé. [Doc 03](03-proposition-refonte.md) le reporte après la v1 |
| **E. Vitrine Mibeko publique** — README d'architecture, schémas, décisions, chiffres (code produit privé) | Le vaisseau amiral, vérifiable en un clic. **Un README d'architecture prouve plus qu'un repo de tutoriel** | Une fois, puis figé | Faible. Fort effet de levier |
| **F. Veille / newsletter** | Une audience | Hebdomadaire, sans fin | ❌ Élevé, et ça ne prouve pas qu'il sait construire |

### ✅ Retenu : B + E + C — dans cet ordre

L'ordre n'est pas négociable, il est dicté par l'échéance du 28/09/2026 :

1. **E — vitrine Mibeko sur GitHub.** Quelques heures, effet immédiat sur la crédibilité.
   README d'architecture, schémas, décisions, chiffres ; le code produit reste privé.
2. **B — les trois études de cas terminées** (Mibeko, France Travail, AIFE). C'est le cœur
   des « 3 minutes », et c'est **fini une fois écrit** — aucun engagement de rythme.
   Les fichiers existent déjà dans `src/content/etudes/`.
3. **C — les notes techniques.** ⚠️ **Règle** : la rubrique « Notes » ne s'ouvre pas avant
   que le **premier article soit écrit et publiable**. Une rubrique vide, ou qui affichera
   dans deux ans un unique billet daté, fait plus de mal que pas de rubrique du tout —
   c'est littéralement la maladie de ce projet (partie 1). Le RSS et le sitemap sont déjà
   en place pour le jour J. Premiers sujets, tirés de la prod Mibeko : pipeline
   documentaire traçable, provenance SHA-256, recherche hybride, RAG sourcé.

**Non retenu pour l'instant : D (le Labo / devlogs pixel art)** — reporté après la
signature du CDI, conformément à [doc 03](03-proposition-refonte.md). Rien de la v1 n'en
dépend, et c'est ce qui donnera envie d'entretenir le site une fois la pression retombée.

**Le piège à éviter** : la référence de départ ([romainlanz.com](https://romainlanz.com))
est un **site de contenu** — sa page d'accueil est une liste d'articles, parce que son
métier public est d'enseigner. Reprendre sa structure éditoriale reviendrait à promettre
un rythme de publication qui n'est pas l'objectif ici. On a repris son **langage
visuel** ([doc 05](05-design-system-papier-pixels.md)), pas son modèle éditorial :
ici la page d'accueil prouve, elle ne publie pas.
