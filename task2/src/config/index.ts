export default () => ({
  db_port: parseInt(process.env.DB_PORT) || 5432,
  db_name: process.env.DB_NAME,
  db_user: process.env.DB_USER,
  db_pass: process.env.DB_PASS,
  db_host: process.env.DB_HOST,
});
