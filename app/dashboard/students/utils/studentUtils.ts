export interface StudentForm {
  student_name: string;
  student_age: string;
  parent_name: string;
  whatsapp: string;
}

export const studentFormDefault: StudentForm = {
  student_name: "",
  student_age: "",
  parent_name: "",
  whatsapp: "",
};

export const formatStudentAge = (age: number) => {
  return `${age} tahun`;
};

export const formatWhatsapp = (phone: string) => {
  if (!phone) return "-";
  if (phone.startsWith("0")) return `+62${phone.slice(1)}`;
  return phone;
};
