# Configuration file for the Sphinx documentation builder.
#
# For the full list of built-in configuration values, see the documentation:
# https://www.sphinx-doc.org/en/master/usage/configuration.html

# -- Project information -----------------------------------------------------
# https://www.sphinx-doc.org/en/master/usage/configuration.html#project-information

project = 'Eisenhower Method'
copyright = '2024, Megann, Muhammad, Richard, Yisroel, Zak'
author = 'Megann, Muhammad, Richard, Yisroel, Zak'
release = '1.0'

# -- General configuration ---------------------------------------------------
# https://www.sphinx-doc.org/en/master/usage/configuration.html#general-configuration

extensions = []

templates_path = ['_templates']
exclude_patterns = []



# -- Options for HTML output -------------------------------------------------
# https://www.sphinx-doc.org/en/master/usage/configuration.html#options-for-html-output

html_theme = 'shibuya'
html_static_path = ['_static']

# -- Display Github repo info -------------------------------------------------
# https://shibuya.lepture.com/customisation/sidebar/#source-code-statistics
html_context = {
    "source_type": "github",
    "source_user": "Zak-Bahm",
    "source_repo": "em-proj",
}
