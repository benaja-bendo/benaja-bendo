---
titre: "Mibeko"
sousTitre: "SaaS LegalTech : accès au droit congolais et OHADA"
periode: "En production depuis décembre 2025"
resume: "Un fonds de plus de 1 000 textes et 17 000 articles de droit, que l’on interroge avec ses propres mots. Chaque réponse cite l’article exact d’où elle vient. Conçu, développé et mis en production en six mois."
tags: ["IA générative", "RAG", "Fullstack", "Mobile", "DevOps"]
stack:
  ["Laravel", "Python / FastAPI", "React", "Astro", "Kotlin Multiplatform", "PostgreSQL · pgvector", "Docker", "Ansible", "Traefik", "GitHub Actions"]
chiffres:
  - { valeur: "17 000+", label: "articles de droit indexés et sourcés" }
  - { valeur: "6 mois", label: "de l’idée à la production" }
  - { valeur: "2 stores", label: "App Store + Play Store" }
  - { valeur: "~730", label: "tests automatisés" }
liens:
  - { label: "Voir Mibeko en ligne", url: "https://mibeko.fr" }
  - { label: "Essayer l’assistant", url: "https://mibeko.fr/assistant" }
preuves:
  - label: "mibeko.fr"
    url: "https://mibeko.fr"
    quoi: "Le produit public : recherche, textes officiels, démarches et guides."
    famille: "produit"
  - label: "mibeko.fr/assistant"
    url: "https://mibeko.fr/assistant"
    quoi: "Trois questions réelles et les articles du fonds qui fondent la réponse, ouvrables et vérifiables sans compte."
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
maj: 2026-09-24
---

## Le problème

Le droit congolais et le droit OHADA existent, mais ils sont éparpillés dans des
PDF scannés, difficiles à trouver et impossibles à interroger. Un juriste, un
entrepreneur ou un citoyen qui cherche une règle précise doit fouiller des
documents épars, sans garantie d’être à jour ni de citer la bonne source.

## Le fonds, et ce qu’il change

Mibeko a publié plus de 1 000 textes officiels (codes, lois, décrets, actes
uniformes), soit plus de 17 000 articles, chacun adressable individuellement et
sourcé auprès du Secrétariat général du Gouvernement (sgg.cg) ou de l’OHADA
(ohada.org). Poser une question ne renvoie plus vers un document entier à
relire, mais vers l’article exact qui y répond.

La contrainte qui organise tout : une réponse ne vaut que par l’article qu’elle
cite. L’assistant ne répond pas de mémoire : il cherche
dans ce fonds, retient les articles pertinents, et **retire toute citation qui
ne correspond à aucun article réellement retrouvé avant affichage**. Ce n’est
pas une consigne donnée au modèle : c’est un contrôle appliqué à sa sortie.
[Trois questions réelles et leurs sources sont consultables sans
compte](https://mibeko.fr/assistant).

## La construction

Cette rigueur tient à une chaîne de traitement **traçable** de bout en bout.
Chaque document est lu (OCR), puis structuré par un modèle de langage dont la
sortie est **validée par un schéma strict** : le modèle propose, le schéma
dispose. Rien n’entre en base sans respecter la forme attendue. Chaque
fragment garde la preuve de son origine jusqu’à l’empreinte du fichier source
(provenance SHA-256).

Par-dessus, une recherche **hybride** combine trois angles (texte intégral,
proximité orthographique, similarité sémantique via pgvector) pour retrouver le
bon article même quand la question est formulée autrement que la loi.

L’assistant repose sur cette recherche : c’est un **RAG sourcé** (l’IA
cherche d’abord dans le fonds, puis rédige à partir de ce qu’elle a trouvé).
Un agent IA lance lui-même les recherches dont il a besoin, puis répond
uniquement à partir des articles trouvés, en citant chacun d’eux. S’il ne
trouve rien, il le dit et propose une autre piste, au lieu de répondre de
mémoire. Un serveur **MCP** (le moyen standard de donner des outils à un
assistant IA) ouvre aussi le fonds à d’autres assistants : chercher, lire un
article, repérer les anomalies d’un texte. L’IA signale ; un humain corrige
et publie.

Côté livraison : une API Laravel, un service d’ingestion Python / FastAPI, un
tableau de bord React, un site Astro, et des applications mobiles Kotlin
Multiplatform publiées sur l’App Store et le Play Store.

## La production

Mibeko tourne en production depuis décembre 2025. La qualité est tenue par
**~730 tests automatisés** et une CI/CD GitHub Actions ; le déploiement continu
se fait sur un serveur Linux que j’administre (Docker, Ansible, Traefik). Je le
conçois, le développe et **je le fais tourner au quotidien** : mises en
production, surveillance, corrections.

Ces tests sont de deux sortes. Les tests unitaires vérifient une fonction
seule ; les tests d’intégration vérifient plusieurs briques ensemble, sur une
vraie base PostgreSQL. Ils tournent à chaque modification, avec Pest pour
l’API Laravel et Vitest pour le tableau de bord React, et la mise en ligne
n’a lieu que s’ils passent. Le traitement des documents a ses propres tests,
écrits avec pytest. Pour suivre ce qui se passe une fois en ligne : la mesure
d’audience passe par Umami, installé sur mon serveur et sans cookies, et les
journaux des services se lisent avec Dozzle.

C’est le projet qui prouve le reste : la capacité à porter un fonds de données
et un produit complets, du texte de loi aux stores, et à les faire tenir dans
la durée.
