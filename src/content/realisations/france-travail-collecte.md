---
nom: "Collecte des prévisions et tableaux de bord (France Travail)"
resume: "Chez Capgemini, j’ai refondu deux applications fragiles en un seul service Java / Spring Boot. Le cycle de collecte, qui concernait plus de 400 collaborateurs, est passé d’environ 10 jours à 48 heures."
statut: "termine"
periode: "2024 – 2026"
role: "Développeur fullstack chez Capgemini : refonte du service de collecte, tableaux de bord, support aux utilisateurs"
type: "entreprise"
stack:
  [
    "Java",
    "Spring Boot",
    "PostgreSQL",
    "OpenShift",
    "Docker",
    "Power BI",
  ]
domaines: ["Back-end", "Automatisation", "Décisionnel"]
chiffres:
  - { valeur: "2 → 1", label: "applications fragiles fusionnées en un service" }
  - { valeur: "10 j → 48 h", label: "durée du cycle de collecte" }
  - { valeur: "400+", label: "collaborateurs concernés" }
  - { valeur: "Quotidien", label: "usage des tableaux de bord par les managers" }
enseignement: "Pour les utilisateurs, le vrai changement, c’est de ne plus avoir à relancer ni à ressaisir à la main. C’est ça qui a compté, plus que la fusion des deux applications."
confidentiel: true
# Fusion du 30/09/2026 avec l'ancienne étude (/etudes/france-travail, redirigée
# ici). Le titre « Ce que j'ai fait » ne doit pas changer : son ancre est citée
# par stack.ts (Power BI, OpenShift) et par les CV déjà envoyés.
ordre: 1
maj: 2026-09-30
---

## Le contexte

Sur le compte France Travail, chez Capgemini, la collecte des prévisions
d’activité reposait sur deux applications fragiles et beaucoup de relances à
la main. Un cycle, qui concernait plus de 400 collaborateurs, prenait environ
10 jours.

## Ce que j’ai fait

J’ai refondu ces deux applications en **un seul service Java / Spring Boot**,
déployé sur OpenShift (Kubernetes) et Docker. Il envoie les mails en masse,
lit les réponses et en extrait les informations automatiquement, puis les
range dans PostgreSQL. On peut lancer séparément, en ligne de commande, les
relances, l’envoi des mails et l’API REST.

À côté, j’ai conçu de A à Z les **tableaux de bord Power BI** (Power Query /
M, Power Automate) que les engagement managers utilisent tous les jours :
prévisions consolidées, relances, suivi d’activité et de facturation. J’ai
aussi assuré le support aux utilisateurs, amélioré l’outil à partir de leurs
retours, et cartographié le système d’information de la cellule pour savoir
quoi optimiser en premier.

## Le résultat

Le cycle de collecte est passé d’environ **10 jours à 48 heures**. Les
relances partent toutes seules, et les imputations se consultent en continu.
