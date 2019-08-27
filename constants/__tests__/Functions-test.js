import { Share } from 'react-native'
import * as functions from '../Functions'
import store from '../../reducers/index'

describe('handleShare tests', () => {
  it('shares', async () => {
    spy = jest.spyOn(Share, 'share')
    await functions.handleShare('ThyN5Mk3')
    expect(spy).toHaveBeenCalledTimes(1)
  })
})

describe('handleFavorite tests', () => {
  it('dispatches', async () => {
    spy = jest.spyOn(store, 'dispatch')
    await functions.handleFavorite(1)
    expect(spy).toHaveBeenCalledTimes(1)
  })
})
