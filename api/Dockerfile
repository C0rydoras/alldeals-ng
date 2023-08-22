FROM python:3.11

WORKDIR /app

RUN mkdir -p /app \
    && useradd -u 901 -r alldeals --create-home \
    # all project specific folders need to be accessible by newly created user but also for unknown users (when UID is set manually). Such users are in group root.
    && chown -R alldeals:root /home/alldeals \
    && chmod -R 770 /home/alldeals \
    && apt-get update && apt-get install -y --no-install-recommends \
    && rm -rf /var/lib/apt/lists/* 

# needs to be set for users with manually set UID
ENV HOME=/home/alldeals

ENV PYTHONUNBUFFERED=1
ENV APP_HOME=/app

COPY pyproject.toml poetry.lock $APP_HOME/

#TODO: add --no-dev for prod ENV
RUN pip install -U poetry && poetry config virtualenvs.create false && poetry install

USER alldeals

COPY . $APP_HOME

EXPOSE 8000

CMD /bin/sh -c "uvicorn app:app --host 0.0.0.0"