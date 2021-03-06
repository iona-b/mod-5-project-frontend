import React from 'react';
import { connect } from 'react-redux';
import { fetchRelaxationCategories } from '../actions/fetchRelaxationCategories'
import { addUserRelaxationCategory } from '../actions/addUserRelaxationCategory'

class ChooseRelaxationCategories extends React.Component {

    state = {
        relaxationCategory1: '',
        relaxationCategory2: '',
        relaxationCategory3: ''
    };
    
    componentDidMount() {
      this.props.fetchRelaxationCategories()
    }

    componentDidUpdate() {
      if (this.props.relaxationCategories.length>2 && this.state.relaxationCategory1 === '' && this.state.relaxationCategory2 === '' && this.state.relaxationCategory3 === '') {
        this.setState({
          relaxationCategory1: this.props.relaxationCategories[0].category_name,
          relaxationCategory2: this.props.relaxationCategories[0].category_name,
          relaxationCategory3: this.props.relaxationCategories[0].category_name
        })
      }
    }
     
    handleChange = event => {
        this.setState({
          [event.target.name]: event.target.value
        });
    };
     
    handleSubmit = () => {
      let relaxationCategoriesArray = [this.state.relaxationCategory1, this.state.relaxationCategory2, this.state.relaxationCategory3]
      relaxationCategoriesArray.forEach (relaxationCategory => {
        let category = this.props.relaxationCategories.filter(category => category.category_name === relaxationCategory)
        this.props.addUserRelaxationCategory(this.props.user.id, category[0])
      })
    };


    render() {

        return (

            <div className="choose-relaxation-categories-form">
              <h2 className="form-headers">Select 3 Relaxation Categories</h2>
              <p>In order to help us create a schedule which truly suits your needs, please let us know what type of activities help you relax.</p>
              <select name="relaxationCategory1" className="input-fields" onChange={this.handleChange}>{this.props.relaxationCategories.map(relaxationCategory => <option key="1">{relaxationCategory.category_name}</option>)}</select><br></br>
              <select name="relaxationCategory2" className="input-fields" onChange={this.handleChange}>{this.props.relaxationCategories.map(relaxationCategory => <option key="2">{relaxationCategory.category_name}</option>)}</select><br></br>
              <select name="relaxationCategory3" className="input-fields" onChange={this.handleChange}>{this.props.relaxationCategories.map(relaxationCategory => <option key="3">{relaxationCategory.category_name}</option>)}</select><br></br>
              <button className="buttons" onClick={this.handleSubmit}>Confirm</button>
            </div>

          );
          
    }
  
}

const mapStateToProps = state => {
  return {
    user: state.userReducer.user,
    relaxationCategories: state.userReducer.allRelaxationCategories
  }
}
 
const mapDispatchToProps = dispatch => {
  return {
    fetchRelaxationCategories: (userId, relaxationCategoryId) => dispatch(fetchRelaxationCategories(userId, relaxationCategoryId)),
    addUserRelaxationCategory: (userId, relaxationCategoryId) => dispatch(addUserRelaxationCategory(userId, relaxationCategoryId)),
  };
};
 
export default connect(mapStateToProps, mapDispatchToProps)(ChooseRelaxationCategories);