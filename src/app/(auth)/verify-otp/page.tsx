import { cn } from "@/lib/utils";
import { useAuth } from "@/context/AuthContext";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { useCallback, useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import CustomButton from "@/components/reuseables/CustomButton";

const OTP_LENGTH = 6;
const COUNTDOWN_DURATION = 180;

function VerifyOTP() {
  const { handleVerifyOtp, handleResendOtp, isLoadingAuth, user } = useAuth();
  const [otpValue, setOtpValue] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [countdown, setCountdown] = useState(COUNTDOWN_DURATION);
  const [isResending, setIsResending] = useState(false);

  const { state } = useLocation();

  const hasSentInitialOtp = useRef(false);

  const userEmail = state?.email ?? user?.email ?? "";
  const userId = state?.userId ?? user?.userId ?? "";

  useEffect(() => {
    const controller = new AbortController();
    const sendInitialOtp = async () => {
      if (hasSentInitialOtp.current || !userEmail || !userId) return;

      try {
        setIsResending(true);
        // await handleResendOtp(userEmail, userId, { signal: controller.signal });
        await handleResendOtp(userEmail, userId);
        setCountdown(COUNTDOWN_DURATION); // Start countdown after sending
        hasSentInitialOtp.current = true;
        setError(null);
      } catch (err: any) {
        if (err.name === "AbortError" || err.name === "CanceledError") return;
        const message = err?.message || "Failed to send OTP. Please try again.";
        setError(message);
      } finally {
        setIsResending(false);
      }
    };
    sendInitialOtp();

    return () => {
      controller.abort();
    };
  }, []);

  // Handle countdown timer
  useEffect(() => {
    if (countdown <= 0) return;

    const interval = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [countdown]);

  useEffect(() => {
    if (otpValue?.length === OTP_LENGTH) {
      handleVerifySubmit();
    }
  }, [otpValue?.length]);

  const handleVerifySubmit = useCallback(async () => {
    if (!userEmail || otpValue.length !== OTP_LENGTH) return;

    try {
      setError(null);
      await handleVerifyOtp(userId, Number(otpValue));
    } catch (err) {
      setError("Invalid OTP code. Please try again.");
    }
  }, [handleVerifyOtp, otpValue, userEmail]);

  const handleResend = useCallback(async () => {
    if (isResending || !userEmail || countdown > 0) return;

    setIsResending(true);
    setError(null);

    try {
      await handleResendOtp(userEmail, userId);
      setCountdown(COUNTDOWN_DURATION);
    } catch (err) {
      setError("Failed to resend OTP. Please try again.");
    } finally {
      setIsResending(false);
    }
  }, [handleResendOtp, isResending, userEmail, userId, countdown]);

  // Memoized computed values
  const isCountdownActive = countdown > 0;
  const formattedTime = `${Math.floor(countdown / 60)
    .toString()
    .padStart(2, "0")}:${(countdown % 60).toString().padStart(2, "0")}`;

  return (
    <>
      <div className="flex-column items-center gap-0.5 mt-6 ">
        <h3 className="text-2xl font-semibold text-center">Enter OTP</h3>
        <p className="tracking-tighter text-center text-foreground-100 font-light">
          We have sent an OTP to your{" "}
          {user?.email ? (
            <span className="text-foreground-variant inline-block font-medium">{user.email}</span>
          ) : (
            <span className="">email address</span>
          )}
        </p>
      </div>

      <div className="py-3">
        <div className="flex-column gap-3">
          <InputOTP maxLength={6} value={otpValue} onChange={(value) => setOtpValue(value)}>
            <InputOTPGroup className="shad-otp">
              <InputOTPSlot className={cn(error && "border-red-400 border-2 ring-0")} index={0} />
              <InputOTPSeparator className="hidden" />
              <InputOTPSlot className={cn(error && "border-red-400 border-2 ring-0")} index={1} />
              <InputOTPSeparator className="hidden" />
              <InputOTPSlot className={cn(error && "border-red-400 border-2 ring-0")} index={2} />
              <InputOTPSeparator className="hidden" />
              <InputOTPSlot className={cn(error && "border-red-400 border-2 ring-0")} index={3} />
              <InputOTPSeparator className="hidden" />
              <InputOTPSlot className={cn(error && "border-red-400 border-2 ring-0")} index={4} />
              <InputOTPSeparator className="hidden" />
              <InputOTPSlot className={cn(error && "border-red-400 border-2 ring-0")} index={5} />
            </InputOTPGroup>
          </InputOTP>

          {error && (
            <p className="font-semibold tracking-wide text-xs text-red-500">Incorrect OTP code</p>
          )}
        </div>
      </div>

      <div className="flex-column gap-2 w-11/12">
        <CustomButton
          type="submit"
          title={isLoadingAuth ? "Verifing..." : "Verify"}
          className={cn("mt-auto w-full")}
          disabled={isLoadingAuth || otpValue.length !== 6}
          onClick={handleVerifySubmit}
          isLoading={isLoadingAuth}
        />

        <div className="tracking-tight text-xs text-center leading-4 text-foreground-100">
          Didn't receive the code?{" "}
          <span className="">
            {!isCountdownActive ? (
              <span className="font-semibold cursor-pointer" onClick={handleResend}>
                {isResending ? "Resending..." : "Resend code"}
              </span>
            ) : (
              <span className="leading-5 text-foreground-100 font-semibold tracking-tight">
                Resend code in:{" "}
                <span className="inline-flex font-semibold tracking-tight">{formattedTime}</span>
              </span>
            )}
          </span>
        </div>
      </div>
    </>
  );
}

export default VerifyOTP;
