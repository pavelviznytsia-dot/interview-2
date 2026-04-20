import { useSyncExternalStore } from "react";

function subscribeToNothing() {
  return function () {};
}

export function useIsClient() {
  return useSyncExternalStore(
    subscribeToNothing,
    function getSnapshot() {
      return true;
    },
    function getServerSnapshot() {
      return false;
    },
  );
}
