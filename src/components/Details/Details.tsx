import styles from './Details.module.css';
import useFetchDetails from '../../hooks/useFetchDetails';
import { useTree } from '../../providers/treeProvider';
import Loading from '../Loading/Loading';
import ErrorContainer from '../ErrorContainer/ErrorContainer';

export default function Details() {
  const { selected } = useTree();
  const { details, loading, error } = useFetchDetails(selected);

  if (loading) {
    return <div className={styles.details}>
      <div className={styles.center}><Loading/></div>
    </div>;
  }

  if (error) {
    return <div className={styles.details}>
    <div className={styles.center}><ErrorContainer message={error.message}/></div>
  </div>;
  }

  if(!details) {
    return <div className={styles.details}></div>;
  }

  return (
    <div className={styles.details}>
      <div className={styles.meta}>
        <span>{new Date(details.createdAt).toLocaleDateString()}</span>
        <span>{details.id}</span>
      </div>
      <p className=''>{details.description}</p>
    </div>
  );
}