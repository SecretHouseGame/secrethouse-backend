# Backend SecretHouse 

## Base de donnée

_Infos sur le discord._

## Dev Local

Nécessite d'installer firebase cli avec :`npm install -g firebase-tools`

Pour lancer le projet en local :
`firebase serve`

## Déploiement

Pour release une feature ou un fix :
- Écrire votre code et le tester
- Ouvrir une PR sur le projet github.
- Attendre un approved
- Merge dans `main`
- Une nouvelle PR pour la release est créé qui devra être approved et merge également pour déclencher le :
  - Le CI automatisera la release + déploiement sur firebase.
