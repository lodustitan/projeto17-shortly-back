export default function verifySchema(schema, obj){
    const validation = schema.validate(obj, {abortEarly: false});

    if (validation.error) {
        const messages = validation.error.details.map(details => details.message);
        return messages;
    }
    return false;
}