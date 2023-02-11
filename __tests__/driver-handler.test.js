const { QUEUES } = require('../utils');
const { delivered, handlePickUp } = require('../driver/handler');

jest.useFakeTimers();

describe('Driver tests', () => {
  test('Driver Pick Up', () => {
    // arrange
    const emitMock = jest.spyOn(events, 'emit');

    // act
    handlePickUp();

    // timers - skip setTimeout
    jest.runAllTimers();

    //assert
    expect(emitMock).toHaveBeenCalledWith(EVENT_NAMES.delivered, '12345');
  });

  test('Driver Delivery', () => {
    // arrange
    const emitMock = jest.spyOn(events, 'emit');
    // act
    delivered('12345');
    // assert
    expect(emitMock).toHaveBeenCalledWith(EVENT_NAMES.delivered, '12345');
  });
});
