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

const PRESET_CATEGORY_VALUES = new Set(
  CATEGORY_OPTIONS.map(function (opt) {
    return opt.value;
  }),
);

function categoryFromQuery(query) {
  const raw = query.category;
  if (raw === undefined || raw === null) {
    return "";
  }
  const value = Array.isArray(raw) ? raw[0] : raw;
  return typeof value === "string" ? value : "";
}

export default function Home() {
  const router = useRouter();
  const isClient = useIsClient();
  const routerReady = isClient && router.isReady;
  const rawCategory = categoryFromQuery(router.query);
  const categoryId = routerReady ? rawCategory : "";
  const selectValue = PRESET_CATEGORY_VALUES.has(categoryId)
    ? categoryId
    : "";

  function handleCategoryChange(e) {
    const value = e.target.value;
    const href =
      value === "" ? "/" : `/?category=${encodeURIComponent(value)}`;
    router.push(href, undefined, { scroll: false });
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
          disabled={!routerReady}
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
      {routerReady ? (
        <RewardsList categoryId={categoryId || undefined} />
      ) : (
        <p className={styles.loading}>Loading...</p>
      )}
    </main>
  );
}
