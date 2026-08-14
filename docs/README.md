# docs/ — les documents qui font autorité

Dossier de travail établi le 24 juillet 2026, réorganisé le 14 août 2026.

**Tout ce qui est ici fait foi. Ce qui a servi et ne sert plus est dans
[archives/](archives/README.md)** — rien n'est supprimé, mais rien n'y fait
autorité non plus. En cas de contradiction, `docs/` gagne.

## Non publiés — locaux uniquement

1. `01-audit-existant.md` — 🔒 État des lieux de l'existant, dont les
   vulnérabilités du site de 2022. Tant qu'il n'est pas dépublié, ce document
   serait un mode d'emploi.
2. `02-profil-et-strategie-image.md` — 🔒 Positionnement, ligne éditoriale,
   cohérence entre les surfaces. Notes personnelles, sans intérêt pour un
   lecteur du dépôt.

> Ces deux fichiers existent **en local uniquement** et sont exclus par
> `.gitignore` : ils n'ont jamais été poussés. Les documents suivants les citent
> parfois — c'est volontaire, ils restent la source du « pourquoi ».

## Les documents actifs

3. **[05-design-system-papier-pixels.md](05-design-system-papier-pixels.md)** —
   🎨 **Le design qui fait foi**, appliqué dans `src/styles/global.css` : d'où
   vient la direction et où on s'arrête, tokens, les trois règles non
   négociables, composants.
4. **[06-chantiers-futurs.md](06-chantiers-futurs.md)** — ⚠️ **La règle de mise
   à jour** (tout chantier commence par une remise à niveau) et les décisions
   techno, contenu et hébergement avec leur argumentaire.
5. **[07-deploiement-firebase.md](07-deploiement-firebase.md)** — 🔥 **Le guide
   de mise en ligne** : responsabilités, configuration Firebase/GitHub/Infomaniak,
   premier déploiement, DNS et contrôles.
6. **[08-plan-contenu.md](08-plan-contenu.md)** — ✍️ **La stratégie éditoriale
   qui fait foi** : mémoire professionnelle publique, lecteurs, sitemap cible,
   migration des URL, modèles de contenu, règles de preuve.
7. **[10-audit-recherche-emploi.md](10-audit-recherche-emploi.md)** — 🎯 **Le
   site vu comme instrument de recherche d'emploi** : ce qui a été mesuré, ce
   qui a été corrigé le 14/08/2026 (preuves publiques, stack visible, page CV
   imprimable), les captures à prendre et ce qui reste ouvert.

> **Pour une session Claude qui démarre** : lire [../CLAUDE.md](../CLAUDE.md)
> d'abord — commandes, invariants à ne pas casser (CSP stricte, zéro requête
> tierce, un seul JS) et checklist de vérification.

**Contexte de méthode** : analyses produites par workflows multi-agents (audit
repo + site live + recherche Astro/sécurité ; panel de 3 concepts jugé par 3
juges ; panel stratégique recruteur/branding/narratif arbitré par revue croisée).
Le concept d'interface « La Borne » (arcade jouable) reste une direction
esthétique possible à long terme.
