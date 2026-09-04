
export const COURSES = [
    'BSCS',
    'BSBA',
    'BSTM',
    'BSA',
    'BSHM',
    'BSED',
] as const;

export type Course = typeof COURSES[number];