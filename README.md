📅 EventSpace — Event Search Platform
EventSpace — это современное веб-приложение для поиска событий по всему миру. Проект интегрирован с Ticketmaster API, позволяет фильтровать мероприятия по категориям, датам, а также сохранять их в избранное.
<img width="1272" height="882" alt="image" src="https://github.com/user-attachments/assets/c03e16c7-22bd-4476-867f-3628f9d8f989" />


🚀 Технологический стек
React 18 (Functional Components, Hooks)
TypeScript (строгая типизация)
Redux Toolkit (управление состоянием)
Day.js (работа с датами и кастомный календарь)
Sass/SCSS (модульные стили и адаптивная верстка)
Vite (быстрая сборка проекта)

🌐 Живое демо
Посмотреть проект в работе можно здесь: (https://singular-gaufre-b2934a.netlify.app/)

🛠 Инструкция по запуску
Чтобы запустить проект локально, выполни следующие шаги:

1. Клонирование репозитория
Bash
git clone https://github.com/petrakarin2008-sketch/Place-Event-1-2026.git
cd Place-Event-1-2026

2. Установка зависимостей
Убедись, что у тебя установлен Node.js.
npm install

3. Настройка переменных окружения (Environment Variables)
Для работы поиска событий тебе понадобится API ключ от Ticketmaster и WeatherApi.com.

Создай файл .env в корневой папке проекта.
Добавь в него свой ключ (замени YOUR_API_KEY на реальный):

Фрагмент кода
VITE_TICKETMASTER_API_KEY= YOUR_API_KEY_TICKETMASTER
VITE_WEATHER_API_KEY= YOUR_API_KEY_WEATHER

4. Запуск в режиме разработки
npm run dev
После запуска проект будет доступен по адресу: http://localhost:5173
