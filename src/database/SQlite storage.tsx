import SQLite, {
  SQLiteDatabase,
  ResultSet,
  SQLError,
  Transaction,
} from 'react-native-sqlite-storage';

export interface Item {
  id: number;
  name: string;
  value: number;
}

const db: SQLiteDatabase = SQLite.openDatabase(
  {
    name: 'test.db',
    location: 'default',
  },
  () => console.log('Database otwarta'),
  (err: SQLError) => console.error('Error opening database', err),
);

export const createTable = (): void => {
  db.transaction(tx => {
    tx.executeSql(
      'CREATE TABLE IF NOT EXISTS Items (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT, value INTEGER);',
      [],
      () => console.log('Tabla stworzona'),
      (transaction: Transaction, error: SQLError) =>
        console.error('Error tworzenia tabel', error),
    );
  });
};

export const insertItem = (name: string, value: number): void => {
  db.transaction(tx => {
    tx.executeSql(
      'INSERT INTO Items (name, value) VALUES (?, ?);',
      [name, value],
      () => console.log('Item dodany'),
      (transaction: Transaction, error: SQLError) =>
        console.error('Error dodawania item', error),
    );
  });
};

export const deleteItem = (id: number): void => {
  db.transaction(tx => {
    tx.executeSql(
      'DELETE FROM Items WHERE id = ?;',
      [id],
      () => console.log('Item usuniety'),
      (transaction: Transaction, error: SQLError) =>
        console.error('Error usuwania itemu', error),
    );
  });
};

export const getItemsWithOptions = (
  columns: string[],
  whereClause: string = '',
  params: any[] = [],
  callback: (items: any[]) => void,
): void => {
  const selectedColumns = columns.length > 0 ? columns.join(', ') : '*';
  db.transaction(tx => {
    tx.executeSql(
      `SELECT ${selectedColumns} FROM Items ${whereClause};`,
      params,
      (_, results: ResultSet) => callback(results.rows.raw()),
      (transaction: Transaction, error: SQLError) =>
        console.error('Error fetching items', error),
    );
  });
};

export const getItems = (
  whereClause: string = '',
  params: any[] = [],
  callback: (items: Item[]) => void,
): void => {
  db.transaction(tx => {
    tx.executeSql(
      `SELECT * FROM Items ${whereClause};`,
      params,
      (_, results: ResultSet) => {
        const items: Item[] = results.rows.raw();
        callback(items);
      },
      (transaction: Transaction, error: SQLError) =>
        console.error('Error pobierania itemu', error),
    );
  });
};
