import * as THREE from 'three';
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import { EyeRings } from "./EyeRings.js";
import { ranNum, cloud_texture, QUARTER, FULL, eyeMaterial, mainEyeMaterial, grassMaterial, ringMaterial, goldMaterial, textMaterial, createHalo } from "./constants.js";


const RING_COUNT = 4;
const RING_BASE_RADIUS = 7;
const FLOOR_Y = -15;

const scene = new THREE.Scene();

createFloor();
createSky();

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.set(10, 10, 20);
const canvas = document.querySelector("#bg");
const renderer = new THREE.WebGLRenderer({ canvas: canvas })
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;

scene.fog = new THREE.Fog(0x6699bb, 30, 120);
scene.fog.density = 0.4;

const controls = new OrbitControls(camera, canvas);

renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);

const eyes = [];
for (let i = 0; i < RING_COUNT; i++)
{
    const radius = RING_BASE_RADIUS + (i * 1.5)
    const points = [];

    const r = radius;
    const t = 0.3 + (i / 10);
    points.push(new THREE.Vector2(r - t * 0.4, -t * 2));
    points.push(new THREE.Vector2(r - t * 0.4,  t * 2));
    points.push(new THREE.Vector2(r + t * 0.4,  t * 2));
    points.push(new THREE.Vector2(r + t * 0.4, -t * 2));
    
    const geometry = new THREE.LatheGeometry(points, 256);
    geometry.rotateX(QUARTER)
    geometry.computeVertexNormals();
    
    eyes.push(new EyeRings(new THREE.Mesh(
        geometry,
        goldMaterial
    )));
    
    // addTextToRing(eyes[i].mesh, "𐑧𐑮𐑯", radius, 0.5 + (i * 1.7), 1.2);
    const textMesh = new THREE.Mesh(new THREE.PlaneGeometry(10, 2), textMaterial);
    textMesh.position.set(0, RING_BASE_RADIUS + (i * 1.7), 0);
    textMesh.rotation.x = QUARTER * 3;
    // eyes[i].mesh.add(textMesh);
    makeEyes(40, eyes[i], radius, new THREE.SphereGeometry(0.5 + (i / 10), 25, 25), eyeMaterial, false)
    makeEyes(100, eyes[i], radius, new THREE.SphereGeometry(0.3 + (i / 10), 25, 25), eyeMaterial, true)
}

function createCloudLayer(y = 20)
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

let cloud = createCloudLayer(20);
scene.add(cloud);

function makeEyes(eyeAmount, eye, radius, eyeGeometry, eyeMaterial, randomZ)
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

setEyeTurn();

eyeball.overdraw = true;
// eyeball.castShadow = true;

scene.add(eyeball);

eyeball.originalY = eyeball.position.y;

const mouse = new THREE.Vector2();

window.addEventListener("mousemove", (event) => {
    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
});

const halo = createHalo(12, 0.5, 100);
scene.add(halo);

createLights();


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

    for (let i = 0; i < eyes.length; i++)
    {
        eyes[i].changeSpeed();
    }
    eyes[0].mesh.rotation.z += eyes[0].increase
    eyes[1].mesh.rotation.z += eyes[1].increase
    eyes[2].mesh.rotation.x += eyes[2].increase
    eyes[2].mesh.rotation.y += eyes[2].increase
    eyes[3].mesh.rotation.z += eyes[3].increase
    
    turnEyeball(eyeball);
    bobEyeball(eyeball, eyes);

    const time = performance.now() * 0.001;
    for (let i = 0; i < eyes.length; i++)
    {
        eyes[i].mesh.material.emissiveIntensity = 0.5 + Math.sin(time * 2) * 0.5;
        eyes[i].mesh.material.emissive.setHex(0xC9980B)
    }

    halo.material.opacity = 0.4 + Math.sin(time * 2) * 0.2;
    if(usingHumanCamera)
        {
        const t = performance.now() * 0.001;
        humanCamera.position.x += Math.sin(t*0.5)*0.002;
        humanCamera.position.z += Math.cos(t*0.5)*0.002;
    }

    renderer.render(scene, usingHumanCamera ? humanCamera : camera);
}
animate();

function createTree(x, z, scale = 1)
{
    const trunk = new THREE.Mesh(
        new THREE.CylinderGeometry(0.1 * scale, 0.1 * scale, 1 * scale),
        new THREE.MeshStandardMaterial({ color: 0x654321 })
    );
    trunk.position.set(x, FLOOR_Y + 0.5 * scale, z);
    trunk.castShadow = true;
    trunk.receiveShadow = true;

    const leaves = new THREE.Mesh(
        new THREE.ConeGeometry(0.5 * scale, 2 * scale, 8),
        new THREE.MeshStandardMaterial({ color: 0x228822 })
    );
    leaves.position.set(x, FLOOR_Y + 1.5 * scale, z);
    leaves.castShadow = true;
    leaves.receiveShadow = false;

    scene.add(trunk, leaves);
}
for (let i = 0; i < 800; i++)
    createTree(ranNum(-200, 200), ranNum(-200, 200), ranNum(0.5, 1.5));

function createSky()
{
    const skyGeo = new THREE.SphereGeometry(500, 32, 32);
    const skyMat = new THREE.MeshBasicMaterial({ color: 0x87ceeb, side: THREE.BackSide });
    const sky = new THREE.Mesh(skyGeo, skyMat);
    scene.add(sky);
}

function createLights()
{
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.2); // soft but visible

    // Main point light on the eyeball
    const eyeLight = new THREE.PointLight(0x88ccff, 1000, 1000, 2);
    eyeLight.position.set(0, 15, 0);
    eyeLight.castShadow = true;

    // Fill lights for floor visibility
    const fillLight1 = new THREE.PointLight(0xffffff, 3, 50);
    fillLight1.position.set(20, 10, 20);

    const fillLight2 = new THREE.PointLight(0xffffff, 3, 50);
    fillLight2.position.set(-20, 10, -20);

    // Optional subtle directional light for shadow definition
    const dirLight = new THREE.DirectionalLight(0xffffff, 0.2);
    dirLight.position.set(0, 50, 0);
    dirLight.castShadow = true;

    const haloLight = new THREE.PointLight(0x88ccff, 100, 100);
    haloLight.position.copy(halo.position);

    scene.add(ambientLight);
    eyeball.add(eyeLight);
    //scene.add(fillLight1);
    //scene.add(fillLight2);
    scene.add(dirLight);
    scene.add(haloLight);
}
function createFloor()
{
    const geometry = new THREE.PlaneGeometry(1000, 1000);
    const floor = new THREE.Mesh(geometry, grassMaterial);
    floor.rotation.x = -Math.PI / 2;
    floor.position.y = FLOOR_Y;
    floor.receiveShadow = true;
    scene.add(floor);

    const floorFill = new THREE.PointLight(0x8888ff, 0.3, 50);
    floorFill.position.set(0, 10, 10);
    scene.add(floorFill);
}

function bobEyeball(eye, eyes) {
    const t = performance.now() * 0.001;
    const amplitude = 0.5;
    const speed = 1.7;
    const newY = eye.originalY + Math.sin(t * speed) * amplitude;
    eye.position.y = newY * 3;
    for (let i = 0; i < eyes.length; i++) eyes[i].mesh.position.y = newY;
}