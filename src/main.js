import * as THREE from 'three';
import * as colors from './utils/colors.js';

import {
  playerControls,
  firstPersonPlayerControls,
  updateGhosts,
} from './utils/controller';
import {
  createGround,
  createLevel,
  createPlayer,
  createSkyBox,
  drawLives,
} from './utils/geometry.js';
import {
  foodCollision,
  ghostCollision,
  powerUpCollision,
} from './utils/collision.js';
import {
  getCells,
  getFoodCount,
  getGhosts,
  getLives,
  setLives,
} from './utils/data.js';
import { updateCamera } from './utils/camera';

const musicAudio = document.querySelector('#music');
const munchAudio = document.querySelector('#munch');
const powerUpAudio = document.querySelector('#powerup');
const deathAudio = document.querySelector('#death');
const eatGhostAudio = document.querySelector('#eat');

const startScreen = document.querySelector('#start-ui');
const pauseScreen = document.querySelector('#pause-ui');
const gameOverScreen = document.querySelector('#game-over-ui');
const victoryScreen = document.querySelector('#victory-ui');

const livesElement = document.querySelector('.lives');
const scoreCard = document.querySelector('#score');

const MAP_SIZE = 28;

let scene, camera, renderer, player;
let controller = {};

let userAngle = 180.0;
let userXDir = 0.0;
let userZDir = 0.0;
let origX = 0;

let cameraAngel = 3;
let gameRunning = false;
let muteAudio = false;

document.querySelector('#start').addEventListener('click', () => {
  gameRunning = true;
  startScreen.classList.add('hide');
  document.body.classList.add('hide-cursor');
});

document.querySelector('#resume').addEventListener('click', () => {
  gameRunning = true;
  pauseScreen.classList.add('hide');
  document.body.classList.add('hide-cursor');
});

document.addEventListener('keydown', ({ keyCode }) => {
  if (!muteAudio) musicAudio.play();
  Object.keys(controller).map((key) => {
    controller[key] = false;
  });
  if ([87, 83, 65, 68, 38, 40, 37, 39].includes(keyCode))
    controller[keyCode] = true;

  if (keyCode === 49) cameraAngel = 1;
  if (keyCode === 50) cameraAngel = 2;
  if (keyCode === 51) cameraAngel = 3;

  // mute [m]
  if (keyCode === 77) {
    muteAudio = !muteAudio;
    musicAudio.muted = muteAudio;
  }

  if (keyCode === 27 || keyCode === 80) {
    gameRunning = false;
    pauseScreen.classList.remove('hide');
    document.body.classList.remove('hide-cursor');
    camera.position.set(14.5, 22, 14);
    camera.lookAt(14.5, 0, 14);
  }
});

document.addEventListener('mousemove', (e) => {
  userAngle += origX - e.clientX;
  userAngle %= 360.0;
  userXDir = Math.sin(userAngle * (Math.PI / 180));
  userZDir = Math.cos(userAngle * (Math.PI / 180));
  origX = e.clientX;
});

const init = () => {
  // renderer
  renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setSize(window.innerWidth - 1, window.innerHeight - 1);
  renderer.domElement.id = 'canvas';
  renderer.shadowMap.enabled = true;
  document.body.appendChild(renderer.domElement);

  // scene
  scene = new THREE.Scene();

  // camera
  camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
  );
  camera.position.set(14.5, 22, 14);
  camera.lookAt(14.5, 0, 14);
  scene.add(camera);

  // set lives
  drawLives(3, livesElement);

  // create geometry
  createSkyBox(scene, MAP_SIZE);
  createGround(scene, MAP_SIZE);
  createLevel(scene);

  // player
  player = createPlayer(scene);

  // light
  const light = new THREE.PointLight(colors.white, 1.0);
  light.castShadow = true;
  light.position.set(MAP_SIZE / 2, 20, MAP_SIZE / 2);
  scene.add(light);

  // ambient light
  let light2 = new THREE.AmbientLight(colors.white, 0.5);
  light2.position.set(0, 0, 0);
  scene.add(light2);

  animate();
};

const animate = () => {
  requestAnimationFrame(animate);

  if (gameRunning) {
    const cells = getCells();
    const ghosts = getGhosts();

    if (cameraAngel === 1) {
      firstPersonPlayerControls(player, controller, userXDir, userZDir);
    } else {
      playerControls(player, controller);
    }

    updateCamera(camera, player, cameraAngel, userXDir, userZDir);
    foodCollision(player, cells, scene, munchAudio, scoreCard);
    powerUpCollision(player, cells, scene, powerUpAudio, ghosts);
    updateGhosts(cells, ghosts);
    ghostCollision(
      player,
      ghosts,
      livesElement,
      deathAudio,
      eatGhostAudio,
      scoreCard
    );
  }

  if (getLives() <= 0) {
    gameRunning = false;
    camera.position.set(14.5, 22, 14);
    camera.lookAt(14.5, 0, 14);
    gameOverScreen.classList.remove('hide');
    document.body.classList.remove('hide-cursor');
    setLives(3);
  }

  if (getFoodCount() <= 0) {
    gameRunning = false;
    camera.position.set(14.5, 22, 14);
    camera.lookAt(14.5, 0, 14);
    victoryScreen.classList.remove('hide');
    document.body.classList.remove('hide-cursor');
  }

  renderer.render(scene, camera);
};

window.onload = () => {
  init();
};
