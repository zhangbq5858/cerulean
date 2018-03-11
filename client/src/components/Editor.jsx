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
        <button name="add" onClick={ this.handleEditorDisplay } > Add URL </button>
        <div className="editor-body" style={displayEditor}>
          <form className="editor-form" onSubmit={this.handleSubmit} >
            <div>
              Title  <input type="text" ref="title"/>
            </div>
            <div>
              <label>Value
              </label>
              <input type="text" ref="value"/>
            </div>
            <div>
              Tags  <input type="text" ref="tags"/>
            </div>
            <div>
              <textarea ref="summary" placeholder="URL Summary"></textarea>
            </div>
            <div>
              <button type="submit">Submit</button>
              <button type="reset" onClick={ this.handleEditorDisplay }>Cancel</button>
            </div>
        </form>
      </div>
    </div>) //return
  } //render
}

export default Editor;
