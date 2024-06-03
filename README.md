# TaskPlanner

## Привет!

Это описание проекта TaskPlanner, где я расскажу о его функциональности, технологическом стеке и других деталях.

## Демо

Вы можете просмотреть демонстрацию проекта, перейдя по ссылке: [TaskPlanner]([https://kantcodetodo.karpovdns.net](https://task-planner-gamma.vercel.app/login)) В приложении вы можете авторизоваться или пойти под своей учетной записью GitHub и Google

## Задача

Создать To-Do лист в виде календаря, где каждый день представлен как список задач.
При клике на день открывается модальное окно со списком задач. В этом окне можно
создавать новые задачи, удалять их и помечать как выполненные.

## Критерии
-1. Приятный внешний вид
-2 .Семантическая верстка
-3. Адаптивный дизайн
-4. Реализация через Flexbox или Grid
-5. Желательно использовать БЭМ
-6. Маркировка праздничных дней с использованием isDayOff() API
-7. Вывод задач по неделе
-8. Использование TypeScript
-9. Покрытие интерфейса тестами
-10. Система профилей: у каждого профиля свой список задач, не отображаемый в
другом профиле
-11. Реализовать Dependency Inversion для внешних HTTP-запросов
-12. Понятная структура проекта
-13. Разворачивание проекта в Docker

## Технологический стек

<img src="https://img.shields.io/badge/Webpack-464a51?style=for-the-badge&logo=webpack&logoColor=8DD6F9"/> <img src="https://img.shields.io/badge/React-464a51?style=for-the-badge&logo=react&logoColor=8DD6F9"/> <img src="https://img.shields.io/badge/React Router-464a51?style=for-the-badge&logo=react Router&logoColor=8DD6F9"/> <img src="https://img.shields.io/badge/Typescript-464a51?style=for-the-badge&logo=typescript&logoColor=8DD6F9"/> <img src="https://img.shields.io/badge/Mui-464a51?style=for-the-badge&logo=mui&logoColor=8DD6F9"/> <img src="https://img.shields.io/badge/Firebase-464a51?style=for-the-badge&logo=firebase&logoColor=8DD6F9"/>

### Фронтенд

- Webpack
- React 18
- React Router DOM 6
- TypeScript 5
- MUI Material-UI 5
 

### Бэкенд

- Firebase 10
  
## Авторизация

Для авторизации в приложении вы можете использовать OAuth-авторизацию через учетные записи GitHub и Google.


## Установка и запуск

1. Склонируйте репозиторий: `git clone https://github.com/your/repository.git`
2. Перейдите в папку проекта: `cd project-directory`
3. Установите зависимости: `npm install`
4. Запустите приложение в режиме разработки: `npm run start`
5. Откройте приложение в браузере по адресу: [http://localhost:3000](http://localhost:3000)

## CI/CD

Для этого проекта используется CI/CD, чтобы осуществлять пул-реквесты в удаленный репозиторий, код проходит проверку через инструменты Prettier, ESLint и Stylelint, чтобы обеспечить согласованный стиль кодирования.


 
