import { Suspense } from "react";
import RegisterPage from "@/components/features/register";

export default function Page() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <RegisterPage />
    </Suspense>
  );
}
