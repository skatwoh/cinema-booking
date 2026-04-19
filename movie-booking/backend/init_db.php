<?php
// SQLite Connection
$db_file = __DIR__ . '/movie_booking.sqlite';

try {
    $pdo = new PDO("sqlite:$db_file");
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    // Drop tables if exist
    $pdo->exec("DROP TABLE IF EXISTS bookings;");
    $pdo->exec("DROP TABLE IF EXISTS showtimes;");
    $pdo->exec("DROP TABLE IF EXISTS movies;");

    // Create tables
    $pdo->exec("CREATE TABLE movies (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        title VARCHAR(255),
        description TEXT,
        poster_url VARCHAR(255),
        duration INTEGER
    );");

    $pdo->exec("CREATE TABLE showtimes (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        movie_id INTEGER,
        start_time DATETIME,
        hall VARCHAR(50),
        price DECIMAL(10,2),
        FOREIGN KEY(movie_id) REFERENCES movies(id) ON DELETE CASCADE
    );");

    $pdo->exec("CREATE TABLE bookings (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        showtime_id INTEGER,
        customer_name VARCHAR(100),
        customer_email VARCHAR(100),
        seat_number VARCHAR(10),
        FOREIGN KEY(showtime_id) REFERENCES showtimes(id) ON DELETE CASCADE
    );");

    // Seed data
    $movies = [
        ['Avatar: The Way of Water', 'Jake Sully lives with his newfound family formed on the extrasolar moon Pandora.', 'https://image.tmdb.org/t/p/w500/t6Sna4_Y7LfaZ1Iolv3ZqZp9ZpP.jpg', 192],
        ['Oppenheimer', 'The story of American scientist J. Robert Oppenheimer and his role in the development of the atomic bomb.', 'https://image.tmdb.org/t/p/w500/8GxvPruDbuyLTSglBs3Yxs1YZp3.jpg', 180],
        ['The Dark Knight', 'When the menace known as the Joker wreaks havoc and chaos on the people of Gotham, Batman must accept one of the greatest psychological and physical tests of his ability to fight injustice.', 'https://image.tmdb.org/t/p/w500/qJ2tW6WMUDp9QmSJJVI9p07YvY4.jpg', 152]
    ];

    $stmt = $pdo->prepare("INSERT INTO movies (title, description, poster_url, duration) VALUES (?, ?, ?, ?)");
    foreach ($movies as $movie) {
        $stmt->execute($movie);
    }

    $pdo->exec("INSERT INTO showtimes (movie_id, start_time, hall, price) VALUES (1, '2025-05-20 18:00:00', 'Hall A', 150000);");
    $pdo->exec("INSERT INTO showtimes (movie_id, start_time, hall, price) VALUES (1, '2025-05-20 21:00:00', 'Hall A', 150000);");
    $pdo->exec("INSERT INTO showtimes (movie_id, start_time, hall, price) VALUES (2, '2025-05-20 19:00:00', 'Hall B', 120000);");
    $pdo->exec("INSERT INTO showtimes (movie_id, start_time, hall, price) VALUES (3, '2025-05-20 20:00:00', 'Hall C', 100000);");

    echo "SQLite Database initialized and seeded successfully at $db_file\n";

} catch (PDOException $e) {
    die("Error: " . $e->getMessage());
}
