import { ReactNode } from "react";

export default function Layout({ children }: { children: ReactNode }) {
	return (
		<div className="min-h-screen bg-neutral-100 flex items-center justify-center">
			<div className="bg-white border max-w-md w-full px-8 py-8 rounded-lg">
				{children}
			</div>
		</div>
	);
}
