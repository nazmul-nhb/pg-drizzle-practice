ALTER TABLE "users" DROP CONSTRAINT "users_user_name_unique";--> statement-breakpoint
CREATE UNIQUE INDEX "user_name_idx" ON "users" USING btree ("user_name");