import React, { useState } from "react";
import { Upload, Modal } from "antd";

const CLOUDINARY_URL = "https://api.cloudinary.com/v1_1/dsrw38rwx/image/upload"

function UploadPhotos({ setPhotos, setArrayPhotos }) {
  const [state, setState] = useState({
    previewVisible: false,
    previewImage: "",
    previewTitle: "",
    fileList: [],
    uploaded: [],
  });

  const handleCancel = () => setState({ ...state, previewVisible: false });

  function getBase64(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });
  }

  const handlePreview = async (file) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }

    setState({
      ...state,
      previewImage: file.url || file.preview,
      previewVisible: true,
      previewTitle:
        file.name || file.url.substring(file.url.lastIndexOf("/") + 1),
    });
  };

  const handleChange = ({ fileList }) => {
    
    setState({ ...state, fileList })
    let array= [];
    if(fileList.length !== 0)
    {
        fileList.forEach((elem, index)=>{
          array.push(elem?.response?.secure_url)
        })
        setArrayPhotos(array)
    }
    else{
      setArrayPhotos(array)
    }
  
  };

  async function customRequest({ file, onSuccess }) {
    try {
      const data = new FormData();
      data.append("file", file);
      data.append("upload_preset", "ma1cews4");
      const res = await fetch(
        CLOUDINARY_URL,
        {
          method: "POST",
          body: data,
        }
      );
      const uploadedPicture = await res.json();
      setPhotos(uploadedPicture.secure_url);
      onSuccess(uploadedPicture, file);
    } catch (err) {
      throw (err);
    }
  }

  const { previewVisible, previewImage, fileList, previewTitle } = state;

  const uploadButton = (
    <div>
      <div className="ant-upload-text">Upload photo</div>
    </div>
  );

  return (
    <div className="clearfix">
      <Upload
        listType="picture-card"
        fileList={fileList}
        onPreview={handlePreview}
        onChange={handleChange}
        customRequest={customRequest}
      >
        {fileList.length >= 8 ? null : uploadButton}
      </Upload>
      <Modal
        visible={previewVisible}
        title={previewTitle}
        footer={null}
        onCancel={handleCancel}
      >
        <img alt="example" style={{ width: "100%" }} src={previewImage} />
      </Modal>
    </div>
  );
}

export default UploadPhotos;