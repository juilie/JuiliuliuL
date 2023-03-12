const scene = new THREE.Scene();
const canvas = document.querySelector('#webgl');

const geometry = new THREE.BoxGeometry(1, 1, 1);
const material = new THREE.MeshBasicMaterial({color: "red"});
const mesh = new THREE.Mesh(geometry, material);
scene.add(mesh);

const sizes = {
    width: 800,
    height: 600
}

// Add camera to scene to avoid bugs
// FOV, Aspect Ratio
const camera = new THREE.PerspectiveCamera(75, sizes.width/sizes.height)
camera.position.z = 3;
scene.add(camera);

// Render
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})
renderer.setSize(sizes.width, sizes.height);

renderer.render(scene, camera);