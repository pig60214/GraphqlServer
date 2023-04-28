# GraphqlServer

## About Imgur
### access token
1. Call this api in brower: https://api.imgur.com/oauth2/authorize?client_id={{client_id}}&response_type=token, and would get ```refresh_token```
2. Call this api in postman: https://api.imgur.com/oauth2/token. Would need ```refresh_token```, ```client_id```, ```client_secret```
3. it expires after 1 month.
