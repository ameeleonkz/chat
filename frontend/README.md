# 📘 Frontend Application: Chat UI (Next.js + Redux + WebSocket)

## 1. Назначение

Фронтенд-приложение реализует клиентскую часть многопользовательского онлайн-чата. Пользователи могут регистрироваться, входить в систему и обмениваться сообщениями в реальном времени. В дальнейшем приложение может быть дополнено LLM‑возможностями (например, генерация резюме диалога).

## 2. Технологический стек

| Компонент           | Технология                     |
|---------------------|---------------------------------|
| Ядро                | Next.js (App Router, React 18+) |
| Стилизация          | Tailwind CSS                   |
| Хранение состояния  | Redux Toolkit (RTK)            |
| API-интеграции      | RTK Query                      |
| Веб-сокеты          | Socket.IO Client               |
| Авторизация         | JWT-токен + Redux store        |

## 3. Основные страницы

| Путь           | Назначение                                  |
|----------------|---------------------------------------------|
| `/auth/login`       | Авторизация пользователя                    |
| `/auth/register`    | Регистрация нового пользователя             |
| `/`            | Основной интерфейс чата                     |
| `/profile`     | Страница текущего пользователя (опционально) |
| `*`            | Страница 404                                |

## 4. Архитектура взаимодействия

### 4.1 HTTP REST API

REST-запросы используются только для:

| Метод   | Путь              | Назначение                |
|---------|-------------------|---------------------------|
| `POST`  | `/auth/login`     | Аутентификация            |
| `POST`  | `/auth/register`  | Регистрация               |
| `GET`   | `/users`          | Получение списка пользователей |

### 4.2 WebSocket (Socket.IO)

Обмен сообщениями осуществляется через постоянное соединение:

- Подключение: происходит на странице `/`
- События:
  - `message` (входящее): получение нового сообщения
  - `message` (исходящее): отправка нового сообщения
  - `init` (опционально): получение истории сообщений при подключении

#### Пример структуры сообщения

- `id`: уникальный идентификатор
- `userId`: идентификатор автора
- `content`: текст сообщения
- `created_at`: время создания

## 5. Redux Store

```ts
interface RootState {
  auth: {
    user: { id: number; username: string } | null;
    token: string | null;
    status: 'idle' | 'loading' | 'error';
  };
  // RTK Query endpoints
  [authApi.reducerPath]: ReturnType<typeof authApi.reducer>;
}
```

Хранилище используется для управления текущим пользователем, токеном и состоянием загрузки.

## 6. Переменные окружения

Файл `.env` (или `.env.local`) в `frontend/`:

```
NEXT_PUBLIC_API_BASE_URL=http://localhost:3001
NEXT_PUBLIC_SOCKET_URL=http://localhost:3001
```

## 7. Возможности расширения

- 📄 Интеграция LLM-сервиса для фильтрации или анализа сообщений
- 📑 Подключение подсистемы генерации резюме чатов
- 🔒 Поддержка ролей (админ, модератор)
- 💬 Отправка файлов и изображений
- 📱 PWA или мобильная версия (React Native, Expo)
- 📈 Логирование, мониторинг, сбор аналитики

---
