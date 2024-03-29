PGDMP     $    8            	    {            facilitaSeguros    15.4    15.4 J    t           0    0    ENCODING    ENCODING        SET client_encoding = 'UTF8';
                      false            u           0    0 
   STDSTRINGS 
   STDSTRINGS     (   SET standard_conforming_strings = 'on';
                      false            v           0    0 
   SEARCHPATH 
   SEARCHPATH     8   SELECT pg_catalog.set_config('search_path', '', false);
                      false            w           1262    16394    facilitaSeguros    DATABASE     �   CREATE DATABASE "facilitaSeguros" WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE_PROVIDER = libc LOCALE = 'Spanish_Ecuador.1252';
 !   DROP DATABASE "facilitaSeguros";
                postgres    false            �            1255    41420    actualizar_precio_cotizacion()    FUNCTION     �  CREATE FUNCTION public.actualizar_precio_cotizacion() RETURNS trigger
    LANGUAGE plpgsql
    AS $$
BEGIN
  UPDATE vehiculo
  SET valor_cotizacion = vehiculo.valor_mercado * 
                         (SELECT anio.factor_riesgo FROM anio WHERE anio.id_anio = vehiculo.id_anio) *
                         (SELECT modelo.factor_riesgo FROM modelo WHERE modelo.id_modelo = vehiculo.id_modelo);
  RETURN NEW;
END;
$$;
 5   DROP FUNCTION public.actualizar_precio_cotizacion();
       public          postgres    false            �            1255    41415    actualizar_precio_seguro()    FUNCTION       CREATE FUNCTION public.actualizar_precio_seguro() RETURNS trigger
    LANGUAGE plpgsql
    AS $$
BEGIN
  UPDATE seguro_Vehiculo
  SET precio = NEW.valor_cotizacion - (NEW.valor_cotizacion * (descuento/100))
  WHERE id_vehiculo = NEW.id_vehiculo;
  RETURN NEW;
END;
$$;
 1   DROP FUNCTION public.actualizar_precio_seguro();
       public          postgres    false            �            1259    24704    anio    TABLE     �   CREATE TABLE public.anio (
    id_anio integer NOT NULL,
    nombre character varying(50),
    factor_riesgo double precision
);
    DROP TABLE public.anio;
       public         heap    postgres    false            �            1259    32799    anio_id_anio_seq    SEQUENCE     �   ALTER TABLE public.anio ALTER COLUMN id_anio ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.anio_id_anio_seq
    START WITH 5
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);
            public          postgres    false    218            �            1259    24625    aseguradora_vehiculo    TABLE       CREATE TABLE public.aseguradora_vehiculo (
    id_aseguradora_vehiculo integer NOT NULL,
    nombre character varying(100),
    correo character varying(100),
    telefono character varying(100),
    descripcion character varying(500),
    imagen character varying(600)
);
 (   DROP TABLE public.aseguradora_vehiculo;
       public         heap    postgres    false            �            1259    32800 0   aseguradora_vehiculo_id_aseguradora_vehiculo_seq    SEQUENCE       ALTER TABLE public.aseguradora_vehiculo ALTER COLUMN id_aseguradora_vehiculo ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.aseguradora_vehiculo_id_aseguradora_vehiculo_seq
    START WITH 6
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);
            public          postgres    false    217            �            1259    24593    aseguradora_vida    TABLE     	  CREATE TABLE public.aseguradora_vida (
    id_aseguradora_vida integer NOT NULL,
    nombre character varying(100),
    correo character varying(100),
    telefono character varying(100),
    descripcion character varying(500),
    imagen character varying(500)
);
 $   DROP TABLE public.aseguradora_vida;
       public         heap    postgres    false            �            1259    32801 (   aseguradora_vida_id_aseguradora_vida_seq    SEQUENCE     �   ALTER TABLE public.aseguradora_vida ALTER COLUMN id_aseguradora_vida ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.aseguradora_vida_id_aseguradora_vida_seq
    START WITH 6
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);
            public          postgres    false    215            �            1259    24586    cliente    TABLE     X  CREATE TABLE public.cliente (
    id_cliente integer NOT NULL,
    cedula character varying(100),
    nombre character varying(100),
    apellido character varying(100),
    fecha_nacimiento date,
    provincia character varying(100),
    ciudad character varying(100),
    telefono character varying(100),
    correo character varying(100)
);
    DROP TABLE public.cliente;
       public         heap    postgres    false            �            1259    32802    cliente_id_cliente_seq    SEQUENCE     �   ALTER TABLE public.cliente ALTER COLUMN id_cliente ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.cliente_id_cliente_seq
    START WITH 11
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);
            public          postgres    false    214            �            1259    24744    cliente_vehiculo    TABLE     �   CREATE TABLE public.cliente_vehiculo (
    id_cliente_vehiculo integer NOT NULL,
    id_cliente integer,
    id_seguro_vehiculo integer,
    fecha timestamp without time zone DEFAULT CURRENT_TIMESTAMP
);
 $   DROP TABLE public.cliente_vehiculo;
       public         heap    postgres    false            �            1259    32803 (   cliente_vehiculo_id_cliente_vehiculo_seq    SEQUENCE     �   ALTER TABLE public.cliente_vehiculo ALTER COLUMN id_cliente_vehiculo ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.cliente_vehiculo_id_cliente_vehiculo_seq
    START WITH 11
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);
            public          postgres    false    222            �            1259    41260    cliente_vida    TABLE     �   CREATE TABLE public.cliente_vida (
    id_cliente_vida integer NOT NULL,
    id_cliente integer,
    id_plan_vida integer,
    fecha timestamp without time zone DEFAULT CURRENT_TIMESTAMP
);
     DROP TABLE public.cliente_vida;
       public         heap    postgres    false            �            1259    41286     cliente_vida_id_cliente_vida_seq    SEQUENCE     �   ALTER TABLE public.cliente_vida ALTER COLUMN id_cliente_vida ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.cliente_vida_id_cliente_vida_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);
            public          postgres    false    233            �            1259    24709    modelo    TABLE     �   CREATE TABLE public.modelo (
    id_modelo integer NOT NULL,
    nombre character varying(200),
    marca character varying(200),
    factor_riesgo double precision
);
    DROP TABLE public.modelo;
       public         heap    postgres    false            �            1259    32805    modelo_id_modelo_seq    SEQUENCE     �   ALTER TABLE public.modelo ALTER COLUMN id_modelo ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.modelo_id_modelo_seq
    START WITH 7
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);
            public          postgres    false    219            �            1259    24600 	   plan_vida    TABLE     �   CREATE TABLE public.plan_vida (
    id_plan_vida integer NOT NULL,
    id_aseguradora_vida integer,
    nombre character varying(100),
    descripcion character varying(500),
    precio double precision
);
    DROP TABLE public.plan_vida;
       public         heap    postgres    false            �            1259    32806    plan_vida_id_plan_vida_seq    SEQUENCE     �   ALTER TABLE public.plan_vida ALTER COLUMN id_plan_vida ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.plan_vida_id_plan_vida_seq
    START WITH 16
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);
            public          postgres    false    216            �            1259    24729    seguro_vehiculo    TABLE     �   CREATE TABLE public.seguro_vehiculo (
    id_seguro_vehiculo integer NOT NULL,
    id_aseguradora_vehiculo integer,
    id_vehiculo integer,
    descuento double precision,
    precio double precision
);
 #   DROP TABLE public.seguro_vehiculo;
       public         heap    postgres    false            �            1259    32807 &   seguro_vehiculo_id_seguro_vehiculo_seq    SEQUENCE     �   ALTER TABLE public.seguro_vehiculo ALTER COLUMN id_seguro_vehiculo ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.seguro_vehiculo_id_seguro_vehiculo_seq
    START WITH 7
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);
            public          postgres    false    221            �            1259    24714    vehiculo    TABLE     �   CREATE TABLE public.vehiculo (
    id_vehiculo integer NOT NULL,
    id_modelo integer,
    id_anio integer,
    valor_mercado double precision,
    valor_cotizacion double precision
);
    DROP TABLE public.vehiculo;
       public         heap    postgres    false            �            1259    32808    vehiculo_id_vehiculo_seq    SEQUENCE     �   ALTER TABLE public.vehiculo ALTER COLUMN id_vehiculo ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.vehiculo_id_vehiculo_seq
    START WITH 7
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);
            public          postgres    false    220            �            1259    41550    vista_cliente_vehiculo    VIEW       CREATE VIEW public.vista_cliente_vehiculo AS
 SELECT cliente_vehiculo.id_cliente_vehiculo,
    cliente_vehiculo.fecha,
    cliente.nombre AS cliente_nombre,
    cliente.apellido,
    cliente.cedula,
    cliente.provincia,
    cliente.ciudad,
    cliente.telefono,
    cliente.correo,
    aseguradora_vehiculo.id_aseguradora_vehiculo,
    aseguradora_vehiculo.nombre AS aseguradora_nombre,
    aseguradora_vehiculo.correo AS aseguradora_correo,
    aseguradora_vehiculo.telefono AS aseguradora_telefono,
    aseguradora_vehiculo.imagen AS imagen_aseguradora,
    seguro_vehiculo.id_seguro_vehiculo,
    modelo.marca,
    modelo.nombre AS modelo,
    anio.nombre AS anio,
    seguro_vehiculo.precio
   FROM ((((((public.cliente_vehiculo
     JOIN public.cliente ON ((cliente_vehiculo.id_cliente = cliente.id_cliente)))
     JOIN public.seguro_vehiculo ON ((cliente_vehiculo.id_seguro_vehiculo = seguro_vehiculo.id_seguro_vehiculo)))
     JOIN public.aseguradora_vehiculo ON ((seguro_vehiculo.id_aseguradora_vehiculo = aseguradora_vehiculo.id_aseguradora_vehiculo)))
     JOIN public.vehiculo ON ((seguro_vehiculo.id_vehiculo = vehiculo.id_vehiculo)))
     JOIN public.modelo ON ((vehiculo.id_modelo = modelo.id_modelo)))
     JOIN public.anio ON ((vehiculo.id_anio = anio.id_anio)));
 )   DROP VIEW public.vista_cliente_vehiculo;
       public          postgres    false    214    214    214    214    214    214    214    217    217    217    217    217    218    218    219    219    219    220    220    220    221    221    221    221    222    222    222    222    214            �            1259    41287    vista_cliente_vida    VIEW     �  CREATE VIEW public.vista_cliente_vida AS
 SELECT cliente_vida.id_cliente_vida,
    cliente_vida.fecha,
    cliente.id_cliente,
    cliente.nombre AS cliente_nombre,
    cliente.apellido,
    cliente.cedula,
    cliente.provincia,
    cliente.ciudad,
    cliente.telefono,
    cliente.correo,
    aseguradora_vida.id_aseguradora_vida,
    aseguradora_vida.nombre AS aseguradora_nombre,
    aseguradora_vida.correo AS aseguradora_correo,
    aseguradora_vida.telefono AS aseguradora_telefono,
    aseguradora_vida.imagen AS imagen_aseguradora,
    plan_vida.id_plan_vida,
    plan_vida.nombre AS nombre_plan,
    plan_vida.descripcion AS plan_vida_descripcion,
    plan_vida.precio AS precio_plan
   FROM (((public.cliente_vida
     JOIN public.cliente ON ((cliente_vida.id_cliente = cliente.id_cliente)))
     JOIN public.plan_vida ON ((cliente_vida.id_plan_vida = plan_vida.id_plan_vida)))
     JOIN public.aseguradora_vida ON ((plan_vida.id_aseguradora_vida = aseguradora_vida.id_aseguradora_vida)));
 %   DROP VIEW public.vista_cliente_vida;
       public          postgres    false    216    233    233    233    233    215    215    214    214    214    215    216    216    216    216    214    214    214    214    214    215    215            �            1259    41401    vista_plan_vida    VIEW     �  CREATE VIEW public.vista_plan_vida AS
 SELECT plan_vida.id_plan_vida,
    plan_vida.id_aseguradora_vida,
    aseguradora_vida.nombre AS aseguradora_nombre,
    aseguradora_vida.imagen AS aseguradora_imagen,
    plan_vida.nombre AS plan_vida_nombre,
    plan_vida.descripcion AS plan_vida_descripcion,
    plan_vida.precio
   FROM (public.plan_vida
     JOIN public.aseguradora_vida ON ((plan_vida.id_aseguradora_vida = aseguradora_vida.id_aseguradora_vida)));
 "   DROP VIEW public.vista_plan_vida;
       public          postgres    false    216    216    216    216    215    215    215    216            �            1259    41555    vista_seguro_vehiculo    VIEW     �  CREATE VIEW public.vista_seguro_vehiculo AS
 SELECT seguro_vehiculo.id_seguro_vehiculo,
    aseguradora_vehiculo.nombre AS aseguradora,
    aseguradora_vehiculo.descripcion,
    modelo.marca,
    modelo.nombre AS modelo,
    anio.nombre AS anio,
    aseguradora_vehiculo.imagen,
    (((((modelo.marca)::text || ' '::text) || (modelo.nombre)::text) || ' '::text) || (anio.nombre)::text) AS vehiculo,
    vehiculo.valor_cotizacion AS precio_base,
    seguro_vehiculo.descuento,
    seguro_vehiculo.precio AS precio_final
   FROM ((((public.seguro_vehiculo
     JOIN public.aseguradora_vehiculo ON ((seguro_vehiculo.id_aseguradora_vehiculo = aseguradora_vehiculo.id_aseguradora_vehiculo)))
     JOIN public.vehiculo ON ((seguro_vehiculo.id_vehiculo = vehiculo.id_vehiculo)))
     JOIN public.modelo ON ((vehiculo.id_modelo = modelo.id_modelo)))
     JOIN public.anio ON ((vehiculo.id_anio = anio.id_anio)));
 (   DROP VIEW public.vista_seguro_vehiculo;
       public          postgres    false    221    221    221    221    221    220    220    220    220    219    219    219    218    218    217    217    217    217            �            1259    41001    vista_vehiculo    VIEW     �  CREATE VIEW public.vista_vehiculo AS
 SELECT vehiculo.id_vehiculo,
    modelo.id_modelo,
    modelo.marca,
    modelo.nombre AS modelo,
    anio.id_anio,
    anio.nombre AS anio,
    vehiculo.valor_mercado,
    vehiculo.valor_cotizacion
   FROM ((public.vehiculo
     JOIN public.modelo ON ((vehiculo.id_modelo = modelo.id_modelo)))
     JOIN public.anio ON ((vehiculo.id_anio = anio.id_anio)));
 !   DROP VIEW public.vista_vehiculo;
       public          postgres    false    220    218    220    220    220    220    218    219    219    219            b          0    24704    anio 
   TABLE DATA                 public          postgres    false    218   4n       a          0    24625    aseguradora_vehiculo 
   TABLE DATA                 public          postgres    false    217   �n       _          0    24593    aseguradora_vida 
   TABLE DATA                 public          postgres    false    215   (q       ^          0    24586    cliente 
   TABLE DATA                 public          postgres    false    214   �t       f          0    24744    cliente_vehiculo 
   TABLE DATA                 public          postgres    false    222   �y       p          0    41260    cliente_vida 
   TABLE DATA                 public          postgres    false    233   �z       c          0    24709    modelo 
   TABLE DATA                 public          postgres    false    219   R|       `          0    24600 	   plan_vida 
   TABLE DATA                 public          postgres    false    216   4}       e          0    24729    seguro_vehiculo 
   TABLE DATA                 public          postgres    false    221   |       d          0    24714    vehiculo 
   TABLE DATA                 public          postgres    false    220   ��       x           0    0    anio_id_anio_seq    SEQUENCE SET     ?   SELECT pg_catalog.setval('public.anio_id_anio_seq', 15, true);
          public          postgres    false    223            y           0    0 0   aseguradora_vehiculo_id_aseguradora_vehiculo_seq    SEQUENCE SET     _   SELECT pg_catalog.setval('public.aseguradora_vehiculo_id_aseguradora_vehiculo_seq', 13, true);
          public          postgres    false    224            z           0    0 (   aseguradora_vida_id_aseguradora_vida_seq    SEQUENCE SET     W   SELECT pg_catalog.setval('public.aseguradora_vida_id_aseguradora_vida_seq', 11, true);
          public          postgres    false    225            {           0    0    cliente_id_cliente_seq    SEQUENCE SET     E   SELECT pg_catalog.setval('public.cliente_id_cliente_seq', 63, true);
          public          postgres    false    226            |           0    0 (   cliente_vehiculo_id_cliente_vehiculo_seq    SEQUENCE SET     W   SELECT pg_catalog.setval('public.cliente_vehiculo_id_cliente_vehiculo_seq', 38, true);
          public          postgres    false    227            }           0    0     cliente_vida_id_cliente_vida_seq    SEQUENCE SET     O   SELECT pg_catalog.setval('public.cliente_vida_id_cliente_vida_seq', 20, true);
          public          postgres    false    234            ~           0    0    modelo_id_modelo_seq    SEQUENCE SET     B   SELECT pg_catalog.setval('public.modelo_id_modelo_seq', 9, true);
          public          postgres    false    228                       0    0    plan_vida_id_plan_vida_seq    SEQUENCE SET     I   SELECT pg_catalog.setval('public.plan_vida_id_plan_vida_seq', 29, true);
          public          postgres    false    229            �           0    0 &   seguro_vehiculo_id_seguro_vehiculo_seq    SEQUENCE SET     U   SELECT pg_catalog.setval('public.seguro_vehiculo_id_seguro_vehiculo_seq', 21, true);
          public          postgres    false    230            �           0    0    vehiculo_id_vehiculo_seq    SEQUENCE SET     G   SELECT pg_catalog.setval('public.vehiculo_id_vehiculo_seq', 31, true);
          public          postgres    false    231            �           2606    24708    anio anio_pkey 
   CONSTRAINT     Q   ALTER TABLE ONLY public.anio
    ADD CONSTRAINT anio_pkey PRIMARY KEY (id_anio);
 8   ALTER TABLE ONLY public.anio DROP CONSTRAINT anio_pkey;
       public            postgres    false    218            �           2606    24629 .   aseguradora_vehiculo aseguradora_vehiculo_pkey 
   CONSTRAINT     �   ALTER TABLE ONLY public.aseguradora_vehiculo
    ADD CONSTRAINT aseguradora_vehiculo_pkey PRIMARY KEY (id_aseguradora_vehiculo);
 X   ALTER TABLE ONLY public.aseguradora_vehiculo DROP CONSTRAINT aseguradora_vehiculo_pkey;
       public            postgres    false    217            �           2606    24599 &   aseguradora_vida aseguradora_vida_pkey 
   CONSTRAINT     u   ALTER TABLE ONLY public.aseguradora_vida
    ADD CONSTRAINT aseguradora_vida_pkey PRIMARY KEY (id_aseguradora_vida);
 P   ALTER TABLE ONLY public.aseguradora_vida DROP CONSTRAINT aseguradora_vida_pkey;
       public            postgres    false    215            �           2606    24592    cliente cliente_pkey 
   CONSTRAINT     Z   ALTER TABLE ONLY public.cliente
    ADD CONSTRAINT cliente_pkey PRIMARY KEY (id_cliente);
 >   ALTER TABLE ONLY public.cliente DROP CONSTRAINT cliente_pkey;
       public            postgres    false    214            �           2606    24748 &   cliente_vehiculo cliente_vehiculo_pkey 
   CONSTRAINT     u   ALTER TABLE ONLY public.cliente_vehiculo
    ADD CONSTRAINT cliente_vehiculo_pkey PRIMARY KEY (id_cliente_vehiculo);
 P   ALTER TABLE ONLY public.cliente_vehiculo DROP CONSTRAINT cliente_vehiculo_pkey;
       public            postgres    false    222            �           2606    41264    cliente_vida cliente_vida_pkey 
   CONSTRAINT     i   ALTER TABLE ONLY public.cliente_vida
    ADD CONSTRAINT cliente_vida_pkey PRIMARY KEY (id_cliente_vida);
 H   ALTER TABLE ONLY public.cliente_vida DROP CONSTRAINT cliente_vida_pkey;
       public            postgres    false    233            �           2606    24713    modelo modelo_pkey 
   CONSTRAINT     W   ALTER TABLE ONLY public.modelo
    ADD CONSTRAINT modelo_pkey PRIMARY KEY (id_modelo);
 <   ALTER TABLE ONLY public.modelo DROP CONSTRAINT modelo_pkey;
       public            postgres    false    219            �           2606    24604    plan_vida plan_vida_pkey 
   CONSTRAINT     `   ALTER TABLE ONLY public.plan_vida
    ADD CONSTRAINT plan_vida_pkey PRIMARY KEY (id_plan_vida);
 B   ALTER TABLE ONLY public.plan_vida DROP CONSTRAINT plan_vida_pkey;
       public            postgres    false    216            �           2606    24733 $   seguro_vehiculo seguro_vehiculo_pkey 
   CONSTRAINT     r   ALTER TABLE ONLY public.seguro_vehiculo
    ADD CONSTRAINT seguro_vehiculo_pkey PRIMARY KEY (id_seguro_vehiculo);
 N   ALTER TABLE ONLY public.seguro_vehiculo DROP CONSTRAINT seguro_vehiculo_pkey;
       public            postgres    false    221            �           2606    24718    vehiculo vehiculo_pkey 
   CONSTRAINT     ]   ALTER TABLE ONLY public.vehiculo
    ADD CONSTRAINT vehiculo_pkey PRIMARY KEY (id_vehiculo);
 @   ALTER TABLE ONLY public.vehiculo DROP CONSTRAINT vehiculo_pkey;
       public            postgres    false    220            �           2620    41416 )   vehiculo actualizar_precio_seguro_trigger    TRIGGER     �   CREATE TRIGGER actualizar_precio_seguro_trigger AFTER UPDATE OF valor_cotizacion ON public.vehiculo FOR EACH ROW EXECUTE FUNCTION public.actualizar_precio_seguro();
 B   DROP TRIGGER actualizar_precio_seguro_trigger ON public.vehiculo;
       public          postgres    false    220    239    220            �           2620    41421 .   anio trigger_actualizar_precio_cotizacion_anio    TRIGGER     �   CREATE TRIGGER trigger_actualizar_precio_cotizacion_anio AFTER UPDATE OF factor_riesgo ON public.anio FOR EACH ROW EXECUTE FUNCTION public.actualizar_precio_cotizacion();
 G   DROP TRIGGER trigger_actualizar_precio_cotizacion_anio ON public.anio;
       public          postgres    false    218    240    218            �           2620    41422 2   modelo trigger_actualizar_precio_cotizacion_modelo    TRIGGER     �   CREATE TRIGGER trigger_actualizar_precio_cotizacion_modelo AFTER UPDATE OF factor_riesgo ON public.modelo FOR EACH ROW EXECUTE FUNCTION public.actualizar_precio_cotizacion();
 K   DROP TRIGGER trigger_actualizar_precio_cotizacion_modelo ON public.modelo;
       public          postgres    false    219    240    219            �           2606    41377    vehiculo fk_id_anio    FK CONSTRAINT     �   ALTER TABLE ONLY public.vehiculo
    ADD CONSTRAINT fk_id_anio FOREIGN KEY (id_anio) REFERENCES public.anio(id_anio) ON DELETE CASCADE;
 =   ALTER TABLE ONLY public.vehiculo DROP CONSTRAINT fk_id_anio;
       public          postgres    false    3251    220    218            �           2606    41352 *   seguro_vehiculo fk_id_aseguradora_vehiculo    FK CONSTRAINT     �   ALTER TABLE ONLY public.seguro_vehiculo
    ADD CONSTRAINT fk_id_aseguradora_vehiculo FOREIGN KEY (id_aseguradora_vehiculo) REFERENCES public.aseguradora_vehiculo(id_aseguradora_vehiculo) ON DELETE CASCADE;
 T   ALTER TABLE ONLY public.seguro_vehiculo DROP CONSTRAINT fk_id_aseguradora_vehiculo;
       public          postgres    false    221    217    3249            �           2606    41382     plan_vida fk_id_aseguradora_vida    FK CONSTRAINT     �   ALTER TABLE ONLY public.plan_vida
    ADD CONSTRAINT fk_id_aseguradora_vida FOREIGN KEY (id_aseguradora_vida) REFERENCES public.aseguradora_vida(id_aseguradora_vida) ON DELETE CASCADE;
 J   ALTER TABLE ONLY public.plan_vida DROP CONSTRAINT fk_id_aseguradora_vida;
       public          postgres    false    3245    215    216            �           2606    41342    cliente_vehiculo fk_id_cliente    FK CONSTRAINT     �   ALTER TABLE ONLY public.cliente_vehiculo
    ADD CONSTRAINT fk_id_cliente FOREIGN KEY (id_cliente) REFERENCES public.cliente(id_cliente) ON DELETE CASCADE;
 H   ALTER TABLE ONLY public.cliente_vehiculo DROP CONSTRAINT fk_id_cliente;
       public          postgres    false    3243    214    222            �           2606    41387    cliente_vida fk_id_cliente    FK CONSTRAINT     �   ALTER TABLE ONLY public.cliente_vida
    ADD CONSTRAINT fk_id_cliente FOREIGN KEY (id_cliente) REFERENCES public.cliente(id_cliente) ON DELETE CASCADE;
 D   ALTER TABLE ONLY public.cliente_vida DROP CONSTRAINT fk_id_cliente;
       public          postgres    false    214    233    3243            �           2606    41372    vehiculo fk_id_modelo    FK CONSTRAINT     �   ALTER TABLE ONLY public.vehiculo
    ADD CONSTRAINT fk_id_modelo FOREIGN KEY (id_modelo) REFERENCES public.modelo(id_modelo) ON DELETE CASCADE;
 ?   ALTER TABLE ONLY public.vehiculo DROP CONSTRAINT fk_id_modelo;
       public          postgres    false    3253    219    220            �           2606    41392    cliente_vida fk_id_plan_vida    FK CONSTRAINT     �   ALTER TABLE ONLY public.cliente_vida
    ADD CONSTRAINT fk_id_plan_vida FOREIGN KEY (id_plan_vida) REFERENCES public.plan_vida(id_plan_vida) ON DELETE CASCADE;
 F   ALTER TABLE ONLY public.cliente_vida DROP CONSTRAINT fk_id_plan_vida;
       public          postgres    false    216    233    3247            �           2606    41347 &   cliente_vehiculo fk_id_seguro_vehiculo    FK CONSTRAINT     �   ALTER TABLE ONLY public.cliente_vehiculo
    ADD CONSTRAINT fk_id_seguro_vehiculo FOREIGN KEY (id_seguro_vehiculo) REFERENCES public.seguro_vehiculo(id_seguro_vehiculo) ON DELETE CASCADE;
 P   ALTER TABLE ONLY public.cliente_vehiculo DROP CONSTRAINT fk_id_seguro_vehiculo;
       public          postgres    false    221    222    3257            �           2606    41367    seguro_vehiculo fk_id_vehiculo    FK CONSTRAINT     �   ALTER TABLE ONLY public.seguro_vehiculo
    ADD CONSTRAINT fk_id_vehiculo FOREIGN KEY (id_vehiculo) REFERENCES public.vehiculo(id_vehiculo) ON DELETE CASCADE;
 H   ALTER TABLE ONLY public.seguro_vehiculo DROP CONSTRAINT fk_id_vehiculo;
       public          postgres    false    3255    221    220            �           2606    41337 9   cliente_vehiculo nombre_de_la_restriccion_seguro_vehiculo    FK CONSTRAINT     �   ALTER TABLE ONLY public.cliente_vehiculo
    ADD CONSTRAINT nombre_de_la_restriccion_seguro_vehiculo FOREIGN KEY (id_seguro_vehiculo) REFERENCES public.seguro_vehiculo(id_seguro_vehiculo) ON DELETE CASCADE;
 c   ALTER TABLE ONLY public.cliente_vehiculo DROP CONSTRAINT nombre_de_la_restriccion_seguro_vehiculo;
       public          postgres    false    221    3257    222            b   �   x���v
Q���W((M��L�K���W��L�1t��s��Ru��K��2S���5��\��<]<���#�C\}�}B]!d�������������������5�'��2[eh	��Pψ�VB|e@�� V���VC�2[��� �Н      a   =  x����j�0�}�B���`[����LiC	�qR(EVS[G#YI_i��}���d(亘E6�%˖�?~�?J{�)ꏦc��",��/��h:_�W�l�Zd�}7<$�Xh�!Zs�.y�_@�����b��DA�\ޠ�So2�?�G�(��N{C�t7���c��5�j0h@�=� ��{Q����,({�9xfΪ�a��v+i�Q՚p�@���h���J��J�GA
4�+.Kx�C�u��c"s=�s\��0`VQY�g�HM�V5���	��u;ê�_�R�[������	x�|n�,�U9�����]L"<����@�e���U��l�/6�_VH`g�Dq3i�;ݣ2�3eZ��4O��j�sf�ol��J?�D�ě.��B�%�DL�q6�h6�?������M�'y��:7ax�'�}��4?@��o�M�%���J��h]*K�%/�e���J��:.�-���>/+�Q��z�50U���n��7��`�,anrXR9rC������~����j~���#�l��ڄ�:
%'ó�a
ϱ�m�J�o�Q���(�!�L�R<�7�_Q���a�����#�H      _   �  x��UMo7��W��	 ��$[�Z����G1,7Es	F�Y�.?�����sȡ�O���ʮ�h}4j�Hə��=�,���8Y\��6��VFZ瀵�a�k������>8oW���|����P���)��[��냶�&�޾�����>Y��_��7��������^��`)w��s�js�3+�9?�!'�j��sAJ�Ӫ�FUU�h�	(����"�D@���/!�b�%��`8�r�O���j.�f�_-��GFY���ƃ#EQ't�\�I��ߔ���5'�'�[N�4~�c9��h<�N�٤���v}�����s����o�m=��h6=�Lg2Z��8�Y%%7WkɃ��$GD�������A���uü�8�����Ⱦ���m�C��00�H�u���>��~�I�a�3��F���`���/�WC-��Q#pU�P�<�24h��X���PƲю�~���������
�L}T��SY`)�v�E�!;���[�̍�enXm�6[4�D|5#���Plt�n<����5&,Q)�]��"Kn�F��R���wϊ��&���	�Sd8�M���ǟr�����!��Y=-1�6G�!�W.�ER�N�,]
�����Haۉ��W��8)���NL�7�H�Y๝�G��m]x�����,9��I�O�m�c5������2��c�ڪ��rX�����Q_6�,��7�Ǘvy�NUѺ�%�1�wr�%h4w��O�+V�+��<> �kf����YG%����q�����n�	Ŏ�_Q3�)h���co�}�M�˫ɺ��H�������N�{��'f�uҽ��FZ��6�����Y9w����,qf�$���˽�oC�W�#��/��oڲ�b�ú�Q+#n���2����I9���w��֠����6���j?�5FZ����9#�      ^   �  x���R�H��<�v$UպZ�ل��q­lBUV�c�m��N[r�M��`5����ar\q`�Zl\V��?����������_]�r�&�A�&8/��.�����L�c�$Qv3��IL:�G7�-�(����/3JI%��()c�;F�S<&9�2"�b�޸�������1�:��ׇ�_z�sh��;�>
Qt}�u��������:���3-d�H|Q�-��G��$��Q����x	L���P��O��;����������Õ���A�,��hJ����3��@��D�����#IWw�
	S�$"yX��D\��E��r(\�a*T��].��!�e+f�M��4Z��%E#l2�+�!�\�~0 1K�I����0m��d?�S( *�
%h2�+񑄂�Ȓ
�c������|�<��M����䗐���(*�&c�r%��n��	b![��u�x&rMK�@/5.d@�I�����7�G��H�N1$cUd�y'��B��ԛg�B˲S=C��5�L(+�#r�8�"�d�s���iY�h�b��m2q�I �}%�rt"����섙�x�}f#e;�P�R�q��X��y��X����P���	k@>�[��ޗآT�Xz�2�/ġ�ۡ�_G����,&6�}&�^�
��8���QO�-<d�՚����ё����q�P�k����>ܺ�^��X��
';�Pr+#�t� �G��r�kK�C��[��U+w�N��I�O�~���a��FԴD/z$~L\q�����j8e���@6K�AD�׍�zC`�!p^
��3k�x���6���,��f�A�Ň-�X��D�/��5Q���yM���ms��֧�@q�ix_�A�p�ЭOn��
���a+xԧOH��	����z�h6���vo�=H/���kכ##P���%��!ޖ5�'"�eo�~1H�W�׵d�W<��o��,UW�h��S2����@���V�_-�i��j��u�&r�v���D���
sb:I��� �޶n��2��\]aT|T� ���Da(,6H]ƶ���Ri5��cX$2Q�I�8:�Z㥟w�t�����~c�� ���}�~�ЪM��7������&*}��R0�� �gw����A�B      f   X  x���AK�0��>Żm�,��%M<	)��xZ�+'���f��9��J(����?�VӺ�/��.f�{�t�l6]��ٮ��u��6[uO��M?���G��{�}n���f�r>����5���������]yXk���:$Ez��-�d9�Y����Š�w�@LR��Hm?P�@�z&e -��I^��,fJJ@�EKQ��>���x�)�w�)� 4�9 J�<:�Uǩ��]��m�EO��h�5^'>��Ā:��eɅ6HiPc �I ���T�J_K6*�E5%kŜHV�yj����V�D��S}�:#� 2�A-��_�V��R�Kk��=u0����      p   J  x���MK�@�{���B���~dw=		hM-x*��(���;��ՊW��$�^f�RO�j��z�����i�n�f�����{�]èݮ�p>辏�����y�yY�a��������B��,�{X^�=T�g#*�@�2��`���ј�� �p|5�����b39ڴ����g���|�4q��q�6W��H�h+�~�i��LӖ&ԝ5C\Z�����e�E.#e��p2�/�ʈ)�l��KNw���Q���Ѣ�}�dT�l+��9���r�쭭�7G�q!"Erʓ������9��NcrQ{eK����/��BdT�J�l����      c   �   x��н�0������ ���6L(�8��iB���ѷ����rs��K2���8��Y����M�`����.t(Jٸ ���7V(��7�8��<'[��^h�p^N��R�&&�g�B��J����=�:�J�{�j���22���L���~���۽�?��Qb۲����*,���7c���=��'�*)�6� ��c�����      `   8  x�͖�j�@��~��9"�IRz�[a�m,��S�&f�jW�]�7���b��B,Q��Ƙ�df��7;ʖy��B�ܮ���J��J�~|�,߮F�W��P[,��כڔ{K#(�	++!�Ae���ڥ�M�1[. ��o�������9\$#��p�{�.�7�|�&��B��,
!�?�]���� �������t�����g����4?��b�>�h�Q��%ir��Ƴ����{��s7<��o�!0�m~��`�!X[㉵_4lM��a�V���*��I��Q��M���B�}K�@獃�����=[���t�:ziZ����'�@ �5�*��K�o.Q��VK������]�u��Y;�����$.�FA��C�F.U�	�pn�f	'ϰ��D��ׇ~�dOr����h p���B^�Z��(���E��PI�B�ӄ}hʚl4�p�5�R����M�)Q�cɸG0G�i��梠�q9r-����%q�����Nk�J:����7ʬ��ɖ3�:s��2큜��3^'���{�y}m	��o`�      e   �   x�Ք�J�0���s�!d�i~�J�H@��օ�Zj��إk}~��(�&�dr�q�$����_6{�������2O��#��|a3��?=�kc��ǩ�}�s�õ���;m/S�q�CQU�Η�P�x����S�jd�U9-�5���&�q�H����Fr�&�"�XH�ʡ�:INJ���$;��i:��x�J��I�)B����h�n�]��[L3u����P4B$I��OJ�r�8IS�2ȭYBϲO�"�      d     x�͔�j�0��>�w!�L�i�P)B�څ��B�Z����M�����_�(�j�(�|�>F������8����u`@�yꇿ��xj��8]O��ڵ�6vӷ�i;?]�p8�UU<�3��u������-���d�PE�`���xj�I�`HHᩌ�0�@UTQ�̐-�5W1��f"�NPgL�� Xs�$�4�Vp�e`�6�RD�h�r�b��,�:�c@��ԄdDDz���|�cX���Z��`ڎ�"�F��dOAT�rk��Ŕ�K�_�{e     