--
-- PostgreSQL database dump
--

\restrict OWCGJCsrGqkQExgaqRmZDfg2T1lUWcEp4bd9XQK6ghgVKZSLxmaEESkNAVy072X

-- Dumped from database version 18.1
-- Dumped by pg_dump version 18.1

--SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
--SET transaction_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- Name: addtocart(integer, integer, numeric); Type: FUNCTION; Schema: public; Owner: postgres
--

CREATE FUNCTION public.addtocart(c_id integer, prod_id integer, quantity numeric) RETURNS integer
    LANGUAGE plpgsql
    AS $$
DECLARE
new_id INT;
BEGIN
    INSERT INTO cart (cust_id, p_id, quantity)
    VALUES (c_id, prod_id, quantity)
    ON CONFLICT (cust_id, p_id)
    DO UPDATE
    SET quantity = cart.quantity + EXCLUDED.quantity
    RETURNING cust_id INTO new_id;

    RETURN new_id;
END;
$$;


ALTER FUNCTION public.addtocart(c_id integer, prod_id integer, quantity numeric) OWNER TO postgres;

--
-- Name: cartitem(integer); Type: FUNCTION; Schema: public; Owner: postgres
--

CREATE FUNCTION public.cartitem(identifier integer) RETURNS TABLE(prod_id integer, prod_title text, prod_price numeric, prod_img text, prod_descrip text, prod_quantity numeric)
    LANGUAGE plpgsql
    AS $$
BEGIN
    RETURN QUERY
    SELECT
        p.id,
        p.title::TEXT,
        p.price,
        p.image,
        p.description,
        c.quantity
    FROM cart c JOIN products p on p.id = c.p_id
    WHERE cust_id = identifier;
END;
$$;


ALTER FUNCTION public.cartitem(identifier integer) OWNER TO postgres;

--
-- Name: create_cust(character varying, numeric, character varying, character varying); Type: FUNCTION; Schema: public; Owner: postgres
--

CREATE FUNCTION public.create_cust(name character varying, phn numeric, email character varying, password character varying) RETURNS integer
    LANGUAGE plpgsql
    AS $$
DECLARE
new_id INT;
BEGIN
    IF LENGTH (password) < 5 THEN 
    RAISE EXCEPTION 'Password must be at least 5 characters';
    END IF;
    INSERT INTO customers  (cust_name,phone, email, password)
    VALUES (name, phn, email, password)
    RETURNING cust_id INTO new_id;

    RETURN new_id;
END;
$$;


ALTER FUNCTION public.create_cust(name character varying, phn numeric, email character varying, password character varying) OWNER TO postgres;

--
-- Name: cust_pass(character varying); Type: FUNCTION; Schema: public; Owner: postgres
--

CREATE FUNCTION public.cust_pass(identifier character varying) RETURNS TABLE(id integer, password character varying)
    LANGUAGE plpgsql
    AS $$
BEGIN
    RETURN QUERY
    SELECT
        c.cust_id,
        c.password
    FROM customers c WHERE c.phone::TEXT = identifier
    OR c.email = identifier ;
END;
$$;


ALTER FUNCTION public.cust_pass(identifier character varying) OWNER TO postgres;

--
-- Name: deletefromcart(integer, integer); Type: FUNCTION; Schema: public; Owner: postgres
--

CREATE FUNCTION public.deletefromcart(c_id integer, prod_id integer) RETURNS integer
    LANGUAGE plpgsql
    AS $$
BEGIN
    DELETE FROM cart
    WHERE cust_id = c_id AND p_id = prod_id;

    IF NOT FOUND THEN
        RAISE EXCEPTION 'Product % not found in cart for customer %', prod_id, c_id;
    END IF;

    RETURN c_id;
END;
$$;


ALTER FUNCTION public.deletefromcart(c_id integer, prod_id integer) OWNER TO postgres;

--
-- Name: get_all_prod(integer); Type: FUNCTION; Schema: public; Owner: postgres
--

CREATE FUNCTION public.get_all_prod(lim integer) RETURNS TABLE(p_id integer, p_name text, price numeric, cat_id integer, img text, descrip text)
    LANGUAGE plpgsql
    AS $$
BEGIN
    RETURN QUERY
    SELECT
        p.id,
        p.title,
        p.price,
        p.cat_id,
        p.image,
        p.description
    FROM products p LIMIT lim;
END;
$$;


ALTER FUNCTION public.get_all_prod(lim integer) OWNER TO postgres;

--
-- Name: get_all_prodfilter(text); Type: FUNCTION; Schema: public; Owner: postgres
--

CREATE FUNCTION public.get_all_prodfilter(identifier text) RETURNS TABLE(p_id integer, p_name text, price numeric, cat_id integer, img text, descrip text)
    LANGUAGE plpgsql
    AS $$
BEGIN
    RETURN QUERY
    SELECT
        p.id,
        p.title::TEXT,
        p.price,
        p.cat_id,
        p.image,
        p.description
    FROM products p JOIN category c on p.cat_id = c.cat_id 
    WHERE p.cat_id :: TEXT = identifier 
    OR c.category = identifier;
END;
$$;


ALTER FUNCTION public.get_all_prodfilter(identifier text) OWNER TO postgres;

--
-- Name: get_orders(integer); Type: FUNCTION; Schema: public; Owner: postgres
--

CREATE FUNCTION public.get_orders(identifier integer) RETURNS TABLE(name character varying, totalamt numeric, orddate timestamp without time zone, id integer, img text, descrip text, prodname text, orderid integer)
    LANGUAGE plpgsql
    AS $$
BEGIN
    RETURN QUERY
    SELECT c.cust_name, 
       o.total_amt, 
       o.date, 
       o.id, 
       p.image, 
       p.description, 
       p.title, 
       oi.id
FROM customers c
LEFT JOIN orders o ON c.cust_id = o.cust_id
LEFT JOIN orditems oi ON oi.ord_id = o.id
LEFT JOIN products p ON p.id = oi.p_id
WHERE c.cust_id = 1;
END;
$$;


ALTER FUNCTION public.get_orders(identifier integer) OWNER TO postgres;

--
-- Name: inserttoken(integer, text); Type: FUNCTION; Schema: public; Owner: postgres
--

CREATE FUNCTION public.inserttoken(t_id integer, t_hash text) RETURNS integer
    LANGUAGE plpgsql
    AS $$
DECLARE
new_id INT;
BEGIN
    INSERT INTO refresh_token  (user_id, tokenhash)
    VALUES (t_id, t_hash)
    RETURNING id INTO new_id;

    RETURN new_id;
END;
$$;


ALTER FUNCTION public.inserttoken(t_id integer, t_hash text) OWNER TO postgres;

--
-- Name: prodbyid(integer); Type: FUNCTION; Schema: public; Owner: postgres
--

CREATE FUNCTION public.prodbyid(identifier integer) RETURNS TABLE(p_id integer, title text, price numeric, cat_id integer, img text, descrip text)
    LANGUAGE plpgsql
    AS $$
BEGIN
    RETURN QUERY
    SELECT
        p.id,
        p.title::TEXT,
        p.price,
        p.cat_id,
        p.image,
        p.description
    FROM products p WHERE p.id = identifier;
END;
$$;


ALTER FUNCTION public.prodbyid(identifier integer) OWNER TO postgres;

--
-- Name: verify_cust(numeric, character varying); Type: FUNCTION; Schema: public; Owner: postgres
--

CREATE FUNCTION public.verify_cust(phn numeric, pass character varying) RETURNS boolean
    LANGUAGE plpgsql
    AS $$

BEGIN
    RETURN EXISTS
    (
        SELECT 1 FROM customers c
        WHERE c.phone = phn AND
        c.password = pass
    );
END;
$$;


ALTER FUNCTION public.verify_cust(phn numeric, pass character varying) OWNER TO postgres;

--
-- Name: verify_existcust(character varying); Type: FUNCTION; Schema: public; Owner: postgres
--

CREATE FUNCTION public.verify_existcust(identifier character varying) RETURNS boolean
    LANGUAGE plpgsql
    AS $$

BEGIN
    RETURN EXISTS
    (
        SELECT 1 FROM customers c
        WHERE c.phone::TEXT = identifier OR
        c.email = identifier
    );
END;
$$;


ALTER FUNCTION public.verify_existcust(identifier character varying) OWNER TO postgres;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: cart; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.cart (
    id integer NOT NULL,
    cust_id integer,
    p_id integer,
    quantity numeric
);


ALTER TABLE public.cart OWNER TO postgres;

--
-- Name: cart_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.cart_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.cart_id_seq OWNER TO postgres;

--
-- Name: cart_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.cart_id_seq OWNED BY public.cart.id;


--
-- Name: category; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.category (
    cat_id integer NOT NULL,
    category character varying(100)
);


ALTER TABLE public.category OWNER TO postgres;

--
-- Name: category_cat_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.category_cat_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.category_cat_id_seq OWNER TO postgres;

--
-- Name: category_cat_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.category_cat_id_seq OWNED BY public.category.cat_id;


--
-- Name: customers; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.customers (
    cust_id integer NOT NULL,
    cust_name character varying(50) NOT NULL,
    phone numeric CONSTRAINT customers_cust_phone_not_null NOT NULL,
    email character varying(100) CONSTRAINT customers_cust_email_not_null NOT NULL,
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    password character varying(100),
    CONSTRAINT password_length_check CHECK ((length((password)::text) >= 5))
);


ALTER TABLE public.customers OWNER TO postgres;

--
-- Name: customers_cust_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.customers_cust_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.customers_cust_id_seq OWNER TO postgres;

--
-- Name: customers_cust_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.customers_cust_id_seq OWNED BY public.customers.cust_id;


--
-- Name: orders; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.orders (
    id integer NOT NULL,
    cust_id integer,
    date timestamp without time zone,
    status text,
    total_amt numeric
);


ALTER TABLE public.orders OWNER TO postgres;

--
-- Name: orders_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.orders_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.orders_id_seq OWNER TO postgres;

--
-- Name: orders_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.orders_id_seq OWNED BY public.orders.id;


--
-- Name: orditems; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.orditems (
    id integer NOT NULL,
    ord_id integer,
    p_id integer,
    quantity numeric,
    price numeric
);


ALTER TABLE public.orditems OWNER TO postgres;

--
-- Name: orditems_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.orditems_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.orditems_id_seq OWNER TO postgres;

--
-- Name: orditems_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.orditems_id_seq OWNED BY public.orditems.id;


--
-- Name: products; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.products (
    id integer NOT NULL,
    title text,
    price numeric,
    description text,
    cat_id integer,
    image text,
    rating integer,
    stock numeric
);


ALTER TABLE public.products OWNER TO postgres;

--
-- Name: products_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.products_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.products_id_seq OWNER TO postgres;

--
-- Name: products_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.products_id_seq OWNED BY public.products.id;


--
-- Name: refresh_token; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.refresh_token (
    id integer NOT NULL,
    user_id integer,
    tokenhash text,
    device character varying(50),
    created_at timestamp without time zone,
    expires_at timestamp without time zone
);


ALTER TABLE public.refresh_token OWNER TO postgres;

--
-- Name: refresh_token_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.refresh_token_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.refresh_token_id_seq OWNER TO postgres;

--
-- Name: refresh_token_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.refresh_token_id_seq OWNED BY public.refresh_token.id;


--
-- Name: cart id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.cart ALTER COLUMN id SET DEFAULT nextval('public.cart_id_seq'::regclass);


--
-- Name: category cat_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.category ALTER COLUMN cat_id SET DEFAULT nextval('public.category_cat_id_seq'::regclass);


--
-- Name: customers cust_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.customers ALTER COLUMN cust_id SET DEFAULT nextval('public.customers_cust_id_seq'::regclass);


--
-- Name: orders id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.orders ALTER COLUMN id SET DEFAULT nextval('public.orders_id_seq'::regclass);


--
-- Name: orditems id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.orditems ALTER COLUMN id SET DEFAULT nextval('public.orditems_id_seq'::regclass);


--
-- Name: products id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.products ALTER COLUMN id SET DEFAULT nextval('public.products_id_seq'::regclass);


--
-- Name: refresh_token id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.refresh_token ALTER COLUMN id SET DEFAULT nextval('public.refresh_token_id_seq'::regclass);


--
-- Data for Name: cart; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.cart (id, cust_id, p_id, quantity) FROM stdin;
6	22	62	4
12	22	64	1
311	27	70	1
313	27	74	1
312	27	69	2
315	27	72	1
316	25	67	1
317	25	63	1
\.


--
-- Data for Name: category; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.category (cat_id, category) FROM stdin;
1	men's clothing
2	jewelery
3	electronics
4	women's clothing
\.


--
-- Data for Name: customers; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.customers (cust_id, cust_name, phone, email, created_at, password) FROM stdin;
1	Raju	9876543210	raju@gmail.com	2026-02-08 00:00:00	\N
2	Sham	9876543211	sham@gmail.com	2026-02-08 00:00:00	\N
3	Paul	9876543212	paul@gmail.com	2026-02-08 00:00:00	asdfgh
4	pranjul	8318561189	pr@gmail.com	\N	qwerty
5	aman	8318561188	am@gmail.com	2026-02-11 00:00:00	qwerty
6	atul	8318561288	ap@gmail.com	2026-02-11 09:54:20.67921	qwerty
7	Prinshu	1234567891	p@gmail.com	2026-02-12 06:38:23.028626	qwsdfg
10	Anurag	2345678191	anu@gmail.com	2026-02-12 07:10:14.618571	qwertyuio
16	pranjul	8318361189	pran@gmail.com	2026-02-14 16:43:44.371426	asdfg
19	ppppp	8218360189	pranjul@gmail.com	2026-02-14 23:50:36.796609	$2b$15$lATP2xHs8WgKrzOpDYcBaeORR6LjQagOTc5wE0GdJjHnXgm4/uBcK
20	ammamama	8185672827	pcdcjul@gmail.com	2026-02-15 10:43:12.725017	$2b$10$SjRZ9lh.asCpaUoKSFwZiOtmiAKFxmJ1RjCuwI0zDKjNPeM2lW/Ne
21	John Doe	1234567890	john@example.com	2026-02-15 10:45:50.060554	$2b$10$q13LqZkNqJn5OnqhhT/di.OJTzxFCf2HTF2U.YcdfVHCjMp4xosjC
22	joey	1234123412	pcd@gmail.com	2026-02-16 08:13:03.193748	$2b$10$W/uypOG.NR2zJ.fBT3bujenDXyXkOiCbmXJR5r7.Kd3G4AOJFd8du
25	Prinshu	8888888888	asda@gamil.com	2026-02-28 22:43:11.834844	$2b$10$5aOoLzXmkFmb1c5tMfRUfurjoVBVeA3.2VnKVexuU9WmdI//36HGW
26	Pranjul Rathour	1111111111	pp@gamil.com	2026-03-02 09:51:39.621527	$2b$10$D5tCAUJ843o5rDbT1UKj5.F6.i8D.gLYdWBa/kBjjxMLpkmKWvrgu
27	Shiv	1212121212	sh@gmail.com	2026-03-03 09:54:41.151951	$2b$10$gI.gRbp/Gla3yjhh/jq4T.ZAPu4/.V23d5yta2aS1QztMbQ7a7udG
\.


--
-- Data for Name: orders; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.orders (id, cust_id, date, status, total_amt) FROM stdin;
\.


--
-- Data for Name: orditems; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.orditems (id, ord_id, p_id, quantity, price) FROM stdin;
\.


--
-- Data for Name: products; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.products (id, title, price, description, cat_id, image, rating, stock) FROM stdin;
61	Fjallraven - Foldsack No. 1 Backpack, Fits 15 Laptops	109.95	Your perfect pack for everyday use and walks in the forest.	1	https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_t.png	\N	\N
62	Mens Casual Premium Slim Fit T-Shirts 	22.3	Slim-fitting style, contrast raglan long sleeve.	1	https://fakestoreapi.com/img/71-3HjGNDUL._AC_SY879._SX._UX._SY._UY_t.png	\N	\N
63	Mens Cotton Jacket	55.99	great outerwear jackets for Spring/Autumn/Winter.	1	https://fakestoreapi.com/img/71li-ujtlUL._AC_UX679_t.png	\N	\N
64	Mens Casual Slim Fit	15.99	The color could be slightly different between on the screen and in practice.	1	https://fakestoreapi.com/img/71YXzeOuslL._AC_UY879_t.png	\N	\N
65	John Hardy Women's Legends Naga Gold & Silver Dragon Station Chain Bracelet	695	From our Legends Collection, the Naga was inspired by the mythical water dragon.	2	https://fakestoreapi.com/img/71pWzhdJNwL._AC_UL640_QL65_ML3_t.png	\N	\N
66	Solid Gold Petite Micropave 	168	Satisfaction Guaranteed. Return or exchange any order within 30 days.	2	https://fakestoreapi.com/img/61sbMiUnoGL._AC_UL640_QL65_ML3_t.png	\N	\N
67	White Gold Plated Princess	9.99	Classic Created Wedding Engagement Solitaire Diamond Promise Ring for Her.	2	https://fakestoreapi.com/img/71YAIFU48IL._AC_UL640_QL65_ML3_t.png	\N	\N
68	Pierced Owl Rose Gold Plated Stainless Steel Double	10.99	Rose Gold Plated Double Flared Tunnel Plug Earrings.	2	https://fakestoreapi.com/img/51UDEzMJVpL._AC_UL640_QL65_ML3_t.png	\N	\N
69	WD 2TB Elements Portable External Hard Drive - USB 3.0 	64	USB 3.0 and USB 2.0 Compatibility Fast data transfers.	3	https://fakestoreapi.com/img/61IBBVJvSDL._AC_SY879_t.png	\N	\N
70	SanDisk SSD PLUS 1TB Internal SSD - SATA III 6 Gb/s	109	Easy upgrade for faster boot up, shutdown, application load and response.	3	https://fakestoreapi.com/img/61U7T1koQqL._AC_SX679_t.png	\N	\N
71	Silicon Power 256GB SSD 3D NAND A55 SLC Cache Performance Boost SATA III 2.5	109	3D NAND flash are applied to deliver high transfer speeds.	3	https://fakestoreapi.com/img/71kWymZ+c+L._AC_SX679_t.png	\N	\N
72	WD 4TB Gaming Drive Works with Playstation 4 Portable External Hard Drive	114	Expand your PS4 gaming experience, Play anywhere Fast and easy.	3	https://fakestoreapi.com/img/61mtL65D4cL._AC_SX679_t.png	\N	\N
73	Acer SB220Q bi 21.5 inches Full HD (1920 x 1080) IPS Ultra-Thin	599	21. 5 inches Full HD (1920 x 1080) widescreen IPS display.	3	https://fakestoreapi.com/img/81QpkIctqPL._AC_SX679_t.png	\N	\N
74	Samsung 49-Inch CHG90 144Hz Curved Gaming Monitor	999.99	49 INCH SUPER ULTRAWIDE 32:9 CURVED GAMING MONITOR.	3	https://fakestoreapi.com/img/81Zt42ioCgL._AC_SX679_t.png	\N	\N
75	BIYLACLESEN Women's 3-in-1 Snowboard Jacket Winter Coats	56.99	Note:The Jackets is US standard size, Please choose size as your usual wear.	4	https://fakestoreapi.com/img/51Y5NI-I5jL._AC_UX679_t.png	\N	\N
76	Lock and Love Women's Removable Hooded Faux Leather Moto Biker Jacket	29.95	100% POLYURETHANE(shell) 100% POLYESTER(lining).	4	https://fakestoreapi.com/img/81XH0e8fefL._AC_UY879_t.png	\N	\N
77	Rain Jacket Women Windbreaker Striped Climbing Raincoats	39.99	Lightweight perfet for trip or casual wear.	4	https://fakestoreapi.com/img/71HblAHs5xL._AC_UY879_-2t.png	\N	\N
78	MBJ Women's Solid Short Sleeve Boat Neck V 	9.85	95% RAYON 5% SPANDEX, Made in USA or Imported.	4	https://fakestoreapi.com/img/71z3kpMAYsL._AC_UY879_t.png	\N	\N
79	Opna Women's Short Sleeve Moisture	7.95	100% Polyester, Machine wash, 100% cationic polyester interlock.	4	https://fakestoreapi.com/img/51eg55uWmdL._AC_UX679_t.png	\N	\N
80	DANVOUY Womens T Shirt Casual Cotton Short	12.99	95%Cotton,5%Spandex, Features: Casual, Short Sleeve.	4	https://fakestoreapi.com/img/61pHAEJ4NML._AC_UX679_t.png	\N	\N
\.


--
-- Data for Name: refresh_token; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.refresh_token (id, user_id, tokenhash, device, created_at, expires_at) FROM stdin;
3	1	akdjbcackadb	\N	\N	\N
4	22	eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MjIsImlhdCI6MTc3MTIxMjc5OSwiZXhwIjoxNzcxODE3NTk5fQ.8fSIliWPEM6teGAvkOkLICnX8empQ0T2Dzsbw6zV1lE	\N	\N	\N
5	22	e0f5852230613cc885d6bcb194a9269aec2051ab1036df62468727a7d740ea9b	\N	\N	\N
6	22	c7ed4783e56c34b89fcb5cfcf2f8b32a38bcbc209870f0b89a904cdb0a7e8366	\N	\N	\N
7	22	05b9a46e91715b09b0a064da87cabba900ae033c567c561f79d7125af1ffde2a	\N	\N	\N
8	22	f80a6c767e131e67a4e6ee84e26e06632b84220d077018b25fdf284474459b7b	\N	\N	\N
9	22	9bf122a8531ba7a786db16fd8d3eca9a27f9a65a6f0428d343e37a8882d8a3f5	\N	\N	\N
10	22	24203caa8700f113c2c969e2d78fba125eca41e831d95e951349fe23b56c0c96	\N	\N	\N
11	22	96b41ead0e6855ef9b9214f9dc978dcd636dfafcf3c10f849967980a2cfeefd1	\N	\N	\N
12	22	5491eeddd695b2d43a12f2bb645ca77b1b8f0dd0ac620ac37b0e5d82adb114d1	\N	\N	\N
13	22	dcd5005ec548bf127b04d9ea65b7fded14a91b77336aa9de4f8583d0f645e5e8	\N	\N	\N
14	22	c2e496f10f238d08aa6885c4b4b657cc22e0bdfd79a8bb0acaa8a87c48695f54	\N	\N	\N
15	22	8428abe170dd598c04380820d0811441e4d63ee7af7fa26d46f81467147c7cf1	\N	\N	\N
16	22	2bbd1b915354c08acc410fac94d00171d834122ab1cc41f1c0abacb929a06973	\N	\N	\N
17	22	834cc33da511ca6300ec93a36edc03b501b8b3b1aa40aa367eb97925ea5bc8cc	\N	\N	\N
18	22	a33658e08fc6e83961839513a7a698ae7b31fc4facec87b64c7934cab560f51c	\N	\N	\N
19	22	e44c73de856bba28ec09e1c7387a060a6a604169f576e4986e54310599568950	\N	\N	\N
20	22	3994bb5b24eac7b6b0a77ca84258e2a4963b85669d9be495985cdfee8ea08fc4	\N	\N	\N
21	22	55d9a464ba90bc2dbaab1905b6ea28b2e710e5cd87a01bb01cb5ffc3484bb4df	\N	\N	\N
22	22	541dc8cb5fa5e8829c1b8269d6e271105f874f71153b4877be93c17c2c2cdba0	\N	\N	\N
23	22	28a21b6c10af4ac86ecde49697939db879a40d7e3088c6b1b9e78b728df6a58c	\N	\N	\N
24	22	28975a83cab36288d6e562684e58551f5ff051202e4fae45c0b5c0007ff171fb	\N	\N	\N
25	22	e9de4a5044251c532ffbf101adb86a898bbfae96bcaa21585f184ab34fd4c57c	\N	\N	\N
26	22	754455279d95eeb6a86864cae5441e08573db0baa6045bf33299fd43eaf2af90	\N	\N	\N
27	22	3e42743d539a8db544049d3da60a2283cac33c007de27db452a8cf358edee8a2	\N	\N	\N
28	22	0c09d6d7e533065e82968d6fc6d3b5d4a8f72755cdcba3c223bf18a40d0f300a	\N	\N	\N
29	22	566db3765bf6e8b15d7b0a0389b14f2f2023aded5477c4227a969d3542ebd4ee	\N	\N	\N
30	22	ca05b340e552eb8789602a7881e29242f8cccb56c4fabe38d081ff8029e95a98	\N	\N	\N
31	22	26cf1f02be942c4079fcb52f4a10d1eddd6881ee3d0697622ee58af24b655c43	\N	\N	\N
32	22	f84d673bdd765235a0e91d87b935dd169dd861ec53429129f9b071307cc57ed1	\N	\N	\N
33	22	8d3964752060a05450a6ea16616c66088f532fd4d4af368b289272ddb0fc08e5	\N	\N	\N
34	22	6ac1863dc70e28845abc1fe82fa8211c8f5b6763d867dcb1873ff51af908cd93	\N	\N	\N
35	22	c61d29ee8b7a101ab70e0c5f514142dc4bfba78c521ade2534788af0c971faa2	\N	\N	\N
36	25	de996c0875d0044212661bb96d531c5fd1d21fb5858a15d5e589f83fc7a24850	\N	\N	\N
37	22	448cacc863a115fb8f87266f7524bc83f4ed6d90859939c92b37dd99b94d8837	\N	\N	\N
38	22	ed220b6434623ae82886688cc00192d74666325f60323fa07679a9f8278d43a3	\N	\N	\N
39	22	5a60a89fb7aa99459a17d3155ca53531f76d4367f959b791944423d26c5774dd	\N	\N	\N
40	22	d77f39ff266d09cb31a765a19b4a14e010311ec935d95989b20f1a826b065ea9	\N	\N	\N
41	22	5b097fc2230fdd00c0455390dc504d77bdcb64db74710fc79c05ce71994375d7	\N	\N	\N
42	22	ad3a72203d23590573afae6e025a59c56710b9a1337d5530960c6ca6b25a7613	\N	\N	\N
43	22	e594a61ae81a7325ca1c16f9b6cef87a6d620d03a670aa8725806c9a63937875	\N	\N	\N
44	22	a748d3adefb65c9f3a8aa0faf0c709bd4df24657c0a69865fcd628bf51244542	\N	\N	\N
45	22	eca5563a3dd7877b929a754237cdd5c1b0f35c00a5b30505fd5fe8bd3e42a550	\N	\N	\N
46	22	bee0f79e430a4423fcf2c657972823f27864176225c68ed7b4e0584734c04cc3	\N	\N	\N
47	22	88ba76bbe1caa3265cdc09ff96ee508a8d700c1243c07196186236f4f28f552a	\N	\N	\N
48	22	9be61dc17442b5fa8f631ad3f291995908b914447c2a900a9839b693c5e4a0c9	\N	\N	\N
49	22	4a6dc9ed96eea14a391ab6e32349455ec309f2373353063e75e41bff52689882	\N	\N	\N
50	25	6c1149915a13e929dc2101f0b44f94e5264ba22e3fb41168c303121988c17783	\N	\N	\N
51	22	26dd62ed367381a52540fbcb260f4124873e6d82c7e2a344e6b2844b9506be4d	\N	\N	\N
52	26	d1f7fba24a683582e5dbb556480436c024be91d71d90a1c5b867c8896969d558	\N	\N	\N
53	27	a40744b12570d3a5989a55b9d0a288d82102da33c7827d7fc32c79e5c289e251	\N	\N	\N
54	25	7d6b54cd0868ad126ea2fe6904f600bcac83f49a06c250edd1b55df3b1ede543	\N	\N	\N
55	26	bb87855336ca23e6dd306e9d5d8e73a46694b9f5ec59f9c01f0581a9e0ffc02b	\N	\N	\N
56	25	859fda1d68712e3044b424642d5f00d5c6f2081f5550e6b16ded6ddba01d73f3	\N	\N	\N
57	25	1e76622a1ac4a7543eb0d5e60ba9174da4d49bcd08ee6e68fc267b301259f732	\N	\N	\N
58	26	f5834f7bcdf6d3122de80e3f1dbca5a1d77c4944cf5336bd179ede5b85990b75	\N	\N	\N
59	25	8c34ef8b26eee052096f53cb55e9edd6d1536acf757e4e8517e7d687112622dc	\N	\N	\N
61	22	4557a839a6f5ece8d51e56139a873b930a70c2b92decc7cd1a5cead594fe1767	\N	\N	\N
64	26	214745cc40625ccc891ec0f149320200a0b03a2d901b8c2cd9e3f66ae3a11b22	\N	\N	\N
\.


--
-- Name: cart_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.cart_id_seq', 335, true);


--
-- Name: category_cat_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.category_cat_id_seq', 1, false);


--
-- Name: customers_cust_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.customers_cust_id_seq', 27, true);


--
-- Name: orders_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.orders_id_seq', 1, false);


--
-- Name: orditems_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.orditems_id_seq', 1, false);


--
-- Name: products_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.products_id_seq', 80, true);


--
-- Name: refresh_token_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.refresh_token_id_seq', 64, true);


--
-- Name: cart cart_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.cart
    ADD CONSTRAINT cart_pkey PRIMARY KEY (id);


--
-- Name: category category_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.category
    ADD CONSTRAINT category_pkey PRIMARY KEY (cat_id);


--
-- Name: customers customers_email_unique; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.customers
    ADD CONSTRAINT customers_email_unique UNIQUE (email);


--
-- Name: customers customers_phone_unique; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.customers
    ADD CONSTRAINT customers_phone_unique UNIQUE (phone);


--
-- Name: customers customers_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.customers
    ADD CONSTRAINT customers_pkey PRIMARY KEY (cust_id);


--
-- Name: orders orders_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.orders
    ADD CONSTRAINT orders_pkey PRIMARY KEY (id);


--
-- Name: orditems orditems_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.orditems
    ADD CONSTRAINT orditems_pkey PRIMARY KEY (id);


--
-- Name: products products_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.products
    ADD CONSTRAINT products_pkey PRIMARY KEY (id);


--
-- Name: refresh_token refresh_token_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.refresh_token
    ADD CONSTRAINT refresh_token_pkey PRIMARY KEY (id);


--
-- Name: cart unique_cart_prod; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.cart
    ADD CONSTRAINT unique_cart_prod UNIQUE (cust_id, p_id);


--
-- Name: cart cart_cust_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.cart
    ADD CONSTRAINT cart_cust_id_fkey FOREIGN KEY (cust_id) REFERENCES public.customers(cust_id);


--
-- Name: cart cart_p_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.cart
    ADD CONSTRAINT cart_p_id_fkey FOREIGN KEY (p_id) REFERENCES public.products(id);


--
-- Name: orders foreignkey_cust_id; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.orders
    ADD CONSTRAINT foreignkey_cust_id FOREIGN KEY (cust_id) REFERENCES public.customers(cust_id);


--
-- Name: orditems orditems_ord_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.orditems
    ADD CONSTRAINT orditems_ord_id_fkey FOREIGN KEY (ord_id) REFERENCES public.orders(id);


--
-- Name: orditems orditems_p_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.orditems
    ADD CONSTRAINT orditems_p_id_fkey FOREIGN KEY (p_id) REFERENCES public.products(id);


--
-- Name: products products_cat_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.products
    ADD CONSTRAINT products_cat_id_fkey FOREIGN KEY (cat_id) REFERENCES public.category(cat_id);


--
-- Name: refresh_token refresh_token_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.refresh_token
    ADD CONSTRAINT refresh_token_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.customers(cust_id);


--
-- PostgreSQL database dump complete
--

\unrestrict OWCGJCsrGqkQExgaqRmZDfg2T1lUWcEp4bd9XQK6ghgVKZSLxmaEESkNAVy072X

