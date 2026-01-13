"use client";

import { Form } from "antd";
import { RegisterPayload } from "./register.types";

export function useRegister() {
  const [form] = Form.useForm<RegisterPayload>();

  const submitRegister = async (payload: RegisterPayload) => {
    //nanti tinggal ganti ke API service
    console.log("REGISTER PAYLOAD:", payload);
  };

  return {
    form,
    submitRegister,
  };
}
