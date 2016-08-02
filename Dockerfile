FROM ruby:2.3.1

MAINTAINER Eder <eder.roger.souza@gmail.com>
ENV REFRESHED_AT 2016-08-01

RUN apt-get update -qq && apt-get install -y build-essential patch libpq-dev qt5-default libqt5webkit5-dev gstreamer1.0-plugins-base gstreamer1.0-tools gstreamer1.0-x ruby-dev zlib1g-dev liblzma-dev
RUN mkdir /app
RUN mkdir -p /app/tmp
WORKDIR /app
ADD Gemfile /app/Gemfile
ADD Gemfile.lock /app/Gemfile.lock
RUN gem update --system
RUN gem install bundler
RUN bundle install --without development test
ADD . /app
