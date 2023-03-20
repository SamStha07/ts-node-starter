CREATE TABLE
    project_tech(
        project_id INTEGER NOT NULL,
        technology_id INTEGER NOT NULL,
        FOREIGN KEY(project_id) REFERENCES projects(id) ON UPDATE CASCADE ON DELETE CASCADE,
        FOREIGN KEY(technology_id) REFERENCES technologies(id) ON UPDATE CASCADE ON DELETE CASCADE,
        PRIMARY KEY(project_id, technology_id)
    );

INSERT INTO
    project_tech(project_id, technology_id)
VALUES (1, 1), (1, 1);