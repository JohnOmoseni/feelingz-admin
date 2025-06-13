import * as yup from "yup";
import { Envelope } from "@/constants/icons";
import { useFormik } from "formik";
import { useAuth } from "@/context/AuthContext";
import { useNavigate } from "react-router-dom";
import CustomButton from "@/components/reuseables/CustomButton";
import CustomFormField, {
	FormFieldType,
} from "@/components/forms/CustomFormField";

type FormValues = {
	email: string;
};

function ForgotPassword() {
	const { isLoadingAuth, handleForgotPassword } = useAuth();
	const navigate = useNavigate();

	const onSubmit = async (values: FormValues) => {
		await handleForgotPassword(values.email);
	};

	const {
		values,
		errors,
		touched,
		isSubmitting,
		handleBlur,
		handleChange,
		handleSubmit,
	} = useFormik({
		initialValues: {
			email: "",
		},
		validationSchema: yup.object().shape({
			email: yup
				.string()
				.email("Invalid email address")
				.required("Email is required"),
		}),
		onSubmit,
	});

	return (
		<>
			<div className="flex-columnitems-center gap-1">
				<h2 className="text-2xl md:text-3xl text-center">
					Reset your password
				</h2>
				<p className="leading-5 mt-1 tracking-wide text-center text-foreground-100 w-full">
					Enter your email address lets get you right back in
				</p>
			</div>

			<div className="pt-2 w-full">
				<form onSubmit={handleSubmit} className="flex-column flex-1 gap-8">
					<div className="flex-column gap-5">
						<CustomFormField
							fieldType={FormFieldType.INPUT}
							name="email"
							label="Email address"
							field={{
								value: values.email,
								placeholder: "",
								type: "email",
							}}
							onChange={handleChange}
							onBlur={handleBlur}
							errors={errors}
							iconSrc={Envelope}
							touched={touched}
							tag="auth"
							inputStyles="h-11"
						/>
					</div>

					<div className="flex-column gap-3">
						<CustomButton
							type="submit"
							title={isSubmitting ? "Proceeding..." : "Next"}
							className="w-full"
							disabled={isLoadingAuth}
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
				</form>
			</div>
		</>
	);
}

export default ForgotPassword;
