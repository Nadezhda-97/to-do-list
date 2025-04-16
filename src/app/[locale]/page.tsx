import '../styles/index.css';
import { getServerTranslation } from '@/i18n/server';
import TodoList from '../components/TodoList';

export default async function Home({ params: { locale } }: { params: { locale: string } }) {
  const i18n = await getServerTranslation(locale);
  //const t = i18n.t;
  const translations = i18n.getDataByLanguage(locale)?.translation || {};

  return <TodoList locale={locale} translations={translations} />;
}
