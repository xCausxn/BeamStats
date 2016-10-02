export const getFullStatus = (request, reply) => {
    return reply(request.server.app.status);
}