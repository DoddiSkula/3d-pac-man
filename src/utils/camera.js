import * as THREE from 'three';

export const updateCamera = (camera, player, cameraAngel, xDir, zDir) => {
  if (cameraAngel === 1) {
    camera.position.x = player.position.x;
    camera.position.y = player.position.y + 0.5;
    camera.position.z = player.position.z;
    camera.lookAt(player.position.x + xDir, 0.75, player.position.z + zDir);
  }

  if (cameraAngel === 2) {
    camera.position.x = player.position.x;
    camera.position.y = 15;
    camera.position.z = player.position.z;
    camera.lookAt(player.position);
  }

  if (cameraAngel === 3) {
    let relativeCameraOffset = new THREE.Vector3(0, 4, 3);
    let cameraOffset = relativeCameraOffset.applyMatrix4(player.matrixWorld);
    camera.position.x = cameraOffset.x;
    camera.position.y = cameraOffset.y;
    camera.position.z = cameraOffset.z;
    camera.lookAt(player.position);
  }
};
