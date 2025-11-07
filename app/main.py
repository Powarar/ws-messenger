from fastapi import FastAPI
from fastapi.staticfiles import StaticFiles
from api.router_page import router as router_page
from api.router_socket import router as router_socket

import uvicorn

app = FastAPI()

# Подключаем папку со статическими файлами
app.mount('/static', StaticFiles(directory='app/static'), 'static')

# Регистрируем маршруты
app.include_router(router_socket)
app.include_router(router_page)





# import subprocess
# subprocess.Popen(["cloudflared", "tunnel", "--url", "http://localhost:8000"])

if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000)
