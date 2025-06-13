import { cn } from "@/lib/utils";
import { useAuth } from "@/context/AuthContext";
import {
	InputOTP,
	InputOTPGroup,
	InputOTPSeparator,
	InputOTPSlot,
} from "@/components/ui/input-otp";
import { useCallback, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import CustomButton from "@/components/reuseables/CustomButton";

// Constants
const OTP_LENGTH = 6;

function VerifyPin() {
	const { handleVerifyPasswordPin, isLoadingAuth, user } = useAuth();
	const [pinValue, setPinValue] = useState("");
	const [error, setError] = useState<string | null>(null);

	const navigate = useNavigate();
	const { state } = useLocation();

	const userEmail = state?.email ?? user?.email ?? "";

	useEffect(() => {
		if (pinValue?.length === OTP_LENGTH) {
			handleVerifySubmit();
		}
	}, [pinValue?.length]);

	const handleVerifySubmit = useCallback(async () => {
		if (!userEmail || pinValue.length !== OTP_LENGTH) return;
		setError(null);

		try {
			await handleVerifyPasswordPin(Number(pinValue), userEmail);
		} catch (error: any) {
			if (error.includes("Invalid or expired PIN")) setError(error);
			setError("Invalid OTP code. Please try again.");
		}
	}, [handleVerifyPasswordPin, pinValue, userEmail]);

	return (
		<>
			<div className="flex-column items-center gap-0.5 mt-6 ">
				<h3 className="text-2xl font-semibold text-center">Verify your pin</h3>
				<p className="tracking-tighter text-center text-foreground-100 font-light">
					Enter the 6-digit OTP code sent to{" "}
					{user?.email ? (
						<span className="text-foreground-variant inline-block font-medium">
							{user.email}
						</span>
					) : (
						<span className="">your email address</span>
					)}{" "}
					to verify your pin
				</p>
			</div>

			<div className="flex-column gap-3 py-3">
				<InputOTP
					maxLength={6}
					value={pinValue}
					onChange={(value) => setPinValue(value)}
				>
					<InputOTPGroup className="shad-otp">
						<InputOTPSlot
							className={cn(error && "border-red-400 border-2 ring-0")}
							index={0}
						/>
						<InputOTPSeparator className="hidden min-[400px]:block" />
						<InputOTPSlot
							className={cn(error && "border-red-400 border-2 ring-0")}
							index={1}
						/>
						<InputOTPSeparator className="hidden min-[400px]:block" />
						<InputOTPSlot
							className={cn(error && "border-red-400 border-2 ring-0")}
							index={2}
						/>
						<InputOTPSeparator className="hidden min-[400px]:block" />
						<InputOTPSlot
							className={cn(error && "border-red-400 border-2 ring-0")}
							index={3}
						/>
						<InputOTPSeparator className="hidden min-[400px]:block" />
						<InputOTPSlot
							className={cn(error && "border-red-400 border-2 ring-0")}
							index={4}
						/>
						<InputOTPSeparator className="hidden min-[400px]:block" />
						<InputOTPSlot
							className={cn(error && "border-red-400 border-2 ring-0")}
							index={5}
						/>
					</InputOTPGroup>
				</InputOTP>

				{error && (
					<p className="font-semibold tracking-wide text-xs text-red-500">
						Incorrect OTP code
					</p>
				)}
			</div>

			<div className="flex-column gap-3 w-full mt-2">
				<CustomButton
					type="submit"
					title={isLoadingAuth ? "Verifying..." : "Verify"}
					className={cn("mt-auto w-full")}
					disabled={isLoadingAuth || pinValue.length !== OTP_LENGTH}
					onClick={handleVerifySubmit}
					isLoading={isLoadingAuth}
				/>

				<CustomButton
					type="button"
					title="Back to Login"
					variant="outline"
					className="w-full"
					onClick={() => navigate("/signin")}
				/>
			</div>
		</>
	);
}

export default VerifyPin;
