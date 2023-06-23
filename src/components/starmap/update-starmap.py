import json
import time

import requests

url = "https://api.spacetraders.io/v2/systems"

page_num = 1

headers = {"limit": 20, "page": f"{page_num}"}

r = requests.get(url, headers)
total_systems = r.json()['meta']["total"]

starmap = []
for page in range(600):

    if page_num < 601:
        print(f"Page: {page_num}")
        time.sleep(1)
        r = requests.get(url, headers)
        page_num += 1

        for system in r.json()["data"]:
            starmap.append(system)

with open("systems.json", "w") as f:
    f.write(json.dumps(starmap, indent=4))

with open("systems.json", "r") as f:
    starmap = json.load(f)
    count = 0
    for system in starmap:
        count += 1
        #print(system["symbol"])
    print(count)
