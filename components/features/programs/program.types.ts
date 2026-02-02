export enum ClassStatus {
    active = "active",
    inactive = "inactive"
}

export interface ProgramClass {
    program_id: string;
    mentor_id: string;
    name: string;
    age_range: string;
    period: string;
    status: ClassStatus;
    image: string;
}

export interface Program {
    program_id: string;
    name: string;
    description: string;
    icon: string;
    image: string;
    classes?: ProgramClass[];
}