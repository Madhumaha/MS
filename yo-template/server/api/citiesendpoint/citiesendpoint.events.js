/**
 * Citiesendpoint model events
 */

'use strict';

import {EventEmitter} from 'events';
import Citiesendpoint from './citiesendpoint.model';
var CitiesendpointEvents = new EventEmitter();

// Set max event listeners (0 == unlimited)
CitiesendpointEvents.setMaxListeners(0);

// Model events
var events = {
  'save': 'save',
  'remove': 'remove'
};

// Register the event emitter to the model events
for (var e in events) {
  var event = events[e];
  Citiesendpoint.schema.post(e, emitEvent(event));
}

function emitEvent(event) {
  return function(doc) {
    CitiesendpointEvents.emit(event + ':' + doc._id, doc);
    CitiesendpointEvents.emit(event, doc);
  }
}

export default CitiesendpointEvents;
