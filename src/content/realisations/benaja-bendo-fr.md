---
nom: "benaja-bendo.fr"
resume: "Ce site : statique, sans cookie ni requête vers un autre site, avec une politique de sécurité stricte."
statut: "production"
periode: "Version 2022 remplacée en août 2026"
role: "Conception, design, développement, mise en ligne"
type: "produit"
stack: ["Astro", "TypeScript", "CSS", "Firebase Hosting", "GitHub Actions"]
domaines: ["Web", "Infra"]
liens:
  - { label: "Le dépôt", url: "https://github.com/benaja-bendo/benaja-bendo" }
preuves:
  - label: "benaja-bendo"
    url: "https://github.com/benaja-bendo/benaja-bendo"
    quoi: "Le code de ce site, son design et les décisions prises. C’est aussi le dépôt de mon profil GitHub."
    famille: "code"
enseignement: "Le vrai risque d’un site personnel, c’est de le laisser en ligne alors qu’il n’est plus à jour, comme ma version de 2022, restée quatre ans. Celui-ci a des tests qui bloquent un lien mort ou une page mal construite avant la mise en ligne."
# Réécrit le 30/09/2026 : l'ancienne version affirmait « moins de 3 Ko de
# JavaScript » et « aucun JavaScript pendant ses six premiers mois », deux
# faits devenus faux. Plus aucun poids n'est écrit ici : il change à chaque
# fichier ajouté, et le colophon liste déjà ce qui est envoyé.
ordre: 3
maj: 2026-09-30
---

Je l’ai construit avec Astro, en HTML statique. Il ne charge rien depuis un
autre site : pas de cookie, pas de police Google, pas de bannière à accepter.

Il envoie un peu de JavaScript, et seulement là où il sert : un petit fichier
sur toutes les pages pour retenir le thème clair ou sombre, un sur le CV pour
le bouton d’impression, et un sur la page Mibeko pour rejouer l’assistant.
Sans JavaScript, tout reste lisible.

La politique de sécurité (CSP) interdit tout style écrit directement dans la
page. Ça m’a obligé à me passer d’une fonctionnalité d’Astro pour les polices,
et à héberger IBM Plex à la main. Le détail est dans le [colophon](/colophon)
et dans une [note](/notes/api-fonts-astro-csp).
