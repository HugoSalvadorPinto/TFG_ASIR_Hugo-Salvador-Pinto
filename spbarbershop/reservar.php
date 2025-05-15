<?php
$host = 'localhost';
$dbname = 'spbarbershop';
$username = 'root';
$password = '';

try {
    // Conectar a la base de datos
    $pdo = new PDO("mysql:host=$host;dbname=$dbname", $username, $password);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    if ($_SERVER['REQUEST_METHOD'] == 'POST') {
        $corte = $_POST['corte'];
        $fecha = $_POST['fecha'];
        $nombre = $_POST['nombre'];
        $telefono = $_POST['telefono'];
        $email = $_POST['email'];

        // Insertar los datos en la base de datos
        $stmt = $pdo->prepare("INSERT INTO reservas (corte, fecha, nombre, telefono, email) 
                               VALUES (:corte, :fecha, :nombre, :telefono, :email)");
        $stmt->bindParam(':corte', $corte);
        $stmt->bindParam(':fecha', $fecha);
        $stmt->bindParam(':nombre', $nombre);
        $stmt->bindParam(':telefono', $telefono);
        $stmt->bindParam(':email', $email);
        
        $stmt->execute();
    }
} catch (PDOException $e) {
    echo "Error: " . $e->getMessage();
}
?>

<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Reserva Exitosa - SP BarberShop</title>
    <link rel="stylesheet" href="Estilos/estiloreservaexitosa.css">
</head>
<body>

    <div class="container">
        <h1>✔ Reserva realizada con éxito</h1>
        <p>Tu cita ha sido reservada correctamente.</p>
        <p>Gracias por elegir <strong>SP BarberShop</strong>.</p>
        <a href="index.html" class="boton">Volver a la página principal</a>
    </div>

</body>
</html>