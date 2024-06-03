export interface ITodo {
  id: string;
  title: string;
  description: string;
  selectedDay: string;
  cheked?: boolean; // для дальнейшего функционала по завершению задачи( на будущее)
  createdAt?: any;
  updatedAt?: any;
}
