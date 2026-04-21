import { useEffect, useState } from "react";
import OfferCard from "components/OfferCard/OfferCard";
import styles from "./RewardsList.module.css";

const API_URL = "https://fakestoreapi.com/products?limit=6";

export default function RewardsList({ categoryId }) {
  const [items, setItems] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(
    function () {
      let cancelled = false;

      async function fetchRewards() {
        setIsLoading(true);
        setError(null);

        const url = categoryId
          ? `https://fakestoreapi.com/products/category/${encodeURIComponent(
              categoryId,
            )}?limit=6`
          : API_URL;

        try {
          const res = await fetch(url);
          if (!res.ok) {
            throw new Error(`Request failed: ${res.status}`);
          }
          const data = await res.json();
          const list = Array.isArray(data) ? data : [];

          if (!cancelled) {
            setItems(list);
          }
        } catch (err) {
          if (!cancelled) {
            setItems([]);
            setError(err);
          }
        } finally {
          if (!cancelled) {
            setIsLoading(false);
          }
        }
      }

      fetchRewards();

      return function () {
        cancelled = true;
      };
    },
    [categoryId],
  );

  if (isLoading) {
    return <div className={styles.spinner}>Loading...</div>;
  }

  if (error) {
    return (
      <div className={styles.error}>
        Failed to load rewards. Please try again later.
      </div>
    );
  }

  return (
    <section className={styles.section}>
      <h2 className={styles.heading}>Available Rewards</h2>
      {items.length === 0 ? (
        <div className={styles.empty}>No rewards available right now.</div>
      ) : (
        <div className={styles.grid}>
          {items.map(function (item) {
            return (
              <OfferCard
                key={item.id}
                title={item.title}
                description={item.description}
                price={item.price}
                imageUrl={item.image}
                onClaim={function () {
                  console.log("claim", item.id);
                }}
              />
            );
          })}
        </div>
      )}
    </section>
  );
}
