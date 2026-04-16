import { memo, useCallback, useState } from "react";
import { Input } from "../../../components/Input";
import { Select } from "../../../components/Select";
import { TextArea } from "../../../components/TextArea";
import { storage } from "../../../firebase";
import { storage1 } from "../../../service/storage";

import {
  ref,
  uploadBytes,
  getDownloadURL,
  deleteObject,
} from "firebase/storage";
import data from "../../../utils/data/data.json";

export const MainPost = memo(() => {
  const firstName = storage1.getItem("firstName");
  const lastName = storage1.getItem("lastName");
  const phone = storage1.getItem("phone");
  const [postInfo, setPostInfo] = useState({
    type: 2,
    userId: 1,
    title: "",
    description: "",
    price: 0,
    images: [],
    province: "",
    acreage: 0,
    direct: "",
    bedroom: 0,
    width: 0,
    length: 0,
    juridical: "",
    ward: "",
    kitchen: 0,
    bathroom: 0,
    floor: 0,
    nameContact: "nameContact",
    phoneContact: "phoneContact",
  });
  const [images, setImages] = useState(null);
  const [addressDisable, setAddressDisable] = useState({
    district: false,
    ward: false,
    street: false,
  });

  const changePostInfo = useCallback(
    (keyName, val) => {
      setPostInfo((prev) => {
        return {
          ...prev,
          [keyName]: val,
        };
      });
    },
    [postInfo]
  );

  const handleClose1 = async () => {
    console.log(postInfo);
    console.log(new Date());
    // Create a new Date object
    const currentDate = new Date();

    // Get the day, month, and year from the Date object
    const day = currentDate.getDate().toString().padStart(2, "0");
    const month = (currentDate.getMonth() + 1).toString().padStart(2, "0"); // Note: Months are zero-based
    const year = currentDate.getFullYear();

    // Create the formatted date string in "DD/MM/YYYY" format
    const formattedDate = `${day}/${month}/${year}`;

    console.log(firstName + lastName + phone);

    const response = await fetch("http://localhost:8080/posts/create", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        type: 3,
        userId: postInfo.userId,
        title: postInfo.title,
        description: postInfo.description,
        price: postInfo.price,
        square: postInfo.square,
        name_contact: firstName + " " + lastName,
        phone_contact: phone,
        date: formattedDate,
        direct: postInfo.direct,
        district: postInfo.district,
        province: postInfo.province,
        street: postInfo.street,
        ward: postInfo.ward,
        floor: postInfo.floor,
        juridical: postInfo.juridical,
        bedroom: postInfo.bedroom,
        length: postInfo.length,
        width: postInfo.width,
        link_image: postInfo.images[0],
        kitchen: postInfo.kitchen,
        parking: postInfo.parking,
        terrace: postInfo.terrace,
      }),
    });

    const data = await response.json();
    console.log(data);
  };

  const uploadFile = async () => {
    if (images.length === 0) return;
    console.log(images);
    let urls = [];
    const temp = Object.values(images);
    for await (const item of temp) {
      let imageRef = ref(storage, `images/${item.name}`);
      const url = await uploadBytes(imageRef, item).then((snapshot) => {
        return getDownloadURL(snapshot.ref);
      });
      urls.push(url);
    }
    changePostInfo("images", urls);
    // console.log(postInfo.length);
    // console.log(postInfo.images);
    setImages([]);
  };

  const chooseFile = (event) => {
    setImages(event.target.files);
  };

  const deleteAllFile = () => {
    if (postInfo.images.length == 0) return;
    postInfo.images.forEach((item) => {
      deleteObject(ref(storage, item))
        .then(() => {
          console.log("delete success");
        })
        .catch((error) => {
          console.log(error);
        });
    });
    changePostInfo("images", []);
  };

  const changeAddressDisable = useCallback(
    (keyName, val) => {
      setAddressDisable((prev) => {
        return {
          ...prev,
          [keyName]: val,
        };
      });
    },
    [addressDisable]
  );

  return (
    <div className="main-post">
      <div className="left-post">
        <label className="text-uppercase">real estate posting</label>
        <div className="form-group">
          <TextArea
            type="text"
            placeholder="Enter title ..."
            id="id-title"
            label="Title"
            changeTextArea={changePostInfo}
            keyName="title"
            rows="4"
            val={postInfo.title}
          />
        </div>
        <hr />
        <div className="form-group">
          <label>
            Address <span className="require">*</span>
          </label>
          <div className="row">
            <div className="form-group col-3">
              <Select
                defaultValue=""
                defaultName="City/Province"
                listItems={data.province}
                changeSelect={changePostInfo}
                keyName="province"
              />
            </div>
            <div className="form-group col-3">
              <Select
                defaultValue=""
                defaultName="District"
                listItems={data.province}
                changeSelect={changePostInfo}
                keyName="district"
                disable={addressDisable.district}
              />
            </div>
            <div className="form-group col-3">
              <Select
                defaultValue=""
                defaultName="Ward"
                listItems={data.province}
                changeSelect={changePostInfo}
                keyName="ward"
                disable={addressDisable.ward}
              />
            </div>
            <div className="form-group col-3">
              <Select
                defaultValue=""
                defaultName="Street"
                listItems={data.province}
                changeSelect={changePostInfo}
                keyName="street"
                disable={addressDisable.street}
              />
            </div>
          </div>
        </div>
        <hr />
        <div className="row">
          <div className="form-group col-3">
            <Input
              type="number"
              placeholder="Enter number price"
              id="id-price"
              label="Price (VNĐ)"
              val={postInfo.price}
              changeInput={changePostInfo}
              keyName="price"
              min="0"
              required={true}
            />
          </div>
          <div className="form-group col-3">
            <Input
              type="number"
              placeholder="Enter number Square"
              id="id-acreage"
              label="Square (m2)"
              val={postInfo.square}
              changeInput={changePostInfo}
              keyName="square"
              min="0"
              required={true}
            />
          </div>
          <div className="form-group col-3">
            <Input
              type="number"
              placeholder="Enter number length"
              id="id-length"
              label="Length (m)"
              val={postInfo.length}
              changeInput={changePostInfo}
              keyName="length"
              min="0"
              required={true}
            />
          </div>
          <div className="form-group col-3">
            <Input
              type="number"
              placeholder="Enter number width"
              id="id-width"
              label="Width (m)"
              val={postInfo.width}
              changeInput={changePostInfo}
              keyName="width"
              min="0"
              required={true}
            />
          </div>
        </div>
        <hr />
        <div className="row">
          <div className="form-group col-3">
            <Input
              type="number"
              placeholder="Enter number bedroom"
              id="id-bedroom"
              label="Bedroom (room)"
              val={postInfo.bedroom}
              changeInput={changePostInfo}
              keyName="bedroom"
              min="0"
            />
          </div>
          <div className="form-group col-3">
            <Input
              type="number"
              placeholder="Enter number kitchen"
              id="id-kitchen"
              label="Kitchen (room)"
              val={postInfo.kitchen}
              changeInput={changePostInfo}
              keyName="kitchen"
              min="0"
            />
          </div>
          <div className="form-group col-3">
            <Input
              type="number"
              placeholder="Enter number floor"
              id="id-floor"
              label="Floor"
              val={postInfo.floor}
              changeInput={changePostInfo}
              keyName="floor"
              min="1"
            />
          </div>
          <div className="form-group col-3">
            <Input
              type="number"
              id="id-parking"
              label="Parking"
              val={postInfo.parking}
              changeInput={changePostInfo}
              keyName="parking"
              min="1"
            />
          </div>
        </div>
        <hr />
        <div className="row">
          <div className="form-group col-3">
            <label>Juridical</label>
            <Select
              defaultValue=""
              defaultName="All"
              listItems={data.juridical}
              changeSelect={changePostInfo}
              keyName="juridical"
            />
          </div>
          <div className="form-group col-3">
            <label>Direction</label>
            <Select
              defaultValue=""
              defaultName="All"
              listItems={data.direct}
              changeSelect={changePostInfo}
              keyName="direct"
            />
          </div>
          <div className="form-group col-3">
            <label>Type</label>
            <Select
              defaultValue=""
              defaultName="All"
              listItems={data.type}
              changeSelect={changePostInfo}
              keyName="type"
            />
          </div>
        </div>
        <hr />
        <div className="row">
          <div className="form-group">
            <TextArea
              type="text"
              placeholder="Enter description ..."
              id="id-description"
              label="Description"
              changeTextArea={changePostInfo}
              keyName="description"
              rows="4"
              val={postInfo.description}
            />
          </div>
        </div>
        <hr />
        <br />
        <button className="btn btn-primary" onClick={handleClose1}>
          Post
        </button>
      </div>
      <div className="right-post">
        <div className="form-group">
          <label htmlFor="id-images">Image attached</label>
          <input
            type="file"
            id="id-images"
            onChange={chooseFile}
            className="form-control"
            multiple
          />
          {postInfo.images &&
            postInfo.images.map((item, key) => (
              <img
                src={item}
                alt="not-found"
                key={key}
                className="image-post m-2"
              />
            ))}
        </div>
        <button className="btn btn-primary mt-4" onClick={uploadFile}>
          Upload
        </button>
        <button className="btn btn-danger mt-4" onClick={deleteAllFile}>
          Delete
        </button>
      </div>
    </div>
  );
});
