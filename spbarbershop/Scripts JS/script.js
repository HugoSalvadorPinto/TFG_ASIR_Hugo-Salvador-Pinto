document.addEventListener('DOMContentLoaded', function () {
    // Validación de formulario al enviarlo
    document.querySelector('form').addEventListener('submit', function(event) {
        const fecha = document.getElementById('fecha').value;
        const nombre = document.getElementById('nombre').value;
        const telefono = document.getElementById('telefono').value;
        const email = document.getElementById('email').value;

        // Verificar si algún campo está vacío
        if (!fecha || !nombre || !telefono || !email) {
            alert("Por favor, completa todos los campos.");
            event.preventDefault(); // Evitar el envío del formulario
            return; // Detener la ejecución del código
        }

        // Convertir la fecha seleccionada en un objeto Date
        const fechaObj = new Date(fecha);
        const dia = fechaObj.getDay(); // Día de la semana (0 = Domingo, 1 = Lunes, ..., 6 = Sábado)
        const hora = fechaObj.getHours(); // Hora seleccionada (de 0 a 23)

        // Validación de horarios
        if (
            dia === 0 || // Domingo
            (dia >= 1 && dia <= 5 && (hora < 9 || hora > 19)) || // Lunes a viernes, fuera del rango 9:00-19:00
            (dia === 6 && (hora < 10 || hora > 17)) // Sábados, fuera del rango 10:00-17:00
        ) {
            alert("Por favor, elige una fecha y hora dentro del horario de la barbería:\n\n" +
                "Lunes a Viernes: 9:00 AM - 7:00 PM\n" +
                "Sábados: 10:00 AM - 5:00 PM\n" +
                "Domingos: Cerrado.");
            event.preventDefault(); // Evitar el envío del formulario
        }
    });
});