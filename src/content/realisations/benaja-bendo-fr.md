---
nom: "benaja-bendo.fr"
resume: "Ce site : statique, zéro JavaScript, zéro requête tierce, sous une politique de sécurité de contenu stricte assumée jusqu’au bout."
statut: "production"
periode: "Version 2022 remplacée en août 2026"
role: "Conception, design system, développement, déploiement"
stack: ["Astro", "TypeScript", "CSS", "Firebase Hosting", "GitHub Actions"]
domaines: ["Web", "Infra"]
liens:
  - { label: "Le dépôt", url: "https://github.com/benaja-bendo/benaja-bendo" }
enseignement: "Une contrainte posée tôt — ici style-src 'self', sans exception — élimine des dizaines de décisions plus tard, mais interdit aussi des fonctionnalités officielles du framework. Le vrai risque de ce site n’a jamais été technique : c’est de le laisser en ligne périmé, comme la version 2022 restée quatre ans."
epingle: true
ordre: 4
maj: 2026-08-14
---

Un site personnel est le seul endroit où je peux tenir mes propres contraintes de
bout en bout. Celui-ci est entièrement statique : aucun JavaScript envoyé par
défaut, aucune ressource tierce, aucun cookie, aucune bannière de consentement —
il n’y a rien à consentir.

La politique de sécurité de contenu est stricte au point d’interdire tout `<style>`
inline, ce qui a des conséquences concrètes : l’API Fonts du framework devient
inutilisable, et IBM Plex est auto-hébergée à la main. Le détail de ce compromis
est dans le [colophon](/colophon) et dans une [note](/notes/api-fonts-astro-csp).
