import styles from './ErrorContainer.module.css';

type Props = {
  message: string;
}

export default function ErrorContainer({ message }: Props) {
  return (
    <div className={styles.error}>
      {message}
    </div>
  );
}