import { Config, Context } from "https://edge.netlify.com";

const SLOT = /<!--\s*slot:([\w]+)\s*-->/g;

function chunks(fragment: string) {
    const parts = fragment.split(SLOT);
    const out = new Map<string, string>();
    for (let i = 1; i < parts.length; i += 2) out.set(parts[i], parts[i + 1]);
    return out;
}

export default async (_request: Request, context: Context) => {
    const response = await context.next();
    const text = await response.text();
    const slots = chunks(text);
    const updated = text.replace(SLOT, (_m, name: string) => slots.get(name)?.trim() ?? _m);

    return new Response(updated, response);
}

export const config: Config = {
    path: ["/resume", "/resume/*", "/cover-letter", "/cover-letter/*"],
    onError: "bypass"
};