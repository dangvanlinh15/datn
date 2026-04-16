import csv
import json
import re

data_json_path = r"c:\Users\Hoang Anh\Downloads\DATN-master\DATN-master\WEB\src\utils\data\data.json"
csv_path = r"C:\Users\Hoang Anh\Documents\tmp\CRAWLER\insert_data\all_data.csv"

# Load current data.json
with open(data_json_path, 'r', encoding='utf-8') as f:
    data = json.load(f)

provinces = set()
with open(csv_path, 'r', encoding='utf-8') as f:
    reader = csv.DictReader(f)
    for row in reader:
        prov = row.get('province')
        if prov:
            prov = prov.strip()
            # simple filter for noise (e.g., Lô 12, lô 379, etc)
            if len(prov) > 2 and prov.lower() != 'address' and not prov.lower().startswith('lô') and not prov.isdigit():
                # remove "Tỉnh " or standardize if needed, but we keep it as is
                provinces.add(prov)

sorted_provs = sorted(list(provinces))

# rebuild province list
province_list = [{"label": "Tất cả", "value": ""}]
for p in sorted_provs:
    province_list.append({"value": p, "label": p})

data['province'] = province_list

with open(data_json_path, 'w', encoding='utf-8') as f:
    json.dump(data, f, ensure_ascii=False, indent=2)

print("Updated data.json successfully with " + str(len(sorted_provs)) + " provinces.")
