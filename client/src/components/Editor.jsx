// created by Bin in Mar, 2018
import React, {Component} from 'react';

const debug = false;

class Editor extends Component {
  constructor(props) {
    super(props);
    this.state = {id:'', title:'', url:'',tags:[] ,summary:'',vote:0};

    this.handleEditorDisplay = this.handleEditorDisplay.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleTitleChange = this.handleTitleChange.bind(this);
    this.handleURLChange = this.handleURLChange.bind(this);
    this.handleTagsChange = this.handleTagsChange.bind(this);
    this.handleSummaryChange = this.handleSummaryChange.bind(this);
    this.clearInput = this.clearInput.bind(this);
    this.cancel = this.cancel.bind(this);
  }

  clearInput(){
    this.setState({id:'', title:'', url:'',tags:[] ,summary:'',vote:0});
  }

  handleEditorDisplay = ()=> {
    this.props.handleEditorDisplay();
  }

  cancel(){
    this.props.handleEditorDisplay();
    this.clearInput();
  }

  handleSubmit = (event)=>{
    let tags = [];
    if(this.refs.tags.value){
      tags = this.refs.tags.value.split(' ');
    }
    const item = {
      id: this.props.currentLink.id,
      vote: this.props.currentLink.vote,
      title:this.refs.title.value,
      text:this.refs.url.value,
      tags:tags,
      summary:this.refs.summary.value
    }
    this.props.handleSubmit(item);
    this.props.handleEditorDisplay();
    this.clearInput();
    event.preventDefault();
  }

  handleTitleChange(event) {
    this.setState({title:event.target.value});
  }

  handleURLChange(event) {
    this.setState({url:event.target.value});
  }

  handleTagsChange (event) {
    this.setState({tags:event.target.value});
  }

  handleSummaryChange (event) {
    this.setState({summary:event.target.value});
  }

  componentWillReceiveProps(nextProps) {
    if(this.state.id !== nextProps.currentLink.id){
      this.setState(() => nextProps.currentLink);
    }
  }

  render(){

    let displayEditor = {
      display: this.props.editorVisible
        ? 'block'
        : 'none'
    };

    return (
      <div className="editor-panel">
        <div className="editor-body" style={displayEditor}>
          <form className="editor-form" onSubmit={this.handleSubmit} >
            <div>
              <input type="text" ref="title" value={this.state.title} onChange={this.handleTitleChange} placeholder="Title" required/>
            </div>
            <div>
              <input type="url" ref="url" value={this.state.url} onChange={this.handleURLChange} placeholder="URL" required/>
            </div>
            <div>
              <input type="text" ref="tags" value={this.state.tags} onChange={this.handleTagsChange} placeholder="Multiple tags seperated by a single space" />
            </div>
            <div>
              <textarea ref="summary" placeholder="URL Summary" value={this.state.summary} onChange={this.handleSummaryChange} />
            </div>
            <div>
              <button type="submit" >Save</button>
              <button type="reset" onClick={ this.cancel }>Cancel</button>
            </div>
          </form>
        </div>
    </div>) //return
  } //render
}

export default Editor;
