require('dotenv').config();
const serverPort = process.env.SERVER_PORT || 3001;
const mongodbURL=process.env.MONGODB_ATLAS_URL
const defaultImagePath = process.env.DEFAULT_USER_IMAGE_PATH || 'public/images/users/default.png';
const googleClientId = '843668834047-eolpo5r3evr8kk94l93rvbjju14t4nge.apps.googleusercontent.com';
const googleClientSecret = process.env.GOOGLE_CLIENT_SECRET;

module.exports = { serverPort, mongodbURL, defaultImagePath, googleClientId, googleClientSecret };
