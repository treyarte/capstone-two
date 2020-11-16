DROP TABLE IF EXISTS roles CASCADE;
DROP TABLE IF EXISTS departments CASCADE;
DROP TABLE IF EXISTS users CASCADE;
DROP TABLE IF EXISTS droplists CASCADE;

CREATE TABLE roles (
    id SERIAL PRIMARY KEY,
    "role" TEXT NOT NULL
);

INSERT INTO roles ("role") VALUES 
    ('stocker'),
    ('forklift-driver');

CREATE TABLE departments (
    id SERIAL PRIMARY KEY,
    department TEXT NOT NULL
);

INSERT INTO departments (department) VALUES
    ('produce'),
    ('sundries'),
    ('hardlines'),
    ('seasonal'),
    ('freezer'),
    ('dairy'),
    ('receiving'),
    ('deli');

CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    first_name VARCHAR(255) NOT NULL,
    last_name VARCHAR(255) NOT NULL,
    email TEXT NOT NULL,
    is_admin BOOLEAN NOT NULL DEFAULT false,
    "password" TEXT NOT NULL,
    department_id INTEGER NOT NULL REFERENCES departments,
    role_id INTEGER NOT NULL REFERENCES roles
);

INSERT INTO users (first_name, last_name, email, "password", department_id, role_id) VALUES
    ('Trent', 'Luis', 'email@gmail.com', 'lolol', 1, 1);

CREATE TABLE droplists(
    id SERIAL PRIMARY KEY,
    created_at DATE NOT NULL DEFAULT CURRENT_DATE,
    "status" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    stocker_id INTEGER NOT NULL REFERENCES users ON DELETE CASCADE ON UPDATE CASCADE,
    forklift_driver_id INTEGER REFERENCES users ON DELETE SET NULL ON UPDATE CASCADE,
    department_id INTEGER NOT NULL REFERENCES departments
);

INSERT INTO droplists(stocker_id, department_id, "status", "description") VALUES
    (1, 1, 'not sent', 'todays list');

CREATE TABLE items(
    id SERIAL PRIMARY KEY,
    steel_name TEXT NOT NULL,
    row_letter VARCHAR(2) NOT NULL,
    column_number INTEGER NOT NULL,
    "description" TEXT,
    droplist_id INTEGER NOT NULL REFERENCES droplists ON DELETE CASCADE ON UPDATE CASCADE 
);

INSERT INTO items(steel_name, row_letter, column_number, "description", droplist_id) VALUES
    ('S409', 'A', 3, 'lamp', 1);