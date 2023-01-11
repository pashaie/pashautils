#https://vitejs.dev/guide/static-deploy.html#github-pages

npm run build

cd dist
echo '' > .nojekyll

git init
git checkout -B main
git add -A
git commit -m 'deploy'

git push -f git@github.com:pashaie/pashautils.git main:gh-pages