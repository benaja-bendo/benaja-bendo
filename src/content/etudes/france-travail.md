---
titre: "France Travail — automatisation & décisionnel"
sousTitre: "Capgemini · cellule transverse"
periode: "2024 – 2026"
resume: "Deux applications fragiles refondues en un service Java / Spring Boot : le cycle de collecte de 400+ collaborateurs est passé d’environ 10 jours à 48 heures."
tags: ["Java / Spring Boot", "OpenShift", "Décisionnel"]
stack: ["Java / Spring Boot", "PostgreSQL", "OpenShift", "Docker", "Power BI (Power Query / M, Power Automate)"]
chiffres:
  - { valeur: "2 → 1", label: "applications fragiles fusionnées en un service" }
  - { valeur: "10 j → 48 h", label: "durée du cycle de collecte" }
  - { valeur: "400+", label: "collaborateurs dont la collecte est automatisée" }
  - { valeur: "quotidien", label: "usage des dashboards par les managers" }
realisation: "france-travail-collecte"
confidentiel: true
ordre: 2
maj: 2026-09-03
---

## Le contexte

Sur le compte France Travail, la collecte des prévisions d’activité reposait sur
deux applications fragiles et beaucoup de relances manuelles. Un cycle concernant
plus de 400 collaborateurs demandait environ 10 jours de travail.

## Ce que j’ai fait

J’ai refondu ces deux applications en **un seul service Java / Spring Boot**
déployé sur OpenShift / Docker : envoi massif de mails, lecture et extraction
automatique des réponses, stockage PostgreSQL. Le livrable est architecturé pour
piloter séparément, en ligne de commande, les relances, l’envoi de mails et les
API REST. Résultat : le cycle de collecte est passé d’environ **10 jours à 48
heures**, avec relances automatisées et imputations consultables en continu.

En parallèle, j’ai conçu de A à Z les **tableaux de bord Power BI** (Power Query /
M, Power Automate) utilisés au quotidien par les engagement managers :
prévisions consolidées, relances, suivi d’activité et de facturation. J’ai assuré
le support utilisateur et l’amélioration continue à partir des retours, et
cartographié le système d’information de la cellule pour prioriser les
optimisations.
