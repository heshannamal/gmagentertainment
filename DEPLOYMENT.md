# Deployment guide

Branch: `website-deploy`.

The site requires its root HTML files, `css/style.css`, `js/site.js`, and all `assets/*` images. Do **not** deploy this branch until the complete site package has been pushed.

For Namecheap cPanel: clone `https://github.com/heshannamal/gmagentertainment.git` outside `public_html`, check out `website-deploy`, adjust `DEPLOYPATH` in `.cpanel.yml` if the domain document root is not `$HOME/public_html`, then run **Update from Remote** and **Deploy HEAD Commit**.

The full website package is available as `G-MAGe-Cinematic-Gold-Website-Final.zip` in the associated ChatGPT conversation. Extract it and place its *contents* at the repository root (do not commit the ZIP).
