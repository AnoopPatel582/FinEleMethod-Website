export const navigation = [
  { label: 'Home', href: '/' },
  { label: 'Features', href: '/features/' },
  { label: 'Examples', href: '/examples/' },
  { label: 'Documentation', href: '/docs/' },
  { label: 'Download', href: '/download/' },
  { label: 'About', href: '/about/' },
] as const;

export function isCurrentPath(pathname: string, href: string): boolean {
  const path = pathname.replace(/\/+$/, '') || '/';
  const target = href.replace(/\/+$/, '') || '/';
  return path === target || (target !== '/' && path.startsWith(target + '/'));
}
