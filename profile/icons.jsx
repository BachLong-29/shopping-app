/* global React */
// Icon set — minimal stroke icons (Lucide-style, hand-tuned)

const ICONS = {
  search: 'M11 19a8 8 0 100-16 8 8 0 000 16zM21 21l-4.3-4.3',
  cart: 'M2 3h2.5l2 12.5a2 2 0 002 1.5h8.5a2 2 0 002-1.5L20 7H6.5M9 21a1 1 0 110-2 1 1 0 010 2zM17 21a1 1 0 110-2 1 1 0 010 2z',
  heart: 'M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z',
  user: 'M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2M12 11a4 4 0 100-8 4 4 0 000 8z',
  bell: 'M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9M13.7 21a2 2 0 01-3.4 0',
  menu: 'M3 12h18M3 6h18M3 18h18',
  close: 'M18 6L6 18M6 6l12 12',
  check: 'M20 6L9 17l-5-5',
  chevron_down: 'M6 9l6 6 6-6',
  chevron_right: 'M9 18l6-6-6-6',
  chevron_left: 'M15 18l-6-6 6-6',
  arrow_right: 'M5 12h14M12 5l7 7-7 7',
  arrow_up_right: 'M7 17L17 7M7 7h10v10',
  plus: 'M12 5v14M5 12h14',
  minus: 'M5 12h14',
  star: { fill: 'currentColor', stroke: 'none', d: 'M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z' },
  filter: 'M22 3H2l8 9.46V19l4 2v-8.54L22 3z',
  truck: 'M1 3h15v13H1zM16 8h4l3 3v5h-7M5 21a2 2 0 100-4 2 2 0 000 4zM19 21a2 2 0 100-4 2 2 0 000 4z',
  rotate: 'M3 12a9 9 0 1015-6.7L21 8M21 3v5h-5',
  leaf: 'M11 20A7 7 0 014 13V8a5 5 0 0110 0c0 7-3 12-3 12zM11 20s4-3 4-9c0-4-3-6-3-6',
  chat: 'M21 11.5a8.38 8.38 0 01-.9 3.8 8.5 8.5 0 01-7.6 4.7 8.38 8.38 0 01-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 01-.9-3.8 8.5 8.5 0 014.7-7.6 8.38 8.38 0 013.8-.9h.5a8.48 8.48 0 018 8v.5z',
  sun: 'M12 17a5 5 0 100-10 5 5 0 000 10zM12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42',
  moon: 'M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z',
  trash: 'M3 6h18M19 6l-1 14a2 2 0 01-2 2H8a2 2 0 01-2-2L5 6M10 11v6M14 11v6M9 6V4a2 2 0 012-2h2a2 2 0 012 2v2',
  package: 'M16.5 9.4L7.5 4.21M3.27 6.96L12 12.01l8.73-5.05M12 22.08V12',
  eye: 'M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8zM12 15a3 3 0 100-6 3 3 0 000 6z',
  zap: 'M13 2L3 14h9l-1 8 10-12h-9l1-8z',
  sparkles: 'M12 3l1.9 5.8L20 11l-6.1 1.9L12 19l-1.9-6.1L4 11l6.1-2.2L12 3z',
  shield: 'M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z',
  globe: 'M12 22a10 10 0 100-20 10 10 0 000 20zM2 12h20M12 2a15 15 0 010 20M12 2a15 15 0 000 20',
  map_pin: 'M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0zM12 13a3 3 0 100-6 3 3 0 000 6z',
  mail: 'M4 4h16a2 2 0 012 2v12a2 2 0 01-2 2H4a2 2 0 01-2-2V6a2 2 0 012-2zM22 6l-10 7L2 6',
  phone: 'M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72c.13.96.36 1.9.7 2.81a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.91.34 1.85.57 2.81.7A2 2 0 0122 16.92z',
  layers: 'M12 2l10 6-10 6L2 8l10-6zM2 18l10 6 10-6M2 13l10 6 10-6',
  grid: 'M3 3h7v7H3zM14 3h7v7h-7zM14 14h7v7h-7zM3 14h7v7H3z',
  list: 'M8 6h13M8 12h13M8 18h13M3 6h.01M3 12h.01M3 18h.01',
  command: 'M18 3a3 3 0 00-3 3v12a3 3 0 003 3 3 3 0 003-3 3 3 0 00-3-3H6a3 3 0 00-3 3 3 3 0 003 3 3 3 0 003-3V6a3 3 0 00-3-3 3 3 0 00-3 3 3 3 0 003 3h12a3 3 0 003-3 3 3 0 00-3-3z',
  bookmark: 'M19 21l-7-5-7 5V5a2 2 0 012-2h10a2 2 0 012 2v16z',
  home: 'M3 12l9-9 9 9M5 10v10a1 1 0 001 1h3a1 1 0 001-1v-5a1 1 0 011-1h2a1 1 0 011 1v5a1 1 0 001 1h3a1 1 0 001-1V10',
  upload: 'M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M17 8l-5-5-5 5M12 3v12',
  image: 'M3 3h18v18H3zM8.5 11a2 2 0 100-4 2 2 0 000 4zM21 15l-5-5L5 21',
  alert: 'M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0zM12 9v4M12 17h.01',
  info: 'M12 22a10 10 0 100-20 10 10 0 000 20zM12 16v-4M12 8h.01',
  shopping_bag: 'M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4zM3 6h18M16 10a4 4 0 11-8 0',
  layout_grid: 'M3 3h7v7H3zM14 3h7v7h-7zM14 14h7v7h-7zM3 14h7v7H3z',
  send: 'M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z',
};

function Icon({ name, size = 18, strokeWidth = 1.75, className = '', style = {} }) {
  const icon = ICONS[name];
  if (!icon) return null;
  const isFilled = typeof icon === 'object';
  const path = isFilled ? icon.d : icon;
  return (
    <svg
      width={size} height={size} viewBox="0 0 24 24"
      fill={isFilled ? icon.fill : 'none'}
      stroke={isFilled ? icon.stroke || 'currentColor' : 'currentColor'}
      strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round"
      className={className} style={style} aria-hidden="true"
    >
      <path d={path} />
    </svg>
  );
}

// Stars rating component
function Stars({ value = 5, size = 14 }) {
  const full = Math.floor(value);
  const half = value - full >= 0.5;
  return (
    <span className="stars" aria-label={`${value} stars`}>
      {[0,1,2,3,4].map(i => (
        <svg key={i} width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
          {i < full ? (
            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
          ) : i === full && half ? (
            <>
              <defs>
                <linearGradient id={`half-${i}-${size}`}>
                  <stop offset="50%" stopColor="currentColor"/>
                  <stop offset="50%" stopColor="currentColor" stopOpacity="0.18"/>
                </linearGradient>
              </defs>
              <path fill={`url(#half-${i}-${size})`} d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
            </>
          ) : (
            <path fillOpacity="0.2" d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
          )}
        </svg>
      ))}
    </span>
  );
}

window.Icon = Icon;
window.Stars = Stars;
window.ICONS = ICONS;
