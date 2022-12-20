import { createPool } from "mysql2/promise";

export const pool = createPool('mysql://3n8yyytowvntt2qnvb7q:pscale_pw_mG86lI0tQYkJMnHVcSq6wspCwDBD0PNH90h24YeGmvQ@us-east.connect.psdb.cloud/tracker_clientes?ssl={"rejectUnauthorized":true}');
