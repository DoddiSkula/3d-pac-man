import * as THREE from 'three';
import {
  getFoodCount,
  getLives,
  getPowerMode,
  getScore,
  setCells,
  setFoodCount,
  setLives,
  setPowerMode,
  setScore,
} from './data';
import { drawLives } from './geometry';
import * as colors from './colors.js';

export const wallCollision = (position, cells) => {
  return cells[position.z][position.x].content === 'wall';
};

export const foodCollision = (player, cells, scene, audio, scoreCard) => {
  const playerPosition = new THREE.Vector3(
    Math.round(player.position.x),
    player.position.y,
    Math.round(player.position.z)
  );
  if (cells[playerPosition.z][playerPosition.x].content === 'food') {
    audio.play();

    const food = cells[playerPosition.z][playerPosition.x].object;
    scene.remove(food);

    cells[playerPosition.z][playerPosition.x].content = 'empty';
    setCells(cells);

    const foodCnt = getFoodCount();
    setFoodCount(foodCnt - 1);

    const score = getScore();
    setScore(score + 10);
    scoreCard.innerHTML = score + 10;
  }
};

export const powerUpCollision = (player, cells, scene, audio, ghosts) => {
  const playerPosition = new THREE.Vector3(
    Math.round(player.position.x),
    player.position.y,
    Math.round(player.position.z)
  );

  if (cells[playerPosition.z][playerPosition.x].content === 'powerUp') {
    audio.play();

    const powerUp = cells[playerPosition.z][playerPosition.x].object;
    scene.remove(powerUp);

    cells[playerPosition.z][playerPosition.x].content = 'empty';
    setCells(cells);

    ghosts.map((ghost) => {
      ghost.object.material.color.set(colors.ghostBlue);
    });

    setPowerMode(true);

    setTimeout(() => {
      ghosts.map((ghost) => {
        ghost.object.material.color.set(ghost.color);
        setPowerMode(false);
      });
    }, 10000);
  }
};

export const ghostCollision = (
  player,
  ghosts,
  element,
  deathAudio,
  eatGhostAudio,
  scoreCard
) => {
  const playerPosition = new THREE.Vector3(
    Math.round(player.position.x),
    player.position.y,
    Math.round(player.position.z)
  );

  ghosts.map((ghost) => {
    if (
      playerPosition.x === Math.round(ghost.object.position.x) &&
      playerPosition.z === Math.round(ghost.object.position.z)
    ) {
      if (getPowerMode()) {
        eatGhostAudio.play();
        ghost.object.position.set(14, 0, 14);
        const score = getScore();
        setScore(score + 200);
        scoreCard.innerHTML = score + 200;
        return;
      }
      deathAudio.play();
      player.position.set(14, 0.5, 18);
      setLives(getLives() - 1);
      drawLives(getLives(), element);
    }
  });
};
