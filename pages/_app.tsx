import '../styles/globals.css';
import type { AppProps } from 'next/app';
import KanbanBoard from '../components/KanbanBoard'; // Import your Kanban board component

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <div>
      <Component {...pageProps} />
      <KanbanBoard /> {/* Use your Kanban board component here */}
    </div>
  );
}

export default MyApp;
