import './bottom-nav.css';

export type Route = 'base' | 'cards' | 'club' | 'sinan' | 'system';

interface NavItem {
  id: Route;
  label: string;
  icon: string;
}

const items: NavItem[] = [
  { id: 'base', label: 'ANA ÜS', icon: '🏠' },
  { id: 'cards', label: 'KARTLAR', icon: '⚽' },
  { id: 'club', label: 'BEŞİKTAŞ', icon: '🖤' },
  { id: 'sinan', label: 'SİNAN ABİ', icon: '👤' },
  { id: 'system', label: 'SİSTEM', icon: '⚙' },
];

interface BottomNavProps {
  active: Route;
  onNavigate: (route: Route) => void;
}

export default function BottomNav({ active, onNavigate }: BottomNavProps) {
  return (
    <nav className="bottom-nav glass-panel" aria-label="Ana gezinme">
      {items.map((item) => {
        const isActive = item.id === active;
        return (
          <button
            key={item.id}
            className={`nav-item ${isActive ? 'nav-item-active' : ''}`}
            onClick={() => onNavigate(item.id)}
            aria-current={isActive ? 'page' : undefined}
          >
            <span className="nav-icon" aria-hidden="true">{item.icon}</span>
            <span className="nav-label">{item.label}</span>
            {isActive && <span className="nav-active-bar" />}
          </button>
        );
      })}
    </nav>
  );
}
