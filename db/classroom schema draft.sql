CREATE TABLE "teachers" (
	"id" serial NOT NULL,
	"firstName" varchar(50) NOT NULL,
	"lastName" varchar(50) NOT NULL,
	"email" varchar(100) NOT NULL,
	CONSTRAINT teachers_pk PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "classes" (
	"id" serial NOT NULL,
	"name" varchar(50) NOT NULL,
	"teacherId" integer NOT NULL,
	"subjectId" integer NOT NULL,
	CONSTRAINT classes_pk PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "subjects" (
	"id" serial NOT NULL,
	"name" varchar(50) NOT NULL UNIQUE,
	CONSTRAINT subjects_pk PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "students" (
	"id" serial NOT NULL,
	"firstName" varchar(50) NOT NULL,
	"lastName" varchar(50) NOT NULL,
	"email" varchar(100) NOT NULL,
	CONSTRAINT students_pk PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "classes_students" (
	"id" serial NOT NULL,
	"studentId" serial NOT NULL,
	"classId" serial NOT NULL,
	CONSTRAINT classes_students_pk PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "draftQuestions" (
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
	CONSTRAINT draftQuestions_pk PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "draftQuizzes" (
	"id" serial NOT NULL,
	"name" varchar(200) NOT NULL,
	"subject" integer NOT NULL,
	"classId" integer NOT NULL,
	CONSTRAINT draftQuizzes_pk PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "draftQuizzes_draftQuestions" (
	"id" serial NOT NULL,
	"draftQuizId" serial NOT NULL,
	"draftQuestionId" serial NOT NULL,
	"position" integer NOT NULL,
	CONSTRAINT draftQuizzes_draftQuestions_pk PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "draftQuestions_subjects" (
	"id" serial NOT NULL,
	"draftQuestionId" integer NOT NULL,
	"subjectId" integer NOT NULL,
	CONSTRAINT draftQuestions_subjects_pk PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "submittedQuizzes" (
	"id" serial NOT NULL,
	"name" varchar(2000) NOT NULL,
	"subject" integer NOT NULL,
	"classId" integer NOT NULL,
	"previousId" integer NOT NULL,
	CONSTRAINT submittedQuizzes_pk PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "submittedQuestions" (
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
	CONSTRAINT submittedQuestions_pk PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "submittedQuizzes_submittedQuestions" (
	"id" serial NOT NULL,
	"submittedQuizId" serial NOT NULL,
	"submittedQuestionId" serial NOT NULL,
	CONSTRAINT submittedQuizzes_submittedQuestions_pk PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "students_responses" (
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

ALTER TABLE "draftQuestions" ADD CONSTRAINT "draftQuestions_fk0" FOREIGN KEY ("subjectId") REFERENCES "subjects"("id");

ALTER TABLE "draftQuizzes" ADD CONSTRAINT "draftQuizzes_fk0" FOREIGN KEY ("subject") REFERENCES "subjects"("id");
ALTER TABLE "draftQuizzes" ADD CONSTRAINT "draftQuizzes_fk1" FOREIGN KEY ("classId") REFERENCES "classes"("id");

ALTER TABLE "draftQuizzes_draftQuestions" ADD CONSTRAINT "draftQuizzes_draftQuestions_fk0" FOREIGN KEY ("draftQuizId") REFERENCES "draftQuizzes"("id");
ALTER TABLE "draftQuizzes_draftQuestions" ADD CONSTRAINT "draftQuizzes_draftQuestions_fk1" FOREIGN KEY ("draftQuestionId") REFERENCES "draftQuestions"("id");

ALTER TABLE "draftQuestions_subjects" ADD CONSTRAINT "draftQuestions_subjects_fk0" FOREIGN KEY ("draftQuestionId") REFERENCES "draftQuestions"("id");
ALTER TABLE "draftQuestions_subjects" ADD CONSTRAINT "draftQuestions_subjects_fk1" FOREIGN KEY ("subjectId") REFERENCES "subjects"("id");

ALTER TABLE "submittedQuizzes" ADD CONSTRAINT "submittedQuizzes_fk0" FOREIGN KEY ("subject") REFERENCES "subjects"("id");
ALTER TABLE "submittedQuizzes" ADD CONSTRAINT "submittedQuizzes_fk1" FOREIGN KEY ("classId") REFERENCES "classes"("id");
ALTER TABLE "submittedQuizzes" ADD CONSTRAINT "submittedQuizzes_fk2" FOREIGN KEY ("previousId") REFERENCES "draftQuizzes"("id");

ALTER TABLE "submittedQuestions" ADD CONSTRAINT "submittedQuestions_fk0" FOREIGN KEY ("subjectId") REFERENCES "subjects"("id");
ALTER TABLE "submittedQuestions" ADD CONSTRAINT "submittedQuestions_fk1" FOREIGN KEY ("previousId") REFERENCES "draftQuestions"("id");

ALTER TABLE "submittedQuizzes_submittedQuestions" ADD CONSTRAINT "submittedQuizzes_submittedQuestions_fk0" FOREIGN KEY ("submittedQuizId") REFERENCES "submittedQuizzes"("id");
ALTER TABLE "submittedQuizzes_submittedQuestions" ADD CONSTRAINT "submittedQuizzes_submittedQuestions_fk1" FOREIGN KEY ("submittedQuestionId") REFERENCES "submittedQuestions"("id");

ALTER TABLE "students_responses" ADD CONSTRAINT "students_responses_fk0" FOREIGN KEY ("studentId") REFERENCES "students"("id");
ALTER TABLE "students_responses" ADD CONSTRAINT "students_responses_fk1" FOREIGN KEY ("responseId") REFERENCES "submittedQuizzes_submittedQuestions"("id");

