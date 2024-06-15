FROM node:14

# change the ownership of /home/node/app to the user node and group node
RUN mkdir -p /home/node/app/node_moodules && chown -R node:node /home/node/app

WORKDIR /home/node/app

COPY package*.json ./

# to ensure that all the application files are ownerd by the non-root user (node user)
USER node 

RUN npm install

# copy all the file in src and set the appropriate permission
COPY --chown=node:node . .

EXPOSE 3000

CMD ["npm", "start"]