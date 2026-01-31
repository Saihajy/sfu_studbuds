Steps to deploy this Spring Boot app to Render

1) Commit and push these files to the `studentdb` branch

```bash
cd /Users/raeen/Documents/studbuds_main/sfu_studbuds
git add .dockerignore render.yaml RENDER.md
git commit -m "chore: add render deployment helper files"
git push origin studentdb
```

2) On Render.com
- Sign in and click New -> Import from GitHub
- Choose the `Saihajy/sfu_studbuds` repo and the `studentdb` branch
- Render should detect the `Dockerfile`. Choose "Docker" environment (or let it use the Dockerfile). Leave build/start commands blank since the Dockerfile builds and runs the jar.
- Leave port blank; Render will set $PORT. Your app already uses `server.port=${PORT:8080}` so it will bind properly.
- Click Create Web Service.

3) Optional DB
- By default H2 (in-memory) is available and the app should start without external DB.
- If you want persistent Postgres, create a Render Postgres instance and add these env vars to your web service:
  SPRING_DATASOURCE_URL=jdbc:postgresql://<HOST>:<PORT>/<DB>
  SPRING_DATASOURCE_USERNAME=<user>
  SPRING_DATASOURCE_PASSWORD=<pw>

4) Monitor
- Watch the build and live logs on Render. If the build fails, copy and paste logs here and I'll help diagnose.

Troubleshooting tips
- If build fails due to Maven/Java, the Dockerfile already uses Maven + Java 17 so Render's Docker build should succeed.
- If you want to test locally without installing Maven, install Docker Desktop and run:

```bash
cd /Users/raeen/Documents/studbuds_main/sfu_studbuds
docker build -t sfustudbuds .
docker run -p 8080:8080 -e PORT=8080 sfustudbuds
# then open http://localhost:8080
```

If you want, I can commit these files for you (I can't push to your remote). After you push, tell me when Render starts building and paste any errors and I'll fix them.
