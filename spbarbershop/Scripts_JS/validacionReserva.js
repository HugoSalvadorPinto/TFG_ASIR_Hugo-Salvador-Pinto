// TFG ASIR - HUGO SALVADOR PINTO - 2024/2025

// Espera a que el DOM esté completamente cargado
document.addEventListener('DOMContentLoaded', function () {

    // Añade un evento al formulario cuando se intenta enviar
    document.querySelector('form').addEventListener('submit', function(event) {
        // Captura los valores de los campos del formulario
        const fecha_cita = document.getElementById('fecha_cita').value;
        const nombre = document.getElementById('nombre').value;
        const telefono = document.getElementById('telefono').value;
        const email = document.getElementById('email').value;

        // Verifica que todos los campos estén completados
        if (!fecha_cita || !nombre || !telefono || !email) {
            alert("Por favor, completa todos los campos.");
            event.preventDefault(); // Cancela el envío del formulario
            return; // Finaliza la función
        }

        // Convierte la fecha ingresada a objeto Date para validación de horario
        const fechaObj = new Date(fecha_cita);
        const dia = fechaObj.getDay(); // Día de la semana (0=Domingo, 1=Lunes, ..., 6=Sábado)
        const hora = fechaObj.getHours(); // Hora seleccionada

        // Valida que la cita esté dentro del horario de atención
        if (
            dia === 0 || // Domingo
            (dia >= 1 && dia <= 5 && (hora < 9 || hora > 19)) || // Lunes a viernes: 9:00-19:00
            (dia === 6 && (hora < 10 || hora > 17)) // Sábados: 10:00-17:00
        ) {
            alert("Por favor, elige una fecha y hora dentro del horario de la barbería:\n\n" +
                "Lunes a Viernes: 9:00 AM - 7:00 PM\n" +
                "Sábados: 10:00 AM - 5:00 PM\n" +
                "Domingos: Cerrado.");
            event.preventDefault(); // Cancela el envío si no cumple horarios
        }
    });
});