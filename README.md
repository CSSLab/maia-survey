# Maia Survey

A collection of deployed surveys/tasks, puzzles and tools relating to [Maia](https://github.com/CSSLab/maia-chess).

## Get Started

This project currently uses `node-sass: 5.0.0` which is only compatiable with node versions within `[14, 15)`, to manage multiple versions of node, I recommend [nvm](https://github.com/nvm-sh/nvm) or [n](https://www.npmjs.com/package/n). Dependencies are managed with [yarn](https://github.com/yarnpkg/yarn/blob/master/README.md).

## Development

### Styles

Most of the styles in this project are written with global scss, and can be found under `src/styles`. 


A lot of base styles can be found under `src/styles/foundation`such as colour variables and layout code. More specialized scss can be found in files such as  `src/styles/chess.scss`. 

Scss has a number of benefits over css, such as variables, imports, extending other style classes and such. The syntax is very simple and you can learn more about it [here](https://sass-lang.com/documentation/syntax). 

### Surveys & Tools

Each survey is a route made up of components, and I've tried reall hard to keep the UI code clean and separate from the logic through the use of custom hooks. 

For example, the `useBoardController` hook maintains state about the board's present state such as the current selected ply, orientation and such. It also returns various functions to manipulate the current state. 

Each survey contains a main hook, such as the `useTuringHook`, that is made up of many common hooks such as `useBoardController`, `useGamesHook` (helps retain history) and the `useEventNumber`. These hooks combine to provide the full logic required to power the survey. 

Notable components include: 
 1. MovseContainer (Renders the 2 column move list)
 2. BoardController (Renders the arrows used to paginate moves and flip orientation)
 3. Chessground (Renders the chessboard)
 4. PlyPlot (Renders plot for the puzzle & maia analysis)

### API

Users are given an account and authenticated on visit, each of the authentication api calls returns a JWT that is then stored in the server with an expiration date. All authenticated api calls should take the form:

```ts
const res = await fetch(buildUrl(`turing/game`), {
    headers: await getDefaultHeaders(),
});
```

`getDefaultHeaders` returns an object with the auth token set, and `buildUrl` will return the full api and pull the base url from the environment variables.



