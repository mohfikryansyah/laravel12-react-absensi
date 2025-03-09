import { Divisi } from "@/types";

export const division = (division: Divisi[]) => {
    return division.map((divisi) => (
        {
            value: divisi.id,
            label: divisi.name
        }
    ))
}