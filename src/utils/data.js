export const level = [
  'x x x x x x x x x x x x x x x x x x x x x x x x x x x x x',
  'x . . . . . . . . . . . . . x . . . . . . . . . . . . . x',
  'x . x x x x . x x x x x x . x . x x x x x x . x x x x . x',
  'x . . . . . . . . . . . . . . . . . . . . . . . . . . . x',
  'x . x x x x . x . x x x x x x x x x x x . x . x x x x . x',
  'x 0 . . . . . x . . . . . . x . . . . . . x . . . . . 0 x',
  'x x x x x x . x x x x x x . x . x x x x x x . x x x x x x',
  'x - - - - x . x . . . . . . . . . . . . . x . x - - - - x',
  'x x x x x x . x . x x x x x x x x x x x . x . x x x x x x',
  'x . . . . . . x . . . . . . . . . . . . . x . . . . . . x',
  'x . x x x x . x x x x - x x x x x - x x x x . x x x x . x',
  'x . . . . . . . . . . - - - - - - - . . . . . . . . . 0 x',
  'x . x x x x . x . x . x - - A - - x . x . x . x x x x . x',
  'x . x - - x . x . x . x - A A A - x . x . x . x - - x . x',
  'x . x - - x . x . x . x - A A A - x . x . x . x - - x . x',
  'x . x x x x . x . x . x x x x x x x . x . x . x x x x . x',
  'x 0 . . . . . . . . . - - - - - - - . . . . . . . . . . x',
  'x . x x x x . x x x x - x x x x x - x x x x . x x x x . x',
  'x . . . . . . x . . . . . . - . . . . . . x . . . . . . x',
  'x x x x x x . x . x x x x x x x x x x x . x . x x x x x x',
  'x - - - - x . x . . . . . . . . . . . . . x . x - - - - x',
  'x x x x x x . x x x x x x . x . x x x x x x . x x x x x x',
  'x 0 . . . . . x . . . . . . x . . . . . . x . . . . . 0 x',
  'x . x x x x . x . x x x x x x x x x x x . x . x x x x . x',
  'x . . . . . . . . . . . . . . . . . . . . . . . . . . . x',
  'x . x x x x . x x x x x x . x . x x x x x x . x x x x . x',
  'x . . . . . . . . . . . . . x . . . . . . . . . . . . . x',
  'x x x x x x x x x x x x x x x x x x x x x x x x x x x x x',
];

let cells = [];
let ghosts = [];
let lives = 3;
let foodCount = 0;
let powerMode = false;
let score = 0;

export const setCells = (array) => {
  cells = array;
};

export const getCells = () => {
  return cells;
};

export const setGhosts = (array) => {
  ghosts = array;
};

export const getGhosts = () => {
  return ghosts;
};

export const setLives = (amount) => {
  lives = amount;
};

export const getLives = () => {
  return lives;
};

export const setFoodCount = (amount) => {
  foodCount = amount;
};

export const getFoodCount = () => {
  return foodCount;
};

export const setPowerMode = (bool) => {
  powerMode = bool;
};

export const getPowerMode = () => {
  return powerMode;
};

export const getScore = () => {
  return score;
};

export const setScore = (amount) => {
  score = amount;
};
