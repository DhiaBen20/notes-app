import { ReactNode } from "react";

export default function Main({ children }: { children: ReactNode }) {
	return (
		<main className="flex-1 grid grid-cols-[17rem_1fr] dark:bg-slate-950">{children}</main>
	);
}
