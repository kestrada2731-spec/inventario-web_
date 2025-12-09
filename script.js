const form = document.getElementById("inventoryForm");
const table = document.getElementById("inventoryTable");
let editIndex = null;

function cargarInventario() {
  const data = JSON.parse(localStorage.getItem("inventarioEquipos")) || [];
  table.innerHTML = "";

  data.forEach((item, index) => {
    const row = `<tr>
      <td data-label='Modelo'>${item.modelo}</td>
      <td data-label='Cantidad'>${item.cantidad}</td>
      <td data-label='Estado'>${item.estado}</td>
      <td data-label='Acciones'>
        <button onclick="editarItem(${index})">Editar</button>
        <button onclick="eliminarItem(${index})">Eliminar</button>
      </td>
    </tr>`;
    table.innerHTML += row;
    const lastRow = table.lastElementChild;
    lastRow.style.animation = "pop 0.3s ease";
  });
}

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const modelo = document.getElementById("modelo").value;
  const cantidad = document.getElementById("cantidad").value;
  const estado = document.getElementById("estado").value;

  const nuevo = { modelo, cantidad, estado };
  const inventario = JSON.parse(localStorage.getItem("inventarioEquipos")) || [];

  if (editIndex !== null) {
    inventario[editIndex] = nuevo;
    editIndex = null;
  } else {
    inventario.push(nuevo);
  }

  localStorage.setItem("inventarioEquipos", JSON.stringify(inventario));
  form.reset();
  cargarInventario();
});

function eliminarItem(index) {
  const inventario = JSON.parse(localStorage.getItem("inventarioEquipos")) || [];
  inventario.splice(index, 1);
  localStorage.setItem("inventarioEquipos", JSON.stringify(inventario));
  cargarInventario();
}

function editarItem(index) {
  const inventario = JSON.parse(localStorage.getItem("inventarioEquipos")) || [];
  const item = inventario[index];

  document.getElementById("modelo").value = item.modelo;
  document.getElementById("cantidad").value = item.cantidad;
  document.getElementById("estado").value = item.estado;

  editIndex = index;
}

cargarInventario();