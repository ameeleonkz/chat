# 🛠 Backend Service: Chat API (Next.js API + PostgreSQL + Socket.IO)

## 1. Назначение

Backend-приложение реализует REST и WebSocket API для многопользовательского чата. Оно обрабатывает регистрацию, аутентификацию пользователей, ведёт учет сообщений и обеспечивает обмен сообщениями в реальном времени через Socket.IO.

Сервис разворачивается отдельно от фронтенда, имеет собственный контейнер и подключается к PostgreSQL-базе данных (отдельный сервис).

---

## 2. Технологический стек

| Компонент       | Технология                         |
|------------------|------------------------------------|
| Ядро сервиса     | Next.js API Routes (TypeScript)    |
| Веб-сокеты       | socket.io (v4+)                    |
| БД               | PostgreSQL 15                      |
| Авторизация      | JSON Web Tokens (JWT)              |
| Хеширование      | bcrypt                             |
| Валидация        | zod / joi / custom                 |

---

## 3. Архитектура и компоненты

```
backend/
├── src/
│   ├── pages/api/
│   │   ├── auth/               # login, register
│   │   └── users/              # user listing
│   ├── socket/                 # WebSocket handlers
│   ├── lib/                    # jwt, prisma, hashing
│   └── middleware/             # auth guards, utils
├── Dockerfile
├── .env
```

---

## 4. REST API

### 4.1 Аутентификация

| Метод   | Путь             | Назначение                | Тело запроса                 |
|---------|------------------|---------------------------|------------------------------|
| `POST`  | `/api/auth/login`    | Аутентификация             | `{ username, password }`     |
| `POST`  | `/api/auth/register` | Регистрация                | `{ username, password }`     |

### 4.2 Пользователи

| Метод   | Путь             | Назначение                |
|---------|------------------|---------------------------|
| `GET`   | `/api/users`         | Список всех пользователей |

---

## 5. WebSocket API (Socket.IO)

### Подключение

Клиент подключается с передачей JWT токена:

```ts
const socket = io(SOCKET_URL, {
  auth: {
    token: jwt,
  }
});
```

### Серверная аутентификация

```ts
io.use((socket, next) => {
  const token = socket.handshake.auth.token;
  try {
    const payload = jwt.verify(token, JWT_SECRET);
    socket.user = payload;
    next();
  } catch (err) {
    next(new Error('Unauthorized'));
  }
});
```

### События

| Событие      | Отправитель | Параметры                         | Назначение                  |
|--------------|-------------|-----------------------------------|-----------------------------|
| `message`    | клиент      | `{ userId, content }`             | Отправка нового сообщения   |
| `message`    | сервер      | `{ id, userId, content, timestamp }` | Широковещательная доставка  |

---

## 6. База данных

### Структура таблиц

- `users`: id, username, password_hash, created_at
- `messages`: id, user_id (FK), content, created_at

Миграции и схема описаны через Prisma.

---

## 7. Переменные окружения (.env)

```
DATABASE_URL=postgresql://user:pass@db:5432/chat
JWT_SECRET=some_long_secret_key
```

---

## 8. Docker и запуск

Сервис упакован в отдельный контейнер. Используется `Dockerfile`, интегрируется в `docker-compose`:

```yaml
services:
  backend:
    build: ./backend
    environment:
      - DATABASE_URL=${DATABASE_URL}
      - JWT_SECRET=${JWT_SECRET}
    ports:
      - "3001:3000"
```

### Локальный запуск:

```bash
docker compose up -d --build
```

---

## 9. Расширение и масштабирование

- ✨ Поддержка ролей пользователей (admin, moderator)
- 📄 Валидация форм (Zod / Yup)
- 🔐 Refresh токены, ротация
- 🔍 Поиск по сообщениям
- 📊 REST-метрики, логирование, audit trail
- 🧠 Интеграция с LLM-сервером (фильтрация, резюме)

---
