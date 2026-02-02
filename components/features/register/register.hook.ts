"use client";

import { Form, message } from "antd";
import { RegisterPayload } from "./register.types";
import { useSearchParams } from "next/navigation";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export function useRegister() {
  const [form] = Form.useForm<RegisterPayload>();
  const searchParams = useSearchParams();
  const class_id = searchParams.get("class_id");
  const [messageApi, contextHolder] = message.useMessage();

  const submitRegister = async (payload: RegisterPayload) => {
    if (!class_id) {
      messageApi.error("Class tidak ditemukan");
      return;
    }
    console.log(payload)
    try {
      const studentRes = await fetch(`${API_BASE_URL}/students`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const studentJson = await studentRes.json();
      console.log(studentJson)

      if (!studentRes.ok) {
        // backend validation error (age, duplicate, etc)
        messageApi.error(studentJson.message || "Registration failed");
        return;
      }

      const student_id = studentJson.data.student_id;
      const enrollmentRes = await fetch(`${API_BASE_URL}/enrollments`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          student_id,
          class_id,
          status: "registered",
          register_at: new Date(),
          confirmed_at: new Date(),
        }),
      });

      const enrollmentJson = await enrollmentRes.json();

      if (!enrollmentRes.ok) {
        messageApi.error(enrollmentJson.message || "Enrollment failed");
        return;
      }

      messageApi.success("Pendaftaran berhasil 🎉");
      form.resetFields();
    } catch (error) {
      console.error("REGISTER ERROR:", error);
      messageApi.error("Terjadi kesalahan, coba lagi");
    }
  };

  return {
    form,
    submitRegister,
    contextHolder,
  };
}
