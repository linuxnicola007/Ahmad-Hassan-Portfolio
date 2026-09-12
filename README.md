# Ahmad Hassan — Portfolio

A static, single-page portfolio site. Plain HTML/CSS/JS — no build step, no
framework, no dependencies beyond two Google Fonts loaded via CDN.

```
├── index.html
├── css/style.css
├── js/main.js
└── assets/
    ├── img/                 → profile photo + favicon
    └── certs/
        ├── flagship/        → LPT (Master) + C|PENT badges, certificate images, verify PDFs
        ├── experience/      → NCCIA completion certificate + appreciation letter
        ├── professional/    → the 14 professional certifications
        └── ctf/             → the 9 CTF certificates
```

## Preview locally

You can just double-click `index.html` and it'll open in your browser — every
asset is linked with a relative path, so nothing needs a server. If you'd
rather run a local server (recommended if you plan to keep editing):

```bash
cd portfolio
python3 -m http.server 8000
# then open http://localhost:8000
```

## Deploy to GitHub Pages

1. Create a new **public** repository on GitHub (e.g. `ahmad-hassan-portfolio`,
   or `<your-username>.github.io` if you want it at the root of your GitHub
   domain).
2. From inside this folder:
   ```bash
   git init
   git add .
   git commit -m "Initial commit: portfolio site"
   git branch -M main
   git remote add origin https://github.com/<your-username>/<repo-name>.git
   git push -u origin main
   ```
3. On GitHub: **Settings → Pages → Source → Deploy from a branch → `main` /
   `root`** → Save.
4. Your site goes live at `https://<your-username>.github.io/<repo-name>/`
   (or `https://<your-username>.github.io/` if you used the special repo
   name above). It can take a minute or two the first time.

A git repository has already been initialized in this folder with an initial
commit, so step 2 above is mostly done for you — you just need to add your
own remote and push.

## Things to customize before you publish

- **Bio copy** — the Hero and About sections are written in first person
  based on what you shared. Read them over and adjust the voice/wording to
  sound like you.
- **Location** — the About section currently just says "Pakistan." Add a
  city if you want to be more specific.
- **Resume** — there's no résumé download button yet. If you want one, drop
  a PDF into `assets/` and add a button next to "Get in touch" in the hero.

Contact details (email, phone, LinkedIn, GitHub, TryHackMe, Discord) are
already filled in under the Contact section — double check they're all
correct before publishing.

## Notes on the certificate images

Every certificate you provided is shown somewhere on the site — the two
flagship EC-Council credentials, both NCCIA documents, all 14 professional
certifications, and all 9 CTF certificates — each compressed for fast
loading (~7 MB total for 29 images). The original, full-resolution files
from your `CTF Certs.zip` and `Pro Certs.zip` aren't bundled into the repo
(to keep it light and fast to clone); keep those zip files somewhere safe as
your archive copies.

Only the two flagship certificates include a downloadable/"Verify PDF" link,
since those are the ones most likely to get checked. If you'd like PDF
download links added for any of the others, just ask.
