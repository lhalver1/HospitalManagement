import { Hospital } from "./hospital.model";

export interface Specialty {
    id: number;
    name: string;
    hospital: Hospital[]
}