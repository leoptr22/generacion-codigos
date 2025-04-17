import React, { useState } from 'react';
import './App.css';

function App() {
  const [fecha, setFecha] = useState('');
  const [producto, setProducto] = useState('diversey');
  const [codigo, setCodigo] = useState('');

  const getDiaDelAnio = (fecha) => {
    const date = new Date(fecha);
    const start = new Date(Date.UTC(date.getFullYear(), 0, 0));
    const diff = date - start;
    const oneDay = 1000 * 60 * 60 * 24;
    return Math.floor(diff / oneDay);
  };

  const formatearFecha = (fecha) => {
    const fechaObj = new Date(fecha);
    const dia = String(fechaObj.getUTCDate()).padStart(2, '0');
    const mes = String(fechaObj.getUTCMonth() + 1).padStart(2, '0');
    const anio = fechaObj.getUTCFullYear().toString().slice(-2);
    return `${dia} ${mes} ${anio}`;
  };

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
      const fechaFormateada = formatearFecha(fecha);
      nuevoCodigo = `${fechaFormateada}<br />PY5${diaDelAnio.toString().padStart(3, '0')}11`;
    } else if (producto === 'diverseyDrastik') {
      const fechaFormateada = formatearFecha(fecha).replace(/ /g, '/');
      nuevoCodigo = `725${diaDelAnio.toString().padStart(3, '0')}01 - Fab: ${fechaFormateada}`;
    }

    setCodigo(nuevoCodigo);
  };

  return (
    <div className="App">
      <img src="/descarga.png" alt="Logo" />
      <h1>Generador de Código</h1>

      <div>
        <label>Fecha:</label>
        <input type="date" value={fecha} onChange={(e) => setFecha(e.target.value)} />
      </div>

      <div>
        <label>Producto:</label>
        <select value={producto} onChange={(e) => setProducto(e.target.value)}>
          <option value="diversey">Diversey</option>
          <option value="unilever">Unilever</option>
          <option value="diverseyDrastik">Diversey Drastik</option>
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
