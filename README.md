# TaskPlanner

## Привет!

Это описание проекта TaskPlanner, где я расскажу о его функциональности, технологическом стеке и других деталях.

## Демо

Вы можете просмотреть демонстрацию проекта, перейдя по ссылке: [TaskPlanner](https://task-planner-gamma.vercel.app) В приложении вы можете авторизоваться или пойти под своей учетной записью GitHub и Google

## Задача

Создать To-Do лист в виде календаря, где каждый день представлен как список задач.
При клике на день открывается модальное окно со списком задач. В этом окне можно
создавать новые задачи, удалять их и помечать как выполненные.

## Критерии

- Приятный внешний вид
- Семантическая верстка
- Адаптивный дизайн
- Реализация через Flexbox или Grid
- Желательно использовать БЭМ
- Маркировка праздничных дней с использованием isDayOff() API
- Вывод задач по неделе
- Использование TypeScript
- Покрытие интерфейса тестами
- Система профилей: у каждого профиля свой список задач, не отображаемый в
  другом профиле
- Реализовать Dependency Inversion для внешних HTTP-запросов
- Понятная структура проекта
- Разворачивание проекта в Docker

## Технологический стек

<img src="https://img.shields.io/badge/Webpack-464a51?style=for-the-badge&logo=webpack&logoColor=8DD6F9"/> <img src="https://img.shields.io/badge/React-464a51?style=for-the-badge&logo=react&logoColor=8DD6F9"/> <img src="https://img.shields.io/badge/React Router-464a51?style=for-the-badge&logo=react Router&logoColor=8DD6F9"/> <img src="https://img.shields.io/badge/Typescript-464a51?style=for-the-badge&logo=typescript&logoColor=8DD6F9"/> <img src="https://img.shields.io/badge/Mui-464a51?style=for-the-badge&logo=mui&logoColor=8DD6F9"/> <img src="https://img.shields.io/badge/Firebase-464a51?style=for-the-badge&logo=firebase&logoColor=8DD6F9"/>

### Фронтенд

- Webpack
- React 18
- React Router DOM 6
- TypeScript 5
- MUI Material-UI 5

- Docker

### Бэкенд

- Firebase 10

## Авторизация

Для авторизации в приложении вы можете использовать OAuth-авторизацию через учетные записи GitHub и Google.

## Установка и запуск

1. Склонируйте репозиторий: `git clone https://github.com/your/repository.git`
2. Перейдите в папку проекта: `cd project-directory`
3. Установите зависимости: `npm install`
4. Запустите приложение в режиме разработки: `npm run start`
5. Откройте приложение в браузере по адресу: [http://localhost:8080](http://localhost:8080)

6. Команда для сборки docker image `docker build -t airnet .`
7. Команда для запуска docker container `docker run --rm --name myproject -p 3000:8080 -d airnet`
8. Перейти можно http://localhost:3000
9. Команда для просмотра запущенных и остановленных контейнеров `docker ps -a`
10. Команда для остановки контейнера `docker stop myproject`
11. Чтобы удалить образ Docker `docker rmi ОБРАЗ`

## CI/CD

Для этого проекта используется CI/CD, чтобы осуществлять пул-реквесты в удаленный репозиторий, код проходит проверку через инструменты Prettier, ESLint и Stylelint, чтобы обеспечить согласованный стиль кодирования.
