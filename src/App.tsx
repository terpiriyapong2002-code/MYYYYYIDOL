import { useEffect } from 'react';
import NewIdolGame from './THE-IDOL-SIMULATOR';

function App() {
  // Load saved theme on first render
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 dark:bg-gray-900 dark:text-gray-100 transition-colors duration-300">

      {/* === Main Game Component === */}
      <NewIdolGame />
    </div>
  );
}

export default App;
