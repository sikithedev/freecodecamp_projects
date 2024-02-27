--
-- PostgreSQL database dump
--

-- Dumped from database version 12.17 (Ubuntu 12.17-1.pgdg22.04+1)
-- Dumped by pg_dump version 12.17 (Ubuntu 12.17-1.pgdg22.04+1)

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

DROP DATABASE number_guess;
--
-- Name: number_guess; Type: DATABASE; Schema: -; Owner: freecodecamp
--

CREATE DATABASE number_guess WITH TEMPLATE = template0 ENCODING = 'UTF8' LC_COLLATE = 'C.UTF-8' LC_CTYPE = 'C.UTF-8';


ALTER DATABASE number_guess OWNER TO freecodecamp;

\connect number_guess

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
-- Name: games; Type: TABLE; Schema: public; Owner: freecodecamp
--

CREATE TABLE public.games (
    game_id integer NOT NULL,
    player_id integer,
    secret_number integer,
    number_of_guesses integer
);


ALTER TABLE public.games OWNER TO freecodecamp;

--
-- Name: games_game_id_seq; Type: SEQUENCE; Schema: public; Owner: freecodecamp
--

CREATE SEQUENCE public.games_game_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.games_game_id_seq OWNER TO freecodecamp;

--
-- Name: games_game_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: freecodecamp
--

ALTER SEQUENCE public.games_game_id_seq OWNED BY public.games.game_id;


--
-- Name: players; Type: TABLE; Schema: public; Owner: freecodecamp
--

CREATE TABLE public.players (
    player_id integer NOT NULL,
    username character varying(22) NOT NULL
);


ALTER TABLE public.players OWNER TO freecodecamp;

--
-- Name: players_player_id_seq; Type: SEQUENCE; Schema: public; Owner: freecodecamp
--

CREATE SEQUENCE public.players_player_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.players_player_id_seq OWNER TO freecodecamp;

--
-- Name: players_player_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: freecodecamp
--

ALTER SEQUENCE public.players_player_id_seq OWNED BY public.players.player_id;


--
-- Name: games game_id; Type: DEFAULT; Schema: public; Owner: freecodecamp
--

ALTER TABLE ONLY public.games ALTER COLUMN game_id SET DEFAULT nextval('public.games_game_id_seq'::regclass);


--
-- Name: players player_id; Type: DEFAULT; Schema: public; Owner: freecodecamp
--

ALTER TABLE ONLY public.players ALTER COLUMN player_id SET DEFAULT nextval('public.players_player_id_seq'::regclass);


--
-- Data for Name: games; Type: TABLE DATA; Schema: public; Owner: freecodecamp
--

INSERT INTO public.games VALUES (13, 20, 803, 1);
INSERT INTO public.games VALUES (14, 21, 914, 915);
INSERT INTO public.games VALUES (15, 21, 276, 277);
INSERT INTO public.games VALUES (16, 22, 373, 374);
INSERT INTO public.games VALUES (17, 22, 636, 637);
INSERT INTO public.games VALUES (18, 21, 574, 577);
INSERT INTO public.games VALUES (19, 21, 268, 270);
INSERT INTO public.games VALUES (20, 21, 116, 117);
INSERT INTO public.games VALUES (21, 23, 575, 576);
INSERT INTO public.games VALUES (22, 23, 318, 319);
INSERT INTO public.games VALUES (23, 24, 27, 28);
INSERT INTO public.games VALUES (24, 24, 150, 151);
INSERT INTO public.games VALUES (25, 23, 45, 48);
INSERT INTO public.games VALUES (26, 23, 600, 602);
INSERT INTO public.games VALUES (27, 23, 649, 650);
INSERT INTO public.games VALUES (28, 25, 387, 388);
INSERT INTO public.games VALUES (29, 25, 999, 1000);
INSERT INTO public.games VALUES (30, 26, 511, 512);
INSERT INTO public.games VALUES (31, 26, 322, 323);
INSERT INTO public.games VALUES (32, 25, 420, 423);
INSERT INTO public.games VALUES (33, 25, 859, 861);
INSERT INTO public.games VALUES (34, 25, 943, 944);
INSERT INTO public.games VALUES (35, 27, 482, 483);
INSERT INTO public.games VALUES (36, 27, 226, 227);
INSERT INTO public.games VALUES (37, 28, 844, 845);
INSERT INTO public.games VALUES (38, 28, 458, 459);
INSERT INTO public.games VALUES (39, 27, 566, 569);
INSERT INTO public.games VALUES (40, 27, 344, 346);
INSERT INTO public.games VALUES (41, 27, 741, 742);


--
-- Data for Name: players; Type: TABLE DATA; Schema: public; Owner: freecodecamp
--

INSERT INTO public.players VALUES (20, 'Fabio');
INSERT INTO public.players VALUES (21, 'user_1709046879907');
INSERT INTO public.players VALUES (22, 'user_1709046879906');
INSERT INTO public.players VALUES (23, 'user_1709046935728');
INSERT INTO public.players VALUES (24, 'user_1709046935727');
INSERT INTO public.players VALUES (25, 'user_1709046995845');
INSERT INTO public.players VALUES (26, 'user_1709046995844');
INSERT INTO public.players VALUES (27, 'user_1709047068946');
INSERT INTO public.players VALUES (28, 'user_1709047068945');


--
-- Name: games_game_id_seq; Type: SEQUENCE SET; Schema: public; Owner: freecodecamp
--

SELECT pg_catalog.setval('public.games_game_id_seq', 41, true);


--
-- Name: players_player_id_seq; Type: SEQUENCE SET; Schema: public; Owner: freecodecamp
--

SELECT pg_catalog.setval('public.players_player_id_seq', 28, true);


--
-- Name: games games_pkey; Type: CONSTRAINT; Schema: public; Owner: freecodecamp
--

ALTER TABLE ONLY public.games
    ADD CONSTRAINT games_pkey PRIMARY KEY (game_id);


--
-- Name: players players_pkey; Type: CONSTRAINT; Schema: public; Owner: freecodecamp
--

ALTER TABLE ONLY public.players
    ADD CONSTRAINT players_pkey PRIMARY KEY (player_id);


--
-- Name: games games_player_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: freecodecamp
--

ALTER TABLE ONLY public.games
    ADD CONSTRAINT games_player_id_fkey FOREIGN KEY (player_id) REFERENCES public.players(player_id);


--
-- PostgreSQL database dump complete
--

