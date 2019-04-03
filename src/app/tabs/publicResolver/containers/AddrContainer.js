import { PublicResolverFieldComponent } from '../components';
import { connect } from 'react-redux';
import { changeViewAddr } from '../actions';
import { getAddr, setAddr } from '../operations';

const mapStateToProps = state => ({
  domain: state.auth.domain,
  getting: state.publicResolver.addr.getting,
  value: state.publicResolver.addr.value,
  editOpen: state.publicResolver.addr.editOpen,
  editting: state.publicResolver.addr.editting
});

const mapDispatchToProps = dispatch => ({
  get: domain => dispatch(getAddr(domain)),
  changeEdit: () => dispatch(changeViewAddr()),
  set: (domain, value) => dispatch(setAddr(domain, value))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PublicResolverFieldComponent);