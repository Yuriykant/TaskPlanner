export interface ITodo {
  id: string;
  title: string;
  description: string;
  selectedDay: Date;
  cheked?: boolean; // для дальнейшего функционала по завершению задачи( на будущее)
  createdAt?: any;
  updatedAt?: any;
}
