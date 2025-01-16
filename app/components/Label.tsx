import { ComponentProps } from "react";

export default function Label({ htmlFor, ...props }: ComponentProps<"label">) {
	return (
		<label
			{...props}
			htmlFor={htmlFor}
			className="text-sm text-gray-700 font-medium dark:text-neutral-400"
		/>
	);
}