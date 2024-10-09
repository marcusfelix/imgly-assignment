import { TreeProvider } from '../../providers/treeProvider';
import AppBar from '../AppBar/AppBar';
import Details from '../Details/Details';
import SideBar from '../SideBar/SideBar';
import styles from './App.module.css';

export default function App() {
  return (
    <TreeProvider>
      <div className={styles.canvas}>
        <AppBar/>
        <div className={styles.panels}>
          <SideBar/>
          <Details/>
        </div>
      </div>
    </TreeProvider>
  );
}