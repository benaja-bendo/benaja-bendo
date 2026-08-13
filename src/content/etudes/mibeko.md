---
titre: "Mibeko"
sousTitre: "SaaS LegalTech — accès au droit congolais et OHADA"
periode: "En production depuis décembre 2025"
resume: "Conçu, développé et opéré seul en six mois : un assistant qui répond aux questions de droit en citant l'article exact d'où vient chaque réponse."
tags: ["IA générative", "RAG", "Fullstack", "Mobile", "DevOps"]
stack:
  ["Laravel", "Python / FastAPI", "React", "Astro", "Kotlin Multiplatform", "PostgreSQL · pgvector", "Docker", "Ansible", "Traefik", "GitHub Actions"]
chiffres:
  - { valeur: "6 mois", label: "de l'idée à la production, seul" }
  - { valeur: "~730", label: "tests automatisés" }
  - { valeur: "2 stores", label: "App Store + Play Store" }
  - { valeur: "déc. 2025", label: "en production depuis" }
liens:
  - { label: "Voir Mibeko en ligne", url: "https://mibeko.fr" }
ordre: 1
---

## Le problème

Le droit congolais et le droit OHADA existent — mais ils sont éparpillés dans des
PDF scannés, difficiles à trouver et impossibles à interroger. Un juriste, un
entrepreneur ou un citoyen qui cherche une règle précise doit fouiller des
documents épars, sans garantie d'être à jour ni de citer la bonne source.

## La construction

J'ai construit une chaîne de traitement **traçable** de bout en bout. Chaque
document est lu (OCR), puis structuré par un modèle de langage dont la sortie est
**validée par un schéma strict** : le modèle propose, le schéma dispose — rien
n'entre en base sans respecter la forme attendue. Chaque fragment garde la preuve
de son origine jusqu'à l'empreinte du fichier source (provenance SHA-256).

Par-dessus, une recherche **hybride** combine trois angles (texte intégral,
proximité orthographique, similarité sémantique via pgvector) pour retrouver le
bon article même quand la question est formulée autrement que la loi. Enfin, un
assistant répond en langage naturel **en citant l'article exact d'où vient chaque
réponse** — c'est ce qui sépare un outil juridique fiable d'un chatbot qui invente.

Côté livraison : une API Laravel, un service d'ingestion Python / FastAPI, un
tableau de bord React, un site Astro, et des applications mobiles Kotlin
Multiplatform publiées sur l'App Store et le Play Store.

## La production

Mibeko tourne en production depuis décembre 2025. La qualité est tenue par
**~730 tests automatisés** et une CI/CD GitHub Actions ; le déploiement continu
se fait sur un VPS que j'administre (Docker, Ansible, Traefik). Je le conçois, le
développe et **je l'opère** — mises en production, surveillance, corrections.

C'est le projet qui prouve le reste : la capacité à porter un produit complet,
du backend aux stores, et à le faire tenir dans la durée.
