import { Google } from "@/constants/icons";

function GoogleAuth() {
	return (
		<div className="w-11/12 mx-auto mt-6">
			<div className="row-flex gap-3">
				<hr className="w-[50%] border border-border-200 " />
				<span className="text-base ">Or</span>
				<hr className="w-[50%] border border-border-200" />
			</div>
			<div className="mt-6 py-3.5 px-3 cursor-pointer row-flex gap-3 border border-border rounded-lg shadow-sm leading-4">
				<Google className="size-5" />
				Continue with Google
			</div>
		</div>
	);
}

export default GoogleAuth;
