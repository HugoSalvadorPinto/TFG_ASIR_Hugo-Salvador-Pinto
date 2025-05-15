// Contraseña de administrador (solo tú la conocerás)
const adminPassword = 'admin';

// Función para mostrar las reseñas guardadas
function mostrarReseñas() {
    const reseñas = JSON.parse(localStorage.getItem('reseñas')) || [];
    const listadoReseñas = document.getElementById('listadoReseñas');
    listadoReseñas.innerHTML = ''; // Limpiar las reseñas previas

    // Mostrar cada reseña guardada
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

    // Añadir eventos de eliminar y editar
    document.querySelectorAll('.eliminar').forEach(button => {
        button.addEventListener('click', function() {
            const index = this.dataset.index;
            if (confirm('¿Seguro que quieres eliminar esta reseña?')) {
                eliminarReseña(index);
            }
        });
    });

    document.querySelectorAll('.editar').forEach(button => {
        button.addEventListener('click', function() {
            const index = this.dataset.index;
            editarReseña(index);
        });
    });
}

// Función para agregar una nueva reseña
document.getElementById('reseñaForm').addEventListener('submit', function(e) {
    e.preventDefault();

    const nombreCliente = document.getElementById('nombre_cliente').value;
    const comentario = document.getElementById('comentario').value;

    if (nombreCliente && comentario) {
        const nuevaReseña = {
            nombre_cliente: nombreCliente,
            comentario: comentario,
            fecha: new Date().toLocaleString()
        };

        // Recuperar las reseñas existentes, agregar la nueva y guardarlas de nuevo
        const reseñas = JSON.parse(localStorage.getItem('reseñas')) || [];
        reseñas.push(nuevaReseña);
        localStorage.setItem('reseñas', JSON.stringify(reseñas));

        // Limpiar el formulario y mostrar la nueva reseña
        document.getElementById('nombre_cliente').value = '';
        document.getElementById('comentario').value = '';
        mostrarReseñas();
    }
});

// Función para eliminar reseña
function eliminarReseña(index) {
    const reseñas = JSON.parse(localStorage.getItem('reseñas')) || [];
    reseñas.splice(index, 1);  // Eliminar la reseña por índice
    localStorage.setItem('reseñas', JSON.stringify(reseñas));
    mostrarReseñas();
}

// Función para editar reseña
function editarReseña(index) {
    const reseñas = JSON.parse(localStorage.getItem('reseñas')) || [];
    const reseña = reseñas[index];
    
    // Pedir la contraseña de administrador
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

// Mostrar las reseñas al cargar la página
document.addEventListener('DOMContentLoaded', mostrarReseñas);