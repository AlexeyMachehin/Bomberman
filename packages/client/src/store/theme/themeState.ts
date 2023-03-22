const getTheme = () => {
  if (typeof window !== 'undefined') {
    const theme = `${window?.localStorage?.getItem('theme')}`;
    if (['light', 'dark'].includes(theme)) return theme;

    const userMedia = window.matchMedia('(prefers-color-scheme: light)');
    if (userMedia.matches) return 'light';
  }

  return 'dark';
};

export const themeState = {
  theme: getTheme(),
};
