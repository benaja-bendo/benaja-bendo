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
- Aucun fichier `.firebaserc` n'est requis en CI : l'identifiant exact du projet est une
  variable GitHub, `FIREBASE_PROJECT_ID`.

## 1. Relever l'identifiant exact du projet

Dans Firebase Console : **roue dentée → Paramètres du projet → Général → ID du projet**.

L'ID n'est pas forcément le nom affiché « benaja-bendo ». S'il est par exemple
`benaja-bendo-4f21a`, conserver exactement cette valeur. Ne pas utiliser le numéro de
projet ni l'identifiant d'application Web.

Vérifier également dans **Utilisation et facturation** que le projet est sur le plan
**Spark**. Le site n'a besoin d'aucun produit imposant le plan Blaze.

## 2. Initialiser Hosting dans Firebase Console

Dans **Build → Hosting**, cliquer sur **Commencer** pour activer le parcours Hosting.
Quand Firebase affiche les instructions de ligne de commande, il est possible de
s'arrêter : les fichiers locaux sont déjà préparés dans ce dépôt et le premier workflow
GitHub publiera le site par défaut. Il n'est pas nécessaire d'enregistrer une application
Web Firebase ni de copier un SDK JavaScript : le site ne consomme aucun service Firebase
depuis le navigateur.

Ne pas choisir **App Hosting**. Ne pas activer Firestore, Authentication ou Functions.

## 3. Créer un compte de service dédié à GitHub

Dans Google Cloud Console, avec le bon projet sélectionné :

1. ouvrir **IAM et administration → Comptes de service** ;
2. créer `github-firebase-hosting` ;
3. lui attribuer les rôles :
   - **Administrateur Firebase Hosting** (`roles/firebasehosting.admin`) ;
   - **Lecteur de clés API** (`roles/serviceusage.apiKeysViewer`) ;
   - **Administrateur Firebase Authentication** (`roles/firebaseauth.admin`), utilisé
     par l'action officielle pour autoriser les domaines des aperçus ;
   - **Lecteur Cloud Run** (`roles/run.viewer`), rôle en lecture seule demandé par
     l'action officielle lors de l'inspection des réécritures Hosting.
4. ouvrir le compte créé, puis **Clés → Ajouter une clé → Créer une clé → JSON**.

Cette clé est un secret. Ne jamais la placer dans le dépôt, dans `.env`, dans un ticket
ou dans une conversation. Elle doit être copiée une seule fois dans GitHub, puis le
fichier téléchargé doit être supprimé de l'ordinateur.

## 4. Configurer GitHub

Dans le dépôt GitHub : **Settings → Secrets and variables → Actions**.

### Secret

Dans l'onglet **Secrets**, créer un *repository secret* :

```text
Nom     : FIREBASE_SERVICE_ACCOUNT
Valeur  : tout le contenu du fichier JSON du compte de service
```

### Variable

Dans l'onglet **Variables**, créer une *repository variable* :

```text
Nom     : FIREBASE_PROJECT_ID
Valeur  : l'ID exact relevé à l'étape 1
```

Le workflow est volontairement configuré pour ne pas fournir ce secret aux forks ni à
Dependabot. Un push sur `main` publie le canal `live`. Une pull request créée depuis une
branche du dépôt reçoit une URL d'aperçu valable sept jours.

## 5. Premier déploiement

Quand le secret et la variable existent, pousser le commit de configuration sur GitHub.
Dans l'onglet **Actions**, le workflow **CI & Firebase Hosting** doit terminer avec :

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
