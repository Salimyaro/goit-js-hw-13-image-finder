# salimov-webpack5-starter-kit

1. запускаем npm i

2. меняем в файле package.json строки с репозиторием для успешного деплоя:

эти:
"homepage": "https://github.com/ВАШНИКНАГИТХАБЕ/НАЗВАНИЕВАШЕГОРЕПОЗИТОРИЯ",
"url": "git+https://github.com/ВАШНИКНАГИТХАБЕ/НАЗВАНИЕВАШЕГОРЕПОЗИТОРИЯ.git"

на ваш репозторий в таком виде:
"homepage": "https://github.com/salimov-y/webpack5-starter-kit",
"url": "git+https://github.com/salimov-y/webpack5-starter-kit.git"

3. уже содержит:
	деплой на hg-pages,
	hot reload
