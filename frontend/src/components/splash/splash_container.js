import { connect } from 'react-redux';
import { fetchCafeByFilters } from '../../actions/cafe_actions';
import Splash from './splash';
import { getFilters } from '../../actions/filter_actions';

const mSTP = state => ({
    cafes: state.entities.cafes,
    filters: state.entities.filters
    // user: state.session.user
})

const mDTP = dispatch => {
    return {
      fetchCafeByFilters: filters => dispatch(fetchCafeByFilters(filters)),
      getFilters: filters => dispatch(getFilters(filters)),
      
    };
  };

export default connect(
    mSTP, mDTP
)(Splash);