git checkout build
git add .
git commit -m 'update'
git push origin build 
ssh root@14.225.254.87 'cd FInal_FE_Project && git pull origin build && docker rm -f fe-container && docker compose up -d --build'