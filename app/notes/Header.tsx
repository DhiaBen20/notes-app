export default function Header({ title }: { title: string }) {
	return (
		<header className="py-4 px-6 border-b flex items-center justify-between">
			<h1 className="text-2xl font-bold">{title}</h1>
		</header>
	);
}
