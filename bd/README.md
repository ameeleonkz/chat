Указать переменные окружения
cp .env.example .env

Запуск
docker compose up -d

Остановка с удалением
docker compose down -v


Тестовые пользователи
| username | пароль     | bcrypt hash                                                    |
| -------- | ---------- | -------------------------------------------------------------- |
| `alice`  | `alice123` | `$2b$10$LNl7JSoGniXGm7OGGlTYluxc12U3EvMO/JjumZN19Fl/keIJgMygO` |
| `bob`    | `bob123`   | `$2b$10$yHxAC.CDvg.7Ag88YeZdQu6voQ3oeb2RfaVrSnrcGFKpwWIye1DeG` |
