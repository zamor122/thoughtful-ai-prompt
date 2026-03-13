const BULKY_VOLUME_THRESHOLD = 1_000_000;
const BULKY_DIMENSION_THRESHOLD = 150;
const HEAVY_MASS_THRESHOLD = 20;

export type Stack = "STANDARD" | "SPECIAL" | "REJECTED";

export function isBulky(
  width: number,
  height: number,
  length: number
): boolean {
  const volume = width * height * length;

  return (
    volume >= BULKY_VOLUME_THRESHOLD ||
    width >= BULKY_DIMENSION_THRESHOLD ||
    height >= BULKY_DIMENSION_THRESHOLD ||
    length >= BULKY_DIMENSION_THRESHOLD
  );
}

export function isHeavy(mass: number): boolean {
  return mass >= HEAVY_MASS_THRESHOLD;
}

export function sort(
  width: number,
  height: number,
  length: number,
  mass: number
): Stack {
  if (width <= 0 || height <= 0 || length <= 0 || mass < 0) {
    throw new Error("Invalid package dimensions or mass");
  }

  const isPackageBulky = isBulky(width, height, length);
  const isPackageHeavy = isHeavy(mass);

  if (isPackageBulky && isPackageHeavy) return "REJECTED";
  if (isPackageBulky || isPackageHeavy) return "SPECIAL";
  return "STANDARD";
}
