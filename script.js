document.getElementById('upload-button').addEventListener('click', () => {
  const input = document.createElement('input');
  input.type = 'file';
  input.accept = 'image/*';
  
  input.onchange = (event) => {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = async (e) => {
      const textureURL = e.target.result;

      const modelViewer = document.getElementById('viewer');
      const loader = new THREE.TextureLoader();

      modelViewer.addEventListener('load', async () => {
        loader.load(textureURL, (texture) => {
          const materialName = 'LogoMaterial';
          const material = modelViewer.model.materials.find(mat => mat.name === materialName);

          if (material) {
            material.pbrMetallicRoughness.baseColorTexture.texture = texture;
            console.log('Textura aplicada com sucesso!');
          } else {
            console.error(`Material "${materialName}" não encontrado.`);
          }
        });
      });
    };
    reader.readAsDataURL(file);
  };
  input.click();
});
