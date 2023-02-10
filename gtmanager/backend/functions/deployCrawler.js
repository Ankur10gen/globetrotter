// args: {"project_id":""}
exports = async function deployCrawler(args) {
  // Get clusters from project
  let clustersColl = context.services
    .get("CSPersistentStore")
    .db("globetrotter")
    .collection("clusters");

  let listOfClusterNames = await clustersColl
    .find({ groupId: args.project_id }, { name: 1, _id: 0 })
    .toArray();

  console.log("array" + JSON.stringify(listOfClusterNames));

  // Get Project Info
  let projectsInfoColl = context.services
    .get("CSPersistentStore")
    .db("globetrotter")
    .collection("projectsInfoColl");

  projectsInfoColl
    .findOne({ project_id: args.project_id })
    .then((project) => {
      console.log(JSON.stringify(project));

      // Get Bearer Token

      const get_bearer_token_api = {
        scheme: "https",
        host: "realm.mongodb.com",
        path: "api/admin/v3.0/auth/providers/mongodb-cloud/login",
        body: { username: project.public_key, apiKey: project.private_key },
        headers: {
          "Content-Type": ["application/json"],
          Accept: ["application/json"],
        },
        digestAuth: true,
        username: project.public_key,
        password: project.private_key,
        encodeBodyAsJSON: true,
      };

      context.http.post(get_bearer_token_api).then((res) => {
        console.log("Line 40" + JSON.stringify(res.body.text()));
        const res_json = EJSON.parse(res.body.text());
        //Create an app in the project

        const body_for_create_api = {
          name: "GlobeTrotterWorker",
          provider_region: "aws-us-east-1",
          location: "US-VA",
          deployment_model: "GLOBAL",
          environment: "production",
          data_source: {
            name: listOfClusterNames[0].name,
            type: "mongodb-atlas",
            config: {
              clusterName: listOfClusterNames[0].name,
              readPreference: "primary",
              wireProtocolEnabled: true,
            },
          },
        };

        const app_create_api = {
          scheme: "https",
          host: "realm.mongodb.com",
          path: "api/admin/v3.0/groups/" + args.project_id + "/apps",
          headers: {
            "Content-Type": ["application/json"],
            Authorization: ["Bearer " + res_json.access_token],
          },
          body: body_for_create_api,
          encodeBodyAsJSON: true,
        };

        console.log(JSON.stringify(app_create_api));
        context.http
          .post(app_create_api)
          .then((res) => {
            console.log(JSON.stringify(res));
            // Add more data sources to the app
          })
          .catch((err) => {
            console.log(err);
          });
      });
    })
    .catch((err) => {
      console.log(err);
    });

  // Add a function to the app
};
