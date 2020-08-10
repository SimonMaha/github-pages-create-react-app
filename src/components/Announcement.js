import React, {PureComponent} from 'react'

class Announcement extends PureComponent {
    render() {
        const {announcement, deleteClick, editClick, openClick, isOpen, allAnnoucements} = this.props;
        var similarAnnoucements = isOpen ? this.calculateSimilarAnnouncements(announcement, allAnnoucements) : [];
        const body = isOpen && <div className="card-body">
            <h6 className="card-subtitle text-muted">
                creation date: {(new Date(announcement.date)).toDateString()}
            </h6>
            <section className="card-text">{announcement.description}</section>
            {similarAnnoucements.length > 0 &&
            <div>
              Similar:
              {similarAnnoucements.map((announcement, index) =>
                  <p>{announcement.title}</p>)}
            </div>}
            <button className="btn btn-info" onClick={(e) => {editClick(e, announcement)}}>
              Edit
            </button>
            <button className="btn btn-danger" onClick={(e) => {deleteClick(e, announcement)}}>
              Delete
            </button>
        </div>
        return (
            <div className="card mx-auto" style = {{width: '50%'}}>
                <div className="card-header" onClick={openClick}>
                    <h2>
                        {announcement.title}
                    </h2>
                </div>
                {body}
            </div>
        )
    }
    calculateSimilarAnnouncements(announcement, allAnnoucements){
      var similars = [];
      var currentTitleWords = announcement.title.split(" ");
      var currentDescriptionWords = announcement.description.split(" ");
      for (var x of allAnnoucements) {
        if (x.id === announcement.id) {
          continue;
        }
        var xTitleWords = x.title.split(" ");
        var xDescriptionWords = x.description.split(" ");
        var xTitleExist = false;
        for (var item of xTitleWords) {
          if (currentTitleWords.includes(item)) {
            xTitleExist = true;
            break;
          }
        }
        if (!xTitleExist) {
          return false;
        }
        for (var item of xDescriptionWords) {
          if (currentDescriptionWords.includes(item)) {
            similars.push(x);
            break;
          }
        }
        if (similars.length === 3) {
          return similars;
        }
      }
      return similars;
    }
}
export default Announcement
