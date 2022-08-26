DROP DATABASE IF EXISTS sdc;

create DATABASE sdc;

\c sdc;

create table products (
  id int PRIMARY KEY,
  name text,
  slogan text,
  description text,
  category text,
  default_price money
);

create table features (
  id int not null PRIMARY KEY,
  product_id int,
  feature text,
  value text,
  FOREIGN KEY (product_id) REFERENCES products(id)
);

create table styles (
  id int not null PRIMARY KEY,
  product_id int,
  name text,
  sale_price money,
  original_price money,
  default_style boolean,
  FOREIGN KEY (product_id) REFERENCES products(id)
);

create table photos (
  id int not null PRIMARY KEY,
  style_id int,
  url text,
  thumbnail_url text,
  FOREIGN KEY (style_id) REFERENCES styles(id)
);

create table skus (
  id int not null PRIMARY KEY,
  style_id int,
  size text,
  quantity int,
  FOREIGN KEY (style_id) REFERENCES styles(id)
);

create table related (
  id int not null PRIMARY KEY,
  product_id int,
  related_id int,
  FOREIGN KEY (product_id) REFERENCES products(id)
);

copy products from '/Users/amrindersingh/Downloads/product.csv' delimiter ',' csv header;
copy features from '/Users/amrindersingh/Downloads/features.csv' delimiter ',' csv header;
copy styles from '/Users/amrindersingh/Downloads/styles.csv' delimiter ',' csv header;
copy photos from '/Users/amrindersingh/Downloads/photos.csv' delimiter ',' csv header;
copy skus from '/Users/amrindersingh/Downloads/skus.csv' delimiter ',' csv header;
copy related from '/Users/amrindersingh/Downloads/related.csv' delimiter ',' csv header;

create index features_product_id on features(product_id);
create index styles_product_id on styles(product_id);
create index photos_style_id on photos(style_id);
create index skus_style_id on skus(style_id);
create index related_product_id on related(product_id);

-- mysql -u root < db/schema.sql (NEED TO FIND POSTGRESQL COMMAND)
-- \i /Users/amrindersingh/hrrpp36/SDC/amrinder-service/db/schema.sql (<--PATH OF FILE)