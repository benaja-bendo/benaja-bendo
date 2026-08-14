---
titre: "Un fragment d’URL n’atteint jamais le serveur"
date: 2026-08-14
resume: "Impossible de rediriger /experiences#aife et /experiences#france-travail vers deux pages différentes : l’hébergeur ne voit que /experiences. La sortie n’est pas une règle de redirection, c’est une page de compatibilité."
sujets: ["HTTP", "Firebase", "URLs"]
statut: "stable"
---

## Le contexte

En découpant une page unique en plusieurs pages, j’avais deux ancres déjà
distribuées dans des candidatures et des messages : `/experiences#aife` et
`/experiences#france-travail`. Je voulais une redirection permanente vers les deux
nouvelles études de cas.

## Ce que ça bloque

Le fragment — tout ce qui suit le `#` — est traité **par le navigateur** et n’est
jamais envoyé dans la requête HTTP. L’hébergeur, Firebase Hosting ici comme
n’importe quel autre, ne voit que `/experiences`. Il ne peut donc pas router deux
ancres vers deux destinations différentes : côté serveur, les deux URL sont
strictement la même.

## Ce que j’ai fait

`/experiences` reste en place comme **page d’orientation** : chaque ancre y survit,
avec un résumé court et un lien direct vers l’étude complète. Un visiteur arrivant
par un ancien lien atterrit au bon endroit et repart en un clic.

C’est moins élégant qu’une règle de redirection, mais ça ne casse aucun lien déjà
envoyé. Une redirection ne sera posée que le jour où plus personne n’arrive par ces
ancres — et une URL publique ne se casse pas pour rendre une arborescence plus
jolie.

## Les limites

Vrai pour toute redirection côté serveur, quel que soit l’hébergeur. Ce qu’un
serveur *peut* faire, c’est rediriger `/experiences` vers une page unique : le
navigateur réappliquera alors le fragment à la destination, ce qui n’est utile que
si les ancres existent encore à l’arrivée.
