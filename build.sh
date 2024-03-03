git checkout build
git add .
git commit -m 'update'
git push origin build
ssh root@103.200.20.153 'cd FInal_FE_Project && git pull origin build && docker rm -f fe-container && docker compose up -d --build'