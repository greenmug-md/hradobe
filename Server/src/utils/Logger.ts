import winston, { format } from "winston";

const ownFormat = format.combine(
	format.timestamp(),
	format.errors({ stack: true }),
	format.metadata(),
	format.json(),
	format.prettyPrint(),
)

const logger = winston.createLogger({
	format: ownFormat
});

if (process.env.NODE_ENV !== "production") {
	logger.add(
		new winston.transports.Console()
	);
}

export default logger;