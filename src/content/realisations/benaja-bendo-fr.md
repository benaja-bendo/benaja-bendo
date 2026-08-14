---
nom: "benaja-bendo.fr"
resume: "Ce site : statique, zéro requête tierce, moins de 3 Ko de JavaScript, sous une politique de sécurité de contenu stricte assumée jusqu’au bout."
statut: "production"
periode: "Version 2022 remplacée en août 2026"
role: "Conception, design system, développement, déploiement"
stack: ["Astro", "TypeScript", "CSS", "Firebase Hosting", "GitHub Actions"]
domaines: ["Web", "Infra"]
liens:
  - { label: "Le dépôt", url: "https://github.com/benaja-bendo/benaja-bendo" }
preuves:
  - label: "benaja-bendo"
    url: "https://github.com/benaja-bendo/benaja-bendo"
    quoi: "Le dépôt de ce site : contenu, design system et documentation de décisions. C’est aussi le dépôt de mon profil GitHub."
    famille: "code"
enseignement: "Une contrainte posée tôt — ici style-src 'self', sans exception — élimine des dizaines de décisions plus tard, mais interdit aussi des fonctionnalités officielles du framework. Le vrai risque de ce site n’a jamais été technique : c’est de le laisser en ligne périmé, comme la version 2022 restée quatre ans."
epingle: true
ordre: 4
maj: 2026-08-14
---

Un site personnel est le seul endroit où je peux tenir mes propres contraintes de
bout en bout. Celui-ci est entièrement statique : aucune ressource tierce, aucun
cookie, aucune bannière de consentement — il n’y a rien à consentir.

Il n'a envoyé aucun JavaScript pendant ses six premiers mois. Il en envoie
depuis le 14 août 2026 : 1,5 Ko sur toutes les pages pour mémoriser le choix
clair/sombre, et 1,3 Ko sur la seule page CV pour son bouton d'impression. C'est
le genre de renoncement qui mérite d'être écrit plutôt que caché — une préférence
qui survit à la navigation exige un stockage local, et `window.print()` n'a aucun
équivalent en CSS.

J'ai d'abord refusé ce second fichier au nom de la sobriété, en me contentant
d'indiquer le raccourci clavier. C'était une erreur de destinataire : cette page
s'adresse à des recruteurs, pas à des développeurs. La contrainte qui compte
n'était pas « le moins de code possible » mais celle-ci, et elle tient toujours :
rien en ligne, rien chez un tiers, et aucune commande qui ne fonctionne pas.

La politique de sécurité de contenu est stricte au point d’interdire tout `<style>`
inline, ce qui a des conséquences concrètes : l’API Fonts du framework devient
inutilisable, et IBM Plex est auto-hébergée à la main. Le détail de ce compromis
est dans le [colophon](/colophon) et dans une [note](/notes/api-fonts-astro-csp).
