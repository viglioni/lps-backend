module.exports = {
  name: 'default',
  type: 'mysql',
  port: 3306,
  synchronize: true,
  logging: ['error'],
  migrations: ['src/db/migrations/*.ts'],
  cli: {
    migrationsDir: 'src/db/migrations',
  },
  entities: [(process.env.TS_NODE_DEV && 'src/**/*.entity.ts') || 'dist/**/*.entity.js'],
  host: process.env.DB_HOST,
  database: process.env.DB_DATABASE,
  username: process.env.DB_USER,
  password: process.env.DB_PASSWD,
}
