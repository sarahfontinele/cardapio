document.getElementById('upload-button').addEventListener('click', () => {
  const input = document.createElement('input');
  input.type = 'file';
  input.accept = 'image/*';
  input.onchange = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onload = (e) => {
      const viewer = document.querySelector('#viewer');
      viewer.setAttribute('material-texture', e.target.result); // Aplica a textura
    };
    reader.readAsDataURL(file);
  };
  input.click();
});
