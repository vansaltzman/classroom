module.exports = 
`CREATE TABLE IF NOT EXISTS  "teachers" (
	"id" serial NOT NULL,
	"firstName" varchar(50) NOT NULL,
	"lastName" varchar(50) NOT NULL,
	"email" varchar(100) NOT NULL,
	CONSTRAINT teachers_pk PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);



CREATE TABLE IF NOT EXISTS  "classes" (
	"id" serial NOT NULL,
	"name" varchar(50) NOT NULL,
	"teacherId" integer NOT NULL,
	"subjectId" integer NOT NULL,
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
	"firstName" varchar(50) NOT NULL,
	"lastName" varchar(50) NOT NULL,
	"email" varchar(100) NOT NULL,
	CONSTRAINT students_pk PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);



CREATE TABLE IF NOT EXISTS  "classes_students" (
	"id" serial NOT NULL,
	"studentId" serial NOT NULL,
	"classId" serial NOT NULL,
	CONSTRAINT classes_students_pk PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);



CREATE TABLE IF NOT EXISTS  "draft_questions" (
	"id" serial NOT NULL,
	"question" varchar(2000),
	"correctAnswer" varchar(2000),
	"a" varchar(2000),
	"b" varchar(2000),
	"c" varchar(2000),
	"d" varchar(2000),
	"e" varchar(2000),
	"f" varchar(2000),
	"answers" varchar(2000),
	"subjectId" integer,
	CONSTRAINT draft_questions_pk PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);



CREATE TABLE IF NOT EXISTS  "draft_quizzes" (
	"id" serial NOT NULL,
	"name" varchar(200) NOT NULL,
	"subject" integer NOT NULL,
	"classId" integer NOT NULL,
	CONSTRAINT draft_quizzes_pk PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);



CREATE TABLE IF NOT EXISTS  "draft_quizzes_draft_questions" (
	"id" serial NOT NULL,
	"draftQuizId" serial NOT NULL,
	"draftQuestionId" serial NOT NULL,
	"position" integer NOT NULL,
	CONSTRAINT draft_quizzes_draft_questions_pk PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);



CREATE TABLE IF NOT EXISTS  "draft_questions_subjects" (
	"id" serial NOT NULL,
	"draftQuestionId" integer NOT NULL,
	"subjectId" integer NOT NULL,
	CONSTRAINT draft_questions_subjects_pk PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);



CREATE TABLE IF NOT EXISTS  "submitted_quizzes" (
	"id" serial NOT NULL,
	"name" varchar(2000) NOT NULL,
	"subject" integer NOT NULL,
	"classId" integer NOT NULL,
	"previousId" integer NOT NULL,
	CONSTRAINT submitted_quizzes_pk PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);



CREATE TABLE IF NOT EXISTS  "submitted_questions" (
	"id" serial NOT NULL,
	"question" varchar NOT NULL,
	"correctAnswer" varchar NOT NULL,
	"a" varchar NOT NULL,
	"b" varchar NOT NULL,
	"c" varchar NOT NULL,
	"d" varchar NOT NULL,
	"e" varchar NOT NULL,
	"f" varchar NOT NULL,
	"answers" varchar NOT NULL,
	"subjectId" integer NOT NULL,
	"previousId" integer NOT NULL,
	CONSTRAINT submitted_questions_pk PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);



CREATE TABLE IF NOT EXISTS  "submitted_quizzes_submitted_questions" (
	"id" serial NOT NULL,
	"submittedQuizId" serial NOT NULL,
	"submittedQuestionId" serial NOT NULL,
	CONSTRAINT submitted_quizzes_submitted_questions_pk PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);



CREATE TABLE IF NOT EXISTS  "students_responses" (
	"id" serial NOT NULL,
	"studentId" serial NOT NULL,
	"responseId" serial NOT NULL,
	"response" varchar(2000) NOT NULL,
	"correct" BOOLEAN NOT NULL,
	CONSTRAINT students_responses_pk PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);




ALTER TABLE "classes" ADD CONSTRAINT "classes_fk0" FOREIGN KEY ("teacherId") REFERENCES "teachers"("id");
ALTER TABLE "classes" ADD CONSTRAINT "classes_fk1" FOREIGN KEY ("subjectId") REFERENCES "subjects"("id");



ALTER TABLE "classes_students" ADD CONSTRAINT "classes_students_fk0" FOREIGN KEY ("studentId") REFERENCES "students"("id");
ALTER TABLE "classes_students" ADD CONSTRAINT "classes_students_fk1" FOREIGN KEY ("classId") REFERENCES "classes"("id");

ALTER TABLE "draft_questions" ADD CONSTRAINT "draft_questions_fk0" FOREIGN KEY ("subjectId") REFERENCES "subjects"("id");

ALTER TABLE "draft_quizzes" ADD CONSTRAINT "draft_quizzes_fk0" FOREIGN KEY ("subject") REFERENCES "subjects"("id");
ALTER TABLE "draft_quizzes" ADD CONSTRAINT "draft_quizzes_fk1" FOREIGN KEY ("classId") REFERENCES "classes"("id");

ALTER TABLE "draft_quizzes_draft_questions" ADD CONSTRAINT "draft_quizzes_draft_questions_fk0" FOREIGN KEY ("draftQuizId") REFERENCES "draft_quizzes"("id");
ALTER TABLE "draft_quizzes_draft_questions" ADD CONSTRAINT "draft_quizzes_draft_questions_fk1" FOREIGN KEY ("draftQuestionId") REFERENCES "draft_questions"("id");

ALTER TABLE "draft_questions_subjects" ADD CONSTRAINT "draft_questions_subjects_fk0" FOREIGN KEY ("draftQuestionId") REFERENCES "draft_questions"("id");
ALTER TABLE "draft_questions_subjects" ADD CONSTRAINT "draft_questions_subjects_fk1" FOREIGN KEY ("subjectId") REFERENCES "subjects"("id");

ALTER TABLE "submitted_quizzes" ADD CONSTRAINT "submitted_quizzes_fk0" FOREIGN KEY ("subject") REFERENCES "subjects"("id");
ALTER TABLE "submitted_quizzes" ADD CONSTRAINT "submitted_quizzes_fk1" FOREIGN KEY ("classId") REFERENCES "classes"("id");
ALTER TABLE "submitted_quizzes" ADD CONSTRAINT "submitted_quizzes_fk2" FOREIGN KEY ("previousId") REFERENCES "draft_quizzes"("id");

ALTER TABLE "submitted_questions" ADD CONSTRAINT "submitted_questions_fk0" FOREIGN KEY ("subjectId") REFERENCES "subjects"("id");
ALTER TABLE "submitted_questions" ADD CONSTRAINT "submitted_questions_fk1" FOREIGN KEY ("previousId") REFERENCES "draft_questions"("id");

ALTER TABLE "submitted_quizzes_submitted_questions" ADD CONSTRAINT "submitted_quizzes_submitted_questions_fk0" FOREIGN KEY ("submittedQuizId") REFERENCES "submitted_quizzes"("id");
ALTER TABLE "submitted_quizzes_submitted_questions" ADD CONSTRAINT "submitted_quizzes_submitted_questions_fk1" FOREIGN KEY ("submittedQuestionId") REFERENCES "submitted_questions"("id");

ALTER TABLE "students_responses" ADD CONSTRAINT "students_responses_fk0" FOREIGN KEY ("studentId") REFERENCES "students"("id");
ALTER TABLE "students_responses" ADD CONSTRAINT "students_responses_fk1" FOREIGN KEY ("responseId") REFERENCES "submitted_quizzes_submitted_questions"("id");
`