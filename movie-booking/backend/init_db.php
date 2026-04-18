<?php
// MySQL Connection (XAMPP Default)
$host = '127.0.0.1';
$username = 'root';
$password = '';
$db_name = 'movie_booking';

try {
    $pdo = new PDO("mysql:host=$host", $username, $password);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    // Create Database
    $pdo->exec("CREATE DATABASE IF NOT EXISTS `$db_name` CHARACTER SET utf8 COLLATE utf8_general_ci;");
    $pdo->exec("USE `$db_name`;");

    // Drop tables if exist
    $pdo->exec("SET FOREIGN_KEY_CHECKS = 0;");
    $pdo->exec("DROP TABLE IF EXISTS bookings, showtimes, movies;");
    $pdo->exec("SET FOREIGN_KEY_CHECKS = 1;");

    // Create tables
    $pdo->exec("CREATE TABLE movies (
        id INT AUTO_INCREMENT PRIMARY KEY,
        title VARCHAR(255),
        description TEXT,
        poster_url VARCHAR(255),
        duration INT
    );");

    $pdo->exec("CREATE TABLE showtimes (
        id INT AUTO_INCREMENT PRIMARY KEY,
        movie_id INT,
        start_time DATETIME,
        hall VARCHAR(50),
        price DECIMAL(10,2),
        FOREIGN KEY(movie_id) REFERENCES movies(id) ON DELETE CASCADE
    );");

    $pdo->exec("CREATE TABLE bookings (
        id INT AUTO_INCREMENT PRIMARY KEY,
        showtime_id INT,
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

    echo "MySQL Database '$db_name' initialized and seeded successfully!\n";

} catch (PDOException $e) {
    die("Error: " . $e->getMessage());
}
