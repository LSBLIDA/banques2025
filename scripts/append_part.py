import sys
part_file = sys.argv[1]
with open(part_file, 'r', encoding='utf-8') as f_in:
    content = f_in.read()
with open('scripts/build_audited_database.py', 'a', encoding='utf-8') as f_out:
    f_out.write(content)
print(f'Appended {part_file}')
