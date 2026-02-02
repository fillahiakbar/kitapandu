import { Rule } from "antd/es/form";

export const registerRules: Record<string, Rule[]> = {
  parent_name: [{ required: true, message: "Nama orang tua wajib diisi" }],
  whatsapp: [{ required: true, message: "Nomor WhatsApp wajib diisi" }],
  student_name: [{ required: true, message: "Nama anak wajib diisi" }],
  student_age: [{ required: true, message: "Usia anak wajib diisi" }],
};
