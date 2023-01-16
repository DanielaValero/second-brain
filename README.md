# learn in public

Hello,

This is a place where I put things that I am currently learning professionally.

### Deploying this
I am building it with mkdocs (a python static stite generator), and using mkdocs-material theme.


### Installation
#### Pre requisites
* Intall Python 3: `brew install python3`
-- note: if pip is not linked, do: `brew unlink python && brew link python`
* Install pip: `python3 -m ensurepip --upgrade`
* Add python3 to your PATH: `echo PATH=/opt/homebrew/bin/python3/:$PATH`

Installation:
```
$ pip install -r requirements.txt
```
If you get a message that the default write folder (to install dependencies) is not writable, then use the follwing command:

```
python3 -m pip install -r requirements.txt 
```

Other problems? [Checkout the troubleshooting page](https://jimandreas.github.io/mkdocs-material/troubleshooting/)

### Running docs locally
```
mkdocs serve
```

### Edit custom CSS
-> docs/assets/css/extra.css


### Deployment
the github workflow will update the gh-pages branch.
You need to go to your github pages setting and configure it to be deployed by that branch name


## Things I want to add
[] Slugigy the URLs
[] Make the tags be a link
[] Config obsidian markdown stuff to render here too... Example: https://www.sukany.cz/blog/2022/03/documentation-publishing-with-obsidian-and-github-pages-using-mkdocs/
