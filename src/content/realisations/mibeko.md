---
nom: "Mibeko"
resume: "Une application pour consulter le droit congolais et OHADA avec ses propres mots. Chaque réponse renvoie à l’article de loi exact d’où elle vient."
statut: "production"
periode: "Depuis décembre 2025"
role: "Créateur et responsable technique : conception, développement, mise en ligne et suivi, du serveur jusqu’aux stores"
type: "produit"
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
chiffres:
  - { valeur: "17 000+", label: "articles de loi, chacun avec sa source" }
  - { valeur: "6 mois", label: "de l’idée à la mise en ligne" }
  - { valeur: "2 stores", label: "App Store et Google Play" }
  - { valeur: "6", label: "dépôts de code public" }
liens:
  - { label: "mibeko.fr", url: "https://mibeko.fr" }
  - { label: "Essayer l’assistant", url: "https://mibeko.fr/assistant" }
preuves:
  - label: "mibeko.fr"
    url: "https://mibeko.fr"
    quoi: "Le produit public : recherche, textes officiels, démarches et guides."
    famille: "produit"
  - label: "mibeko.fr/assistant"
    url: "https://mibeko.fr/assistant"
    quoi: "Trois questions réelles et les articles qui fondent la réponse, ouvrables sans compte."
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
    quoi: "L’API et la base de référence : textes de loi, comptes, assistant, facturation. Laravel, PostgreSQL."
    famille: "code"
  - label: "mibeko-python"
    url: "https://github.com/benaja-bendo/mibeko-python"
    quoi: "Le traitement des documents : OCR, extraction et mise en forme des textes. FastAPI."
    famille: "code"
  - label: "mibeko-front"
    url: "https://github.com/benaja-bendo/mibeko-front"
    quoi: "Le tableau de bord des avocats et juristes. React, Vite, TypeScript."
    famille: "code"
  - label: "mibeko-app-kmp"
    url: "https://github.com/benaja-bendo/mibeko-app-kmp"
    quoi: "Les applications Android et iOS, consultables en partie hors connexion. Kotlin Multiplatform."
    famille: "code"
  - label: "mibeko-site"
    url: "https://github.com/benaja-bendo/mibeko-site"
    quoi: "Le site public des textes de loi. Astro."
    famille: "code"
  - label: "vps_infra"
    url: "https://github.com/benaja-bendo/vps_infra"
    quoi: "Le serveur qui fait tourner le tout, public lui aussi. Ansible, Docker, Traefik, PostgreSQL, MinIO."
    famille: "code"
enseignement: "Sur un outil juridique, surtout au Congo, il faut pouvoir se protéger : chaque réponse doit renvoyer au texte d’origine, pour qu’on le retrouve facilement. C’est ce qui m’a demandé le plus de travail, plus que la qualité des réponses elles-mêmes."
# Fusion du 30/09/2026 : l'ancienne étude de cas (/etudes/mibeko, redirigée
# ici) et l'ancienne fiche ne font plus qu'une page. Les titres « La
# construction » et « La production » ne doivent pas changer : leurs ancres
# sont citées par stack.ts et par les CV déjà envoyés, et `npm test` vérifie
# que chaque techno liée y est nommée.
ordre: 1
maj: 2026-09-30
---

## Le problème

Au Congo, le droit existe, mais il est éparpillé dans des PDF scannés. Pour un
juriste, un entrepreneur ou un simple citoyen, retrouver une règle précise
veut dire fouiller des documents, sans savoir s’ils sont à jour ni citer la
bonne source.

Mibeko est un projet personnel. Il vise avant tout à aider les gens au Congo
qui n’ont pas facilement accès aux textes de loi. Il rend ces textes simples à
consulter pour tout le monde, et donne aux professionnels des outils adaptés à
leurs besoins.

## Le fonds

Mibeko rassemble aujourd’hui plus de 1 000 textes officiels (codes, lois,
décrets, actes uniformes), soit plus de 17 000 articles. Chaque article a sa
propre adresse et sa source : le Secrétariat général du Gouvernement (sgg.cg)
ou l’OHADA (ohada.org). Quand on pose une question, on arrive directement sur
l’article qui répond, pas sur un document entier à relire.

L’assistant ne répond pas de mémoire. Il cherche dans ce fonds et garde les
articles utiles. Avant d’afficher sa réponse, le code vérifie que chaque
article cité existe bien dans la base : sinon, la citation est retirée.
[Trois questions réelles et leurs sources sont consultables sans
compte](https://mibeko.fr/assistant).

## La construction

Tout part des documents. Chaque PDF est lu automatiquement (OCR), puis mis en
forme par un modèle de langage. Ce que renvoie le modèle est contrôlé par un
schéma strict : si ça n’a pas la bonne forme, ça n’entre pas en base. Chaque
morceau de texte garde la trace du fichier d’où il vient, jusqu’à son
empreinte (provenance SHA-256).

Pour retrouver le bon article, la recherche est **hybride**. Elle combine les
mots exacts, les fautes de frappe proches et le sens de la question
(similarité sémantique avec pgvector). On trouve donc l’article même quand on
ne connaît pas les termes de la loi.

L’assistant s’appuie sur cette recherche : c’est un **RAG sourcé** (l’IA
cherche d’abord dans le fonds, puis rédige à partir de ce qu’elle a trouvé).
Un agent IA lance lui-même les recherches dont il a besoin et cite chaque
article utilisé. S’il ne trouve rien, il le dit et propose une autre piste.
Un serveur **MCP** (le moyen standard de donner des outils à un assistant IA)
ouvre aussi le fonds à d’autres assistants : chercher, lire un article,
signaler une anomalie. L’IA signale, et c’est un humain qui corrige et publie.

Côté technique : une API Laravel, un service Python / FastAPI pour les
documents, un tableau de bord React, un site Astro, et des applications
mobiles Kotlin Multiplatform publiées sur l’App Store et Google Play.

## La production

Mibeko tourne en production depuis décembre 2025. Je le conçois, je le
développe et je le fais tourner au quotidien : mises en ligne, surveillance,
corrections.

Chaque modification est **testée automatiquement** avant d’être mise en
ligne, par une CI/CD GitHub Actions. Il y a deux sortes de tests : les tests
unitaires vérifient une fonction seule, les tests d’intégration vérifient
plusieurs briques ensemble, sur une vraie base PostgreSQL. Pest teste l’API
Laravel, Vitest le tableau de bord React, et rien n’est mis en ligne si les
tests échouent. Le traitement des documents a ses propres tests, écrits avec
pytest.

Le tout tourne sur un serveur Linux que j’administre, configuré avec Ansible,
Docker et Traefik. Pour suivre ce qui se passe en ligne, la mesure d’audience
passe par Umami, installé sur mon serveur et sans cookies, et les journaux des
services se lisent avec Dozzle.
