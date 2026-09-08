// Reviewed against this exact solver checkout; not live release metadata.
export const solverEvidence = {
  repository: 'https://github.com/AnoopPatel582/FinEleMethod',
  sourceCommit: '5941df69f3ef8469170ee086d08195bd25f7728a',
} as const;
export const solverDocument = (path: string) =>
  `${solverEvidence.repository}/blob/${solverEvidence.sourceCommit}/${path}`;
