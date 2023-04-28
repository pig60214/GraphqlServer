CREATE OR REPLACE FUNCTION add_post(_title VARCHAR(100), _from_date DATE, _to_date DATE, _color VARCHAR(30)) RETURNS SETOF post AS $$
DECLARE
  _id INT;
  BEGIN

    INSERT INTO post(title, from_date, to_date, color)
	  VALUES (_title, _from_date, _to_date, _color)
    RETURNING id INTO _id;

    RETURN QUERY SELECT * FROM post
    WHERE post.id = _id;

  END;
$$ LANGUAGE plpgsql;