var utils = {
  captureMouse: function (canvas) {
    var mouse = { x: 0, y: 0 };

    canvas.addEventListener(
      "mousemove",
      function (event) {
        var rect = canvas.getBoundingClientRect();
        mouse.x = event.clientX - rect.left;
        mouse.y = event.clientY - rect.top;
      },
      false
    );

    return mouse;
  },
};
