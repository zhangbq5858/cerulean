import React, { Component } from 'react';

class ComboSelectTags extends Component { // three props  tagPool, checkboxItemOnClick 
    constructor(props){
        super(props);
        this.state = {
            selectBoxDisplay:false,
        };
        this.showCheckboxes = this.showCheckboxes.bind(this);
        this.generagteCheckboxItem = this.generagteCheckboxItem.bind(this);
    }

    showCheckboxes = () => {
        this.setState({
            selectBoxDisplay : !this.state.selectBoxDisplay,
        });
    }

    generagteCheckboxItem = () => {
        let result = [];
        for(let tag of this.props.tagPool){
            result.push(
                <label key={tag}><input type="checkbox" id={tag} onChange={this.props.checkboxItemOnClick}/>{tag}</label>
            );
        }
        return result;
    }

    render() {
        let visible = {
            display: this.state.selectBoxDisplay
              ? 'block'
              : 'none'
          };
        //	console.log("check data part -> ",this.state.user);
        return (
            <div>
                <div className="multiselect">
                <div className="selectBox" onClick={this.showCheckboxes}>
                    <select>
                        <option>Select tags</option>
                    </select>
                    <div className="overSelect"></div>
                </div>
                <div id="checkboxes" style={visible}>
                    {this.generagteCheckboxItem()}
                </div>
                </div>
            </div>
        );
    }
}

export default ComboSelectTags;