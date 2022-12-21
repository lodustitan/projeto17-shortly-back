CREATE TABLE accounts (
	"id" serial NOT NULL PRIMARY KEY,
	"name" varchar(50) NOT NULL,
	"email" varchar(50) NOT NULL,
	"password" TEXT NOT NULL
);

CREATE TABLE urls (
	"id" serial NOT NULL PRIMARY KEY,
	"url" TEXT NOT NULL UNIQUE,
	"shortUrl" TEXT NOT NULL UNIQUE,
	"visitCount" integer NOT NULL,
	"owner_id" integer NOT NULL REFERENCES "accounts"("id")
);
