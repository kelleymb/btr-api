CREATE TABLE reviews (
    id INTEGER PRIMARY KEY GENERATED BY DEFAULT AS IDENTITY,
    user_name TEXT REFERENCES users(user_name) ON DELETE CASCADE NOT NULL,
    title TEXT NOT NULL,
    author TEXT NOT NULL,
    content TEXT NOT NULL,
    rating INTEGER CHECK (rating > 0 and rating < 6),
    created TIMESTAMP DEFAULT now() NOT NULL
);