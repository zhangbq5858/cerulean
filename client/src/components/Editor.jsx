import React, {Component} from 'react';

class Editor extends Component {

  handleEditorDisplay = ()=> this.props.handleEditorDisplay();

  handleSubmit = (event)=>{
    const item = {
      // id, value, titile, votes, summary, [tags]
      title:this.refs.title.value,
      text:this.refs.value.value,
      tags:this.refs.tags.value,
      summary:this.refs.summary.value
    }
    // console.log(item);
    event.preventDefault();
    this.props.handleSubmit(item);
    this.props.handleEditorDisplay();
    this.reset();
  }

  reset = ()=> {
    this.refs.title.value = '';
    this.refs.value.value = '';
    this.refs.tags.value = '';
    this.refs.summary.value = '';
  }

  render(){
    let displayEditor = {
      display: this.props.editorVisible
        ? 'block'
        : 'none'
    };

    return (
      <div className="editor-panel">
        <button name="add" onClick={ this.handleEditorDisplay } > Submit </button>
        <div className="editor-body" style={displayEditor}>
          <form className="editor-form" onSubmit={this.handleSubmit} >
            <div>
              <input type="text" ref="title" placeholder="Title" required/>
            </div>
            <div>
              <input type="url" ref="value" placeholder="URL" required/>
            </div>
            <div>
              <input type="text" ref="tags" placeholder="Filed" required/>
            </div>
            <div>
              <textarea ref="summary" placeholder="URL Summary"></textarea>
            </div>
            <div>
              <button type="submit">Save</button>
              <button type="reset" onClick={ this.handleEditorDisplay }>Cancel</button>
            </div>
        </form>
      </div>
    </div>) //return
  } //render
}

export default Editor;
