// utils.js
// Funciones matemáticas pequeñas y reutilizables, en el mismo espíritu del
// utils.js que ya usa la profe en sus ejemplos (Pulse Pelota / Pulse2).

// Limita un valor entre un mínimo y un máximo.
function clamp(value, min, max) {
  return Math.min(Math.max(value, min), max);
}

// Convierte un valor de un rango de entrada a un rango de salida.
// Ej: mapRange(canvas.width, 600, 1600, 60, 140) -> tamaño de mariposa
// proporcional al ancho del canvas.
function mapRange(value, inMin, inMax, outMin, outMax) {
  const t = (value - inMin) / (inMax - inMin);
  return outMin + clamp(t, 0, 1) * (outMax - outMin);
}
