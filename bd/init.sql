-- Создание таблицы пользователей
CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    username TEXT UNIQUE NOT NULL,
    password_hash TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Создание таблицы сообщений
CREATE TABLE IF NOT EXISTS messages (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
    content TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Добавление тестовых пользователей
INSERT INTO users (username, password_hash) VALUES
  ('alice', '$2b$10$LNl7JSoGniXGm7OGGlTYluxc12U3EvMO/JjumZN19Fl/keIJgMygO'),
  ('bob', '$2b$10$yHxAC.CDvg.7Ag88YeZdQu6voQ3oeb2RfaVrSnrcGFKpwWIye1DeG');
