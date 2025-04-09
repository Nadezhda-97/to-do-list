'use client'

import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    fallbackLng: 'ru',
    debug: true,
    interpolation: {
      escapeValue: false,
    },
    resources: {
      ru: {
        translation: {
          title: 'Список задач',
          placeholder: 'Введите описание задачи',
          addTask: 'Добавить задачу',
          edit: 'Редактировать',
          delete: 'Удалить',
          save: 'Сохранить',
          cancel: 'Отмена',
          errorRequired: 'Текст задачи не может быть пустым',
          errorTooShort: 'Минимальная длина задачи - 3 символа',
          errorTooLong: 'Максимальная длина задачи - {{max}} символов',

          markAsCompleted: "Отметить как выполненное",
          markAsIncomplete: "Снять отметку о выполнении",
        },
      },
      en: {
        translation: {
          title: 'ToDo List',
          placeholder: 'Add task description',
          addTask: 'Add Task',
          edit: 'Edit',
          delete: 'Delete',
          save: 'Save',
          cancel: 'Cancel',
          errorRequired: 'Task cannot be empty',
          errorTooShort: 'Task must be at least 3 characters long',
          errorTooLong: 'Task must not exceed {{max}} characters',
        },
      },
      de: {
        translation: {
          title: 'Aufgabenliste',
          placeholder: 'Aufgabenbeschreibung hinzufügen',
          addTask: 'Aufgabe hinzufügen',
          edit: 'Bearbeiten',
          delete: 'Löschen',
          save: 'Speichern',
          cancel: 'Abbrechen',
          errorRequired: 'Die Aufgabe darf nicht leer sein',
          errorTooShort: 'Die Aufgabe muss mindestens 3 Zeichen lang sein',
          errorTooLong: 'Die Aufgabe darf {{max}} Zeichen nicht überschreiten',
        },
      },
    },
  });

export default i18n;