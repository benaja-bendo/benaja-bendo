---
nom: "La Grenaille"
resume: "Le site d’une fonderie de bijoux et son espace professionnel : les bijoutiers y suivent le métal qu’ils confient, leurs commandes, leurs factures et leurs modèles 3D."
statut: "production"
periode: "Depuis novembre 2025"
role: "Conception, développement et mise en production, en direct avec le fondeur : recueil du besoin, retours, évolutions"
stack: ["React", "TypeScript", "Tailwind CSS", "Three.js", "NestJS", "Node.js", "Prisma", "PostgreSQL", "Jest", "Vitest", "Docker", "GitHub Actions", "Ansible"]
domaines: ["Web", "Back-end", "Infra"]
liens:
  - { label: "lagrenaille.fr", url: "https://lagrenaille.fr" }
preuves:
  - label: "lagrenaille.fr"
    url: "https://lagrenaille.fr"
    quoi: "Le site public : fonte à cire perdue, impression 3D, moulage, et l’accès à l’espace client."
    famille: "produit"
  - label: "Le-creuset"
    url: "https://github.com/benaja-bendo/Le-creuset"
    quoi: "Le site et l’espace pro : React, TypeScript, Tailwind, visionneuse 3D (Three.js), tests Vitest."
    famille: "code"
  - label: "Le-creuset-backend"
    url: "https://github.com/benaja-bendo/Le-creuset-backend"
    quoi: "L’API : NestJS, Prisma, PostgreSQL, 189 tests Jest, mise en ligne par GitHub Actions et Docker."
    famille: "code"
  - label: "vps_infra"
    url: "https://github.com/benaja-bendo/vps_infra"
    quoi: "Le serveur, configuré en Ansible : le même dépôt d’infrastructure que Mibeko."
    famille: "code"
enseignement: "Travailler pour quelqu’un qui connaît son métier mieux que moi m’a appris à poser les questions avant d’écrire le code : le compte poids ne s’invente pas, il s’apprend auprès du fondeur."
# Après France Travail (2), avant AIFE (3) : un travail en production pour un
# vrai client passe devant une mission terminée.
ordre: 2.5
maj: 2026-09-24
---

La Grenaille est une fonderie de bijoux. Elle fond des pièces à la cire
perdue, imprime des modèles en 3D et réalise des moules, pour des bijoutiers,
des créateurs et des entreprises. Son fondeur m’a confié son site, et je le
construis en direct avec lui.

Le site a deux faces. **Côté public**, il présente les savoir-faire de la
fonderie et mène vers l’espace client. **Côté professionnel**, chaque
bijoutier a un compte. Le point central est son **compte poids** : les clients
confient du métal précieux à la fonderie, et le site tient pour chacun le
solde en grammes d’or, d’argent et de platine, crédité à chaque dépôt et
débité à chaque fonte. Le bijoutier y suit aussi ses commandes, ses factures
et sa bibliothèque de moules et de fichiers 3D, qu’il peut afficher en 3D dans
son navigateur. La fonderie a son propre espace d’administration.

Côté technique : un front React / TypeScript, une API NestJS (Node.js) avec
Prisma et PostgreSQL. Environ 200 tests automatisés (Jest pour l’API, Vitest
pour le front) tournent avant chaque mise en production : s’ils passent,
GitHub Actions construit une image Docker et la déploie sur un serveur
configuré en Ansible, avec le même dépôt d’infrastructure que Mibeko.

Le fondeur teste chaque version et me fait ses retours. Je les note, je les
vérifie dans le code, puis je les traite par lots avant de les livrer. Le
site est en ligne depuis novembre 2025 et reçoit ses premiers clients.

Le fondeur a accepté que ce projet soit présenté ici. Je décris le site et
mon travail, pas ses clients ni ses chiffres.
