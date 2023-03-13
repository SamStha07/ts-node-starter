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

CREATE TABLE
    projects(
        id INTEGER AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        description VARCHAR(255) NOT NULL,
        user_id INTEGER NOT NULL,
        created_at TIMESTAMP DEFAULT NOW(),
        FOREIGN KEY(user_id) REFERENCES users(id) ON DELETE CASCADE
    );

INSERT INTO
    projects(name, user_id, description)
VALUES (
        'kunuuz',
        1,
        'Kunuuz is an multi-vendor website'
    ), (
        'ITTI',
        2,
        'ITTI is an laptop selling store.'
    ), ('random', 1, 'random store.');

CREATE TABLE
    photos(
        id INTEGER AUTO_INCREMENT PRIMARY KEY,
        image_url VARCHAR(255) NOT NULL,
        project_id INTEGER NOT NULL,
        created_at TIMESTAMP DEFAULT NOW(),
        FOREIGN KEY(project_id) REFERENCES projects(id) ON DELETE CASCADE
    );

INSERT INTO
    photos (image_url, project_id)
VALUES ('kunuuz.jpg ', 1), ('itti.jpg ', 2);

-- select *

-- from projects

--     inner join photos ON projects.user_id = 1

--     inner join users ON users.id = projects.user_id

-- GROUP BY projects.id

-- ORDER BY projects.id;