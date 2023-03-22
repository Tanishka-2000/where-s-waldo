# Where's Waldo
A puzzle game for children.

## Table of Contents
+ [General Info](#general-info)
+ [Technologies](#technologies)
+ [Setup](#setup)
+ [How to Use](#how-to-use)
+ [Demo](#demo)
+ [Features](#features)

## General info
This project is a photo tagging app where the user is provided with a large photograph which contains several elements and the user is meant to find certain characters, e.g. Waldo, The Wizard, Wilma etc. The user will make selections for each character and they will get feedback on whether they are correct or not. Also this app keep track of how long it takes between when the photo is first loaded and when the user finally identifies all characters to set records which can be found on high scores section.

## Technologies
+ Javacscript
+ Firebase
+ Webpack

## Setup
To run this project locally,
```
# clone this repository
git clone https://github.com/Tanishka-2000/where-s-waldo.git

# go into the repository
cd where-s-waldo

# install dependencies
npm install
```

## How to Use
+ To start the app, open it's index.html file (./dist/index.html) with any browser.
+ If you edit this project's index.js file then you need to bundle it using webpack.
To bundle index.js file after making changes to it,
```
# install webpack
npm install webpack webpack-cli

# bundle index.js
npx webpack

```
This will change bundle.js file in ./dist/bundle.js to reflect the change you just made.

## Demo
Here is the live working demo [https://tanishka-2000.github.io/where-s-waldo/](https://tanishka-2000.github.io/where-s-waldo/)

## Features
+ The app let you choose from 6 differnt boards.
+ Navbar shows the current board and the current status of game i.e found characters in green and hidden characters in red.
+ User can see and compare with others scores.
+ Anytime you can navigate to index page using navbar and change game board.