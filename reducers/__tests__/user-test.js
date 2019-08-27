import user, { initialState } from '../user'

const testUser = { username: 'TestUser' }

describe('user Reducer', () => {
  it('has a default state', () => {
    expect(user(undefined, { type: 'unexpected' })).toEqual({
      ...initialState,
    })
  })
  it('can handle FETCH_USER_PENDING', () => {
    expect(user(undefined, { type: 'FETCH_USER_PENDING' })).toEqual({
      ...initialState,
      fetchingUser: true,
    })
  })
  it('can handle FETCH_USER_FULFILLED', () => {
    expect(
      user(undefined, {
        type: 'FETCH_USER_FULFILLED',
        user: testUser,
      }),
    ).toEqual({
      ...initialState,
      fetchingUser: false,
      fetchedUser: true,
      user: testUser,
    })
  })
  it('can handle FETCH_USER_REJECTED', () => {
    expect(user(undefined, { type: 'FETCH_USER_REJECTED' })).toEqual({
      ...initialState,
      fetchingUser: false,
      fetchedUser: false,
    })
  })
  it('can handle UPDATE_USER_PENDING', () => {
    expect(user(undefined, { type: 'UPDATE_USER_PENDING' })).toEqual({
      ...initialState,
      updatingUser: true,
    })
  })
  it('can handle UPDATE_USER_FULFILLED', () => {
    expect(
      user(undefined, {
        type: 'UPDATE_USER_FULFILLED',
        user: testUser,
      }),
    ).toEqual({
      ...initialState,
      user: testUser,
    })
  })
  it('can handle UPDATE_USER_REJECTED', () => {
    expect(user(undefined, { type: 'UPDATE_USER_REJECTED' })).toEqual({
      ...initialState,
      updatingUser: false,
    })
  })
  it('can handle AUTH_LOGOUT', () => {
    expect(
      user(undefined, {
        type: 'AUTH_LOGOUT',
      }),
    ).toEqual({
      ...initialState,
      user: { countries: [] },
    })
  })
})
