// src/app/sucess/page.tsx
import { Suspense } from "react";
import SucessClient from "./SucessClient";

export default function Page() {
  return (
    <Suspense fallback={null}>
      <SucessClient />
    </Suspense>
  );
}
