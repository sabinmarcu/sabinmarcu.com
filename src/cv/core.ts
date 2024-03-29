import {
  createContext,
  useContext,
  useMemo,
  useCallback,
} from 'react';
import smoothscroll from 'smoothscroll-polyfill';
import { Query } from '../config/schema';
import { usePrefersReducedMotion } from '../hooks/usePrefersReducedMotion';

try {
  smoothscroll.polyfill();
} catch (e) {
  /* noop - catching for static build */
}

export const CVContext = createContext<Query>({} as Query);
export const useCV = () => useContext(CVContext);

export const makePageId = (
  id: string,
  type: ContentTypes,
) => `link-${type}-${id}`;

export const usePageId = (
  id: string,
  type: ContentTypes,
) => useMemo(
  () => makePageId(id, type),
  [id, type],
);

export const useScrollToPageId = (
  id: string,
  type: ContentTypes,
) => {
  const prefersReducedMotion = usePrefersReducedMotion();
  const pageId = useMemo(
    () => makePageId(id, type),
    [id, type],
  );
  const handler = useCallback(
    (e) => {
      const doc = typeof document === 'undefined' ? null : document;
      if (!doc) {
        return;
      }
      const element = doc.getElementById(pageId);
      if (element) {
        e.preventDefault();
        element.scrollIntoView({
          behavior: prefersReducedMotion ? 'auto' : 'smooth',
          block: 'center',
        });
      }
    },
    [pageId, prefersReducedMotion],
  );
  return handler;
};

export enum ContentTypes {
  PROJECT,
  EXPERIENCE,
}
