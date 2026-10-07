/**
 * CampusBite - Core Data & LocalStorage Management
 * College Canteen Pre-Order System
 */

// SVG Food Illustrations (Clean, high-quality, crisp vector art)
const FoodImages = {
  vegBurger: `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 300" width="100%" height="100%"><rect width="400" height="300" fill="%23FFF2E6"/><circle cx="200" cy="150" r="110" fill="%23FFE3CC"/><path d="M120 130 C120 75, 280 75, 280 130 Z" fill="%23E08A38"/><circle cx="160" cy="100" r="3" fill="%23FFF"/><circle cx="200" cy="90" r="3" fill="%23FFF"/><circle cx="240" cy="105" r="3" fill="%23FFF"/><circle cx="180" cy="115" r="3" fill="%23FFF"/><circle cx="220" cy="115" r="3" fill="%23FFF"/><path d="M110 135 Q130 145 150 135 T190 135 T230 135 T270 135 T290 135" stroke="%23588157" stroke-width="12" fill="none" stroke-linecap="round"/><rect x="115" y="145" width="170" height="12" rx="4" fill="%23E63946"/><rect x="125" y="157" width="150" height="16" rx="4" fill="%23FFB703"/><rect x="110" y="173" width="180" height="24" rx="10" fill="%237F4F24"/><path d="M125 197 C125 215, 275 215, 275 197 Z" fill="%23D47C28"/><text x="200" y="260" font-family="sans-serif" font-size="14" font-weight="600" fill="%237F4F24" text-anchor="middle">Freshly Grilled Veg Patty</text></svg>`,
  
  chickenBurger: `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 300" width="100%" height="100%"><rect width="400" height="300" fill="%23FFF0EB"/><circle cx="200" cy="150" r="110" fill="%23FFE0D4"/><path d="M120 125 C120 68, 280 68, 280 125 Z" fill="%23D97724"/><circle cx="150" cy="95" r="3" fill="%23FFF5EA"/><circle cx="190" cy="85" r="3" fill="%23FFF5EA"/><circle cx="230" cy="92" r="3" fill="%23FFF5EA"/><circle cx="210" cy="108" r="3" fill="%23FFF5EA"/><circle cx="170" cy="110" r="3" fill="%23FFF5EA"/><path d="M112 130 Q130 140 150 130 T190 130 T230 130 T270 130 T288 130" stroke="%23386641" stroke-width="10" fill="none" stroke-linecap="round"/><polygon points="120,140 280,140 270,158 200,165 130,158" fill="%23FFBA08"/><rect x="110" y="158" width="180" height="28" rx="8" fill="%238C3B14"/><rect x="118" y="186" width="164" height="8" rx="3" fill="%23E76F51"/><path d="M125 194 C125 214, 275 214, 275 194 Z" fill="%23C2681B"/><text x="200" y="260" font-family="sans-serif" font-size="14" font-weight="600" fill="%238C3B14" text-anchor="middle">Crispy Chicken Patty & Melt</text></svg>`,
  
  friedRice: `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 300" width="100%" height="100%"><rect width="400" height="300" fill="%23FBF6EA"/><circle cx="200" cy="150" r="115" fill="%23F3E9D2"/><ellipse cx="200" cy="175" rx="100" ry="40" fill="%23E9ECEF"/><path d="M100 175 C100 230, 300 230, 300 175 Z" fill="%23FFFFFF" stroke="%23DEE2E6" stroke-width="2"/><ellipse cx="200" cy="165" rx="88" ry="32" fill="%23F4D35E"/><circle cx="160" cy="160" r="5" fill="%2338B000"/><circle cx="190" cy="150" r="6" fill="%23E85D04"/><circle cx="230" cy="165" r="5" fill="%2338B000"/><circle cx="210" cy="170" r="6" fill="%23E85D04"/><circle cx="175" cy="172" r="4" fill="%2370E000"/><circle cx="245" cy="152" r="5" fill="%23FB8500"/><path d="M170 120 Q190 100 210 120" stroke="%23E0A96D" stroke-width="3" fill="none" opacity="0.6"/><path d="M190 110 Q210 90 230 110" stroke="%23E0A96D" stroke-width="3" fill="none" opacity="0.6"/><line x1="270" y1="80" x2="190" y2="170" stroke="%23A0522D" stroke-width="5" stroke-linecap="round"/><line x1="285" y1="80" x2="205" y2="170" stroke="%238B4513" stroke-width="5" stroke-linecap="round"/><text x="200" y="260" font-family="sans-serif" font-size="14" font-weight="600" fill="%23723C70" text-anchor="middle">Wok-Tossed Veg Fried Rice</text></svg>`,
  
  vegNoodles: `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 300" width="100%" height="100%"><rect width="400" height="300" fill="%23FFF5EB"/><circle cx="200" cy="150" r="115" fill="%23FFE3CC"/><path d="M110 160 C110 220, 290 220, 290 160 Z" fill="%23FFFFFF" stroke="%23CBD5E1" stroke-width="3"/><ellipse cx="200" cy="160" rx="90" ry="28" fill="%23F1F5F9"/><path d="M130 160 Q160 140 190 160 T250 160" stroke="%23F39C12" stroke-width="6" fill="none" stroke-linecap="round"/><path d="M140 150 Q180 135 220 150 T270 155" stroke="%23F1C40F" stroke-width="6" fill="none" stroke-linecap="round"/><path d="M150 165 Q190 145 230 165 T260 162" stroke="%23E67E22" stroke-width="6" fill="none" stroke-linecap="round"/><rect x="170" y="145" width="20" height="5" rx="2" fill="%2327AE60" transform="rotate(20 180 147)"/><rect x="220" y="152" width="18" height="5" rx="2" fill="%23E74C3C" transform="rotate(-15 229 154)"/><rect x="195" y="160" width="16" height="5" rx="2" fill="%232ECC71" transform="rotate(45 203 162)"/><path d="M210 90 L200 155" stroke="%23795548" stroke-width="5" stroke-linecap="round"/><path d="M225 90 L212 155" stroke="%235D4037" stroke-width="5" stroke-linecap="round"/><text x="200" y="260" font-family="sans-serif" font-size="14" font-weight="600" fill="%23B3541E" text-anchor="middle">Spicy Hakka Noodles</text></svg>`,
  
  samosa: `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 300" width="100%" height="100%"><rect width="400" height="300" fill="%23FFF7ED"/><circle cx="200" cy="150" r="115" fill="%23FFEDD5"/><ellipse cx="200" cy="190" rx="100" ry="30" fill="%23FED7AA"/><polygon points="200,90 140,195 260,195" fill="%23D97706" stroke="%23B45309" stroke-width="4" stroke-linejoin="round"/><polygon points="200,90 200,195 260,195" fill="%23B45309" opacity="0.3"/><circle cx="180" cy="165" r="4" fill="%2392400E"/><circle cx="215" cy="150" r="4" fill="%2392400E"/><circle cx="195" cy="135" r="3" fill="%2392400E"/><circle cx="280" cy="180" r="22" fill="%2322C55E" opacity="0.85"/><circle cx="280" cy="180" r="16" fill="%2316A34A"/><text x="200" y="260" font-family="sans-serif" font-size="14" font-weight="600" fill="%23B45309" text-anchor="middle">Crispy Potato Samosa</text></svg>`,
  
  masalaDosa: `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 300" width="100%" height="100%"><rect width="400" height="300" fill="%23F2FBF0"/><circle cx="200" cy="150" r="115" fill="%23DCFCE7"/><rect x="90" y="110" width="220" height="120" rx="20" fill="%2315803D" opacity="0.75"/><ellipse cx="200" cy="160" rx="100" ry="30" fill="%23F59E0B" stroke="%23D97706" stroke-width="3"/><ellipse cx="200" cy="155" rx="85" ry="20" fill="%23FBBF24"/><circle cx="130" cy="180" r="18" fill="%23FEF08A"/><circle cx="130" cy="180" r="12" fill="%23EAB308"/><circle cx="270" cy="180" r="18" fill="%23FEE2E2"/><circle cx="270" cy="180" r="12" fill="%23EF4444"/><circle cx="200" cy="195" r="18" fill="%23FFFFFF"/><circle cx="200" cy="195" r="12" fill="%23E2E8F0"/><text x="200" y="260" font-family="sans-serif" font-size="14" font-weight="600" fill="%2315803D" text-anchor="middle">South Indian Masala Dosa</text></svg>`,
  
  chaiTea: `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 300" width="100%" height="100%"><rect width="400" height="300" fill="%23FFF6E9"/><circle cx="200" cy="150" r="115" fill="%23FFE6C7"/><ellipse cx="200" cy="210" rx="70" ry="18" fill="%23E2D4C3"/><path d="M150 140 L160 205 Q200 215 240 205 L250 140 Z" fill="%23C27838" stroke="%239A5722" stroke-width="4"/><ellipse cx="200" cy="140" rx="50" ry="14" fill="%23854215"/><ellipse cx="200" cy="142" rx="42" ry="10" fill="%23DDA15E"/><path d="M245 155 C270 155 270 190 240 195" stroke="%239A5722" stroke-width="5" fill="none" stroke-linecap="round"/><path d="M185 115 Q195 95 185 75" stroke="%23A06B43" stroke-width="3" fill="none" opacity="0.6"/><path d="M210 115 Q220 95 210 75" stroke="%23A06B43" stroke-width="3" fill="none" opacity="0.6"/><text x="200" y="260" font-family="sans-serif" font-size="14" font-weight="600" fill="%23854215" text-anchor="middle">Hot Masala Cutting Chai</text></svg>`,
  
  coffee: `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 300" width="100%" height="100%"><rect width="400" height="300" fill="%23F5EFE6"/><circle cx="200" cy="150" r="115" fill="%23E8DFD8"/><ellipse cx="200" cy="215" rx="75" ry="18" fill="%23C7B198"/><path d="M145 135 L155 205 Q200 218 245 205 L255 135 Z" fill="%234A3525" stroke="%232C1D11" stroke-width="3"/><ellipse cx="200" cy="135" rx="55" ry="16" fill="%236F4E37"/><ellipse cx="200" cy="137" rx="46" ry="11" fill="%23D4A373"/><path d="M185 137 Q200 142 215 137" stroke="%23FFFFFF" stroke-width="2" fill="none"/><path d="M250 150 C275 150 275 190 242 192" stroke="%232C1D11" stroke-width="5" fill="none"/><text x="200" y="260" font-family="sans-serif" font-size="14" font-weight="600" fill="%234A3525" text-anchor="middle">Filter Coffee</text></svg>`,
  
  limeJuice: `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 300" width="100%" height="100%"><rect width="400" height="300" fill="%23F3FBE8"/><circle cx="200" cy="150" r="115" fill="%23E1F5C4"/><path d="M160 100 L170 220 Q200 228 230 220 L240 100 Z" fill="%23D9F99D" opacity="0.8" stroke="%23A3E635" stroke-width="3"/><ellipse cx="200" cy="100" rx="40" ry="10" fill="%23BEF264"/><line x1="210" y1="60" x2="190" y2="180" stroke="%23EF4444" stroke-width="4" stroke-linecap="round"/><circle cx="150" cy="115" r="22" fill="%2384CC16"/><circle cx="150" cy="115" r="17" fill="%23CCFBF1"/><text x="200" y="260" font-family="sans-serif" font-size="14" font-weight="600" fill="%234D7C0F" text-anchor="middle">Chilled Mint Lime Juice</text></svg>`,
  
  freshJuice: `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 300" width="100%" height="100%"><rect width="400" height="300" fill="%23FFF1F2"/><circle cx="200" cy="150" r="115" fill="%23FFE4E6"/><path d="M160 100 L170 220 Q200 228 230 220 L240 100 Z" fill="%23FB7185" opacity="0.85" stroke="%23F43F5E" stroke-width="3"/><ellipse cx="200" cy="100" rx="40" ry="10" fill="%23FDA4AF"/><line x1="210" y1="60" x2="185" y2="190" stroke="%23FBBF24" stroke-width="4" stroke-linecap="round"/><circle cx="245" cy="115" r="20" fill="%23F97316"/><circle cx="245" cy="115" r="15" fill="%23FFEDD5"/><text x="200" y="260" font-family="sans-serif" font-size="14" font-weight="600" fill="%23BE123C" text-anchor="middle">Fresh Seasonal Fruit Juice</text></svg>`,

  brownie: `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 300" width="100%" height="100%"><rect width="400" height="300" fill="%23FDF6E2"/><circle cx="200" cy="150" r="115" fill="%23F7E5C8"/><rect x="130" y="120" width="140" height="90" rx="10" fill="%233E2723" stroke="%23271714" stroke-width="4"/><rect x="140" y="115" width="120" height="20" rx="5" fill="%235D4037"/><circle cx="160" cy="150" r="5" fill="%23D7CCC8"/><circle cx="210" cy="140" r="4" fill="%23D7CCC8"/><circle cx="240" cy="165" r="5" fill="%23D7CCC8"/><path d="M140 135 Q170 145 200 135 T260 140" stroke="%238D6E63" stroke-width="3" fill="none"/><text x="200" y="260" font-family="sans-serif" font-size="14" font-weight="600" fill="%233E2723" text-anchor="middle">Rich Choco Walnut Brownie</text></svg>`,

  gulabJamun: `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 300" width="100%" height="100%"><rect width="400" height="300" fill="%23FFF5ED"/><circle cx="200" cy="150" r="115" fill="%23FEEAD6"/><ellipse cx="200" cy="180" rx="90" ry="35" fill="%23E2E8F0"/><circle cx="170" cy="160" r="32" fill="%2378350F"/><circle cx="225" cy="160" r="32" fill="%2392400E"/><circle cx="170" cy="155" r="6" fill="%23FDE68A" opacity="0.6"/><circle cx="225" cy="155" r="6" fill="%23FDE68A" opacity="0.6"/><text x="200" y="260" font-family="sans-serif" font-size="14" font-weight="600" fill="%2378350F" text-anchor="middle">Warm Gulab Jamun (2 Pcs)</text></svg>`,

  eggRoll: `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 300" width="100%" height="100%"><rect width="400" height="300" fill="%23FFF6E8"/><circle cx="200" cy="150" r="115" fill="%23FFE8C8"/><g transform="rotate(-15 200 150)"><rect x="110" y="115" width="190" height="70" rx="25" fill="%23D97706" stroke="%23B45309" stroke-width="4"/><rect x="170" y="112" width="125" height="76" rx="20" fill="%23FBBF24"/><ellipse cx="115" cy="150" rx="14" ry="26" fill="%23FEF08A"/><circle cx="115" cy="150" r="8" fill="%23F59E0B"/><path d="M120 135 Q135 150 120 165" stroke="%2322C55E" stroke-width="4" fill="none"/><path d="M130 140 Q145 150 130 160" stroke="%23EF4444" stroke-width="4" fill="none"/><rect x="180" y="110" width="70" height="80" rx="6" fill="%23FFFFFF" opacity="0.85" stroke="%23E2E8F0" stroke-width="2"/></g><text x="200" y="260" font-family="sans-serif" font-size="14" font-weight="600" fill="%23B45309" text-anchor="middle">Kolkata Style Egg Roll</text></svg>`,

  paneerRoll: `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 300" width="100%" height="100%"><rect width="400" height="300" fill="%23FFF2ED"/><circle cx="200" cy="150" r="115" fill="%23FFE2D6"/><g transform="rotate(-12 200 150)"><rect x="110" y="115" width="190" height="70" rx="25" fill="%23EA580C" stroke="%23C2410C" stroke-width="4"/><ellipse cx="115" cy="150" rx="14" ry="26" fill="%23FED7AA"/><rect x="105" y="138" width="14" height="14" rx="2" fill="%23FFFFFF" stroke="%23EA580C" stroke-width="2"/><rect x="108" y="148" width="12" height="12" rx="2" fill="%23FFFFFF" stroke="%23EA580C" stroke-width="2"/><path d="M116 130 Q130 150 116 170" stroke="%2316A34A" stroke-width="5" fill="none" stroke-linecap="round"/><rect x="180" y="110" width="70" height="80" rx="6" fill="%23FFFFFF" opacity="0.85" stroke="%23CBD5E1" stroke-width="2"/></g><text x="200" y="260" font-family="sans-serif" font-size="14" font-weight="600" fill="%23C2410C" text-anchor="middle">Tandoori Paneer Tikka Roll</text></svg>`,

  sandwich: `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 300" width="100%" height="100%"><rect width="400" height="300" fill="%23FEF9ED"/><circle cx="200" cy="150" r="115" fill="%23FDF0CD"/><polygon points="120,200 280,200 200,90" fill="%23F59E0B" stroke="%23D97706" stroke-width="4" stroke-linejoin="round"/><line x1="150" y1="180" x2="190" y2="120" stroke="%2378350F" stroke-width="3" stroke-linecap="round"/><line x1="180" y1="190" x2="220" y2="130" stroke="%2378350F" stroke-width="3" stroke-linecap="round"/><line x1="210" y1="195" x2="250" y2="140" stroke="%2378350F" stroke-width="3" stroke-linecap="round"/><rect x="135" y="178" width="130" height="8" rx="3" fill="%2322C55E"/><rect x="140" y="186" width="120" height="6" rx="2" fill="%23EF4444"/><rect x="138" y="192" width="124" height="6" rx="2" fill="%23FBBF24"/><text x="200" y="260" font-family="sans-serif" font-size="14" font-weight="600" fill="%23B45309" text-anchor="middle">Grilled Veg Club Sandwich</text></svg>`,

  vegRice: `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 300" width="100%" height="100%"><rect width="400" height="300" fill="%23F6FBF2"/><circle cx="200" cy="150" r="115" fill="%23E4F5DC"/><path d="M100 170 C100 230, 300 230, 300 170 Z" fill="%23FFFFFF" stroke="%23CBD5E1" stroke-width="3"/><ellipse cx="200" cy="165" rx="92" ry="32" fill="%23FEF3C7"/><circle cx="150" cy="160" r="6" fill="%2322C55E"/><circle cx="180" cy="152" r="5" fill="%23EA580C"/><circle cx="210" cy="164" r="6" fill="%2322C55E"/><circle cx="235" cy="155" r="5" fill="%23EA580C"/><circle cx="170" cy="172" r="5" fill="%2316A34A"/><circle cx="250" cy="168" r="4" fill="%23F59E0B"/><path d="M165 115 Q180 95 195 115" stroke="%2384CC16" stroke-width="3" fill="none" opacity="0.6"/><path d="M195 105 Q210 85 225 105" stroke="%2384CC16" stroke-width="3" fill="none" opacity="0.6"/><text x="200" y="260" font-family="sans-serif" font-size="14" font-weight="600" fill="%2315803D" text-anchor="middle">Special Ghee Veg Rice</text></svg>`,

  biryani: `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 300" width="100%" height="100%"><rect width="400" height="300" fill="%23FFF6ED"/><circle cx="200" cy="150" r="115" fill="%23FFEDD5"/><ellipse cx="200" cy="180" rx="100" ry="32" fill="%23D97706" stroke="%2392400E" stroke-width="4"/><path d="M100 175 C100 225, 300 225, 300 175 Z" fill="%2378350F"/><ellipse cx="200" cy="160" rx="88" ry="32" fill="%23F59E0B"/><ellipse cx="200" cy="158" rx="72" ry="24" fill="%23FBBF24"/><path d="M150 145 C150 135, 185 135, 185 155 Z" fill="%2392400E"/><circle cx="225" cy="150" r="12" fill="%23B45309"/><ellipse cx="240" cy="160" rx="8" ry="5" fill="%23FFFFFF"/><path d="M170 155 Q190 145 210 160" stroke="%2316A34A" stroke-width="4" fill="none" stroke-linecap="round"/><circle cx="165" cy="162" r="3" fill="%23EF4444"/><circle cx="215" cy="148" r="3" fill="%23EF4444"/><text x="200" y="260" font-family="sans-serif" font-size="14" font-weight="600" fill="%2392400E" text-anchor="middle">Hyderabadi Dum Biryani</text></svg>`
};

// Real High-Resolution Food Photography Images
const FoodPhotos = {
  vegBurger: 'https://images.unsplash.com/photo-1550547660-d9450f859349?w=600&auto=format&fit=crop&q=80',
  chickenBurger: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=600&auto=format&fit=crop&q=80',
  friedRice: 'https://images.unsplash.com/photo-1603133872878-684f208fb84b?w=600&auto=format&fit=crop&q=80',
  vegNoodles: 'https://images.unsplash.com/photo-1585032226651-759b368d7246?w=600&auto=format&fit=crop&q=80',
  samosa: 'https://images.unsplash.com/photo-1601050690597-df0568f70950?w=600&auto=format&fit=crop&q=80',
  masalaDosa: 'https://images.unsplash.com/photo-1668236543090-82eba5ee5976?w=600&auto=format&fit=crop&q=80',
  chaiTea: 'https://images.unsplash.com/photo-1576092768241-dec231879fc3?w=600&auto=format&fit=crop&q=80',
  coffee: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?w=600&auto=format&fit=crop&q=80',
  limeJuice: 'https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?w=600&auto=format&fit=crop&q=80',
  freshJuice: 'https://images.unsplash.com/photo-1613478223719-2ab802602423?w=600&auto=format&fit=crop&q=80',
  brownie: 'https://images.unsplash.com/photo-1606313564200-e75d5e30476c?w=600&auto=format&fit=crop&q=80',
  gulabJamun: 'https://images.unsplash.com/photo-1605197148596-f947ee7452d3?w=600&auto=format&fit=crop&q=80',
  eggRoll: 'https://images.unsplash.com/photo-1626777552726-4a6b54c97e46?w=600&auto=format&fit=crop&q=80',
  paneerRoll: 'https://images.unsplash.com/photo-1626777553634-118c7bf9e14a?w=600&auto=format&fit=crop&q=80',
  sandwich: 'https://images.unsplash.com/photo-1528735602780-2552fd46c7af?w=600&auto=format&fit=crop&q=80',
  vegRice: 'https://images.unsplash.com/photo-1596797038530-2c107229654b?w=600&auto=format&fit=crop&q=80',
  biryani: 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=600&auto=format&fit=crop&q=80'
};

// Initial Seed Menu Items
const INITIAL_MENU = [
  {
    id: 'food_1',
    name: 'Veg Burger',
    category: 'Fast Food',
    price: 60,
    isVeg: true,
    available: true,
    description: 'Crispy seasoned vegetable patty stacked with crisp iceberg lettuce, sliced tomatoes, and house mayo on a toasted sesame bun.',
    ingredients: 'Potato-herb patty, sesame brioche bun, fresh lettuce, tomato, signature house sauce',
    image: FoodPhotos.vegBurger,
    fallbackImage: FoodImages.vegBurger,
    popular: true
  },
  {
    id: 'food_2',
    name: 'Chicken Burger',
    category: 'Fast Food',
    price: 80,
    isVeg: false,
    available: true,
    description: 'Tender chicken fillet cooked with aromatic herbs, crowned with melting cheddar cheese and zesty peri-peri dressing.',
    ingredients: 'Grilled chicken fillet, toasted bun, cheddar slice, gherkins, peri-peri relish',
    image: FoodPhotos.chickenBurger,
    fallbackImage: FoodImages.chickenBurger,
    popular: true
  },
  {
    id: 'food_3',
    name: 'Fried Rice',
    category: 'Meals',
    price: 80,
    isVeg: true,
    available: true,
    description: 'Wok-tossed long-grain basmati rice with crunchy carrots, bell peppers, french beans, spring onions, and light soy seasoning.',
    ingredients: 'Basmati rice, bell peppers, carrots, spring onions, garlic soy seasoning',
    image: FoodPhotos.friedRice,
    fallbackImage: FoodImages.friedRice,
    popular: true
  },
  {
    id: 'food_4',
    name: 'Veg Noodles',
    category: 'Meals',
    price: 70,
    isVeg: true,
    available: true,
    description: 'Street-style Hakka noodles stir-fried on high flame with fresh shredded vegetables and savory Asian chili oil.',
    ingredients: 'Wheat noodles, cabbage, bell peppers, carrots, chili garlic sauce',
    image: FoodPhotos.vegNoodles,
    fallbackImage: FoodImages.vegNoodles,
    popular: true
  },
  {
    id: 'food_5',
    name: 'Samosa',
    category: 'Snacks',
    price: 20,
    isVeg: true,
    available: true,
    description: 'Crisp, golden-brown triangle pastry packed with spiced cumin mashed potatoes and green peas. Served with tangy mint chutney.',
    ingredients: 'Flaky pastry, cumin spiced potatoes, tender green peas, mint coriander dip',
    image: FoodPhotos.samosa,
    fallbackImage: FoodImages.samosa,
    popular: true
  },
  {
    id: 'food_6',
    name: 'Masala Dosa',
    category: 'Breakfast',
    price: 50,
    isVeg: true,
    available: true,
    description: 'Authentic thin and crispy South Indian fermented crepe stuffed with warm potato masala, served with coconut chutney & piping hot sambar.',
    ingredients: 'Fermented rice-lentil batter, spiced potato mash, curry leaves, coconut chutney, sambar',
    image: FoodPhotos.masalaDosa,
    fallbackImage: FoodImages.masalaDosa,
    popular: true
  },
  {
    id: 'food_7',
    name: 'Tea',
    category: 'Drinks',
    price: 15,
    isVeg: true,
    available: true,
    description: 'Authentic Indian cutting chai brewed with premium Assam tea leaves, fresh crushed ginger, and aromatic green cardamom.',
    ingredients: 'Assam tea leaves, whole milk, freshly crushed ginger, green cardamom, cane sugar',
    image: FoodPhotos.chaiTea,
    fallbackImage: FoodImages.chaiTea,
    popular: false
  },
  {
    id: 'food_8',
    name: 'Coffee',
    category: 'Drinks',
    price: 20,
    isVeg: true,
    available: true,
    description: 'Freshly decocted South Indian filter coffee frothed with warm whole milk for a rich, aromatic morning pickup.',
    ingredients: 'Dark roasted Arabica-chicory blend, steamed cow milk, raw sugar',
    image: FoodPhotos.coffee,
    fallbackImage: FoodImages.coffee,
    popular: false
  },
  {
    id: 'food_9',
    name: 'Lime Juice',
    category: 'Drinks',
    price: 30,
    isVeg: true,
    available: true,
    description: 'Instant thirst quencher made with freshly squeezed lemons, crushed mint leaves, rock salt, and chilled soda or water.',
    ingredients: 'Fresh yellow limes, garden mint, black salt, chilled soda water',
    image: FoodPhotos.limeJuice,
    fallbackImage: FoodImages.limeJuice,
    popular: false
  },
  {
    id: 'food_10',
    name: 'Fresh Juice',
    category: 'Drinks',
    price: 40,
    isVeg: true,
    available: true,
    description: 'Chilled cold-pressed seasonal fruits prepared fresh on order with zero added artificial colors or preservatives.',
    ingredients: 'Seasonal Valencia oranges, sweet lime, watermelon cubes',
    image: FoodPhotos.freshJuice,
    fallbackImage: FoodImages.freshJuice,
    popular: true
  },
  {
    id: 'food_11',
    name: 'Chocolate Brownie',
    category: 'Desserts',
    price: 45,
    isVeg: true,
    available: true,
    description: 'Fudgy, dense Belgian cocoa brownie baked fresh in the morning and loaded with roasted crunchy walnut chunks.',
    ingredients: 'Dark chocolate, roasted walnuts, butter, cocoa, brown sugar',
    image: FoodPhotos.brownie,
    fallbackImage: FoodImages.brownie,
    popular: false
  },
  {
    id: 'food_12',
    name: 'Gulab Jamun (2 pcs)',
    category: 'Desserts',
    price: 35,
    isVeg: true,
    available: true,
    description: 'Melt-in-mouth golden fried milk solid dumplings drenched in warm fragrant saffron, cardamom, and rose water syrup.',
    ingredients: 'Mawa khoya, green cardamom, rose water, saffron sugar syrup',
    image: FoodPhotos.gulabJamun,
    fallbackImage: FoodImages.gulabJamun,
    popular: false
  },
  {
    id: 'food_13',
    name: 'Egg Roll',
    category: 'Fast Food',
    price: 50,
    isVeg: false,
    available: true,
    description: 'Flaky golden paratha layered with seasoned beaten egg, fresh crunchy red onions, shredded cabbage, and zesty chili sauce.',
    ingredients: 'Fresh farm eggs, wheat paratha wrap, sliced red onions, shredded cabbage, chaat masala, tangy chili sauce',
    image: FoodPhotos.eggRoll,
    fallbackImage: FoodImages.eggRoll,
    popular: true
  },
  {
    id: 'food_14',
    name: 'Paneer Roll',
    category: 'Fast Food',
    price: 65,
    isVeg: true,
    available: true,
    description: 'Tender marinated cottage cheese cubes char-grilled in tandoori spices and rolled in a crisp flaky paratha with mint spread.',
    ingredients: 'Tandoori paneer cubes, handmade paratha wrap, green bell pepper, sliced onions, mint coriander chutney',
    image: FoodPhotos.paneerRoll,
    fallbackImage: FoodImages.paneerRoll,
    popular: true
  },
  {
    id: 'food_15',
    name: 'Veg Grilled Sandwich',
    category: 'Snacks',
    price: 45,
    isVeg: true,
    available: true,
    description: 'Crisp golden-grilled sandwich stuffed with spiced potatoes, sliced cucumber, juicy tomatoes, and melted cheese.',
    ingredients: 'Fresh bread slices, spiced potato mash, sliced cucumber, ripe tomatoes, cheddar slice, green chutney',
    image: FoodPhotos.sandwich,
    fallbackImage: FoodImages.sandwich,
    popular: true
  },
  {
    id: 'food_16',
    name: 'Veg Rice',
    category: 'Meals',
    price: 75,
    isVeg: true,
    available: true,
    description: 'Aromatic long-grain basmati rice cooked with fresh garden peas, diced carrots, french beans, pure ghee, and roasted whole spices.',
    ingredients: 'Premium basmati rice, green peas, carrots, french beans, pure ghee, fried onions, royal cumin',
    image: FoodPhotos.vegRice,
    fallbackImage: FoodImages.vegRice,
    popular: true
  },
  {
    id: 'food_17',
    name: 'Chicken Dum Biryani',
    category: 'Meals',
    price: 110,
    isVeg: false,
    available: true,
    description: 'Royal aromatic dum biryani layered with succulent marinated chicken, saffron milk, fried golden onions, and served with cool raita.',
    ingredients: 'Basmati rice, tender spiced chicken, saffron, fried onions (birista), fresh mint, curd raita',
    image: FoodPhotos.biryani,
    fallbackImage: FoodImages.biryani,
    popular: true
  }
];

// Sample Initial Orders to populate Admin reports & tracking right away
const INITIAL_ORDERS = [
  {
    id: 'CB-1001',
    token: 'C-101',
    studentName: 'Aarav Sharma',
    studentId: 'BCA2024018',
    department: 'BCA',
    year: '2nd Year',
    phone: '9876543210',
    items: [
      { id: 'food_1', name: 'Veg Burger', price: 60, quantity: 2, isVeg: true },
      { id: 'food_9', name: 'Lime Juice', price: 30, quantity: 2, isVeg: true }
    ],
    subtotal: 180,
    convenienceFee: 0,
    total: 180,
    pickupTime: '11:00 AM',
    paymentMethod: 'UPI Demo',
    paymentStatus: 'Paid',
    status: 'PREPARING',
    createdAt: Date.now() - 1000 * 60 * 25,
    date: 'Today',
    time: '10:45 AM'
  },
  {
    id: 'CB-1002',
    token: 'C-102',
    studentName: 'Priya Patel',
    studentId: 'BCA2023045',
    department: 'BCA',
    year: '3rd Year',
    phone: '9812345678',
    items: [
      { id: 'food_6', name: 'Masala Dosa', price: 50, quantity: 1, isVeg: true },
      { id: 'food_8', name: 'Coffee', price: 20, quantity: 1, isVeg: true }
    ],
    subtotal: 70,
    convenienceFee: 0,
    total: 70,
    pickupTime: '11:30 AM',
    paymentMethod: 'Campus Wallet Demo',
    paymentStatus: 'Paid',
    status: 'READY',
    createdAt: Date.now() - 1000 * 60 * 50,
    date: 'Today',
    time: '10:20 AM'
  },
  {
    id: 'CB-1003',
    token: 'C-103',
    studentName: 'Rohan Verma',
    studentId: 'BTECH2022102',
    department: 'Computer Science',
    year: '4th Year',
    phone: '9988776655',
    items: [
      { id: 'food_2', name: 'Chicken Burger', price: 80, quantity: 1, isVeg: false },
      { id: 'food_4', name: 'Veg Noodles', price: 70, quantity: 1, isVeg: true }
    ],
    subtotal: 150,
    convenienceFee: 0,
    total: 150,
    pickupTime: 'ASAP',
    paymentMethod: 'Pay At Canteen',
    paymentStatus: 'Pending',
    status: 'ORDER PLACED',
    createdAt: Date.now() - 1000 * 60 * 10,
    date: 'Today',
    time: '11:05 AM'
  },
  {
    id: 'CB-1004',
    token: 'C-104',
    studentName: 'Sneha Nair',
    studentId: 'BBA2024099',
    department: 'BBA',
    year: '1st Year',
    phone: '9765432109',
    items: [
      { id: 'food_5', name: 'Samosa', price: 20, quantity: 3, isVeg: true },
      { id: 'food_7', name: 'Tea', price: 15, quantity: 2, isVeg: true }
    ],
    subtotal: 90,
    convenienceFee: 0,
    total: 90,
    pickupTime: '10:30 AM',
    paymentMethod: 'UPI Demo',
    paymentStatus: 'Paid',
    status: 'COLLECTED',
    createdAt: Date.now() - 1000 * 60 * 95,
    date: 'Today',
    time: '09:40 AM'
  }
];

// Initial Demo Student Account
const INITIAL_STUDENT = {
  name: 'Aarav Sharma',
  studentId: 'BCA2024018',
  email: 'aarav.sharma@college.edu',
  department: 'Computer Applications (BCA)',
  year: '2nd Year',
  phone: '9876543210',
  favouriteFood: 'Veg Burger',
  role: 'student'
};

// Storage Utilities
const Storage = {
  getMenu() {
    const data = localStorage.getItem('cb_menu');
    if (!data) {
      localStorage.setItem('cb_menu', JSON.stringify(INITIAL_MENU));
      return INITIAL_MENU;
    }
    try {
      let menu = JSON.parse(data);
      let updated = false;

      INITIAL_MENU.forEach(seed => {
        const existing = menu.find(m => m.id === seed.id || m.name.toLowerCase() === seed.name.toLowerCase());
        if (existing) {
          // If existing had the old SVG data URI or is missing fallback, upgrade to photo
          if (!existing.image || existing.image.startsWith('data:image/svg+xml') || !existing.fallbackImage) {
            existing.image = seed.image;
            existing.fallbackImage = seed.fallbackImage;
            updated = true;
          }
        } else {
          menu.push(seed);
          updated = true;
        }
      });

      if (updated) {
        localStorage.setItem('cb_menu', JSON.stringify(menu));
      }
      return menu;
    } catch (e) {
      return INITIAL_MENU;
    }
  },

  saveMenu(menu) {
    localStorage.setItem('cb_menu', JSON.stringify(menu));
    window.dispatchEvent(new Event('cb_menu_updated'));
  },

  getCart() {
    const data = localStorage.getItem('cb_cart');
    if (!data) return [];
    try {
      return JSON.parse(data);
    } catch (e) {
      return [];
    }
  },

  saveCart(cart) {
    localStorage.setItem('cb_cart', JSON.stringify(cart));
    window.dispatchEvent(new Event('cb_cart_updated'));
  },

  getOrders() {
    const data = localStorage.getItem('cb_orders');
    if (!data) {
      localStorage.setItem('cb_orders', JSON.stringify(INITIAL_ORDERS));
      return INITIAL_ORDERS;
    }
    try {
      return JSON.parse(data);
    } catch (e) {
      return INITIAL_ORDERS;
    }
  },

  saveOrders(orders) {
    localStorage.setItem('cb_orders', JSON.stringify(orders));
    window.dispatchEvent(new Event('cb_orders_updated'));
  },

  getNextToken() {
    let current = parseInt(localStorage.getItem('cb_token_counter') || '104', 10);
    current += 1;
    localStorage.setItem('cb_token_counter', current.toString());
    return `C-${current}`;
  },

  getCurrentUser() {
    const data = localStorage.getItem('cb_current_user');
    if (!data) {
      // Default to demo student so app is immediately usable without forcing roadblock
      localStorage.setItem('cb_current_user', JSON.stringify(INITIAL_STUDENT));
      return INITIAL_STUDENT;
    }
    try {
      return JSON.parse(data);
    } catch (e) {
      return INITIAL_STUDENT;
    }
  },

  saveCurrentUser(user) {
    if (user) {
      localStorage.setItem('cb_current_user', JSON.stringify(user));
    } else {
      localStorage.removeItem('cb_current_user');
    }
    window.dispatchEvent(new Event('cb_user_updated'));
  },

  getRegisteredUsers() {
    const data = localStorage.getItem('cb_registered_users');
    if (!data) {
      const initList = [
        { ...INITIAL_STUDENT, password: 'password123' },
        { name: 'Admin Canteen', email: 'admin@campusbite.com', studentId: 'ADMIN01', role: 'admin', password: 'admin' }
      ];
      localStorage.setItem('cb_registered_users', JSON.stringify(initList));
      return initList;
    }
    try {
      return JSON.parse(data);
    } catch (e) {
      return [];
    }
  },

  saveRegisteredUsers(users) {
    localStorage.setItem('cb_registered_users', JSON.stringify(users));
  }
};

// Initialize default storage on first load
(function initStorage() {
  Storage.getMenu();
  Storage.getOrders();
  Storage.getCurrentUser();
  Storage.getRegisteredUsers();
})();
