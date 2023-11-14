import React, { FC, useEffect, useState } from "react";
import { MaterialButton, MaterialInput } from "../../components/UI";
import { useDispatch, useSelector } from "react-redux";
import { IAppStore } from "../../store";
import { IUser, IUserAddress, UserAddressType } from "../../types/user-types";
import { ThunkDispatch } from "@reduxjs/toolkit";
import { message } from "antd";
import { _addUserAddress } from "../../slices/user-slice";
import { formatAxiosError } from "../../utils/helper";
import { AxiosError } from "axios";

interface IAddressFormProps {
  initialData: IUserAddress;
  onSubmitForm: (address: IUserAddress) => void;
}

const AddressForm: FC<IAddressFormProps> = (props) => {
  const { initialData } = props;
  const user = useSelector((state: IAppStore) => state.userReducer);
  const dispatch = useDispatch<ThunkDispatch<any, any, any>>();
  const [messageApi, contextHolder] = message.useMessage();
  const [name, setName] = useState(initialData ? initialData.name : "");
  const [mobileNumber, setMobileNumber] = useState(
    initialData ? initialData.mobileNumber : ""
  );
  const [pincode, setPincode] = useState(
    initialData ? initialData.pincode : ""
  );
  const [locality, setLocality] = useState(
    initialData ? initialData.locality : ""
  );
  const [buildingAndStreet, setBuildingAndAddress] = useState(
    initialData ? initialData.buildingAndStreet : ""
  );
  const [cityTown, setCityTown] = useState(
    initialData ? initialData.cityTown : ""
  );
  const [state, setState] = useState(initialData ? initialData.state : "");
  const [landmark, setLandmark] = useState(
    initialData ? initialData.landmark : ""
  );
  const [alternateMobile, setAlternateMobile] = useState(
    initialData ? initialData.alternateMobile : ""
  );
  const [addressType, setAddressType] = useState(
    initialData ? initialData.addressType : UserAddressType.HOME
  );
  const [submitFlag, setSubmitFlag] = useState(false);
  const [id, setId] = useState(initialData ? initialData._id : "");

  const inputContainer = {
    width: "100%",
    marginRight: 10,
  };

  const addUserAddress = async (address: IUserAddress) => {
    try {
      await dispatch(_addUserAddress(address)).unwrap();
    } catch (error) {
      messageApi.open({
        type: 'error',
        content: formatAxiosError(error as AxiosError),
      });
    }
  }

  const onAddressSubmit = () => {
    const payload = {
      address: {
        name,
        mobileNumber,
        pincode,
        locality,
        buildingAndStreet,
        cityTown,
        state,
        landmark,
        alternateMobile,
        addressType,
      },
    };
    console.log("111111========", payload);
    addUserAddress(payload.address);
  };

  useEffect(() => {
    console.log("addressCount", user.shippingAddresses);
    if (submitFlag) {
      console.log("where are we", user);
      let _address: IUserAddress = {
        name,
        pincode,
        mobileNumber,
        locality,
        buildingAndStreet,
        cityTown,
        landmark,
        state,
        alternateMobile: alternateMobile,
        addressType: UserAddressType.HOME
      };
      // if (id) {

      // } else {
      //   _address = user.shippingAddresses.slice(user.shippingAddresses.length - 1)[0];
      // }

      props.onSubmitForm(_address);
    }
  }, [user.shippingAddresses]);

  const renderAddressForm = () => {
    return (
      <>
        <div className="flexRow">
          <div style={inputContainer}>
            <MaterialInput
              label="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div style={inputContainer}>
            <MaterialInput
              label="10-digit mobile number"
              value={mobileNumber}
              onChange={(e) => setMobileNumber(e.target.value)}
            />
          </div>
        </div>
        <div className="flexRow">
          <div style={inputContainer}>
            <MaterialInput
              label="Pincode"
              value={pincode}
              onChange={(e) => setPincode(e.target.value)}
            />
          </div>
          <div style={inputContainer}>
            <MaterialInput
              label="Locality"
              value={locality}
              onChange={(e) => setLocality(e.target.value)}
            />
          </div>
        </div>
        <div className="flexRow">
          <div style={inputContainer}>
            <MaterialInput
              label="Address"
              value={buildingAndStreet}
              onChange={(e) => setBuildingAndAddress(e.target.value)}
            />
          </div>
        </div>

        <div className="flexRow">
          <div style={inputContainer}>
            <MaterialInput
              label="City/District/Town"
              value={cityTown}
              onChange={(e) => setCityTown(e.target.value)}
            />
          </div>
          <div style={inputContainer}>
            <MaterialInput
              label="State"
              value={state}
              onChange={(e) => setState(e.target.value)}
            />
          </div>
        </div>
        <div className="flexRow">
          <div style={inputContainer}>
            <MaterialInput
              label="Landmark (Optional)"
              value={landmark}
              onChange={(e) => setLandmark(e.target.value)}
            />
          </div>
          <div style={inputContainer}>
            <MaterialInput
              label="Alternate Phone (Optional)"
              value={alternateMobile || ""}
              onChange={(e) => setAlternateMobile(e.target.value)}
            />
          </div>
        </div>
        <div>
          <label>Address Type</label>
          <div className="flexRow">
            <div>
              <input
                type="radio"
                onClick={() => setAddressType(UserAddressType.HOME)}
                name="addressType"
                value="home"
              />
              <span>Home</span>
            </div>
            <div>
              <input
                type="radio"
                onClick={() => setAddressType(UserAddressType.WORK)}
                name="addressType"
                value="work"
              />
              <span>Work</span>
            </div>
          </div>
        </div>
        <div className="flexRow">
          <MaterialButton
            title="SAVE AND DELIVER HERE"
            onClick={() => {
              onAddressSubmit()
            }}
            style={{
              width: "250px",
              margin: "20px 0",
            }}
          />
        </div>
      </>
    );
  };

  // if (props.withoutLayout) {
  //   return <div>{renderAddressForm()}</div>;
  // }

  return (
    <div className="checkoutStep" style={{ background: "#f5faff" }}>
      <div className={`checkoutHeader`}>
        <div>
          <span className="stepNumber">+</span>
          <span className="stepTitle">{"ADD NEW ADDRESS"}</span>
        </div>
      </div>
      <div
        style={{
          padding: "0 60px",
          paddingBottom: "20px",
          boxSizing: "border-box",
        }}
      >
        {renderAddressForm()}
      </div>
    </div>
  );
};

export default AddressForm;