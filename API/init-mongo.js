// Get the database name from the environment variable
const dbName = process.env.MONGO_INITDB_DATABASE;
print(`Database name: ${dbName}`);

// Switch to the specified database
db = db.getSiblingDB(dbName);
print(`Switched to database: ${dbName}`);

// Create the user in the specified database
try {
  db.createUser({
    user: process.env.MONGO_INITDB_ROOT_USERNAME,
    pwd: process.env.MONGO_INITDB_ROOT_PASSWORD,
    roles: [{ role: 'readWrite', db: dbName }]
  });
  print(`User ${process.env.MONGO_INITDB_ROOT_USERNAME} created successfully in database ${dbName}`);
} catch (e) {
  print(`Error creating user: ${e}`);
}

// Create an initial collection to ensure the database is created
try {
  db.createCollection('initCollection');
  print('Initial collection created successfully');
} catch (e) {
  print(`Error creating collection: ${e}`);
}
