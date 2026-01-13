import { Rule } from "antd/es/form";

export const registerRules: Record<string, Rule[]> = {
  parentName: [{ required: true, message: "Nama orang tua wajib diisi" }],
  whatsapp: [{ required: true, message: "Nomor WhatsApp wajib diisi" }],
  childName: [{ required: true, message: "Nama anak wajib diisi" }],
  childAge: [{ required: true, message: "Usia anak wajib diisi" }],
  grade: [{ required: true, message: "Kelas wajib diisi" }],
};
