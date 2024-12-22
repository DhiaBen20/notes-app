import { ComponentProps } from "react";

export default function Button({
	isLoading = false,
	children,
	...props
}: { isLoading?: boolean } & ComponentProps<"button">) {
	return (
		<button
			{...props}
			className={`bg-blue-600 text-white transition-opacity duration-100 text-sm font-semibold py-2.5 rounded-lg px-6 flex items-center justify-center gap-4 ${
				isLoading ? "opacity-80" : ""
			}`}
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
