import { ComponentProps } from "react";

const secondaryClasses = "border-2 text-zinc-800";
const primaryClasses = "bg-blue-600 text-white transition-opacity duration-100";

const defaultClasses =
	"text-sm font-semibold px-6 py-2.5 rounded-lg flex items-center gap-4 capitalize";
const alignClasses = {
	center: "justify-center",
	start: "justify-start",
};

export function buttonStyles({
    align = "center",
    isLoading = false,
    variant = "primary",
}: {
    isLoading?: ButtonProps["isLoading"];
    variant?: ButtonProps["variant"];
    align?: ButtonProps["align"];
} = {}) {
    return `${defaultClasses} ${
        variant === "primary" ? primaryClasses : secondaryClasses
    } ${isLoading ? "opacity-80" : ""} ${alignClasses[align]}`;
}

type ButtonProps = {
	isLoading?: boolean;
	variant?: "primary" | "secondary";
	align?: "center" | "start";
} & ComponentProps<"button">;

export default function Button({
	variant = "primary",
	isLoading = false,
	align = "center",
	children,
	...props
}: ButtonProps) {
	return (
		<button
			{...props}
			className={buttonStyles({ variant, isLoading, align })}
			disabled={isLoading}
		>
			{isLoading && (
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
