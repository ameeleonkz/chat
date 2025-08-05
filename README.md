# chat

Чат, в котором длинные сообщения сокращаются до небольших с помощью ИИ (open-source модель t5-small).

# quickStart
```bash
chmod +x quickstart.sh && ./quickStart.sh
```

# alter
1. в **каждом** сервисе заполнить env файлы из .env.example
```bash
cp .env.example .env
```
2. Запуск из корневого каталога проекта
```bash
docker compose up -d --build
```
3. Открыть 1-2 окна по адресу http://localhost:3000

Изначально созданы пользователи

| Логин | Пароль   |
|-------|----------|
| bob   | bob123   |
| alice | alice123 |

# demo

[demo](https://github.com/user-attachments/assets/644b1a71-561f-43b0-9275-448ec3a08036)

# todo:
- добавить регистрацию пользователя
- добавить хранение и чтение сообщений в/из бд
- ~~добавить мониторинг сервисов~~ / логирование

# services:
- **Frontend** - http://localhost:3000
- **Backend** - http://localhost:3001
- **Adminer** (БД) - http://localhost:8080
- **Prometheus** - http://localhost:9090
- **Grafana** - http://localhost:3002 (admin/admin)

# troubleshooting
- docker-compose нестабильно работает с symlink. Если у вас проект находится в папке-симлинке (например, goinfre), то надо заменить в ямлике `./bd/init.sql:/docker-entrypoint-initdb.d/init.sql:ro` например на `~/init.sql:/docker-entrypoint-initdb.d/init.sql:ro` и соответственно расположить в этой папке файл
