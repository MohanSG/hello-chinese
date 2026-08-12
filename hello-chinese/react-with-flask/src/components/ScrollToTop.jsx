import { useEffect } from "react";
import { useLocation, useNavigationType } from "react-router-dom";

/**
 * Resets scroll on route change.
 *
 * - New navigation (PUSH/REPLACE) -> jump to top.
 * - Back/forward (POP) -> leave the browser's own restoration alone.
 * - A hash in the URL (e.g. /Enroll#sunday-programs) -> scroll to that element.
 *
 * Resets the document AND any inner scroll container, because in some layouts
 * (#root or a wrapper with height:100% / overflow:auto) the document itself
 * never scrolls and window.scrollTo is a no-op.
 */
export default function ScrollToTop() {
  const { pathname, hash } = useLocation();
  const navType = useNavigationType();

  useEffect(() => {
    if (navType === "POP") return;

    if (hash) {
      const el = document.getElementById(hash.slice(1));
      if (el) {
        el.scrollIntoView();
        return;
      }
    }

    // The document, however this browser exposes it.
    window.scrollTo(0, 0);
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;

    // Any element that is actually scrolled — covers inner scroll containers.
    document.querySelectorAll("*").forEach((el) => {
      if (el.scrollTop > 0) el.scrollTop = 0;
    });
  }, [pathname, hash, navType]);

  return null;
}
