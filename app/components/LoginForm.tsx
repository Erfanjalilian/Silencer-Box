"use client";

import React, { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Button } from "@/app/components/ui/Button";
import { TextField } from "@/app/components/ui/TextField";
import { useAuth } from "@/contexts/AuthContext";

type Phase = "idle" | "sent";

export default function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { refreshUser } = useAuth();

  const [phone, setPhone] = useState("");
  const [code, setCode] = useState("");
  const [phase, setPhase] = useState<Phase>("idle");
  const [sendLoading, setSendLoading] = useState(false);
  const [verifyLoading, setVerifyLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const redirectTo =
    searchParams.get("redirect")?.startsWith("/") === true
      ? searchParams.get("redirect")!
      : "/dashboard";

  const handleSendOtp = async () => {
    setError(null);
    setSuccess(null);
    setSendLoading(true);
    try {
      const res = await fetch("/api/auth/send-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "same-origin",
        body: JSON.stringify({ phone }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        setError(typeof data.error === "string" ? data.error : "خطا در ارسال کد");
        return;
      }
      setPhase("sent");
      if (process.env.NODE_ENV !== "production" && data._devOtp) {
        setSuccess(`کد تأیید ارسال شد (حالت توسعه: ${data._devOtp})`);
      } else {
        setSuccess("کد تأیید به شماره شما ارسال شد.");
      }
    } catch {
      setError("ارتباط با سرور برقرار نشد.");
    } finally {
      setSendLoading(false);
    }
  };

  const handleVerify = async () => {
    setError(null);
    setSuccess(null);
    setVerifyLoading(true);
    try {
      const res = await fetch("/api/auth/verify-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "same-origin",
        body: JSON.stringify({ phone, code }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        setError(typeof data.error === "string" ? data.error : "کد نامعتبر است");
        return;
      }

      await refreshUser();

      const target =
        typeof data.redirectTo === "string" ? data.redirectTo : redirectTo;
      router.replace(target);
    } catch {
      setError("ارتباط با سرور برقرار نشد.");
    } finally {
      setVerifyLoading(false);
    }
  };

  return (
    <div className="mx-auto w-full max-w-md space-y-6 rounded-2xl border border-gray-700 bg-gray-900/70 p-6 shadow-xl backdrop-blur">
      <div>
        <h1 className="text-xl font-bold text-gray-100">ورود با موبایل</h1>
        <p className="mt-1 text-sm text-gray-400">
          شماره موبایل خود را وارد کنید؛ کد یک‌بارمصرف برای شما پیامک می‌شود.
        </p>
      </div>

      {error && (
        <div
          className="rounded-lg border border-red-500/40 bg-red-950/40 px-3 py-2 text-sm text-red-200"
          role="alert"
        >
          {error}
        </div>
      )}
      {success && (
        <div
          className="rounded-lg border border-emerald-500/40 bg-emerald-950/30 px-3 py-2 text-sm text-emerald-200"
          role="status"
        >
          {success}
        </div>
      )}

      <div className="space-y-4">
        <TextField
          label="شماره موبایل"
          name="phone"
          placeholder="09123456789"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          autoComplete="tel"
          inputMode="numeric"
          disabled={sendLoading || verifyLoading}
        />

        <Button
          variant="primary"
          className="w-full"
          onClick={handleSendOtp}
          isLoading={sendLoading}
          disabled={verifyLoading}
        >
          ارسال کد تأیید
        </Button>
      </div>

      {phase === "sent" && (
        <div className="space-y-4 border-t border-gray-700 pt-6">
          <TextField
            label="کد تأیید"
            name="otp"
            placeholder="۶ رقم"
            value={code}
            onChange={(e) => setCode(e.target.value)}
            inputMode="numeric"
            maxLength={12}
            disabled={verifyLoading}
          />
          <Button
            variant="secondary"
            className="w-full"
            onClick={handleVerify}
            isLoading={verifyLoading}
          >
            تأیید و ورود
          </Button>
        </div>
      )}
    </div>
  );
}
