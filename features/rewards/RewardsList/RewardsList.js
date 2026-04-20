import { useEffect, useState } from "react";
import OfferCard from "components/OfferCard/OfferCard";
import styles from "./RewardsList.module.css";

const API_URL = "https://fakestoreapi.com/products?limit=6";

export default function RewardsList({ categoryId }) {
  const [items, setItems] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(function () {
    async function fetchRewards() {
      setIsLoading(true);

      const url = categoryId
        ? `https://fakestoreapi.com/products/category/${encodeURIComponent(
            categoryId,
          )}?limit=6`
        : API_URL;

      const res = await fetch(url);
      const data = await res.json();
      const list = Array.isArray(data) ? data : [];

      setItems(list);
      setIsLoading(false);
    }

    fetchRewards();
  }, [categoryId]);

  if (isLoading) {
    return <div className={styles.spinner}>Loading...</div>;
  }

  return (
    <section className={styles.section}>
      <h2 className={styles.heading}>Available Rewards</h2>
      <div className={styles.grid}>
        {items.map(function (item) {
          return (
            <OfferCard
              key={item.id}
              title={item.title}
              description={item.description}
              price={item.price}
              imageUrl={item.image}
              onClaim={function () {}}
            />
          );
        })}
      </div>
    </section>
  );
}
