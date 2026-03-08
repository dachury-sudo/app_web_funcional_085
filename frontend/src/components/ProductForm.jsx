import React, { useState } from "react";

function ProductForm({ fetchProducts }) {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("http://localhost:5000/api/products", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, price, description })
      });

      const data = await res.json();

      console.log("Producto/Servicio creado:", data);

      
      setName("");
      setPrice("");
      setDescription("");

      
      fetchProducts(data);
    } catch (error) {
      console.error("Error al crear producto/servicio:", error);
    }
  };

  return (
    <div className="card shadow p-4 mb-4">
      <h3 className="mb-3">Crear Producto o Servicio</h3>

      <form onSubmit={handleSubmit}>
        <input
          className="form-control mb-2"
          placeholder="Nombre"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />

        <input
          className="form-control mb-2"
          placeholder="Precio"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          required
        />

        <input
          className="form-control mb-3"
          placeholder="Descripción"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />

        <button className="btn btn-success w-100">
          Guardar Producto
        </button>
      </form>
    </div>
  );
}

export default ProductForm;