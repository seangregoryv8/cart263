import * as THREE from 'three';

export function ranNum(min, max) { return Math.random() * (max - min) + min; }

export const FULL = Math.PI * 2;
export const QUARTER = Math.PI / 2;

const loader = new THREE.TextureLoader();
const eye_texture = await loader.loadAsync('textures/eyeComplete.png');
export const eyeMaterial = new THREE.MeshPhongMaterial({
    map: eye_texture,
    transparent: true
});

export const mainEyeMaterial = new THREE.MeshStandardMaterial( {
    map: eye_texture,
    transparent: true,
    metalness: 0.2,
    roughness: 0.3
})

const grass_texture = await loader.loadAsync('textures/grass.jpg');
grass_texture.wrapS = THREE.RepeatWrapping;
grass_texture.wrapT = THREE.RepeatWrapping;
grass_texture.repeat.set(200, 200);
export const grassMaterial = new THREE.MeshStandardMaterial({
    map: grass_texture,
    roughness: 0.8,
});