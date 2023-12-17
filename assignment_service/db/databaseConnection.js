import Pool from "pg-pool";

// export const db = new Pool({
//   host: "dpg-clvgdo6g1b2c73cgbc7g-a",
//   port: 5432,
//   database: "postgress_6n59",
//   user: "postgress_6n59_user",
//   password: "lAsfjKMUrWgEwHbQtlOKL3jgZ3AQAdNY",
// });

export const db = new Pool({
  connectionString:
    "postgres://postgress_6n59_user:lAsfjKMUrWgEwHbQtlOKL3jgZ3AQAdNY@dpg-clvgdo6g1b2c73cgbc7g-a.oregon-postgres.render.com/postgress_6n59?sslmode=require",
});
