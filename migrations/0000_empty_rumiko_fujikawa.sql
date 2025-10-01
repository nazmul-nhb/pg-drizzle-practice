CREATE TABLE "users" (
	"id" serial PRIMARY KEY NOT NULL,
	"first_name" varchar(64) NOT NULL,
	"last_name" varchar(64) NOT NULL,
	"email" varchar(128) NOT NULL,
	"password" varchar(64) NOT NULL,
	"role" varchar(16) DEFAULT 'user' NOT NULL,
	"is_active" boolean DEFAULT true NOT NULL,
	"user_name" varchar(32) NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "users_user_name_unique" UNIQUE("user_name")
);
