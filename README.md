# Игра в интерпретацию — деплой на Railway

Это одностраничное приложение (`index.html`) + крошечный Node-сервер (`server.js`) без зависимостей.

## Файлы
- `index.html` — само приложение
- `server.js` — статический сервер, слушает `process.env.PORT`
- `package.json` — команда запуска `npm start`

## Деплой на Railway

### Вариант А — через GitHub (рекомендуется)
1. Создайте репозиторий на GitHub и загрузите туда эти три файла (`index.html`, `server.js`, `package.json`).
2. На https://railway.com → **New Project → Deploy from GitHub repo** → выберите репозиторий.
3. Railway сам определит Node, выполнит `npm install` (зависимостей нет) и запустит `npm start`.
4. Во вкладке **Settings → Networking → Generate Domain** получите публичный адрес вида `название.up.railway.app`.

### Вариант Б — через Railway CLI
```bash
npm i -g @railway/cli
railway login
cd railway-game
railway init
railway up
railway domain      # сгенерировать домен
```

## ВАЖНО: чтобы заработал вход через Google
После того как получите домен Railway (например `myapp.up.railway.app`):
1. Firebase Console → ваш проект → **Authentication → Settings → Authorized domains → Add domain**.
2. Добавьте домен Railway (без `https://`), например `myapp.up.railway.app`.
3. Убедитесь, что в **Authentication → Sign-in method** включён **Google**.
4. Откройте сайт, нажмите «Войти через Google» вверху, задайте название комнаты в ⚙️ Настройках и вставьте `firebaseConfig` (вкладка «Облако»).

## Правила Firestore (рекомендуется)
В Firebase → Firestore → Rules, чтобы писать могли только вошедшие:
```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /ig_rooms/{room}/posts/{doc} {
      allow read: if true;
      allow create: if request.auth != null;
      allow update, delete: if request.auth != null
        && request.auth.uid == resource.data.authorUid;
    }
  }
}
```
Это разрешает читать всем, создавать — вошедшим, а удалять/менять — только автору записи.
