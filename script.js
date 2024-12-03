document.getElementById('upload-button').addEventListener('click', () => {
  const input = document.createElement('input');
  input.type = 'file';
  input.accept = 'image/*';
  input.onchange = async (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onload = async (e) => {
      const modelViewer = document.getElementById('viewer');
      await modelViewer.updateComplete; // Aguarda o carregamento do modelo

      const material = modelViewer.model.materials.find((mat) => mat.name === 'LogoMaterial');
      if (material) {
        const texture = new Image();
        texture.src = e.target.result;
        texture.onload = () => {
          material.pbrMetallicRoughness.setBaseColorTexture(texture);
        };
      } else {
        console.error('Material "LogoMaterial" não encontrado no modelo.');
      }
    };
    reader.readAsDataURL(file);
  };
  input.click();
});
