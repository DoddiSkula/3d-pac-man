import * as THREE from 'three';
import * as colors from './colors.js';

import { createSolidColorMaterial, createSkyboxMaterial } from './material';
import { setCells, setFoodCount, setGhosts } from './data';
import { level } from './data';

export const createSkyBox = (scene, mapSize) => {
  const skyboxGeometry = new THREE.BoxGeometry(50, 50, 50);
  const skyBoxMaterial = createSkyboxMaterial();
  const skybox = new THREE.Mesh(skyboxGeometry, skyBoxMaterial);
  skybox.position.set(mapSize / 2, 0, mapSize / 2);
  scene.add(skybox);
};

export const createGround = (scene, mapSize) => {
  const groundGeometry = new THREE.PlaneGeometry(mapSize + 1, mapSize);
  const groundMaterial = createSolidColorMaterial(colors.black);
  const ground = new THREE.Mesh(groundGeometry, groundMaterial);
  ground.rotateX(-Math.PI / 2);
  ground.position.set((mapSize + 1) / 2 - 0.5, 0, mapSize / 2 - 0.5);
  ground.receiveShadow = true;
  scene.add(ground);
};

export const createWall = (scene, position, wallHeight) => {
  const wallGeometry = new THREE.BoxGeometry(1, wallHeight, 1);
  const wallMaterial = createSolidColorMaterial(colors.blue);
  const wall = new THREE.Mesh(wallGeometry, wallMaterial);
  wall.position.set(position.x, position.y + wallHeight / 2, position.z);

  var geo = new THREE.EdgesGeometry(wallGeometry);
  var mat = new THREE.LineBasicMaterial({
    color: colors.black,
    linewidth: 2,
  });
  var wireframe = new THREE.LineSegments(geo, mat);
  wireframe.renderOrder = 1;
  wall.add(wireframe);

  scene.add(wall);
};

export const createFood = (scene, position) => {
  const foodSize = 0.1;
  const foodGeometry = new THREE.DodecahedronGeometry(foodSize, 0);
  const foodMaterial = createSolidColorMaterial(colors.orange);
  const food = new THREE.Mesh(foodGeometry, foodMaterial);
  food.position.set(position.x, position.y + 0.5, position.z);
  scene.add(food);
  return food;
};

export const createPowerUp = (scene, position) => {
  const powerUpGeometry = new THREE.DodecahedronGeometry(0.25, 0);
  const powerUpMaterial = createSolidColorMaterial(colors.orange);
  const powerUp = new THREE.Mesh(powerUpGeometry, powerUpMaterial);
  powerUp.position.set(position.x, position.y + 0.5, position.z);
  scene.add(powerUp);
  return powerUp;
};

export const createPlayer = (scene) => {
  const playerGeometry = new THREE.SphereGeometry(0.3, 50, 50);
  const playerMaterial = createSolidColorMaterial(colors.yellow);
  const player = new THREE.Mesh(playerGeometry, playerMaterial);
  player.position.set(14, 0.5, 18);
  scene.add(player);
  return player;
};

export const createGhost = (scene, position, color) => {
  const ghostGeometry = new THREE.CapsuleGeometry(0.45, 1.2, 24, 8);
  const ghostMaterial = createSolidColorMaterial(color);
  const ghost = new THREE.Mesh(ghostGeometry, ghostMaterial);
  ghost.position.set(position.x, position.y, position.z);
  scene.add(ghost);
  return ghost;
};

export const createLevel = (scene) => {
  const cells = [];
  const ghosts = [];
  let foodCounter = 0;

  const ghostColors = [
    colors.lightBlue,
    colors.pink,
    colors.red,
    colors.orange,
    colors.grey,
    colors.green,
    colors.purple,
  ];
  let ghostIndex = 0;

  level.map((row, z) => {
    const newRow = [];
    row.split(' ').map((cell, x) => {
      const newCell = { x, z };
      if (cell === 'x') {
        createWall(scene, new THREE.Vector3(x, 0, z), 0.75);
        newCell.content = 'wall';
      } else if (cell === '.') {
        const food = createFood(scene, new THREE.Vector3(x, 0, z));
        newCell.content = 'food';
        newCell.object = food;
        foodCounter += 1;
      } else if (cell === '0') {
        const powerUp = createPowerUp(scene, new THREE.Vector3(x, 0, z));
        newCell.content = 'powerUp';
        newCell.object = powerUp;
      } else if (cell === 'A') {
        const ghost = createGhost(
          scene,
          new THREE.Vector3(x, 0, z),
          ghostColors[ghostIndex]
        );
        newCell.content = 'ghost';
        newCell.object = ghost;
        newCell.direction = 0;
        newCell.color = ghostColors[ghostIndex];
        ghostIndex++;
        ghosts.push(newCell);
      } else {
        newCell.content = 'empty';
      }
      newRow.push(newCell);
    });

    cells.push(newRow);
  });

  setCells(cells);
  setGhosts(ghosts);
  setFoodCount(foodCounter);
};

function removeAllChildNodes(parent) {
  while (parent.firstChild) {
    parent.removeChild(parent.firstChild);
  }
}

export const drawLives = (amount, element) => {
  removeAllChildNodes(element);
  for (let i = 0; i < amount; i++) {
    const live = document.createElement('img');
    live.src = './assets/heart.png';
    live.classList.add('life');
    element.appendChild(live);
  }
};
