import React, { useState, useEffect } from "react";

import UserForm from "./components/UserForm";
import UserList from "./components/UserList";
import ProductForm from "./components/ProductForm";
import ProductList from "./components/ProductList";

function App() {
  const [activeTab, setActiveTab] = useState(null); 
  const [users, setUsers] = useState([]);
  const [products, setProducts] = useState([]);

  
  const fetchUsers = async () => {
    const res = await fetch("http://localhost:5000/api/users");
    const data = await res.json();
    setUsers(data);
  };

 
  const fetchProducts = async () => {
    const res = await fetch("http://localhost:5000/api/products");
    const data = await res.json();
    setProducts(data);
  };

  useEffect(() => {
    fetchUsers();
    fetchProducts();
  }, []);

  return (
    <div className="container mt-5">
      <h1 className="text-center mb-4">Aplicación Web Funcional</h1>

    
      <div className="mb-4 d-flex gap-2 justify-content-center">
        <button
          className="btn btn-primary"
          onClick={() => setActiveTab("usuarios")}
        >
          Usuarios
        </button>

        <button
          className="btn btn-success"
          onClick={() => setActiveTab("productos")}
        >
          Productos y Servicios
        </button>
      </div>

      {activeTab === "usuarios" && (
        <div>
          <UserForm fetchUsers={fetchUsers} />
          <UserList users={users} fetchUsers={fetchUsers} />
        </div>
      )}

      {activeTab === "productos" && (
        <div>
          <ProductForm fetchProducts={fetchProducts} />
          <ProductList products={products} fetchProducts={fetchProducts} />
        </div>
      )}
    </div>
  );
}

export default App;