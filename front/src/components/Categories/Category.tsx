import styles from '@styles/Category.module.css';

interface Category {
  title: string;
}

export const Category = ({ title }: Category) => {
  return (
      <button className={styles.categoryBlock}>
        {title}
      </button>
  );
};
