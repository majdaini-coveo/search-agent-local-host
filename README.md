# Search Agent (Local Coveo UI)

This hosts `index.html` on `http://localhost:3000` and injects it into ABB pages via Tampermonkey.

## Files
- `index.html`: Hosted Atomic UI page.
- `tampermonkey.js`: Userscript that opens the local UI in a drawer on `https://*.abb.com/*`.

## Setup
1) Clone the repo:

```sh
git clone https://github.com/majdaini-coveo/search-agent-local-host.git
cd search-agent-local-host
```

2) Add your API key & Page ID in `index.html`:

```js
accessToken: "_____SEARCH_PAGE_API_KEY___", // Search Page API key
```
```js
pageId: "_____SEARCH_PAGE_ID___",
```
3) Start a local server from the project root:

```sh
npx serve .
```

4) Open `http://localhost:3000` to confirm the page loads.

## Tampermonkey
1) Install the Tampermonkey browser extension.
2) Create a new script and paste the contents of `tampermonkey.js`.
3) Save the script.
4) Visit any `https://*.abb.com/*` page and click **Open Search Agent**.

## Notes
- If you use a different port, update `LOCAL_URL` in `tampermonkey.js`.
- The drawer can be closed with the **X** or the **Esc** key.
