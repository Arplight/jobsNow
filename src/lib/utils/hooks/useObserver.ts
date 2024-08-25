import { useCallback, useRef } from "react";

interface UseInfiniteScrollParams {
  loading: boolean;
  hasMore: boolean;
  onLoadMore: () => void;
}
const useObserver = ({
  loading,
  hasMore,
  onLoadMore,
}: UseInfiniteScrollParams) => {
  const observer = useRef<IntersectionObserver | null>(null);
  const lastRef = useCallback(
    (node: HTMLLIElement | null) => {
      if (loading) return;
      if (observer.current) observer.current.disconnect();

      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          onLoadMore();
        }
      });
      if (node) observer.current.observe(node);
    },
    [loading, hasMore, onLoadMore]
  );
  return { lastRef };
};

export default useObserver;
