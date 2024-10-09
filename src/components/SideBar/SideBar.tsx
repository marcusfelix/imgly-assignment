import { useTree } from '../../providers/treeProvider';
import ErrorContainer from '../ErrorContainer/ErrorContainer';
import Loading from '../Loading/Loading';
import NodeItem from '../NodeItem/NodeItem';
import styles from './SideBar.module.css';

export default function SideBar() {
  const tree = useTree();

  if (tree.loading) {
    return <div className={styles.sidebar}>
      <div className={styles.center}><Loading/></div>
    </div>;
  }

  if (tree.error) {
    return <div className={styles.sidebar}>
      <div className={styles.center}><ErrorContainer message={tree.error.message}/></div>
    </div>;
  }

  return (
    <div className={styles.sidebar}>
      <div className={styles.scroll}>
        {tree?.tree.map((node) => <NodeItem key={node.id ?? node.label} node={node} />)}
      </div>
    </div>
  )
}