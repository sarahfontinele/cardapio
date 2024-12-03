document.getElementById('upload-button').addEventListener('click', () => {
  const input = document.createElement('input');
  input.type = 'file';
  input.accept = 'image/*';

  input.onchange = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();

    reader.onload = async (e) => {
      const modelViewer = document.getElementById('viewer');
      await modelViewer.updateComplete; // Aguarda o carregamento do modelo
      const textureURL = e.target.result;

      // Modificar o material diretamente no model-viewer
      const material = modelViewer.model.materials.find(mat => mat.name === 'LogoMaterial');
      if (material) {
        material.pbrMetallicRoughness.setBaseColorTexture(textureURL);
        console.log('Textura aplicada com sucesso!');
      } else {
        console.error('Material "LogoMaterial" não encontrado no modelo.');
      }
    };

    reader.readAsDataURL(file);
  };

  input.click();
});
