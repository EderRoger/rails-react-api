FROM ruby:2.3.1

MAINTAINER Eder <eder.roger.souza@gmail.com>
ENV REFRESHED_AT 2016-08-01

#RUN apt-get update -qq && apt-get install -y build-essential
RUN mkdir /app
RUN mkdir -p /app/tmp
WORKDIR /app
ADD Gemfile /app/Gemfile
ADD Gemfile.lock /app/Gemfile.lock
RUN gem install bundler
RUN bundle install
ADD . /app
WORKDIR /app
VOLUME /app/js

#CMD ["rails","server","-b","0.0.0.0"]
