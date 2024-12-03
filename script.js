document.getElementById('upload-button').addEventListener('click', () => {
  const input = document.createElement('input');
  input.type = 'file';
  input.accept = 'image/*';
  input.onchange = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onload = (e) => {
      const textureURL = e.target.result;
      const viewer = document.querySelector('model-viewer');
      viewer.updateHotspot({ name: "logo" }); // Atualize para hotspots relevantes.
      viewer.style.backgroundImage = `url(${textureURL})`;
    };
    reader.readAsDataURL(file);
  };
  input.click();
});
