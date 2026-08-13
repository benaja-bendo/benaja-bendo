# Proposition de refonte — benaja-bendo.fr en Astro 7

*Établi le 24 juillet 2026. S'appuie sur l'audit (doc 01) et la stratégie d'image (doc 02). Révise la proposition initiale « La Borne » à la lumière des CV : la personne d'abord, les jeux plus tard.*

> **Document de planification historique.** La recommandation VPS des sections
> déploiement a été remplacée le 13/08/2026 par **Firebase Hosting statique (Spark)**.
> La décision et la procédure actuelles sont dans [docs/07](07-deploiement-firebase.md).

## Objectifs, dans l'ordre

1. **Décrocher un CDI à partir du 28/09/2026** — le site sert d'abord les recruteurs qui cliquent depuis le CV.
2. **Un site durable qui lui ressemble** — techniquement irréprochable (le site est lui-même un échantillon de travail), avec sa signature pixel art en accent.
3. La sécurité comme preuve silencieuse : constatée par qui inspecte, jamais revendiquée à l'écran.

## Plan séquencé

### Phase 0 — J+0 : stopper l'hémorragie (≈ 2 h, avant toute refonte)

Le CV circule **maintenant** ; la refonte prendra des semaines. Donc, aujourd'hui :

- [ ] Publier sur benaja-bendo.fr une **one-page intérimaire statique** alignée sur les CV : nom, « Développeur Fullstack Java / Spring Boot · React », phrase Mibeko + lien mibeko.fr, « Disponible en CDI à partir du 28 septembre 2026 », email, GitHub, LinkedIn, CV PDF parapluie. Sobre et juste — *moche mais vrai bat joli mais faux*. Pas de photo ni de tagline définitive : ne pas coupler l'urgence à des décisions de branding.
- [ ] **Dépublier la SPA de 2022** le même jour (la one-page la remplace au même endroit sur le VPS).
- [x] **Désactiver le site GitHub Pages zombie** (Settings → Pages) et supprimer/neutraliser `vite-deploy.yml` et `snake.yml` — rien de public ne reste agonisant. ✅ Workflows supprimés à la refonte (13/08/2026), site Pages désactivé et branches distantes purgées le 14/08/2026 — cf. [doc 06](06-chantiers-futurs.md) §Partie 1.
- [ ] Jamais de bandeau « site en construction » : publier fini par tranches.

### Phase 1 — J+3 : les surfaces satellites (≈ 3-4 h)

- [ ] README de profil GitHub réécrit autour des preuves (doc 02 §5) ; repo vitrine « mibeko » (README d'architecture) ; ré-épinglage ; désépinglage des repos d'école.
- [ ] LinkedIn aligné : titre = ligne d'identité, expérience « Créateur & développeur — Mibeko », section Sélection = site + Mibeko.
- [ ] Vérifier que chaque claim (site, LinkedIn, README) a un lien cliquable qui le prouve.

### Phase 2 — Semaines 1-4 : la refonte Astro 7 (v1 « candidat »)

Le nouveau site remplace la one-page intérimaire **quand il est fini**, pas avant. Objectif : en ligne fin août, marge avant le 28/09.

### Phase 3 — Après le CDI signé (ou après la v1 stabilisée) : le Labo et « La Borne »

Jeux Phaser jouables, esthétique arcade poussée, devlogs — tout le concept validé précédemment, **explicitement reporté**. Rien de la v1 n'en dépend.

---

## Architecture du nouveau site (v1)

| Page | Contenu | Sert |
|---|---|---|
| `/` | Hero factuel (5 s) + bloc de 3 preuves chiffrées (30 s) + court « Parcours » (5 lignes) + footer contact/dispo | Le recruteur pressé |
| `/mibeko` | Étude de cas racontée : TL;DR chiffré en tête, puis problème → construction → production ; schéma d'architecture ; stack en encadré ; liens live + stores | Le CV IA, le lead dev qui creuse |
| `/experiences` | Capgemini en études de cas (France Travail : refonte Spring Boot/OpenShift 400+ collaborateurs, dashboards Power BI ; AIFE : microservices, agilité à l'échelle) + InfraOne/freelance | Le CV Java |
| `/a-propos` | L'arc en trois actes (machines → code → outils), accroche unique, photo ou avatar | La personne, assumée |
| `/cv` ou lien direct | Le PDF parapluie unique, versionné | Le closing |
| `/colophon` | Comment le site est fait (Astro 7, sécurité, palette) — discret | La preuve silencieuse |
| `404` | Micro-touche pixel art (la seule fantaisie de la v1) | La signature |
| RSS + sitemap | `@astrojs/rss` (pour les futures études de cas techniques), `@astrojs/sitemap` | Le long terme |

**Spécification du hero** (arbitrée, doc 02 §3) :

```
Bénaja Bendo-Matondo
Développeur Fullstack Java / Spring Boot · React

J'ai conçu et j'opère seul Mibeko, SaaS LegalTech en production
depuis décembre 2025 — assistant RAG qui cite ses sources,
~730 tests, apps sur l'App Store et le Play Store.

Disponible en CDI à partir du 28 septembre 2026 · Bordeaux/Mérignac

[ Voir Mibeko ]   [ Me contacter ]          header/footer : CV (PDF)
```

Design : structure sobre et lisible, mobile d'abord (les recruteurs ouvrent sur téléphone), light/dark, LCP < 2 s, zéro erreur console. Pixel art en **accent** : favicon, icônes, 404, éventuelle typo d'accent pour les titres — jamais dans le chemin de lecture.

## Stack technique

- **Astro 7.1.x** (dernière stable — 7.1.3 au 20/07/2026), 100 % statique, aucun adaptateur, TypeScript strict. Cohérence bonus : Mibeko utilise déjà Astro.
- Zéro framework UI — pas de React ; les rares interactions (thème light/dark) en vanilla JS.
- **Content collections** (Zod) : `etudes` (études de cas : Mibeko, France Travail, AIFE…) et plus tard `notes` (articles techniques). MDX pour les études de cas, Shiki en thème css-variables.
- `astro:assets` (images optimisées), Fonts API (polices auto-hébergées, zéro requête tierce), `@astrojs/rss` + `@astrojs/sitemap`.
- SEO/social : meta description, Open Graph + `twitter:card` avec image dédiée (l'aperçu LinkedIn est un cas d'usage majeur ici), canonical, `lang="fr"`.
- Pas de view transitions (`<ClientRouter/>` incompatible avec la CSP native d'Astro) — navigation classique, le site est rapide sans.
- Analytics optionnel : GoatCounter ou Plausible (sans cookies, pas de bannière RGPD).

## Hébergement & sécurité

**Recommandation révisée : rester sur le VPS existant** (celui qui sert déjà benaja-bendo.fr et mibeko.fr). Les CV prouvent la maîtrise d'Ansible/Traefik — poser les en-têtes y est trivial, le domaine ne bouge pas, et l'infra devient elle-même une ligne du colophon. Alternative valable si l'on veut zéro maintenance serveur : Cloudflare Pages (gratuit, fichier `_headers`).

En-têtes à servir (valeurs OWASP, cibles : **A/A+ sur MDN HTTP Observatory** et securityheaders.com) :

```
Content-Security-Policy: default-src 'self'; script-src 'self'; style-src 'self';
  img-src 'self' data:; font-src 'self'; object-src 'none'; base-uri 'none';
  form-action 'self'; frame-ancestors 'none'; upgrade-insecure-requests
Strict-Transport-Security: max-age=63072000; includeSubDomains
X-Content-Type-Options: nosniff
Referrer-Policy: strict-origin-when-cross-origin
Permissions-Policy: accelerometer=(), camera=(), geolocation=(), microphone=(), payment=(), usb=()
X-Frame-Options: DENY
Cross-Origin-Opener-Policy: same-origin
```

(Si Astro inline des scripts/styles : activer `security.csp` — hashes générés automatiquement — plutôt que `unsafe-inline`. `preload` sur HSTS seulement une fois sûr de rester en HTTPS partout.)

**CI durcie** (nouveau repo du site) :

- Actions épinglées par **SHA complet** (`uses: actions/checkout@<sha40> # v5.x`) — leçon tj-actions, mars 2025.
- `npm ci` + lockfile commité, Node 22, `permissions: contents: read` par défaut.
- **Dependabot** (npm + github-actions, mise à jour des SHA), **CodeQL** default setup.
- Déploiement : build en Actions puis rsync/SSH vers le VPS (clé dédiée en secret, restreinte) — ou push Cloudflare Pages selon l'option retenue.
- Après chaque changement d'en-têtes : scan MDN HTTP Observatory.

**Sort de ce repo (`benaja-bendo`)** : il redevient ce qu'il aurait toujours dû être — le repo de profil GitHub (README seulement). Le code SPA 2023 est supprimé ou archivé dans une branche ; les workflows cassés supprimés ; le nouveau site vit dans un repo dédié (ex. `site-benaja-bendo`).

## Effort estimé

| Chantier | Estimation |
|---|---|
| Phase 0 (one-page + dépublications) | 2-3 h — **aujourd'hui** |
| Phase 1 (GitHub + LinkedIn) | 3-4 h |
| Refonte v1 : scaffold, design system, hero + home | 8-10 h |
| Études de cas /mibeko + /experiences + /a-propos (rédaction incluse — le vrai coût) | 10-14 h |
| Sécurité, CI, déploiement, scanners | 4-6 h |
| Finitions (SEO/OG, 404, RSS, accessibilité, mobile) | 4-5 h |
| **Total v1** | **≈ 30-40 h** sur 4-5 semaines de temps libre (+20 % de marge réaliste) |

Maintenance ensuite : quasi nulle en période de recherche (PR Dependabot ~30 min/mois) ; les études de cas techniques et le Labo viennent après, à leur rythme.

## Critères de réussite de la v1

- [ ] Un recruteur comprend qui, quoi, quand en 5 secondes sans scroller, sur mobile.
- [ ] Chaque affirmation a un lien cliquable qui la prouve.
- [ ] Site, CV, LinkedIn et GitHub racontent la même histoire avec les mêmes mots.
- [ ] A/A+ sur MDN HTTP Observatory ; Lighthouse ≥ 95 partout ; zéro erreur console.
- [ ] Plus aucun artefact public agonisant (SPA 2022, GitHub Pages, workflows cassés).
