/**
 * Parses a JSON string produced by reference preserving
 * @param text
 */
export function parseWithRefs(text: string): any {
    // Parse, replace collection indirection objects, remove explicit IDs, track known objects.
    const objects: Record<string, any> = {};
    const result = JSON.parse(text, (_, value) => {
        if (value !== null && typeof value === "object" && "$id" in value) {
            if ("$values" in value) {
                // Collection indirection, remove object wrapper.
                objects[value.$id] = value.$values;
                return value.$values;
            } else {
                // Referable object.
                objects[value.$id] = value;
                delete value.$id;
                return value;
            }
        } else {
            // Other/plain value.
            return value;
        }
    });

    // Recursive resolver for all ref objects.
    function resolve(at: any): any {
        if (at !== null && typeof at === "object") {
            if ("$ref" in at) return objects[at.$ref];
            for (let k in at)
                at[k] = resolve(at[k]);
            return at;
        }
        return at;
    }

    // Apply on root.
    return resolve(result);
}