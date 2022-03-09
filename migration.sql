DROP TABLE IF EXISTS pets;

CREATE TABLE pets(
    id SERIAL,
    age INTEGER,
    name TEXT,
    kind TEXT
);

INSERT INTO pets (age, name, kind) VALUES (7,'fido', 'dog');
INSERT INTO pets (age, name, kind) VALUES (4, 'mittens', 'cat');