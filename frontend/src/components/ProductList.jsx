import React, { useState } from "react";

function ProductList({ products = [], fetchProducts }) {

const [editingProduct,setEditingProduct]=useState(null);

const deleteProduct = async(id)=>{

if(!window.confirm("¿Eliminar producto?")) return;

await fetch("http://localhost:5000/api/products/"+id,{
method:"DELETE"
});

fetchProducts();
}

const updateProduct = async()=>{

await fetch("http://localhost:5000/api/products/"+editingProduct._id,{
method:"PUT",
headers:{
"Content-Type":"application/json"
},
body:JSON.stringify(editingProduct)
});

setEditingProduct(null);
fetchProducts();
}

return(

<div className="card shadow-lg p-4 mb-4 border-0">


<div className="d-flex justify-content-between align-items-center mb-3">

<h3 className="mb-0">
<i className="bi bi-box-seam me-2 text-success"></i>
Gestión de Productos y Servicios
</h3>

<div className="alert alert-success py-2 px-3 mb-0">
<i className="bi bi-archive me-1"></i>
Total de productos: <strong>{products.length}</strong>
</div>

</div>


<table className="table table-bordered table-hover table-striped align-middle">

<thead className="table-dark">

<tr>
<th><i className="bi bi-tag"></i> Nombre</th>
<th><i className="bi bi-cash"></i> Precio</th>
<th><i className="bi bi-card-text"></i> Descripción</th>
<th><i className="bi bi-gear"></i> Acciones</th>
</tr>

</thead>

<tbody>

{products.map(product=>(

<tr key={product._id}>

<td className="fw-semibold">
{product.name}
</td>

<td className="text-success fw-bold">
${product.price}
</td>

<td>
{product.description}
</td>

<td>

<button
className="btn btn-warning btn-sm me-2"
onClick={()=>setEditingProduct(product)}
>
<i className="bi bi-pencil"></i> Editar
</button>

<button
className="btn btn-danger btn-sm"
onClick={()=>deleteProduct(product._id)}
>
<i className="bi bi-trash"></i> Eliminar
</button>

</td>

</tr>

))}

</tbody>

</table>


{editingProduct && (

<div className="modal d-block" style={{backgroundColor:"rgba(0,0,0,0.5)"}}>

<div className="modal-dialog">

<div className="modal-content shadow">

<div className="modal-header">

<h5 className="modal-title">
<i className="bi bi-pencil-square me-2"></i>
Editar Producto
</h5>

<button
className="btn-close"
onClick={()=>setEditingProduct(null)}
></button>

</div>

<div className="modal-body">

<label className="form-label">Nombre</label>

<input
className="form-control mb-3"
value={editingProduct.name}
onChange={(e)=>setEditingProduct({...editingProduct,name:e.target.value})}
/>

<label className="form-label">Precio</label>

<input
className="form-control mb-3"
value={editingProduct.price}
onChange={(e)=>setEditingProduct({...editingProduct,price:e.target.value})}
/>

<label className="form-label">Descripción</label>

<textarea
className="form-control"
value={editingProduct.description}
onChange={(e)=>setEditingProduct({...editingProduct,description:e.target.value})}
/>

</div>

<div className="modal-footer">

<button
className="btn btn-secondary"
onClick={()=>setEditingProduct(null)}
>
Cancelar
</button>

<button
className="btn btn-success"
onClick={updateProduct}
>
<i className="bi bi-check-circle"></i> Guardar
</button>

</div>

</div>

</div>

</div>

)}

</div>

)

}

export default ProductList;