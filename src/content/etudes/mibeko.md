---
titre: "Mibeko"
sousTitre: "SaaS LegalTech — accès au droit congolais et OHADA"
periode: "En production depuis décembre 2025"
resume: "Conçu, développé et opéré seul en six mois : un assistant qui répond aux questions de droit en citant l’article exact d’où vient chaque réponse."
tags: ["IA générative", "RAG", "Fullstack", "Mobile", "DevOps"]
stack:
  ["Laravel", "Python / FastAPI", "React", "Astro", "Kotlin Multiplatform", "PostgreSQL · pgvector", "Docker", "Ansible", "Traefik", "GitHub Actions"]
chiffres:
  - { valeur: "6 mois", label: "de l’idée à la production, seul" }
  - { valeur: "~730", label: "tests automatisés" }
  - { valeur: "2 stores", label: "App Store + Play Store" }
  - { valeur: "déc. 2025", label: "en production depuis" }
liens:
  - { label: "Voir Mibeko en ligne", url: "https://mibeko.fr" }
preuves:
  - label: "mibeko.fr"
    url: "https://mibeko.fr"
    quoi: "Le produit public : recherche, textes officiels, démarches et guides."
    famille: "produit"
  - label: "App Store"
    url: "https://apps.apple.com/app/id6768865781"
    quoi: "L’application iOS publiée, avec ses captures et ses mises à jour."
    famille: "application"
  - label: "Google Play"
    url: "https://play.google.com/store/apps/details?id=cg.mibeko.app"
    quoi: "La même application côté Android, publiée depuis le même dépôt Kotlin."
    famille: "application"
  - label: "mibeko-dashboard"
    url: "https://github.com/benaja-bendo/mibeko-dashboard"
    quoi: "L’API et la source de vérité : fonds juridique, authentification, assistant, facturation. Laravel, PostgreSQL."
    famille: "code"
  - label: "mibeko-python"
    url: "https://github.com/benaja-bendo/mibeko-python"
    quoi: "La chaîne d’ingestion : OCR, extraction et structuration des textes. FastAPI."
    famille: "code"
  - label: "mibeko-front"
    url: "https://github.com/benaja-bendo/mibeko-front"
    quoi: "Le tableau de bord des avocats et juristes. React, Vite, TypeScript."
    famille: "code"
  - label: "mibeko-app-kmp"
    url: "https://github.com/benaja-bendo/mibeko-app-kmp"
    quoi: "Les applications Android et iOS, consultation partiellement hors connexion. Kotlin Multiplatform."
    famille: "code"
  - label: "mibeko-site"
    url: "https://github.com/benaja-bendo/mibeko-site"
    quoi: "Le portail public du fonds juridique. Astro."
    famille: "code"
  - label: "vps_infra"
    url: "https://github.com/benaja-bendo/vps_infra"
    quoi: "L’infrastructure qui porte le tout, publique elle aussi. Ansible, Docker, Traefik, PostgreSQL, MinIO."
    famille: "code"
realisation: "mibeko"
ordre: 1
maj: 2026-08-14
---

## Le problème

Le droit congolais et le droit OHADA existent — mais ils sont éparpillés dans des
PDF scannés, difficiles à trouver et impossibles à interroger. Un juriste, un
entrepreneur ou un citoyen qui cherche une règle précise doit fouiller des
documents épars, sans garantie d’être à jour ni de citer la bonne source.

## La construction

J’ai construit une chaîne de traitement **traçable** de bout en bout. Chaque
document est lu (OCR), puis structuré par un modèle de langage dont la sortie est
**validée par un schéma strict** : le modèle propose, le schéma dispose — rien
n’entre en base sans respecter la forme attendue. Chaque fragment garde la preuve
de son origine jusqu’à l’empreinte du fichier source (provenance SHA-256).

Par-dessus, une recherche **hybride** combine trois angles (texte intégral,
proximité orthographique, similarité sémantique via pgvector) pour retrouver le
bon article même quand la question est formulée autrement que la loi. Enfin, un
assistant répond en langage naturel **en citant l’article exact d’où vient chaque
réponse** — c’est ce qui sépare un outil juridique fiable d’un chatbot qui invente.

Côté livraison : une API Laravel, un service d’ingestion Python / FastAPI, un
tableau de bord React, un site Astro, et des applications mobiles Kotlin
Multiplatform publiées sur l’App Store et le Play Store.

## La production

Mibeko tourne en production depuis décembre 2025. La qualité est tenue par
**~730 tests automatisés** et une CI/CD GitHub Actions ; le déploiement continu
se fait sur un VPS que j’administre (Docker, Ansible, Traefik). Je le conçois, le
développe et **je l’opère** — mises en production, surveillance, corrections.

C’est le projet qui prouve le reste : la capacité à porter un produit complet,
du backend aux stores, et à le faire tenir dans la durée.
