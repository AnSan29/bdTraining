import mysql from 'mysql';

// funciones CRUD génericas, para modificación de cualquier tabla

// insertar un registro
export const insertRecord = (pool, table, data, callback) =>{
    const insertQuery = `INSERT INTO ${table} SET ?`;
    pool.query(insertQuery, data, (err, result)=>{
        callback(err,result);
    });
};

// leer registros
export const readAllRecords = (pool, table, callback) =>{
    const readQuery = `SELECT * FROM ${table}`;
    pool.query(readQuery, (err, result) => {
        callback(err,result);
    });
};

// actualizar registros
export const updateRecord = (pool, table, data, idField, callback)=>{
    const idValue = data[idField];
    // eliminamos id para que no sea incluido en el set
    delete data[idField];

    const updateQuery = `UPDATE ${table} SET ? WHERE ${idField} = ?`;
    pool.query(updateQuery, [data, idValue], (err, result)=>{
        callback(err,result);
    });
};

// eliminar registros
export const removeRecord = (pool, table, idValue, idField = 'id', callback) => {
    const removeQuery = `DELETE FROM ${table} WHERE ${idField} = ?`;
    pool.query(removeQuery, idValue,(err, result)=>{
        callback(err,result);
    });
};