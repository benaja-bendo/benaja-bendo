# docs/ — Refonte de benaja-bendo.fr

Dossier de travail établi le 24 juillet 2026, avant toute refonte. À lire dans l'ordre :

1. `01-audit-existant.md` — 🔒 **non publié**. État des lieux de l'existant, dont les vulnérabilités du site encore en ligne : tant qu'il n'est pas dépublié, ce document serait un mode d'emploi.
2. `02-profil-et-strategie-image.md` — 🔒 **non publié**. Positionnement, ligne éditoriale, cohérence entre les surfaces. Notes personnelles, sans intérêt pour un lecteur du dépôt.

> Ces deux fichiers existent **en local uniquement** et sont exclus par `.gitignore` : ils
> n'ont jamais été poussés. Les documents suivants les citent parfois en référence — c'est
> volontaire, ils restent la source du « pourquoi ».
3. **[03-proposition-refonte.md](03-proposition-refonte.md)** — Le plan initial : Phase 0 d'urgence, surfaces satellites, refonte Astro 7, architecture des pages et critères de réussite. Sa recommandation VPS est historique ; Firebase est désormais retenu (doc 07).
4. ~~[04-design-system.md](04-design-system.md)~~ — **périmé** : direction « Console », jamais appliquée. Conservé pour l'historique.
5. **[05-design-system-papier-pixels.md](05-design-system-papier-pixels.md)** — 🎨 **Le design qui fait foi**, appliqué dans `src/styles/global.css` : d'où vient la direction et où on s'arrête, tokens, les trois règles non négociables, composants, la décision ouverte sur les webfonts.
6. **[06-chantiers-futurs.md](06-chantiers-futurs.md)** — ⚠️ **La règle de mise à jour** (tout chantier commence par une remise à niveau), les décisions techno/contenu/hébergement et ce qui est encore périmé.
7. **[07-deploiement-firebase.md](07-deploiement-firebase.md)** — 🔥 **Le guide de mise en ligne** : séparation des responsabilités, configuration Firebase/GitHub/Infomaniak, premier déploiement, DNS et contrôles.
8. **[08-plan-contenu.md](08-plan-contenu.md)** — ✍️ **La stratégie éditoriale qui fait foi** : mémoire professionnelle publique, lecteurs, sitemap cible, migration des URL, modèles de contenu, règles de preuve et ordre de mise en œuvre.

> **Pour une session Claude qui démarre** : lire [../CLAUDE.md](../CLAUDE.md) d'abord — il
> contient les commandes, les invariants à ne pas casser (CSP stricte, zéro requête tierce,
> zéro JS) et la checklist de vérification.

**Contexte de méthode** : analyses produites par workflows multi-agents (audit repo + site live + recherche Astro/sécurité ; panel de 3 concepts jugé par 3 juges ; panel stratégique recruteur/branding/narratif arbitré par revue croisée). Le concept d'interface « La Borne » (arcade jouable) reste une direction esthétique possible à long terme. Le cadrage éditorial « v1 candidat » est désormais historique ; [le doc 08](08-plan-contenu.md) fait foi.
