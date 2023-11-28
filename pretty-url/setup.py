from setuptools import setup

setup(
    name='mkdocs-pretty-url-plugin',
    version='0.1',
    description='A plugin for mkdocs to make links pretty out of filenames and update links in markdown files',
    py_modules=['replace'],
    entry_points={
        'mkdocs.plugins': [
            'pretty-url = replace:ReplaceSpacesPlugin'
        ]
    }
)
