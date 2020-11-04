import React from 'react';
import {connect} from 'react-redux'
import {showThumbnails} from '../Redux/actions/DocumentActions'
class PDFViewer extends React.Component {
	constructor(props) {
		super(props);
		this.viewerRef = React.createRef();
		this.backend = new props.backend();
	}

	componentDidMount() {
		const { src } = this.props;
        const element = this.viewerRef.current;
        document.addEventListener('mousedown', this.handleClick, false)
		this.backend.init(src, element);
    }
    componentWillUnmount (){
        document.removeEventListener('mousedown', this.handleClick, false)
    }

    handleClick = (e) =>{
        console.log(this.node)
        if(this.node.contains(e.target)){
            return
        } else{
            this.props.showThumbnails()

        }
    }

	render() {
		return (
			<div className='mt-2'ref={node => this.node = node}>
				<div ref={this.viewerRef} id="viewer" style={{ width: '60vw', height: '60vh' }} />
			</div>
		);
	}
}

const mapStateToDispatch = dispatch => {
    return {
		showThumbnails: () => dispatch(showThumbnails())
    }
}
export default connect(null, mapStateToDispatch)(PDFViewer);
