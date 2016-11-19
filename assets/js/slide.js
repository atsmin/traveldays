import { IMAGE_DIR } from './config';

export function show(country, city) {
  var modal = $('[data-remodal-id=modal]').remodal();
  modal.open();
  var images = [];
  for (let i = 1; i <= 5; i++) {
    var img = new Image();
    img.src = `${IMAGE_DIR}${country}/${city}/${i}.jpg`;
    images.push(img);
  }
  $('#slider').append(images);
  var slider = new IdealImageSlider.Slider({
    selector: '#slider',
    maxHeight: 600
  });
  slider.start();
}
