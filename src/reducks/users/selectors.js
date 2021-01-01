import { createSelector } from "reselect";

const usersSelector = (state) => state.users

// export const getCustomerId = createSelector(
//     [usersSelector],
//     state => state.customer_id
// );

export const getOrdersHistory = createSelector(
    [usersSelector],
    state => state.orders
);

export const getSignedIn = createSelector(
    [usersSelector],
    state => state.isSignedIn
);

export const getUserName = createSelector(
    [usersSelector],
    state => state.userName
);

export const getUserId = createSelector(
    [usersSelector],
    state => state.userId
);

export const getUserRole = createSelector(
    [usersSelector],
    state => state.role
);
export const getOrganizationId = createSelector(
    [usersSelector],
    state => state.organizationId
);
