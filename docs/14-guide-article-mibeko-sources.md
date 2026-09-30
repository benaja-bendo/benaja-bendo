# Guide : ton premier article, « l'assistant Mibeko et ses sources »

*Préparé le 30/09/2026 pour l'étape 8 de [docs/13](13-refonte-contenu.md).
C'est toi qui écris ; ce guide te donne le plan, les faits vérifiés dans le
code public, et les questions auxquelles toi seul peux répondre. Le brouillon
t'attend dans `src/content/notes/mibeko-assistant-sources.md`.*

---

## 1. Le but de l'article

Montrer, avec des exemples réels, **comment tu empêches une IA juridique
d'inventer ses sources**. C'est ce qui distingue Mibeko d'un chatbot, et
c'est une question que tout le monde se pose sur l'IA en ce moment.

**Qui le lit :**
- un recruteur technique ou un lead dev, qui veut voir comment tu raisonnes ;
- un juriste ou un curieux, qui veut savoir s'il peut faire confiance à
  Mibeko.

L'article doit se lire sans connaître le code. Chaque mot technique est
expliqué en quelques mots, comme sur le reste du site.

**Longueur visée :** 900 à 1 300 mots, soit 5 à 7 minutes de lecture.

## 2. Titres possibles

Choisis celui qui te ressemble, ou fais le tien :

- « Comment l'assistant Mibeko cite ses sources »
- « Faire citer ses sources à une IA juridique »
- « Une IA pour le droit congolais, et comment je l'empêche d'inventer »

## 3. Le plan, section par section

### Le problème

**Ce que tu dois faire passer :** au Congo, les textes de loi sont difficiles
d'accès. Une IA qui invente un article de loi, c'est grave : quelqu'un peut
s'y fier.

**Tu as déjà la phrase de départ** (dictée le 30/09) : « Sur un outil
juridique, surtout au Congo, il faut pouvoir se protéger : chaque réponse
doit renvoyer au texte d'origine, pour qu'on le retrouve facilement. »

**À toi de répondre :**
- Pour qui as-tu fait Mibeko ? Un exemple de personne, sans nom.
- As-tu déjà vu une IA générale (ChatGPT ou autre) inventer un article de
  loi congolais ? Si oui, raconte-le : c'est la meilleure accroche possible.

### Comment l'assistant répond

**Ce que tu dois expliquer simplement :** l'assistant ne répond pas de
mémoire. Il cherche d'abord dans la base de Mibeko, puis il rédige à partir
de ce qu'il a trouvé. C'est ce qu'on appelle un RAG (l'IA cherche avant de
rédiger).

**Faits vérifiés, utilisables tels quels :**
- L'assistant peut lancer **jusqu'à 5 recherches** avant de répondre, avec des
  mots-clés différents (`MaxSteps(6)` dans
  [`MibekoIA.php`](https://github.com/benaja-bendo/mibeko-dashboard/blob/main/app/Ai/Agents/MibekoIA.php)).
- Chaque recherche renvoie **au plus 5 extraits** d'articles
  ([`SearchLegalDatabase.php`](https://github.com/benaja-bendo/mibeko-dashboard/blob/main/app/Ai/Tools/SearchLegalDatabase.php)).
- Chaque extrait reçoit un **numéro**, qui continue d'une recherche à l'autre.
- La consigne donnée à l'IA : chaque affirmation juridique se termine par
  `[n]`, le numéro de l'extrait utilisé. L'écran transforme ce `[n]` en **lien
  vers le texte officiel**.
- Le cadre est le droit congolais et OHADA **uniquement** : jamais le droit
  français.

**Montre-le :** les trois questions de https://mibeko.fr/assistant sont
publiques. Choisis-en une et décris ce qu'on voit.

### Le filet de sécurité : le code retire les citations inventées

C'est le cœur de l'article.

**Ce que tu dois faire passer :** une consigne donnée à l'IA peut ne pas être
respectée. Alors un morceau de code vérifie chaque citation avant qu'elle
n'arrive à l'écran.

**Faits vérifiés :**
- L'IA peut écrire `[5]` alors que la recherche n'a trouvé que 3 extraits. Ce
  `[5]` donnerait l'illusion d'un article de loi qui n'existe pas.
- Le fichier
  [`CitationStreamFilter.php`](https://github.com/benaja-bendo/mibeko-dashboard/blob/main/app/Ai/CitationStreamFilter.php)
  garde un `[n]` seulement si le numéro correspond à un extrait vraiment
  trouvé. Sinon, il le retire.
- Il le fait **pendant que la réponse s'affiche**, au fur et à mesure (en
  « streaming »). La difficulté : un `[5]` peut arriver coupé en deux
  morceaux, `[5` puis `]`. Le filtre attend d'avoir le marqueur entier avant
  de décider.
- Il est couvert par **15 tests**
  ([`CitationVerificationTest.php`](https://github.com/benaja-bendo/mibeko-dashboard/blob/main/tests/Unit/CitationVerificationTest.php)),
  dont « un marqueur coupé en deux est bien retiré » et « les crochets qui ne
  sont pas des citations ne sont jamais touchés ».
- Ajouté en juillet 2026 (commit du 19/07/2026).

**À toi de répondre :** qu'est-ce qui t'a poussé à écrire ce filtre ? Tu as
vu une fausse citation passer, ou tu l'as anticipé ?

### Quand il ne trouve rien

Deux histoires vraies, documentées dans le code. Ce sont tes meilleurs
exemples.

**Histoire 1 : « je n'ai pas trouvé », puis une réponse quand même.**
- Un utilisateur a signalé que l'assistant disait ne rien avoir trouvé… puis
  répondait tout de même, de mémoire
  ([ticket #15](https://github.com/benaja-bendo/mibeko-dashboard/issues/15),
  ouvert en août 2026, corrigé le 4 septembre).
- La cause : une recherche vide renvoyait une liste vide, que l'IA prenait
  pour un détail. Elle continuait avec ses connaissances générales.
- La correction : la recherche renvoie maintenant un statut clair, « aucun
  extrait ». Et la règle est stricte : dans ce cas, l'assistant dit qu'il n'a
  rien trouvé et propose une autre piste, sans rien ajouter de mémoire.
- 9 tests couvrent ce cas
  ([`AssistantNoResultTest.php`](https://github.com/benaja-bendo/mibeko-dashboard/blob/main/tests/Feature/Ai/AssistantNoResultTest.php)).

**Histoire 2 : l'Acte uniforme « introuvable ».**
- Dans un cas signalé le 21 juin (le code ne dit pas l'année : à confirmer,
  le correctif date du 4 septembre 2026), l'IA a filtré sa recherche avec un
  code de type qu'elle avait
  inventé, « ACTE_UNIFORME » (le vrai code est « AU »). La recherche ne
  renvoyait rien, et l'assistant a affirmé que Mibeko ne contenait pas cet
  Acte uniforme… alors qu'il était publié, avec 35 articles.
- La correction : un statut à part quand c'est le **filtre** qui ne désigne
  rien, et la liste des vrais codes donnée à l'IA pour qu'elle relance.

**La phrase qui résume tout** (elle est dans les consignes de l'IA, tu peux
la reprendre avec tes mots) : mieux vaut une non-réponse honnête qu'une
réponse invérifiable.

### Ce que j'en retiens

Ta réflexion, avec tes mots. Pistes :
- Ce qui t'a le plus surpris en construisant ça.
- Ce qui n'est pas encore réglé, ou ce que tu ferais autrement.
- Terminer en invitant à essayer https://mibeko.fr/assistant.

## 4. Ce qu'il vaut mieux laisser de côté

- **Le coût par question** (environ 63 FCFA, noté dans le code) : c'est une
  donnée d'entreprise. À toi de voir si tu veux la publier.
- **Les noms des fournisseurs d'IA** : ils ne servent pas le propos.
- **Le code lui-même** : un lien vers le fichier suffit, pas de copier-coller.

## 5. Ta voix, pour rappel

Reprends tes phrases telles que tu les dirais, puis relis :
- le contexte d'abord, le but ensuite ;
- les gens avant la technique ;
- des mots simples ; « bancal », « badger », c'est très bien ;
- pas de formule du type « ce n'est pas X, c'est Y » : dis Y directement ;
- chaque mot technique expliqué en quelques mots (RAG, streaming, OCR).

Tu peux aussi me dicter une section à l'oral : je la mets en forme en gardant
tes tournures.

## 6. Avant de publier

Dans le frontmatter du brouillon :
- `brouillon: true` → `false`
- `date` : le jour de la publication
- `titre` et `resume` (deux phrases au plus)
- `statut: "stable"` si tout est vérifié

Puis :

```bash
npm run build && npm test
```

Enfin, partage le lien sur LinkedIn : c'est là que la discussion aura lieu.
