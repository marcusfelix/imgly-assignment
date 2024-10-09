import { IconMoon, IconSun } from '@tabler/icons-react';
import useTheme from '../../hooks/useTheme';
import styles from './AppBar.module.css';

export default function AppBar() {
  const { theme, toggleTheme } = useTheme();
  
  return (
    <div className={styles.appbar}>
      <button onClick={toggleTheme}>{theme === "light" ? <IconMoon/> : <IconSun/>}</button>
    </div>
  );
}