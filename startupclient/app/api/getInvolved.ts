import API_URL from "./url";

export interface GetInvolved {
    _id: string;
    title: string;
    description: string;
    type: "volunteer" | "contribute" | "sponsor" | "careers";
    icon: string;
    link?: string;
    benefits: string[];
    requirements: string[];
    featured: boolean;
}

function normalizeBSON(value: any): any {
    if (value === null || typeof value !== "object") return value;
    const keys = Object.keys(value);
    if (keys.length === 1) {
        const k = keys[0];
        if (k === "$numberInt" || k === "$numberLong") return Number(value[k]);
        if (k === "$oid") return String(value[k]);
        if (k === "$date") {
            const dv = value[k];
            if (dv && typeof dv === "object" && dv.$numberLong)
                return new Date(Number(dv.$numberLong)).toISOString();
            return new Date(String(dv)).toISOString();
        }
    }
    if (Array.isArray(value)) return value.map(normalizeBSON);
    const out: any = {};
    for (const [k, v] of Object.entries(value)) out[k] = normalizeBSON(v);
    return out;
}

export const getInvolvedApi = {
    async getOptions(type?: string): Promise<GetInvolved[]> {
        const url = type ? `${API_URL}/get-involved?type=${type}` : `${API_URL}/get-involved`;
        const res = await fetch(url, { cache: "no-store" });
        if (!res.ok) throw new Error("Failed to fetch options");
        const data = await res.json().catch(() => null);

        // support both { success, data } wrapping and raw arrays/objects
        let body: any = data && data.success && data.data ? data.data : data;
        if (!body) return [];

        // normalize to array if backend returned a single object
        if (!Array.isArray(body)) {
            if (Array.isArray(body.options)) body = body.options;
            else body = [body];
        }

        return normalizeBSON(body) as GetInvolved[];
    },
};
