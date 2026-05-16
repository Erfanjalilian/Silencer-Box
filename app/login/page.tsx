import React, { Suspense } from "react";
import LoginForm from "@/app/components/LoginForm";

function LoginFallback() {
  return (
    <div className="mx-auto max-w-md animate-pulse rounded-2xl border border-gray-700 bg-gray-900/40 p-10" />
  );
}

export default function LoginPage() {
  return (
    <main className="flex flex-1 flex-col justify-center px-4 py-16">
      <Suspense fallback={<LoginFallback />}>
        <LoginForm />
      </Suspense>
    </main>
  );
}
