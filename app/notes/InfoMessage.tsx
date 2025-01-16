import { ComponentProps } from "react";

export default function InfoMessage({ ...props }: ComponentProps<"div">) {
	return (
		<div
			{...props}
			className="border dark:border-slate-700 dark:bg-slate-800 dark:text-neutral-500 rounded-md py-1 px-2 text-sm bg-slate-100 text-zinc-800"
		/>
	);
}
