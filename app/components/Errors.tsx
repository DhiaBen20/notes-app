export default function Errors({ errorId, errors }: { errorId: string; errors?: string[] }) {
	return (
		errors && (
			<div id={errorId} className="text-sm text-red-500 font-medium">
				{errors.map((e) => (
					<p key={e}>{e}</p>
				))}
			</div>
		)
	);
}
