migrations=(`find . -name migrations`)
for migration in $migrations
do
  rm $migration/*.py
  touch $migration/__init__.py
done
