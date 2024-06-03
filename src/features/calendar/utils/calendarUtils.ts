export const VISIBLE_CELLS_AMOUNT = 7 * 6;

export const months = [
  'Январь',
  'Февраль',
  'Март',
  'Апрель',
  'Май',
  'Июнь',
  'Июль',
  'Август',
  'Сентябрь',
  'Октябрь',
  'Ноябрь',
  'Декабрь',
];

export const daysOfTheWeek = ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'];

export const generateCalendarDays = (currentDate: Date): Date[] => {
  const firstDayOfTheMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);

  const firstDayOfTheView = new Date(firstDayOfTheMonth);

  firstDayOfTheView.setDate(firstDayOfTheView.getDate() - (firstDayOfTheMonth.getDay() || 7) + 1);

  // Создаем массив дней для отображения
  const dateArray = [...Array(VISIBLE_CELLS_AMOUNT)].map((_, index) => {
    const day = new Date(firstDayOfTheView);
    day.setDate(day.getDate() + index);
    return day;
  });
  return dateArray;
};
