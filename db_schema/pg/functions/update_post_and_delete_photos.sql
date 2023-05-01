CREATE OR REPLACE FUNCTION update_post_and_delete_photos(
  _id INT,
  _title VARCHAR(100),
  _from_date DATE,
  _to_date DATE,
  _color VARCHAR(30),
  _delete_photo_ids VARCHAR(400)
) RETURNS table (data json) AS $$
  BEGIN

    UPDATE post
    SET title=_title, from_date=_from_date, to_date=_to_date, color=_color
    WHERE post.id = _id;

    DELETE FROM photo WHERE imgur_delete_hash in (
      SELECT unnest(string_to_array(_delete_photo_ids, ','))
    );


    RETURN QUERY SELECT row_to_json(post) FROM post WHERE post.id = _id;

  END;
$$ LANGUAGE plpgsql;