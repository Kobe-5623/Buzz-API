
export const COURSES = [
    'BSCS',
    'BSBA',
    'BSTM',
    'BSA',
    'BSHM',
    'BSED',
] as const;

export type Course = typeof COURSES[number];

export const USER_ROLE = [
    'regular',
    'admin',
] as const;
export type UserRole = typeof USER_ROLE[number];

export const USER_STATUS = [
    'active',
    'inactive',
    'suspended',
] as const;
export type UserStatus = typeof USER_STATUS[number];