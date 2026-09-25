// script.js
//
// Basado directamente en el patrón de "Pulse2" que compartió la profe:
// un window.onload, un canvas 2D, una imagen (Image) y un ciclo de
// animación con requestAnimationFrame que usa Math.sin() cada frame.
//
// La diferencia es qué se anima con el seno:
//   - En "Pulse Pelota" y "Pulse2": el seno mueve la ESCALA (efecto de pulso).
//   - Aquí: el seno mueve la POSICIÓN en Y (la mariposa viaja en una onda),
//     tal como se ve en el ejemplo de la estrella de Mario.

window.onload = function () {
  var canvas = document.getElementById("canvas"),
      context = canvas.getContext("2d"),
      fondo = new Image(),
      mariposa = new Image(),
      assetsListos = 0;

  fondo.src = "fondo.jpg";
  mariposa.src = "mariposa.png";

  // Solo arrancamos la animación cuando ambas imágenes ya cargaron,
  // para no dibujar sobre un canvas con imágenes a medio cargar.
  fondo.onload = mariposa.onload = function () {
    assetsListos++;
    if (assetsListos === 2) iniciarAnimacion();
  };

  function iniciarAnimacion() {
    // ---- Parámetros de la onda (posición) ----------------------------
    var angle = 0,          // fase de la onda, avanza con el tiempo
        speed = 0.045,       // qué tan rápido "respira" la onda
        centerY = canvas.height / 2,
        rangeY = clamp(canvas.height * 0.28, 40, 160), // amplitud en px
        posicionX = -120,    // arranca fuera del canvas, por la izquierda
        posicionY = centerY,
        speedX = 2.6;        // velocidad horizontal de la mariposa

    // ---- Parámetros del aleteo (escala) -------------------------------
    // Mismo truco que usa la profe para el "pulso" (centerScale + seno),
    // pero aplicado solo al ancho para simular el aleteo de las alas.
    var flapAngle = 0,
        flapSpeed = 0.35,
        centerScale = 1,
        flapRange = 0.18,
        escalaX = 1,
        escalaY = 1;

    // Tamaño de la mariposa en pantalla, proporcional al canvas.
    var anchoMariposa = mapRange(canvas.width, 600, 1600, 70, 140),
        altoMariposa = anchoMariposa * (mariposa.height / mariposa.width);

    (function drawFrame() {
      window.requestAnimationFrame(drawFrame, canvas);

      context.clearRect(0, 0, canvas.width, canvas.height);
      context.drawImage(fondo, 0, 0, canvas.width, canvas.height);

      // --- Posición: onda senoidal a lo largo de X ----------------------
      posicionY = centerY + rangeY * Math.sin(angle);
      angle += speed;

      posicionX += speedX;
      if (posicionX - anchoMariposa > canvas.width) {
        posicionX = -anchoMariposa; // vuelve a entrar por la izquierda
      }

      // --- Aleteo: escala oscilante en X ---------------------------------
      escalaX = centerScale + Math.sin(flapAngle) * flapRange;
      escalaY = 1;
      flapAngle += flapSpeed;

      // --- Rotación según la pendiente de la onda (hacia dónde "vuela") --
      var pendiente = rangeY * speed * Math.cos(angle);
      var rotacion = Math.atan2(pendiente, speedX) * 0.6; // suavizada

      context.save();
      context.translate(posicionX, posicionY);
      context.rotate(rotacion);
      context.scale(escalaX, escalaY);
      context.drawImage(
        mariposa,
        -anchoMariposa / 2,
        -altoMariposa / 2,
        anchoMariposa,
        altoMariposa
      );
      context.restore();
    }());
  }
};
