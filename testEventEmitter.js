"use strict";
// тестируем EventEmitter
Object.defineProperty(exports, "__esModule", { value: true });
var eventEmitter_1 = require("./eventEmitter");
var emitter = new eventEmitter_1.EventEmitter();
// флаги для проверки того, что оба коллбэка были вызваны
var callback1Called = false;
var callback2Called = false;
// первый коллбэк
var listener1 = function (data) {
    console.log('Listener 1 called with data:', data);
    callback1Called = true;
};
// второй коллбэк
var listener2 = function (data) {
    console.log('Listener 2 called with data:', data);
    callback2Called = true;
};
// подписываемся
emitter.on('testEvent', [listener1]);
emitter.on('testEvent', [listener2]);
// иммитируем
emitter.emit('testEvent', { message: 'Hello' });
// тест №1
/*
* Проверяет, что при подписке на 2 коллбэка обы были вызваны при иммитации
* */
if (callback1Called && callback2Called) {
    console.log('Test 1 passed: Both listeners were called.');
}
else {
    console.log('Test 1 failed: Not all listeners were called.');
}
// отпишемся от одного коллбэка
emitter.off('testEvent', listener1);
callback1Called = false;
callback2Called = false;
emitter.emit('testEvent', { message: 'test' });
// тест №2
/*
* Проверяет, что при подписке на 1, один был вызван, а второй нет
* */
if (!callback1Called && callback2Called) {
    console.log('Test 2 passed: Listener 1 was removed, Listener 2 was called.');
}
else {
    console.log('Test 2 failed: Unexpected listener calls.');
}
// тест №3
/*
* Проверяет, что подписать можно сразу несколько слушателей
* */
callback1Called = false;
callback2Called = false;
emitter.off('testEvent', listener2);
emitter.on('testEvent', [listener1, listener2]);
emitter.emit('testEvent', { message: 'test message' });
if (callback1Called && callback2Called) {
    console.log('Test 3 passed: Several listeners available. Both listeners were called.');
}
else {
    console.log('Test 3 failed: Several listeners unavailable.Not all listeners were called.');
}
// тест №4
/*
* Проверяет, что в emit можно передать несколько аргументов
* */
emitter.off('testEvent', listener1);
emitter.off('testEvent', listener2);
callback1Called = false;
callback2Called = false;
emitter.on('testEvent', [listener1, listener2]);
emitter.emit('testEvent', { message: 'test message' }, { user: "Alexey Ershov" });
if (callback1Called && callback2Called) {
    console.log('Test 4 passed: Emit can take several args. Both listeners were called.');
}
else {
    console.log('Test 4 failed: Emit cant take several args.Not all listeners were called.');
}
// тест №5
/*
* Проверяет, что программа не ломается если такого обработчика не нашлось
* */
var listener3 = function () {
    console.log("Listener who was not subscribed");
};
try {
    emitter.off('testEvent', listener3);
    console.log('Test 5 passed: Deleting unsubscribed listener');
}
catch (e) {
    console.log("Test 5 failed: Deleting unsubscribed listener - error: ".concat(e));
}
