import { PORT } from "./utils/config.js";
import app from "./app.js";
import { info, error } from "./utils/logger.js";

app.listen(PORT, () => info("Server running on PORT", PORT));
