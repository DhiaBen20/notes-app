import { z } from "zod";
import { NoteSchema } from "~/NoteForm/NoteSchema";
import { supabaseClient } from "./supabase";
import { Tables } from "~/types/supabase";

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

export async function createNote(
	PROJECT_URL: string,
	SUPABASE_KEY: string,
	request: Request,
	payload: z.infer<typeof NoteSchema> & { user_id: string }
) {
	const supabase = supabaseClient(PROJECT_URL, SUPABASE_KEY, request);

	return await supabase.from("notes").insert(payload).select().single();
}

export async function fetchNoteById(
	PROJECT_URL: string,
	SUPABASE_KEY: string,
	request: Request,
	id: Tables<"notes">["id"]
) {
	const supabase = supabaseClient(PROJECT_URL, SUPABASE_KEY, request);

	const noteResponse = await supabase
		.from("notes")
		.select("*")
		.eq("id", id)
		.single();

	if (noteResponse.error) throw noteResponse.error;

	return noteResponse.data;
}

export async function updateNote(
	PROJECT_URL: string,
	SUPABASE_KEY: string,
	request: Request,
	id: Tables<"notes">["id"],
	payload: Partial<Tables<"notes">>
) {
	const supabase = supabaseClient(PROJECT_URL, SUPABASE_KEY, request);

	return await supabase
		.from("notes")
		.update(payload)
		.eq("id", id)
		.select()
		.single();
}

export async function deleteNote(
	PROJECT_URL: string,
	SUPABASE_KEY: string,
	request: Request,
	id: Tables<"notes">["id"]
) {
	const supabase = supabaseClient(PROJECT_URL, SUPABASE_KEY, request);

	return await supabase.from("notes").delete().eq("id", id);
}