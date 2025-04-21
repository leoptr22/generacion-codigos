import React, { useEffect, useState } from 'react';

const LotesComponent = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedProduct, setSelectedProduct] = useState('');
  const [selectedTipo, setSelectedTipo] = useState(''); // lonza líquido o sólido

  // Cargar datos desde Google Sheets
  useEffect(() => {
    const url = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vQK7wYInJH3vHtui5yV0aLlQYEj-KZUqiyyk0_cWl_JIyiHp3TISY7eXyW8Ro3fjQ/pubhtml';

    const fetchData = async () => {
      try {
        const response = await fetch(url);
        const html = await response.text();
        const parser = new DOMParser();
        const doc = parser.parseFromString(html, 'text/html');

        const rows = doc.querySelectorAll('table tbody tr');
        const lotes = [];

        rows.forEach(row => {
          const cells = row.querySelectorAll('td');
          const nombreProducto = cells[0]?.textContent.trim();
          const numeroLote = cells[1]?.textContent.trim();
          lotes.push({ nombreProducto, numeroLote });
        });

        setData(lotes);
      } catch (err) {
        setError('Error al cargar los datos');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const getLastLote = (productName) => {
    const filteredData = data.filter(item => item.nombreProducto === productName);
    if (filteredData.length > 0) {
      const lastLote = filteredData[filteredData.length - 1];
      return lastLote.numeroLote;
    }
    return 'No disponible';
  };

  const handleProductChange = (event) => {
    setSelectedProduct(event.target.value);
  };

  const handleTipoChange = (event) => {
    setSelectedTipo(event.target.value);
    setSelectedProduct(''); // Resetear selección al cambiar de tipo
  };

  const uniqueProducts = [...new Set(data.map(item => item.nombreProducto))];

  if (loading) return <div>Cargando...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div>
      <h1>Consulta de lotes Lonza</h1>

      {/* Menú principal para elegir tipo de lonza */}
      <div>
        <label htmlFor="tipo-select">Selecciona tipo de lonza:</label>
        <select id="tipo-select" onChange={handleTipoChange} value={selectedTipo}>
          <option value="">Seleccionar tipo</option>
          <option value="liquido">Lonza líquido</option>
          <option value="solido">Lonza sólido</option>
        </select>
      </div>

      {/* Lógica para lonza líquido */}
      {selectedTipo === 'liquido' && (
        <div style={{ marginTop: '1rem' }}>
          <label htmlFor="product-select">Selecciona un producto:</label>
          <select id="product-select" onChange={handleProductChange} value={selectedProduct}>
            <option value="">Seleccionar producto</option>
            {uniqueProducts.map((product, index) => (
              <option key={index} value={product}>{product}</option>
            ))}
          </select>

          {selectedProduct && (
            <div style={{ marginTop: '1rem' }}>
              <h2>Último lote ingresado</h2>
              <p></p>
              <p>Producto: {selectedProduct} N° lote {getLastLote(selectedProduct)}</p>
            </div>
          )}
        </div>
      )}

      {/* Placeholder para lonza sólido */}
      {selectedTipo === 'solido' && (
        <div style={{ marginTop: '1rem' }}>
          <p><strong>Sección "lonza sólido"</strong>: lógica a implementar próximamente.</p>
        </div>
      )}
    </div>
  );
};

export default LotesComponent;
