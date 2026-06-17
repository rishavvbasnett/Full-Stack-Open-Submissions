import "dotenv/config";

let MONGODB_URI;

if (
  process.env.NODE_ENV === "production" ||
  process.env.NODE_ENV === "development"
) {
  MONGODB_URI = process.env.MONGODB_URI;
} else if (process.env.NODE_ENV === "test") {
  MONGODB_URI = process.env.TEST_MONGODB_URI;
}

const PORT = process.env.PORT;

export { MONGODB_URI, PORT };
