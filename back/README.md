# Online Cinema Backend

NestJS backend for the online cinema project.

## Requirements

- Node.js 16-20 is recommended for this legacy Nest 7 stack.
- MongoDB running locally or a valid remote `MONGO_URI`.

## Setup

```bash
npm install
copy .env.example .env
```

Update `.env` if your MongoDB is not available at `mongodb://127.0.0.1:27017/online-cinema`.

If you use Docker, start MongoDB with:

```bash
docker compose up -d
```

## Run

```bash
npm run start:dev
```

The API uses the global `/api` prefix and listens on port `5000`.

## Build

```bash
npm run build
npm run start:prod
```

Telegram integration is optional. Set `TELEGRAM_BOT_TOKEN` and `TELEGRAM_CHAT_ID` in `.env` only when you need the bot.
