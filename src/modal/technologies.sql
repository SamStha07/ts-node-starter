CREATE TABLE
    technologies (
        id INTEGER AUTO_INCREMENT PRIMARY KEY,
        image_url VARCHAR(255) NOT NULL,
        name VARCHAR(255) UNIQUE NOT NULL,
        created_at TIMESTAMP DEFAULT NOW()
    );

ALTER TABLE technologies DROP COLUMN image;

INSERT INTO
    technologies(name, image_url)
VALUES (
        'Nodejs',
        'http://example.com/1'
    ), (
        'JavaScript',
        'http://example.com/1'
    );

-- will remove all the records from the table

DELETE FROM technologies;

SELECT
    projects.id,
    technologies.id,
    technologies.name
FROM projects
    JOIN project_tech ON projects.id = project_tech.project_id
    JOIN technologies ON technologies.id = project_tech.technology_id
HAVING projects.id = 46;