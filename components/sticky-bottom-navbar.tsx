import Link from 'next/link';

export function StickyBottomNavbar() {
  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 backdrop-blur-lg border-t max-w-3xl mx-auto">
      <div className="container flex items-center justify-around h-16">
        <Link
          href="/"
          className="flex flex-col items-center justify-center text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
        >
          <img
            src="/icons/compass.svg"
            className="h-8 w-8 text-primary-300 hover:text-primary-600"
          />
          <span className="text-primary-600 text-xs font-bold hover:text-primary-600">
            Discover
          </span>
        </Link>
        <Link
          href="/portfolio"
          className="flex flex-col items-center justify-center text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
        >
          <img
            src="/icons/portfolio.svg"
            className="h-8 w-8 text-primary-300 hover:text-primary-600"
          />
          <span className="text-primary-300 hover:text-primary-600 font-bold text-xs">
            Portfolio
          </span>
        </Link>
      </div>
    </nav>
  );
}
