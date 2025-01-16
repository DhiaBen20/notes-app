import { NavLink as RemixNavLink } from "@remix-run/react";
import { ArchiveIcon, HomeIcon, TagIcon } from "lucide-react";
import { ComponentProps } from "react";

function NavLink(props: ComponentProps<typeof RemixNavLink>) {
	return (
		<RemixNavLink
			{...props}
			className={({ isActive }) =>
				`flex items-center gap-1.5 text-sm text-neutral-800 font-medium hover:bg-slate-100  dark:hover:bg-slate-800 focus-visible:bg-slate-100 rounded-lg py-3 px-2 ${
					isActive
						? "bg-slate-100 dark:bg-slate-800 dark:text-neutral-300 [&_svg]:stroke-blue-600"
						: "dark:hover:text-neutral-300 dark:text-neutral-500"
				}`
			}
		/>
	);
}
export default function Nav({ tags }: { tags: string[] }) {
	return (
		<nav className="border-r px-3 pt-20 space-y-2 dark:bg-slate-950 dark:border-slate-800">
			<NavLink to="/notes">
				<HomeIcon className="size-5 dark:stroke-slate-500" />
				All Note
			</NavLink>
			<NavLink to="/archives">
				<ArchiveIcon className="size-5 dark:stroke-slate-500" />
				Archived Note
			</NavLink>

			<div className="border-t dark:border-slate-700 pt-2 space-y-2">
				<div className="text-zinc-500 text-sm font-medium dark:text-slate-400">Tags</div>
				{tags.map((t) => (
					<NavLink key={t} to={`/tags/${t}`}>
						<TagIcon className="size-5 stroke-neutral-600 dark:stroke-slate-500" />
						{t}
					</NavLink>
				))}
			</div>
		</nav>
	);
}
