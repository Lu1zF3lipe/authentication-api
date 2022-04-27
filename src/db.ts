import { Pool } from "pg";

const connectionString = 'postgres://nrwpjzrj:th5vHVJdGRQivTM2BFonpDGMLR6FmQ51@kesavan.db.elephantsql.com/nrwpjzrj';
const db = new Pool({ connectionString });

export default db;