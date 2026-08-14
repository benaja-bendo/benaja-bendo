---
titre: "France Travail — automatisation & décisionnel"
sousTitre: "Capgemini · cellule transverse"
periode: "2024 – 2026"
resume: "Deux applications fragiles refondues en un seul service Java / Spring Boot : la collecte des prévisions de 400+ collaborateurs est passée de plusieurs semaines de relances manuelles à un cycle automatisé."
tags: ["Java / Spring Boot", "OpenShift", "Décisionnel"]
stack: ["Java / Spring Boot", "PostgreSQL", "OpenShift", "Docker", "Power BI (Power Query / M, Power Automate)"]
chiffres:
  - { valeur: "2 → 1", label: "applications fragiles fusionnées en un service" }
  - { valeur: "400+", label: "collaborateurs dont la collecte est automatisée" }
  - { valeur: "quotidien", label: "usage des dashboards par les managers" }
realisation: "france-travail-collecte"
confidentiel: true
ordre: 2
maj: 2026-08-14
---

## Le contexte

Sur le compte France Travail, la collecte des prévisions d’activité reposait sur
deux applications fragiles et beaucoup de relances manuelles — plusieurs semaines
de travail répétitif à chaque cycle.

## Ce que j’ai fait

J’ai refondu ces deux applications en **un seul service Java / Spring Boot**
déployé sur OpenShift / Docker : envoi massif de mails, lecture et extraction
automatique des réponses, stockage PostgreSQL. Résultat : la collecte des
prévisions de plus de 400 collaborateurs est passée de plusieurs semaines de
relances à un **cycle automatisé**.

En parallèle, j’ai conçu de A à Z les **tableaux de bord Power BI** (Power Query /
M, Power Automate) utilisés au quotidien par les engagement managers :
prévisions consolidées, relances, suivi d’activité et de facturation. J’ai assuré
le support utilisateur et l’amélioration continue à partir des retours, et
cartographié le système d’information de la cellule pour prioriser les
optimisations.
