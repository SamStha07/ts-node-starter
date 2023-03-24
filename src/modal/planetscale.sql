CREATE TABLE parent_table ( id INT NOT NULL, PRIMARY KEY (id) );

CREATE TABLE
    child_table (
        id INT NOT NULL,
        parent_id INT,
        PRIMARY KEY (id),
        KEY parent_id_idx (parent_id),
        CONSTRAINT `child_parent_fk` FOREIGN KEY (parent_id) REFERENCES parent_table(id) ON DELETE NO ACTION
    );

CREATE TABLE parent_table ( id INT NOT NULL, PRIMARY KEY (id) );

CREATE TABLE
    child_table (
        id INT NOT NULL,
        parent_id INT,
        PRIMARY KEY (id),
        KEY parent_id_idx (parent_id)
    );