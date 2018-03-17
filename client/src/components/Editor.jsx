// v2.0 created by Bin in Mar, 2018
import React, {Component} from 'react';

import ComboSelectTags from './ComboSelectTags';

class Editor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: '',
      title: '',
      url: '',
      tags: [],
      summary: '',
      vote: 0
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleTitleChange = this.handleTitleChange.bind(this);
    this.handleURLChange = this.handleURLChange.bind(this);
    //this.handleTagsChange = this.handleTagsChange.bind(this);
    this.handleSummaryChange = this.handleSummaryChange.bind(this);
    this.clearInput = this.clearInput.bind(this);
    this.cancel = this.cancel.bind(this);
    this.checkboxItemOnClick = this.checkboxItemOnClick.bind(this);
  }



  checkboxItemOnClick = (e) => {
    console.log("before click item", this.state.tags);
    if(e.target.checked && !this.state.tags.includes(e.target.id)){
        this.setState({
            tags: [...this.state.tags, e.target.id],
        });
        return;
    }
    if(!e.target.checked && this.state.tags.includes(e.target.id)){
        this.setState({
            tags: this.state.tags.filter((item, index) => item !== e.target.id),
        });
        return;
    }

}


  clearInput() {
    this.setState({
      id: '',
      title: '',
      url: '',
      tags: [],
      summary: '',
      vote: 0
    });
  }

  cancel() {
    this.handleSubmit(null);
  }

  handleSubmit = (event) => {
    this.clearInput();
    if(!event) {
      this.props.handleSubmit(null);
      return;
    }
    // if (this.refs.tags.value) {
    //   const regex = /\s*,\s*/; // 0 or more spaces followed by a comma followed by 0 or more spaces
    //   tags = this.refs.tags.value.split(regex);
    // }
    const item = {
      id: this.state.id,
      vote: this.state.vote,
      title: this.state.title,
      url: this.state.url,
      tags: this.state.tags,
      summary: this.state.summary
    }
    this.props.handleSubmit(item);
    event.preventDefault();
  }

  handleTitleChange(event) {
    this.setState({title: event.target.value});
  }

  handleURLChange(event) {
    this.setState({url: event.target.value});
  }

  // handleTagsChange(event) {
  //   this.setState({tags: event.target.value});
  // }

  handleSummaryChange(event) {
    this.setState({summary: event.target.value});
  }

  componentWillReceiveProps(nextProps) {
    if(!this.isIdentical(nextProps.current)){
      this.setState(() => nextProps.current);
    }
  }

  isIdentical(entry) {
    return this.state.id === entry.id && this.state.title === entry.title && this.state.url === entry.url && this.state.tags === entry.tags && this.state.vote === entry.vote;
  }

  render() {

    let visible = {
      display: this.props.visible
        ? 'block'
        : 'none'
    };
    let disable = Object.keys(this.props.current).length === 0 ? false : true;
    //console.log("edit url", disable, Object.keys(this.props.current).length);
    const summaryShowLength = 240;
    return (
    <div className="editor-panel">
      <div className="editor-body" style={visible} >
        <form className="editor-form" onSubmit={this.handleSubmit}>
          <div>
            <input type="text" ref="title" value={this.state.title} onChange={this.handleTitleChange} placeholder="Title" required="required"/>
          </div>
          <div>
            <input type="url" ref="url" value={this.state.url} onChange={this.handleURLChange} placeholder="URL" required="required" disabled
            ={disable}/>
          </div>
          <div>
            <ComboSelectTags 
              tagPool={this.props.tagPool}
              checkboxItemOnClick={this.checkboxItemOnClick}
              tags={this.state.tags}
            />
          </div>
          <div>
            <textarea ref="summary" placeholder="URL Summary" value={this.state.summary} onChange={this.handleSummaryChange} maxLength={summaryShowLength}/>
          </div>
          <div>
            <button type="submit">Save</button>
            <button type="reset" onClick={this.cancel}>Cancel</button>
          </div>
        </form>
      </div>
    </div>) //return
  } //render
}

export default Editor;
