import { faMobileScreen, faN } from '@fortawesome/free-solid-svg-icons'
import { faPlaystation, faXbox, faWindows, faApple, faLinux, faAndroid } from '@fortawesome/free-brands-svg-icons'

export const platformMap = {
  PC: faWindows,
  macOS: faApple,
  Linux: faLinux,
  PlayStation: faPlaystation,
  Xbox: faXbox,
  Android: faAndroid,
  iOS: faMobileScreen,
  "Nintendo Switch": faN,
}

const brandAliases = {
  "PlayStation 5": "PlayStation",
  "PlayStation 4": "PlayStation",
  "PlayStation 3": "PlayStation",
  "PlayStation 2": "PlayStation",
  "PS Vita": "PlayStation",
  "PSP": "PlayStation",
  "Xbox One": "Xbox",
  "Xbox Series S/X": "Xbox",
  "Xbox 360": "Xbox",
  "Nintendo 64": "Nintendo Switch",
  "Nintendo DSi": "Nintendo Switch",
  "Nintendo DS": "Nintendo Switch",
  "Nintendo 3DS": "Nintendo Switch",
  "Web": "PC"
};

export function getBrandIcon(brand: string) {
  const mappedBrand = brandAliases[brand as keyof typeof brandAliases] || brand
  return mappedBrand
}

export function getUniqueIcons(icons: string[] | null) {
  if (icons == null) return []
  return Array.from(new Set(icons))
}