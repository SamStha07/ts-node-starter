CREATE TABLE
    projects(
        id INTEGER AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        description VARCHAR(255) NOT NULL,
        user_id INTEGER NOT NULL,
        project_tech_id INTEGER NOT NULL,
        created_at TIMESTAMP DEFAULT NOW(),
        FOREIGN KEY (user_id) REFERENCES users(id) ON UPDATE CASCADE ON DELETE CASCADE,
        FOREIGN KEY (project_tech_id) REFERENCES project_tech(id) ON UPDATE CASCADE ON DELETE CASCADE,
    );

ALTER TABLE projects
ADD
    COLUMN technology_id INTEGER NOT NULL AFTER user_id;

-- if alter the table previous data having in that table name will have issue so we need to clear the previous data inorder to alter the table

ALTER TABLE projects DROP COLUMN technology_id;

ALTER TABLE tablename MODIFY columnname INTEGER;

-- ALTER TABLE tablename MODIFY columnname INTEGER;

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

-- drop foreign key contraints

SHOW CREATE TABLE projects;

-- CREATE TABLE

--     `projects` (

--         `id` int NOT NULL AUTO_INCREMENT,

--         `name` varchar(255) NOT NULL,

--         `description` varchar(255) NOT NULL,

--         `user_id` int NOT NULL,

--         `technology_id` int NOT NULL,

--         `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,

--         PRIMARY KEY (`id`),

--         KEY `user_id` (`user_id`),

--         KEY `technology_id` (`technology_id`),

--         CONSTRAINT `projects_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE,

--         CONSTRAINT `projects_ibfk_2` FOREIGN KEY (`technology_id`) REFERENCES `technologies` (`id`)

--     ) ENGINE = InnoDB AUTO_INCREMENT = 7 DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci

-- drop technology_id FOREIGN key

ALTER TABLE projects DROP FOREIGN KEY projects_ibfk_2;

ALTER TABLE projects DROP COLUMN technology_id;

-- inorder to alter foreign key

-- step 1 drop foreign key

ALTER TABLE projects DROP FOREIGN KEY projects_ibfk_2;

-- step 2 then add new forign key

ALTER TABLE projects
ADD
    FOREIGN KEY(technology_id) REFERENCES technologies(id) ON UPDATE CASCADE ON DELETE CASCADE;