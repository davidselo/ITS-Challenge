const ordersApp = require('../myApp');

describe('Test someComplexFunction', () => {
  test('Console log should have been called', () => {
    const logSpy = jest.spyOn(global.console, 'log');

    ordersApp();

    expect(logSpy).toHaveBeenCalled();
    expect(logSpy).toHaveBeenCalledTimes(1);
    expect(logSpy).toHaveBeenCalledWith('Hello ITS world!');

    logSpy.mockRestore();
  });
});
