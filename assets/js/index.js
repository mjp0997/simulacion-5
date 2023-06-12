document.addEventListener('DOMContentLoaded', () => {
   const form = document.querySelector('#form');

   const resultsContainer = document.querySelector('#results');
   const iterations = document.querySelector('#iterations');
   const aprox = document.querySelector('#aprox');
   const error = document.querySelector('#error');

   form.addEventListener('submit', (e) => {
      e.preventDefault();

      const errorSpan = document.querySelector('span');
      
      const { value } = form.querySelector('input');

      resultsContainer.classList.remove('show');

      // Validaciones
      if (isNaN(value) || value.trim() == '') {
         errorSpan.innerText = 'Debe ingresar un número';
         form.classList.add('error');
         return;
      }

      if (Number(value) < 1) {
         errorSpan.innerText = 'La cantidad de simulaciones debe ser mayor a 0';
         form.classList.add('error');
         return;
      }

      if (!Number.isInteger(Number(value))) {
         errorSpan.innerText = 'La cantidad de simulaciones debe ser un número entero';
         form.classList.add('error');
         return;
      }

      form.classList.remove('error');

      const itQuantity = Number(value);

      iterations.innerText = formatNumber(itQuantity);

      const result = montecarlo(fx, 3, 2, itQuantity);

      aprox.innerText = formatNumber(result);

      error.innerText = `${formatNumber(errorPercentage(result, 24))}%`;

      resultsContainer.classList.add('show');
   });
});

/**
 * Función de la forma 3x^2 + 2x
 * @param {number} x valor de la variable a evaluar
 * @returns {number}
 */
const fx = (x) => 3 * Math.pow(x, 2) + 2 * x;

/**
 * Función que permite aproximar el resultado de una integral definida usando el método de Montecarlo
 * @param {Function} fx Función interna de la integral que se quiere resolver
 * @param {number} upper Límite superior de la integral
 * @param {number} lower Límite inferior de la integral
 * @param {number} iterations Cantidad de iteraciones a realizar
 * @returns {number}
 */
const montecarlo = (fx, upper, lower, iterations) => {
   let acc = 0;

   for (let i = 0; i < iterations; i++) {
      acc += fx(Math.random() * (upper - lower) + lower);
   }

   return (upper - lower) / iterations * acc;
}

/**
 * Función para calcular el porcentaje de error de un valor aproximado conociendo el valor exacto
 * @param {number} aprox Valor aproximado
 * @param {number} exact Valor exacto
 * @returns {number}
 */
const errorPercentage = (aprox, exact) => Math.abs(aprox - exact) / exact * 100;

/**
 * Función para formatear un número a formato es-VE
 * @param {number} value Número que se desea formatear
 * @returns {string}
 */
const formatNumber = (value) => new Intl.NumberFormat('es-VE', { style: 'decimal', maximumFractionDigits: 5 }).format(value);