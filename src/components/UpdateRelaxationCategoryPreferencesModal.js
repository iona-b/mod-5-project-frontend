import React from "react";
import { connect } from 'react-redux';
import { fetchRelaxationCategories } from '../actions/fetchRelaxationCategories'
import { updateUserRelaxationCategory } from '../actions/updateUserRelaxationCategory'
import { deleteOldRelaxationPreferences } from '../actions/deleteOldRelaxationPreferences'

class UpdateRelaxationPreferencesModal extends React.Component {

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
     
    handleSubmit = event => {
      this.props.user.user_relaxation_categories.forEach (category => this.props.deleteOldRelaxationPreferences(category))
      let relaxationCategoriesArray = [this.state.relaxationCategory1, this.state.relaxationCategory2, this.state.relaxationCategory3]
      relaxationCategoriesArray.forEach (relaxationCategory => {
        let category = this.props.relaxationCategories.filter(category => category.category_name === relaxationCategory)
        this.props.updateUserRelaxationCategory(this.props.user.id, category[0])
      })
      this.props.handleClick(event)
    };

    render() {

        return (

          <div>
            <button className="buttons back-buttons" name="showUpdateRelaxationCategoryPreferences" onClick={this.props.handleClick}>⬅</button>
              <div className="form-containers centred-divs">
                <div className="choose-relaxation-categories-form">
                  <h2 className="form-headers">Select 3 Relaxation Categories</h2>
                  <select name="relaxationCategory1" className="input-fields" onChange={this.handleChange}>{this.props.relaxationCategories.map(relaxationCategory => <option key={relaxationCategory.id}>{relaxationCategory.category_name}</option>)}</select><br></br>
                  <select name="relaxationCategory2" className="input-fields" onChange={this.handleChange}>{this.props.relaxationCategories.map(relaxationCategory => <option key={relaxationCategory.id}>{relaxationCategory.category_name}</option>)}</select><br></br>
                  <select name="relaxationCategory3" className="input-fields" onChange={this.handleChange}>{this.props.relaxationCategories.map(relaxationCategory => <option key={relaxationCategory.id}>{relaxationCategory.category_name}</option>)}</select><br></br>
                  <button name="showUpdateRelaxationCategoryPreferences" className="buttons" onClick={this.handleSubmit}>Confirm</button>
                </div>
              </div>
            </div>

        )

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
    updateUserRelaxationCategory: (userId, relaxationCategoryId) => dispatch(updateUserRelaxationCategory(userId, relaxationCategoryId)),
    deleteOldRelaxationPreferences: (category) => dispatch(deleteOldRelaxationPreferences(category))
  };
};
 
export default connect(mapStateToProps, mapDispatchToProps)(UpdateRelaxationPreferencesModal);