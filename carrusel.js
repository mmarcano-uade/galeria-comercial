document.addEventListener("DOMContentLoaded", function () {
  var grid = document.querySelector(".circle-nav-grid");
  var viewport = document.querySelector(".circle-nav-viewport");
  if (!grid || !viewport) {
    return;
  }

  var items = grid.querySelectorAll(".circle-item");
  if (items.length === 0) {
    return;
  }

  var dataVisible = grid.getAttribute("data-visible");
  if (!dataVisible) {
    dataVisible = 4;
  } else {
    dataVisible = parseInt(dataVisible, 10);
  }

  var visibleCount = dataVisible;
  var startIndex = 0;
  var maxStartIndex = 0;

  var prevBtn = document.querySelector(".circle-nav-btn-prev");
  var nextBtn = document.querySelector(".circle-nav-btn-next");

  function getVisibleCount() {
    var width = window.innerWidth;

    if (width <= 576) {
      if (items.length < 2) {
        return items.length;
      }
      return 2;
    } else if (width <= 992) {
      if (items.length < 3) {
        return items.length;
      }
      return 3;
    } else {
      if (items.length < dataVisible) {
        return items.length;
      }
      return dataVisible;
    }
  }

  function updateButtons() {
    var disable = items.length <= visibleCount;
    if (prevBtn) {
      prevBtn.disabled = disable;
    }
    if (nextBtn) {
      nextBtn.disabled = disable;
    }
  }

  function updateTransform() {
    var stepPercent = 100 / visibleCount;
    var offset = stepPercent * startIndex;
    grid.style.transform = "translateX(-" + offset + "%)";
  }

  function updateState() {
    visibleCount = getVisibleCount();
    grid.style.setProperty("--circle-visible", visibleCount);

    maxStartIndex = items.length - visibleCount;
    if (maxStartIndex < 0) {
      maxStartIndex = 0;
    }

    if (startIndex > maxStartIndex) {
      startIndex = maxStartIndex;
    }

    updateTransform();
    updateButtons();
  }

  if (prevBtn) {
    prevBtn.addEventListener("click", function () {
      if (maxStartIndex <= 0) {
        return;
      }

      if (startIndex === 0) {
        startIndex = maxStartIndex;
      } else {
        startIndex = startIndex - 1;
      }

      updateTransform();
    });
  }

  if (nextBtn) {
    nextBtn.addEventListener("click", function () {
      if (maxStartIndex <= 0) {
        return;
      }

      if (startIndex === maxStartIndex) {
        startIndex = 0;
      } else {
        startIndex = startIndex + 1;
      }

      updateTransform();
    });
  }

  window.addEventListener("resize", function () {
    updateState();
  });

  updateState();
});
