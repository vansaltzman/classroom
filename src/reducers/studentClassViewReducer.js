import actionTypes from "../actions/types.js";
import axios from "axios";

export function studentClassViewReducer(
  state = {
    classes: []
  },
  action
) {
  switch (action.type) {
    case actionTypes.GET_CLASSES_BELONG_TO_A_STUDENT_ACTION:
			//console.log("action.classes at reducers", action.classes);
			const classes = action.classes.slice();
			for (var i = 0; i < classes.length; i++) {
				classes[i].isLive = false
				// classes[i].color = "lightCoral"
			}
      return { ...state, classes: classes };
    case actionTypes.UPDATE_STUDENT_TARGET_CLASS_ACTION:
			const targetClass = action.targetClass;
			return { ...state, targetClass: action.targetClass };
		case actionTypes.WATCH_CLASS_GO_LIVE_ACTION:

			const classesFromAction = action.classes;
			const updatedClasses = state.classes.slice()

			updatedClasses.forEach(eachClass => {
				console.log('eachClass ------> ', eachClass)
				if (classesFromAction && classesFromAction.hasOwnProperty(eachClass.class_id)) {
					eachClass.isLive = true
				} else {
					eachClass.isLive = false
				}
			})
			return {...state, classes: updatedClasses}
		case actionTypes.TOGGLE_STUDENT_LIVE_STATUS:
			return {...state}
		case actionTypes.UPDATE_CLASS_DATA_STUDENT:
			console.log('action.classData', action.classData)
			return {...state, targetClass: action.classData}
		
    default:
      return state;
  }
}
