import React, { useState } from "react";

function UserForm({ fetchUsers }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("http://localhost:5000/api/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password })
      });

      const data = await res.json();

      console.log("Usuario creado:", data);

      setName("");
      setEmail("");
      setPassword("");

      fetchUsers(data);
    } catch (error) {
      console.error("Error al crear usuario:", error);
    }
  };

  return (
    <div className="card shadow p-4 mb-4">
      <h3 className="mb-3">
        <i className="bi bi-person-plus me-2"></i>
        Crear Usuario
      </h3>

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
          placeholder="Email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <input
          className="form-control mb-2"
          placeholder="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button className="btn btn-success w-100">
          <i className="bi bi-save me-2"></i>
          Guardar Usuario
        </button>
      </form>
    </div>
  );
}

export default UserForm;