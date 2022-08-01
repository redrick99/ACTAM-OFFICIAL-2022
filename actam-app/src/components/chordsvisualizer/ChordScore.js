import React, { Component } from 'react';
import { scoreOptions } from '../../scripts/GlobalVariables';

class ChordScore extends Component {
    constructor(props) {
        super(props);

        this.scoreContainer = undefined;
    }

    componentDidMount() {
        this.scoreContainer = document.getElementById('chord-score-td-'+this.props.id);
    }

    componentDidUpdate() {
        if(this.props.chord && this.props.chord !== '')
            this.props.chord.renderScore(this.scoreContainer, scoreOptions);
    }

    render() { 
        let properties = (this.props.chord === '' ? 'hidden ' : '') + (this.props.played ? 'played ' : '') + (this.props.first ? 'first' : '')
        + (this.props.last ? 'last' : '');
        return (
            <td className={'chord-score '+properties}>
                <table id={'chord-score-table-'+this.props.id} className='chord-score'>
                    <tbody className='chord-score'>
                        <tr className='chord-score'>
                            <td className='chord-score-name'>
                                {this.props.chord.name ? this.props.chord.name : ''}
                            </td>
                            <td id={'chord-score-td-'+this.props.id} className='chord-score-score'>

                            </td>
                        </tr>
                    </tbody>
                </table>
            </td>
        );
    }
}
 
export default ChordScore;