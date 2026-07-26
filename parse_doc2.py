import json
import re

with open('/Users/bhiupeshpatil/Downloads/Bhupesh/Rankquestdeploy/RankQuest-Platform-DSA/doc', 'r') as f:
    content = f.read()

# Extract the JSON payload after '"sections":' up to ',"subjectId"' or similar
match = re.search(r'"sections":(\[\{.*\}\]),"video_type"', content)
if not match:
    match = re.search(r'"sections":(\[\{.*?\}\]),"', content)

if match:
    sections_str = match.group(1).replace('\\"', '"').replace('\\n', '')
    try:
        sections = json.loads(sections_str)
        print("Successfully parsed sections!")
        count = 0
        with open('seed_data.txt', 'w') as out:
            for s in sections:
                topic = s.get('category_name', 'General')
                for sub in s.get('subcategories', []):
                    for p in sub.get('problems', []):
                        count += 1
                        title = p.get('problem_name', '').replace('"', "'")
                        diff = p.get('difficulty', 'Medium')
                        lc = p.get('leetcode', '')
                        if lc == '$undefined': lc = ''
                        gfg = p.get('gfg', '')
                        if gfg == '$undefined': gfg = ''
                        out.write(f'problemRepository.save(new Problem("{title}", "Solve {title} optimally.", "{diff}", "45.2%", "{topic}", "striver-sde", "{lc}", "{gfg}", "", ""));\n')
        print(f"Generated {count} problems in seed_data.txt")
    except Exception as e:
        print("JSON parse error:", e)
else:
    print("Still no match")
