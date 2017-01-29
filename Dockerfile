FROM nodesource/trusty:latest

RUN apt-get update
RUN apt-get install -y software-properties-common python-software-properties
RUN add-apt-repository ppa:fkrull/deadsnakes-python2.7
RUN apt-get update
RUN apt-get install -y wget libtool pkg-config build-essential autoconf automake libzmq-dev python2.7 libstdc++6

WORKDIR /tmp
RUN git clone git://github.com/jedisct1/libsodium.git && cd libsodium && ./autogen.sh && ./configure && make install && ldconfig && cd .. && rm -rf libsodium

RUN wget https://github.com/zeromq/libzmq/releases/download/v4.2.0/zeromq-4.2.0.tar.gz && tar -xvf zeromq-4.2.0.tar.gz && cd zeromq-* && ./autogen.sh && ./configure && make install && ldconfig && cd .. && rm -rf zeromq*

CMD node -v