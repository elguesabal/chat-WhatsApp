// import { useRef, useCallback } from "react";

// export function useScroll({ hasMore, loadingMore, loadMore }) {
// 	const containerRef = useRef(null);

// 	const handleScroll = useCallback((e) => {
// 		const el = e.currentTarget;

// 		const distanceToBottom =
// 			el.scrollHeight - (el.scrollTop + el.clientHeight);

// 		// quando estiver perto do final
// 		if (distanceToBottom < 100 && hasMore && !loadingMore) {
// 			loadMore();
// 		}

// 	}, [hasMore, loadingMore, loadMore]);

// 	return { containerRef, handleScroll };
// }