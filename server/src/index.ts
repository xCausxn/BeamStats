declare const require: any;
import * as Hapi from 'hapi';
import * as Nes from 'nes';

const Good = require('good');

import { RouteConfig } from './routes';
import { Subscriptions } from './subscriptions';
import { Tasks } from './tasks';

const server = new Hapi.Server();
server.connection({
    host: 'localhost',
    port: 8000
});

// Add the routes
server.route(RouteConfig);

// Setup temporary store
server.app.status = {};

// Start the server
server.register([Nes, {
    register: Good,
    options: {
        reporters: {
            console: [{
                module: 'good-squeeze',
                name: 'Squeeze',
                args: [{
                    response: '*',
                    log: '*'
                }]
            }, {
                module: 'good-console'
            }, 'stdout']
        }
    }
}], (err) => {
    if (err) throw err;

    // Add Subscriptions
    for(let i = 0, ii = Subscriptions.length; i<ii; i++) {
        const sub = Subscriptions[i];
        server.subscription(sub.route, sub.params || {});
    }

    // Schedule Tasks
    for(let i = 0, ii = Tasks.length; i<ii; i++) {
        const Task = Tasks[i];
        new Task(server);
    }

    server.start((err) => {
        if (err) throw err;
        server.log('info', 'Server running at: ' + server.info.uri);
    });
});