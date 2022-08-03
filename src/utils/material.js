import * as THREE from 'three';

export const createSkyboxMaterial = () => {
  const skyboxImagepaths = [1, 3, 5, 6, 2, 4].map(
    (side) => './assets/skybox/' + side.toString() + '.png'
  );
  const materialArray = skyboxImagepaths.map((image) => {
    let texture = new THREE.TextureLoader().load(image);
    return new THREE.MeshBasicMaterial({ map: texture, side: THREE.BackSide });
  });
  return materialArray;
};

export const createSolidColorMaterial = (solidColor) => {
  return new THREE.MeshPhongMaterial( { color: solidColor } );
}