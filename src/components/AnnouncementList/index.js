import React, {PureComponent} from 'react'
import Announcement from '../Announcement'
import './style.css'

export default class AnnouncementList extends PureComponent {
    state = {
        openAnnouncementId: null
    }
    render() {
        const deleteClick = this.props.deleteClick;
        const editClick = this.props.editClick;
        const announcementElements = this.props.announcements.map((announcement, index) =>
            <li key = {announcement.id} className="announcement-list__li">
                <Announcement announcement = {announcement}
                              deleteClick = {deleteClick}
                              editClick = {editClick}
                              openClick = {this.handleClick.bind(this, announcement.id)}
                              isOpen= {this.state.openAnnouncementId === announcement.id}
                              allAnnoucements = {this.props.announcements}/>
            </li>
        )
        return (
            <ul>
                {announcementElements}
            </ul>
        )
    }

    handleClick = openAnnouncementId => this.setState({
        openAnnouncementId: this.state.openAnnouncementId === openAnnouncementId ? null : openAnnouncementId
    })
}
