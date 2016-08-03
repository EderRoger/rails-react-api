FROM nginx:1.10.1

MAINTAINER Eder <eder.roger.souza@gmail.com>
ENV REFRESHED_AT 2016-08-01

RUN apt-get update \
 && apt-get install -y -q --no-install-recommends \
    wget \
    git \
    vim \
 && apt-get clean \
 && rm -r /var/lib/apt/lists/*

RUN mkdir -p /var/www/html/website
RUN mkdir -p /var/nginx/cache
RUN mkdir -p /var/log/nginx
RUN mkdir -p /var/www/html/website/app/

ADD conf.d/* /etc/nginx/conf.d/
ADD nginx.conf /etc/nginx/nginx.conf
