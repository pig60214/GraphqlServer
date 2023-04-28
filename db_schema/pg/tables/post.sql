CREATE TABLE Post (
   id SERIAL PRIMARY KEY,
   title VARCHAR(100) NOT NULL,
   from_date date NOT NULL,
   to_date date NOT NULL,
   color VARCHAR(30) NOT NULL
);