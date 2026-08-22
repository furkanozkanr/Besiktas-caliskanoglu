// ============================================================
// Merkezi futbolcu veri yapısı.
// Yeni bir hologram kartı eklemek için buraya yeni bir obje ekleyin.
//
// ÖNEMLİ: `image` alanları /src/assets/players/ klasöründeki
// PLACEHOLDER görsellere işaret eder. Kendi yasal olarak
// kullanabileceğiniz (kendi çektiğiniz, izinli veya lisanslı)
// görsellerle bu dosyaları değiştirin. İnternetten izinsiz
// görsel indirip bu klasöre koymayın.
// ============================================================

export type PlayerStatus = 'LEGENDARY' | 'ACTIVE' | 'ROOKIE' | 'CAPTAIN';

export interface Player {
  id: string;
  name: string;
  position: string;
  number: number;
  image: string;
  description: string;
  status: PlayerStatus;
  favorite?: boolean;
}

// Placeholder image — swap with /src/assets/players/<file>.webp
const PLACEHOLDER_IMAGE = `${import.meta.env.BASE_URL}assets/players/placeholder.svg`;

export const players: Player[] = [
  {
    id: 'p-01',
    name: '[FUTBOLCU ADI]',
    position: 'FORVET',
    number: 9,
    image: PLACEHOLDER_IMAGE,
    description: 'Fan yapımı kart — gerçek istatistik değildir.',
    status: 'LEGENDARY',
    favorite: true,
  },
  {
    id: 'p-02',
    name: '[FUTBOLCU ADI]',
    position: 'ORTA SAHA',
    number: 10,
    image: PLACEHOLDER_IMAGE,
    description: 'Fan yapımı kart — gerçek istatistik değildir.',
    status: 'CAPTAIN',
  },
  {
    id: 'p-03',
    name: '[FUTBOLCU ADI]',
    position: 'KALECİ',
    number: 1,
    image: PLACEHOLDER_IMAGE,
    description: 'Fan yapımı kart — gerçek istatistik değildir.',
    status: 'ACTIVE',
  },
  {
    id: 'p-04',
    name: '[FUTBOLCU ADI]',
    position: 'STOPER',
    number: 4,
    image: PLACEHOLDER_IMAGE,
    description: 'Fan yapımı kart — gerçek istatistik değildir.',
    status: 'ACTIVE',
  },
  {
    id: 'p-05',
    name: '[FUTBOLCU ADI]',
    position: 'SAĞ BEK',
    number: 2,
    image: PLACEHOLDER_IMAGE,
    description: 'Fan yapımı kart — gerçek istatistik değildir.',
    status: 'ROOKIE',
  },
  {
    id: 'p-06',
    name: '[FUTBOLCU ADI]',
    position: 'SOL KANAT',
    number: 11,
    image: PLACEHOLDER_IMAGE,
    description: 'Fan yapımı kart — gerçek istatistik değildir.',
    status: 'ACTIVE',
  },
];
