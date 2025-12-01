FROM public.ecr.aws/lambda/nodejs:20
#WORKDIR /var/task
COPY package.json package-lock.json ${LAMBDA_TASK_ROOT}/
RUN npm ci
COPY src nest-cli.json tsconfig.build.json tsconfig.json ${LAMBDA_TASK_ROOT}/
COPY .env.production .env
RUN npm run build
CMD ["dist/main-lambda.handler"]
