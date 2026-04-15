import * as THREE from 'three';
import { OrbitControls } from "three/addons/controls/OrbitControls.js";


const HALF = Math.PI / 2;
function ranInt(min, max)
{
    return Math.random() * (max - min) + min;
}
const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.set(10, 10, 20);
const canvas = document.querySelector("#bg");
const renderer = new THREE.WebGLRenderer({ canvas: canvas })

const loader = new THREE.TextureLoader();
const eye_texture = await loader.loadAsync('textures/eyeComplete.png');
const eyeMaterial = new THREE.MeshPhongMaterial({
    map: eye_texture,
    transparent: true
});

const controls = new OrbitControls(camera, canvas);

renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);

class EyeRings
{
    constructor(mesh)
    {
        this.mesh = mesh;
        this.maxSpeed = 0.15;
        this.increase = 0.004;
        this.accelerator = 0.001;
        this.increasing = true;
        this.burst = false;
        this.scheduleBurst();
    }
    changeSpeed()
    {
        if (this.burst)
        {
            if (this.increasing)
            {
                this.increase += this.accelerator;
                if (this.increase >= this.maxSpeed)
                {
                    this.increase = this.maxSpeed;
                    this.increasing = false;
                }
            }
            else
            {
                this.increase -= this.accelerator;
                if (this.increase <= 0.004)
                {
                    this.increase = 0.004;
                    this.increasing = true;
                    this.burst = false;
                    this.maxSpeed = ranInt(0.1, 0.2);
                }
            }
        }
    }

    scheduleBurst()
    {
        const time = ranInt(1000, 4500);
        setTimeout(() => {
            this.burst = true;
            this.scheduleBurst();
        }, time);
    }
}

const ringAccels = {
    limit: 1,
    rings: []
}

const eyes = [];
for (let i = 0; i <= 3; i++)
{
    const radius = 7 + (i * 1.5)
    const points = [];

    const r = radius;
    const t = 0.3 + (i / 10);
    points.push(new THREE.Vector2(r - t * 0.4, -t * 2));
    points.push(new THREE.Vector2(r - t * 0.4,  t * 2));
    points.push(new THREE.Vector2(r + t * 0.4,  t * 2));
    points.push(new THREE.Vector2(r + t * 0.4, -t * 2));
    
    const geometry = new THREE.LatheGeometry(points, 256);
    geometry.rotateX(HALF)
    geometry.computeVertexNormals();
    const mesh = new THREE.Mesh(
        geometry,
        new THREE.MeshStandardMaterial({
            color: 0xffffff,
            wireframe: false,
            emissive: 0xaaaaaa,
            metalness: 0.3,
            roughness: 0.2,
            side: THREE.DoubleSide
    }));
    mesh.rotation.x = HALF
    eyes.push(new EyeRings(mesh));
    
    makeEyes(40, eyes[i], radius, new THREE.SphereGeometry(0.5 + (i / 10), 25, 25), eyeMaterial, false)
    makeEyes(100, eyes[i], radius, new THREE.SphereGeometry(0.3 + (i / 10), 25, 25), eyeMaterial, true)

    //eyes[i].scale.z = 0.5;
}

function makeEyes(am, eye, radius, eyeGeometry, eyeMaterial, ranRan)
{
    for (let j = 0; j < am; j++)
    {
        const angle = (j / am) * Math.PI * 2;
    
        const eyeWall = new THREE.Mesh(eyeGeometry, eyeMaterial);
    
        eyeWall.position.set(
            Math.cos(angle + 0.05),
            Math.sin(angle + 0.05),
            ranRan ? ranInt(-0.05, 0.05) : 0
        );
    
        // push outward onto ring surface
        eyeWall.position.normalize();
        eyeWall.position.multiplyScalar(radius);
        
        eyeWall.lookAt(eyeWall.position.clone().multiplyScalar(2));
        eyeWall.rotateY(HALF)
        eye.mesh.add(eyeWall);
    }
}
eyes[0].mesh.rotateY(HALF / 2)
eyes[0].mesh.rotateZ(HALF / 2)
eyes[1].mesh.rotateY(HALF)
eyes[2].mesh.rotateX(HALF)
eyes[2].mesh.rotateY(-HALF / 2)
eyes[3].mesh.rotateX(HALF / 8)

eyes[0].mesh.scale.x = 0.7;
for (let i = 0; i <= 3; i++)
{
    scene.add(eyes[i].mesh);
}

const mainEyeMaterial = new THREE.MeshBasicMaterial( {
    map: eye_texture,
    metalness: 0.2,
    roughness: 0.3
})

mainEyeMaterial.side = THREE.FrontSide

const eyeball = new THREE.Mesh(
    new THREE.SphereGeometry(3.5, 100, 100),
    mainEyeMaterial
);
const eyeLight = new THREE.PointLight(0x88ccff, 2, 50);
eyeball.add(eyeLight);

const pointLight = new THREE.PointLight(0xffffff);
pointLight.position.set(5, 5, 5);

const ambientLight = new THREE.AmbientLight(0xffffff);
ambientLight.intensity = 0.3;
scene.add(ambientLight);

eyeball.rotateY(HALF);

eyeball.overdraw = true;
eyeball.castShadow = true;
scene.add(eyeball);

eyeball.originalY = eyeball.position.y;

console.log(ringAccels)

const mouse = new THREE.Vector2();

window.addEventListener("mousemove", (event) => {
    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
});

const acceleration = 0.008;
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
    
    const time = Date.now() * 0.001;
    const bobAmplitude = 0.5;
    const bobSpeed = 1.5;
    eyeball.position.y = eyeball.originalY + Math.sin(time * bobSpeed) * bobAmplitude;

    eyeball.rotation.x = Math.sin(time * 0.8) * 0.05;
    eyeball.rotation.z = Math.sin(time * 1.2) * 0.03;
    
    eyeball.position.y = eyeball.originalY + Math.sin(time * 1.5 + 0.2) * 0.5;
    eyeball.rotation.x = Math.sin(time * 0.9 + 1.0) * 0.05;
    eyeball.rotation.z = Math.sin(time * 1.3 + 0.5) * 0.03;


    renderer.render(scene, camera);
}
animate();