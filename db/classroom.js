module.exports = 
`CREATE TABLE IF NOT EXISTS  "teachers" (
	"id" serial NOT NULL,
	"first_name" varchar(50),
	"last_name" varchar(50),
	"email" varchar(100) UNIQUE,
	"password" varchar(100),
	CONSTRAINT teachers_pk PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);



CREATE TABLE IF NOT EXISTS  "classes" (
	"id" serial NOT NULL,
	"name" varchar(50) NOT NULL UNIQUE,
	"teacher_id" integer NOT NULL,
	"subject_id" integer NOT NULL,
	"year" varchar(5),
	"quarter" varchar(10),
	"thunmbnail" varchar(1000),
	CONSTRAINT classes_pk PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);



CREATE TABLE IF NOT EXISTS  "subjects" (
	"id" serial NOT NULL,
	"name" varchar(50) NOT NULL UNIQUE,
	CONSTRAINT subjects_pk PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);



CREATE TABLE IF NOT EXISTS  "students" (
	"id" serial NOT NULL,
	"first_name" varchar(50) NOT NULL,
	"last_name" varchar(50) NOT NULL,
	"email" varchar(100) NOT NULL UNIQUE,
	"password" varchar(100),
	CONSTRAINT students_pk PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);



CREATE TABLE IF NOT EXISTS  "classes_students" (
	"id" serial NOT NULL,
	"student_id" serial NOT NULL,
	"class_id" serial NOT NULL,
	CONSTRAINT classes_students_pk PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);



CREATE TABLE IF NOT EXISTS  "draft_questions" (
	"id" serial NOT NULL,
	"question" varchar(2000),
	"correct_answer" varchar(2000),
	"a" varchar(2000),
	"b" varchar(2000),
	"c" varchar(2000),
	"d" varchar(2000),
	"e" varchar(2000),
	"f" varchar(2000),
	"answers" varchar(2000),
	"subject_id" integer,
	CONSTRAINT draft_questions_pk PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);



CREATE TABLE IF NOT EXISTS  "draft_quizzes" (
	"id" serial NOT NULL,
	"name" varchar(200) NOT NULL,
	"subject" integer NOT NULL,
	"class_id" integer NOT NULL,
	CONSTRAINT draft_quizzes_pk PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);



CREATE TABLE IF NOT EXISTS  "draft_quizzes_draft_questions" (
	"id" serial NOT NULL,
	"draft_quiz_id" serial NOT NULL,
	"draft_question_id" serial NOT NULL,
	"position" integer NOT NULL,
	CONSTRAINT draft_quizzes_draft_questions_pk PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);



CREATE TABLE IF NOT EXISTS  "draft_questions_subjects" (
	"id" serial NOT NULL,
	"draft_question_id" integer NOT NULL,
	"subject_id" integer NOT NULL,
	CONSTRAINT draft_questions_subjects_pk PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);



CREATE TABLE IF NOT EXISTS  "submitted_quizzes" (
	"id" serial NOT NULL,
	"name" varchar(2000) NOT NULL,
	"subject" integer NOT NULL,
	"class_id" integer NOT NULL,
	"previous_id" integer NOT NULL,
	CONSTRAINT submitted_quizzes_pk PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);



CREATE TABLE IF NOT EXISTS  "submitted_questions" (
	"id" serial NOT NULL,
	"question" varchar NOT NULL,
	"correct_answer" varchar NOT NULL,
	"a" varchar NOT NULL,
	"b" varchar NOT NULL,
	"c" varchar NOT NULL,
	"d" varchar NOT NULL,
	"e" varchar NOT NULL,
	"f" varchar NOT NULL,
	"answers" varchar NOT NULL,
	"subject_id" integer NOT NULL,
	"previous_id" integer NOT NULL,
	CONSTRAINT submitted_questions_pk PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);



CREATE TABLE IF NOT EXISTS  "submitted_quizzes_submitted_questions" (
	"id" serial NOT NULL,
	"submitted_quiz_id" serial NOT NULL,
	"submitted_question_id" serial NOT NULL,
	CONSTRAINT submitted_quizzes_submitted_questions_pk PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);



CREATE TABLE IF NOT EXISTS  "students_responses" (
	"id" serial NOT NULL,
	"student_id" serial NOT NULL,
	"response_id" serial NOT NULL,
	"response" varchar(2000) NOT NULL,
	"correct" BOOLEAN NOT NULL,
	CONSTRAINT students_responses_pk PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);




ALTER TABLE "classes" ADD CONSTRAINT "classes_fk0" FOREIGN KEY ("teacher_id") REFERENCES "teachers"("id");
ALTER TABLE "classes" ADD CONSTRAINT "classes_fk1" FOREIGN KEY ("subject_id") REFERENCES "subjects"("id");



ALTER TABLE "classes_students" ADD CONSTRAINT "classes_students_fk0" FOREIGN KEY ("student_id") REFERENCES "students"("id");
ALTER TABLE "classes_students" ADD CONSTRAINT "classes_students_fk1" FOREIGN KEY ("class_id") REFERENCES "classes"("id");

ALTER TABLE "draft_questions" ADD CONSTRAINT "draft_questions_fk0" FOREIGN KEY ("subject_id") REFERENCES "subjects"("id");

ALTER TABLE "draft_quizzes" ADD CONSTRAINT "draft_quizzes_fk0" FOREIGN KEY ("subject") REFERENCES "subjects"("id");
ALTER TABLE "draft_quizzes" ADD CONSTRAINT "draft_quizzes_fk1" FOREIGN KEY ("class_id") REFERENCES "classes"("id");

ALTER TABLE "draft_quizzes_draft_questions" ADD CONSTRAINT "draft_quizzes_draft_questions_fk0" FOREIGN KEY ("draft_quiz_id") REFERENCES "draft_quizzes"("id");
ALTER TABLE "draft_quizzes_draft_questions" ADD CONSTRAINT "draft_quizzes_draft_questions_fk1" FOREIGN KEY ("draft_question_id") REFERENCES "draft_questions"("id");

ALTER TABLE "draft_questions_subjects" ADD CONSTRAINT "draft_questions_subjects_fk0" FOREIGN KEY ("draft_question_id") REFERENCES "draft_questions"("id");
ALTER TABLE "draft_questions_subjects" ADD CONSTRAINT "draft_questions_subjects_fk1" FOREIGN KEY ("subject_id") REFERENCES "subjects"("id");

ALTER TABLE "submitted_quizzes" ADD CONSTRAINT "submitted_quizzes_fk0" FOREIGN KEY ("subject") REFERENCES "subjects"("id");
ALTER TABLE "submitted_quizzes" ADD CONSTRAINT "submitted_quizzes_fk1" FOREIGN KEY ("class_id") REFERENCES "classes"("id");
ALTER TABLE "submitted_quizzes" ADD CONSTRAINT "submitted_quizzes_fk2" FOREIGN KEY ("previous_id") REFERENCES "draft_quizzes"("id");

ALTER TABLE "submitted_questions" ADD CONSTRAINT "submitted_questions_fk0" FOREIGN KEY ("subject_id") REFERENCES "subjects"("id");
ALTER TABLE "submitted_questions" ADD CONSTRAINT "submitted_questions_fk1" FOREIGN KEY ("previous_id") REFERENCES "draft_questions"("id");

ALTER TABLE "submitted_quizzes_submitted_questions" ADD CONSTRAINT "submitted_quizzes_submitted_questions_fk0" FOREIGN KEY ("submitted_quiz_id") REFERENCES "submitted_quizzes"("id");
ALTER TABLE "submitted_quizzes_submitted_questions" ADD CONSTRAINT "submitted_quizzes_submitted_questions_fk1" FOREIGN KEY ("submitted_question_id") REFERENCES "submitted_questions"("id");

ALTER TABLE "students_responses" ADD CONSTRAINT "students_responses_fk0" FOREIGN KEY ("student_id") REFERENCES "students"("id");
ALTER TABLE "students_responses" ADD CONSTRAINT "students_responses_fk1" FOREIGN KEY ("response_id") REFERENCES "submitted_quizzes_submitted_questions"("id");
`