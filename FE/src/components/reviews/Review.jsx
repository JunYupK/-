import styles from '../../styles/reviews/Review.module.css';
import ReviewsList from './ReviewList';
import ReviewsSearch from './ReviewSearch';

function Reviews() {
  return (
    <div className={styles.wrapper}>
      <div>
        <ReviewsSearch className={styles.reviewsearch} />
        <ReviewsList className={styles.reviewlist} />
      </div>
    </div>
  );
}

export default Reviews;
