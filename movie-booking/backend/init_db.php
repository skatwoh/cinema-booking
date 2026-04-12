<?php
$dbPath = __DIR__ . '/database.sqlite';
if (file_exists($dbPath)) {
    unlink($dbPath);
}

$db = new PDO("sqlite:$dbPath");
$db->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

// Create tables
$db->exec("CREATE TABLE movies (id INTEGER PRIMARY KEY AUTOINCREMENT, title TEXT, description TEXT, poster_url TEXT, duration INTEGER);");
$db->exec("CREATE TABLE showtimes (id INTEGER PRIMARY KEY AUTOINCREMENT, movie_id INTEGER, start_time TEXT, hall TEXT, price REAL, FOREIGN KEY(movie_id) REFERENCES movies(id));");
$db->exec("CREATE TABLE bookings (id INTEGER PRIMARY KEY AUTOINCREMENT, showtime_id INTEGER, customer_name TEXT, customer_email TEXT, seat_number TEXT, FOREIGN KEY(showtime_id) REFERENCES showtimes(id));");

// Seed data
$db->exec("INSERT INTO movies (title, description, poster_url, duration) VALUES ('Avatar: The Way of Water', 'Jake Sully lives with his newfound family formed on the extrasolar moon Pandora.', 'https://image.tmdb.org/t/p/w500/t6Sna4_Y7LfaZ1Iolv3ZqZp9ZpP.jpg', 192);");
$db->exec("INSERT INTO movies (title, description, poster_url, duration) VALUES ('Oppenheimer', 'The story of American scientist J. Robert Oppenheimer and his role in the development of the atomic bomb.', 'https://image.tmdb.org/t/p/w500/8GxvPruDbuyLTSglBs3Yxs1YZp3.jpg', 180);");
$db->exec("INSERT INTO movies (title, description, poster_url, duration) VALUES ('The Dark Knight', 'When the menace known as the Joker wreaks havoc and chaos on the people of Gotham, Batman must accept one of the greatest psychological and physical tests of his ability to fight injustice.', 'https://image.tmdb.org/t/p/w500/qJ2tW6WMUDp9QmSJJVI9p07YvY4.jpg', 152);");

$db->exec("INSERT INTO showtimes (movie_id, start_time, hall, price) VALUES (1, '2025-05-20 18:00:00', 'Hall A', 150000);");
$db->exec("INSERT INTO showtimes (movie_id, start_time, hall, price) VALUES (1, '2025-05-20 21:00:00', 'Hall A', 150000);");
$db->exec("INSERT INTO showtimes (movie_id, start_time, hall, price) VALUES (2, '2025-05-20 19:00:00', 'Hall B', 120000);");
$db->exec("INSERT INTO showtimes (movie_id, start_time, hall, price) VALUES (3, '2025-05-20 20:00:00', 'Hall C', 100000);");

echo "Database initialized successfully!\n";
