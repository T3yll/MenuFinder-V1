import { useState, useEffect } from 'react';

const ThemeHandler = () => {
  // Thèmes à déclarer ici : Clé = Nom du thème dans le fichier tailwind config, Valeur = Label à afficher
  const themes = {
    light: 'Clair',
    retro: 'Rétro',
    cyberpunk: 'Cyberpunk',
    dark: 'Sombre',
    valley: 'Chocolat',
  };

  // Initialise le thème depuis localStorage ou utilise 'retro' comme thème par défaut
  const [theme, setTheme] = useState(localStorage.getItem('theme') || 'retro');

  // Permet d'aller chercher automatiquement si un fichier css au thème associé existe
  // Si c'est le cas, charge le fichier css lorsque le thème est actif, et le décharge lorsque ce n'est plus le cas
  const loadCSS = async (themeName: string) => {
    const cssPath = `/src/styles/themes/${themeName}.css`;
    try {
      const response = await fetch(cssPath);
      if (response.ok) {
        const existingLink = document.getElementById('theme-style');
        if (existingLink) {
          document.head.removeChild(existingLink);
        }
        const link = document.createElement('link');
        link.rel = 'stylesheet';
        link.href = cssPath;
        link.id = 'theme-style';
        document.head.appendChild(link);
      } else {
        console.error(`Le fichier ${cssPath} n'existe pas.`);
      }
    } catch (error) {
      console.error(`Erreur lors du chargement du fichier ${cssPath}: `, error);
    }
  };

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);

    // Sauvegarder le thème actuel dans localStorage
    localStorage.setItem('theme', theme);

    // Récupère le fichier css associé au thème s'il existe
    loadCSS(theme);
  }, [theme]);

  const handleThemeChange = (selectedTheme: any) => {
    setTheme(selectedTheme);
  };

  return (
    <div className="dropdown dropdown-end">
      <button
        type="button"
        className="transition w-24 h-9 group flex items-center justify-center rounded-full bg-gradient-to-r from-primary via-accent to-secondary p-[2px] text-white duration-300 hover:shadow-2xl hover:shadow-purple-600/30 rotate-border-hover"
      >
        <div className="flex h-full w-full items-center justify-center rounded-full bg-gray-900 transition duration-300 ease-in-out group-hover:bg-gradient-to-br group-hover:from-gray-700 group-hover:to-gray-900 group-hover:transition group-hover:duration-300 group-hover:ease-in-out">
          Theme
          <svg
            width="12px"
            height="12px"
            className="inline-block h-2 w-2 fill-current opacity-60 ml-2"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 2048 2048"
          >
            <path d="M1799 349l242 241-1017 1017L7 590l242-241 775 775 775-775z"></path>
          </svg>
        </div>
      </button>
      <ul
        tabIndex={0}
        className="dropdown-content bg-base-300 rounded-box z-[1] w-52 p-2 shadow-2xl mt-2"
      >
        {Object.entries(themes).map(([themeValue, themeLabel]) => (
          <li key={themeValue}>
            <input
              type="radio"
              name="theme-dropdown"
              onChange={() => handleThemeChange(themeValue)}
              className={`theme-controller btn btn-sm btn-block btn-ghost justify-start ${theme !== themeValue ? 'hover:bg-accent' : ''}`}
              aria-label={themeLabel}
              value={themeValue}
              checked={theme === themeValue}
            />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ThemeHandler;
