import React, { useState } from "react";
import Layout from "../components/Layout";
import Select from "../components/Select";
import { option_department, option_year, subjects } from "../components/Data";
import { UserAuth } from "../context/Auth_context";
import QRCode from "react-qr-code";
import { useNavigate } from "react-router-dom";

const Main = () => {
  const { generateqrcode, QRstate, user } = UserAuth();
  const navigate = useNavigate();
  const initialstate = {
    tname: "",
    subname: "",
    department: "",
    year: "",
  };
  const [formstate, setformstate] = useState(initialstate);

  const handlechange = (e) => {
    setformstate({
      ...formstate,
      [e.target.id]: e.target.value,
    });
  };

  const attendance = () => {
    navigate("/attendance");
  };

  return (
    <Layout>
      <div className="absolute w-[70vw] h-[90vh] bg-white flex flex-col items-center justify-center rounded-lg gap-y-5">
        <form action="" className="contents w-[100vw]">
          <Select
            id="department"
            label="Department"
            value={formstate.department}
            options={option_department}
            onChange={handlechange}
          ></Select>
          <Select
            id="year"
            label="Year"
            value={formstate.year}
            options={option_year}
            onChange={handlechange}
          ></Select>
          <Select
            id="subname"
            label="Subject Name:"
            value={formstate.subname}
            options={subjects}
            onChange={handlechange}
          ></Select>
          <div className="flex items-center justify-between">
            <button
              onClick={() => generateqrcode(formstate, user)}
              type="button"
              className="bg-purple-500 px-4 py-2 rounded-lg hover:bg-purple-600 mr-20"
            >
              Generate QR
            </button>
            <button
              onClick={attendance}
              type="button"
              className="bg-purple-500 px-4 py-2 rounded-lg hover:bg-purple-600 ml-20"
            >
              Attendance
            </button>
          </div>

          <div className="flex justify-center items-center ">
            <QRCode
              size={256}
              className="vh-[30%] vw-[30%]"
              value={QRstate}
              viewBox={`0 0 256 256`}
            />
          </div>
        </form>
      </div>
    </Layout>
  );
};

export default Main;
