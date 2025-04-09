import React, { useState } from 'react';
import './App.css'; 

function App() {
  const [fecha, setFecha] = useState('');
  const [producto, setProducto] = useState('diversey');
  const [codigo, setCodigo] = useState('');

  // Función para obtener el día del año desde una fecha
  const getDiaDelAnio = (fecha) => {
    const date = new Date(fecha);
    // Convertimos la fecha a UTC para evitar problemas de zona horaria
    const start = new Date(Date.UTC(date.getFullYear(), 0, 0)); // Usamos UTC para calcular el inicio del año
    const diff = date - start;
    const oneDay = 1000 * 60 * 60 * 24;
    return Math.floor(diff / oneDay);
  };

  // Función para generar el código basado en la fecha y el producto
  const generarCodigo = () => {
    if (!fecha) {
      alert('Por favor, ingrese una fecha.');
      return;
    }

    const diaDelAnio = getDiaDelAnio(fecha);
    let nuevoCodigo = '';

    if (producto === 'diversey') {
      nuevoCodigo = `725${diaDelAnio.toString().padStart(3, '0')}01`;
    } else if (producto === 'unilever') {
      nuevoCodigo = `PY5${diaDelAnio.toString().padStart(3, '0')}11`;
    } else if (producto === 'diverseyDrastik') {
      // Para Diversey Drastik, incluir "Fab: <fecha>"
      const fechaObj = new Date(fecha);
      // Convertimos la fecha a UTC y la formateamos manualmente
      const fechaFormateada = `${String(fechaObj.getUTCDate()).padStart(2, '0')}/${String(fechaObj.getUTCMonth() + 1).padStart(2, '0')}/${fechaObj.getUTCFullYear()}`;
      nuevoCodigo = `725${diaDelAnio.toString().padStart(3, '0')}01 - Fab: ${fechaFormateada}  `;
    }

    setCodigo(nuevoCodigo); // Actualiza el estado con el código generado
  };

  return (
    <div className="App">
      <h1>Generador de Código</h1>

      {/* Input para la fecha */}
      <div>
        <label>Fecha:</label>
        <input type="date" value={fecha} onChange={(e) => setFecha(e.target.value)} />
      </div>

      {/* Selector de productos */}
      <div>
        <label>Producto:</label>
        <select value={producto} onChange={(e) => setProducto(e.target.value)}>
          <option value="diversey">Diversey</option>
          <option value="unilever">Unilever</option>
          <option value="diverseyDrastik">Diversey Drastik</option>
        </select>
      </div>

      {/* Botón para generar el código */}
      <button onClick={generarCodigo}>Generar Código</button>

      {/* Mostrar el código generado */}
      {codigo && (
        <div>
          <h2>Código Generado:</h2>
          <p>{codigo}</p>
        </div>
      )}
    </div>
  );
}

export default App;

