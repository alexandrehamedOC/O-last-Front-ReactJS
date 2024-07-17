# Commande Git Flow

## 1

git flow feature start 'my-feature'

## 2

git status

git add .

git commit -m 'my commit'

## 3

git flow feature publish 'my-feature'

## 4

git push --set-upstream origin feature/ma-fonctionnalité

Créer une Pull Request :
Une fois que la branche de fonctionnalité est poussée vers le dépôt distant, ouvrez votre interface utilisateur de gestion de dépôts (comme GitHub, GitLab, Bitbucket, etc.) pour créer une pull request. Suivez ces étapes générales :

Allez sur le dépôt distant dans votre navigateur.
Naviguez vers la section des pull requests.
Créez une nouvelle pull request, en choisissant la branche feature/ma-fonctionnalité comme source et develop comme destination.
Ajoutez un titre et une description détaillés pour expliquer les changements apportés.
Assignez les réviseurs et ajoutez les labels si nécessaire.

## 5

git flow feature finish 'ma-fonctionnalité'

## 6

git push origin develop
