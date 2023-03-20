DROP DATABASE portfolio;

CREATE DATABASE portfolio;

USE portfolio;

CREATE TABLE
    users(
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(100) NOT NULL,
        email VARCHAR(100) UNIQUE NOT NULL,
        password VARCHAR(100) NOT NULL,
        created_at TIMESTAMP DEFAULT NOW()
    );

INSERT INTO
    users(name, email, password)
VALUES (
        'sam',
        'sam@gmail.com',
        'sam12345'
    ), (
        'susma',
        'susma@gmail.com',
        'susma12345'
    );

-- select *

-- from projects

--     inner join photos ON projects.user_id = 1

--     inner join users ON users.id = projects.user_id

-- GROUP BY projects.id

-- ORDER BY projects.id;