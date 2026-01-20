export interface KalenderData {
  id: number;
  kelas: string;
  tanggal: string; // YYYY-MM-DD
  mentor: string;
  status: 'active' | 'inactive';
}

export const kalendarData: KalenderData[] = [
  // Roblox Studio
  {
    id: 1,
    kelas: 'roblox studio',
    tanggal: '2026-02-05',
    mentor: 'Andi Pratama',
    status: 'active',
  },
  {
    id: 2,
    kelas: 'roblox studio',
    tanggal: '2026-02-12',
    mentor: 'Andi Pratama',
    status: 'inactive',
  },

  // Basic Learning
  {
    id: 3,
    kelas: 'basic learning',
    tanggal: '2026-02-03',
    mentor: 'Siti Aisyah',
    status: 'inactive',
  },
  {
    id: 4,
    kelas: 'basic learning',
    tanggal: '2026-02-10',
    mentor: 'Siti Aisyah',
    status: 'inactive',
  },

  // Coding Dasar
  {
    id: 5,
    kelas: 'coding dasar',
    tanggal: '2026-02-06',
    mentor: 'Budi Santoso',
    status: 'active',
  },
  {
    id: 6,
    kelas: 'coding dasar',
    tanggal: '2026-02-13',
    mentor: 'Budi Santoso',
    status: 'active',
  },

  // Digital Drawing
  {
    id: 7,
    kelas: 'digital drawing',
    tanggal: '2026-02-04',
    mentor: 'Rina Kurnia',
    status: 'inactive',
  },
  {
    id: 8,
    kelas: 'digital drawing',
    tanggal: '2026-02-11',
    mentor: 'Rina Kurnia',
    status: 'inactive',
  },

  // Robotika & IoT
  {
    id: 9,
    kelas: 'robotika & iot',
    tanggal: '2026-02-07',
    mentor: 'Dedi Saputra',
    status: 'active',
  },
  {
    id: 10,
    kelas: 'robotika & iot',
    tanggal: '2026-02-14',
    mentor: 'Dedi Saputra',
    status: 'inactive',
  },

  // Computational Thinking
  {
    id: 11,
    kelas: 'computional thinking',
    tanggal: '2026-02-08',
    mentor: 'Nina Oktaviani',
    status: 'inactive',
  },
  {
    id: 12,
    kelas: 'computional thinking',
    tanggal: '2026-02-15',
    mentor: 'Nina Oktaviani',
    status: 'inactive',
  },
];
