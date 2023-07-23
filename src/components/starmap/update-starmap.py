import json
import time

import requests

url = "https://api.spacetraders.io/v2/systems"

#systems_found = r.json()['meta']["total"]

total_systems = 12000
systems_per_page = 20

total_pages = int(total_systems / systems_per_page)

starmap = []
for page_num in range(1, total_pages +1):
    print(f"Page: {page_num} of 600")
    headers = {"limit": 20, "page": f"{page_num}"}
    time.sleep(1)
    r = requests.get(url, headers)

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
