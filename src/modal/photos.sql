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