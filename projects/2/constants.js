import * as THREE from 'three';

export function ranNum(min, max) { return Math.random() * (max - min) + min; }

export const WHITE = 0xffffff;
export const GOLD = 0xDBB42C;
export const BLUE = 0x88ccff;

export const FULL = Math.PI * 2;
export const QUARTER = Math.PI / 2;

const loader = new THREE.TextureLoader();
const eye_texture = await loader.loadAsync('textures/eyeComplete.png');
export const cloud_texture = await loader.loadAsync('textures/cloud3.png');
export const eyeMaterial = new THREE.MeshBasicMaterial({
    map: eye_texture
});

export const mainEyeMaterial = new THREE.MeshToonMaterial( {
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

export const goldMaterial = new THREE.MeshStandardMaterial({
            color: WHITE,
            emissive: 0xaaaaaa,
            metalness: 0.3,
            roughness: 0.2,
            side: THREE.DoubleSide
});

export function createHalo(radius = 15, tube = 0.5, segments = 64, color = GOLD)
{
    const geometry = new THREE.TorusGeometry(radius, tube, 16, segments);
    const material = new THREE.MeshBasicMaterial({
        color: color,
        transparent: true,
        opacity: 0.5,
        side: THREE.DoubleSide,
        depthWrite: false,
        blending: THREE.AdditiveBlending
    });

    const halo = new THREE.Mesh(geometry, material);
    halo.rotation.x = QUARTER;
    halo.rotation.y = QUARTER * 2;
    halo.position.y = 12;

    return halo;
}