export const pastels = [
  '#AFF8D8',
  '#FFCBC1',
  '#FBE4FF',
  '#D8FFD8',
  '#C4FAF8',
  '#E7FFAC',
  '#ACE7FF',
  '#FFABAB',
  '#FFB5E8',
] as const;

export const getPastelIndexFor = (idx: number): number =>
  idx % pastels.length;

export const getPastelForIndex = (idx: number): string =>
  pastels[getPastelIndexFor(idx)];
