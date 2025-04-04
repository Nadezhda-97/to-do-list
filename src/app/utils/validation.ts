export const validateTask = (task: string, maxLength: number): string | null => {
  if (task.trim() === '') return 'Текст задачи не может быть пустым';
  if (task.length < 3) return 'Минимальная длина задачи - 3 символа';
  if (task.length > maxLength) return `Максимальная длина задачи - ${maxLength} символов`;
  return null;
};