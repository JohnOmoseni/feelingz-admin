import { cn } from "@/lib/utils";
import { useAuth } from "@/context/AuthContext";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp";
import { useEffect, useState } from "react";
import Button from "@/components/reuseables/CustomButton";

function VerifyOTP() {
  const { handleVerifyOtp, handleResendOtp, isLoadingAuth, user } = useAuth();
  const [otpValue, setOtpValue] = useState("");
  const [error, setError] = useState("");
  const [resendCountdown, setResendCountdown] = useState(180);
  const [isResendingOtp, setIsResendingOtp] = useState(false);
  const [isCountdownActive, setIsCountdownActive] = useState(false);
  const [isResendRequested, setIsResendRequested] = useState(false);

  useEffect(() => {
    if (isCountdownActive && resendCountdown > 0) {
      const interval = setInterval(() => {
        setResendCountdown((prev) => prev - 1);
      }, 1000);
      return () => clearInterval(interval);
    } else if (resendCountdown === 0) {
      setIsCountdownActive(false);
    }
  }, [isCountdownActive, resendCountdown]);

  const handleVerifySubmit = async () => {
    setError("");

    try {
      await handleVerifyOtp(Number(otpValue), user?.email || "");
    } catch (e) {
      setError("Failed to verify OTP.");
    }
  };

  const handleResend = async () => {
    if (isResendingOtp) return;
    setError("");
    setIsResendingOtp(true);

    try {
      await handleResendOtp(user?.email || "");
      setResendCountdown(180);
      setIsCountdownActive(true);
      setIsResendRequested(true);
    } catch (e) {
      setError("Failed to resend OTP. Please try again.");
    } finally {
      setIsResendingOtp(false);
    }
  };

  return (
    <>
      <div className="flex-column gap-2">
        <h3 className="text-2xl">Verification Code</h3>
        <p className="leading-5 tracking-wide text-foreground-100">
          Enter the 4-digit code sent to{" "}
          <span className="text-secondary inline-block font-medium">
            {user?.email || <span className="font-medium tracking-wide">---</span>}
          </span>{" "}
          to verify your account and continue
        </p>
      </div>

      <div className="pt-4 pb-6">
        <div className="flex-column gap-3">
          <InputOTP maxLength={4} value={otpValue} onChange={(value) => setOtpValue(value)}>
            <InputOTPGroup className="shad-otp">
              <InputOTPSlot className={cn(error && "border-red-400 border-2 ring-0")} index={0} />
              <InputOTPSlot className={cn(error && "border-red-400 border-2 ring-0")} index={1} />
              <InputOTPSlot className={cn(error && "border-red-400 border-2 ring-0")} index={2} />
              <InputOTPSlot className={cn(error && "border-red-400 border-2 ring-0")} index={3} />
            </InputOTPGroup>
          </InputOTP>

          {error && (
            <p className="font-semibold tracking-wide text-base text-red-500">Incorrect OTP code</p>
          )}

          <div className="">
            {!isResendRequested ? (
              <span className="font-semibold text-secondary cursor-pointer" onClick={handleResend}>
                {isResendingOtp ? "Resending..." : "Resend OTP"}
              </span>
            ) : (
              <p className="mt-0.5 leading-5 text-foreground-100 tracking-wide">
                Resend code in:{" "}
                <span className="text-secondary inline-flex font-normal">
                  {Math.floor(resendCountdown / 60)
                    .toString()
                    .padStart(2, "0")}
                  :{(resendCountdown % 60).toString().padStart(2, "0")}
                </span>
              </p>
            )}
          </div>
        </div>
      </div>

      <Button
        type="submit"
        title={isLoadingAuth ? "Verifing..." : "Verify"}
        className={cn("!mt-auto !w-full !py-5")}
        disabled={isLoadingAuth || otpValue.length !== 4}
        onClick={handleVerifySubmit}
        isLoading={isLoadingAuth}
      />
    </>
  );
}

export default VerifyOTP;
