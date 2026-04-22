/**
 * Interprète une saisie utilisateur (chiffres, espace, virgule ou point décimal).
 */
export function parseAmount(input: string): number {
  const normalized = input
    .replace(/\s/g, '')
    .replace(',', '.')
  const n = parseFloat(normalized)
  if (Number.isNaN(n) || n < 0) return 0
  return n
}
