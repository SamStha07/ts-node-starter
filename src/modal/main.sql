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

CREATE TABLE
    projects(
        id INTEGER AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        description VARCHAR(255) NOT NULL,
        user_id INTEGER NOT NULL,
        created_at TIMESTAMP DEFAULT NOW(),
        FOREIGN KEY(user_id) REFERENCES users(id) ON UPDATE CASCADE ON DELETE CASCADE,
    );

CREATE TABLE
    technologies (
        id INTEGER AUTO_INCREMENT PRIMARY KEY,
        image_url VARCHAR(255) NOT NULL,
        name VARCHAR(255) UNIQUE NOT NULL,
        created_at TIMESTAMP DEFAULT NOW()
    );

CREATE TABLE
    photos(
        id INTEGER AUTO_INCREMENT PRIMARY KEY,
        image_url VARCHAR(255) NOT NULL,
        project_id INTEGER NOT NULL,
        created_at TIMESTAMP DEFAULT NOW(),
        FOREIGN KEY(project_id) REFERENCES projects(id) ON DELETE CASCADE
    );

CREATE TABLE
    project_tech(
        project_id INTEGER NOT NULL,
        technology_id INTEGER NOT NULL,
        FOREIGN KEY(project_id) REFERENCES projects(id) ON UPDATE CASCADE ON DELETE CASCADE,
        FOREIGN KEY(technology_id) REFERENCES technologies(id) ON UPDATE CASCADE ON DELETE CASCADE,
        PRIMARY KEY(project_id, technology_id)
    );