import { useState } from "react";
import RewardsList from "features/rewards/RewardsList/RewardsList";
import styles from "@/styles/Home.module.css";

const CATEGORY_OPTIONS = [
  { value: "", label: "All" },
  { value: "electronics", label: "electronics" },
  { value: "jewelery", label: "jewelery" },
  { value: "men's clothing", label: "men's clothing" },
];

export default function Home() {
  const [categoryId, setCategoryId] = useState("");

  return (
    <main className={styles.main}>
      <h1 className={styles.title}>Rewards</h1>
      <p className={styles.lead}>Category (optional).</p>
      <div className={styles.toolbar}>
        <label className={styles.label} htmlFor="category-select">
          Category
        </label>
        <select
          id="category-select"
          className={styles.select}
          value={categoryId}
          onChange={function handleCategoryChange(e) {
            setCategoryId(e.target.value);
          }}
        >
          {CATEGORY_OPTIONS.map(function (opt) {
            return (
              <option key={opt.value || "all"} value={opt.value}>
                {opt.label}
              </option>
            );
          })}
        </select>
      </div>
      <RewardsList categoryId={categoryId || undefined} />
    </main>
  );
}
