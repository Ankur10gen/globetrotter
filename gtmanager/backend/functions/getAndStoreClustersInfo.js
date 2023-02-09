// args: {"project_id":"", "public_key":"", "private_key":""}
exports = async function getAndStoreClustersInfo(args) {
  // Get keys to access cluster info

  const data = {
    scheme: "https",
    host: "cloud.mongodb.com",
    path: "api/atlas/v1.0/groups/" + args.project_id + "/clusters",
    username: args.public_key,
    password: args.private_key,
    headers: {
      "Content-Type": ["application/json"],
      "Accept-Encoding": ["bzip, deflate"],
    },
    digestAuth: true,
  };

  let clusters = context.services
    .get("CSPersistentStore")
    .db("globetrotter")
    .collection("clusters");

  // Get clusters from the project
  // The response body is a BSON.Binary object. Parse it and return.

  console.log(JSON.stringify(data));

  context.http
    .get(data)
    .then((resGetClusters) => {
      console.log(JSON.stringify(resGetClusters.body.text()));
      const resGetClustersJSON = EJSON.parse(resGetClusters.body.text());
      // Store clusters info in database
      clusters
        .insertMany(resGetClustersJSON["results"])
        .then((resStoreClusters) => {
          console.log(resStoreClusters);
        })
        .catch((err) => {
          console.log(err);
        });
    })
    .catch((err) => {
      console.log(err);
    });
};
