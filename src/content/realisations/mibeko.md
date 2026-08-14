---
nom: "Mibeko"
resume: "Un assistant qui rend le droit congolais et OHADA consultable en langage naturel, en citant l’article exact d’où vient chaque réponse."
statut: "production"
periode: "Depuis décembre 2025"
role: "Conception, développement et exploitation — seul, du backend aux stores"
stack:
  [
    "Laravel",
    "Python",
    "FastAPI",
    "React",
    "Astro",
    "Kotlin Multiplatform",
    "PostgreSQL",
    "pgvector",
    "Docker",
    "Ansible",
    "Traefik",
    "GitHub Actions",
  ]
domaines: ["Produit", "IA & recherche", "Mobile", "Infra"]
liens:
  - { label: "mibeko.fr", url: "https://mibeko.fr" }
preuves:
  - label: "mibeko.fr"
    url: "https://mibeko.fr"
    quoi: "Le produit public : recherche, textes officiels, démarches et guides."
    famille: "produit"
  - label: "App Store"
    url: "https://apps.apple.com/app/id6768865781"
    quoi: "L’application iOS publiée."
    famille: "application"
  - label: "Google Play"
    url: "https://play.google.com/store/apps/details?id=cg.mibeko.app"
    quoi: "L’application Android publiée."
    famille: "application"
  - label: "mibeko-dashboard"
    url: "https://github.com/benaja-bendo/mibeko-dashboard"
    quoi: "L’API et la source de vérité. Laravel, PostgreSQL."
    famille: "code"
  - label: "mibeko-python"
    url: "https://github.com/benaja-bendo/mibeko-python"
    quoi: "L’ingestion documentaire : OCR, extraction, structuration. FastAPI."
    famille: "code"
  - label: "mibeko-front"
    url: "https://github.com/benaja-bendo/mibeko-front"
    quoi: "Le tableau de bord métier. React, Vite, TypeScript."
    famille: "code"
  - label: "mibeko-app-kmp"
    url: "https://github.com/benaja-bendo/mibeko-app-kmp"
    quoi: "Les applications mobiles. Kotlin Multiplatform."
    famille: "code"
  - label: "mibeko-site"
    url: "https://github.com/benaja-bendo/mibeko-site"
    quoi: "Le portail public du fonds juridique. Astro."
    famille: "code"
  - label: "vps_infra"
    url: "https://github.com/benaja-bendo/vps_infra"
    quoi: "L’infrastructure du VPS. Ansible, Docker, Traefik, MinIO."
    famille: "code"
enseignement: "Sur un outil juridique, la traçabilité passe avant la qualité de la réponse. Tant qu’une phrase ne renvoie pas à l’article exact dont elle vient, elle n’est pas opposable — et l’outil redevient un chatbot qu’on ne peut montrer à personne."
etude: "mibeko"
epingle: true
ordre: 1
maj: 2026-08-14
---

Le droit congolais et le droit OHADA existent, mais éparpillés dans des PDF
scannés : introuvables, impossibles à interroger, sans garantie de citer la bonne
source. Mibeko transforme ces documents en une base interrogeable et répond aux
questions en langage naturel, chaque réponse pointant vers son article.

Je l’ai porté seul de l’idée à la production : chaîne d’ingestion, API, recherche
hybride, tableau de bord, applications mobiles publiées sur les deux stores, et
l’exploitation du VPS qui héberge le tout. C’est le projet qui me sert de
référence pour tout le reste — parce qu’il est complet et parce qu’il tourne.
