import requests
from requests.auth import HTTPDigestAuth
import json

PUBLIC_KEY = "kxhdzxlk"
PRIVATE_KEY = "c99c47c1-1ad4-4be7-ab9e-fed6e6fd1181"

get_all_clusters_url = "https://cloud.mongodb.com/api/atlas/v1.0/groups/639ad18d62ddee061d224158/clusters"

data = {}

headers = {
    "Accept": "application/json",
    "Content-Type": "application/json"
}

res = requests.get(url=get_all_clusters_url, data=json.dumps(
    data), headers=headers, auth=HTTPDigestAuth(PUBLIC_KEY, PRIVATE_KEY))

print(res.json())
