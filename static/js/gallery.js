(function () {
  var gallery = document.querySelector('[data-photo-gallery]');
  var lightbox = document.querySelector('[data-photo-lightbox]');
  if (!gallery || !lightbox) return;

  var items = Array.prototype.slice.call(gallery.querySelectorAll('[data-photo-item]'));
  var image = lightbox.querySelector('[data-photo-lightbox-image]');
  var activeItem = null;

  function open(item) {
    var index = items.indexOf(item);
    activeItem = item;

    if (typeof lightbox.showModal !== 'function') {
      window.open(item.dataset.photoSrc, '_blank', 'noopener');
      return;
    }

    image.src = item.dataset.photoSrc;
    image.alt = 'Photo ' + (index + 1) + ' of ' + items.length;
    document.documentElement.classList.add('has-photo-lightbox');
    lightbox.showModal();
  }

  gallery.addEventListener('click', function (event) {
    var item = event.target.closest('[data-photo-item]');
    if (item) open(item);
  });

  lightbox.addEventListener('click', function (event) {
    if (event.target === lightbox) lightbox.close();
  });

  lightbox.addEventListener('close', function () {
    document.documentElement.classList.remove('has-photo-lightbox');
    if (activeItem) activeItem.focus();
  });
}());
