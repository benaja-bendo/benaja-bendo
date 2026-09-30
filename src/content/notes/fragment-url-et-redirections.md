---
titre: "Un fragment d’URL n’atteint jamais le serveur"
date: 2026-08-14
maj: 2026-09-30
resume: "Ce qui suit le # d’une adresse n’est jamais envoyé au serveur : impossible de rediriger deux ancres vers deux pages différentes. La solution : rediriger le chemin, et garder les mêmes ancres à l’arrivée."
sujets: ["HTTP", "Firebase", "URLs"]
statut: "stable"
---

## Le contexte

En août 2026, j’ai découpé une page de mon site en plusieurs pages. Deux liens
vers cette page avaient déjà été envoyés dans des candidatures, chacun avec une
ancre : `/experiences#aife` et `/experiences#france-travail`. Je voulais que
chacun mène directement à sa nouvelle page.

## Ce qui bloque

Le fragment, c’est tout ce qui suit le `#` dans une adresse. Le navigateur le
garde pour lui : il n’est jamais envoyé au serveur. Firebase Hosting ne voit
donc que `/experiences`. Pour lui, les deux liens sont exactement la même
adresse, et il ne peut pas les envoyer vers deux pages différentes. C’est vrai
chez tous les hébergeurs, pas seulement chez Firebase.

## Première solution : une page de passage

J’ai d’abord gardé `/experiences` comme page de passage. Chaque ancre y
existait encore, avec un court résumé et un lien vers la nouvelle page.
Quelqu’un qui arrivait par un ancien lien tombait au bon endroit, et repartait
en un clic. C’était moins propre qu’une redirection, mais aucun lien déjà
envoyé n’était cassé.

## La solution actuelle : rediriger le chemin, garder les ancres

Un serveur ne voit pas le fragment, mais il peut rediriger le chemin :
`/experiences` vers une seule page. Le navigateur réapplique alors le fragment
à l’arrivée. Il suffit que la page d’arrivée porte les mêmes ancres.

C’est ce que j’ai fait le 30 septembre 2026, en fusionnant mes études de cas
dans mes réalisations. `/experiences` redirige maintenant (en 301) vers
`/realisations`, où les lignes France Travail et AIFE portent les ancres
`#france-travail` et `#aife`. Les deux anciens liens arrivent toujours au bon
endroit, et la page de passage a disparu.

## Ce que j’en retiens

Avant de supprimer ou de renommer une page, je cherche les ancres qui ont pu
être partagées : la redirection ne peut pas les distinguer, c’est à la page
d’arrivée de les garder. Depuis, un test du site vérifie aussi que chaque
redirection mène à une vraie page.
