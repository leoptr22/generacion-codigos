import React, { useState } from 'react';
import './App.css';

function App() {
  const [fecha, setFecha] = useState('');
  const [producto, setProducto] = useState('diversey');
  const [codigo, setCodigo] = useState('');

  // Crea fecha local evitando desfase por zona horaria
  const crearFechaLocal = (fechaStr) => {
    const [anio, mes, dia] = fechaStr.split('-').map(Number);
    return new Date(anio, mes - 1, dia);
  };

  // dia del año
  const getDiaDelAnio = (fechaStr) => {
    const date = crearFechaLocal(fechaStr);
    const start = new Date(date.getFullYear(), 0, 0);

    const diff = date - start;
    const oneDay = 1000 * 60 * 60 * 24;

    return Math.floor(diff / oneDay);
  };

  // Formatea fecha DD MM AA
  const formatearFecha = (fechaStr) => {
    const date = crearFechaLocal(fechaStr);

    const dia = String(date.getDate()).padStart(2, '0');
    const mes = String(date.getMonth() + 1).padStart(2, '0');
    const anio = date.getFullYear().toString().slice(-2);

    return `${dia} ${mes} ${anio}`;
  };

  const generarCodigo = () => {
    if (!fecha) {
      alert('Por favor, ingrese una fecha.');
      return;
    }

    const date = crearFechaLocal(fecha);
    const diaDelAnio = getDiaDelAnio(fecha);
    const anio = date.getFullYear().toString().slice(-2);

    let nuevoCodigo = '';

    if (producto === 'diversey') {
      nuevoCodigo = `PY${anio}${diaDelAnio.toString().padStart(3, '0')}01`;

    } else if (producto === 'unilever') {
      const fechaFormateada = formatearFecha(fecha);

      nuevoCodigo =
        `${fechaFormateada}<br />PY${anio}${diaDelAnio
          .toString()
          .padStart(3, '0')}11`;

    } else if (producto === 'diverseyDrastik') {
      const fechaFormateada = formatearFecha(fecha).replace(/ /g, '/');

      nuevoCodigo =
        `PY${anio}${diaDelAnio.toString().padStart(3, '0')}01 - Fab: ${fechaFormateada}`;

    } else if (producto === 'Magistral lavavajillas') {
      nuevoCodigo =
        `PY${anio}${diaDelAnio.toString().padStart(3, '0')}`;
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

        <select
          value={producto}
          onChange={(e) => setProducto(e.target.value)}
        >
          <option value="diversey">Diversey</option>
          <option value="unilever">Unilever</option>
          <option value="diverseyDrastik">Diversey Drastik</option>
          <option value="Magistral lavavajillas">
            Magistral lavavajillas
          </option>
        </select>
      </div>

      <button onClick={generarCodigo}>
        Generar Código
      </button>

      {codigo && (
        <div>
          <h2>Código Generado:</h2>

          <p
            dangerouslySetInnerHTML={{
              __html: codigo
            }}
          ></p>
        </div>
      )}
    </div>
  );
}

export default App;