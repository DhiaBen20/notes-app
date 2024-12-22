import { ComponentProps } from "react";

export default function Input(props: ComponentProps<"input">) {
    return (
        <input
            {...props}
            className="border-2 rounded-md py-2.5 px-4 text-sm focus:border-blue-600 focus:outline-none"
        />
    );
}