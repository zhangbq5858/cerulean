import React, { Component } from 'react';

class ComboSelectTags extends Component { // two props  tagPool, checkboxItemOnClick 
    constructor(props){
        super(props);
        //console.log("Refresh render^^^");
        this.state = {
            selectBoxDisplay:false,
        };
        this.showCheckboxes = this.showCheckboxes.bind(this);
        this.generagteCheckboxItem = this.generagteCheckboxItem.bind(this);
    }


    // componentWillReceiveProps(nextProps) {
    //     if(!this.isIdentical(nextProps.current)){
    //       this.setState(() => nextProps.current);
    //     }
    //   }
    
    //   isIdentical(entry) {
    //     return this.state.id === entry.id && this.state.title === entry.title && this.state.url === entry.url && this.state.tags === entry.tags && this.state.vote === entry.vote;
    //   }

    showCheckboxes = () => {
        this.setState({
            selectBoxDisplay : !this.state.selectBoxDisplay,
        });
    }

    generagteCheckboxItem = () => {
        let result = [];
        for(let tag of this.props.tagPool){
            result.push(
                <label key={tag}><input type="checkbox" id={tag} onChange={this.props.checkboxItemOnClick} checked={this.props.tags.includes(tag)}/>{tag}</label>
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
            <div className="select-form">
                <div className="selectBox" onClick={this.showCheckboxes}>
                    <select>
                        <option>Select tags</option>
                    </select>
                </div>
                <div id="checkboxes" style={visible}>
                    {this.generagteCheckboxItem()}
                </div>
            </div>
        );
    }
}

export default ComboSelectTags;