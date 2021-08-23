export interface CRUD {
    getAll: () => Promise<any>;
    create: (resource: any) => Promise<any>;
    // putById: (id: string, resource: any) => Promise<string>;
    getOneById: (id: string) => Promise<any>;
    deleteById: (id: string) => Promise<any>;
    // patchById: (id: string, resource: any) => Promise<string>;
}