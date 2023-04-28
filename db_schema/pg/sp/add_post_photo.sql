CREATE OR REPLACE PROCEDURE add_post_photo(
   _post_id int,
   _caption VARCHAR(50),
   _imgur_link VARCHAR(50),
   _imgur_delete_hash VARCHAR(50)
)
language plpgsql
as $$
begin
    INSERT INTO photo(post_id, caption, imgur_link, imgur_delete_hash)
	VALUES (_post_id, _caption, _imgur_link, _imgur_delete_hash);

    commit;
end;$$