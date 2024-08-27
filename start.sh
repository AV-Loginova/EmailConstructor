#!/bin/bash

chmod +x "$0"
# Установка Node.js модулей
npm install

# Запуск npm run dev
npm run dev &

# Ожидание некоторого времени для запуска сервера
sleep 1

# Открытие localhost в браузере
# Для macOS и Linux:
open http://localhost:5173
# Для Windows (PowerShell):
# start http://localhost:5173



