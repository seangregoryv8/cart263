import * as THREE from 'three';

export function ranNum(min, max) { return Math.random() * (max - min) + min; }

export const FULL = Math.PI * 2;
export const QUARTER = Math.PI / 2;

const loader = new THREE.TextureLoader();
const eye_texture = await loader.loadAsync('textures/eyeComplete.png');
export const cloud_texture = await loader.loadAsync('textures/cloud3.png');
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

function createTextTexture(text, fontSize = 64) {
    const canvas = document.createElement("canvas");
    canvas.width = 1024;
    canvas.height = 128;
    const ctx = canvas.getContext("2d");

    ctx.fillStyle = "white";
    ctx.font = `${fontSize}px sans-serif`;
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText(text, canvas.width / 2, canvas.height / 2);

    const texture = new THREE.CanvasTexture(canvas);
    texture.needsUpdate = true;

    //texture.wrapS = THREE.RepeatWrapping;
    //texture.wrapT = THREE.RepeatWrapping;
    //texture.repeat.set(30, 1); // repeat around ring
    return texture;
}

const textTexture = createTextTexture("HELLO WORLD") // createTextTexture("𐑧𐑮𐑯");
export const textMaterial = new THREE.MeshBasicMaterial({
    map: textTexture,
    transparent: true,
    side: THREE.DoubleSide,
    depthWrite: false,
});

export const ringMaterial = new THREE.MeshStandardMaterial({
    map: textTexture,
    transparent: true,
    side: THREE.DoubleSide,
});

export const goldMaterial = new THREE.MeshStandardMaterial({
            color: 0xffffff,
            emissive: 0xaaaaaa,
            metalness: 0.3,
            roughness: 0.2,
            side: THREE.DoubleSide
});

export function createHalo(radius = 15, tube = 0.5, segments = 64, color = 0x88ccff)
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