CREATE OR REPLACE FUNCTION get_posts(_from_date DATE, _to_date DATE) RETURNS post_with_photo  AS $$
DECLARE
  posts post_with_photo;
  BEGIN

    SELECT 
      json_agg(post),
      json_agg(photo)
    INTO posts
    FROM post INNER JOIN photo ON post.id = photo.post_id
    WHERE post.from_date >= _from_date AND post.from_date <= _to_date;

    RETURN posts;
  END;
$$ LANGUAGE plpgsql;