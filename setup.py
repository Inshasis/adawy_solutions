from setuptools import setup, find_packages

with open("requirements.txt") as f:
	install_requires = f.read().strip().split("\n")

# get version from __version__ variable in adawy_solutions/__init__.py
from adawy_solutions import __version__ as version

setup(
	name="adawy_solutions",
	version=version,
	description="Adawy Solutions Customization OMAN",
	author="InshaSiS Technologies",
	author_email="support@inshasis.com",
	packages=find_packages(),
	zip_safe=False,
	include_package_data=True,
	install_requires=install_requires
)
