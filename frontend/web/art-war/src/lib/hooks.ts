import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';
import { RootState } from './types';
import { setUser } from './reducers/userReducer'; 

const mapStateToProps = (state: RootState) => {
  return {
    user: state // Remplacez 'user' par le nom de votre état dans le magasin
  };
};

const mapDispatchToProps = (dispatch: Dispatch) => {
  return bindActionCreators({
     setUser 
  }, dispatch);
};


const hookStore = (component: React.ComponentType<any>) => connect(mapStateToProps, mapDispatchToProps)(component);

export default hookStore;
