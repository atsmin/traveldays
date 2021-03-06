import { IMAGE_DIR } from './config';

export function showSlide(country, city) {
  var modal = $('[data-remodal-id=modal]').remodal();
  modal.open();
  var images = [];
  for (let i = 1; i <= 5; i++) {
    var img = new Image();
    var url = `${IMAGE_DIR}${country}/${city}/${i}.jpg`;
    if (i === 1) {
      img.src = url;
    } else {
      img.dataset.src = url;
    }
    images.push(img);
  }
  $('#slider').append(images);
  var slider = new IdealImageSlider.Slider({
    selector: '#slider',
    height: 400,
    interval: 3000
  });
  slider.start();
}
