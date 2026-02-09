<?php
// 1. Cabeceras CORS obligatorias (Permiten que React se comunique con PHP)
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
header("Access-Control-Allow-Methods: POST, OPTIONS");

// 2. Responder OK a la verificación previa del navegador (Preflight)
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

header("Content-Type: application/json");

// 3. Leer datos enviados desde React
$input = json_decode(file_get_contents('php://input'), true);

if (!$input) {
    echo json_encode(['error' => 'No se recibieron datos']);
    exit;
}

$email = $input['email'] ?? '';
$pass = $input['password'] ?? '';
$config = $input['db_config'] ?? null;

if (!$config) {
    http_response_code(400);
    echo json_encode(['error' => 'Falta configuración de base de datos']);
    exit;
}

// 4. Conectar a MySQL
$mysqli = new mysqli($config['host'], $config['user'], $config['password'], $config['database'], $config['port']);

if ($mysqli->connect_error) {
    http_response_code(500);
    echo json_encode(['error' => 'Error de conexión MySQL: ' . $mysqli->connect_error]);
    exit;
}

// 5. Validar usuario
$stmt = $mysqli->prepare("SELECT * FROM users WHERE email = ? AND password = ? LIMIT 1");
$stmt->bind_param("ss", $email, $pass);
$stmt->execute();
$result = $stmt->get_result();

if ($row = $result->fetch_assoc()) {
    echo json_encode($row);
} else {
    http_response_code(401);
    echo json_encode(['error' => 'Credenciales incorrectas']);
}

$mysqli->close();
?>