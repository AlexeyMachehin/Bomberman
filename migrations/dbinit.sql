--
-- PostgreSQL database dump
--

-- Dumped from database version 14.7 (Debian 14.7-1.pgdg110+1)
-- Dumped by pg_dump version 14.3

-- Started on 2023-03-14 01:27:57 +05

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- TOC entry 209 (class 1259 OID 16385)
-- Name: message; Type: TABLE; Schema: public; Owner: bombersqlu
--

CREATE TABLE public.message (
    id integer NOT NULL,
    user_id integer NOT NULL,
    message character varying(10000),
    "time" character varying(255),
    reactions character varying(255)[],
    answered_id integer,
    question_id integer NOT NULL
);


ALTER TABLE public.message OWNER TO bombersqlu;

--
-- TOC entry 210 (class 1259 OID 16390)
-- Name: message_id_seq; Type: SEQUENCE; Schema: public; Owner: bombersqlu
--

CREATE SEQUENCE public.message_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.message_id_seq OWNER TO bombersqlu;

--
-- TOC entry 3376 (class 0 OID 0)
-- Dependencies: 210
-- Name: message_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: bombersqlu
--

ALTER SEQUENCE public.message_id_seq OWNED BY public.message.id;


--
-- TOC entry 211 (class 1259 OID 16391)
-- Name: question; Type: TABLE; Schema: public; Owner: bombersqlu
--

CREATE TABLE public.question (
    id integer NOT NULL,
    title character varying(255) NOT NULL,
    user_id integer NOT NULL,
    content character varying(1024),
    "time" character varying(255),
    section_id integer NOT NULL
);


ALTER TABLE public.question OWNER TO bombersqlu;

--
-- TOC entry 212 (class 1259 OID 16396)
-- Name: question_id_seq; Type: SEQUENCE; Schema: public; Owner: bombersqlu
--

CREATE SEQUENCE public.question_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.question_id_seq OWNER TO bombersqlu;

--
-- TOC entry 3377 (class 0 OID 0)
-- Dependencies: 212
-- Name: question_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: bombersqlu
--

ALTER SEQUENCE public.question_id_seq OWNED BY public.question.id;


--
-- TOC entry 213 (class 1259 OID 16397)
-- Name: section; Type: TABLE; Schema: public; Owner: bombersqlu
--

CREATE TABLE public.section (
    id integer NOT NULL,
    title character varying(255) NOT NULL
);


ALTER TABLE public.section OWNER TO bombersqlu;

--
-- TOC entry 214 (class 1259 OID 16400)
-- Name: section_id_seq; Type: SEQUENCE; Schema: public; Owner: bombersqlu
--

CREATE SEQUENCE public.section_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.section_id_seq OWNER TO bombersqlu;

--
-- TOC entry 3378 (class 0 OID 0)
-- Dependencies: 214
-- Name: section_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: bombersqlu
--

ALTER SEQUENCE public.section_id_seq OWNED BY public.section.id;


--
-- TOC entry 215 (class 1259 OID 16401)
-- Name: site_theme; Type: TABLE; Schema: public; Owner: bombersqlu
--

CREATE TABLE public.site_theme (
    id integer NOT NULL,
    title character varying(255) NOT NULL,
    description character varying(255)
);


ALTER TABLE public.site_theme OWNER TO bombersqlu;

--
-- TOC entry 216 (class 1259 OID 16406)
-- Name: site_theme_id_seq; Type: SEQUENCE; Schema: public; Owner: bombersqlu
--

CREATE SEQUENCE public.site_theme_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.site_theme_id_seq OWNER TO bombersqlu;

--
-- TOC entry 3379 (class 0 OID 0)
-- Dependencies: 216
-- Name: site_theme_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: bombersqlu
--

ALTER SEQUENCE public.site_theme_id_seq OWNED BY public.site_theme.id;


--
-- TOC entry 217 (class 1259 OID 16407)
-- Name: user; Type: TABLE; Schema: public; Owner: bombersqlu
--

CREATE TABLE public."user" (
    id integer NOT NULL,
    avatarurl character varying(255),
    name character varying(255) NOT NULL
);


ALTER TABLE public."user" OWNER TO bombersqlu;

--
-- TOC entry 218 (class 1259 OID 16412)
-- Name: user_id_seq; Type: SEQUENCE; Schema: public; Owner: bombersqlu
--

CREATE SEQUENCE public.user_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.user_id_seq OWNER TO bombersqlu;

--
-- TOC entry 3380 (class 0 OID 0)
-- Dependencies: 218
-- Name: user_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: bombersqlu
--

ALTER SEQUENCE public.user_id_seq OWNED BY public."user".id;


--
-- TOC entry 219 (class 1259 OID 16413)
-- Name: user_theme; Type: TABLE; Schema: public; Owner: bombersqlu
--

CREATE TABLE public.user_theme (
    id integer NOT NULL,
    "themeId" integer NOT NULL,
    device character varying(255),
    owner_id integer NOT NULL
);


ALTER TABLE public.user_theme OWNER TO bombersqlu;

--
-- TOC entry 220 (class 1259 OID 16416)
-- Name: user_theme_id_seq; Type: SEQUENCE; Schema: public; Owner: bombersqlu
--

CREATE SEQUENCE public.user_theme_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.user_theme_id_seq OWNER TO bombersqlu;

--
-- TOC entry 3381 (class 0 OID 0)
-- Dependencies: 220
-- Name: user_theme_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: bombersqlu
--

ALTER SEQUENCE public.user_theme_id_seq OWNED BY public.user_theme.id;


--
-- TOC entry 3192 (class 2604 OID 16417)
-- Name: message id; Type: DEFAULT; Schema: public; Owner: bombersqlu
--

ALTER TABLE ONLY public.message ALTER COLUMN id SET DEFAULT nextval('public.message_id_seq'::regclass);


--
-- TOC entry 3193 (class 2604 OID 16418)
-- Name: question id; Type: DEFAULT; Schema: public; Owner: bombersqlu
--

ALTER TABLE ONLY public.question ALTER COLUMN id SET DEFAULT nextval('public.question_id_seq'::regclass);


--
-- TOC entry 3194 (class 2604 OID 16419)
-- Name: section id; Type: DEFAULT; Schema: public; Owner: bombersqlu
--

ALTER TABLE ONLY public.section ALTER COLUMN id SET DEFAULT nextval('public.section_id_seq'::regclass);


--
-- TOC entry 3195 (class 2604 OID 16420)
-- Name: site_theme id; Type: DEFAULT; Schema: public; Owner: bombersqlu
--

ALTER TABLE ONLY public.site_theme ALTER COLUMN id SET DEFAULT nextval('public.site_theme_id_seq'::regclass);


--
-- TOC entry 3196 (class 2604 OID 16421)
-- Name: user id; Type: DEFAULT; Schema: public; Owner: bombersqlu
--

ALTER TABLE ONLY public."user" ALTER COLUMN id SET DEFAULT nextval('public.user_id_seq'::regclass);


--
-- TOC entry 3197 (class 2604 OID 16422)
-- Name: user_theme id; Type: DEFAULT; Schema: public; Owner: bombersqlu
--

ALTER TABLE ONLY public.user_theme ALTER COLUMN id SET DEFAULT nextval('public.user_theme_id_seq'::regclass);


--
-- TOC entry 3359 (class 0 OID 16385)
-- Dependencies: 209
-- Data for Name: message; Type: TABLE DATA; Schema: public; Owner: bombersqlu
--

COPY public.message (id, user_id, message, "time", reactions, answered_id, question_id) FROM stdin;
10	620243	aggsd	Sun Mar 12 2023	\N	\N	7
11	620243	asfff	Sun Mar 12 2023	{1f603}	\N	7
36	620243	dddd	Sun Mar 12 2023 14:55:39 GMT+0500 (Екатеринбург, стандартное время)	{1f607,1f602,1f4a9}	34	7
31	620243	bla	Sun Mar 12 2023	{1f60d,1f602}	\N	7
6	620243	ssd	Sun Mar 12 2023	{1f619}	\N	7
9	620243	fff	Sun Mar 12 2023	{1f602,1f600}	\N	7
32	620243	ssss	Sun Mar 12 2023 14:54:38 GMT+0500 (Екатеринбург, стандартное время)	{1f602}	\N	7
33	620243	fff	Sun Mar 12 2023 14:54:40 GMT+0500 (Екатеринбург, стандартное время)	{1f917,1f600,1f4a5,1f602}	\N	7
15	620243	aaa	Sun Mar 12 2023	{1f600}	\N	3
34	620243	gggg	Sun Mar 12 2023 14:54:42 GMT+0500 (Екатеринбург, стандартное время)	{1f929,1f618,1f607,1f607,1f607,1f605}	\N	7
37	620243	ssssss	Sun Mar 12 2023 14:55:44 GMT+0500 (Екатеринбург, стандартное время)	{1f642,1f617,1f605,1f605,1f605}	\N	7
39	620243	asda	Sun Mar 12 2023 14:57:48 GMT+0500 (Екатеринбург, стандартное время)	\N	\N	1
7	620243	fsdfsd	Sun Mar 12 2023	{1f92a,1f600,1f602,1f929}	\N	7
13	620243	test	Sun Mar 12 2023	{1f643,1f60b,1f628}	12	7
41	620243	asdasd	Sun Mar 12 2023 14:57:55 GMT+0500 (Екатеринбург, стандартное время)	\N	\N	1
35	620243	hhhh	Sun Mar 12 2023 14:54:44 GMT+0500 (Екатеринбург, стандартное время)	{1f970,1f617,1f607,1f605}	\N	7
14	620243	qqq	Sun Mar 12 2023	{1f607,1f602,1f602,1f602}	13	7
42	620243	gggg	Sun Mar 12 2023 14:58:07 GMT+0500 (Екатеринбург, стандартное время)	{1f605}	40	1
8	620243	adsas	Sun Mar 12 2023	{1f602,1f602,1f602,1f607}	\N	7
18	620243	aaa	Sun Mar 12 2023	\N	\N	7
19	620243	sddd	Sun Mar 12 2023	\N	\N	7
12	620243	ssss	Sun Mar 12 2023	{1f603,1f929,1f607}	\N	7
20	620243	ass	Sun Mar 12 2023	\N	\N	7
21	620243	fdff	Sun Mar 12 2023	\N	\N	7
22	620243	sss	Sun Mar 12 2023	\N	21	7
23	620243	first message	Sun Mar 12 2023	\N	21	7
24	620243	sddd	Sun Mar 12 2023	\N	21	7
25	620243	ddd	Sun Mar 12 2023	\N	\N	7
26	620243	first message	Sun Mar 12 2023	\N	\N	7
27	620243	answer on first message	Sun Mar 12 2023	\N	26	7
30	620243	answer on second message	Sun Mar 12 2023	{1f929}	29	7
43	620243	aaa	Sun Mar 12 2023 18:03:28 GMT+0500 (Екатеринбург, стандартное время)	\N	\N	4
17	620243	asd	Sun Mar 12 2023	{1f970,2764-fe0f-200d-1f525}	\N	3
28	620243	bla	Sun Mar 12 2023	{1fae1}	26	7
16	620243		Sun Mar 12 2023	{1fae3}	\N	3
29	620243	second message	Sun Mar 12 2023	{1f600,1f600,1f602}	\N	7
44	620243	bbbb	Sun Mar 12 2023 18:03:32 GMT+0500 (Екатеринбург, стандартное время)	\N	\N	4
46	620243	ddd	Sun Mar 12 2023 18:03:40 GMT+0500 (Екатеринбург, стандартное время)	\N	\N	4
38	620243	ssasfsdfadsgfdg	Sun Mar 12 2023 14:55:47 GMT+0500 (Екатеринбург, стандартное время)	\N	\N	7
45	620243	ccc	Sun Mar 12 2023 18:03:37 GMT+0500 (Екатеринбург, стандартное время)	{1f600,1f970}	44	4
40	620243	dddd	Sun Mar 12 2023 14:57:53 GMT+0500 (Екатеринбург, стандартное время)	{1f600,1f602,1f602}	39	1
\.


--
-- TOC entry 3361 (class 0 OID 16391)
-- Dependencies: 211
-- Data for Name: question; Type: TABLE DATA; Schema: public; Owner: bombersqlu
--

COPY public.question (id, title, user_id, content, "time", section_id) FROM stdin;
11	bError500Error500Error500Error500	620243	this is message content	2020-01-02T14:22:22.000Z	3
12	bError500Error500Error500Error500	620243	this is message content	2020-01-02T14:22:22.000Z	3
3	asd	620243	axxx	Sat Mar 11 2023	1
4	qqw	620243	aaaa	Sat Mar 11 2023	1
7	Discussion Of Game Moment 1M	620243	this is message content	2020-01-02T14:22:22.000Z	1
8	Discussion Of Game Moment 2F	620243	this is message content	2020-01-02T14:22:22.000Z	1
9	Technical Issue 1	620243	this is message content	2020-01-02T14:22:22.000Z	2
10	Technical Issue 2	620243	this is message content	2020-01-02T14:22:22.000Z	2
1	new title	620243	xxxx	Sun Mar 12 2023	1
\.


--
-- TOC entry 3363 (class 0 OID 16397)
-- Dependencies: 213
-- Data for Name: section; Type: TABLE DATA; Schema: public; Owner: bombersqlu
--

COPY public.section (id, title) FROM stdin;
1	Discussion Of Game Moments
2	Technical Issues
3	Error Questions
\.


--
-- TOC entry 3365 (class 0 OID 16401)
-- Dependencies: 215
-- Data for Name: site_theme; Type: TABLE DATA; Schema: public; Owner: bombersqlu
--

COPY public.site_theme (id, title, description) FROM stdin;
1	dark	\N
4	light	\N
\.


--
-- TOC entry 3367 (class 0 OID 16407)
-- Dependencies: 217
-- Data for Name: user; Type: TABLE DATA; Schema: public; Owner: bombersqlu
--

COPY public."user" (id, avatarurl, name) FROM stdin;
620243	https://pixelbox.ru/wp-content/uploads/2020/12/ava-vk-cats-76.jpg	Danil
312355	\N	Leha12345678
\.


--
-- TOC entry 3369 (class 0 OID 16413)
-- Dependencies: 219
-- Data for Name: user_theme; Type: TABLE DATA; Schema: public; Owner: bombersqlu
--

COPY public.user_theme (id, "themeId", device, owner_id) FROM stdin;
1	4	\N	620243
\.


--
-- TOC entry 3382 (class 0 OID 0)
-- Dependencies: 210
-- Name: message_id_seq; Type: SEQUENCE SET; Schema: public; Owner: bombersqlu
--

SELECT pg_catalog.setval('public.message_id_seq', 46, true);


--
-- TOC entry 3383 (class 0 OID 0)
-- Dependencies: 212
-- Name: question_id_seq; Type: SEQUENCE SET; Schema: public; Owner: bombersqlu
--

SELECT pg_catalog.setval('public.question_id_seq', 1, true);


--
-- TOC entry 3384 (class 0 OID 0)
-- Dependencies: 214
-- Name: section_id_seq; Type: SEQUENCE SET; Schema: public; Owner: bombersqlu
--

SELECT pg_catalog.setval('public.section_id_seq', 1, true);


--
-- TOC entry 3385 (class 0 OID 0)
-- Dependencies: 216
-- Name: site_theme_id_seq; Type: SEQUENCE SET; Schema: public; Owner: bombersqlu
--

SELECT pg_catalog.setval('public.site_theme_id_seq', 4, true);


--
-- TOC entry 3386 (class 0 OID 0)
-- Dependencies: 218
-- Name: user_id_seq; Type: SEQUENCE SET; Schema: public; Owner: bombersqlu
--

SELECT pg_catalog.setval('public.user_id_seq', 1, false);


--
-- TOC entry 3387 (class 0 OID 0)
-- Dependencies: 220
-- Name: user_theme_id_seq; Type: SEQUENCE SET; Schema: public; Owner: bombersqlu
--

SELECT pg_catalog.setval('public.user_theme_id_seq', 1, true);


--
-- TOC entry 3200 (class 2606 OID 16424)
-- Name: message message_pkey; Type: CONSTRAINT; Schema: public; Owner: bombersqlu
--

ALTER TABLE ONLY public.message
    ADD CONSTRAINT message_pkey PRIMARY KEY (id);


--
-- TOC entry 3202 (class 2606 OID 16426)
-- Name: question question_pkey; Type: CONSTRAINT; Schema: public; Owner: bombersqlu
--

ALTER TABLE ONLY public.question
    ADD CONSTRAINT question_pkey PRIMARY KEY (id);


--
-- TOC entry 3205 (class 2606 OID 16428)
-- Name: section section_pkey; Type: CONSTRAINT; Schema: public; Owner: bombersqlu
--

ALTER TABLE ONLY public.section
    ADD CONSTRAINT section_pkey PRIMARY KEY (id);


--
-- TOC entry 3208 (class 2606 OID 16430)
-- Name: site_theme site_theme_pkey; Type: CONSTRAINT; Schema: public; Owner: bombersqlu
--

ALTER TABLE ONLY public.site_theme
    ADD CONSTRAINT site_theme_pkey PRIMARY KEY (id);


--
-- TOC entry 3211 (class 2606 OID 16432)
-- Name: site_theme site_theme_title_key; Type: CONSTRAINT; Schema: public; Owner: bombersqlu
--

ALTER TABLE ONLY public.site_theme
    ADD CONSTRAINT site_theme_title_key UNIQUE (title);


--
-- TOC entry 3213 (class 2606 OID 16434)
-- Name: user user_pkey; Type: CONSTRAINT; Schema: public; Owner: bombersqlu
--

ALTER TABLE ONLY public."user"
    ADD CONSTRAINT user_pkey PRIMARY KEY (id);


--
-- TOC entry 3215 (class 2606 OID 16436)
-- Name: user_theme user_theme_pkey; Type: CONSTRAINT; Schema: public; Owner: bombersqlu
--

ALTER TABLE ONLY public.user_theme
    ADD CONSTRAINT user_theme_pkey PRIMARY KEY (id);


--
-- TOC entry 3198 (class 1259 OID 16437)
-- Name: message_message; Type: INDEX; Schema: public; Owner: bombersqlu
--

CREATE INDEX message_message ON public.message USING btree (message);


--
-- TOC entry 3203 (class 1259 OID 16438)
-- Name: question_title; Type: INDEX; Schema: public; Owner: bombersqlu
--

CREATE INDEX question_title ON public.question USING btree (title);


--
-- TOC entry 3206 (class 1259 OID 16439)
-- Name: section_title; Type: INDEX; Schema: public; Owner: bombersqlu
--

CREATE INDEX section_title ON public.section USING btree (title);


--
-- TOC entry 3209 (class 1259 OID 16440)
-- Name: site_theme_title; Type: INDEX; Schema: public; Owner: bombersqlu
--

CREATE INDEX site_theme_title ON public.site_theme USING btree (title);


--
-- TOC entry 3216 (class 2606 OID 16441)
-- Name: message message_question_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: bombersqlu
--

ALTER TABLE ONLY public.message
    ADD CONSTRAINT message_question_id_fkey FOREIGN KEY (question_id) REFERENCES public.question(id) ON UPDATE CASCADE;


--
-- TOC entry 3217 (class 2606 OID 16446)
-- Name: message message_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: bombersqlu
--

ALTER TABLE ONLY public.message
    ADD CONSTRAINT message_user_id_fkey FOREIGN KEY (user_id) REFERENCES public."user"(id) ON UPDATE CASCADE;


--
-- TOC entry 3218 (class 2606 OID 16451)
-- Name: question question_section_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: bombersqlu
--

ALTER TABLE ONLY public.question
    ADD CONSTRAINT question_section_id_fkey FOREIGN KEY (section_id) REFERENCES public.section(id) ON UPDATE CASCADE;


--
-- TOC entry 3219 (class 2606 OID 16456)
-- Name: question question_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: bombersqlu
--

ALTER TABLE ONLY public.question
    ADD CONSTRAINT question_user_id_fkey FOREIGN KEY (user_id) REFERENCES public."user"(id) ON UPDATE CASCADE;


-- Completed on 2023-03-14 01:27:57 +05

--
-- PostgreSQL database dump complete
--

