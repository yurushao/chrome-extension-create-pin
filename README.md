# chrome-extension-create-pin

This repo demonstrates how you can create a Pin using Pinterest v5 API in a Chrome extension.

The demo uses a sandbox access token and calls api-sandbox.pinterest.com. In production, please follow https://developers.pinterest.com/docs/getting-started/authentication/ to generate an access token through OAuth 2.0.

# JavaScript example for generating access token from an authorization code

```
const appId = "YOUR_APP_ID";
const appSecretKey = "YOUR_APP_SECRET";
const authorizationCode = "YOUR_AUTHORIZAITON_CODE";

const basicAuth = btoa(`${appId}:${appSecretKey}`);

const url = 'https://api.pinterest.com/v5/oauth/token';
const headers = new Headers({
  'Authorization': `Basic ${basicAuth}`,
  'Content-Type': 'application/x-www-form-urlencoded'
});

const data = new URLSearchParams();
data.append('grant_type', 'authorization_code');
data.append('code', authorizationCode);
data.append('redirect_uri', 'http://localhost/');

fetch(url, {
  method: 'POST',
  headers: headers,
  body: data
})
  .then(response => response.text())
  .then(result => console.log(result))
  .catch(error => console.log('Error:', error));
```
