# Configuration file for the Sphinx documentation builder.
#
# For the full list of built-in configuration values, see the documentation:
# https://www.sphinx-doc.org/en/master/usage/configuration.html

# -- Project information -----------------------------------------------------
# https://www.sphinx-doc.org/en/master/usage/configuration.html#project-information

project = 'Task Prioritization App'
copyright = '2024, Megann, Muhammad, Richard, Yisroel, Zak'
author = 'Megann, Muhammad, Richard, Yisroel, Zak'
release = '1.0'

# -- General configuration ---------------------------------------------------
# https://www.sphinx-doc.org/en/master/usage/configuration.html#general-configuration

extensions = [
    'rst2pdf.pdfbuilder',
    'sphinx_js'
    ]

js_source_path = '../../'

primary_domain = 'js'
# rst2pdf options
pdf_documents = [
    ('index', 'Task Prioritization App', 'Task Prioritization App', 'Megann\\Muhammad\\Richard\\Yisroel\\Zak'),
]


# A comma-separated list of custom stylesheets. Example:
pdf_stylesheets = ['furo.css.map']
# A list of folders to search for stylesheets. Example:
pdf_style_path = ['source/_static/styles']

templates_path = ['_templates']
exclude_patterns = []



# -- Options for HTML output -------------------------------------------------
# https://www.sphinx-doc.org/en/master/usage/configuration.html#options-for-html-output

html_theme = 'furo'
html_static_path = ['_static']

# -- Display Github repo info -------------------------------------------------
# https://shibuya.lepture.com/customisation/sidebar/#source-code-statistics
html_context = {
    "source_type": "github",
    "source_user": "Zak-Bahm",
    "source_repo": "em-proj",
}
