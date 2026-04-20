import styles from "./OfferCard.module.css";

export default function OfferCard({
  title,
  description,
  price,
  imageUrl,
  onClaim,
}) {
  return (
    <div className={styles.card}>
      <div className={styles.imageWrapper}>
        <img src={imageUrl} alt={title} className={styles.image} />
      </div>
      <div className={styles.body}>
        <h3 className={styles.title}>{title}</h3>
        <p className={styles.description}>{description}</p>
        <div className={styles.footer}>
          <span className={styles.points}>${price}</span>
          <button className={styles.claimBtn} onClick={onClaim}>
            Claim
          </button>
        </div>
      </div>
    </div>
  );
}
