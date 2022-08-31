import React, { Component } from 'react';
import { scoreOptions, assignables } from '../../scripts/GlobalVariables';

class ChordScore extends Component {
    constructor(props) {
        super(props);
        this.state = {
            treble: true,
            bass: false,
        }

        this.scoreContainer = undefined;
        this.trebleContainer = undefined;
        this.bassContainer = undefined
    }

    componentDidMount() {
        this.scoreContainer = document.getElementById('chord-score-td-'+this.props.id);
        this.trebleContainer = document.getElementById('treble-td-'+this.props.id);
        this.bassContainer = document.getElementById('bass-td-'+this.props.id);
    }

    componentDidUpdate(prevProps) {
        if(prevProps.chord !== this.props.chord && this.props.chord && this.props.chord !== '') {
            const [showTreble, showBass] = this.props.chord.drawScore({treble: this.trebleContainer, bass: this.bassContainer});
            this.setState(() => ({
                treble: showTreble,
                bass: showBass,
            }))
        }
    }

    render() { 
        let properties = (this.props.chord === '' ? 'invisible ' : '') + (this.props.played ? 'played ' : '') + (this.props.first ? 'first' : '')
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
                                <table className='chord-score-score-table'>
                                    <tbody>
                                        <tr className={'treble-tr '+(this.state.treble ? '' : 'hidden')}>
                                            <td id={'treble-td-'+this.props.id}>

                                            </td>
                                        </tr>
                                        <tr className={'bass-tr '+(this.state.bass ? '' : 'hidden')}>
                                            <td id={'bass-td-'+this.props.id}>
                                                
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </td>
        );
    }
}
 
export default ChordScore;