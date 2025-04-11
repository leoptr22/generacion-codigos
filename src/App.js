import React, { useState } from 'react';
import './App.css';

function App() {
  const [fecha, setFecha] = useState('');
  const [producto, setProducto] = useState('diversey');
  const [codigo, setCodigo] = useState('');

  // Función para obtener el día del año desde una fecha
  const getDiaDelAnio = (fecha) => {
    const date = new Date(fecha);
    const start = new Date(Date.UTC(date.getFullYear(), 0, 0)); // Usamos UTC para calcular el inicio del año
    const diff = date - start;
    const oneDay = 1000 * 60 * 60 * 24;
    return Math.floor(diff / oneDay);
  };

  // Función para formatear la fecha como "dd mm aa" utilizando UTC
  const formatearFecha = (fecha) => {
    const fechaObj = new Date(fecha);
    const dia = String(fechaObj.getUTCDate()).padStart(2, '0'); // Usamos getUTCDate para evitar el ajuste de zona horaria
    const mes = String(fechaObj.getUTCMonth() + 1).padStart(2, '0'); // getUTCMonth() empieza en 0, así que sumamos 1
    const anio = fechaObj.getUTCFullYear().toString().slice(-2); // Los dos últimos dígitos del año
    return `${dia} ${mes} ${anio}`;
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
      // Para Unilever, usamos la fecha formateada como "dd mm aa"
      const fechaFormateada = formatearFecha(fecha);
      nuevoCodigo = `${fechaFormateada}<br />PY5${diaDelAnio.toString().padStart(3, '0')}11`; // Usamos <br /> para el salto de línea
    } else if (producto === 'diverseyDrastik') {
      // Para Diversey Drastik, incluir "Fab: <fecha>" con el formato "dd/mm/aa"
      const fechaFormateada = formatearFecha(fecha).replace(/ /g, '/');
      nuevoCodigo = `725${diaDelAnio.toString().padStart(3, '0')}01 - Fab: ${fechaFormateada}`;
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
          {/* Usamos dangerouslySetInnerHTML para que el <br /> funcione */}
          <p dangerouslySetInnerHTML={{ __html: codigo }}></p>
        </div>
      )}
    </div>
  );
}

export default App;
