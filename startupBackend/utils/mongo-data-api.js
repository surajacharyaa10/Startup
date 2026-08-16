const DATA_API_ENDPOINT = "https://data.mongodb-api.com/app/{{APP_ID}}/endpoint/data/v1";

async function dataApiRequest(env, action, payload) {
  const endpoint = DATA_API_ENDPOINT.replace("{{APP_ID}}", env.MONGODB_DATA_API_APP_ID);
  const response = await fetch(`${endpoint}/action/${action}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "api-key": env.MONGODB_DATA_API_KEY,
    },
    body: JSON.stringify({
      dataSource: env.MONGODB_DATA_SOURCE || "Cluster0",
      database: env.MONGODB_DATABASE || "test",
      ...payload,
    }),
  });

  if (!response.ok) {
    const error = await response.text();
    throw new Error(`Data API error: ${response.status} - ${error}`);
  }

  return response.json();
}

function convertDoc(doc) {
  if (!doc) return null;
  if (Array.isArray(doc)) return doc.map(convertDoc);
  if (typeof doc === "object" && doc !== null) {
    const result = {};
    for (const [key, value] of Object.entries(doc)) {
      if (value && typeof value === "object" && "$oid" in value) {
        result[key] = value.$oid;
      } else if (value && typeof value === "object" && "$date" in value) {
        result[key] = value.$date;
      } else if (value && typeof value === "object") {
        result[key] = convertDoc(value);
      } else {
        result[key] = value;
      }
    }
    return result;
  }
  return doc;
}

async function findOne(env, collection, filter = {}, projection = {}) {
  const result = await dataApiRequest(env, "findOne", { collection, filter, projection });
  return convertDoc(result.document);
}

async function find(env, collection, filter = {}, projection = {}, limit = 0, sort = {}) {
  const result = await dataApiRequest(env, "find", { collection, filter, projection, limit, sort });
  return convertDoc(result.documents);
}

async function insertOne(env, collection, document) {
  const result = await dataApiRequest(env, "insertOne", { collection, document });
  return findOne(env, collection, { _id: { $oid: result.insertedId } });
}

async function updateOne(env, collection, filter, update) {
  const result = await dataApiRequest(env, "updateOne", { collection, filter, update: { $set: update } });
  if (result.modifiedCount === 0) return null;
  return findOne(env, collection, filter);
}

async function deleteOne(env, collection, filter) {
  const result = await dataApiRequest(env, "deleteOne", { collection, filter });
  return result.deletedCount > 0;
}

module.exports = { findOne, find, insertOne, updateOne, deleteOne };