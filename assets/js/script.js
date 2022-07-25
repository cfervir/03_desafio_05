const enviarTarea = document.querySelector('#enviarTarea');
const ingresoTareas = document.querySelector('#ingresoTareas');
let totalTareas = document.querySelector('#totalTareas');
let totalListas = document.querySelector('#totalListas');
let tareasIngresadas = [];
let id = 1;

const envioDeTarea = () => {
  let nuevaTarea = document.querySelector('#nuevaTarea').value;
  
  if (nuevaTarea == '') {
    alert('¡Debes ingresar una tarea!');
  } else {
    let cuerpoTarea = {
      id: id++,
      contenido: nuevaTarea,
      lista: false
    };
    
    tareasIngresadas.push(cuerpoTarea);
    tareas(tareasIngresadas);
  };
};

enviarTarea.addEventListener('click', () => { envioDeTarea(); });

let tareas = (arrayTareas) => {

  totalTareas.textContent = arrayTareas.length;
  totalListas.textContent = '';
  let estaOK = 0;

  let contenidoTarea = '';
  for (let laTarea of arrayTareas) {
    contenidoTarea += `
      <tr class="table--body__row">
        <td class="table--body__item" ${laTarea.lista ? 'style="background: #f9f9f9"' : ''}>
          ${laTarea.id}
        </td>
        <td class="table--body__item table--body__item--02" ${laTarea.lista ? 'style="background: #f9f9f9"' : ''}>
          ${laTarea.contenido}
        </td>
        <td class="table--body__item" ${laTarea.lista ? 'style="background: #f9f9f9"' : ''}>
          <input type="checkbox" class="input--realizado" onclick="cambiarTick(${laTarea.id});" ${laTarea.lista ? 'checked disabled' : ''}>
        </td>
        <td class="table--body__item" ${laTarea.lista ? 'style="background: #f9f9f9"' : ''}>
          <button type="submit" class="btn btn--borrar" onclick="borrarTarea(${laTarea.id});">X</button>
        </td>
      </tr>
    `;
    laTarea.lista ? estaOK++ : '';
  };

  totalListas.textContent = estaOK;
  ingresoTareas.innerHTML = contenidoTarea;
};

const cambiarTick = (id) => {
  tareasIngresadas.map((dato) => { dato.id == id ? dato.lista = !dato.lista : ''});
  tareas(tareasIngresadas);
};

const borrarTarea = (id) => {
  let borrado = tareasIngresadas.findIndex((dato) => dato.id == id);
  tareasIngresadas.splice(borrado, 1);
  tareas(tareasIngresadas);
};