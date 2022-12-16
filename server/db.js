import { createPool } from "mysql2/promise";

export const pool = createPool({
    host:'5.161.64.34',
    port:3306,
    user: 'trackerc_user',
    password: 'Tracker.X.2022',
    database: 'trackerc_servicios'
});
