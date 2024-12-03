const modelViewer = document.getElementById('viewer');
const uploadButton = document.getElementById('upload-button');

uploadButton.addEventListener('click', () => {
  // Criar input para upload de arquivo
  const input = document.createElement('input');
  input.type = 'file';
  input.accept = 'image/*';
  
  input.onchange = (event) => {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();

    reader.onload = async (e) => {
      const textureURL = e.target.result;

      // Carregar a textura usando THREE.js
      const loader = new THREE.TextureLoader();

      // Aguarde o modelo ser carregado
      modelViewer.addEventListener('load', async () => {
        // Carregar a textura
        loader.load(textureURL, (texture) => {
          // Acessar o material do modelo
          const materialName = 'LogoMaterial';
          const material = modelViewer.model.materials.find(mat => mat.name === materialName);

          if (material) {
            // Aplicar a textura ao material
            material.pbrMetallicRoughness.baseColorTexture.texture = texture;
            material.pbrMetallicRoughness.baseColorFactor = [1, 1, 1, 1];
            console.log('Textura aplicada com sucesso!');
          } else {
            console.error(`Material "${materialName}" não encontrado no modelo.`);
          }
        });
      });
    };
    reader.readAsDataURL(file);
  };
  input.click();
});
