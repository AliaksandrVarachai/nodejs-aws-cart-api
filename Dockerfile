FROM public.ecr.aws/lambda/nodejs:20
#WORKDIR /var/task
COPY src .env nest-cli.json package.json package-lock.json tsconfig.build.json tsconfig.json ${LAMBDA_TASK_ROOT}
RUN npm install && npm run build
CMD ["dist/main-lambda.handler"]
