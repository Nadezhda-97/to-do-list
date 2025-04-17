import '../styles/index.css';
import { getServerTranslation } from '@/i18n/server';
import TodoList from '../components/TodoList';
import Translations from '../types/Translations';
import isTranslations from '../utils/isTranslations';

export default async function Home(props: { params: { locale: string } }) {
  const locale = props.params.locale;
  const i18n = await getServerTranslation(locale);
  const rawTranslations = i18n.getDataByLanguage(locale)?.translation || {};

  const translations: Translations = isTranslations(rawTranslations)
  ? rawTranslations
  : {
      errorRequired: 'Missing errorRequired',
      errorTooShort: 'Missing errorTooShort',
      errorTooLong: 'Missing errorTooLong',
    };

  return <TodoList locale={locale} translations={translations} />;
}
