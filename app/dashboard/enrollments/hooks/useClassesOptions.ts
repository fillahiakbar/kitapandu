"use client";

import { useEffect, useState } from "react";
import { apiFetch } from "@/lib/api";

export interface ClassOption {
  class_id: string;
  name: string;
  period: string;
}

export function useClassesOptions() {
  const [classes, setClasses] = useState<ClassOption[]>([]);

  useEffect(() => {
    apiFetch("/classes").then((res) => setClasses(res.data));
  }, []);

  return classes;
}
