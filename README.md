# Fraction Calculator

This is a simple fraction calculator

**Features:**
- Dynamical calculation of result - no need to press button
- Customizable number of fractions. 
- Brackets support.
- Multibrackets support.
- Nice UI
- Test coverage: ~80%

## Dependencies

**Fractional** - lightweight library for fraction mathematical operations (e.g. `add`, `subtract`, `divide` and `multiply`) | [Link](https://github.com/ekg/fraction.js/)

**Vue-router** - popular Vue library to manage app routes

## Test

**Karma + Mocha + Chai (should)**

## Styles

Styles is written on `SCSS`. It seems more convenient for me to use it even in small projects

## Code style

I prefer OOP style and ES6 syntax. So I used babel in this project.

## Structure

There are few special folders in `src`.  
`classes` folder contains all classes, primary logic placed here.  
`pages` folder contains components that used as routes.  
`styles` folder contains all extra styles and theme variables

## Dependency management

I like `yarn`, because it's fast and create a `.lock` file.

## Other tools

**ESLint** helps me to check errors on the fly

## Development environment

I have two favorite editors - VSCode and Atom. This project i made in VSCode.

PS. Webpack dev config host is  `0.0.0.0` and port `5001`. It was needed because code is stored on Virtual Mashine with Ubuntu OS.

# WebSocket 

I realised the second part of the task. My WebSocket interface provides all required functional. All WebSocket logic is placed in the `src/classes/WebSocket` folder. I didn't use any dependencies for it, so it's simple enough.

## Code splitting result

!(Code Splitting Result Screenshot)[splitting_result.JPG]
