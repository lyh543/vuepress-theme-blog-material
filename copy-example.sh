cd ../vuepress-theme-blog-material-template

if [[ $(git status --porcelain | wc -l) -gt 0 ]]
then
  echo YOUR TEMPLATE HAS UNCOMMITTED CHANGES!!!
else
  rm -r blog
  cp -r ../vuepress-theme-blog-material/example blog
  git status
fi