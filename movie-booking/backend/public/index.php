<?php
use Psr\Http\Message\ResponseInterface as Response;
use Psr\Http\Message\ServerRequestInterface as Request;
use Slim\Factory\AppFactory;
use Tuupola\Middleware\CorsMiddleware;

require __DIR__ . '/../vendor/autoload.php';

$app = AppFactory::create();

// Add CORS Middleware
$app->add(new CorsMiddleware([
    "origin" => ["*"],
    "methods" => ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    "headers.allow" => ["Authorization", "If-Match", "If-Unmodified-Since", "Content-Type", "Accept"],
    "headers.expose" => [],
    "credentials" => false,
    "cache" => 0,
]));

// SQLite Connection
$db_file = __DIR__ . '/../movie_booking.sqlite';

try {
    $db = new PDO("sqlite:$db_file");
    $db->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    $db->setAttribute(PDO::ATTR_DEFAULT_FETCH_MODE, PDO::FETCH_ASSOC);
} catch (PDOException $e) {
    die(json_encode(['error' => 'Database connection failed: ' . $e->getMessage()]));
}

// Get all movies
$app->get('/api/movies', function (Request $request, Response $response) use ($db) {
    $stmt = $db->query("SELECT * FROM movies");
    $movies = $stmt->fetchAll();
    $response->getBody()->write(json_encode($movies));
    return $response->withHeader('Content-Type', 'application/json');
});

// Get movie by ID
$app->get('/api/movies/{id}', function (Request $request, Response $response, array $args) use ($db) {
    $stmt = $db->prepare("SELECT * FROM movies WHERE id = ?");
    $stmt->execute([$args['id']]);
    $movie = $stmt->fetch();

    if (!$movie) {
        $response->getBody()->write(json_encode(['error' => 'Movie not found']));
        return $response->withHeader('Content-Type', 'application/json')->withStatus(404);
    }

    $response->getBody()->write(json_encode($movie));
    return $response->withHeader('Content-Type', 'application/json');
});

// Get showtimes for a movie
$app->get('/api/showtimes/{movie_id}', function (Request $request, Response $response, array $args) use ($db) {
    $stmt = $db->prepare("SELECT * FROM showtimes WHERE movie_id = ?");
    $stmt->execute([$args['movie_id']]);
    $showtimes = $stmt->fetchAll();

    $response->getBody()->write(json_encode($showtimes));
    return $response->withHeader('Content-Type', 'application/json');
});

// Get booked seats for a showtime
$app->get('/api/bookings/{showtime_id}', function (Request $request, Response $response, array $args) use ($db) {
    $stmt = $db->prepare("SELECT seat_number FROM bookings WHERE showtime_id = ?");
    $stmt->execute([$args['showtime_id']]);
    $bookedSeats = $stmt->fetchAll(PDO::FETCH_COLUMN);

    $response->getBody()->write(json_encode($bookedSeats));
    return $response->withHeader('Content-Type', 'application/json');
});

// Create a booking
$app->post('/api/bookings', function (Request $request, Response $response) use ($db) {
    $data = json_decode($request->getBody()->getContents(), true);

    if (!isset($data['showtime_id'], $data['customer_name'], $data['customer_email'], $data['seat_number'])) {
        $response->getBody()->write(json_encode(['error' => 'Missing required fields']));
        return $response->withHeader('Content-Type', 'application/json')->withStatus(400);
    }

    // Check if seat is already booked
    $stmt = $db->prepare("SELECT id FROM bookings WHERE showtime_id = ? AND seat_number = ?");
    $stmt->execute([$data['showtime_id'], $data['seat_number']]);
    if ($stmt->fetch()) {
        $response->getBody()->write(json_encode(['error' => 'Seat already booked']));
        return $response->withHeader('Content-Type', 'application/json')->withStatus(400);
    }

    $stmt = $db->prepare("INSERT INTO bookings (showtime_id, customer_name, customer_email, seat_number) VALUES (?, ?, ?, ?)");
    $stmt->execute([
        $data['showtime_id'],
        $data['customer_name'],
        $data['customer_email'],
        $data['seat_number']
    ]);

    $response->getBody()->write(json_encode(['message' => 'Booking successful', 'id' => $db->lastInsertId()]));
    return $response->withHeader('Content-Type', 'application/json')->withStatus(201);
});

$app->run();
