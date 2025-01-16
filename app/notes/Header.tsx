import { Form, useRouteLoaderData } from "@remix-run/react";
import { LogOut, Moon, Sun } from "lucide-react";
import { loader } from "~/root";

export default function Header({ title }: { title: string }) {
	const rootData = useRouteLoaderData<typeof loader>("root")!;

	return (
		<header className="py-4 px-6 border-b flex items-center justify-between dark:bg-slate-950 dark:border-slate-800 dark:text-neutral-300">
			<h1 className="text-2xl font-bold">{title}</h1>
			<div className="flex items-center gap-5">
				<Form
					method="post"
					action="/logout"
					className="flex items-center"
				>
					<button>
						<LogOut className="size-5 stroke-zinc-600 dark:stroke-slate-200" />
						<div className="sr-only">Logout</div>
					</button>
				</Form>
				<Form method="post" action="/theme" className="flex">
					<button>
						{rootData.theme === "light" ? (
							<Sun className="size-5 stroke-zinc-600 dark:stroke-slate-200" />
						) : (
							<Moon className="size-5 stroke-zinc-600 dark:stroke-slate-200" />
						)}
					</button>
				</Form>
			</div>
		</header>
	);
}
