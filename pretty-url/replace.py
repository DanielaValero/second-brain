import os

# Define the directory where your mkdocs documentation is stored
docs_dir = '/path/to/mkdocs/docs'

# Loop through each file in the directory
for filename in os.listdir(docs_dir):
    if filename.endswith('.md'):
        # Replace spaces with dashes in the filename
        new_filename = filename.replace(' ', '-')

        # Rename the file
        os.rename(os.path.join(docs_dir, filename), os.path.join(docs_dir, new_filename))

        # Update links in the markdown file
        with open(os.path.join(docs_dir, new_filename), 'r') as file:
            file_content = file.read()
            new_file_content = file_content.replace(filename, new_filename)
        with open(os.path.join(docs_dir, new_filename), 'w') as file:
            file.write(new_file_content)