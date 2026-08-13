# docs/ — Refonte de benaja-bendo.fr

Dossier de travail établi le 24 juillet 2026, avant toute refonte. À lire dans l'ordre :

1. **[01-audit-existant.md](01-audit-existant.md)** — État des lieux factuel des trois surfaces (benaja-bendo.fr, GitHub Pages, profil GitHub) : déploiement cassé, vulnérabilités, et le problème central — le site en ligne (2022) contredit les CV (2026).
2. **[02-profil-et-strategie-image.md](02-profil-et-strategie-image.md)** — Qui est Bénaja (synthèse des deux CV), diagnostic d'image, positionnement retenu (hiérarchie des identités, tagline, message en 3 temps), **ligne éditoriale**, cohérence site/GitHub/LinkedIn/CV, place du pixel art.
3. **[03-proposition-refonte.md](03-proposition-refonte.md)** — Le plan : Phase 0 d'urgence, surfaces satellites, refonte Astro 7 (architecture des pages, hero, stack, hébergement VPS + en-têtes de sécurité, CI durcie), effort estimé, critères de réussite.
4. ~~[04-design-system.md](04-design-system.md)~~ — **périmé** : direction « Console », jamais appliquée. Conservé pour l'historique.
5. **[05-design-system-papier-pixels.md](05-design-system-papier-pixels.md)** — 🎨 **Le design qui fait foi**, appliqué dans `src/styles/global.css` : d'où vient la direction et où on s'arrête, tokens, les trois règles non négociables, composants, la décision ouverte sur les webfonts.
6. **[06-chantiers-futurs.md](06-chantiers-futurs.md)** — ⚠️ **La règle de mise à jour** (tout chantier commence par une remise à niveau), ce qui est encore périmé, et les deux choix ouverts : **quelle techno** et **quel type de contenu**.

> **Pour une session Claude qui démarre** : lire [../CLAUDE.md](../CLAUDE.md) d'abord — il
> contient les commandes, les invariants à ne pas casser (CSP stricte, zéro requête tierce,
> zéro JS) et la checklist de vérification.

**Contexte de méthode** : analyses produites par workflows multi-agents (audit repo + site live + recherche Astro/sécurité ; panel de 3 concepts jugé par 3 juges ; panel stratégique recruteur/branding/narratif arbitré par revue croisée). Le concept d'interface « La Borne » (arcade jouable) reste validé comme direction esthétique long terme, mais est **reporté après la v1 « candidat »** — priorité à la personne et au CDI (disponibilité 28/09/2026).
