import * as SQLite from 'expo-sqlite';

const db = SQLite.openDatabase('PlacesDataBase.db');

/**
 * A method for initializing connection with database. If the given database doesn't exists,
 * a new DB will be created, if it already exists and no issues occurred, a promise will be resolved.
 * invoking db.transaction with 'tx' parameter guarantees that if errors occurred, the transaction would be
 * canceled without littering database with corrupted data.
 * @returns {Promise}
 */
export const init = () => {
  const promise = new Promise((resolve, reject) => {
    db.transaction(tx => {
      tx.executeSql(
        'CREATE TABLE IF NOT EXISTS PlacesDataBase (id PRIMARY KEY, title TEXT NOT NULL, imageUri TEXT NOT NULL, address TEXT NOT NULL, lat REAL NOT NULL, lng REAL NOT NULL);',
        [],
        () => {
          resolve();
        },
        (_, err) => {
          reject(err);
        }
      );
    });
  });
  return promise;
};

/**
 * A method for inserting places into SQLLiteDB, returns a promise that
 * can be either resolved or rejected, used while invoking SET_PLACES action type with addPlace()
 * action creator.
 * 
 * @param  {number} id
 * @param  {string} title
 * @param  {string} imageUri
 * @param  {string} address
 * @param  {string} lat
 * @param  {string} lng
 * @returns {Promise}
 */
export const insertPlace = (id, title, imageUri, address, lat, lng) => {
    const promise = new Promise((resolve, reject) => {
        db.transaction(tx => {
          tx.executeSql(
            `INSERT INTO PlacesDataBase (id, title, imageUri, address, lat, lng) VALUES (?, ?, ?, ?, ?, ?)`,
            [id, title, imageUri, address, lat, lng],
            (_, result) => {
              resolve(result);
            },
            (_, err) => {
              reject(err);
            }
          );
        });
      });
      return promise;
};

/**
 * A method for fetching all the places from DB.
 * @returns {Promise}
 */
export const fetchPlaces = () => {
    const promise = new Promise((resolve, reject) => {
        db.transaction(tx => {
          tx.executeSql(
            'SELECT * FROM PlacesDataBase',
            [],
            (_, result) => {
              resolve(result);
            },
            (_, err) => {
              reject(err);
            }
          );
        });
      });
      return promise;
};
