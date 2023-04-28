CREATE TABLE Photo (
   id SERIAL PRIMARY KEY,
   post_id INT,
   caption VARCHAR(50) NOT NULL,
   imgur_link VARCHAR(50) NOT NULL,
   imgur_delete_hash VARCHAR(50) NOT NULL,

   CONSTRAINT fk_post
      FOREIGN KEY(post_id)
	  REFERENCES Post(id)
);