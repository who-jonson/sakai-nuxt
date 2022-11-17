import { isBrowser } from '@whoj/utils';

export function useAppTheme(theme: string) {
  if (isBrowser) {
    let lingTag = document.querySelector<HTMLLinkElement>('link[id="theme-link"]');

    if (!lingTag) {
      lingTag = document.createElement('link');
      lingTag.id = 'theme-link';
      lingTag.rel = 'stylesheet';
      document.head.appendChild(lingTag);
    }

    lingTag.href = `/themes/${theme}/theme.css`;
  }
}
