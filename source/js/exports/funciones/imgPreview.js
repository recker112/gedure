export function imgRender(img, showInput) {
  const file = img.files[0];
  const render = new FileReader();
  render.readAsDataURL(file);
  render.onload = (e) => {
    showInput.src = e.target.result;
  }
}