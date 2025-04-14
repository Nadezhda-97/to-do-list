import '../styles/index.css';
import { getServerTranslation } from '@/i18n/server';
import TodoList from '../components/TodoList';

export default async function Home({ params: { locale } }: { params: { locale: string } }) {
  const i18n = await getServerTranslation(locale);  // получаем серверный экземпляр i18next
  const t = i18n.t;

  return <TodoList t={t} />;
}
