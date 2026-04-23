import React, { useState } from 'react';
import './App.css';

function App() {
  const [fecha, setFecha] = useState('');
  const [producto, setProducto] = useState('diversey');
  const [codigo, setCodigo] = useState('');

  const getDiaDelAnio = (fechaStr) => {
    const date = new Date(fechaStr);
    const start = new Date(date.getFullYear(), 0, 0);
    const diff = date - start;
    const oneDay = 1000 * 60 * 60 * 24;
    return Math.floor(diff / oneDay);
  };

  const formatearFecha = (fechaStr) => {
    const fechaObj = new Date(fechaStr);
    const dia = String(fechaObj.getDate()).padStart(2, '0');
    const mes = String(fechaObj.getMonth() + 1).padStart(2, '0');
    const anio = fechaObj.getFullYear().toString().slice(-2);
    return `${dia} ${mes} ${anio}`;
  };

  const generarCodigo = () => {
    if (!fecha) {
      alert('Por favor, ingrese una fecha.');
      return;
    }

    const date = new Date(fecha);
    const diaDelAnio = getDiaDelAnio(fecha);
    const año = date.getFullYear().toString().slice(-2);

    let nuevoCodigo = '';

    if (producto === 'diversey') {
      nuevoCodigo = `PY${año}${diaDelAnio.toString().padStart(3, '0')}01`;

    } else if (producto === 'unilever') {
      const fechaFormateada = formatearFecha(fecha);
      nuevoCodigo = `${fechaFormateada}<br />PY${año}${diaDelAnio.toString().padStart(3, '0')}11`;

    } else if (producto === 'diverseyDrastik') {
      const fechaFormateada = formatearFecha(fecha).replace(/ /g, '/');
      nuevoCodigo = `PY${año}${diaDelAnio.toString().padStart(3, '0')}01 - Fab: ${fechaFormateada}`;

    } else if (producto === 'Magistral lavavajillas') {
      const fechaFormateada = formatearFecha(fecha).replace(/ /g, '/');
      nuevoCodigo = `PY${año}${diaDelAnio.toString().padStart(3, '0')} `;
    }

    setCodigo(nuevoCodigo);
  };

  return (
    <div className="App">
      <img src="/descarga.png" alt="Logo" />
      <h1>Generador de Código</h1>

      <div>
        <label>Fecha:</label>
        <input
          type="date"
          value={fecha}
          onChange={(e) => setFecha(e.target.value)}
        />
      </div>

      <div>
        <label>Producto:</label>
        <select value={producto} onChange={(e) => setProducto(e.target.value)}>
          <option value="diversey">Diversey</option>
          <option value="unilever">Unilever</option>
          <option value="diverseyDrastik">Diversey Drastik</option>
          <option value="Magistral lavavajillas">Magistral lavavajillas</option>
        </select>
      </div>

      <button onClick={generarCodigo}>Generar Código</button>

      {codigo && (
        <div>
          <h2>Código Generado:</h2>
          <p dangerouslySetInnerHTML={{ __html: codigo }}></p>
        </div>
      )}
    </div>
  );
}

export default App;