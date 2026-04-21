import { useEffect } from "react";
import { useRouter } from "next/router";
import RewardsList from "features/rewards/RewardsList/RewardsList";
import { useIsClient } from "@/hooks/useIsClient";
import styles from "@/styles/Home.module.css";

const CATEGORY_OPTIONS = [
  { value: "", label: "All" },
  { value: "electronics", label: "electronics" },
  { value: "jewelery", label: "jewelery" },
  { value: "men's clothing", label: "men's clothing" },
];

const VALID_CATEGORIES = new Set(
  CATEGORY_OPTIONS.map(function (o) {
    return o.value;
  }).filter(Boolean),
);

export default function Home() {
  const isClient = useIsClient();
  const router = useRouter();

  const rawCategory = router.query.category;
  const queryCategory = Array.isArray(rawCategory) ? rawCategory[0] : rawCategory;
  const selectValue =
    queryCategory && VALID_CATEGORIES.has(queryCategory) ? queryCategory : "";

  const hasCategoryKey = Object.prototype.hasOwnProperty.call(
    router.query,
    "category",
  );
  const isInvalidCategory =
    hasCategoryKey &&
    (Array.isArray(rawCategory) ||
      !queryCategory ||
      !VALID_CATEGORIES.has(queryCategory));

  useEffect(
    function () {
      if (!router.isReady || !isInvalidCategory) return;
      const nextQuery = { ...router.query };
      delete nextQuery.category;
      router.replace(
        { pathname: router.pathname, query: nextQuery },
        undefined,
        { shallow: true, scroll: false },
      );
    },
    [router, router.isReady, isInvalidCategory],
  );

  function handleCategoryChange(e) {
    const value = e.target.value;
    const nextQuery = { ...router.query };
    if (value) {
      nextQuery.category = value;
    } else {
      delete nextQuery.category;
    }
    router.replace(
      { pathname: router.pathname, query: nextQuery },
      undefined,
      { shallow: true, scroll: false },
    );
  }

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
          disabled={!isClient || !router.isReady}
          value={selectValue}
          onChange={handleCategoryChange}
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
      {isClient && router.isReady ? (
        <RewardsList categoryId={selectValue || undefined} />
      ) : (
        <p className={styles.loading}>Loading...</p>
      )}
    </main>
  );
}
