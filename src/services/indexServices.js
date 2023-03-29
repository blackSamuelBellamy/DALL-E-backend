const pool = require('../dataBase/conexion')

const creatingPost = async (name, prompt, photo) =>  {
    const command = 'INSERT INTO fotos VALUES (DEFAULT, $1, $2, $3)'
    const values = [name, prompt, photo]
    const { rowCount } = await pool.query(command, values)
    if(!rowCount) throw new Error('No se pudo ingresar los datos')
}

const readingPost = async () => {
    const { rows, rowCount } = await pool.query('SELECT * FROM fotos')
    if(rowCount === 0) throw new Error('No hay datos en la tabla')
    if(!rowCount) throw new Error('No se pudo extraer los datos')
    return rows
}

module.exports = {creatingPost, readingPost}