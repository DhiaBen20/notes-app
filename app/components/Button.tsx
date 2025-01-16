import { ComponentProps } from "react";

const initialClasses =
	"text-sm font-semibold px-6 py-2.5 rounded-lg flex items-center gap-4 capitalize transition-opacity duration-100";
const loadingClasses = "opacity-80";
const alignClasses = {
	start: "justify-start",
	center: "justify-center",
} as const;

const colorClasses = {
	red: "bg-red-500 text-white hover:bg-red-600",
	blue: "bg-blue-600 text-white hover:bg-blue-700",
	transparent: "bg-zinc-50 hover:bg-zinc-100 dark:bg-slate-600 dark:hover:bg-slate-700 dark:text-neutral-400",
};
const outlinedClasses = "border-2 text-zinc-800 dark:border-slate-800 dark:text-neutral-400";

export function buttonStyles({
	loading = false,
	align = "center",
	shape = "pill",
	color = "blue",
}: {
	shape?: "pill" | "outlined";
	color?: "blue" | "red" | "transparent";
	align?: "start" | "center";
	loading?: boolean;
} = {}) {
	return `${initialClasses} ${loading ? loadingClasses : ""} ${
		align ? alignClasses[align] : ""
	} ${shape === "pill" && color ? colorClasses[color] : outlinedClasses}`;
}

export default function Button({
	children,
	shape = "pill",
	color = "blue",
	align = "center",
	loading = false,
	...props
}: ComponentProps<"button"> & {
	shape?: "pill" | "outlined";
	color?: "blue" | "red" | "transparent";
	align?: "start" | "center";
	loading?: boolean;
}) {
	return (
		<button
			className={buttonStyles({ align, color, loading, shape })}
			{...props}
		>
			{loading && (
				<svg
					xmlns="http://www.w3.org/2000/svg"
					viewBox="0 0 24 24"
					fill="none"
					stroke="currentColor"
					strokeWidth="2"
					strokeLinecap="round"
					strokeLinejoin="round"
					className="animate-spin size-5"
				>
					<path d="M21 12a9 9 0 1 1-6.219-8.56" />
				</svg>
			)}
			{children}
		</button>
	);
}
