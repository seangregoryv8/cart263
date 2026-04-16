import * as THREE from 'three';
import { BLUE, cloud_texture, FULL, GOLD, grassMaterial, QUARTER, ranNum, WHITE } from "./constants.js";

export function makeEyes(eyeAmount, eye, radius, eyeGeometry, eyeMaterial, randomZ)
{
    for (let j = 0; j < eyeAmount; j++)
    {
        const angle = (j / eyeAmount) * FULL;
    
        const eyeWall = new THREE.Mesh(eyeGeometry, eyeMaterial);
    
        eyeWall.position.set(
            Math.cos(angle + 0.05),
            Math.sin(angle + 0.05),
            randomZ ? ranNum(-0.05, 0.05) : 0
        );
    
        // push outward onto ring surface
        eyeWall.position.normalize();
        eyeWall.position.multiplyScalar(radius);
        
        eyeWall.lookAt(eyeWall.position.clone().multiplyScalar(2));
        eyeWall.rotateY(QUARTER)
        eye.mesh.add(eyeWall);
    }
}

export function createCloudLayer(y = 20)
{
    const cloudGeometry = new THREE.BufferGeometry();
    const cloudCount = 300;
    const positions = new Float32Array(cloudCount * 3);
    for (let i = 0; i < cloudCount; i++)
    {
        positions[i * 3] = (Math.random() - 0.5) * 200;
        positions[i * 3 + 1] = Math.random() * 80 + y;
        positions[i * 3 + 2] = (Math.random() - 0.5) * 200;
    }
    cloudGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));

    const cloudMaterial = new THREE.PointsMaterial({
        size: ranNum(30, 100),
        map: cloud_texture,
        transparent: true,
        opacity: 0.7,
        depthWrite: false
    });
    const cloud = new THREE.Points(cloudGeometry, cloudMaterial);
    cloud.scale.set(1, 2, 1);
    return cloud;
}

export function bobEyeball(eye, eyes, t)
{
    const amplitude = 0.5;
    const speed = 1.7;
    const newY = eye.originalY + Math.sin(t * speed) * amplitude;
    eye.position.y = newY * 3;
    for (let i = 0; i < eyes.length; i++) eyes[i].mesh.position.y = newY;
}

export function createTree(x, y, z, scale = 1)
{
    const trunk = new THREE.Mesh(
        new THREE.CylinderGeometry(0.1 * scale, 0.1 * scale, 1 * scale),
        new THREE.MeshStandardMaterial({ color: 0x654321 })
    );
    trunk.position.set(x, y + 0.5 * scale, z);
    trunk.castShadow = true;
    trunk.receiveShadow = true;

    const leaves = new THREE.Mesh(
        new THREE.ConeGeometry(0.5 * scale, 2 * scale, 8),
        new THREE.MeshStandardMaterial({ color: 0x228822 })
    );
    leaves.position.set(x, y + 1.5 * scale, z);
    leaves.castShadow = true;
    leaves.receiveShadow = false;

    return [trunk, leaves];
}

export function createFloor(y)
{
    const geometry = new THREE.PlaneGeometry(1000, 1000);
    const floor = new THREE.Mesh(geometry, grassMaterial);
    floor.rotation.x = -Math.PI / 2;
    floor.position.y = y;
    floor.receiveShadow = true;
    return floor;
}

export function createSky()
{
    const skyGeo = new THREE.SphereGeometry(500, 32, 32);
    const skyMat = new THREE.MeshBasicMaterial({ color: 0x87ceeb, side: THREE.BackSide });
    return new THREE.Mesh(skyGeo, skyMat);
}

export function createLights(halo)
{
    const ambientLight = new THREE.AmbientLight(WHITE, 0.2); // soft but visible

    // Main point light on the eyeball
    const eyeLight = new THREE.SpotLight(BLUE, 500, 20, Math.PI * 0.25, 0.5);
    eyeLight.position.set(0, 7, 0);
    eyeLight.target.position.set(0, 0, 0);
    eyeLight.castShadow = true;

    // Optional subtle directional light for shadow definition
    const dirLight = new THREE.DirectionalLight(GOLD, 0.4);
    dirLight.position.set(0, 50, 0);
    dirLight.castShadow = true;

    const haloLight = new THREE.PointLight(GOLD, 3000, 11, QUARTER);
    haloLight.position.copy(halo.position);

    const upLight = new THREE.SpotLight(BLUE, 500, 20, Math.PI * 0.25, 0.5);
    upLight.position.set(0, -7, 0);
    upLight.target.position.set(0, 10, 0);
    upLight.castShadow = true;

    return [
        ambientLight, 
        eyeLight,
        dirLight, 
        haloLight,
        upLight
    ]
}