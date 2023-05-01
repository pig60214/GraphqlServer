CREATE OR REPLACE FUNCTION get_posts(_from_date DATE, _to_date DATE) RETURNS post_with_photo  AS $$
DECLARE
  posts post_with_photo;
  BEGIN

    SELECT json_agg(post) INTO posts.posts FROM post
	WHERE
		(_from_date <= post.from_date AND post.from_date <= _to_date) OR
		(_from_date <= post.to_date AND post.to_date <= _to_date) OR
		(_from_date <= post.from_date AND post.to_date <= _to_date) OR
		(post.from_date <= _from_date AND _to_date <= post.to_date);

    SELECT json_agg(photo) INTO posts.photos FROM photo
    WHERE post_id in (
		SELECT id FROM post 
		WHERE
			(_from_date <= post.from_date AND post.from_date <= _to_date) OR
			(_from_date <= post.to_date AND post.to_date <= _to_date) OR
			(_from_date <= post.from_date AND post.to_date <= _to_date) OR
			(post.from_date <= _from_date AND _to_date <= post.to_date)
	);

    RETURN posts;
  END;
$$ LANGUAGE plpgsql;