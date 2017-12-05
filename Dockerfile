ARG node_version
FROM nodetestbench_agent as build
FROM node:$node_version

WORKDIR /usr/src/app
COPY . .
COPY --from=build /usr/src/agent/target/*.tgz .
RUN npm install
RUN npm install node_contrast*tgz
ENV DEBUG=contrast:*
CMD ["npm", "run", "contrast", "--", "--uri", "http://docker.for.mac.localhost:19080"]
# CMD ["node", "--inspect", "node_modules/node_contrast/", "index.js", "--uri", "http://docker.for.mac.localhost:19080"]

# original dockerfile for just app
# FROM node:$node_version
# WORKDIR /usr/src/app
# COPY . .
# RUN npm install
# EXPOSE 3000
# CMD ["npm", "start"]
