import * as THREE from 'three';
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import { EyeRings } from "./EyeRings.js";
import { ranNum, QUARTER, eyeMaterial, mainEyeMaterial, goldMaterial, createHalo } from "./constants.js";
import { bobEyeball, createCloudLayer, createFloor, createLights, createSky, createTree, makeEyes } from './functions.js';

const RING_COUNT = 4;
const RING_BASE_RADIUS = 7;
const FLOOR_Y = -15;

const scene = new THREE.Scene();

scene.add(createFloor(FLOOR_Y));
scene.add(createSky());
const mouse = new THREE.Vector2();
window.addEventListener("mousemove", event => {
    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
});

const halo = createHalo(12, 0.5, 100);
scene.add(halo);

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.set(10, 10, 20);

const canvas = document.querySelector("#bg");

const renderer = new THREE.WebGLRenderer({ canvas: canvas })
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);

scene.fog = new THREE.Fog(0x6699bb, 30, 120);
scene.fog.density = 0.4;

scene.add(createCloudLayer(20));
const controls = new OrbitControls(camera, canvas);

const eyes = [];
for (let i = 0; i < RING_COUNT; i++)
{
    const radius = RING_BASE_RADIUS + (i * 1.5)
    const points = [];

    const t = 0.3 + (i / 10);
    points.push(new THREE.Vector2(radius - t * 0.4, -t * 2));
    points.push(new THREE.Vector2(radius - t * 0.4,  t * 2));
    points.push(new THREE.Vector2(radius + t * 0.4,  t * 2));
    points.push(new THREE.Vector2(radius + t * 0.4, -t * 2));
    
    const geometry = new THREE.LatheGeometry(points, 256);
    geometry.rotateX(QUARTER)
    geometry.computeVertexNormals();
    
    eyes.push(new EyeRings(new THREE.Mesh(
        geometry,
        goldMaterial
    )));

    makeEyes(40, eyes[i], radius, new THREE.SphereGeometry(0.5 + (i / 10), 25, 25), eyeMaterial, false)
    makeEyes(100, eyes[i], radius, new THREE.SphereGeometry(0.3 + (i / 10), 25, 25), eyeMaterial, true)
}

eyes[0].mesh.rotateY(QUARTER / 2)
eyes[0].mesh.rotateZ(QUARTER / 2)
eyes[1].mesh.rotateY(QUARTER)
eyes[2].mesh.rotateX(QUARTER)
eyes[2].mesh.rotateY(-QUARTER / 2)
eyes[3].mesh.rotateX(QUARTER / 8)
eyes[0].mesh.scale.x = 0.7;

for (let i = 0; i <= 3; i++) scene.add(eyes[i].mesh);

const eyeball = new THREE.Mesh(
    new THREE.SphereGeometry(3.5, 100, 100),
    mainEyeMaterial
);
eyeball.transparent = true;
eyeball.castShadow = true;

const eyeballState = {
    newRotation: 
    {
        x: 0,
        y: 0,
        z: 0
    },
    locked: false,
    minInterval: 3000, // ms between gaze shifts
    maxInterval: 10000
};

const humanCamera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
humanCamera.position.set(-FLOOR_Y, FLOOR_Y, 0);

let usingHumanCamera = false;

window.addEventListener('keydown', e => {
    if (e.key.toLowerCase() === 'e')
    {
        controls.enabled = usingHumanCamera;
        usingHumanCamera = !usingHumanCamera;
        if (usingHumanCamera)
            humanCamera.lookAt(eyeball.position);
        eyeballState.locked = usingHumanCamera;
    }
});

setEyeTurn();

eyeball.overdraw = true;
eyeball.castShadow = true;
eyeball.originalY = eyeball.position.y;
scene.add(eyeball);

let allLights = createLights(halo);
for (let i = 0; i < allLights.length; i++) scene.add(allLights[i])

for (let i = 0; i < 1000; i++)
{
    let [trunk, leaves] = createTree(ranNum(-200, 200), FLOOR_Y, ranNum(-200, 200), ranNum(0.5, 1.5));
    scene.add(trunk, leaves);
}

function animate()
{
    controls.update();
    requestAnimationFrame(animate);

    const raycaster = new THREE.Raycaster();
    const mouseVec = new THREE.Vector2();
    const target = new THREE.Vector3();

    mouseVec.set(mouse.x, mouse.y);
    raycaster.setFromCamera(mouseVec, camera);
    raycaster.ray.at(20, target);
    
    const time = performance.now() * 0.001;

    turnEyeball(eyeball);
    bobEyeball(eyeball, eyes, time);

    for (let i = 0; i < eyes.length; i++)
    {
        eyes[i].changeSpeed();
        eyes[i].mesh.material.emissiveIntensity = 0.5 + Math.sin(time * 2) * 0.5;
        eyes[i].mesh.material.emissive.setHex(0xC9980B)
    }

    eyes[0].mesh.rotation.z += eyes[0].increase
    eyes[1].mesh.rotation.z += eyes[1].increase
    eyes[2].mesh.rotation.x += eyes[2].increase
    eyes[2].mesh.rotation.y += eyes[2].increase
    eyes[3].mesh.rotation.z += eyes[3].increase

    halo.material.opacity = 0.4 + Math.sin(time * 2) * 0.2;
    if(usingHumanCamera)
    {
        humanCamera.position.x += Math.sin(time * 0.5) * 0.002;
        humanCamera.position.z += Math.cos(time * 0.5) * 0.002;
    }

    renderer.render(scene, usingHumanCamera ? humanCamera : camera);
}
animate();

function turnEyeball(eye)
{
    const target = usingHumanCamera ? humanCamera.position : eyeballState.newRotation;

    const vecToTarget = new THREE.Vector3().subVectors(target, eye.position).normalize();
    const targetRot = new THREE.Euler().setFromVector3(vecToTarget);
    eye.rotation.x += (targetRot.x - eye.rotation.x + (QUARTER / 2)) * 0.05;
    eye.rotation.y += (targetRot.y - eye.rotation.y) * 0.05;
    eye.rotation.z += (targetRot.z - eye.rotation.z) * 0.05;
}

function setEyeTurn()
{
    setTimeout(() => {
        eyeballState.newRotation.x = ranNum(-QUARTER, QUARTER);
        eyeballState.newRotation.y = ranNum(-QUARTER, QUARTER);
        eyeballState.newRotation.z = ranNum(-QUARTER, QUARTER);
        eyeballState.locked = true;
        console.log("New eye rotation:", eyeballState.newRotation);
        setEyeTurn();
    }, ranNum(eyeballState.minInterval, eyeballState.maxInterval));
}