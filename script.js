document.getElementById('upload-button').addEventListener('click', () => {
  const input = document.createElement('input');
  input.type = 'file';
  input.accept = 'image/*';
  input.onchange = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onload = async (e) => {
      const modelViewer = document.getElementById('viewer');
      await modelViewer.updateComplete; // Aguarda o carregamento completo do modelo
      const texture = new THREE.TextureLoader().load(e.target.result);
      const materialName = 'LogoMaterial'; // Nome do material a ser substituído
      const material = modelViewer.model.materials.find(mat => mat.name === materialName);
      if (material) {
        material.pbrMetallicRoughness.baseColorTexture.setTexture(texture);
      } else {
        console.error(`Material com o nome ${materialName} não encontrado.`);
      }
    };
    reader.readAsDataURL(file);
  };
  input.click();
});
