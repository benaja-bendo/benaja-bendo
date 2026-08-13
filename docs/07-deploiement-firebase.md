# Déploiement Firebase Hosting

*Décision prise le 13 août 2026. Le site reste statique : Firebase sert uniquement les
fichiers produits dans `dist/`. Firestore, Authentication, Functions et App Hosting ne
font pas partie de cette architecture.*

## Architecture retenue

```text
contenu Markdown + composants Astro
              ↓ git push / pull request
           GitHub Actions
     check → build → Firebase Hosting
              ↓
        benaja-bendo.fr (HTTPS)
```

- `firebase.json` décrit le dossier publié, les URL, le cache et les en-têtes HTTP.
- `.github/workflows/ci.yml` vérifie puis déploie : aperçu temporaire sur une pull
  request interne, production uniquement depuis `main`.
- Le **nom de domaine et la messagerie restent chez Infomaniak**. Seuls les
  enregistrements DNS du site Web pointeront vers Firebase.
- `.firebaserc` associe le dépôt local au projet `benaja-bendo`. Le workflow indique
  également cet ID explicitement afin que le déploiement CI ne dépende pas d'un alias.

## 1. Projet Firebase — configuré

Le projet existant a été associé par `firebase init` le 14/08/2026 :

```text
Nom : benaja-bendo
ID  : benaja-bendo
```

Vérifier également dans **Utilisation et facturation** que le projet est sur le plan
**Spark**. Le site n'a besoin d'aucun produit imposant le plan Blaze.

## 2. Firebase Hosting — initialisé et corrigé

Hosting a été initialisé avec la CLI le 14/08/2026. Les réponses `public` et « SPA »
données pendant l'assistant ont ensuite été corrigées : Astro publie `dist/` et chaque
page dispose de son propre HTML. Il ne doit donc exister ni réécriture globale vers
`/index.html`, ni page d'accueil Firebase dans `public/`.

Le paquet npm `firebase`, installé pendant l'initialisation, a été retiré : il s'agit du
SDK client pour Auth/Firestore/etc., pas de l'outil d'hébergement. La CLI
`firebase-tools` globale suffit pour les commandes manuelles et n'est pas une dépendance
du site.

Ne pas choisir **App Hosting**. Ne pas activer Firestore, Authentication ou Functions.

## 3. Compte de service GitHub — configuré

La commande `firebase init` a créé le compte `github-action-347491180` avec les droits
Firebase Hosting nécessaires et a envoyé sa clé directement dans les secrets GitHub.
Cette clé ne doit jamais être exportée dans le dépôt, dans `.env`, dans un ticket ou dans
une conversation.

## 4. GitHub Actions — configuré

Le secret suivant a été créé automatiquement dans le dépôt GitHub :

```text
FIREBASE_SERVICE_ACCOUNT_BENAJA_BENDO
```

Les deux workflows génériques créés par la CLI ont été supprimés au profit du workflow
unique `.github/workflows/ci.yml`, qui effectue déjà le type-check et le build. Il est
volontairement configuré pour ne pas fournir le secret aux forks ni à Dependabot. Un
push sur `main` publie le canal `live`. Une pull request créée depuis une branche du
dépôt reçoit une URL d'aperçu valable sept jours.

## 5. Premier déploiement

Pousser le commit de configuration sur GitHub. Dans l'onglet **Actions**, le workflow
**CI & Firebase Hosting** doit terminer avec :

1. installation verrouillée (`npm ci`) ;
2. vérification Astro ;
3. build statique ;
4. déploiement sur le canal Firebase `live`.

Avant de brancher le domaine, ouvrir l'adresse `*.web.app` donnée par Firebase et
contrôler toutes les pages, le mode clair/sombre et le mobile. Le lien CV est encore un
404 tant que `public/cv-benaja-bendo.pdf` n'existe pas : ne pas basculer le domaine en
ignorant ce point.

## 6. Relier le domaine Infomaniak

Dans **Firebase Hosting → Ajouter un domaine personnalisé**, ajouter d'abord
`benaja-bendo.fr`. Utiliser les valeurs DNS affichées par Firebase, pas des valeurs
recopiées d'un tutoriel.

Dans **Infomaniak → Domaines → benaja-bendo.fr → Zone DNS** :

1. ajouter le TXT de vérification fourni par Firebase ;
2. remplacer uniquement les anciens enregistrements Web `A`/`AAAA` demandés par
   Firebase ;
3. conserver sans modification les enregistrements de messagerie **MX, SPF, DKIM et
   DMARC** ;
4. ajouter ensuite `www.benaja-bendo.fr` dans Firebase et le configurer comme redirection
   vers le domaine principal.

La propagation DNS et le certificat TLS peuvent prendre plusieurs heures. Garder
l'ancien site accessible jusqu'à ce que Firebase indique **Connecté** évite une coupure.

## 7. Contrôles après bascule

```bash
curl -I https://benaja-bendo.fr
curl -I https://www.benaja-bendo.fr
curl -I https://benaja-bendo.fr/_astro/UN-FICHIER-CSS-DU-BUILD.css
```

À contrôler : HTTPS, redirection `www` vers l'apex, `Content-Security-Policy`, HSTS,
`X-Content-Type-Options`, et `Cache-Control: ... immutable` sur les fichiers `_astro`
hashés. Tester aussi l'envoi et la réception de `contact@benaja-bendo.fr` après toute
modification DNS.

## Retour arrière

Tant que les anciens enregistrements DNS sont notés avant modification, le retour
arrière consiste à les restaurer chez Infomaniak. Le code reste portable : `dist/` est
un site statique standard et Firebase n'est utilisé par aucun composant métier.

## Références officielles

- [Démarrer avec Firebase Hosting](https://firebase.google.com/docs/hosting/quickstart)
- [Déploiements GitHub et canaux d'aperçu](https://firebase.google.com/docs/hosting/github-integration)
- [Connecter un domaine personnalisé](https://firebase.google.com/docs/hosting/custom-domain)
- [Rôles du compte de service de l'action officielle](https://github.com/FirebaseExtended/action-hosting-deploy/blob/v0.11.0/docs/service-account.md)
