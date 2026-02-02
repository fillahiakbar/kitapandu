"use client";

import { Form, Input, Row, Col, Button, InputNumber } from "antd";
import { registerRules } from "./register.schema";
import { RegisterPayload } from "./register.types";

interface Props {
  form: any;
  onSubmit: (values: RegisterPayload) => void;
}

export function RegisterForm({ form, onSubmit }: Props) {
  return (
    <Form form={form} layout="vertical" onFinish={onSubmit} className="w-full">
      <Row gutter={[24, 24]}>
        <Col xs={24} md={12}>
          <Form.Item
            label="Nama Orangtua"
            name="parent_name"
            rules={registerRules.parent_name}
          >
            <Input
              size="large"
              placeholder="Nama orangtua"
              className="!rounded-xl !border-gray-200 !h-12"
            />
          </Form.Item>
        </Col>

        <Col xs={24} md={12}>
          <Form.Item
            label="Nomor WhatsApp"
            name="whatsapp"
            rules={registerRules.whatsapp}
          >
            <Input
              size="large"
              placeholder="08xxxxxxxxxx"
              className="!rounded-xl !border-gray-200 !h-12"
            />
          </Form.Item>
        </Col>

        <Col xs={24} md={12}>
          <Form.Item
            label="Nama Anak"
            name="student_name"
            rules={registerRules.student_name}
          >
            <Input
              size="large"
              placeholder="Nama anak"
              className="!rounded-xl !border-gray-200 !h-12"
            />
          </Form.Item>
        </Col>

        <Col xs={24} md={12}>
          <Form.Item
            label="Usia Anak"
            name="student_age"
            rules={registerRules.student_age}
          >
            <InputNumber
              size="large"
              placeholder="7"
              className="!rounded-xl !border-gray-200 !h-12"
            />
          </Form.Item>
        </Col>
      </Row>

      <div className="mt-4 flex justify-end">
        <Button
          htmlType="submit"
          size="large"
          type="primary"
          className="!h-12 !rounded-md !px-10 !bg-[#3B5BFF] !font-semibold"
        >
          Daftar Sekarang
        </Button>
      </div>
    </Form>
  );
}
