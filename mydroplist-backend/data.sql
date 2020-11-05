DROP TABLE IF EXISTS roles CASCADE;
DROP TABLE IF EXISTS departments CASCADE;
DROP TABLE IF EXISTS users CASCADE;

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
    ('trey', 'way', 'treyway@gmail.com', 'test', 1, 1);