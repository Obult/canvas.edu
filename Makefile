build:
		@docker-compose build || echo "\033[1;31mDid you start docker?"

start:
		docker-compose up -d

run:	start

stop:
		docker-compose down

clean:
		docker-compose down --remove-orphans

fclean:
		docker-compose down --volumes --remove-orphans

re:	 			stop build run
fre: 			fclean build run
br:				build run
restart: 	stop start

ps:
		docker-compose ps

lint: 
		@bash .github/scripts/eslint.sh

lint-fix:
		@bash .github/scripts/eslint.sh --fix

migrate:
		docker exec -it backend npx prisma migrate dev \
			|| echo "\033[1;31mCould it be the container is not running?"

seed:
		docker exec -it backend npx prisma db seed \
			|| echo "\033[1;31mCould it be the container is not running?"

# Do not forget to seed before using database: easy use make ms while containers are running
ms:	migrate seed

# make sure to not have mac node modules and then build and run with the makefile

studio:
		export DATABASE_URL='postgres://dbuser:dbpassword@localhost:5432/canvasDB' && \
		cd backend/volume/ && npx prisma studio
