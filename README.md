# Умный список задач (PWA)

Прогрессивное веб-приложение для управления задачами с поддержкой push-уведомлений и офлайн-режима.

## Функциональность

- Добавление, удаление и отметка задач как выполненных
- Фильтрация задач (Все/Активные/Выполненные)
- Push-уведомления при добавлении новых задач
- Автоматические напоминания о невыполненных задачах каждые 2 часа
- Работа в офлайн-режиме
- Возможность установки на домашний экран

## Технические требования

- Современный веб-браузер с поддержкой Service Workers и Push API
- HTTPS соединение (для push-уведомлений)

## Установка

1. Клонируйте репозиторий
2. Откройте `index.html` в веб-браузере
3. Разрешите уведомления при первом запуске

## Использование

- Введите задачу в поле ввода и нажмите "Добавить" или Enter
- Отмечайте задачи как выполненные с помощью чекбокса
- Удаляйте задачи кнопкой "Удалить"
- Используйте фильтры для просмотра задач по категориям
- Нажмите "Включить уведомления" для активации push-уведомлений

## Структура проекта

- `index.html` - Основной HTML файл
- `styles.css` - Стили приложения
- `app.js` - Логика приложения
- `service-worker.js` - Service Worker для офлайн-функциональности
- `manifest.json` - Манифест PWA
- `icons/` - Иконки приложения

## Технологии

- HTML5
- CSS3
- JavaScript (ES6+)
- Service Workers
- Push API
- LocalStorage 