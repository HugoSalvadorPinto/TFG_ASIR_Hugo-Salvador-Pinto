// TFG ASIR - HUGO SALVADOR PINTO - 2024/2025

// Contraseña que controla la edición de reseñas (modo administrador)
const adminPassword = 'admin';

// Función que muestra todas las reseñas almacenadas en localStorage
function mostrarReseñas() {
    const reseñas = JSON.parse(localStorage.getItem('reseñas')) || []; // Obtener reseñas o array vacío
    const listadoReseñas = document.getElementById('listadoReseñas');
    listadoReseñas.innerHTML = ''; // Limpiar la sección antes de volver a renderizar

    // Recorrer y mostrar cada reseña con sus botones de editar y eliminar
    reseñas.forEach((reseña, index) => {
        const div = document.createElement('div');
        div.classList.add('reseña');
        div.innerHTML = `
            <p><strong>${reseña.nombre_cliente}</strong> - ${reseña.fecha}</p>
            <p>${reseña.comentario}</p>
            <button class="editar" data-index="${index}">Editar</button>
            <button class="eliminar" data-index="${index}">Eliminar</button>
        `;
        listadoReseñas.appendChild(div);
    });

    // Asociar funcionalidad a los botones de eliminar
    document.querySelectorAll('.eliminar').forEach(button => {
        button.addEventListener('click', function() {
            const index = this.dataset.index;
            if (confirm('¿Seguro que quieres eliminar esta reseña?')) {
                eliminarReseña(index);
            }
        });
    });

    // Asociar funcionalidad a los botones de editar
    document.querySelectorAll('.editar').forEach(button => {
        button.addEventListener('click', function() {
            const index = this.dataset.index;
            editarReseña(index);
        });
    });
}

// Manejar el envío del formulario de reseña
document.getElementById('reseñaForm').addEventListener('submit', function(e) {
    e.preventDefault(); // Prevenir el comportamiento por defecto (recarga de página)

    const nombreCliente = document.getElementById('nombre_cliente').value;
    const comentario = document.getElementById('comentario').value;

    // Si ambos campos están completos, se procede a guardar
    if (nombreCliente && comentario) {
        const nuevaReseña = {
            nombre_cliente: nombreCliente,
            comentario: comentario,
            fecha: new Date().toLocaleString() // Fecha actual en formato legible
        };

        // Guardar en localStorage
        const reseñas = JSON.parse(localStorage.getItem('reseñas')) || [];
        reseñas.push(nuevaReseña);
        localStorage.setItem('reseñas', JSON.stringify(reseñas));

        // Limpiar campos del formulario
        document.getElementById('nombre_cliente').value = '';
        document.getElementById('comentario').value = '';

        // Mostrar reseñas actualizadas
        mostrarReseñas();
    }
});

// Función que elimina una reseña por su índice
function eliminarReseña(index) {
    const reseñas = JSON.parse(localStorage.getItem('reseñas')) || [];
    reseñas.splice(index, 1);  // Eliminar del array
    localStorage.setItem('reseñas', JSON.stringify(reseñas)); // Guardar cambios
    mostrarReseñas(); // Volver a renderizar
}

// Función para editar una reseña (requiere contraseña de administrador)
function editarReseña(index) {
    const reseñas = JSON.parse(localStorage.getItem('reseñas')) || [];
    const reseña = reseñas[index];
    
    // Solicitar contraseña antes de permitir editar
    const password = prompt('Introduce la contraseña para editar la reseña:');
    
    if (password === adminPassword) {
        const nuevoComentario = prompt('Edita tu reseña:', reseña.comentario);
        
        if (nuevoComentario !== null && nuevoComentario !== '') {
            reseña.comentario = nuevoComentario;
            reseñas[index] = reseña;
            localStorage.setItem('reseñas', JSON.stringify(reseñas));
            mostrarReseñas();
        }
    } else {
        alert('Contraseña incorrecta. Solo el administrador puede editar reseñas.');
    }
}

// Cargar reseñas automáticamente cuando la página termine de cargar
document.addEventListener('DOMContentLoaded', mostrarReseñas);