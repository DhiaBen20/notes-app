import { NavLink as RemixNavLink } from "@remix-run/react";
import { ArchiveIcon, HomeIcon, TagIcon } from "lucide-react";
import { ComponentProps } from "react";

function NavLink(props: ComponentProps<typeof RemixNavLink>) {
	return (
		<RemixNavLink
			{...props}
			className={({ isActive }) =>
				`flex items-center gap-1.5 text-sm text-neutral-800 font-medium hover:bg-slate-100 focus-visible:bg-slate-100 rounded-lg py-3 px-2 ${
					isActive ? "bg-slate-100 [&_svg]:stroke-blue-600" : ""
				}`
			}
		/>
	);
}
export default function Nav({ tags }: { tags: string[] }) {
	return (
		<nav className="border-r px-3 pt-20 space-y-2">
			<NavLink to="/notes">
				<HomeIcon className="size-5" />
				All Note
			</NavLink>
			<NavLink to="/archives">
				<ArchiveIcon className="size-5" />
				Archived Note
			</NavLink>

			<div className="border-t pt-2 space-y-2">
				<div className="text-zinc-500 text-sm font-medium">Tags</div>
				{tags.map((t) => (
					<NavLink key={t} to={`/tags/${t}`}>
						<TagIcon className="size-5 stroke-neutral-600" />
						{t}
					</NavLink>
				))}
			</div>
		</nav>
	);
}
