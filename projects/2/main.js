import * as THREE from 'three';
import { OrbitControls } from "three/addons/controls/OrbitControls.js";


const HALF = Math.PI / 2;
function ranInt(min, max)
{
    return Math.random() * (max - min) + min;
}
const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
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

camera.position.setZ(20);

const eyes = [];
for (let i = 0; i <= 3; i++)
{
    const radius = 7 + i
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
    eyes.push(mesh);
    
    makeEyes(40, eyes[i], radius, new THREE.SphereGeometry(0.5 + (i / 10), 25, 25), eyeMaterial, false)
    makeEyes(30, eyes[i], radius, new THREE.SphereGeometry(0.3 + (i / 10), 25, 25), eyeMaterial, true)

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
        eye.add(eyeWall);
    }
}
eyes[0].rotateX(ranInt(0, HALF * 2))
eyes[0].rotateY(ranInt(0, HALF * 2))
eyes[0].rotateZ(ranInt(0, HALF * 2))
eyes[1].rotateY(HALF)
eyes[3].rotateX(HALF)

eyes[0].scale.x = 0.7;
for (let i = 0; i <= 3; i++)
{
    scene.add(eyes[i]);
}

const uniforms = {
    "tex": { value: "textures/eye.jpg" }
};

const mainEyeMaterial = new THREE.ShaderMaterial( {
    uniforms        : uniforms,
    vertexShader    : document.getElementById( 'vertex_shader' ).textContent,
    fragmentShader  : document.getElementById( 'fragment_shader' ).textContent
} );

const mainEyeMaterialv2 = new THREE.MeshBasicMaterial( {
    map: eye_texture,
    metalness: 0.2,
    roughness: 0.3
})

mainEyeMaterialv2.side = THREE.FrontSide

const eyeball = new THREE.Mesh(
    new THREE.SphereGeometry(3.5, 100, 100),
    mainEyeMaterialv2
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



const mouse = new THREE.Vector2();

window.addEventListener("mousemove", (event) => {
    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
});


const acceleration = 1;
function animate()
{
    controls.update();
    requestAnimationFrame(animate);
    eyes[0].rotation.x += 0.003 * acceleration;
    eyes[1].rotation.y += 0.004 * acceleration;
    eyes[2].rotation.z += 0.005 * acceleration;
    eyes[3].rotation.x += 0.002 * acceleration;

    const raycaster = new THREE.Raycaster();
    const mouseVec = new THREE.Vector2();
    const target = new THREE.Vector3();

    mouseVec.set(mouse.x, mouse.y);
    raycaster.setFromCamera(mouseVec, camera);
    raycaster.ray.at(20, target);

    //eyeball.lookAt(target);
    //eyes[2].rotation.y += 0.1;
    //eyes[0].rotation.z += 0.1;
    //eyes[1].rotation.z += 0.1;
    //eyes[3].rotation.z += 0.1;
    //torus.rotation.z += 0.1;
    renderer.render(scene, camera);
}
animate();