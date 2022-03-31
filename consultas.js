const { Pool } = require("pg");

const config = {
  user: "postgres",
  host: "localhost",
  database: "repertorio",
  password: "",
  port: 5432,
};

const pool = new Pool(config);

const insertar = async (parametros) => {
  const query = {
    text: "insert into repertorios (cancion, artista, tono) values ($1, $2, $3) returning *",
    values: parametros,
  };
  try {
    return await pool.query(query);
  } catch (error) {
    return error;
  }
};

const canciones = async () => {
  const query = "select * from repertorios";
  try {
    const resultado = await pool.query(query);
    return resultado.rows;
  } catch (error) {
    return error;
  }
};

const eliminar = async (id) => {
  const query = {
    text: "DELETE FROM repertorios WHERE id = $1 RETURNING *",
    values: [id],
  };
  //const query = `delete from repertorios where id = ${id}`;
  try {
    const resultado = await pool.query(query);
    return resultado.rows;
  } catch (error) {
    return error;
  }
};

const editar = async (cancion) => {
    const nuevaCancion = Object.values(cancion);
  const query = {
    text: `UPDATE repertorios SET cancion = $2, artista = $3, tono = $4 WHERE id = $1`,
    values: nuevaCancion,
  };
  try {
    const resultado = await pool.query(query);
    return resultado.rows;
  } catch (error) {
    return error;
  }
};

module.exports = { insertar, canciones, eliminar, editar };
