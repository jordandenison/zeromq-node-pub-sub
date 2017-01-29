FROM jordandenison/unz:latest

ADD package.json /opt/app/package.json

RUN npm i -g nodemon

WORKDIR /opt/app
RUN npm i
ADD . /opt/app

ENV PORT 5555
EXPOSE 5555

CMD npm run start-dev
