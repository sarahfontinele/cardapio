// Configuração inicial do Three.js
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ canvas: document.getElementById('viewer') });
renderer.setSize(window.innerWidth, window.innerHeight);

// Adicionar luz
const light = new THREE.AmbientLight(0xffffff, 1);
scene.add(light);

// Carregar o modelo GLTF
const loader = new THREE.GLTFLoader();
let model;
loader.load('modelo.glb', (gltf) => {
  model = gltf.scene;
  scene.add(model);
  camera.position.z = 2;
}, undefined, (error) => {
  console.error('Erro ao carregar o modelo:', error);
});

// Função de renderização
function animate() {
  requestAnimationFrame(animate);
  renderer.render(scene, camera);
}
animate();

// Upload de imagem e aplicação como textura
document.getElementById('upload-button').addEventListener('click', () => {
  const input = document.createElement('input');
  input.type = 'file';
  input.accept = 'image/*';
  input.onchange = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onload = (e) => {
      const texture = new THREE.TextureLoader().load(e.target.result);
      if (model) {
        model.traverse((node) => {
          if (node.isMesh && node.material
