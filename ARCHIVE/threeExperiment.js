// The three main things! Scene, camera, render
const scene = new THREE.Scene();
scene.background = new THREE.Color( 0x03f0fc );

const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 500);
camera.position.set(0, 0, 15);
camera.lookAt(0, 0, 0);

const renderer = new THREE.WebGLRenderer({canvas: document.querySelector('#bg')}); // {alpha:true} for transparency
// renderer.setClearColorHex( 0xffffff, 1 ); // assumes black background
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setSize(window.innerWidth/2, window.innerHeight/2, false); //makes it low res!

document.body.appendChild(renderer.domElement); // This is a <canvas> element

// NOTE: for low res, which is not used to my knowledge yet !!
// If you wish to keep the size of your app but render it at a lower resolution, 
// you can do so by calling setSize with false as updateStyle (the third argument). 
// For example, setSize(window.innerWidth/2, window.innerHeight/2, false) 
// will render your app at half resolution, given that your <canvas> has 100% width and height.

const geometry = new THREE.BoxGeometry();
const material = new THREE.MeshBasicMaterial({
    color: 0xffffff
});
const cube = new THREE.Mesh(geometry, material);
scene.add(cube);

//create a blue LineBasicMaterial
const lineMaterial = new THREE.LineDashedMaterial({
    color: 0xffc7fd
});
const points = [];
points.push(new THREE.Vector3(-2, 0, 0));
points.push(new THREE.Vector3(0, 2, 0));
points.push(new THREE.Vector3(2, 0, 0));
points.push(new THREE.Vector3(0, -2, 0));
points.push(new THREE.Vector3(-2, 0, 0));

const lineGeometry = new THREE.BufferGeometry().setFromPoints(points);
const line = new THREE.Line(lineGeometry, lineMaterial);

const linetwo = new THREE.Line(lineGeometry, lineMaterial);
linetwo.rotation.y = 1.58;

const linethree = new THREE.Line(lineGeometry, lineMaterial);
linethree.rotation.z = .79

scene.add(line);
scene.add(linetwo);
scene.add(linethree);

function animate() {
    requestAnimationFrame(animate);
    cube.rotation.x += 0.01;
    cube.rotation.y += 0.01;

    line.rotation.x += 0.03;
    linetwo.rotation.y += 0.03
    linethree.rotation.y += 0.03;
    linethree.rotation.x += 0.03;
    
    renderer.render(scene, camera);
}
animate();