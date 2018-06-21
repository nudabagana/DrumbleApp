import {messageTypes} from '../constants/websocket.js';

const initialState = {
  loggedIn: false,
  userId:"",
  roomId:"",
  displayName:"",
  roomExists: false,
  annonymous: true,
  errorMsg: "",
  registerStatus: "inactive", // inactive|ok|error
  correctAnswArr: [],
  ranking: "",
  answers: [],
  roomJoinedStatus: false,
  backToHome: false,
  gameStarted: false,
  timer: 0,
  nextQuestion: false,
  showScoreStatus: "inactive", // inactive|ok|error
  serverTime: new Date(),
  correctAnswerReceived: false,
  showError: false,
};

const SocketReducer = (state = initialState, action) => {
  switch (action.type) {
    case messageTypes.roomExist:
      if (action.payload.annonymous)
      {
        if (action.payload.status == "OK")
        {
          return { ...state, annonymous: true, roomExists: true, roomId: action.payload.id };
        }
        else if (action.payload.status == "inactive")
        {
          return { ...state,  roomExists: false, errorMsg: "Room is not active.", showError: true };
        }
        if (action.payload.status == "notExists")
        {
           return { ...state,  roomExists: false, errorMsg: "Room does not exist.", showError: true };
        }
      }
      else
      {
        if (action.payload.status == "OK")
        {
          return { ...state, annonymous: false, roomExists: true, roomId: action.payload.id};
        }
        else if (action.payload.status == "inactive")
        {
          return { ...state,  roomExists: false, errorMsg: "Room is not active.", showError: true };
        }
        if (action.payload.status == "notExists")
        {
           return { ...state,  roomExists: false, errorMsg: "Room does not exist.", showError: true };
        }
      }
    case messageTypes.registerResponse:
      console.log("RESPONSE: " + action.payload);
      if (action.payload == false)
      {
         return { ...state,  registerStatus: "error", errorMsg: "Incorrect Email.", showError: true };
      }
      else if (action.payload == true)
      {
         return { ...state,  registerStatus: "ok"};
      }
    case messageTypes.logInInfo:
    if (action.payload.success == false)
    {
       return { ...state, errorMsg: "Incorrect Hash.", showError: true };
    }
    else if (action.payload.success == true)
    {
       return { ...state,  loggedIn: true, userId: action.payload.id};
    }
    case messageTypes.correct:
        return { ...state, correctAnswArr: action.payload, correctAnswerReceived: true };
    case messageTypes.currentRanking:
      return { ...state, ranking: action.payload.place};
    case messageTypes.roomQuestions:
      if (action.payload.roomId == state.roomId)
      {
         return { ...state, answers: action.payload.qi, gameStarted: true, nextQuestion: true};
      }
    case messageTypes.roomJoined:
        if (action.payload.status)
        {
            return { ...state, roomJoinedStatus: action.payload.status, errorMsg: action.payload.error};
        }
        else
        {
            return { ...state, roomJoinedStatus: action.payload.status, errorMsg: action.payload.error, backToHome: true, showError: true};
        }
      case messageTypes.showFinalScore:
        if (action.payload.roomId == state.roomId)
        {
           return { ...state, showScoreStatus: "ok"};
        }
      case messageTypes.serverTime:
        if (action.payload.roomId == state.roomId)
        {
           return { ...state, serverTime: action.payload.time};
        }
      case 'SET_ROOM_JOINED':
        return { ...state, roomJoinedStatus: action.payload.status};
      case 'SET_NEXT_QUESTION':
        return { ...state, nextQuestion: action.payload.status};
      case 'SET_ROOM_EXISTS':
        return { ...state, roomExists: action.payload.status};
      case 'SET_GAME_STARTED':
        return { ...state, gameStarted: action.payload.status};
      case 'SET_BACK_TO_HOME':
        return { ...state, backToHome: action.payload.status};
      case 'SET_ROOM_ID':
        return { ...state, roomId: action.payload.status};
      case 'SET_REGISTER_STATUS':
        return { ...state, registerStatus: action.payload.status};
      case 'SET_SHOW_SCORE_STATUS':
        return { ...state, showScoreStatus: action.payload.status};
      case 'SET_CORRECT_ANSWER_RECEIVED':
        return { ...state, correctAnswerReceived: action.payload.status};
      case 'SET_SHOW_ERROR':
        return { ...state, showError: action.payload.status};
    default:
      return state;
  }
};

export default SocketReducer;
