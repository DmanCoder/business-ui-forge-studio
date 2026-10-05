'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

import Spark from '@src/components/ui/Spark';
import { NAV_ITEMS, CTA_ITEM, CONTACT_EMAIL } from '@src/config/site';
import { ALLOWED_LOCALES } from '@src/typescriptGlobals/constants';

/** Strip a leading locale segment so active states work on /en/... too. */
const normalizePath = (pathname: string) => {
  const parts = pathname.split('/').filter(Boolean);
  if (parts.length > 0 && ALLOWED_LOCALES.includes(parts[0])) parts.shift();
  return `/${parts.join('/')}`;
};

const Wordmark: React.FC<{ onDark?: boolean }> = ({ onDark = false }) => (
  <span
    className={`flex items-baseline gap-[0.9rem] text-[1.9rem] font-semibold tracking-[-0.02em] ${
      onDark ? 'text-white' : 'text-ink'
    }`}
  >
    <Spark size={1.5} className='self-center' />
    <span>
      UI Forge <span className='font-display italic'>Studio</span>
    </span>
  </span>
);

const Header: React.FC = () => {
  const pathname = usePathname();
  const current = normalizePath(pathname ?? '/');
  const [open, setOpen] = React.useState(false);
  const [lastPathname, setLastPathname] = React.useState(pathname);
  const menuRef = React.useRef<HTMLDivElement | null>(null);
  const toggleRef = React.useRef<HTMLButtonElement | null>(null);

  const isActive = (href: string) => current === href || current.startsWith(`${href}/`);

  // Close on route change (state adjustment during render, not in an effect)
  if (pathname !== lastPathname) {
    setLastPathname(pathname);
    setOpen(false);
  }

  // Scroll lock + Escape + focus management while the mobile menu is open
  React.useEffect(() => {
    if (!open) return;

    const previouslyFocused = document.activeElement as HTMLElement | null;
    document.documentElement.style.overflow = 'hidden';

    const menu = menuRef.current;
    const focusables = menu?.querySelectorAll<HTMLElement>('a[href], button:not([disabled])');
    focusables?.[0]?.focus();

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setOpen(false);
        return;
      }
      if (event.key === 'Tab' && focusables && focusables.length > 0) {
        const first = focusables[0];
        const last = focusables[focusables.length - 1];
        if (event.shiftKey && document.activeElement === first) {
          event.preventDefault();
          last.focus();
        } else if (!event.shiftKey && document.activeElement === last) {
          event.preventDefault();
          first.focus();
        }
      }
    };

    document.addEventListener('keydown', onKeyDown);
    return () => {
      document.documentElement.style.overflow = '';
      document.removeEventListener('keydown', onKeyDown);
      previouslyFocused?.focus();
    };
  }, [open]);

  return (
    <>
      <header className='border-edge bg-paper sticky top-0 z-50 border-b'>
        <div className='container-site flex min-h-[6.4rem] items-center justify-between gap-[1.6rem]'>
          <Link href='/' aria-label='UI Forge Studio home' className='shrink-0'>
            <Wordmark />
          </Link>

          {/* Desktop nav — active page carries a static underline */}
          <nav aria-label='Main' className='hidden items-center gap-[2.8rem] md:flex'>
            {NAV_ITEMS.map((item) => {
              const active = isActive(item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  aria-current={active ? 'page' : undefined}
                  className={`py-[0.6rem] text-[1.45rem] hover:underline hover:underline-offset-[0.8rem] ${
                    active
                      ? 'text-ink decoration-blue font-semibold underline decoration-2 underline-offset-[0.8rem]'
                      : 'text-muted decoration-edge font-medium'
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
            <Link
              href={CTA_ITEM.href}
              className='bg-blue hover:bg-ink ml-[1.2rem] rounded-[0.2rem] px-[1.8rem] py-[1rem] text-[1.4rem] font-semibold text-white'
            >
              {CTA_ITEM.label}
            </Link>
          </nav>

          {/* Mobile menu toggle — instant open/close, no animated bars */}
          <button
            ref={toggleRef}
            type='button'
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls='mobile-menu'
            aria-label={open ? 'Close menu' : 'Open menu'}
            className='text-ink -mr-[1rem] flex h-[4.4rem] items-center justify-center px-[1rem] text-[1.35rem] font-semibold tracking-[0.14em] uppercase md:hidden'
          >
            {open ? 'Close' : 'Menu'}
          </button>
        </div>
      </header>

      {/* Fullscreen mobile menu — indexed editorial link list on ink */}
      <div
        id='mobile-menu'
        ref={menuRef}
        role='dialog'
        aria-modal='true'
        aria-label='Menu'
        className={`bg-ink fixed inset-0 top-[6.5rem] z-60 flex-col justify-between overflow-y-auto md:hidden ${
          open ? 'flex' : 'hidden'
        }`}
      >
        <nav aria-label='Mobile' className='container-site flex flex-col pt-[2.4rem]'>
          {NAV_ITEMS.map((item, index) => {
            const active = isActive(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                aria-current={active ? 'page' : undefined}
                className='flex items-baseline justify-between gap-[1.6rem] border-b border-white/12 py-[2.2rem]'
              >
                <span className='flex items-baseline gap-[1.8rem]'>
                  <span className='tnum text-blue-soft text-[1.3rem] font-medium'>
                    {String(index + 1).padStart(2, '0')}
                  </span>
                  <span
                    className={`font-display text-[3.4rem] leading-none ${
                      active ? 'text-blue-soft italic' : 'text-white'
                    }`}
                  >
                    {item.label}
                  </span>
                </span>
                <span aria-hidden='true' className='text-muted-dark text-[2rem]'>
                  →
                </span>
              </Link>
            );
          })}
        </nav>

        <div className='container-site pt-[3.2rem] pb-[4rem]'>
          <a
            href={`mailto:${CONTACT_EMAIL}`}
            className='text-muted-dark block pb-[2rem] text-[1.45rem] hover:text-white'
          >
            {CONTACT_EMAIL}
          </a>
          <Link
            href={CTA_ITEM.href}
            className='bg-blue hover:text-ink flex w-full items-center justify-between rounded-[0.2rem] px-[2.4rem] py-[1.7rem] text-[1.6rem] font-semibold text-white hover:bg-white'
          >
            {CTA_ITEM.label}
            <span aria-hidden='true'>→</span>
          </Link>
        </div>
      </div>
    </>
  );
};

export default Header;
