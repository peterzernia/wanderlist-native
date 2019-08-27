import * as globalActions from '../globalActions'

describe('globalAction Creator', () => {
  it('should create a SET_STATE action', () => {
    const globalState = { test: 'Test' }
    const expectedAction = {
      type: 'SET_STATE',
      globalState,
    }
    expect(globalActions.setState(globalState)).toEqual(expectedAction)
  })
})
