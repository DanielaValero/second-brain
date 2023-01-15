# learn in public

Hello,

This is a place where I put things that I am currently learning professionally.

### Deploying this
I am building it with mkdocs (a python static stite generator), and using mkdocs-material theme.


### Installation
#### Pre requisites
* Python 3
* pip or pip3

Installation:
```
$ pip3 install -r requirements.txt
```

### Running docs locally
```
mkdocs serve
```

### Edit custom CSS
-> docs/assets/css/extra.css


### Deployment
the github workflow will update the gh-pages branch.
You need to go to your github pages setting and configure it to be deployed by that branch name
