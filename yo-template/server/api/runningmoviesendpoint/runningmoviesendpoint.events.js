/**
 * Runningmoviesendpoint model events
 */

'use strict';

import {EventEmitter} from 'events';
import Runningmoviesendpoint from './runningmoviesendpoint.model';
var RunningmoviesendpointEvents = new EventEmitter();

// Set max event listeners (0 == unlimited)
RunningmoviesendpointEvents.setMaxListeners(0);

// Model events
var events = {
  'save': 'save',
  'remove': 'remove'
};

// Register the event emitter to the model events
for (var e in events) {
  var event = events[e];
  Runningmoviesendpoint.schema.post(e, emitEvent(event));
}

function emitEvent(event) {
  return function(doc) {
    RunningmoviesendpointEvents.emit(event + ':' + doc._id, doc);
    RunningmoviesendpointEvents.emit(event, doc);
  }
}

export default RunningmoviesendpointEvents;
