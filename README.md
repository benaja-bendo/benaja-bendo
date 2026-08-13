# Bénaja Bendo-Matondo

**Développeur Fullstack Java / Spring Boot · React** — Bordeaux / Mérignac (33)

Je conçois, je livre et j'**opère** des produits complets en production. Le plus parlant
est [Mibeko](https://mibeko.fr) : un SaaS LegalTech qui rend le droit congolais et OHADA
consultable, que j'ai conçu et que j'opère seul depuis décembre 2025 — API, ingestion
documentaire, apps mobiles et infrastructure comprises.

🟢 **Disponible en CDI à partir du 28 septembre 2026** (fin d'alternance chez Capgemini et
du titre RNCP niveau 7).

---

## 🏛️ Mibeko — l'écosystème

Le droit du Congo-Brazzaville existe, mais il dort dans des PDF scannés. Mibeko le rend
cherchable, structuré et citable. Cinq dépôts, une seule base de vérité :

| Dépôt | Rôle | Stack |
| --- | --- | --- |
| [`mibeko-dashboard`](https://github.com/benaja-bendo/mibeko-dashboard) | API et source de vérité : fonds juridique, auth, assistant IA, facturation | Laravel 13, PostgreSQL |
| [`mibeko-python`](https://github.com/benaja-bendo/mibeko-python) | Ingestion : OCR (MinerU), extraction et structuration des textes | FastAPI, S3/MinIO |
| [`mibeko-front`](https://github.com/benaja-bendo/mibeko-front) | Dashboard des avocats et juristes | React, Vite, TypeScript |
| [`mibeko-app-kmp`](https://github.com/benaja-bendo/mibeko-app-kmp) | Apps Android + iOS, consultation partiellement hors-ligne | Kotlin Multiplatform |
| [`mibeko-site`](https://github.com/benaja-bendo/mibeko-site) | Portail public du fonds juridique | Astro |

Ce qui fait la différence côté IA : l'assistant **cite l'article exact d'où vient chaque
réponse** (RAG), le LLM propose mais un **schéma valide** avant écriture, et chaque
document garde sa provenance (empreinte SHA-256). Recherche hybride : plein texte,
trigrammes, `pgvector`.

**En production** : ~730 tests automatisés, CI/CD GitHub Actions, déploiement continu,
apps publiées sur l'App Store et le Play Store.

L'infra qui porte tout ça est publique elle aussi :
[`vps_infra`](https://github.com/benaja-bendo/vps_infra) — Ansible, Docker, Traefik,
PostgreSQL, MinIO.

## 💼 En entreprise

**Capgemini**, Bordeaux — janvier 2023 → septembre 2026 (stage puis alternance)

- **France Travail** (2024-2026) : refonte de deux applications fragiles en un service
  Spring Boot unique sur OpenShift, qui automatise la collecte des prévisions de
  **400+ collaborateurs**. Tableaux de bord Power BI utilisés au quotidien.
- **AIFE** (finances publiques) : microservices Java / Spring Boot, agilité à l'échelle,
  au sein d'une équipe backend de 10 personnes.

## 🛠️ Stack

**Backend** — Java · Spring Boot · Laravel / PHP · Python (FastAPI) · Node.js
**Frontend** — TypeScript · React · Astro · Vue
**Mobile** — Kotlin Multiplatform · Flutter
**Données & IA** — PostgreSQL · pgvector · recherche plein texte et trigrammes · pipelines RAG · OCR
**Ops** — Docker · Ansible · Traefik · GitHub Actions · OpenShift · VPS Linux

## 🧭 Le fil conducteur

J'ai commencé par réparer des machines à Pointe-Noire, en maintenance industrielle. Je
construis maintenant des systèmes logiciels qui n'ont pas besoin de moi pour tourner — et
je les opère. Entre les deux : développeur web et mobile au Congo puis en freelance,
avant l'EPSI Bordeaux (Bachelor CDA, puis RNCP niveau 7).

À côté, j'écris des jeux navigateur en Phaser 3 dont **l'art pixel est intégralement
généré par code** — pas une image importée.

## 📫 Me contacter

[benaja-bendo.fr](https://www.benaja-bendo.fr) · [contact@benaja-bendo.fr](mailto:contact@benaja-bendo.fr) · [LinkedIn](https://www.linkedin.com/in/benaja-bendo)

<sub>🇬🇧 Fullstack developer (Java / Spring Boot · React) based in Bordeaux, France.
I design, ship and operate <a href="https://mibeko.fr">Mibeko</a>, a LegalTech SaaS in
production since December 2025. Available for a permanent role from 28 September 2026.</sub>
