import React, {PureComponent} from 'react'
import './style.css'

export default class ChangeForm extends PureComponent {
      constructor(props) {
      super(props);
      this.state = {title: '',  description: ''};
      this.handleInputChange = this.handleInputChange.bind(this);
    }
    handleInputChange(event) {
      const value = event.target.value;
      const name = event.target.name;

      this.setState({
        [name]: value
      });
    }
    clearFields(){
      this.setState(state => ({
        title: '',
        description: '',
      }));
    }
    componentDidUpdate(prevProps) {
        if (this.props.item && !prevProps.item) {
          this.setState(state => ({
            title: this.props.item.title,
            description: this.props.item.description,
          }));
        }
    }
    render() {
      const {onAddClick, item} = this.props
      return  (
        <div className="">
          <h2 className="display-5 text-center">
            New Announcement
          </h2>
          <form className="justify-content-center form-inline"
            onSubmit={(e)=>{onAddClick(e, this.state.title, this.state.description, item);
            this.clearFields()}}>
              <label className="marginLeft" htmlFor="add-title">
                Title
              </label>
              <input className="marginLeft"
                id="add-title"
                name="title"
                onChange={this.handleInputChange}
                value={this.state.title}/>
              <label className="marginLeft" htmlFor="add-description">
                Description
              </label>
              <input className="marginLeft"
                id="add-description"
                name="description"
                onChange={this.handleInputChange}
                value={this.state.description}/>
              <button className="btn btn-primary marginLeft">
                {item? "Edit":"Add"}
              </button>
          </form>
        </div>
      )
    }
}
