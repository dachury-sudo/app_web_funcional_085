import React, { useState } from "react";
import UserForm from "./UserForm";
import ProductForm from "./ProductForm"; 

function Dashboard() {
  const [activeTab, setActiveTab] = useState("usuarios");

  const [users, setUsers] = useState([]);
  const [products, setProducts] = useState([]);

  
  const fetchUsers = () => {
    console.log("Fetch Users");
    
  };

  const fetchProducts = () => {
    console.log("Fetch Products/Services");
    
  };

  return (
    <div className="container mt-4">
      
      <div className="mb-4 d-flex gap-2">
        <button
          className={`btn ${activeTab === "usuarios" ? "btn-primary" : "btn-outline-primary"}`}
          onClick={() => setActiveTab("usuarios")}
        >
          Usuarios
        </button>

        <button
          className={`btn ${activeTab === "productos" ? "btn-success" : "btn-outline-success"}`}
          onClick={() => setActiveTab("productos")}
        >
          Productos y Servicios
        </button>
      </div>

      
      {activeTab === "usuarios" && (
        <div>
          <UserForm fetchUsers={fetchUsers} />
          <table className="table table-striped">
            <thead>
              <tr>
                <th>Nombre</th>
                <th>Email</th>
                <th>Password</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user, i) => (
                <tr key={i}>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>{user.password}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {activeTab === "productos" && (
        <div>
          <ProductForm fetchProducts={fetchProducts} />
          <table className="table table-striped">
            <thead>
              <tr>
                <th>Nombre</th>
                <th>Precio</th>
                <th>Descripción</th>
              </tr>
            </thead>
            <tbody>
              {products.map((prod, i) => (
                <tr key={i}>
                  <td>{prod.name}</td>
                  <td>{prod.price}</td>
                  <td>{prod.description}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default Dashboard;