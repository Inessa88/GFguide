
import React, {useRef} from 'react'


const FileUploader = (props) => {
    const fileInput = useRef(null)

    const handleFileInput = (e) => {
        // handle validations
        const file = e.target.files[0];
        if (file.size > 1000000000) {  
          props.Error({ error: "File size cannot exceed more than 1MB" });}
        else { props.Success({file});} };

    return (
        <div className="file-uploader">
            <input type="file" onChange={handleFileInput}/>
            {/* <button onClick={e => fileInput.current && fileInput.current.click()} className="btn btn-primary">Add</button> */}
        </div>
    )
}

export default FileUploader

