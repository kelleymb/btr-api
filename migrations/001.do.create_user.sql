CREATE TABLE users (
    id INTEGER PRIMARY KEY GENERATED BY DEFAULT AS IDENTITY,
    user_name TEXT NOT NULL,
    email VARCHAR NOT NULL,
    password CHAR(60) NOT NULL,
    created TIMESTAMP DEFAULT now() NOT NULL,
    UNIQUE (user_name)
);