build:
		@docker-compose build || echo "\033[1;31mDid you start docker?"

start:
		docker-compose up -d
run:			start
rs: 			stop start
re:	 			build rs	#first build for reduced downtime, then restart

stop:
		docker-compose down

clean:
		docker-compose down --remove-orphans

# danger, removes database volume!
fclean:
		docker-compose down --volumes --remove-orphans
fre: 			fclean build run

# view container status
ps:
		docker-compose ps

# lint and fix
lfix:
		@bash .github/scripts/eslint.sh --fix

# seed db with base values, empty for this project
seed:
		docker exec -it backend npx prisma db seed \
			|| echo "\033[1;31mCould it be the container is not running?"

# in local mode can be used to view database
studio:
		export DATABASE_URL='postgres://dbuser:dbpassword@localhost:5432/canvasDB' && \
		cd backend/volume/ && npx prisma studio
