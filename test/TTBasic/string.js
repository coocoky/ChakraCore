var x = 'Hello';
var y = 'World';
var empty = '';

WScript.SetTimeout(testFunction, 50);

/////////////////

function testFunction()
{
    telemetryLog(`x: ${x}`, true); //Hello
    telemetryLog(`y: ${y}`, true); //World

    telemetryLog(`empty.length: ${empty.length}`, true); //0
    telemetryLog(`x.length: ${x.length}`, true); //5
    telemetryLog(`x + \' \' + y: ${x + ' ' + y}`, true); //Hello World
}