type Props = {};

function UserDetails({}) {
	return (
		<div>
			<div className="pb-4 border-b border-border-100">
				<h3>Connie Robertson</h3>

				<p className="text-sm text-grey max-w-[40ch]">
					johnnyomoseni@gmail.com | +2348 125 6784
				</p>
			</div>

			<div className="grid grid-cols-[repeat(auto-fill_minmax(50ch,_1fr)] gap-y-4 gap-x-6">
				<div className="flex-column gap-1">
					<p className="font-semibold tracking-wide">Account Creation Date</p>

					<p className="text-foreground-100 text-base leading-5">12-Oct-2024</p>
				</div>
			</div>
		</div>
	);
}

export default UserDetails;
