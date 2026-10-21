# non-fatal by design: token expiry or repo outage must not break public deploys
git clone --depth 1 "https://x-access-token:${COVER_REPO_TOKEN}@github.com/kennethlove/cover-letter.git" .private/ \
  || echo "WARN: private repo fetch failed"
cp .private/resume-extras.html .private/cover-letter.html netlify/edge-functions/ 2>/dev/null || true