// args - {"project_id":"", "public_key":"", "private_key":""}
exports = async function storeProjectsInfo(args) {
  // validate args
  let data = args;
  let projectsInfoColl = context.services
    .get("CSPersistentStore")
    .db("globetrotter")
    .collection("projectsInfoColl");

  projectsInfoColl
    .insertOne(data)
    .then((result) =>
      console.log(`Successfully inserted item with _id: ${result.insertedId}`)
    )
    .catch((err) => console.error(`Failed to insert item: ${err}`));
};
