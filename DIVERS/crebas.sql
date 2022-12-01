/*==============================================================*/
/* Nom de SGBD :  PostgreSQL 9.x                                */
/* Date de cr�ation :  24/11/2022 16:45:26                      */
/*==============================================================*/


drop index IF EXISTS AVOIR_FK;

drop index IF EXISTS ETABLIR_FK;

drop index IF EXISTS CONTRAT_PK;

drop table IF EXISTS CONTRAT;

drop index IF EXISTS ENTREPRISE_PK;

drop table IF EXISTS ENTREPRISE;

drop index IF EXISTS ACCEDER_FK;

drop index IF EXISTS LOGIN_PK;

drop table IF EXISTS LOGIN;

drop index IF EXISTS SALARIE_PK;

drop table IF EXISTS SALARIE;

drop index IF EXISTS UTILISATEUR_PK;

drop table IF EXISTS UTILISATEUR;

/*==============================================================*/
/* Table : CONTRAT                                              */
/*==============================================================*/
create table CONTRAT (
   ID_CONTRAT           INT4                 not null,
   I                    INT4                 not null,
   SAL_I                INT4                 not null,
   TYPE                 VARCHAR(50)          not null,
   IS_TPSPLEIN          BOOL                 not null,
   DATE_DEBUT           DATE                 not null,
   DATE_FIN             DATE                 null,
   PERIODE_FIN_ESSAI    DATE                 not null,
   REMUNERATION         MONEY                not null,
   MOTIF                VARCHAR(100)         null,
   FONCTION             VARCHAR(100)         not null,
   STATUT               VARCHAR(50)          not null,
   constraint PK_CONTRAT primary key (ID_CONTRAT)
);

/*==============================================================*/
/* Index : CONTRAT_PK                                           */
/*==============================================================*/
create unique index CONTRAT_PK on CONTRAT (
ID_CONTRAT
);

/*==============================================================*/
/* Index : ETABLIR_FK                                           */
/*==============================================================*/
create  index ETABLIR_FK on CONTRAT (
I
);

/*==============================================================*/
/* Index : AVOIR_FK                                             */
/*==============================================================*/
create  index AVOIR_FK on CONTRAT (
SAL_I
);

/*==============================================================*/
/* Table : ENTREPRISE                                           */
/*==============================================================*/
create table ENTREPRISE (
   I                    INT4                 not null,
   NOM                  VARCHAR(50)          not null,
   PRENOM               VARCHAR(50)          not null,
   TELEPHONE            NUMERIC(13)          not null,
   RUE                  VARCHAR(100)         not null,
   CP                   NUMERIC(5)           not null,
   VILLE                VARCHAR(50)          not null,
   SIRET                NUMERIC(14)          not null,
   RAISON_SOCIALE       VARCHAR(200)         not null,
   CODE_APE             VARCHAR(5)           not null,
   constraint PK_ENTREPRISE primary key (I)
);

/*==============================================================*/
/* Index : ENTREPRISE_PK                                        */
/*==============================================================*/
create unique index ENTREPRISE_PK on ENTREPRISE (
I
);

/*==============================================================*/
/* Table : LOGIN                                                */
/*==============================================================*/
create table LOGIN (
   ID_LOGIN             INT4                 not null,
   I                    INT4                 not null,
   EMAIL                VARCHAR(100)         not null,
   MDP                  VARCHAR(100)         not null,
   ROLE                 VARCHAR(50)          not null,
   DATE_CONNEXION       DATE                 not null,
   DATE_DECONNEXION     DATE                 null,
   constraint PK_LOGIN primary key (ID_LOGIN)
);

/*==============================================================*/
/* Index : LOGIN_PK                                             */
/*==============================================================*/
create unique index LOGIN_PK on LOGIN (
ID_LOGIN
);

/*==============================================================*/
/* Index : ACCEDER_FK                                           */
/*==============================================================*/
create  index ACCEDER_FK on LOGIN (
I
);

/*==============================================================*/
/* Table : SALARIE                                              */
/*==============================================================*/
create table SALARIE (
   I                    INT4                 not null,
   NOM                  VARCHAR(50)          not null,
   PRENOM               VARCHAR(50)          not null,
   TELEPHONE            NUMERIC(13)          not null,
   RUE                  VARCHAR(100)         not null,
   CP                   NUMERIC(5)           not null,
   VILLE                VARCHAR(50)          not null,
   NUM_SS               VARCHAR(13)          not null,
   DATE_NAISSANCE       DATE                 not null,
   LIEU_NAISSANCE       VARCHAR(100)         not null,
   NOM_JEUNE_FILLE      VARCHAR(100)         null,
   constraint PK_SALARIE primary key (I)
);

/*==============================================================*/
/* Index : SALARIE_PK                                           */
/*==============================================================*/
create unique index SALARIE_PK on SALARIE (
I
);

/*==============================================================*/
/* Table : UTILISATEUR                                          */
/*==============================================================*/
create table UTILISATEUR (
   I                    INT4                 not null,
   NOM                  VARCHAR(50)          not null,
   PRENOM               VARCHAR(50)          not null,
   TELEPHONE            NUMERIC(13)          not null,
   RUE                  VARCHAR(100)         not null,
   CP                   NUMERIC(5)           not null,
   VILLE                VARCHAR(50)          not null,
   constraint PK_UTILISATEUR primary key (I)
);

/*==============================================================*/
/* Index : UTILISATEUR_PK                                       */
/*==============================================================*/
create unique index UTILISATEUR_PK on UTILISATEUR (
I
);

alter table CONTRAT
   add constraint FK_CONTRAT_AVOIR_SALARIE foreign key (SAL_I)
      references SALARIE (I)
      on delete restrict on update restrict;

alter table CONTRAT
   add constraint FK_CONTRAT_ETABLIR_ENTREPRI foreign key (I)
      references ENTREPRISE (I)
      on delete restrict on update restrict;

alter table ENTREPRISE
   add constraint FK_ENTREPRI_HERITAGE__UTILISAT foreign key (I)
      references UTILISATEUR (I)
      on delete restrict on update restrict;

alter table LOGIN
   add constraint FK_LOGIN_ACCEDER_UTILISAT foreign key (I)
      references UTILISATEUR (I)
      on delete restrict on update restrict;

alter table SALARIE
   add constraint FK_SALARIE_HERITAGE__UTILISAT foreign key (I)
      references UTILISATEUR (I)
      on delete restrict on update restrict;

