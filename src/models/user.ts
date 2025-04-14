export type User = {
    id: string;
    name: string;
}

export function createUser(id: string, name: string): User {
    const user: User = {
        id,
        name
    }
    return Object.freeze(user);
}
