import { useLayoutEffect } from "react";

export function useLockScroll(ref: React.RefObject<HTMLElement | null>, active: boolean) {
  useLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (active) {
      const scrollY = el.scrollTop;
      el.style.overflow = "hidden"; // bloqueia scroll
      el.dataset.scrollY = scrollY.toString();
    } else {
      el.style.overflow = "";
      const scrollY = parseInt(el.dataset.scrollY || "0");
      el.scrollTo(0, scrollY);
    }
  }, [active, ref]);
}
