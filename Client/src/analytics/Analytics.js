import Joi from "@hapi/joi";

/**
 * Send event
 * @param {Object} eventData The event data
 * @param {string} eventData.category The category
 * @param {string} eventData.action The action produced
 * @param {string|undefined} eventData.label The label
 * @param {number|undefined} eventData.value The value
 */
 async function sendEvent(eventData) {
	let schema = Joi.object({
		category: Joi.string().required(),
		action: Joi.string().required(),
		label: Joi.string(),
		value: Joi.number(),
	});

	let validation = schema.validate(eventData);

	if (validation.error) throw validation.error;

	let eventToSend = {
		hitType: "event",
		eventCategory: eventData.category,
		eventAction: eventData.action,
		hitCallback: () => {
		}
	};

	if (eventData.label) eventToSend.eventLabel = eventData.label;

	if (eventData.value) eventToSend.eventValue = eventData.value;

	window.ga("send", eventToSend);
}

export default {
	sendEvent,
};