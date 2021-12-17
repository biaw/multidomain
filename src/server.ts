import { config } from "dotenv";
import initApp from "./app";
import { join } from "path";

// initialize and test environment
config();
if (!process.env.PORT) throw new Error("No PORT specified");

// initialize application
const app = initApp(join(__dirname, "..", process.env.CONTENT_FOLDER || "content"), undefined, process.env.COMMON_FOLDER);

// eslint-disable-next-line no-console
app.listen(process.env.PORT, () => console.log(`Listening on port ${process.env.PORT}`));
