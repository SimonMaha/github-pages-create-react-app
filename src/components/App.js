import React, {PureComponent} from 'react'
import AnnouncementList from './AnnouncementList'
import ChangeForm from './ChangeForm'
import 'bootstrap/css/bootstrap.css'
import './style.css'
import nextId from 'react-id-generator'

class App extends PureComponent {
      constructor(props) {
      super(props);
      this.state = { announcements: [], editedItem: null, searchValue: ""};
      this.handleSubmit = this.handleSubmit.bind(this);
      this.handleDelete = this.handleDelete.bind(this);
      this.editClick = this.editClick.bind(this);
    }
    render() {
        const curAnnouncement = this.state.announcements.filter(x => x.title.toLowerCase().indexOf(this.state.searchValue.toLowerCase()) >= 0 );
        var filteredAnnouncements = this.state.searchValue.length > 0 ? curAnnouncement : this.state.announcements;
        return (
            <div className="container">
                <div className="jumbotron">
                    <h1 className="display-3 text-center">
                        Announcement Website
                    </h1>
                </div>
                <div className="text-center">
                  <label htmlFor="search-by-title">
                    Search
                  </label>
                  <input className="marginLeft"
                    id="search-by-title"
                    name="search"
                    onChange={(event) => {this.setState({searchValue: event.target.value})}}
                    value={this.state.searchValue}/>
                </div>
                <AnnouncementList announcements={filteredAnnouncements}
                                  deleteClick={(e, item) => this.handleDelete(e, item)}
                                  editClick={(e, item) => this.editClick(e, item)}/>
                <ChangeForm onAddClick={this.handleSubmit} item={this.state.editedItem}/>
            </div>
        )
    }
    editClick(e, item){
      e.preventDefault();
      this.setState({editedItem: item})
    }

    handleSubmit(e, title, description, item) {
      e.preventDefault();
      if (title.length === 0 || description.length === 0) {
        return;
      }
      if (item === null) {
        const newItem = {
          title: title,
          description: description,
          id: nextId(),
          date: Date.now()
        };
        this.setState(state => ({
          announcements: state.announcements.concat(newItem)
        }));
      }
      else {
        var announcements = this.state.announcements;
        var announcementItem = item;
        var index = announcements.indexOf(announcementItem);
        announcementItem.title = title;
        announcementItem.description = description;
        announcements.splice(index, 1, announcementItem);
        this.setState(state => ({
          announcements: announcements,
          editedItem: null
        }));
        this.forceUpdate()
      }
    }

    handleDelete(e, item){
      e.preventDefault();
      console.log("delete");
      var announcements = this.state.announcements;
      var index = announcements.indexOf(item)
      console.log(item);
      console.log(index);
      announcements.splice(index, 1);
      this.setState(state =>({ announcements: announcements }));
      this.forceUpdate()
    }
}

export default App
