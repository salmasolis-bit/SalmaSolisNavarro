// utils.js
//
// El código base que pasó la profe usa utils.captureMouse(canvas), pero no
// tengo su utils.js real (nunca me lo compartieron). Esta es mi propia
// implementación de captureMouse, con el comportamiento estándar que el
// código necesita: regresa un objeto {x, y} que se actualiza solo, siguiendo
// la posición del mouse relativa al canvas, cada vez que se mueve.
//
// Si en algún momento consigues su utils.js real, nada más reemplaza este
// archivo por el de ella; el resto del código (paint.html) no cambia.

var utils = {

  captureMouse: function (element) {
    var mouse = { x: 0, y: 0 };

    element.addEventListener('mousemove', function (event) {
      var x, y;

      if (event.pageX !== undefined && event.pageY !== undefined) {
        x = event.pageX;
        y = event.pageY;
      } else {
        x = event.clientX + document.body.scrollLeft + document.documentElement.scrollLeft;
        y = event.clientY + document.body.scrollTop + document.documentElement.scrollTop;
      }

      x -= element.offsetLeft;
      y -= element.offsetTop;

      mouse.x = x;
      mouse.y = y;
    }, false);

    return mouse;
  }

};
