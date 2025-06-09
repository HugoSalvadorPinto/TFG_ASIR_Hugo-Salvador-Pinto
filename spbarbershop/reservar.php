<?php
// TFG ASIR - HUGO SALVADOR PINTO - 2024/2025

// Configuración de conexión a la base de datos
$host = 'localhost';
$dbname = 'spbarbershop';
$username = 'BarberAdmin';
$password = 'Barber123?';

try {
    // Conectar a la base de datos usando PDO
    $pdo = new PDO("mysql:host=$host;dbname=$dbname", $username, $password);
    // Configurar para mostrar errores si ocurren
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    // Verificar que el formulario fue enviado vía POST
    if ($_SERVER['REQUEST_METHOD'] == 'POST') {
        // Recoger los datos enviados desde el formulario
        $servicio = $_POST['servicio'];
        $fecha_cita = $_POST['fecha_cita'];
        $nombre = $_POST['nombre'];
        $telefono = $_POST['telefono'];
        $email = $_POST['email'];

        // Preparar la consulta SQL para insertar los datos
        $stmt = $pdo->prepare("INSERT INTO reservas (servicio, fecha_cita, nombre, telefono, email) 
                               VALUES (:servicio, :fecha_cita, :nombre, :telefono, :email)");

        // Asociar los valores a los parámetros de la consulta
        $stmt->bindParam(':servicio', $servicio);
        $stmt->bindParam(':fecha_cita', $fecha_cita);
        $stmt->bindParam(':nombre', $nombre);
        $stmt->bindParam(':telefono', $telefono);
        $stmt->bindParam(':email', $email);
        
        // Ejecutar la consulta
        $stmt->execute();
    }
} catch (PDOException $e) {
    // Mostrar mensaje de error si falla la conexión o inserción
    echo "Error: " . $e->getMessage();
}
?>

<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Reserva Exitosa - SP BarberShop</title>

    <!-- Enlace a la hoja de estilos específica de esta página -->
    <link rel="stylesheet" href="Estilos/estiloReservaExitosa.css">
</head>
<body>

    <!-- Contenedor con mensaje de confirmación -->
    <div class="container">
        <h1>✔ Reserva realizada con éxito</h1>
        <p>Tu cita ha sido reservada correctamente.</p>
        <p>Gracias por elegir <strong>SP BarberShop</strong>.</p>

        <!-- Botón para regresar a la página principal -->
        <a href="index.html" class="boton">Volver a la página principal</a>
    </div>

</body>
</html>