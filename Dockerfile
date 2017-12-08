ARG node_version

FROM nodetestbench_agent as build
FROM node:$node_version

WORKDIR /usr/src/app
COPY . .
RUN npm install
COPY --from=build /usr/src/agent/target/*.tgz .
RUN npm install node_contrast*tgz
CMD npm run contrast -- \
--skipAutoUpdate --appActivityPeriod 6000 --mute \
--appname NodeTestBench-${NODE_VERSION} \
--apiKey ${API_KEY} --uri ${TEAMSERVER_URI}
