import * as types from "./general_action_types";

// ======================================================
const logOut = () => (
    {
        type: types.RESET_APP // more data in root_reducer.js
    })

export const clickLogOut = () => {
    return function (dispatch) {
        dispatch(logOut())
    }
}

// ======================================================

export const saveSeason = (season) => ({
    type: types.SAVE_SEASON,
    payload: season,
});


export const saveSeasonPerUser = (season) => {
    return async function (dispatch) {
        dispatch(saveSeason(season))
    }
}

// ======================================================
//קבלת פרי or שוק מקומי

export const saveSectionName = (section) => ({
    type: types.SECTION_NAME,
    payload: section
})


export const saveSectionNamePerUser = (section) => {
    return async function (dispatch) {
        dispatch(saveSectionName(section))

    }
}
