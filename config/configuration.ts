export default () => ({
  port: process.env.PORT || 3000,
  baseDomain: process.env.BASE_DOMAIN,
  instagramClientId: process.env.INSTAGRAM_CLIENT_ID,
  instagramClientSecret: process.env.INSTAGRAM_CLIENT_SECRET,
  twitterClientId: process.env.TWITTER_CLIENT_ID,
  twitterClientSecret: process.env.TWITTER_CLIENT_SECRET,
  museumLoginUrl: process.env.MUSEUM_LOGIN_URL,
  adminLoginUrl: process.env.ADMIN_LOGIN_URL,
  database: {
    host: process.env.DATABASE_HOST,
  },
});