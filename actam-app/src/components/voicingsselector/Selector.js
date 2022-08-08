import React, { Component } from 'react';

class Selector extends Component {
    constructor(props) {
        super(props);

        this.state = {
            optionsOpen: false,
            selectedOption: 0,
        }

        this.toggleOptions = this.toggleOptions.bind(this);
    }

    toggleOptions() {
        this.setState((prevState) => ({
            optionsOpen: !prevState.optionsOpen,
        }))
    }

    render() { 
        return (
            <div id={this.props.id} className={this.props.className}>
                <button
                    type='button' 
                    className={this.props.className}
                    aria-haspopup='listbox'
                    aria-expanded={this.state.optionsOpen} 
                    onClick={this.toggleOptions}
                >
                    {this.props.options[this.props.selectedOption]}
                </button>
                <ul 
                    className={this.props.className+' '+(this.state.optionsOpen ? '' : 'hidden')} 
                    role='listbox'
                    aria-activedescendant={this.props.options[this.props.selectedOption]}
                    tabIndex={-1}
                >
                    {this.props.options.map((option, index) => (
                        <li 
                            key={index} 
                            className={this.props.className} 
                            id={option}
                            role='option'
                            aria-selected={this.props.selectedOption == index}
                            tabIndex={0}
                            onClick={() => {
                                this.setState(() => ({
                                    optionsOpen: false,
                                    selectedOption: index,
                                }))
                                this.props.click(index);
                            }}
                        >
                            {option}
                        </li>
                    ))}
                </ul>
            </div>
        );
    }
}
 
export default Selector;