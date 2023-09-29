import { connect } from 'react-redux';

import { IReduxState } from '../../../../app/types';
import { getToolbarButtons } from '../../../../base/config/functions.web';
import { openDialog } from '../../../../base/dialog/actions';
import { translate } from '../../../../base/i18n/functions';
import AbstractRecordButton, {
    IProps,
    _mapStateToProps as _abstractMapStateToProps
} from '../AbstractRecordButton';

import { startLocalVideoRecording, stopLocalVideoRecording } from '../../../actions';

import StartRecordingDialog from './StartRecordingDialog';
import StopRecordingDialog from './StopRecordingDialog';

/**
 * Button for opening a dialog where a recording session can be started.
 */
class RecordingButton extends AbstractRecordButton<IProps> {

    /**
     * Handles clicking / pressing the button.
     *
     * @override
     * @protected
     * @returns {void}
     */
    _onHandleClick() {
        const { _isRecordingRunning, _isUiOnly, dispatch } = this.props;

        if (_isUiOnly) {
            dispatch(
                _isRecordingRunning ? stopLocalVideoRecording() : startLocalVideoRecording(false, true)
            );

            return;
        }

        dispatch(openDialog(
            _isRecordingRunning ? StopRecordingDialog : StartRecordingDialog
        ));
    }
}

/**
 * Maps (parts of) the redux state to the associated props for the
 * {@code RecordButton} component.
 *
 * @param {Object} state - The Redux state.
 * @private
 * @returns {{
 *     _fileRecordingsDisabledTooltipKey: ?string,
 *     _isRecordingRunning: boolean,
 *     _disabled: boolean,
 *     visible: boolean
 * }}
 */
export function _mapStateToProps(state: IReduxState) {
    const abstractProps = _abstractMapStateToProps(state);
    const toolbarButtons = getToolbarButtons(state);
    const visible = toolbarButtons.includes('recording') && abstractProps.visible;

    return {
        ...abstractProps,
        visible
    };
}

export default translate(connect(_mapStateToProps)(RecordingButton));
