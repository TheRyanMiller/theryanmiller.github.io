(function () {
  var gallery = document.querySelector('[data-photo-gallery]');
  var lightbox = document.querySelector('[data-photo-lightbox]');
  if (!gallery || !lightbox) return;

  var items = Array.prototype.slice.call(gallery.querySelectorAll('[data-photo-item]'));
  var image = lightbox.querySelector('[data-photo-lightbox-image]');
  var counter = lightbox.querySelector('[data-photo-counter]');
  var original = lightbox.querySelector('[data-photo-original]');
  var previous = lightbox.querySelector('[data-photo-previous]');
  var next = lightbox.querySelector('[data-photo-next]');
  var close = lightbox.querySelector('[data-photo-close]');
  var currentIndex = 0;
  var activeItem = null;

  function render(index) {
    var item = items[index];
    var position = index + 1;

    currentIndex = index;
    image.src = item.dataset.photoSrc;
    image.alt = 'Photo ' + position + ' of ' + items.length;
    counter.textContent = position + ' / ' + items.length;
    original.href = item.dataset.photoSrc;
    previous.disabled = index === 0;
    next.disabled = index === items.length - 1;
  }

  function open(item) {
    var index = items.indexOf(item);
    activeItem = item;

    if (typeof lightbox.showModal !== 'function') {
      window.open(item.dataset.photoSrc, '_blank', 'noopener');
      return;
    }

    render(index);
    document.documentElement.classList.add('has-photo-lightbox');
    lightbox.showModal();
  }

  gallery.addEventListener('click', function (event) {
    var item = event.target.closest('[data-photo-item]');
    if (item) open(item);
  });

  previous.addEventListener('click', function () {
    if (currentIndex > 0) render(currentIndex - 1);
  });

  next.addEventListener('click', function () {
    if (currentIndex < items.length - 1) render(currentIndex + 1);
  });

  close.addEventListener('click', function () {
    lightbox.close();
  });

  lightbox.addEventListener('click', function (event) {
    if (event.target === lightbox) lightbox.close();
  });

  lightbox.addEventListener('keydown', function (event) {
    if (event.key === 'ArrowLeft' && currentIndex > 0) {
      event.preventDefault();
      render(currentIndex - 1);
    }

    if (event.key === 'ArrowRight' && currentIndex < items.length - 1) {
      event.preventDefault();
      render(currentIndex + 1);
    }
  });

  lightbox.addEventListener('close', function () {
    document.documentElement.classList.remove('has-photo-lightbox');
    if (activeItem) activeItem.focus();
  });
}());
