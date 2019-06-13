export interface Job {
    company: string;
    salary : Object;
    title: string;
    skills : string[];
    posted: Date;
}

export interface JobDetailed {
    company: string;
    salary : Object;
    title: string;
    skills : string[];
    posted: Date;
    description: string;
}
