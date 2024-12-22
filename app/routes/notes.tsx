import { data, LoaderFunctionArgs } from "@remix-run/cloudflare";
import { requireAuth } from "~/utils/auth";

export async function loader({ request, context }: LoaderFunctionArgs) {
	const { PROJECT_URL, SUPABASE_KEY } = context.cloudflare.env;

	await requireAuth(PROJECT_URL, SUPABASE_KEY, request);

	return data({});
}

export default function Notes() {
	return (
		<div>
			<form action="logout" method="post">
				<button>logout</button>
			</form>
		</div>
	);
}
