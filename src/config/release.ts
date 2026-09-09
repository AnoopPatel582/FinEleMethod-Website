export const release = {
  version: '0.1.0',
  tag: 'v0.1.0',
  publishedAt: '2026-09-06T13:50:20Z',
  releaseUrl:
    'https://github.com/AnoopPatel582/FinEleMethod/releases/tag/v0.1.0',
  sourceCommit: '63def64dbf539f687718c2cead2c9d83c42c1638',
  sourceCommitUrl:
    'https://github.com/AnoopPatel582/FinEleMethod/commit/63def64dbf539f687718c2cead2c9d83c42c1638',
  windows: {
    minimumVersion: 'Windows 10',
    architecture: 'x64',
  },
  installer: {
    filename: 'FinEleMethod-0.1.0-windows-x64-setup.exe',
    url: 'https://github.com/AnoopPatel582/FinEleMethod/releases/download/v0.1.0/FinEleMethod-0.1.0-windows-x64-setup.exe',
    bytes: 23_579_981,
    sha256: '0b93d773aaff6d0c657858f84cf2e34b34330959a9d00b149a72861d002e6a27',
    checksumUrl:
      'https://github.com/AnoopPatel582/FinEleMethod/releases/download/v0.1.0/FinEleMethod-0.1.0-windows-x64-setup.exe.sha256',
  },
  portable: {
    filename: 'FinEleMethod-windows-x64.zip',
    url: 'https://github.com/AnoopPatel582/FinEleMethod/releases/download/v0.1.0/FinEleMethod-windows-x64.zip',
    bytes: 4_830_974,
    sha256: 'b379564f5917685e54de8dc606fd7aeffca38a58c5d7b201044db87c44419bb5',
    checksumUrl:
      'https://github.com/AnoopPatel582/FinEleMethod/releases/download/v0.1.0/FinEleMethod-windows-x64.zip.sha256',
  },
  manifest: {
    filename: 'FinEleMethod-windows-x64.manifest.json',
    bytes: 517,
    url: 'https://github.com/AnoopPatel582/FinEleMethod/releases/download/v0.1.0/FinEleMethod-windows-x64.manifest.json',
  },
} as const;

export const formatMegabytes = (bytes: number) =>
  `${new Intl.NumberFormat('en-US', {
    minimumFractionDigits: 1,
    maximumFractionDigits: 1,
  }).format(bytes / 1_000_000)}\u00a0MB`;

export const formatBytes = (bytes: number) =>
  `${new Intl.NumberFormat('en-US').format(bytes)} bytes`;

export const formatReleaseDate = (date: string) =>
  new Intl.DateTimeFormat('en-US', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    timeZone: 'UTC',
  }).format(new Date(date));
