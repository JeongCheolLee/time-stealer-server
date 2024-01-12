let envFilePath;
if (process.env.NODE_ENV === 'dev') envFilePath = 'envs/.env.dev';
else if (process.env.NODE_ENV === 'prod') envFilePath = 'envs/.env.prod';
else if (process.env.NODE_ENV === 'test') envFilePath = 'envs/.env.test';

export default envFilePath;
