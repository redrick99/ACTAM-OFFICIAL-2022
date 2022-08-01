import React, { Component } from 'react';

class LoadingBar extends Component {
    constructor(props) {
        super(props);
    }

    render() { 
        return (
            <div className='loading-bar' id={'bar-progress-'+this.props.id}>
                <div style={{width: this.props.width+'%'}} className='loading-bar-progress' id={'bar-'+this.props.id}></div>
            </div>
        );
    }
}
 
export default LoadingBar;