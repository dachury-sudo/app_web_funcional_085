import React, { useState } from "react";

function UserList({ users, fetchUsers }) {

const [editingUser, setEditingUser] = useState(null);

const deleteUser = async (id) => {

if(!window.confirm("¿Eliminar usuario?")) return;

await fetch("http://localhost:5000/api/users/" + id,{
method:"DELETE"
});

fetchUsers();
}

const updateUser = async () => {

await fetch("http://localhost:5000/api/users/" + editingUser._id,{
method:"PUT",
headers:{
"Content-Type":"application/json"
},
body:JSON.stringify(editingUser)
});

setEditingUser(null);
fetchUsers();
}

return(

<div className="card shadow p-4">

<h3 className="mb-1">Gestión de Usuarios</h3>

<p className="text-muted mb-3">
Total de usuarios: {users.length}
</p>

<table className="table table-bordered table-hover table-striped">

<thead className="table-dark">

<tr>
<th>Nombre</th>
<th>Email</th>
<th>Acciones</th>
</tr>

</thead>

<tbody>

{users.map(user => (

<tr key={user._id}>

<td>{user.name}</td>
<td>{user.email}</td>

<td>

<button
className="btn btn-warning btn-sm me-2"
onClick={()=>setEditingUser(user)}
>
<i className="bi bi-pencil"></i> Editar
</button>

<button
className="btn btn-danger btn-sm"
onClick={()=>deleteUser(user._id)}
>
<i className="bi bi-trash"></i> Eliminar
</button>

</td>

</tr>

))}

</tbody>

</table>


{editingUser && (

<div className="modal fade show d-block">

<div className="modal-dialog">

<div className="modal-content">

<div className="modal-header">

<h5 className="modal-title">Editar Usuario</h5>

<button
className="btn-close"
onClick={()=>setEditingUser(null)}
></button>

</div>

<div className="modal-body">

<input
className="form-control mb-2"
value={editingUser.name}
onChange={(e)=>setEditingUser({...editingUser,name:e.target.value})}
/>

<input
className="form-control mb-2"
value={editingUser.email}
onChange={(e)=>setEditingUser({...editingUser,email:e.target.value})}
/>

</div>

<div className="modal-footer">

<button
className="btn btn-secondary"
onClick={()=>setEditingUser(null)}
>
Cancelar
</button>

<button
className="btn btn-success"
onClick={updateUser}
>
Guardar
</button>

</div>

</div>

</div>

</div>

)}

</div>

)

}

export default UserList;