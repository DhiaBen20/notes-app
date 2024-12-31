import { supabaseClient } from "./supabase";

export async function fetchNotes(
	PROJECT_URL: string,
	SUPABASE_KEY: string,
	request: Request,
	archived: boolean = false
) {
	const supabase = supabaseClient(PROJECT_URL, SUPABASE_KEY, request);

	const notesResponse = await supabase
		.from("notes")
		.select("id, title, tags, created_at")
		.eq("archived", archived);

	if (notesResponse.error) throw notesResponse.error;

	return notesResponse.data;
}

export async function fetchTags(
	PROJECT_URL: string,
	SUPABASE_KEY: string,
	request: Request
) {
	const supabase = supabaseClient(PROJECT_URL, SUPABASE_KEY, request);

	const tagsResponse = await supabase
		.from("notes")
		.select("tags")
		.eq("archived", false);

	if (tagsResponse.error) throw tagsResponse.error;

	return Array.from(
		new Set(tagsResponse.data.flatMap((tag) => tag.tags.split(", ")))
	);
}

export async function fetchNotesByTag(
	PROJECT_URL: string,
	SUPABASE_KEY: string,
	request: Request,
	tag: string
) {
	const supabase = supabaseClient(PROJECT_URL, SUPABASE_KEY, request);

	const notesResponse = await supabase
		.from("notes")
		.select("id, title, tags, created_at")
		.eq("archived", false)
		.like("tags", `*${tag}*`);

	if (notesResponse.error) throw notesResponse.error;

	return notesResponse.data;
}
