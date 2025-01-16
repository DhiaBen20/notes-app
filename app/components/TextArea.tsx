import { ComponentProps } from "react";

export default function TextArea(props: ComponentProps<"textarea">) {
    return (
        <textarea
            {...props}
            className="border-2 dark:border-slate-800 bg-transparent dark:text-neutral-300 dark:placeholder:text-neutral-500 rounded-md py-2.5 px-4 text-sm focus:border-blue-600 focus:outline-none"
        />
    );
}