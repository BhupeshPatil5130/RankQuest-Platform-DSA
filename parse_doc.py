import json
import re

with open('/Users/bhiupeshpatil/Downloads/Bhupesh/Rankquestdeploy/RankQuest-Platform-DSA/doc', 'r') as f:
    content = f.read()

# Try to find the section array
match = re.search(r'"sections":(\[\{.*?\}\]),"has_sub_category"', content)
if not match:
    match = re.search(r'"sections":(\[\{.*?\}\]),"', content)

if match:
    try:
        sections = json.loads(match.group(1))
        problems = []
        for section in sections:
            topic = section.get('category_name', 'General')
            for sub in section.get('subcategories', []):
                for p in sub.get('problems', []):
                    problems.append({
                        'title': p.get('problem_name', ''),
                        'difficulty': p.get('difficulty', 'Medium'),
                        'topic': topic,
                        'leetcode': p.get('leetcode', ''),
                        'gfg': p.get('gfg', ''),
                        'link': p.get('article', '')
                    })
        print(f"Found {len(problems)} problems")
        
        # generate java code
        print('// Striver A2Z Problems')
        for p in problems[:50]: # Let's take first 50 for now to not blow up the file size
            title = p['title'].replace('"', '\\"')
            diff = p['difficulty']
            topic = p['topic'].replace('"', '\\"')
            leetcode = p['leetcode'] if p['leetcode'] != '$undefined' else ''
            gfg = p['gfg'] if p['gfg'] != '$undefined' else ''
            print(f'problemRepository.save(new Problem("{title}", "Striver A2Z Problem", "{diff}", "50.0%", "{topic}", "striver-sde", "{leetcode}", "{gfg}", "", ""));')
            
    except Exception as e:
        print("JSON parse error", e)
else:
    print("Could not find sections data")
