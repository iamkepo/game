// types.ts (ou tout autre nom de fichier approprié)

import { AuthState, } from './reducers/authReducer';
import { UserState } from './reducers/userReducer';

export interface RootState {
  authReducer: AuthState;
  userReducer: UserState;
  // Ajoutez d'autres états de réducteur si nécessaire
}