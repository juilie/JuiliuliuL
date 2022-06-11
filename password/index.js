// The three main things! Scene, camera, render
let rotateSpeed = 0;
let canvas = document.getElementById('bg');

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 500);
camera.position.set(0, 0, 7);
camera.lookAt(0, 0, 0);

const renderer = new THREE.WebGLRenderer({
    canvas: document.querySelector('#bg'),
    alpha: true
}); // {alpha:true} for transparency
renderer.setSize(window.innerWidth, window.innerHeight);

document.body.appendChild(renderer.domElement); // This is a <canvas> element


const geometry = new THREE.ConeGeometry(1, 2, 4);
geometry.faces[4].color = 0x000000;
geometry.faces[5].color = 0x000000;
geometry.faces[6].color = 0x000000;
geometry.faces[7].color = 0x000000;


const material = new THREE.MeshBasicMaterial({
    vertexColors: THREE.FaceColors
});
const cone = new THREE.Mesh(geometry, material);

cone.rotation.x = 1.5708;
cone.rotation.y = 0.785398;
cone.rotation.z = 0;
scene.add(cone);

function updateFaceColor(color, face) {
    if (face < 3) {
        geometry.faces[face].color.setHex(color);
        geometry.colorsNeedUpdate = true;
    } else if (face === 3) {
        geometry.faces[face].color.setHex(color);
        geometry.colorsNeedUpdate = true;
        // cone.rotation.y += .785398;
        setTimeout(() => {
            rotateSpeed = 1;
        }, 1300);

    } else {
        return;
    }
}

function animate() {
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
    if (!(cone.rotation.x <= -1.5708)) {
        if(cone.rotation.y < 3.92699) {
            cone.rotation.y += rotateSpeed*.09;
        }
        cone.rotation.x -= rotateSpeed * .04;
    } else if (cone.position.z <= 5) {
        cone.position.z += .05;

    } else {
        scene.remove(cone);
    }
}

function onWindowResize() {
    camera.aspect = canvas.clientWidth / canvas.clientHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(canvas.clientWidth, canvas.clientHeight);
}
window.addEventListener('resize', onWindowResize);
animate();