import { Specialty } from "./specialty.model";

export interface Hospital {
    id?: number;
    name: string;
    address: string;
    phone: string;
    manager: string;
    specialty_ID: number;
    specialty: Specialty;
}