import * as THREE from 'three';
import { getCells, setGhosts } from './data';
import { wallCollision } from './collision';
import { getRandomInt } from './helpers';

export const playerControls = (player, controls) => {
  const cells = getCells();
  const playerSpeed = 0.1;
  const playerRadius = 0.4;

  // w
  if (controls[87] || controls[38]) {
    const newPosition = new THREE.Vector3(
      Math.round(player.position.x),
      player.position.y,
      Math.round(player.position.z + playerSpeed - playerRadius)
    );
    if (wallCollision(newPosition, cells)) return;

    player.position.z -= playerSpeed;
  }

  // s
  if (controls[83] || controls[40]) {
    const newPosition = new THREE.Vector3(
      Math.round(player.position.x),
      player.position.y,
      Math.round(player.position.z + playerSpeed + playerRadius)
    );
    if (wallCollision(newPosition, cells)) return;
    player.position.z += playerSpeed;
  }

  // a
  if (controls[65] || controls[37]) {
    const newPosition = new THREE.Vector3(
      Math.round(player.position.x - playerSpeed - playerRadius),
      player.position.y,
      Math.round(player.position.z)
    );
    if (wallCollision(newPosition, cells)) return;
    player.position.x -= playerSpeed;
  }

  // d
  if (controls[68] || controls[39]) {
    const newPosition = new THREE.Vector3(
      Math.round(player.position.x + playerSpeed + playerRadius),
      player.position.y,
      Math.round(player.position.z)
    );
    if (wallCollision(newPosition, cells)) return;
    player.position.x += playerSpeed;
  }
};

export const firstPersonPlayerControls = (player, controls, xDir, zDir) => {
  const cells = getCells();
  const playerSpeed = 0.1;

  // w
  if (controls[87] || controls[38]) {
    const newPosition = new THREE.Vector3(
      Math.round(player.position.x + playerSpeed * xDir),
      player.position.y,
      Math.round(player.position.z + playerSpeed * zDir)
    );
    if (wallCollision(newPosition, cells)) return;

    player.position.x += playerSpeed * xDir;
    player.position.z += playerSpeed * zDir;
  }
};

export const updateGhosts = (cells, ghosts) => {
  const ghostSpeed = 0.07;
  const ghostRadius = 0.4;

  ghosts.map((ghost) => {
    if (ghost.direction === 0) {
      const newPosition = new THREE.Vector3(
        Math.round(ghost.object.position.x),
        ghost.object.position.y,
        Math.round(ghost.object.position.z + ghostSpeed - ghostRadius)
      );
      if (wallCollision(newPosition, cells)) {
        ghost.direction = getRandomInt(0, 4);
        return;
      }

      ghost.object.position.z -= ghostSpeed;
    }

    if (ghost.direction === 1) {
      const newPosition = new THREE.Vector3(
        Math.round(ghost.object.position.x),
        ghost.object.position.y,
        Math.round(ghost.object.position.z + ghostSpeed + ghostRadius)
      );
      if (wallCollision(newPosition, cells)) {
        ghost.direction = getRandomInt(0, 4);
        return;
      }
      ghost.object.position.z += ghostSpeed;
    }

    if (ghost.direction === 2) {
      const newPosition = new THREE.Vector3(
        Math.round(ghost.object.position.x - ghostSpeed - ghostRadius),
        ghost.object.position.y,
        Math.round(ghost.object.position.z)
      );
      if (wallCollision(newPosition, cells)) {
        ghost.direction = getRandomInt(0, 4);
        return;
      }
      ghost.object.position.x -= ghostSpeed;
    }

    if (ghost.direction === 3) {
      const newPosition = new THREE.Vector3(
        Math.round(ghost.object.position.x + ghostSpeed + ghostRadius),
        ghost.object.position.y,
        Math.round(ghost.object.position.z)
      );
      if (wallCollision(newPosition, cells)) {
        ghost.direction = getRandomInt(0, 4);
        return;
      }
      ghost.object.position.x += ghostSpeed;
    }
  });
};
