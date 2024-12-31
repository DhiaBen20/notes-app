import { ComponentProps } from "react";

export default function InfoMessage({ ...props }: ComponentProps<"div">) {
	return (
		<div
			{...props}
			className="border rounded-md py-1 px-2 text-sm bg-slate-100 text-zinc-800"
		/>
	);
}
