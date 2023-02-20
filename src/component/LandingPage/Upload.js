import React,{useState,useEffect} from "react";
import AWS from "aws-sdk";
import { UploadData } from "../../Redux/Slice/UploadSlice";
import { useDispatch } from "react-redux";

const Upload = () => {
    const dispatch = useDispatch()
    const [progress, setProgress] = useState(0);
    const [filename, setFileName] = useState();
    const [placeImage, setLink] = useState("");
    const HandelFilePath = (e) => {
        const file = e.target.files[0];
        const fileName = e.target.files[0].name;
        setFileName(fileName);
    
        const accessKeyId = process.env.REACT_APP_AWS_ACCESS_KEY;
        const secretAccessKeys = process.env.REACT_APP_AWS_SECRET_ACCESS_KEY;
        //
        AWS.config.update({
          accessKeyId: accessKeyId,
          secretAccessKey: secretAccessKeys,
        });
    
        const myBucket = new AWS.S3({
          params: { Bucket: process.env.REACT_APP_AWS_RESUME_FOLDER },
          region: "eu-west-2",
        });
        const params = {
          ACL: "public-read",
          Body: file,
          Bucket: process.env.REACT_APP_AWS_RESUME_FOLDER,
          Key: fileName,
        };
    
        myBucket
          .putObject(params)
          .on("success", (pro) => {
            if (pro?.request?.httpRequest?.stream?.responseURL)
              setLink(pro?.request?.httpRequest?.stream?.responseURL);
          })
          .on("httpUploadProgress", (evt) => {
            console.log(evt);
            setProgress(Math.round((evt.loaded / evt.total) * 100));
          })
          .send((err) => {
            if (err) console.log(err);
          });
    
        useEffect(() => {
          if (progress === 100) {
            console.log("done");
          }
        }, [progress]);
      };
     
      const upload = (e) => {
        e.preventDefault();
        const ele = e.target.elements;
        const placeName = ele[0].value;
        const placeDescription = ele[1].value;
        const placeTag = ele[2].value;
        console.log({ placeName, placeDescription, placeTag, placeImage });
        dispatch(UploadData({ placeName, placeDescription, placeTag, placeImage }));
        ele[0].value = "";
        ele[1].value = "";
        ele[2].value = "";
      };
  return (
    <div>
      <form onSubmit={upload}>
        <div className="Upload_Block">
          <div className="Upload_Header">Create a Explore</div>
          <input
            type="text"
            placeholder="  Title *"
            className="Upload_Title"
            required={true}
          ></input>
          <input
            type="text"
            placeholder="  Message *"
            className="Message_Text"
            required={true}
          ></input>
          <input type="text" placeholder="  Tags *" required={true}></input>
          <input
            type="file"
            required={true}
            onChange={HandelFilePath}
            accept="image/png, image/jpeg, images/jpg"
          ></input>
          <progress defaultValue={0} value={progress}></progress>
          <p>
            {progress < 100 && progress > 1 && <p>image Uploading wait !!!</p>}
          </p>
          <p>{progress == 100 && <p>image uploaded please submit</p>}</p>

          <button className="btn btn-primary" type="submit">
            SUBMIT
          </button>
          <button type="reset">CLEAR</button>
        </div>
      </form>
    </div>
  );
};

export default Upload;
