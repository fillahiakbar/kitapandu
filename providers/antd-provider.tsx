"use client";

import { ConfigProvider } from "antd";
import { PropsWithChildren } from "react";

export function AntdProvider({ children }: PropsWithChildren) {
  return (
    <ConfigProvider
      theme={{
        token: {
          fontFamily: "var(--font-poppins)",
          borderRadius: 12,
        },
      }}
    >
      {children}
    </ConfigProvider>
  );
}
