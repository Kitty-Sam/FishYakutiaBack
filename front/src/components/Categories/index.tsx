import { Category } from '@components/Categories/Category';
import { useAppSelector } from '@store/store';
import { getCategories } from '@store/selectors';
import styles from '@styles/Categories.module.css';
import style from '@styles/Category.module.css';

export const Categories = () => {
  const categories = useAppSelector(getCategories);

  return (
      <div className={styles.categoriesBlock}>
        <button className={style.allCategoriesBtn}>All</button>
        {
          categories.map(category => <Category key={category.id} title={category.title}/>)
        }
      </div>
  );
};
