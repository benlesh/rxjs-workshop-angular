const Rx = require('rxjs');

const Subject = Rx.Subject;

// Create a Subject

// Subscribe to it and send a few values
// as a bonus, subcsribe twice to see what happens
// NOTE: If you're not subscribed before you `next`, it will not push
// those values through to your handlers, because it doesn't know about them yet

// Complete the Subject and see what happens when you try to next
